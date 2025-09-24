import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  description: "Widerrufsbelehrung für Schärfservice Hartmann. Informationen zu Ihrem Widerrufsrecht bei Verträgen und Dienstleistungen.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WiderrufsbelehrungPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-4xl mx-auto">
        <div className="surface p-8">
          <h1 className="text-3xl font-semibold mb-8 text-center">Widerrufsbelehrung</h1>
          
          <div className="space-y-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-yellow-800 mb-2">Inhalt wird bereitgestellt</h2>
                  <p className="text-yellow-700 leading-relaxed">
                    Diese Seite ist bereits im Footer verlinkt und wird mit dem finalen Text vom Auftraggeber überschrieben.
                    Die Widerrufsbelehrung wird hier in Kürze verfügbar sein.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Kontakt für Rückfragen</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Bei Fragen zum Widerrufsrecht oder anderen rechtlichen Angelegenheiten wenden Sie sich gerne an uns:
              </p>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-neutral-600">
                  <span className="font-medium">Schärfservice Hartmann</span><br />
                  Inhaber: Björn Hartmann<br />
                  Petershagener Str. 27<br />
                  15566 Schöneiche bei Berlin<br />
                  <span className="font-medium">Telefon:</span> 0175 9342576
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


