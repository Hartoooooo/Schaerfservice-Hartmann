import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  buildFilledPdf,
  customerConfirmationHtml,
  ownerNotificationHtml,
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
  // Betreiber-Adresse (Empfänger der internen Auftragsbenachrichtigung)
  const ownerTo = process.env.MAIL_TO || "hartmann-schaerfservice@web.de";

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

    // Verbindung/Anmeldung vorab prüfen, damit Konfigurationsfehler klar erkennbar sind
    await transporter.verify();

    const logoAttachment = {
      filename: "SHLogo.png",
      path: path.join(process.cwd(), "public", "SHLogo-email.png"),
      cid: "sh-logo", // referenziert im HTML als src="cid:sh-logo"
    };

    // 1) Interne Benachrichtigung an den Betreiber (kritisch – darf nicht verloren gehen)
    await transporter.sendMail({
      from: `"Schärfservice Hartmann" <${from}>`,
      to: ownerTo,
      replyTo: order.email,
      subject: `Neuer Schärfauftrag – ${order.praxisname || order.ansprechpartner || order.email}`,
      html: ownerNotificationHtml(order),
      attachments: [
        {
          filename: "Schaerfauftrag.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
        logoAttachment,
      ],
    });

    // 2) Auftragsbestätigung an den Kunden (best effort – Fehler blockiert den Auftrag nicht,
    //    da die Betreiber-Benachrichtigung bereits sicher raus ist)
    let customerMailSent = true;
    try {
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
          logoAttachment,
        ],
      });
    } catch (customerError) {
      customerMailSent = false;
      console.error("Kundenbestätigung konnte nicht versendet werden:", customerError);
    }

    return NextResponse.json({ ok: true, customerMailSent });
  } catch (error) {
    console.error("Fehler beim Versand des Schärfauftrags:", error);
    return NextResponse.json(
      { error: "Auftrag konnte nicht versendet werden." },
      { status: 500 }
    );
  }
}
