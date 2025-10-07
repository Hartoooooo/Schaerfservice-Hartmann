import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz - Instrumente schärfen Berlin",
  description: "Datenschutzerklärung Schärfservice Hartmann - Instrumente schärfen & Dental schleifen Berlin. Informationen zum Umgang mit personenbezogenen Daten gemäß DSGVO.",
  robots: {
    index: true,
    follow: false,
  },
};

export default function DatenschutzPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-4xl mx-auto">
        <div className="surface p-8">
          <h1 className="text-3xl font-semibold mb-8 text-center">Datenschutzerklärung</h1>
          
          <div className="space-y-8">
            <section>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Wir freuen uns über Ihr Interesse an unserem Unternehmen. Der Schutz Ihrer personenbezogenen Daten
                ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Erhebung
                und Verwendung personenbezogener Daten auf dieser Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Verantwortlicher</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-neutral-600">
                  <span className="font-medium">Schärfservice Hartmann</span><br />
                  Inhaber: Björn Hartmann<br />
                  Petershagener Str. 27<br />
                  15566 Schöneiche bei Berlin<br />
                  Telefon: 0174 9342576<br />
                  E-Mail: hartmann-schaerfservice@web.de
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Server-Logfiles</h2>
              <p className="text-neutral-600 leading-relaxed">
                Beim Besuch der Website werden automatisch Informationen erfasst (z. B. IP-Adresse, Datum und Uhrzeit,
                aufgerufene Seite). Diese Daten dienen der Sicherstellung eines störungsfreien Betriebs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Cookies</h2>
              <div className="space-y-4">
                <p className="text-neutral-600 leading-relaxed">
                  Unsere Website verwendet Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. 
                  Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-gray-900">Cookie-Kategorien:</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Notwendige Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. 
                        Sie werden in der Regel nur als Reaktion auf Aktionen gesetzt, die einer Anfrage nach Diensten entsprechen.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Analyse-Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Diese Cookies ermöglichen es uns, die Anzahl der Besucher zu zählen und zu verstehen, 
                        wie Besucher mit unserer Website interagieren. Alle Informationen, die diese Cookies sammeln, 
                        werden aggregiert und sind daher anonym.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Marketing-Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Diese Cookies werden verwendet, um Besuchern auf Webseiten relevante Anzeigen und 
                        Marketingkampagnen bereitzustellen. Diese Cookies verfolgen Besucher über Websites hinweg 
                        und sammeln Informationen, um angepasste Anzeigen bereitzustellen.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-neutral-600 leading-relaxed">
                  Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner auf unserer Website 
                  anpassen oder in den Einstellungen Ihres Browsers verwalten.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-700">
                    <strong>Cookie-Einstellungen verwalten:</strong> 
                    <a href="/cookie-einstellungen" className="text-blue-600 hover:text-blue-700 underline ml-1">
                      Hier können Sie Ihre Cookie-Präferenzen jederzeit anpassen
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Google Analytics</h2>
              <div className="space-y-4">
                <p className="text-neutral-600 leading-relaxed">
                  Diese Website nutzt Google Analytics, einen Webanalysedienst der Google LLC. 
                  Google Analytics verwendet Cookies, um die Nutzung der Website zu analysieren.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-sm text-gray-700">
                    <strong>Anbieter:</strong> Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA<br />
                    <strong>Zweck:</strong> Analyse der Website-Nutzung, Erstellung von Statistiken<br />
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)<br />
                    <strong>Speicherdauer:</strong> 14 Monate<br />
                    <strong>Opt-out:</strong> Sie können die Erfassung durch Google Analytics verhindern, 
                    indem Sie das entsprechende Cookie in den Einstellungen deaktivieren.
                  </p>
                </div>
                
                <p className="text-neutral-600 leading-relaxed">
                  Weitere Informationen zum Datenschutz bei Google Analytics finden Sie in der 
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-700 underline">
                    Datenschutzerklärung von Google
                  </a>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Kontaktaufnahme</h2>
              <p className="text-neutral-600 leading-relaxed">
                Bei der Kontaktaufnahme per Telefon oder E-Mail werden die von Ihnen gemachten Angaben zum Zwecke der
                Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Rechtsgrundlagen</h2>
              <p className="text-neutral-600 leading-relaxed">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Anbahnung) und
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an dem Betrieb der Website).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Speicherdauer</h2>
              <p className="text-neutral-600 leading-relaxed">
                Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist
                oder gesetzliche Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Ihre Rechte</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-neutral-600 leading-relaxed">
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
                  sowie Widerspruch gegen die Verarbeitung Ihrer Daten.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


