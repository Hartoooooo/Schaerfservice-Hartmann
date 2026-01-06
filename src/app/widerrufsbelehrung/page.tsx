import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerruf - Instrumente schärfen Berlin", 
  description: "Widerrufsbelehrung Schärfservice Hartmann - Instrumente schärfen & Dental schleifen Berlin. Informationen zu Ihrem Widerrufsrecht bei Verträgen und Dienstleistungen.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WiderrufsbelehrungPage() {
  return (
    <div className="container-page pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="surface p-8">
          <h1 className="text-3xl font-semibold mb-4 text-center">Widerrufsbelehrung</h1>
          <p className="text-center text-lg text-gray-600 mb-8">Schärfservice-Hartmann · Widerrufsrecht bei Dienstleistungen</p>
          <p className="text-center text-sm text-gray-500 mb-12">Stand: 27.09.2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">📋 Ihr Widerrufsrecht</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Widerrufsbelehrung für Dienstleistungen</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Schärfservice-Hartmann, Björn Hartmann, Petershagener Str. 27, 
                15566 Schöneiche bei Berlin, Telefon: 030 92376694, E-Mail: hartmann-schaerfservice@web.de) mittels einer 
                eindeutigen Erklärung (z.B. ein mit der Post versandter Brief, Telefax oder E-Mail) über Ihren Entschluss, 
                diesen Vertrag zu widerrufen, informieren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Ausschluss des Widerrufsrechts</h2>
              <p className="text-neutral-600 leading-relaxed">
                Das Widerrufsrecht besteht nicht bei Verträgen zur Erbringung von Dienstleistungen, wenn der Unternehmer mit der 
                Ausführung der Dienstleistung mit ausdrücklicher Zustimmung des Verbrauchers und dessen Kenntnis, dass er sein 
                Widerrufsrecht bei vollständiger Vertragserfüllung durch den Unternehmer verliert, begonnen hat.
              </p>
            </section>

            <section>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Wichtiger Hinweis für Schärfdienstleistungen</h2>
                <p className="text-green-700 leading-relaxed">
                  Da Sie ausdrücklich zustimmen, dass wir mit den Schärfarbeiten sofort nach Erhalt Ihrer Instrumente beginnen, 
                  erlischt Ihr Widerrufsrecht ab Beginn der Bearbeitung. Ein Widerruf ist dann nicht mehr möglich. 
                  Dies ist in Ihrem Interesse, um eine schnelle Bearbeitung zu gewährleisten.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Ende der Widerrufsbelehrung</h2>
              <p className="text-neutral-600 leading-relaxed">
                Diese Widerrufsbelehrung wurde erstellt gemäß den gesetzlichen Vorgaben des Bürgerlichen Gesetzbuches (BGB) 
                und dient dem Schutz Ihrer Verbraucherrechte.
              </p>
            </section>

            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Kontaktdaten für Widerruf:</h2>
              <div className="text-neutral-600 space-y-2">
                <p><strong>Schärfservice-Hartmann</strong></p>
                <p>Inhaber: Björn Hartmann</p>
                <p>Petershagener Str. 27, 15566 Schöneiche bei Berlin</p>
                <p>E-Mail: hartmann-schaerfservice@web.de</p>
                <p>Telefon: <a href="tel:+493092376694" className="text-blue-600 hover:text-blue-700 hover:underline">030 92376694</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


