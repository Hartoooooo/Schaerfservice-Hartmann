"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Stepper, { Step } from "@/components/Stepper";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs-config';

type Row = {
  name: string;
  price: string;
  price7: string;
  price15: string;
};

interface SchaerfauftragFormProps {
  rows: Row[];
}

export default function SchaerfauftragForm({ rows }: SchaerfauftragFormProps) {
  const router = useRouter();
  const [quantities, setQuantities] = useState<number[]>(() => rows.map(() => 0));
  const [currentStep, setCurrentStep] = useState(1);
  
  // Kontaktformular State
  const [formData, setFormData] = useState({
    praxisname: "",
    ansprechpartner: "",
    email: "",
    telefon: "",
    strasse: "",
    plz: "",
    ort: "",
    nachricht: "",
  });

  // Checkbox State für Step 4
  const [checkboxes, setCheckboxes] = useState({
    widerrufsrecht: false,
    agbAkzeptiert: false,
  });

  // EmailJS State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showCheckmarkAnimation, setShowCheckmarkAnimation] = useState(false);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setCheckboxes(prev => ({ ...prev, [field]: checked }));
  };

  const totalQuantity = useMemo(() => {
    return quantities.reduce((sum, qty) => sum + qty, 0);
  }, [quantities]);

  const subtotalWithDiscount = useMemo(() => {
    const toNumber = (value: string) => parseFloat(value.replace(/[€*.,\s]/g, m => (m === "," ? "." : "")) || "0");
    
    return rows.reduce((sum, row, idx) => {
      const qty = quantities[idx] ?? 0;
      if (qty === 0) return sum;
      
      let price = toNumber(row.price);
      
      // Rabattlogik basierend auf Gesamtmenge
      if (totalQuantity >= 40) {
        // 15% Rabatt bei 40+ Instrumenten
        price = toNumber(row.price15);
      } else if (totalQuantity >= 15) {
        // 7% Rabatt bei 15+ Instrumenten
        price = toNumber(row.price7);
      }
      
      return sum + price * qty;
    }, 0);
  }, [quantities, totalQuantity, rows]);

  const shipping = 5.90; // Versandkosten
  const totalNet = totalQuantity > 0 ? subtotalWithDiscount + shipping : 0; // Gesamtbetrag Netto (mit Rabatt)
  const vat = totalQuantity > 0 ? totalNet * 0.19 : 0; // MwSt. 19%
  const totalGross = totalQuantity > 0 ? totalNet + vat : 0; // Gesamtbetrag Brutto

  const handleQtyChange = (rowIndex: number, value: number) => {
    setQuantities(prev => prev.map((q, i) => (i === rowIndex ? value : q)));
  };

  // Gleicher Abstand zum Header wie auf der Startseite
  const getPaddingClass = () => {
    return "pb-16"; // Nur unten Padding, oben wird durch main pt-20 geregelt
  };

  // Dynamische Stepper-Höhe für Step 2 und 3
  const getStepperClass = () => {
    if (currentStep === 2 || currentStep === 3) {
      return "min-h-[700px]"; // Feste Höhe für Step 2 und 3
    }
    return ""; // Normale Höhe für andere Steps
  };

  // Prüfe ob "Weiter" Button deaktiviert werden soll (nur bei Step 4)
  const isNextButtonDisabled = () => {
    if (currentStep === 4) {
      return !checkboxes.widerrufsrecht || !checkboxes.agbAkzeptiert;
    }
    return false;
  };

  // Custom Button-Text basierend auf aktuellem Step
  const getCustomNextButtonText = () => {
    if (currentStep === 4) {
      return isSubmitting ? "Wird gesendet..." : "Abschließen";
    }
    if (currentStep === 5) {
      return "Zur Startseite";
    }
    return undefined;
  };

  // EmailJS-Integration
  const sendEmail = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Erstelle detaillierte Instrumentenliste
      const selectedInstruments = rows
        .map((row, idx) => ({
          name: row.name,
          quantity: quantities[idx],
          unitPrice: totalQuantity >= 40 ? row.price15 : totalQuantity >= 15 ? row.price7 : row.price,
          totalPrice: quantities[idx] * parseFloat((totalQuantity >= 40 ? row.price15 : totalQuantity >= 15 ? row.price7 : row.price).replace(/[€*.,\s]/g, m => (m === "," ? "." : "")) || "0")
        }))
        .filter(item => item.quantity > 0);

      // Formatiere Instrumentenliste für E-Mail
      const instrumentsText = selectedInstruments
        .map(item => `${item.name}: ${item.quantity} Stück à ${item.unitPrice} = ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(item.totalPrice)}`)
        .join('\n');

      // E-Mail-Template-Parameter
      const templateParams = {
        // Kontaktdaten
        praxisname: formData.praxisname,
        ansprechpartner: formData.ansprechpartner,
        email: formData.email,
        telefon: formData.telefon || 'Nicht angegeben',
        strasse: formData.strasse,
        plz: formData.plz,
        ort: formData.ort,
        nachricht: formData.nachricht || 'Keine besonderen Wünsche',
        
        // Instrumentenliste
        instruments_list: instrumentsText,
        total_quantity: totalQuantity,
        
        // Preisberechnung
        subtotal: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subtotalWithDiscount),
        shipping: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(shipping),
        total_net: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalNet),
        vat: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(vat),
        total_gross: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalGross),
        
        // Rabattinformation
        discount_info: totalQuantity >= 40 ? '15% Rabatt (ab 40 Instrumente)' : 
                      totalQuantity >= 15 ? '7% Rabatt (ab 15 Instrumente)' : 
                      'Kein Rabatt',
        
        // Einverständniserklärungen
        widerrufsrecht_accepted: checkboxes.widerrufsrecht ? 'Ja' : 'Nein',
        agb_accepted: checkboxes.agbAkzeptiert ? 'Ja' : 'Nein',
        
        // Datum und Uhrzeit
        order_date: new Date().toLocaleDateString('de-DE'),
        order_time: new Date().toLocaleTimeString('de-DE'),
        
        // Vollständige Adresse
        full_address: `${formData.strasse}, ${formData.plz} ${formData.ort}`,
      };

      // E-Mail senden
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('E-Mail erfolgreich gesendet');
      
      // Kurz warten, dann Checkmark-Animation starten
      setTimeout(() => {
        setShowCheckmarkAnimation(true);
      }, 500);
      
    } catch (error) {
      console.error('Fehler beim Senden der E-Mail:', error);
      setSubmitError('Fehler beim Senden des Auftrags. Bitte versuchen Sie es erneut.');
      setIsSubmitting(false);
      return false;
    }

    setIsSubmitting(false);
    return true;
  };

  return (
    <div className={`container-page ${getPaddingClass()} pt-20`}>
      <Stepper
        initialStep={1}
        className={getStepperClass()}
        isNextDisabled={isNextButtonDisabled()}
        customNextButtonText={getCustomNextButtonText()}
        onStepChange={async (step) => {
          // Beim Wechsel von Step 4 zu Step 5 E-Mail senden
          if (currentStep === 4 && step === 5) {
            const emailSent = await sendEmail();
            if (!emailSent) {
              return; // Verhindere den Schritt-Wechsel bei Fehler
            }
          }
          
          setCurrentStep(step);
          
          // Beim Wechsel von Step 2 zu Step 3 nach oben scrollen
          if (currentStep === 2 && step === 3) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          
          console.log(step);
        }}
        onFinalStepCompleted={() => {
          if (currentStep === 5) {
            router.push('/');
          } else {
            console.log("All steps completed!");
          }
        }}
        backButtonText="Zurück"
        nextButtonText="Weiter"
      >
        <Step>
          <h2 className="text-2xl font-semibold mb-4">Ihr Schärfauftrag</h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-4">
            für zahnärztliche und chirurgische Instrumente<br />
            für langlebige Schärfe und präzise Ergebnisse
          </p>
          <p className="text-neutral-500 text-sm">
            Bearbeitungszeit ca. 5 Werktage
          </p>
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-4">Instrumente auswählen</h2>
          
          {/* Desktop Tabelle */}
          <div className="table-wrapper hidden md:block">
            <table className="table-apple table-primary-header" style={{ tableLayout: 'fixed', width: '100%' }}>
              <colgroup>
                <col style={{ width: '40%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Instrumente</th>
                  <th className={`table-number ${totalQuantity < 15 ? 'font-bold' : 'text-gray-400'}`}>
                    Preis
                  </th>
                  <th className={`table-number ${totalQuantity >= 15 && totalQuantity < 40 ? 'font-bold' : 'text-gray-400'}`}>
                    ab 15 Instr.
                  </th>
                  <th className={`table-number ${totalQuantity >= 40 ? 'font-bold' : 'text-gray-400'}`}>
                    ab 40 Instr.
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
                    <td className={`table-number ${totalQuantity >= 15 && totalQuantity < 40 ? 'font-bold' : 'text-gray-400'}`}>
                      <span className="cell-right">{row.price7}</span>
                    </td>
                    <td className={`table-number ${totalQuantity >= 40 ? 'font-bold' : 'text-gray-400'}`}>
                      <span className="cell-right">{row.price15}</span>
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
                  <td colSpan={4} className="text-neutral-600">
                    Zwischensumme Nettobetrag
                    {totalQuantity >= 40 && <span className="text-blue-600 ml-2">(15% Rabatt)</span>}
                    {totalQuantity >= 15 && totalQuantity < 40 && <span className="text-blue-600 ml-2">(7% Rabatt)</span>}
                  </td>
                  <td className="table-number font-medium">
                    <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subtotalWithDiscount)}</span>
                  </td>
                </tr>
                {totalQuantity > 0 && (
                  <tr>
                    <td colSpan={4} className="text-neutral-600">Versand</td>
                    <td className="table-number font-medium">
                      <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(shipping)}</span>
                    </td>
                  </tr>
                )}
                {totalQuantity > 0 && (
                  <>
                    <tr>
                      <td colSpan={4} className="text-neutral-600 font-semibold">Gesamtbetrag Netto</td>
                      <td className="table-number font-semibold">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalNet)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="text-neutral-600">MwSt. 19%</td>
                      <td className="table-number font-medium">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(vat)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="text-neutral-900 font-bold text-lg">Gesamtbetrag Brutto</td>
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
          <div className="table-wrapper md:hidden">
            <table className="table-apple table-primary-header" style={{ tableLayout: 'fixed', width: '100%' }}>
              <colgroup>
                <col style={{ width: '50%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Instrumente</th>
                  <th className="table-number">
                    Preis
                    {totalQuantity >= 40 && <span className="text-xs block">(15% Rabatt)</span>}
                    {totalQuantity >= 15 && totalQuantity < 40 && <span className="text-xs block">(7% Rabatt)</span>}
                  </th>
                  <th className="table-number">Menge</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => {
                  // Berechne aktuellen Preis basierend auf Gesamtmenge
                  const getCurrentPrice = () => {
                    if (totalQuantity >= 40) return row.price15;
                    if (totalQuantity >= 15) return row.price7;
                    return row.price;
                  };
                  
                  return (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td className="table-number">
                        <span className="cell-right">{getCurrentPrice()}</span>
                      </td>
                      <td className="table-number">
                        <input
                          className="qty-input w-full"
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
                  <td className="text-neutral-600">
                    Zwischensumme Nettobetrag
                    {totalQuantity >= 40 && <span className="text-blue-600 ml-2">(15% Rabatt)</span>}
                    {totalQuantity >= 15 && totalQuantity < 40 && <span className="text-blue-600 ml-2">(7% Rabatt)</span>}
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
                      <td className="text-neutral-600 font-semibold">Gesamtbetrag Netto</td>
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
                      <td className="text-neutral-900 font-bold text-lg">Gesamtbetrag Brutto</td>
                      <td colSpan={2} className="table-number font-bold text-lg">
                        <span className="cell-right">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalGross)}</span>
                      </td>
                    </tr>
                  </>
                )}
              </tfoot>
            </table>
          </div>
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-6">Kontaktdaten</h2>
          
          <form className="space-y-6">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="praxisname">Praxisname *</label>
                <input
                  type="text"
                  id="praxisname"
                  className="form-input"
                  value={formData.praxisname}
                  onChange={(e) => handleFormChange("praxisname", e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ansprechpartner">Ansprechpartner *</label>
                <input
                  type="text"
                  id="ansprechpartner"
                  className="form-input"
                  value={formData.ansprechpartner}
                  onChange={(e) => handleFormChange("ansprechpartner", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">E-Mail *</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="telefon">Telefon</label>
                <input
                  type="tel"
                  id="telefon"
                  className="form-input"
                  value={formData.telefon}
                  onChange={(e) => handleFormChange("telefon", e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="strasse">Straße & Hausnummer *</label>
              <input
                type="text"
                id="strasse"
                className="form-input"
                value={formData.strasse}
                onChange={(e) => handleFormChange("strasse", e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="plz">PLZ *</label>
                <input
                  type="text"
                  id="plz"
                  className="form-input"
                  value={formData.plz}
                  onChange={(e) => handleFormChange("plz", e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ort">Ort *</label>
                <input
                  type="text"
                  id="ort"
                  className="form-input"
                  value={formData.ort}
                  onChange={(e) => handleFormChange("ort", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="nachricht">Nachricht / Besondere Wünsche</label>
              <textarea
                id="nachricht"
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
            <div className="bg-gray-50 rounded-lg p-6">
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
                    Hiermit beauftrage ich Sie ausdrücklich, ab Erhalt meiner Sendung mit dem Schärfen der Instrumente beginnen zu dürfen. 
                    Mir ist bekannt, dass mein Widerrufsrecht ab Beginn der Schärfarbeiten erlischt.
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
        <Step>
          <h2 className="text-2xl font-semibold mb-6">
            {isSubmitting ? "Auftrag wird gesendet..." : "Auftrag erfolgreich übermittelt"}
          </h2>
          
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto relative overflow-visible">
              {isSubmitting ? (
                // Loading Spinner
                <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                // Checkmark mit Animation
                <svg 
                  className={`w-8 h-8 text-green-600 transition-all duration-1000 ${
                    showCheckmarkAnimation ? 'animate-checkmark' : 'opacity-0 scale-0'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Vielen Dank für Ihren Auftrag!</h3>
              <p className="text-gray-600 mb-4">
                Ihr Schärfauftrag wurde erfolgreich übermittelt und wird bearbeitet.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-left">
              <h4 className="font-medium text-gray-900 mb-3">Nächste Schritte:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-blue-600)] mt-0.5">1.</span>
                  Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-blue-600)] mt-0.5">2.</span>
                  Senden Sie Ihre Instrumente an die angegebene Adresse
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-blue-600)] mt-0.5">3.</span>
                  Wir beginnen sofort nach Erhalt mit der Bearbeitung
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-blue-600)] mt-0.5">4.</span>
                  Ihre geschärften Instrumente werden schnellstmöglich zurückgesendet
                </li>
              </ul>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Bei Fragen erreichen Sie uns unter <a href="mailto:hartmann-schaerfservice@web.de" className="text-[var(--color-blue-600)] hover:underline">hartmann-schaerfservice@web.de</a>
              </p>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}
