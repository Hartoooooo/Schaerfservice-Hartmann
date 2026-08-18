import fs from "fs";
import path from "path";
import { PDFDocument, TextAlignment } from "pdf-lib";

// Datenstruktur, die vom Formular an die API-Route geschickt wird
export interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: string; // z.B. "€6,61"
  totalPrice: number; // z.B. 13.22
}

export interface OrderPayload {
  // Kontaktdaten
  praxisname: string;
  ansprechpartner: string;
  email: string;
  telefon: string;
  plz: string;
  ort: string;
  nachricht: string;

  // Auftragsdaten
  items: OrderItem[]; // nur Positionen mit quantity > 0
  totalQuantity: number;

  // Preise
  subtotal: number;
  shipping: number;
  totalNet: number;
  vat: number;
  totalGross: number;
  discountInfo: string;

  // Einverständnis
  widerrufsrecht: boolean;
  agb: boolean;

  // Reihenfolge aller Instrumentenzeilen (für PDF-Mapping menge_0..9)
  allItemNames: string[];
}

const EUR = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);

const escapeHtml = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Befüllt die vorhandene Preislisten-PDF (public/Schaerfpreisliste2026.pdf)
 * mit den Mengen und Kundendaten und gibt sie als Buffer zurück.
 */
export async function buildFilledPdf(order: OrderPayload): Promise<Buffer> {
  const pdfPath = path.join(process.cwd(), "public", "Schaerfpreisliste2026.pdf");
  const bytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(bytes);
  const form = pdfDoc.getForm();

  const trySet = (fieldName: string, value: string) => {
    try {
      const field = form.getTextField(fieldName);
      field.setText(value);
    } catch {
      // Feld existiert nicht – ignorieren
    }
  };

  // Mengen: menge_0 .. menge_9 folgen exakt der Zeilenreihenfolge (oben nach unten)
  order.allItemNames.forEach((name, idx) => {
    const item = order.items.find((i) => i.name === name);
    const qty = item ? item.quantity : 0;
    try {
      const field = form.getTextField(`menge_${idx}`);
      field.setAlignment(TextAlignment.Center);
      field.setText(qty > 0 ? String(qty) : "");
    } catch {
      // Feld existiert nicht – ignorieren
    }
  });

  // Schnellstmögliche Bearbeitung immer ankreuzen
  try {
    form.getCheckBox("rs_schnell").check();
  } catch {
    // Feld existiert nicht – ignorieren
  }

  // Kundendaten
  trySet("ansprechpartner", order.ansprechpartner);
  trySet("praxis", order.praxisname);
  trySet("anschrift", order.praxisname);
  trySet("plzort", `${order.plz} ${order.ort}`.trim());
  trySet("datum", new Date().toLocaleDateString("de-DE"));

  form.flatten();
  const out = await pdfDoc.save();
  return Buffer.from(out);
}

/** Auftragspositionen als HTML-Tabellenzeilen */
function itemRowsHtml(items: OrderItem[]): string {
  return items
    .map(
      (it) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eaeaea;">${escapeHtml(it.name)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eaeaea;text-align:center;">${it.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eaeaea;text-align:right;">${escapeHtml(it.unitPrice)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eaeaea;text-align:right;">${EUR(it.totalPrice)}</td>
        </tr>`
    )
    .join("");
}

/** Preis-/Summenblock als HTML */
function totalsHtml(order: OrderPayload): string {
  const row = (label: string, value: string, bold = false) => `
    <tr>
      <td style="padding:6px 12px;text-align:right;color:#555;${bold ? "font-weight:700;color:#111;" : ""}">${label}</td>
      <td style="padding:6px 12px;text-align:right;white-space:nowrap;${bold ? "font-weight:700;color:#111;" : ""}">${value}</td>
    </tr>`;
  return `
    <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:8px;">
      ${row(`Zwischensumme netto${order.discountInfo && order.discountInfo !== "Kein Rabatt" ? ` (${escapeHtml(order.discountInfo)})` : ""}`, EUR(order.subtotal))}
      ${row("Versand", EUR(order.shipping))}
      ${row("Gesamtbetrag netto", EUR(order.totalNet))}
      ${row("MwSt. 19 %", EUR(order.vat))}
      ${row("Gesamtbetrag brutto", EUR(order.totalGross), true)}
    </table>`;
}

const BRAND = "#2563eb";
const SHIPPING_ADDRESS = "Schärfservice Hartmann · Petershagener Str. 27 · 15566 Schöneiche bei Berlin";

function shell(title: string, inner: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">
  <table role="presentation" style="width:100%;border-collapse:collapse;background:#f4f5f7;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" style="width:100%;max-width:640px;border-collapse:collapse;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
        <tr><td style="background:${BRAND};padding:24px 32px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="vertical-align:middle;">
                <div style="color:#ffffff;font-size:18px;font-weight:700;">Schärfservice Hartmann</div>
                <div style="color:#dbeafe;font-size:13px;margin-top:2px;">${escapeHtml(title)}</div>
              </td>
              <td style="vertical-align:middle;text-align:right;width:96px;">
                <img src="cid:sh-logo" alt="Schärfservice Hartmann Logo" width="72" style="width:72px;height:auto;display:inline-block;background:#ffffff;border-radius:8px;padding:6px;">
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:32px;">
          ${inner}
        </td></tr>
        <tr><td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #eaeaea;color:#6b7280;font-size:12px;line-height:1.6;">
          Schärfservice Hartmann · Petershagener Str. 27 · 15566 Schöneiche bei Berlin<br>
          Tel. +49 174 9342576 · hartmann-schaerfservice@web.de · www.dentalschleifen.de
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const itemsTable = (order: OrderPayload) => `
  <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
    <thead>
      <tr>
        <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;color:#374151;">Instrument</th>
        <th style="padding:8px 12px;text-align:center;border-bottom:2px solid #e5e7eb;color:#374151;">Menge</th>
        <th style="padding:8px 12px;text-align:right;border-bottom:2px solid #e5e7eb;color:#374151;">Einzelpreis</th>
        <th style="padding:8px 12px;text-align:right;border-bottom:2px solid #e5e7eb;color:#374151;">Gesamt</th>
      </tr>
    </thead>
    <tbody>${itemRowsHtml(order.items)}</tbody>
  </table>`;

const contactBlock = (order: OrderPayload) => `
  <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
    <tr><td style="padding:2px 0;color:#6b7280;width:150px;">Ansprechpartner</td><td style="padding:2px 0;">${escapeHtml(order.ansprechpartner)}</td></tr>
    <tr><td style="padding:2px 0;color:#6b7280;">Praxisanschrift</td><td style="padding:2px 0;">${escapeHtml(order.praxisname)}</td></tr>
    <tr><td style="padding:2px 0;color:#6b7280;">PLZ / Ort</td><td style="padding:2px 0;">${escapeHtml(order.plz)} ${escapeHtml(order.ort)}</td></tr>
    <tr><td style="padding:2px 0;color:#6b7280;">E-Mail</td><td style="padding:2px 0;">${escapeHtml(order.email)}</td></tr>
    <tr><td style="padding:2px 0;color:#6b7280;">Telefon</td><td style="padding:2px 0;">${escapeHtml(order.telefon || "–")}</td></tr>
  </table>`;

/** HTML-Auftragsbestätigung an den Kunden */
export function customerConfirmationHtml(order: OrderPayload): string {
  const inner = `
    <p style="font-size:16px;margin:0 0 4px;">Vielen Dank für Ihren Auftrag!</p>
    <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 24px;">
      Guten Tag ${escapeHtml(order.ansprechpartner)},<br>
      wir haben Ihren Schärfauftrag erhalten und bestätigen diesen hiermit.
      Bitte senden Sie Ihre Instrumente an folgende Adresse:
    </p>

    <p style="font-size:15px;font-weight:700;color:#111;text-align:center;margin:20px 0;padding:14px 16px;background:#eff6ff;border-radius:12px;line-height:1.6;">
      ${escapeHtml(SHIPPING_ADDRESS)}
    </p>

    <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 24px;">
      Nach Eingang beginnen wir mit der Bearbeitung (in der Regel ca. 5 Werktage).
    </p>

    <h3 style="font-size:15px;margin:0 0 8px;color:#111;">Ihre Kontaktdaten</h3>
    ${contactBlock(order)}

    <h3 style="font-size:15px;margin:24px 0 8px;color:#111;">Auftragsübersicht</h3>
    ${itemsTable(order)}
    ${totalsHtml(order)}

    ${
      order.nachricht
        ? `<h3 style="font-size:15px;margin:24px 0 8px;color:#111;">Ihre Nachricht</h3>
           <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0;">${escapeHtml(order.nachricht)}</p>`
        : ""
    }

    <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:28px 0 0;">
      Bei Rückfragen erreichen Sie uns unter +49 174 9342576 oder per Antwort auf diese E-Mail.
    </p>`;
  return shell("Ihre Auftragsbestätigung", inner);
}
