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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  try {
    const pdfBuffer = await buildFilledPdf(order);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implizit TLS, sonst STARTTLS
      auth: { user, pass },
    });

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

    // Auftragsbestätigung an den Kunden – mit Blindkopie (BCC) an die Betreiber-Adressen,
    // sodass der Betreiber exakt dieselbe Bestätigung (inkl. PDF) erhält. Ein einziger,
    // kritischer Versand: schlägt er fehl, meldet die Route 500 und das Formular zeigt
    // dem Kunden einen Fehler statt still weiterzuleiten.
    await transporter.sendMail({
      from: `"Schärfservice Hartmann" <${from}>`,
      to: order.email,
      bcc: ownerBcc,
      replyTo: "hartmann-schaerfservice@web.de",
      subject: "Ihre Auftragsbestätigung – Schärfservice Hartmann",
      html: customerConfirmationHtml(order),
      attachments: [
        {
          filename: "Schaerfauftrag.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
        logoAttachment,
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Fehler beim Versand des Schärfauftrags:", error);
    return NextResponse.json(
      { error: "Auftrag konnte nicht versendet werden." },
      { status: 500 }
    );
  }
}
