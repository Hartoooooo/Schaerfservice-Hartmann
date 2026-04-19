import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB - Instrumente schärfen Berlin",
  description: "AGB Schärfservice Hartmann - Instrumente schärfen & Dental schleifen Berlin. Geltungsbereich, Vertragsschluss, Leistungen, Preise, Haftung und Gewährleistung für Instrumentenschärfung.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AgbPage() {
  return (
    <div className="container-page pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="surface p-8">
          <h1 className="text-3xl font-semibold mb-4 text-center">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-center text-lg text-gray-600 mb-8">Schärfservice-Hartmann · Professionelle Schärfdienstleistungen</p>
          <p className="text-center text-sm text-gray-500 mb-12">Stand: 16.11.2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">1. Geltungsbereich</h2>
              <p className="text-neutral-600 leading-relaxed">
                Diese AGB gelten für alle Verträge zwischen Schärfservice-Hartmann und Verbrauchern (§ 13 BGB), 
                die Instrumente zum Schärfen einsenden oder unseren Schärfservice beauftragen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">2. Vertragsgegenstand & Ablauf</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Der Kunde sendet eigene Instrumente (z. B. Messer, Scheren, Werkzeuge) ein. Wir erbringen daran eine 
                Werkleistung (Schärfen) und senden die Instrumente anschließend zurück. Es kommt kein Kaufvertrag über Waren zustande.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Vertragsablauf:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  <li>Beauftragung über Shop/Bestellformular, E-Mail oder Telefon</li>
                  <li>Einsendung der Instrumente an unsere Anschrift</li>
                  <li>Prüfung, Schärfarbeiten, Rückversand</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">3. Preise & Zahlung</h2>
              <p className="text-neutral-600 leading-relaxed">
                Es gelten die im Shop bzw. in der Auftragsbestätigung ausgewiesenen Preise in Euro inkl. gesetzlicher 
                Umsatzsteuer (sofern anwendbar). Zahlung nach Rechnungserhalt, sofern nichts anderes vereinbart ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">4. Widerruf bei Dienstleistungen</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Verbrauchern steht grundsätzlich ein Widerrufsrecht nach Maßgabe unserer Widerrufsbelehrung zu.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-yellow-800 mb-2">⚠️ Wichtiger Hinweis</h3>
                <p className="text-sm text-yellow-700">
                  Wir beginnen mit der Dienstleistung vor Ablauf der Widerrufsfrist nur, wenn der Kunde ausdrücklich zustimmt 
                  und seine Kenntnis vom Erlöschen des Widerrufsrechts bei vollständiger Vertragserfüllung bestätigt (§ 356 Abs. 4 BGB). 
                  Das Widerrufsrecht erlischt ab Beginn der Schärfarbeiten, wenn die vollständige Leistung auf ausdrücklichen Wunsch des Kunden erbracht wird.
                </p>
              </div>
              <p className="text-sm text-blue-600">
                📋 <a href="/widerrufsbelehrung" className="underline hover:text-blue-700">Zur Widerrufsbelehrung</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">5. Versand & Verpackung</h2>
              <p className="text-neutral-600 leading-relaxed">
                Die Kosten für Hin- und Rückversand trägt der Kunde. Der Kunde verpackt die Instrumente transportsicher; 
                wir empfehlen versicherten Versand mit Sendungsverfolgung. Zwingende Verbraucherrechte bleiben unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">6. Leistungszeit & Rückversand</h2>
              <p className="text-neutral-600 leading-relaxed">
                Die Bearbeitungszeit richtet sich nach Auftragslage und Umfang. Nach Abschluss der Schärfarbeiten 
                versenden wir an die vom Kunden angegebene Adresse zurück.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">7. Haftung</h2>
              <p className="text-neutral-600 leading-relaxed">
                Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. 
                Bei leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und 
                begrenzt auf den vorhersehbaren, vertragstypischen Schaden. Ansprüche nach dem ProdHaftG bleiben unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">8. Gewährleistung</h2>
              <p className="text-neutral-600 leading-relaxed">
                Es gelten die gesetzlichen Gewährleistungsrechte für Werkleistungen. Offensichtliche Mängel sind uns 
                möglichst zeitnah nach Erhalt der Rücksendung mitzuteilen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">9. Datenschutz</h2>
              <p className="text-neutral-600 leading-relaxed">
                Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer 
                <a href="/datenschutz" className="text-blue-600 hover:text-blue-700 underline ml-1">Datenschutzerklärung</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">10. Schlussbestimmungen</h2>
              <p className="text-neutral-600 leading-relaxed">
                Es gilt deutsches Recht. Zwingende Verbraucherschutzvorschriften des Wohnsitzstaates des Kunden bleiben unberührt. 
                Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.
              </p>
            </section>

            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Kontaktdaten:</h2>
              <div className="text-neutral-600 space-y-2">
                <p><strong>Schärfservice-Hartmann</strong></p>
                <p>Inhaber: Björn Hartmann</p>
                <p>Petershagener Str. 27, 15566 Schöneiche bei Berlin</p>
                <p>E-Mail: hartmann-schaerfservice@web.de</p>
                <p>Telefon: <a href="tel:+491749342576" className="text-blue-600 hover:text-blue-700 hover:underline">+49 174 9342576</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


