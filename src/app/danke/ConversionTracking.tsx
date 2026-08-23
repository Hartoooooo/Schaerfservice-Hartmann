"use client";

import { useEffect } from "react";

// Optionales Google-Ads-Conversion-Label für eine MANUELLE Snippet-Conversion.
// Format: "AW-17687247253/XXXXXXXX". Nur nötig, wenn ihr eine eigene
// Code-Snippet-Conversion anlegt. Für die GA4-basierte Wertübergabe NICHT erforderlich.
const CONVERSION_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

/**
 * Meldet den Auftragswert (netto, ohne MwSt.) beim Abschluss.
 *
 * Primärer Weg: GA4-Standard-Event "purchase" mit value/currency/transaction_id.
 * Da die GA4-"purchase"-Conversion bereits nach Google Ads importiert ist, fließt
 * der Wert automatisch dorthin – ohne Conversion-Label.
 *
 * Optionaler Weg: Ist ein manuelles Ads-Conversion-Label gesetzt, wird zusätzlich
 * die klassische gtag-"conversion" gefeuert.
 *
 * Wert kommt als Number (Punkt-Dezimaltrennung, kein Komma). transaction_id
 * verhindert Doppelzählung bei Reload.
 */
export default function ConversionTracking() {
  useEffect(() => {
    let data: { value: number; currency: string; transaction_id: string } | null = null;
    try {
      const raw = sessionStorage.getItem("sa_conversion");
      if (raw) data = JSON.parse(raw);
    } catch {
      return;
    }
    if (!data || typeof data.value !== "number") return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    // GA4-Standard-Purchase-Event (fließt in die importierte GA4->Ads-Conversion)
    window.gtag("event", "purchase", {
      value: data.value, // Number -> Punkt, kein Komma
      currency: data.currency || "EUR",
      transaction_id: data.transaction_id,
    });

    // Optional: manuelle Google-Ads-Snippet-Conversion (nur wenn Label konfiguriert)
    if (CONVERSION_SEND_TO) {
      window.gtag("event", "conversion", {
        send_to: CONVERSION_SEND_TO,
        value: data.value,
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
