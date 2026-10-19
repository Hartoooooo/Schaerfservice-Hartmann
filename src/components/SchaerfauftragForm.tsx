"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Stepper, { Step } from "@/components/Stepper";
import {
  calculateOrder,
  FREE_SHIPPING_QUANTITY,
  MID_TIER_QUANTITY,
  type InstrumentRow,
} from "@/lib/schaerfauftrag-prices";

interface SchaerfauftragFormProps {
  rows: InstrumentRow[];
}

// Fehlermeldung vom Server, die dem Kunden direkt angezeigt werden kann
class UserFacingError extends Error {}

function FreeShippingProgress({ quantity }: { quantity: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_QUANTITY - quantity);
  const progress = Math.min(100, (quantity / FREE_SHIPPING_QUANTITY) * 100);
  const freeShippingUnlocked = remaining === 0;

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-3 sm:flex sm:items-center sm:gap-6">
      <p className="mb-2 text-sm font-normal text-[#1f2937] sm:mb-0 sm:min-w-0 sm:flex-1 sm:text-base" aria-live="polite">
        {freeShippingUnlocked ? (
          "Gratis-Versand freigeschaltet"
        ) : (
          <>
            Noch{" "}
            <span className="font-semibold text-[var(--color-blue-600)]">
              {remaining}
            </span>{" "}
            <span className="sm:hidden">Instr.</span>
            <span className="hidden sm:inline">{remaining === 1 ? "Instrument" : "Instrumente"}</span>{" "}
            bis zum Gratis-Versand
          </>
        )}
      </p>
      <div className="flex w-full items-center gap-2 sm:w-80 sm:shrink-0 lg:w-[26rem]">
        <div
          className="h-2 flex-1 overflow-hidden rounded-full bg-blue-100"
          role="progressbar"
          aria-label="Fortschritt bis zum kostenlosen Versand"
          aria-valuemin={0}
          aria-valuemax={FREE_SHIPPING_QUANTITY}
          aria-valuenow={Math.min(quantity, FREE_SHIPPING_QUANTITY)}
        >
          <div
            className="h-full rounded-full bg-[var(--color-blue-600)] transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="shrink-0 text-[11px] font-semibold tabular-nums text-[var(--color-blue-700)] sm:text-xs">
          {Math.min(quantity, FREE_SHIPPING_QUANTITY)}/{FREE_SHIPPING_QUANTITY}
        </span>
      </div>
    </div>
  );
}

export default function SchaerfauftragForm({ rows }: SchaerfauftragFormProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [quantities, setQuantities] = useState<number[]>(() => rows.map(() => 0));
  const [currentStep, setCurrentStep] = useState(1);

  // Sanftes, einheitliches und bewusst langsames Hochscrollen zum Stepper bei jedem Schrittwechsel
  const scrollToStepperTop = () => {
    if (typeof window === "undefined") return;
    const el = containerRef.current;
    if (!el) return;

    const startY = window.scrollY;
    const targetY = Math.max(0, el.getBoundingClientRect().top + startY - 96); // Offset für fixe Navigation
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;

    const duration = 500; // ms – abgestimmt auf die Höhen-Animation des Step-Containers
    const startTime = performance.now();
    // easeOutCubic – passt zur Ease-Out-Kurve des Containers (schneller Start, sanftes Ausklingen)
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };
  
  // Kontaktformular State
  const [formData, setFormData] = useState({
    praxisname: "",
    ansprechpartner: "",
    email: "",
    telefon: "",
    plz: "",
    ort: "",
    nachricht: "",
  });

  // Checkbox State für Step 4
  const [checkboxes, setCheckboxes] = useState({
    widerrufsrecht: false,
    agbAkzeptiert: false,
  });

  // Versand-State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // Sofort wirksame Sperre gegen Doppel-Tap (State greift erst nach dem nächsten Render)
  const submittingRef = useRef(false);
  // Eine ID pro Auftrag – bleibt bei automatischen und manuellen Wiederholungen gleich,
  // damit der Server denselben Auftrag nicht doppelt versendet.
  const orderIdRef = useRef<string | null>(null);
  // Honeypot gegen Spam-Bots (für Menschen unsichtbares Feld)
  const [honeypot, setHoneypot] = useState("");

  // Beim Erreichen des letzten Schritts die API-Funktion vorwärmen: Ein Kaltstart fällt
  // so nicht mehr in den eigentlichen Absende-Klick.
  useEffect(() => {
    if (currentStep !== 3) return;
    fetch('/api/schaerfauftrag', { method: 'GET', cache: 'no-store' }).catch(() => {});
  }, [currentStep]);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setCheckboxes(prev => ({ ...prev, [field]: checked }));
  };

  const totalQuantity = useMemo(() => {
    return quantities.reduce((sum, qty) => sum + qty, 0);
  }, [quantities]);

  // Vorschau mit derselben Berechnung, die der Server verbindlich durchführt
  const calculation = useMemo(() => calculateOrder(quantities, rows), [quantities, rows]);
  const subtotalWithDiscount = calculation.subtotal;
  const shipping = calculation.shipping; // Ab 30 Instrumenten versandfrei
  const totalNet = calculation.totalNet; // Gesamtbetrag Netto (mit Rabatt)
  const vat = calculation.vat; // MwSt. 19%
  const totalGross = calculation.totalGross; // Gesamtbetrag Brutto
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

  const handleQtyChange = (rowIndex: number, value: number) => {
    setQuantities(prev => prev.map((q, i) => (i === rowIndex ? value : q)));
  };

  const getPaddingClass = () => {
    return "pb-16"; // Unten; oben pt-12 wie Schärfkurs-Formular nach Page-Header
  };

  // Einheitliche Mindesthöhe für alle Schritte, damit die Übergänge ruhig wirken
  const getStepperClass = () => {
    return "min-h-[700px]";
  };

  // Prüfe ob "Weiter" Button deaktiviert werden soll
  const isNextButtonDisabled = () => {
    // Step 1: Prüfe ob mindestens 1 Instrument ausgewählt wurde
    if (currentStep === 1) {
      return totalQuantity === 0;
    }
    // Step 2: Prüfe ob alle Pflichtfelder ausgefüllt sind
    if (currentStep === 2) {
      return !formData.ansprechpartner.trim() ||
             !emailIsValid ||
             !formData.praxisname.trim() ||
             !formData.plz.trim() ||
             !formData.ort.trim();
    }
    // Step 3: Prüfe ob Checkboxes aktiviert sind
    if (currentStep === 3) {
      return !checkboxes.widerrufsrecht || !checkboxes.agbAkzeptiert;
    }
    return false;
  };

  // Custom Button-Text basierend auf aktuellem Step
  const getCustomNextButtonText = () => {
    if (currentStep === 3) {
      return isSubmitting ? "Wird gesendet..." : "Abschließen";
    }
    return undefined;
  };

  // Auftrag serverseitig per SMTP versenden (Kundenbestätigung inkl. BCC an den Betreiber)
  const sendEmail = async () => {
    if (totalQuantity < 1 || !emailIsValid) {
      setSubmitError("Bitte wählen Sie mindestens ein Instrument und prüfen Sie Ihre E-Mail-Adresse.");
      return false;
    }
    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (!orderIdRef.current) {
        orderIdRef.current = `SA-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      }

      // Nur Kontaktdaten, Mengen und Einwilligungen – Preise und Summen rechnet der Server
      // selbst, damit sie nicht manipuliert werden können.
      const body = JSON.stringify({
        orderId: orderIdRef.current,
        praxisname: formData.praxisname,
        ansprechpartner: formData.ansprechpartner,
        email: formData.email.trim(),
        telefon: formData.telefon,
        plz: formData.plz,
        ort: formData.ort,
        nachricht: formData.nachricht,
        quantities,
        widerrufsrecht: checkboxes.widerrufsrecht,
        agb: checkboxes.agbAkzeptiert,
        website: honeypot,
      });

      // Auftrag serverseitig verarbeiten: Auftragsbestätigung an den Kunden inkl. BCC an
      // den Betreiber (mit ausgefülltem PDF). Dieser Aufruf ist die verbindliche Quelle der
      // Wahrheit – er wird abgewartet, bevor zur Danke-Seite weitergeleitet wird.
      // Automatische Wiederholung bei Netzwerkfehlern und Serverfehlern: Auf dem Handy
      // scheitert der erste POST nach längerem Ausfüllen oft an einer eingeschlafenen
      // Verbindung ("Load failed") – früher musste der Kunde dafür ein zweites Mal klicken.
      // Dank gleicher Auftrags-ID entsteht dabei kein doppelter Auftrag.
      const MAX_ATTEMPTS = 3;
      for (let attempt = 1; ; attempt++) {
        // Timeout je Versuch, damit ein hängender Versand zur Fehlermeldung wird statt
        // ewig zu laden. Liegt über der maximalen Serverlaufzeit für zwei SMTP-Versuche.
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 45000);
        let response: Response | null = null;
        let networkError: unknown = null;
        try {
          response = await fetch('/api/schaerfauftrag', {
            signal: controller.signal,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
            body,
          });
        } catch (error) {
          networkError = error;
        } finally {
          clearTimeout(timeout);
        }

        if (response?.ok) break;

        // 4xx (ungültige Eingaben, zu viele Aufträge, …): Wiederholen bringt nichts
        if (response && response.status >= 400 && response.status < 500) {
          const result = await response.json().catch(() => null);
          throw new UserFacingError(
            typeof result?.error === "string"
              ? result.error
              : "Ihre Eingaben konnten nicht verarbeitet werden"
          );
        }

        const reason = networkError ?? new Error(`Serverantwort ${response?.status}`);
        if (attempt >= MAX_ATTEMPTS) throw reason;
        console.warn(`Auftragsversand Versuch ${attempt} fehlgeschlagen, wiederhole:`, reason);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }

    } catch (error) {
      console.error('Fehler beim Senden des Auftrags:', error);
      setSubmitError(
        error instanceof UserFacingError
          ? `${error.message.replace(/\.$/, "")}. Bitte prüfen Sie Ihre Eingaben oder rufen Sie uns an unter +49 174 9342576.`
          : 'Ihr Auftrag konnte nicht übermittelt werden. Bitte versuchen Sie es erneut. Falls das Problem bestehen bleibt, erreichen Sie uns telefonisch unter +49 174 9342576 oder per E-Mail an hartmann-schaerfservice@web.de.'
      );
      setIsSubmitting(false);
      return false;
    }

    // isSubmitting bleibt bei Erfolg bewusst gesetzt: Der Button bleibt bis zur
    // Weiterleitung gesperrt, damit kein zweiter Auftrag ausgelöst wird.
    return true;
  };

  // Conversion-Wert (netto, ohne MwSt.) für Google Ads zwischenspeichern und zur Danke-Seite wechseln.
  // Wert als Number mit Punkt-Dezimaltrennung, transaction_id verhindert Doppelzählung bei Reload.
  const goToDanke = () => {
    try {
      sessionStorage.setItem(
        'sa_conversion',
        JSON.stringify({
          value: Number(totalNet.toFixed(2)),
          currency: 'EUR',
          transaction_id: orderIdRef.current ?? `SA-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        })
      );
    } catch {
      // sessionStorage nicht verfügbar – Conversion wird dann ohne Wert nicht gefeuert
    }
    // Zugriffs-Flag: erlaubt den Aufruf der Danke-Seite nur nach echtem Auftragsabschluss.
    try {
      sessionStorage.setItem('sa_order_completed', '1');
    } catch {
      // ignorieren
    }
    router.push('/danke');
  };

  // Auftrag abschließen: Erst den (serverbestätigten) Versand ABWARTEN, dann weiterleiten.
  // Nur bei Erfolg geht es zur Danke-Seite; bei Fehler bleibt der Nutzer auf der Seite und
  // sieht die Fehlermeldung. Verhindert die frühere Race-Condition (Navigation bricht den
  // laufenden Mail-Request ab – u.a. in Opera), bei der Aufträge ohne Mail verloren gingen.
  const submitAndRedirect = async () => {
    if (submittingRef.current) return; // Doppelklick / Mehrfachabsenden verhindern
    submittingRef.current = true;
    try {
      const success = await sendEmail();
      if (success) {
        goToDanke();
        return; // Sperre bleibt bis zur Weiterleitung aktiv
      }
    } catch (error) {
      console.error('Unerwarteter Fehler beim Abschließen des Auftrags:', error);
      setIsSubmitting(false);
      setSubmitError('Ihr Auftrag konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.');
    }
    submittingRef.current = false;
  };

  return (
    <div ref={containerRef} className={`container-page ${getPaddingClass()} pt-12 scroll-mt-24`}>
      <Stepper
        initialStep={1}
        disableStepIndicators
        className={getStepperClass()}
        isNextDisabled={isNextButtonDisabled()}
        customNextButtonText={getCustomNextButtonText()}
        onStepChange={async (step) => {
          // Beim Abschluss von Step 4 E-Mail im Hintergrund senden und sofort zur Danke-Seite weiterleiten
          if (currentStep === 3 && step > 3) {
            // Versand abwarten und nur bei Erfolg weiterleiten (kein Schritt-Wechsel)
            submitAndRedirect();
            return;
          }

          setCurrentStep(step);

          // Bei jedem Schrittwechsel einheitlich sanft zum Stepper hochscrollen
          scrollToStepperTop();
          
          console.log(step);
        }}
        onFinalStepCompleted={async () => {
          // Wenn Step 3 abgeschlossen ist: Versand abwarten und nur bei Erfolg weiterleiten
          if (currentStep === 3) {
            submitAndRedirect();
          }
        }}
        backButtonText="Zurück"
        nextButtonText="Weiter"
        renderFooter={({ currentStep, isLastStep, handleBack, handleNext, handleComplete }) => {
          const handleCompleteWithEmail = () => {
            // Versand abwarten und nur bei Erfolg weiterleiten
            submitAndRedirect();
          };

          return (
            <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {currentStep === 1 ? (
                <div className="flex w-full justify-end">
                  <button
                    onClick={handleNext}
                    disabled={isNextButtonDisabled() || isSubmitting}
                    className={`duration-350 flex items-center justify-center rounded-full py-1.5 px-3.5 font-medium tracking-tight transition ${
                      isNextButtonDisabled()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[var(--color-blue-600)] text-white hover:bg-[var(--color-blue-700)] active:bg-[var(--color-blue-800)] cursor-pointer'
                    }`}
                  >
                    {getCustomNextButtonText() || (isLastStep ? 'Abschließen' : 'Weiter')}
                  </button>
                </div>
              ) : (
                <div className="flex w-full justify-between">
                  <button
                    onClick={handleBack}
                    className="duration-350 rounded px-2 py-1 transition cursor-pointer text-neutral-400 hover:text-neutral-700"
                  >
                    Zurück
                  </button>
                  <button
                    onClick={isLastStep ? handleCompleteWithEmail : handleNext}
                    disabled={isNextButtonDisabled() || isSubmitting}
                    className={`duration-350 flex items-center justify-center rounded-full py-1.5 px-3.5 font-medium tracking-tight transition ${
                      isNextButtonDisabled()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[var(--color-blue-600)] text-white hover:bg-[var(--color-blue-700)] active:bg-[var(--color-blue-800)] cursor-pointer'
                    }`}
                  >
                    {isSubmitting && (
                      <svg className="animate-spin mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    )}
                    {getCustomNextButtonText() || (isLastStep ? 'Abschließen' : 'Weiter')}
                  </button>
                </div>
              )}
            </div>
          );
        }}
      >
        <Step>
          <div className="flex flex-row items-center justify-between mb-4 gap-4">
            <h2 className="text-2xl font-semibold">Ihr Schärfauftrag</h2>
            <a 
              href="/Schaerfpreisliste2026.pdf"
              download="Schaerfpreisliste2026.pdf"
              aria-label="Preisliste und Schärfauftrag als PDF herunterladen"
              title="PDF herunterladen"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium md:hidden">PDF</span>
              <span className="hidden md:inline text-sm font-medium">Preisliste/Schärfauftrag (PDF) herunterladen</span>
            </a>
          </div>
          
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            für zahnärztliche und chirurgische Instrumente<br />
            für langlebige Schärfe und präzise Ergebnisse
          </p>
          
          <div className="hidden md:block mb-4 mt-8">
            <h2 className="text-2xl font-semibold">
              Instrumente auswählen
            </h2>
          </div>

          {/* Rabattübersicht für Mobile */}
          <div className="md:hidden grid grid-cols-3 gap-2 mb-2 text-center text-sm text-gray-600">
            <div>
              <p>15–39 Instr.</p>
              <p><span className="font-bold text-gray-900">7%</span> Rabatt</p>
            </div>
            <div>
              <p>40–69 Instr.</p>
              <p><span className="font-bold text-gray-900">15%</span> Rabatt</p>
            </div>
            <div>
              <p>70+ Instr.</p>
              <p><span className="font-bold text-gray-900">20%</span> Rabatt</p>
            </div>
          </div>

          {/* Desktop Tabelle */}
          <div className="table-wrapper hidden md:block">
            <table className="table-apple table-primary-header" style={{ tableLayout: 'fixed', width: '100%' }}>
              <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '16%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Instrumente</th>
                  <th className={`table-number ${totalQuantity < 15 ? 'font-bold' : 'text-gray-400'}`}>
                    Preis
                  </th>
                  <th className={`table-number ${totalQuantity >= 15 && totalQuantity < MID_TIER_QUANTITY ? 'font-bold' : 'text-gray-400'}`}>
                    ab 15 Instr.
                  </th>
                  <th className={`table-number ${totalQuantity >= MID_TIER_QUANTITY && totalQuantity < 70 ? 'font-bold' : 'text-gray-400'}`}>
                    ab 40 Instr.
                  </th>
                  <th className={`table-number ${totalQuantity >= 70 ? 'font-bold' : 'text-gray-400'}`}>
                    ab 70 Instr.
                  </th>
                  <th className="table-number">Menge</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td className={`table-number ${totalQuantity < 15 ? 'font-bold' : 'text-gray-400'}`}>
                      <span className="cell-right">{row.price}</span>
                    </td>
                    <td className={`table-number ${totalQuantity >= 15 && totalQuantity < MID_TIER_QUANTITY ? 'font-bold' : 'text-gray-400'}`}>
                      <span className="cell-right">{row.price7}</span>
                    </td>
                    <td className={`table-number ${totalQuantity >= MID_TIER_QUANTITY && totalQuantity < 70 ? 'font-bold' : 'text-gray-400'}`}>
                      <span className="cell-right">{row.price15}</span>
                    </td>
                    <td className={`table-number ${totalQuantity >= 70 ? 'font-bold' : 'text-gray-400'}`}>
                      <span className="cell-right">{row.price75}</span>
                    </td>
                    <td className="table-number">
                      <div className="qty-controls">
                        <button
                          type="button"
                          className="icon-btn icon-btn-primary"
                          aria-label={`Menge verringern für ${row.name}`}
                          onClick={() => handleQtyChange(idx, Math.max(0, (quantities[idx] ?? 0) - 1))}
                        >
                          −
                        </button>
                        <input
                          className="qty-input"
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={999}
                          value={quantities[idx]}
                          onChange={(e) => {
                            const v = e.target.value;
                            const n = v === "" ? 0 : Number(v);
                            handleQtyChange(idx, isNaN(n) || n < 0 ? 0 : Math.min(999, Math.floor(n)));
                          }}
                          aria-label={`Menge für ${row.name}`}
                        />
                        <button
                          type="button"
                          className="icon-btn icon-btn-primary"
                          aria-label={`Menge erhöhen für ${row.name}`}
                          onClick={() => handleQtyChange(idx, Math.min(999, (quantities[idx] ?? 0) + 1))}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6} className="!p-0">
                    <FreeShippingProgress quantity={totalQuantity} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="text-neutral-600">
                    Zwischensumme Nettobetrag
                    {totalQuantity >= 70 && <span className="text-blue-600 ml-2">(20% Rabatt)</span>}
                    {totalQuantity >= MID_TIER_QUANTITY && totalQuantity < 70 && <span className="text-blue-600 ml-2">(15% Rabatt)</span>}
                    {totalQuantity >= 15 && totalQuantity < MID_TIER_QUANTITY && <span className="text-blue-600 ml-2">(7% Rabatt)</span>}
                  </td>
                  <td className="table-number font-medium">
                    <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subtotalWithDiscount)}</span>
                  </td>
                </tr>
                {totalQuantity > 0 && (
                  <tr>
                    <td colSpan={5} className="text-neutral-600">Versand</td>
                    <td className="table-number font-medium">
                      <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(shipping)}</span>
                    </td>
                  </tr>
                )}
                {totalQuantity > 0 && (
                  <>
                    <tr>
                      <td colSpan={5} className="text-neutral-600 font-semibold">Gesamtbetrag Netto</td>
                      <td className="table-number font-semibold">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalNet)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="text-neutral-600">MwSt. 19%</td>
                      <td className="table-number font-medium">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(vat)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="text-neutral-900 font-bold text-lg">Gesamtbetrag Brutto</td>
                      <td className="table-number font-bold text-lg">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalGross)}</span>
                      </td>
                    </tr>
                  </>
                )}
              </tfoot>
            </table>
          </div>

          {/* Mobile Tabelle */}
          <div className="table-wrapper md:hidden !-mx-2 !w-[calc(100%+1rem)] !rounded-[var(--radius-lg)] !border-x-0">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-left font-semibold text-white">
              Instrumente wählen
            </div>
            <table className="table-apple" style={{ tableLayout: 'fixed', width: '100%' }}>
              <colgroup>
                <col style={{ width: '50%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <tbody>
                {rows.map((row, idx) => {
                  // Berechne aktuellen Preis basierend auf Gesamtmenge
                  const getCurrentPrice = () => {
                    if (totalQuantity >= 70) return row.price75;
                    if (totalQuantity >= MID_TIER_QUANTITY) return row.price15;
                    if (totalQuantity >= 15) return row.price7;
                    return row.price;
                  };
                  
                  return (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td className="table-number">
                        <span className="cell-right">{getCurrentPrice()}</span>
                      </td>
                      <td className="table-number !px-1">
                        <input
                          className="qty-input !w-10 !px-1 max-w-full box-border"
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={999}
                          value={quantities[idx]}
                          onFocus={(e) => {
                            if (quantities[idx] === 0) {
                              e.target.value = "";
                            }
                          }}
                          onBlur={(e) => {
                            if (e.target.value === "") {
                              handleQtyChange(idx, 0);
                            }
                          }}
                          onChange={(e) => {
                            const v = e.target.value;
                            const n = v === "" ? 0 : Number(v);
                            handleQtyChange(idx, isNaN(n) || n < 0 ? 0 : Math.min(999, Math.floor(n)));
                          }}
                          aria-label={`Menge für ${row.name}`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="!p-0">
                    <FreeShippingProgress quantity={totalQuantity} />
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-600">
                    Zwischensumme
                    {totalQuantity >= 70 && <span className="block text-blue-600">(20% Rabatt)</span>}
                    {totalQuantity >= MID_TIER_QUANTITY && totalQuantity < 70 && <span className="block text-blue-600">(15% Rabatt)</span>}
                    {totalQuantity >= 15 && totalQuantity < MID_TIER_QUANTITY && <span className="block text-blue-600">(7% Rabatt)</span>}
                  </td>
                  <td colSpan={2} className="table-number font-medium">
                    <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subtotalWithDiscount)}</span>
                  </td>
                </tr>
                {totalQuantity > 0 && (
                  <tr>
                    <td className="text-neutral-600">Versand</td>
                    <td colSpan={2} className="table-number font-medium">
                      <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(shipping)}</span>
                    </td>
                  </tr>
                )}
                {totalQuantity > 0 && (
                  <>
                    <tr>
                      <td className="whitespace-nowrap text-neutral-600 font-semibold">Gesamtbetrag Netto</td>
                      <td colSpan={2} className="table-number font-semibold">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalNet)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-neutral-600">MwSt. 19%</td>
                      <td colSpan={2} className="table-number font-medium">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(vat)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap text-neutral-900 font-bold text-lg">Gesamtbetrag Brutto</td>
                      <td colSpan={2} className="table-number font-bold text-lg">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalGross)}</span>
                      </td>
                    </tr>
                  </>
                )}
              </tfoot>
            </table>
          </div>
          <div className="h-4" aria-hidden="true" />
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-6">Kontaktdaten</h2>

          <form className="space-y-6">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="ansprechpartner">Ansprechpartner *</label>
                <input
                  type="text"
                  id="ansprechpartner"
                maxLength={120}
                  className="form-input"
                  value={formData.ansprechpartner}
                  onChange={(e) => handleFormChange("ansprechpartner", e.target.value)}
                  required
                  placeholder="z.B. Dr. Max Mustermann"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="telefon">Telefon</label>
                <input
                  type="tel"
                  id="telefon"
                maxLength={40}
                  className="form-input"
                  value={formData.telefon}
                  onChange={(e) => handleFormChange("telefon", e.target.value)}
                  placeholder="z.B. 0174 1234567"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">E-Mail *</label>
              <input
                type="email"
                id="email"
                maxLength={254}
                className="form-input"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                required
                placeholder="z.B. praxis@beispiel.de"
              />
              {formData.email.trim() && !emailIsValid && (
                <p className="text-sm text-red-700 mt-1">Bitte gültige E-Mail-Adresse eingeben.</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="praxisname">Praxisanschrift *</label>
                <input
                  type="text"
                  id="praxisname"
                maxLength={200}
                  className="form-input"
                  value={formData.praxisname}
                  onChange={(e) => handleFormChange("praxisname", e.target.value)}
                  required
                  placeholder="z.B. Zahnarztpraxis Dr. Müller, Hauptstraße 1"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="plz">PLZ *</label>
                <input
                  type="text"
                  id="plz"
                maxLength={10}
                  className="form-input"
                  value={formData.plz}
                  onChange={(e) => handleFormChange("plz", e.target.value)}
                  required
                  placeholder="z.B. 10115"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ort">Ort *</label>
                <input
                  type="text"
                  id="ort"
                maxLength={100}
                  className="form-input"
                  value={formData.ort}
                  onChange={(e) => handleFormChange("ort", e.target.value)}
                  required
                  placeholder="z.B. Berlin"
                />
              </div>
            </div>

            {/* Honeypot: für Menschen unsichtbar, Bots füllen es aus → Auftrag wird verworfen */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="nachricht">Nachricht / Besondere Wünsche</label>
              <textarea
                id="nachricht"
                maxLength={2000}
                className="form-input form-textarea"
                value={formData.nachricht}
                onChange={(e) => handleFormChange("nachricht", e.target.value)}
                placeholder="Zusätzliche Informationen zu Ihrem Schärfauftrag..."
              />
            </div>
          </form>
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-6">Bestätigung & Abschluss</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-6">
            <div className="bg-gray-50 rounded-lg p-6 order-2 md:order-1">
              <h3 className="text-lg font-medium mb-4 text-gray-900">Bitte bestätigen Sie folgende Bedingungen:</h3>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.widerrufsrecht}
                    onChange={(e) => handleCheckboxChange("widerrufsrecht", e.target.checked)}
                    className="mt-1 w-4 h-4 text-[var(--color-blue-600)] border-gray-300 rounded focus:ring-[var(--color-blue-600)]"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Hiermit beauftrage ich Sie ausdrücklich, ab Erhalt meiner Sendung mit dem Schleifen der Instrumente beginnen zu dürfen.
                    Mir ist bekannt, dass mein Widerrufsrecht ab Beginn der Schleifarbeiten erlischt.
                  </span>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.agbAkzeptiert}
                    onChange={(e) => handleCheckboxChange("agbAkzeptiert", e.target.checked)}
                    className="mt-1 w-4 h-4 text-[var(--color-blue-600)] border-gray-300 rounded focus:ring-[var(--color-blue-600)]"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Ich habe die <a href="/agb" className="text-[var(--color-blue-600)] underline hover:text-[var(--color-blue-700)]">AGB</a> und die <a href="/widerrufsbelehrung" className="text-[var(--color-blue-600)] underline hover:text-[var(--color-blue-700)]">Widerrufsbelehrung</a> gelesen und akzeptiere sie.
                  </span>
                </label>
              </div>
            </div>

            {/* Hinweis zu Betriebsferien */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 order-1 md:order-2">
              <h3 className="text-lg font-medium mb-2 text-gray-900">Hinweis zu unseren Betriebsferien</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Im Zeitraum vom 19.10. bis 30.10.2026 sind wir aufgrund unserer versetzten Betriebsferien nur teilweise für Sie erreichbar.
                Wir bitten um Ihr Verständnis, dass es daher gegebenenfalls zu längeren Bearbeitungszeiten kommen kann.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">
                Ab dem 02.11.2026 sind wir wieder vollumfänglich und wie gewohnt für Sie da.
              </p>
            </div>
            </div>

            {/* Fehlermeldung anzeigen */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              </div>
            )}

          </div>
        </Step>
      </Stepper>
    </div>
  );
}
