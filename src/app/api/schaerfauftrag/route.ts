import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  buildFilledPdf,
  customerConfirmationHtml,
  type OrderPayload,
} from "@/lib/schaerfauftrag-order";

// Braucht Node-APIs (fs, nodemailer) – nicht Edge
export const runtime = "nodejs";
// Obergrenze für die Funktionslaufzeit. Die SMTP-Timeouts unten sind so gewählt,
// dass auch zwei Versandversuche sicher darunter bleiben.
export const maxDuration = 60;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Auftrags-ID vom Formular: bleibt über alle (auch automatische) Wiederholungen gleich.
const ORDER_ID_PATTERN = /^[A-Za-z0-9-]{8,64}$/;

// Idempotenz innerhalb einer warmen Funktionsinstanz: Kommt derselbe Auftrag erneut an
// (z.B. weil die Antwort auf dem Handy verloren ging und das Formular neu sendet),
// wird nicht ein zweites Mal versendet, sondern das Ergebnis des ersten Versands genutzt.
// Instanzübergreifend greift zusätzlich die feste Message-ID (siehe unten).
const recentOrders = new Map<string, { promise: Promise<void>; at: number }>();
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

function pruneRecentOrders() {
  const now = Date.now();
  for (const [id, entry] of recentOrders) {
    if (now - entry.at > DEDUPE_WINDOW_MS) recentOrders.delete(id);
  }
}

// Vorübergehende SMTP-Fehler, bei denen ein zweiter Versuch sinnvoll ist: 4xx-Antworten
// und Verbindungsprobleme. Letztere kommen teils ganz ohne Fehlercode an (nodemailer:
// "Unexpected socket close"). Dauerhafte Fehler – falsche Zugangsdaten, abgelehnte
// Empfänger/Nachricht, 5xx – werden nicht wiederholt.
const PERMANENT_SMTP_CODES = ["EAUTH", "EENVELOPE", "EMESSAGE", "EREQUIRETLS", "EQUIRETLS"];
function isTransientSmtpError(error: unknown): boolean {
  const e = error as { code?: string; responseCode?: number };
  if (typeof e?.responseCode === "number") {
    return e.responseCode >= 400 && e.responseCode < 500;
  }
  return !PERMANENT_SMTP_CODES.includes(e?.code ?? "");
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Warm-up: Das Formular ruft dies beim Erreichen des letzten Schritts auf, damit die
// Funktion beim eigentlichen Absenden nicht erst kalt starten muss.
export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  let order: OrderPayload;
  try {
    order = (await request.json()) as OrderPayload;
  } catch {
    console.warn("Schärfauftrag abgelehnt: ungültiges JSON");
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (typeof order?.email !== "string" || !isValidEmail(order.email.trim())) {
    console.warn("Schärfauftrag abgelehnt: ungültige E-Mail-Adresse");
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }
  order.email = order.email.trim();
  if (!Array.isArray(order.items) || order.items.length === 0) {
    console.warn("Schärfauftrag abgelehnt: keine Auftragspositionen");
    return NextResponse.json({ error: "Keine Auftragspositionen" }, { status: 400 });
  }
  if (!Array.isArray(order.allItemNames)) order.allItemNames = [];
  const orderId =
    typeof order.orderId === "string" && ORDER_ID_PATTERN.test(order.orderId)
      ? order.orderId
      : `SA-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || user;
  // Betreiber-Adressen: erhalten die Auftragsbestätigung als Blindkopie (BCC).
  // Überschreibbar per MAIL_BCC (kommagetrennt).
  const ownerBcc = (process.env.MAIL_BCC ||
    "hartmann-schaerfservice@web.de, hartmanntimon@gmail.com")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  if (!host || !user || !pass) {
    console.error("SMTP-Konfiguration fehlt (SMTP_HOST/SMTP_USER/SMTP_PASS)");
    return NextResponse.json(
      { error: "E-Mail-Versand ist nicht konfiguriert." },
      { status: 500 }
    );
  }

  pruneRecentOrders();
  const existing = recentOrders.get(orderId);
  if (existing) {
    console.info(`Schärfauftrag ${orderId}: Wiederholung erkannt, kein erneuter Versand`);
    try {
      await existing.promise;
      return NextResponse.json({ ok: true, orderId, duplicate: true });
    } catch {
      // Erster Versuch ist fehlgeschlagen – unten regulär erneut versenden
      recentOrders.delete(orderId);
    }
  }

  const send = async () => {
    const pdfBuffer = await buildFilledPdf(order);

    // Kein transporter.verify() vor dem Versand: Das baute eine komplette
    // SMTP-Verbindung samt TLS-Handshake und Anmeldung auf, die sendMail danach
    // ein zweites Mal aufbauen musste – der Kunde wartete dadurch doppelt so lange
    // auf die Danke-Seite. Fehlerhafte Zugangsdaten fallen unverändert auf, weil
    // sendMail dann wirft und die Route 500 meldet.
    const logoAttachment = {
      filename: "SHLogo.png",
      path: path.join(process.cwd(), "public", "SHLogo-email.png"),
      cid: "sh-logo", // referenziert im HTML als src="cid:sh-logo"
    };

    // Feste Message-ID je Auftrag: Wird derselbe Auftrag doch zweimal zugestellt
    // (z.B. Wiederholung auf einer anderen Instanz), erkennen Mailprogramme wie
    // Gmail die Kopie als Duplikat.
    const fromDomain = (from || "").split("@")[1] || "dentalschleifen.de";
    const mail = {
      from: `"Schärfservice Hartmann" <${from}>`,
      to: order.email,
      bcc: ownerBcc,
      replyTo: "hartmann-schaerfservice@web.de",
      subject: "Ihre Auftragsbestätigung – Schärfservice Hartmann",
      messageId: `<${orderId}@${fromDomain}>`,
      headers: { "X-Order-ID": orderId },
      html: customerConfirmationHtml(order),
      attachments: [
        {
          filename: "Schaerfauftrag.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
        logoAttachment,
      ],
    };

    // Auftragsbestätigung an den Kunden – mit Blindkopie (BCC) an die Betreiber-Adressen,
    // sodass der Betreiber exakt dieselbe Bestätigung (inkl. PDF) erhält. Ein einziger,
    // kritischer Versand: schlägt er fehl, meldet die Route 500 und das Formular zeigt
    // dem Kunden einen Fehler statt still weiterzuleiten.
    // Vorübergehende SMTP-Fehler (Verbindungsabbruch, Timeout, 4xx) werden einmal
    // serverseitig wiederholt – vorher scheiterte hier der erste Klick.
    for (let attempt = 1; ; attempt++) {
      // Kurze, explizite Timeouts: Die nodemailer-Standards (bis zu 2 Min. Verbindungsaufbau)
      // lagen weit über dem Timeout des Formulars. Der Kunde sah dann einen Fehler, obwohl
      // die Mail ggf. später noch rausging – und schickte den Auftrag ein zweites Mal ab.
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // 465 = implizit TLS, sonst STARTTLS
        auth: { user, pass },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      });
      try {
        await transporter.sendMail(mail);
        console.info(`Schärfauftrag ${orderId}: versendet (Versuch ${attempt})`);
        return;
      } catch (error) {
        if (attempt >= 2 || !isTransientSmtpError(error)) throw error;
        console.warn(`Schärfauftrag ${orderId}: Versuch ${attempt} fehlgeschlagen, wiederhole`, error);
        await sleep(1000);
      } finally {
        transporter.close();
      }
    }
  };

  const promise = send();
  recentOrders.set(orderId, { promise, at: Date.now() });

  try {
    await promise;
    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    recentOrders.delete(orderId);
    console.error(`Fehler beim Versand des Schärfauftrags ${orderId}:`, error);
    return NextResponse.json(
      { error: "Auftrag konnte nicht versendet werden." },
      { status: 500 }
    );
  }
}
