import { NextResponse } from "next/server";

/**
 * Datenschutzkonforme Entfernungsberechnung zur Werkstatt in Schöneiche bei Berlin.
 *
 * - Geocoding läuft ausschließlich serverseitig: die IP des Besuchers wird nie an
 *   den externen Dienst weitergegeben.
 * - Übertragen werden nur die Adressdaten (Straße, PLZ, Ort) zur Standortbestimmung,
 *   keine weiteren personenbezogenen Angaben (kein Name, keine E-Mail, kein Telefon).
 * - Es werden keine personenbezogenen Daten gespeichert oder geloggt.
 * - Rechtsgrundlage: vorvertragliche Maßnahme (Art. 6 Abs. 1 lit. b DSGVO), da die
 *   Anfahrtsschätzung Teil der vom Nutzer angefragten Angebotsstellung ist.
 * - Ergebnis ist eine Schätzung (Luftlinie × Umwegfaktor), keine exakte Fahrstrecke.
 */

// Werkstatt: Schöneiche bei Berlin
const ORIGIN = { lat: 52.4772, lon: 13.6883 };
// Umwegfaktor Luftlinie -> Straße (Erfahrungswert)
const ROUTE_FACTOR = 1.3;

function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const lat1 = (aLat * Math.PI) / 180;
  const lat2 = (bLat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export async function POST(request: Request) {
  let postalCode = "";
  let city = "";
  let street = "";
  try {
    const body = await request.json();
    postalCode = String(body?.postalCode ?? "").trim();
    city = String(body?.city ?? "").trim();
    street = String(body?.street ?? "").trim();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Deutsche PLZ (5-stellig) als Minimum; Straße + Ort präzisieren das Ergebnis.
  if (!/^\d{5}$/.test(postalCode)) {
    return NextResponse.json({ error: "invalid_postal_code" }, { status: 400 });
  }

  // Strukturierte Nominatim-Abfrage: liefert mit Straße die genaue Fahradresse.
  const params = new URLSearchParams({
    format: "jsonv2",
    country: "Deutschland",
    postalcode: postalCode,
    limit: "1",
  });
  if (city) params.set("city", city);
  if (street) params.set("street", street);

  const geocode = async (p: URLSearchParams) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${p.toString()}`, {
      headers: {
        // Nominatim-Nutzungsrichtlinie verlangt aussagekräftigen User-Agent.
        "User-Agent": "schaerfservice-hartmann/1.0 (kilometerschaetzung)",
        "Accept-Language": "de",
      },
      // Adressbezogene Ergebnisse ändern sich praktisch nie -> cachebar.
      next: { revalidate: 60 * 60 * 24 * 30 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  };

  try {
    let hit = await geocode(params);

    // Fallback: exakte Adresse nicht auffindbar (z. B. Tippfehler in der Straße)
    // -> gröbere Abfrage nur mit PLZ + Ort.
    if (!hit && street) {
      const coarse = new URLSearchParams({
        format: "jsonv2",
        country: "Deutschland",
        postalcode: postalCode,
        limit: "1",
      });
      if (city) coarse.set("city", city);
      hit = await geocode(coarse);
    }

    if (!hit) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const airline = haversineKm(ORIGIN.lat, ORIGIN.lon, parseFloat(hit.lat), parseFloat(hit.lon));
    const km = Math.round(airline * ROUTE_FACTOR);

    return NextResponse.json({ km, estimated: true });
  } catch {
    return NextResponse.json({ error: "geocoding_error" }, { status: 502 });
  }
}
