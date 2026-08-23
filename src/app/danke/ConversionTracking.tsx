"use client";

import { useEffect } from "react";

// Google-Ads-Conversion-Label, Format: "AW-17687247253/XXXXXXXX"
// In Vercel als NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL setzen.
const CONVERSION_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

/**
 * Feuert die Google-Ads-Conversion mit dynamischem Auftragswert (netto, ohne MwSt.).
 * Der Wert wird vom Schärfauftrag-Formular in sessionStorage abgelegt und hier einmalig
 * ausgelesen und gesendet. transaction_id verhindert Doppelzählung bei Reload.
 */
export default function ConversionTracking() {
  useEffect(() => {
    if (!CONVERSION_SEND_TO) return; // Kein Label konfiguriert -> nichts feuern

    let data: { value: number; currency: string; transaction_id: string } | null = null;
    try {
      const raw = sessionStorage.getItem("sa_conversion");
      if (raw) data = JSON.parse(raw);
    } catch {
      return;
    }
    if (!data || typeof data.value !== "number") return;

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: CONVERSION_SEND_TO,
        value: data.value, // Number -> Punkt-Dezimaltrennung, kein Komma
        currency: data.currency || "EUR",
        transaction_id: data.transaction_id,
      });
    }

    // Verhindert erneutes Feuern bei Reload der Danke-Seite
    try {
      sessionStorage.removeItem("sa_conversion");
    } catch {
      // ignorieren
    }
  }, []);

  return null;
}
