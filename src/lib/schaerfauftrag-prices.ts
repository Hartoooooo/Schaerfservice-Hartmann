// Preisliste und Preisberechnung für den Schärfauftrag.
// Einzige Quelle der Wahrheit: Die Seite zeigt diese Preise an, das Formular rechnet
// damit die Vorschau, und die API-Route rechnet den verbindlichen Auftrag serverseitig
// damit neu – Preise aus dem Browser werden nie übernommen.

export type InstrumentRow = {
  name: string;
  price: string;
  price7: string;
  price15: string;
  price75: string;
};

export const INSTRUMENT_ROWS: InstrumentRow[] = [
  { name: "Scaler & Küretten", price: "€7,00", price7: "€6,50", price15: "€6,00", price75: "€5,50" },
  { name: "Exkavatoren", price: "€7,00", price7: "€6,50", price15: "€6,00", price75: "€5,50" },
  { name: "Knochenküretten & scharfe Löffel", price: "€7,00", price7: "€6,50", price15: "€6,00", price75: "€5,50" },
  { name: "Meißel & Gingivalrandschräger", price: "€7,00", price7: "€6,50", price15: "€6,00", price75: "€5,50" },
  { name: "Messer & Schnitzinstrumente", price: "€7,00", price7: "€6,50", price15: "€6,00", price75: "€5,50" },
  { name: "Microscheren", price: "€26,00", price7: "€24,50", price15: "€22,00", price75: "€21,00" },
  { name: "Periotome & Tunnelierungsinstr.", price: "€7,00", price7: "€6,50", price15: "€6,00", price75: "€5,50" },
  { name: "Raspatorien", price: "€13,00", price7: "€12,00", price15: "€11,00", price75: "€10,50" },
  { name: "Scheren", price: "€17,00", price7: "€16,00", price15: "€14,50", price75: "€13,50" },
  { name: "Wurzelheber & Luxatoren", price: "€7,00", price7: "€6,50", price15: "€6,00", price75: "€5,50" },
];

export const FREE_SHIPPING_QUANTITY = 30;
export const MID_TIER_QUANTITY = 40;
export const SHIPPING_COST = 5.9;
export const VAT_RATE = 0.19;
export const MAX_QUANTITY_PER_ROW = 999;

/** "€6,50" → 6.5 */
export function parsePrice(value: string): number {
  return parseFloat(value.replace(/[€*.,\s]/g, (m) => (m === "," ? "." : "")) || "0");
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Preisstufe passend zur Gesamtmenge */
export function unitPriceFor(row: InstrumentRow, totalQuantity: number): string {
  if (totalQuantity >= 70) return row.price75;
  if (totalQuantity >= MID_TIER_QUANTITY) return row.price15;
  if (totalQuantity >= 15) return row.price7;
  return row.price;
}

export function discountInfoFor(totalQuantity: number): string {
  if (totalQuantity >= 70) return "20% Rabatt (ab 70 Instrumente)";
  if (totalQuantity >= MID_TIER_QUANTITY) return "15% Rabatt (ab 40 Instrumente)";
  if (totalQuantity >= 15) return "7% Rabatt (ab 15 Instrumente)";
  return "Kein Rabatt";
}

export interface CalculatedItem {
  name: string;
  quantity: number;
  unitPrice: string;
  totalPrice: number;
}

export interface CalculatedOrder {
  items: CalculatedItem[]; // nur Positionen mit Menge > 0
  totalQuantity: number;
  subtotal: number;
  shipping: number;
  totalNet: number;
  vat: number;
  totalGross: number;
  discountInfo: string;
}

/** Berechnet den Auftrag aus den Mengen je Zeile (gleiche Reihenfolge wie INSTRUMENT_ROWS). */
export function calculateOrder(quantities: number[], rows: InstrumentRow[] = INSTRUMENT_ROWS): CalculatedOrder {
  const totalQuantity = rows.reduce((sum, _, idx) => sum + (quantities[idx] ?? 0), 0);
  const items = rows
    .map((row, idx) => {
      const quantity = quantities[idx] ?? 0;
      const unitPrice = unitPriceFor(row, totalQuantity);
      return { name: row.name, quantity, unitPrice, totalPrice: round2(quantity * parsePrice(unitPrice)) };
    })
    .filter((item) => item.quantity > 0);

  const subtotal = round2(items.reduce((sum, item) => sum + item.totalPrice, 0));
  const shipping = totalQuantity > 0 && totalQuantity < FREE_SHIPPING_QUANTITY ? SHIPPING_COST : 0;
  const totalNet = totalQuantity > 0 ? round2(subtotal + shipping) : 0;
  const vat = round2(totalNet * VAT_RATE);
  const totalGross = round2(totalNet + vat);

  return { items, totalQuantity, subtotal, shipping, totalNet, vat, totalGross, discountInfo: discountInfoFor(totalQuantity) };
}
