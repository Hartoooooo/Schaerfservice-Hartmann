import { INSTRUMENT_ROWS, MAX_QUANTITY_PER_ROW } from "@/lib/schaerfauftrag-prices";
import type { OrderContact } from "@/lib/schaerfauftrag-order";

// Strikte Prüfung der Formulardaten. Der Browser liefert nur Kontaktdaten, Mengen je
// Instrument und Einwilligungen – alles andere (Preise, Summen, Rabatt) rechnet der Server.

export const ORDER_ID_PATTERN = /^[A-Za-z0-9-]{8,64}$/;
const EMAIL_PATTERN = /^[^\s@<>()",;:\\]+@[^\s@<>()",;:\\]+\.[^\s@<>()",;:\\]{2,}$/;
const PHONE_PATTERN = /^[0-9+()/.\s-]*$/;
const PLZ_PATTERN = /^[0-9A-Za-z -]+$/;
// Steuerzeichen inkl. Zeilenumbrüche – in einzeiligen Feldern verboten (Header-Injection)
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u001f\u007f\u2028\u2029]/;
// In der Nachricht sind Zeilenumbrüche erlaubt, andere Steuerzeichen werden entfernt
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_EXCEPT_NEWLINE = /[\u0000-\u0009\u000b-\u001f\u007f]/g;

export interface ValidatedOrderRequest {
  orderId: string;
  contact: OrderContact;
  quantities: number[];
  honeypotFilled: boolean;
}

export class ValidationError extends Error {}

function singleLine(value: unknown, field: string, { min = 0, max }: { min?: number; max: number }): string {
  if (value === undefined || value === null) value = "";
  if (typeof value !== "string") throw new ValidationError(`Ungültige Eingabe: ${field}`);
  const v = value.normalize("NFC").trim();
  if (CONTROL_CHARS.test(v)) throw new ValidationError(`Ungültige Zeichen: ${field}`);
  if (v.length < min) throw new ValidationError(`Bitte ${field} angeben`);
  if (v.length > max) throw new ValidationError(`${field} ist zu lang (max. ${max} Zeichen)`);
  return v;
}

export function validateOrderRequest(input: unknown): ValidatedOrderRequest {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new ValidationError("Ungültige Anfrage");
  }
  const body = input as Record<string, unknown>;

  if (typeof body.orderId !== "string" || !ORDER_ID_PATTERN.test(body.orderId)) {
    throw new ValidationError("Ungültige Anfrage");
  }

  const ansprechpartner = singleLine(body.ansprechpartner, "Ansprechpartner", { min: 1, max: 120 });
  const praxisname = singleLine(body.praxisname, "Praxisanschrift", { min: 1, max: 200 });
  const email = singleLine(body.email, "E-Mail-Adresse", { min: 3, max: 254 });
  if (!EMAIL_PATTERN.test(email)) throw new ValidationError("Ungültige E-Mail-Adresse");
  const telefon = singleLine(body.telefon, "Telefon", { max: 40 });
  if (!PHONE_PATTERN.test(telefon)) throw new ValidationError("Ungültige Telefonnummer");
  const plz = singleLine(body.plz, "PLZ", { min: 1, max: 10 });
  if (!PLZ_PATTERN.test(plz)) throw new ValidationError("Ungültige PLZ");
  const ort = singleLine(body.ort, "Ort", { min: 1, max: 100 });

  if (body.nachricht !== undefined && body.nachricht !== null && typeof body.nachricht !== "string") {
    throw new ValidationError("Ungültige Eingabe: Nachricht");
  }
  const nachricht = String(body.nachricht ?? "")
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS_EXCEPT_NEWLINE, "")
    .trim();
  if (nachricht.length > 2000) throw new ValidationError("Nachricht ist zu lang (max. 2000 Zeichen)");

  if (body.widerrufsrecht !== true || body.agb !== true) {
    throw new ValidationError("Bitte bestätigen Sie Widerrufsbelehrung und AGB");
  }

  const q = body.quantities;
  if (!Array.isArray(q) || q.length !== INSTRUMENT_ROWS.length) {
    throw new ValidationError("Ungültige Auftragspositionen");
  }
  const quantities = q.map((n) => {
    if (typeof n !== "number" || !Number.isInteger(n) || n < 0 || n > MAX_QUANTITY_PER_ROW) {
      throw new ValidationError("Ungültige Menge");
    }
    return n;
  });
  if (quantities.reduce((a, b) => a + b, 0) < 1) {
    throw new ValidationError("Keine Auftragspositionen");
  }

  // Honeypot: für Menschen unsichtbares Feld – nur Bots füllen es aus
  const honeypotFilled = typeof body.website === "string" ? body.website.trim() !== "" : body.website != null;

  return {
    orderId: body.orderId,
    contact: { ansprechpartner, praxisname, email, telefon, plz, ort, nachricht, widerrufsrecht: true, agb: true },
    quantities,
    honeypotFilled,
  };
}
