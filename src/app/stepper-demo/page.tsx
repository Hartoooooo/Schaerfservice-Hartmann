"use client";

import { useState, useMemo } from "react";
import Stepper, { Step } from "@/components/Stepper";

type Row = {
  name: string;
  price: string;
  price7: string;
  price15: string;
};

const rows: Row[] = [
  { name: "Scaler & Küretten ( Universal, Gracey )", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Exkavatoren", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Knochenküretten & scharfe Löffel", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Meißel & Gingivalrandschräger", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Messer & Schnitzinstrumente", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Microscheren", price: "€26,25", price7: "€24,41", price15: "€22,31" },
  { name: "Periotome & Tunnelierungsinstr.", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Raspatorien", price: "€13,01", price7: "€12,10", price15: "€11,06" },
  { name: "Scheren", price: "€17,10", price7: "€15,90", price15: "€14,54" },
  { name: "Wurzelheber & Luxatoren", price: "€7,11", price7: "€6,61", price15: "€6,04" },
];

export default function StepperDemo() {
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
  }, [quantities, totalQuantity]);

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

  return (
    <div className={`container-page ${getPaddingClass()}`}>
      <Stepper
        initialStep={1}
        className={getStepperClass()}
        isNextDisabled={isNextButtonDisabled()}
        onStepChange={(step) => {
          setCurrentStep(step);
          
          // Beim Wechsel von Step 2 zu Step 3 nach oben scrollen
          if (currentStep === 2 && step === 3) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          
          console.log(step);
        }}
        onFinalStepCompleted={() => console.log("All steps completed!")}
        backButtonText="Zurück"
        nextButtonText="Weiter"
      >
        <Step>
          <h2 className="text-2xl font-semibold mb-4">Ihr Schärfauftrag</h2>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Handgeschärft mit über 20 Jahren Erfahrung<br />
            für dentale und chirurgische Instrumente<br />
            mit langlebiger Schärfe und präzisen Ergebnissen
          </p>
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-4">Instrumente auswählen</h2>
          <div className="table-wrapper">
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
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-6">Kontaktdaten</h2>
          
          <div className="table-wrapper">
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
          </div>
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
                    Ich verlange ausdrücklich, dass Sie ab Erhalt meiner Sendung mit den Schärfarbeiten beginnen. 
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

          </div>
        </Step>
        <Step>
          <h2 className="text-2xl font-semibold mb-6">Auftrag erfolgreich übermittelt</h2>
          
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
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
                Bei Fragen erreichen Sie uns unter <a href="mailto:info@schaerfservice-hartmann.de" className="text-[var(--color-blue-600)] hover:underline">info@schaerfservice-hartmann.de</a>
              </p>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}
