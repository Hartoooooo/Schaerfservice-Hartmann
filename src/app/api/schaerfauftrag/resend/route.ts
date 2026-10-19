import { NextResponse } from "next/server";
import { orderPayloadFromRow } from "@/lib/schaerfauftrag-order";
import { describeMailError, sendOrderConfirmation } from "@/lib/schaerfauftrag-mail";
import { hasValidBearer } from "@/lib/request-security";
import { getSupabaseAdmin, type OrderRow } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 60;

// Pro Lauf nur wenige Aufträge, damit auch bei hängendem Mailserver (2 Versuche à
// max. ~25 s) die Laufzeit nicht überschritten wird. Der Job läuft alle 15 Minuten.
const BATCH_SIZE = 2;

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Nachversand + Löschfristen. Wird alle 15 Minuten von Supabase (pg_cron + pg_net)
 * mit `Authorization: Bearer <RESEND_SECRET>` aufgerufen. Ohne gültiges Secret 401.
 */
export async function POST(request: Request) {
  if (!hasValidBearer(request, process.env.RESEND_SECRET)) {
    return json({ error: "Nicht autorisiert" }, 401);
  }
  const db = getSupabaseAdmin();
  if (!db) return json({ error: "Datenbank nicht konfiguriert" }, 503);

  const claimed = await db.rpc("claim_pending_order_mails", { p_limit: BATCH_SIZE });
  if (claimed.error) {
    console.error(`Nachversand: Reservierung fehlgeschlagen – ${claimed.error.message}`);
    return json({ error: "Datenbankfehler" }, 500);
  }

  let sent = 0;
  let failed = 0;
  for (const row of (claimed.data ?? []) as OrderRow[]) {
    try {
      await sendOrderConfirmation(orderPayloadFromRow(row), row.order_id);
      await db
        .from("orders")
        .update({ status: "mail_sent", mail_sent_at: new Date().toISOString(), last_error: null, locked_until: null })
        .eq("id", row.id);
      sent++;
      console.info(`Nachversand ${row.order_id}: versendet (Versuch ${row.mail_attempts})`);
    } catch (error) {
      const reason = describeMailError(error);
      await db
        .from("orders")
        .update({ status: "mail_failed", last_error: reason, locked_until: null })
        .eq("id", row.id);
      failed++;
      console.error(`Nachversand ${row.order_id}: fehlgeschlagen (Versuch ${row.mail_attempts}) – ${reason}`);
    }
  }

  // Datenschutz: IP-Hashes nach 30 Tagen entfernen, Aufträge nach 24 Monaten löschen
  const now = Date.now();
  const ipCutoff = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const retentionCutoff = new Date(now);
  retentionCutoff.setMonth(retentionCutoff.getMonth() - 24);
  const ipCleanup = await db
    .from("orders")
    .update({ ip_hash: null })
    .not("ip_hash", "is", null)
    .lt("created_at", ipCutoff);
  const retention = await db.from("orders").delete().lt("created_at", retentionCutoff.toISOString());
  if (ipCleanup.error || retention.error) {
    console.error("Löschfristen: Fehler –", ipCleanup.error?.message ?? retention.error?.message);
  }

  return json({ ok: true, sent, failed });
}
