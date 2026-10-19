import { NextResponse } from "next/server";
import { buildOrderPayload, type OrderPayload } from "@/lib/schaerfauftrag-order";
import { calculateOrder } from "@/lib/schaerfauftrag-prices";
import { describeMailError, isMailConfigured, sendOrderConfirmation } from "@/lib/schaerfauftrag-mail";
import { validateOrderRequest, ValidationError } from "@/lib/schaerfauftrag-validate";
import { clientIp, hashIp, isAllowedOrigin, readLimitedText } from "@/lib/request-security";
import { getSupabaseAdmin } from "@/lib/supabase";

// Braucht Node-APIs (fs, nodemailer, crypto) – nicht Edge
export const runtime = "nodejs";
// Obergrenze für die Funktionslaufzeit. Die SMTP-Timeouts sind so gewählt, dass auch
// zwei Versandversuche sicher darunter bleiben.
export const maxDuration = 60;

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_PER_HOUR = 5;

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

// Nur für den Notfallpfad ohne Datenbank: Idempotenz innerhalb einer warmen Instanz.
// Mit Datenbank übernimmt das die eindeutige order_id instanzübergreifend.
const recentFallbackOrders = new Map<string, { promise: Promise<void>; at: number }>();
const FALLBACK_DEDUPE_MS = 10 * 60 * 1000;

// Warm-up: Das Formular ruft dies beim Erreichen des letzten Schritts auf, damit die
// Funktion beim eigentlichen Absenden nicht erst kalt starten muss.
export async function GET() {
  return json({ ok: true });
}

/**
 * Ablauf:
 * 1. Herkunft, Größe und Inhalt streng prüfen; Preise serverseitig berechnen.
 * 2. Auftrag in Supabase speichern (idempotent über order_id, mit Rate-Limit pro IP).
 * 3. Bestätigung mailen. Scheitert die Mail, ist der Auftrag trotzdem angenommen –
 *    der Nachversand-Job (/api/schaerfauftrag/resend) holt die Mail nach.
 * Ist die Datenbank nicht erreichbar, wird wie früher direkt gemailt: Supabase macht
 * den Ablauf nie unzuverlässiger als ohne.
 */
export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    console.warn("Schärfauftrag abgelehnt: fremde Herkunft");
    return json({ error: "Nicht erlaubt" }, 403);
  }
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return json({ error: "Ungültige Anfrage" }, 415);
  }

  const raw = await readLimitedText(request, MAX_BODY_BYTES);
  if (raw === null) return json({ error: "Anfrage zu groß" }, 413);

  let validated;
  try {
    validated = validateOrderRequest(JSON.parse(raw));
  } catch (error) {
    const message = error instanceof ValidationError ? error.message : "Ungültige Anfrage";
    console.warn(`Schärfauftrag abgelehnt: ${message}`);
    return json({ error: message }, 400);
  }
  const { orderId, contact, quantities, honeypotFilled } = validated;

  if (honeypotFilled) {
    // Bot: so tun, als wäre alles in Ordnung – nichts speichern, nichts senden
    console.warn(`Schärfauftrag ${orderId}: Honeypot ausgefüllt, verworfen`);
    return json({ ok: true, orderId });
  }

  const order = buildOrderPayload(contact, calculateOrder(quantities));

  if (!isMailConfigured()) {
    console.error("SMTP-Konfiguration fehlt (SMTP_HOST/SMTP_USER/SMTP_PASS)");
  }

  const db = getSupabaseAdmin();
  if (db) {
    try {
      const outcome = await storeAndSend(db, orderId, order, hashIp(clientIp(request)));
      if (outcome === "rate_limited") {
        return json({ error: "Zu viele Aufträge in kurzer Zeit. Bitte versuchen Sie es später erneut oder rufen Sie uns an." }, 429);
      }
      return json({ ok: true, orderId });
    } catch (error) {
      // Datenbank nicht erreichbar → unten direkt mailen
      console.error(`Schärfauftrag ${orderId}: Supabase nicht erreichbar, direkter Mailversand – ${describeDbError(error)}`);
    }
  }

  return sendWithoutDatabase(orderId, order);
}

type DbClient = NonNullable<ReturnType<typeof getSupabaseAdmin>>;

function describeDbError(error: unknown): string {
  const e = error as { code?: string; message?: string };
  return [e?.code, e?.message].filter(Boolean).join(" ").slice(0, 300) || "Unbekannter Fehler";
}

async function storeAndSend(
  db: DbClient,
  orderId: string,
  order: OrderPayload,
  ipHash: string | null
): Promise<"ok" | "rate_limited"> {
  const existing = await db.from("orders").select("status").eq("order_id", orderId).maybeSingle();
  if (existing.error) throw existing.error;

  if (!existing.data) {
    // Rate-Limit nur für neue Aufträge – Wiederholungen desselben Auftrags zählen nicht
    if (ipHash) {
      const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const recent = await db
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since);
      if (recent.error) throw recent.error;
      if ((recent.count ?? 0) >= RATE_LIMIT_PER_HOUR) {
        console.warn(`Schärfauftrag ${orderId}: Rate-Limit erreicht`);
        return "rate_limited";
      }
    }

    const inserted = await db.from("orders").upsert(
      {
        order_id: orderId,
        ansprechpartner: order.ansprechpartner,
        praxis: order.praxisname,
        email: order.email,
        telefon: order.telefon,
        plz: order.plz,
        ort: order.ort,
        nachricht: order.nachricht,
        items: order.items,
        total_quantity: order.totalQuantity,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total_net: order.totalNet,
        vat: order.vat,
        total_gross: order.totalGross,
        discount_info: order.discountInfo,
        consent_widerruf: order.widerrufsrecht,
        consent_agb: order.agb,
        ip_hash: ipHash,
      },
      { onConflict: "order_id", ignoreDuplicates: true }
    );
    if (inserted.error) throw inserted.error;
    console.info(`Schärfauftrag ${orderId}: gespeichert`);
  } else if (existing.data.status === "mail_sent") {
    console.info(`Schärfauftrag ${orderId}: Wiederholung, bereits versendet`);
    return "ok";
  }

  // Versand atomar reservieren: Läuft parallel schon ein Versand (andere Instanz oder
  // Nachversand-Job), bekommt diese Anfrage nichts zurück und sendet nicht doppelt.
  const claimed = await db.rpc("claim_order_mail", { p_order_id: orderId });
  if (claimed.error) {
    // Auftrag ist gespeichert – der Nachversand-Job übernimmt
    console.error(`Schärfauftrag ${orderId}: Reservierung fehlgeschlagen – ${describeDbError(claimed.error)}`);
    return "ok";
  }
  if (!Array.isArray(claimed.data) || claimed.data.length === 0) {
    console.info(`Schärfauftrag ${orderId}: Versand läuft bereits oder ist erledigt`);
    return "ok";
  }

  try {
    await sendOrderConfirmation(order, orderId);
    await markOrder(db, orderId, { status: "mail_sent", mail_sent_at: new Date().toISOString(), last_error: null });
  } catch (error) {
    const reason = describeMailError(error);
    console.error(`Schärfauftrag ${orderId}: Mailversand fehlgeschlagen, Nachversand folgt – ${reason}`);
    await markOrder(db, orderId, { status: "mail_failed", last_error: reason });
  }
  return "ok";
}

async function markOrder(db: DbClient, orderId: string, fields: Record<string, unknown>) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const { error } = await db.from("orders").update({ ...fields, locked_until: null }).eq("order_id", orderId);
    if (!error) return;
    console.error(`Schärfauftrag ${orderId}: Status-Update fehlgeschlagen – ${describeDbError(error)}`);
  }
}

async function sendWithoutDatabase(orderId: string, order: OrderPayload) {
  const now = Date.now();
  for (const [id, entry] of recentFallbackOrders) {
    if (now - entry.at > FALLBACK_DEDUPE_MS) recentFallbackOrders.delete(id);
  }
  const existing = recentFallbackOrders.get(orderId);
  if (existing) {
    try {
      await existing.promise;
      return json({ ok: true, orderId });
    } catch {
      recentFallbackOrders.delete(orderId);
    }
  }

  const promise = sendOrderConfirmation(order, orderId);
  recentFallbackOrders.set(orderId, { promise, at: now });
  try {
    await promise;
    return json({ ok: true, orderId });
  } catch (error) {
    recentFallbackOrders.delete(orderId);
    console.error(`Schärfauftrag ${orderId}: Versand ohne Datenbank fehlgeschlagen – ${describeMailError(error)}`);
    return json({ error: "Auftrag konnte nicht versendet werden." }, 500);
  }
}
