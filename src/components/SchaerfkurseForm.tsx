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
        grundpreis: '215€',
        zusaetzliche_teilnehmer: participantCount > 2 ? participantCount - 2 : 0,
        zusaetzliche_kosten: participantCount > 2 ? (participantCount - 2) * 45 : 0,
        anfahrt_kosten: '0,30€ je Kilometer',
        
        // Website-Info
        website: 'www.dentalschleifen.de',
        kurs_dauer: '2 Stunden',
        kurs_ort: 'Vor Ort in Ihrer Praxis'
      };

      // EmailJS senden
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Template ID
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

  const totalPrice = 215 + (participantCount - 1) * 45;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Container>
        {/* Main Content */}
        <div className="pb-12">
          {/* Header Section - nur Titel über beiden Spalten */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Schärfkursanfrage
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Form */}
            <div className="space-y-8">
              {/* Formular-Header (nur in linker Spalte) */}
              <div className="bg-blue-600 text-white px-8 py-6 rounded-2xl shadow-lg">
                <div className="text-center space-y-3">
                  <div className="text-xl font-bold">2 Stunden Kurs</div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold bg-blue-700 px-4 py-2 rounded-lg">
                      215€ Grundpreis (bis 2 Teilnehmer)
                    </div>
                    <div className="text-sm opacity-90 text-center">
                      Jeder weitere Teilnehmer: +45€ • + 0,30€ je Kilometer Anfahrt
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Teilnehmeranzahl */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Teilnehmeranzahl:
                  </label>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setParticipantCount(Math.max(1, participantCount - 1))}
                      className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-600 transition-colors duration-200"
                    >
                      -
                    </button>
                    <div className="w-16 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-lg font-semibold text-gray-900 border border-gray-200">
                      {participantCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setParticipantCount(participantCount + 1)}
                      className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-600 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-center text-sm text-gray-500">
                    Gesamtpreis: {totalPrice}€
                  </div>
                </div>

                {/* Wunschdatum & Uhrzeit in einer Zeile */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Wunschdatum & Uhrzeit:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="date"
                        placeholder="tt.mm.jjjj"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="time"
                        placeholder="--:--"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Ansprechpartner */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Ansprechpartner:
                  </label>
                  <input
                    type="text"
                    placeholder="Name der Ansprechperson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Adresse */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Adresse:
                  </label>
                  <input
                    type="text"
                    placeholder="Straße, Hausnummer, PLZ Ort"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* E-Mail */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    E-Mail:
                  </label>
                  <input
                    type="email"
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Telefon */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Telefon:
                  </label>
                  <input
                    type="tel"
                    placeholder="Ihre Telefonnummer"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Submit Button */}
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.date || !formData.time || !formData.contactPerson || !formData.email || !formData.phone || !formData.address}
                    className={`w-full font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Unverbindlich anfragen'}
                  </button>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center">
                      ✅ Ihre Schärfkurs-Anfrage wurde erfolgreich gesendet!<br/>
                      Wir melden uns schnellstmöglich bei Ihnen.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center">
                      ❌ Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
                    </div>
                  )}
                </div>
              </form>
            </div>
            </div>

            {/* Right Column - Content from Image */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">
                  Maßgeschneidert auf Ihre Praxis
                </h2>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Die ultimative Schulung, um das optimale Schärfen Ihrer zahnmedizinischen Instrumente zu erlernen! Unser Team von qualifizierten Experten freut sich darauf, Sie in die Geheimnisse der präzisen Instrumentenschärfung einzuführen. In unserem intensiven, praxisorientierten Kurs erfahren Sie alles über die Techniken, die erforderlich sind, um Ihre Instrumente in Bestform zu halten und deren Lebensdauer zu verlängern.
                </p>

                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-blue-600 mb-2">1. Erfahrene Instruktoren</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Unsere erfahrenen und sachkundigen Instruktoren führen Sie Schritt für Schritt durch den Schärfprozess. Sie vermitteln Ihnen ihr umfangreiches Fachwissen und geben wertvolle Tipps aus ihrer langjährigen Erfahrung weiter.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-blue-600 mb-2">2. Praxisnahe Schulung</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Wir glauben daran, dass Lernen am besten in der Praxis stattfindet. Daher erhalten Sie ausreichend Gelegenheit, Ihre neu erlernten Fähigkeiten direkt an Ihren eigenen Instrumenten zu üben.
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mt-6 leading-relaxed">
                  Bei uns steht das optimale Schärfen Ihrer Instrumente im Mittelpunkt. Unser Schärfkurs ist speziell darauf ausgerichtet, Ihnen und Ihren Mitarbeitern das Schärfen herstellerunabhängiger Instrumente zu vermitteln - eine essentielle Fertigkeit für die Maximierung der Leistungsfähigkeit Ihrer Instrumente.
                </p>

                <p className="text-gray-700 mt-4 leading-relaxed">
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
