"use client";

import { Container } from "@/components/Container";
import { analytics } from "@/components/GoogleAnalytics";
import emailjs from '@emailjs/browser';
import { useState } from "react";

export default function SchaerfkurseForm() {
  const [participantCount, setParticipantCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    contactPerson: "",
    address: "",
    email: "",
    phone: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS Template-Parameter
      const templateParams = {
        // Kurs-spezifische Daten
        kurs_datum: formData.date,
        kurs_uhrzeit: formData.time,
        teilnehmer_anzahl: participantCount,
        gesamtpreis: totalPrice,
        
        // Kontaktdaten
        ansprechpartner: formData.contactPerson,
        email: formData.email,
        telefon: formData.phone,
        adresse: formData.address,
        
        // Meta-Daten
        kurs_typ: 'Schärfkurs',
        anfrage_datum: new Date().toLocaleDateString('de-DE'),
        anfrage_uhrzeit: new Date().toLocaleTimeString('de-DE'),
        
        // Berechnungen
        grundpreis: '285€',
        zusaetzliche_teilnehmer: participantCount > 2 ? participantCount - 2 : 0,
        zusaetzliche_kosten: participantCount > 2 ? (participantCount - 2) * 45 : 0,
        anfahrt_kosten: '0,35€ je Kilometer',
        
        // Website-Info
        website: 'www.dentalschleifen.de',
        kurs_dauer: '2 Stunden',
        kurs_ort: 'Vor Ort in Ihrer Praxis'
      };

      // EmailJS senden
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID
        process.env.NEXT_PUBLIC_EMAILJS_SCHAERFKURSE_TEMPLATE_ID || 'template_ycm070n', // Template ID
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // Public Key
      );

      // Analytics Event
      analytics.schaerfkurs('form_submit', {
        participant_count: participantCount,
        total_price: totalPrice,
        date: formData.date,
        time: formData.time
      });

      setSubmitStatus('success');
      
      // Formular zurücksetzen
      setFormData({
        date: "",
        time: "",
        contactPerson: "",
        address: "",
        email: "",
        phone: ""
      });
      setParticipantCount(1);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = 285 + Math.max(0, participantCount - 2) * 45;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header Section - bleibt über beiden Spalten */}
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Schärfkurse
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
              <span className="hidden lg:inline">Schärfkursanfrage</span>
              <span className="lg:hidden">Schärfkurse anfragen</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Formular-Header (Preiskarte) */}
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50/40 px-8 py-7 shadow-sm">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    2 Stunden Schärfkurs
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-semibold text-blue-700">
                        285€
                      </span>
                      <span className="text-sm text-gray-500">
                        bis 2 Teilnehmer
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      zzgl. MwSt.
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Jeder weitere Teilnehmer:{" "}
                    <span className="font-semibold text-blue-700">+45€</span>{" "}
                    · Anfahrt: <span className="font-semibold text-blue-700">0,35€/km</span>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="rounded-3xl border border-gray-100 bg-white/80 px-6 sm:px-8 py-7 shadow-sm backdrop-blur">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Teilnehmeranzahl */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-800">
                    Teilnehmeranzahl
                  </label>
                  <p className="text-xs text-gray-500">
                    Wählen Sie zwischen 1 und 4 Teilnehmern für den Kurs in Ihrer Praxis.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setParticipantCount(Math.max(1, participantCount - 1))}
                      disabled={participantCount <= 1}
                      className={`w-11 h-11 rounded-full border flex items-center justify-center text-lg font-medium transition-colors duration-200 ${
                        participantCount <= 1
                          ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                          : 'bg-white hover:bg-blue-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      -
                    </button>
                    <div className="w-16 h-11 bg-gray-50 rounded-full flex items-center justify-center text-base font-semibold text-gray-900 border border-gray-200">
                      {participantCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setParticipantCount(Math.min(4, participantCount + 1))}
                      disabled={participantCount >= 4}
                      className={`w-11 h-11 rounded-full border flex items-center justify-center text-lg font-medium transition-colors duration-200 ${
                        participantCount >= 4
                          ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                          : 'bg-white hover:bg-blue-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-center text-sm text-gray-500">
                    Gesamtpreis:&nbsp;
                    <span className="font-semibold text-blue-700">{totalPrice}€</span>
                    <span className="block text-[11px] text-gray-400 mt-1">
                      zzgl. 0,35€ je Kilometer Anfahrt
                    </span>
                  </div>
                </div>

                {/* Wunschdatum & Uhrzeit in einer Zeile */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-800">
                    Wunschdatum &amp; Uhrzeit
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="date"
                        placeholder="tt.mm.jjjj"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all duration-150 text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="time"
                        placeholder="--:--"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all duration-150 text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Ansprechpartner */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-800">
                    Ansprechpartner
                  </label>
                  <input
                    type="text"
                    placeholder="Name der Ansprechperson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all duration-150 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Adresse */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-800">
                    Adresse
                  </label>
                  <input
                    type="text"
                    placeholder="Straße, Hausnummer, PLZ Ort"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all duration-150 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* E-Mail */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-800">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all duration-150 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Telefon */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-800">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="Ihre Telefonnummer"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all duration-150 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.date || !formData.time || !formData.contactPerson || !formData.email || !formData.phone || !formData.address}
                    className={`w-full font-semibold py-3.5 px-6 rounded-2xl text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                      isSubmitting 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Unverbindlich anfragen'}
                  </button>
                  
                  {/* Status Messages */}
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
            </div>

            {/* Right Column - Infotext */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white/80 px-6 sm:px-8 py-7 shadow-sm backdrop-blur">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Maßgeschneidert auf Ihre Praxis
                </h2>
                
                <p className="text-sm sm:text-base text-gray-700 mb-5 leading-relaxed">
                  Die ultimative Schulung, um das optimale Schärfen Ihrer zahnmedizinischen Instrumente zu erlernen! Unser Team von qualifizierten Experten freut sich darauf, Sie in die Geheimnisse der präzisen Instrumentenschärfung einzuführen. In unserem intensiven, praxisorientierten Kurs erfahren Sie alles über die Techniken, die erforderlich sind, um Ihren Instrumenten die notwendige Schärfe zurückzugeben, diese in Bestform zu halten und deren Lebensdauer zu verlängern.
                </p>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
                    <h3 className="font-semibold text-blue-700 mb-1.5 text-sm sm:text-base">
                      1. Erfahrene Instruktoren
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      Unsere erfahrenen und sachkundigen Instruktoren führen Sie Schritt für Schritt durch den Schärfprozess. Sie vermitteln Ihnen ihr umfangreiches Fachwissen und geben wertvolle Tipps aus ihrer langjährigen Erfahrung weiter.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
                    <h3 className="font-semibold text-blue-700 mb-1.5 text-sm sm:text-base">
                      2. Praxisnahe Schulung
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      Wir glauben daran, dass Lernen am besten in der Praxis stattfindet. Daher erhalten Sie ausreichend Gelegenheit, Ihre neu erlernten Fähigkeiten direkt an Ihren praxiseigenen Instrumenten zu üben.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
                    <h3 className="font-semibold text-blue-700 mb-1.5 text-sm sm:text-base">
                      3. Individuelle Kursgestaltung
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      Inhalte und Schwerpunkte passen wir auf Wunsch an Ihre Praxis, Ihr Team und Ihre Instrumente an – für maximalen Nutzen im Alltag.
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-700 mt-5 leading-relaxed">
                  Bei uns steht das optimale Schärfen Ihrer Instrumente im Mittelpunkt. Unser Schärfkurs ist speziell darauf ausgerichtet, Ihnen und Ihren Mitarbeitern das Schärfen herstellerunabhängiger Instrumente zu vermitteln - eine essentielle Fertigkeit für die Maximierung der Leistungsfähigkeit Ihrer Instrumente.
                </p>

                <p className="text-sm sm:text-base text-gray-700 mt-4 leading-relaxed">
                  Unser Schärfkurs ist perfekt auf Zahnärzte, Chirurgen und das Praxispersonal zugeschnitten. Egal, ob Sie ein Neuling oder ein erfahrener Profi sind, unsere Schulung wird Ihnen die Werkzeuge und Kenntnisse vermitteln, um das Beste aus Ihren Instrumenten herauszuholen und eine erstklassige Patientenversorgung zu gewährleisten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
