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
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (!order?.email || !isValidEmail(order.email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    return NextResponse.json({ error: "Keine Auftragspositionen" }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || user;

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

    await transporter.sendMail({
      from: `"Schärfservice Hartmann" <${from}>`,
      to: order.email,
      replyTo: "hartmann-schaerfservice@web.de",
      subject: "Ihre Auftragsbestätigung – Schärfservice Hartmann",
      html: customerConfirmationHtml(order),
      attachments: [
        {
          filename: "Schaerfauftrag.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Fehler beim Versand der Auftragsbestätigung:", error);
    return NextResponse.json(
      { error: "Auftragsbestätigung konnte nicht versendet werden." },
      { status: 500 }
    );
  }
}
