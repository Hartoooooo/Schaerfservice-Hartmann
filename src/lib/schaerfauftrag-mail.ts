import "server-only";
import path from "path";
import nodemailer from "nodemailer";
import {
  buildFilledPdf,
  customerConfirmationHtml,
  type OrderPayload,
} from "@/lib/schaerfauftrag-order";

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

/** Kurzbeschreibung eines Versandfehlers ohne personenbezogene Daten (für DB und Logs) */
export function describeMailError(error: unknown): string {
  const e = error as { code?: string; responseCode?: number; message?: string };
  return [e?.code, e?.responseCode, e?.message?.split("\n")[0]]
    .filter(Boolean)
    .join(" ")
    .replace(/[^\x20-\x7E]/g, "")
    .slice(0, 300) || "Unbekannter Fehler";
}

function smtpConfig() {
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
  if (!host || !user || !pass || !from) return null;
  return { host, port, user, pass, from, ownerBcc };
}

export function isMailConfigured(): boolean {
  return smtpConfig() !== null;
}

/**
 * Versendet die Auftragsbestätigung an den Kunden – mit Blindkopie (BCC) an die
 * Betreiber-Adressen, sodass der Betreiber exakt dieselbe Bestätigung (inkl. PDF) erhält.
 * Wirft bei Fehlschlag. Vorübergehende SMTP-Fehler werden einmal wiederholt.
 */
export async function sendOrderConfirmation(order: OrderPayload, orderId: string): Promise<void> {
  const config = smtpConfig();
  if (!config) throw new Error("SMTP-Konfiguration fehlt (SMTP_HOST/SMTP_USER/SMTP_PASS)");
  const { host, port, user, pass, from, ownerBcc } = config;

  const pdfBuffer = await buildFilledPdf(order);

  // Feste Message-ID je Auftrag: Wird derselbe Auftrag doch zweimal zugestellt
  // (z.B. Nachversand nach unklarem Fehler), erkennen Mailprogramme wie Gmail die
  // Kopie als Duplikat.
  const fromDomain = from.split("@")[1] || "dentalschleifen.de";
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
      {
        filename: "SHLogo.png",
        path: path.join(process.cwd(), "public", "SHLogo-email.png"),
        cid: "sh-logo", // referenziert im HTML als src="cid:sh-logo"
      },
    ],
  };

  // Kein transporter.verify() vor dem Versand: Das baute eine komplette SMTP-Verbindung
  // samt TLS-Handshake und Anmeldung auf, die sendMail danach ein zweites Mal aufbauen
  // musste. Fehlerhafte Zugangsdaten fallen trotzdem auf, weil sendMail dann wirft.
  for (let attempt = 1; ; attempt++) {
    // Kurze, explizite Timeouts: Die nodemailer-Standards (bis zu 2 Min. Verbindungsaufbau)
    // lagen weit über dem Timeout des Formulars. Der Kunde sah dann einen Fehler, obwohl
    // die Mail ggf. später noch rausging – und schickte den Auftrag ein zweites Mal ab.
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implizit TLS, sonst STARTTLS
      // Nie unverschlüsselt senden. SMTP_ALLOW_INSECURE=1 nur für lokale Tests mit Test-Mailserver.
      requireTLS: port !== 465 && process.env.SMTP_ALLOW_INSECURE !== "1",
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    try {
      await transporter.sendMail(mail);
      console.info(`Schärfauftrag ${orderId}: Mail versendet (Versuch ${attempt})`);
      return;
    } catch (error) {
      if (attempt >= 2 || !isTransientSmtpError(error)) throw error;
      console.warn(`Schärfauftrag ${orderId}: Versuch ${attempt} fehlgeschlagen, wiederhole – ${describeMailError(error)}`);
      await sleep(1000);
    } finally {
      transporter.close();
    }
  }
}
