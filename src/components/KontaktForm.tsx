"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useState } from "react";

export default function KontaktForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde die Formular-Logik implementiert werden
    console.log("Formular gesendet:", formData);
    alert("Nachricht wurde gesendet!");
  };

  return (
    <div className="container-page space-y-8 pt-20">
      <header className="surface p-8">
        <h1 className="text-3xl font-semibold tracking-tight">Kontakt</h1>
        <p className="text-neutral-600 mt-2 max-w-2xl">
          Wir freuen uns auf Ihre Nachricht. Nutzen Sie die Kontaktdaten oder das Formular.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-1 text-gray-900">Schärfservice Hartmann</h3>
              <p className="text-gray-600 font-semibold">Inhaber: Björn Hartmann</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Ansprechpartnerin</p>
                  <p className="text-gray-600">Carina Hartmann</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">E-Mail</p>
                  <p className="text-gray-600">hartmann-schaerfservice@web.de</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Telefon</p>
                  <p className="text-gray-600">+49 30 92371278</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Adresse</p>
                  <div className="text-gray-600">
                    <p>Petershagener Str. 27</p>
                    <p>15566 Schöneiche bei Berlin</p>
                    <p>Deutschland</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Steuernummer</p>
                  <p className="text-gray-600">061 | 228 | 02750</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card title="Nachricht senden">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vorname *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Ihr Vorname"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nachname *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Ihr Nachname"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="ihre@email.de"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefonnummer
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Ihre Telefonnummer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nachricht *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-vertical"
                placeholder="Ihre Nachricht an uns..."
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">
                Nachricht senden
              </Button>
              <Button variant="outline" type="button">
                Anrufen
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
