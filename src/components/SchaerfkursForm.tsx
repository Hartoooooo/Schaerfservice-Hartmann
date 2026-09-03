"use client";

import { analytics } from "@/components/GoogleAnalytics";
import DatePicker from "@/components/ui/DatePicker";
import { useState, useEffect } from "react";

const PRICE_PER_KM = 0.35;

export default function SchaerfkursForm() {
  const [participantCount, setParticipantCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    contactPerson: "",
    street: "",
    practiceName: "",
    postalCode: "",
    city: "",
    email: "",
    phone: ""
  });
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [distanceStatus, setDistanceStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Entfernungsberechnung: serverseitig, nur Adressdaten (Straße/PLZ/Ort), debounced.
  useEffect(() => {
    const postalCode = formData.postalCode.trim();
    const city = formData.city.trim();
    const street = formData.street.trim();

    if (!/^\d{5}$/.test(postalCode)) {
      setDistanceKm(null);
      setDistanceStatus('idle');
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setDistanceStatus('loading');
      try {
        const res = await fetch("/api/distance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postalCode, city, street }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("distance_failed");
        const data = (await res.json()) as { km?: number };
        if (typeof data.km === "number") {
          setDistanceKm(data.km);
          setDistanceStatus('ok');
        } else {
          throw new Error("no_km");
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setDistanceKm(null);
        setDistanceStatus('error');
      }
    }, 700);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [formData.postalCode, formData.city, formData.street]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formsubmitEmail = process.env.NEXT_PUBLIC_SCHAERFKURS_FORMSUBMIT_EMAIL?.trim();
    if (!formsubmitEmail) {
      console.error("NEXT_PUBLIC_SCHAERFKURS_FORMSUBMIT_EMAIL ist nicht gesetzt.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const computedTotal = 285 + Math.max(0, participantCount - 2) * 45;
      const travelKm = distanceKm;
      const computedTravelCost = travelKm != null ? Math.round(travelKm * PRICE_PER_KM) : null;
      const adresse = [
        formData.street.trim(),
        formData.practiceName.trim(),
        `${formData.postalCode.trim()} ${formData.city.trim()}`.trim(),
      ]
        .filter(Boolean)
        .join(", ");

      const payload: Record<string, string | number | boolean> = {
        _subject: `Schärfkurs-Anfrage – ${formData.practiceName || formData.contactPerson}`,
        _replyto: formData.email,
        _captcha: false,
        kurs_typ: "Schärfkurs",
        kurs_datum: formData.date,
        kurs_uhrzeit: formData.time,
        teilnehmer_anzahl: participantCount,
        gesamtpreis_eur: computedTotal,
        ansprechpartner: formData.contactPerson,
        email: formData.email,
        telefon: formData.phone,
        adresse,
        grundpreis: "285€ bis 2 Teilnehmer",
        zusaetzliche_teilnehmer: participantCount > 2 ? participantCount - 2 : 0,
        zusaetzliche_kosten_eur: participantCount > 2 ? (participantCount - 2) * 45 : 0,
        anfahrt: "0,35€ je Kilometer (einfache Strecke)",
        anfahrt_km_einfach: travelKm ?? "nicht ermittelt",
        anfahrt_km_gesamt: travelKm ?? "nicht ermittelt",
        anfahrt_kosten_eur: computedTravelCost ?? "nicht ermittelt",
        gesamt_inkl_anfahrt_eur: computedTravelCost != null ? computedTotal + computedTravelCost : computedTotal,
        anfrage_datum: new Date().toLocaleDateString("de-DE"),
        anfrage_uhrzeit: new Date().toLocaleTimeString("de-DE"),
        website: "www.dentalschleifen.de",
        kurs_dauer: "2 Stunden",
        kurs_ort: "Vor Ort in Ihrer Praxis",
      };

      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(formsubmitEmail)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const body = await res.text();
      let parsed: { success?: string | boolean; message?: string } | null = null;
      try {
        parsed = JSON.parse(body) as { success?: string | boolean; message?: string };
      } catch {
        /* FormSubmit liefert ggf. kein JSON */
      }

      if (!res.ok) {
        throw new Error(parsed?.message || body || res.statusText);
      }
      if (parsed?.success === false || parsed?.success === "false") {
        throw new Error(parsed?.message || "FormSubmit hat die Anfrage abgelehnt.");
      }

      analytics.schaerfkurs("form_submit", {
        participant_count: participantCount,
        total_price: computedTotal,
        date: formData.date,
        time: formData.time,
      });

      setSubmitStatus('success');

      setFormData({
        date: "",
        time: "",
        contactPerson: "",
        street: "",
        practiceName: "",
        postalCode: "",
        city: "",
        email: "",
        phone: ""
      });
      setParticipantCount(1);

    } catch (error) {
      console.error("FormSubmit Fehler:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = 285 + Math.max(0, participantCount - 2) * 45;
  const travelKm = distanceKm;
  const travelCost = travelKm != null ? Math.round(travelKm * PRICE_PER_KM) : null;
  const isValid =
    formData.date &&
    formData.time &&
    formData.contactPerson &&
    formData.street.trim() &&
    formData.practiceName.trim() &&
    formData.postalCode.trim() &&
    formData.city.trim() &&
    formData.email &&
    formData.phone;

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm sm:text-base focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all duration-150 text-gray-900 placeholder-gray-400 outline-none";

  const stepBadge = (n: number) => (
    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center">
      {n}
    </span>
  );

  return (
    <div id="anfrage" className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden scroll-mt-28">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-10 py-6 flex items-start justify-between gap-1 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold text-white whitespace-nowrap leading-none">
            <span className="sm:hidden">Schärfkurs</span>
            <span className="hidden sm:inline">Kurs anfragen</span>
          </h2>
          <p className="hidden sm:block text-sm text-blue-100 mt-1">Unverbindlich, Antwort meist innerhalb von 24h</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-2xl sm:text-3xl font-semibold text-white leading-none">{totalPrice}€</div>
          <div className="mt-1 whitespace-nowrap text-[10px] sm:text-xs leading-tight text-blue-100">zzgl. MwSt. &amp; 0,35€/km Anfahrt</div>
        </div>
      </div>

      <form className="px-6 sm:px-10 py-8 space-y-10" onSubmit={handleSubmit}>
        {/* Schritt 1: Teilnehmer */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {stepBadge(1)}
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Teilnehmeranzahl wählen</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setParticipantCount(n)}
                className={`rounded-xl border-2 py-3 text-center transition-all duration-150 cursor-pointer ${
                  participantCount === n
                    ? "border-blue-600 bg-blue-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className={`block text-lg font-semibold ${participantCount === n ? "text-blue-700" : "text-gray-900"}`}>
                  {n}
                </span>
                <span className={`block text-[11px] ${participantCount === n ? "text-blue-600" : "text-gray-400"}`}>
                  {n === 1 ? "Person" : "Personen"}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">
            285€ bis 2 Teilnehmer &middot; jeder weitere <span className="font-medium text-blue-700">+45€</span>
          </p>
        </div>

        {/* Schritt 2: Termin */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {stepBadge(2)}
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Wunschtermin</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">Datum</label>
              <DatePicker
                value={formData.date}
                onChange={(v) => handleInputChange("date", v)}
                placeholder="Datum wählen"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">Uhrzeit</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Schritt 3: Praxis & Kontakt */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {stepBadge(3)}
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Praxis &amp; Kontakt</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">Ansprechpartner</label>
              <input
                type="text"
                placeholder="Name der Ansprechperson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">Praxisname</label>
              <input
                type="text"
                placeholder="z. B. Zahnarztpraxis Dr. Müller"
                value={formData.practiceName}
                onChange={(e) => handleInputChange("practiceName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">Straße, Hausnr.</label>
              <input
                type="text"
                placeholder="z. B. Hauptstraße 12"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">PLZ</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="10115"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">Ort</label>
                <input
                  type="text"
                  placeholder="z. B. Berlin"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">E-Mail</label>
              <input
                type="email"
                placeholder="ihre@email.de"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-600">Telefon</label>
              <input
                type="tel"
                placeholder="Ihre Telefonnummer"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Anfahrt-Schätzung */}
          {distanceStatus === 'loading' && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
              </svg>
              Anfahrt wird berechnet…
            </div>
          )}
          {distanceStatus === 'error' && (
            <p className="text-xs text-gray-400">
              Anfahrt konnte nicht automatisch berechnet werden – wir berechnen sie mit Ihrer Anfrage.
            </p>
          )}
        </div>

        {/* Zusammenfassung & Submit */}
        <div className="rounded-2xl bg-gray-50 border border-gray-100 px-5 py-4 space-y-2">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{participantCount} {participantCount === 1 ? "Teilnehmer" : "Teilnehmer"}</span>
              {" "}&middot; 2 Stunden &middot; in Ihrer Praxis
            </span>
            <span className="text-sm text-gray-600">{totalPrice}€ <span className="text-xs text-gray-400">Kurs</span></span>
          </div>
          {travelCost != null && (
            <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
              <span>Anfahrt (ca. {travelKm} km)</span>
              <span>ca. {travelCost}€</span>
            </div>
          )}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-900">
              Gesamt
            </span>
            <span className="text-lg font-semibold text-blue-700">
              {travelCost != null ? `ca. ${totalPrice + travelCost}€` : `${totalPrice}€`}{" "}
              <span className="text-xs font-normal text-gray-400">zzgl. MwSt.</span>
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full font-semibold py-4 px-6 rounded-2xl text-base transition-all duration-150 shadow-sm ${
              isSubmitting || !isValid
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Wird gesendet..." : "Unverbindlich anfragen"}
          </button>

          {submitStatus === 'success' && (
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800 text-center">
              Ihre Schärfkurs-Anfrage wurde erfolgreich gesendet.
              <br className="hidden sm:block" />
              Wir melden uns schnellstmöglich bei Ihnen.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-800 text-center">
              Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
