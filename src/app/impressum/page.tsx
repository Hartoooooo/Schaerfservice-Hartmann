import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum - Instrumente schärfen Berlin",
  description: "Impressum Schärfservice Hartmann - Instrumente schärfen & Dental schleifen Berlin. Inhaber Björn Hartmann, Petershagener Str. 27, 15566 Schöneiche bei Berlin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ImpressumPage() {
  return (
    <div className="container-page pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="surface p-8">
          <h1 className="text-3xl font-semibold mb-8 text-center">Impressum</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Kontaktdaten</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-lg font-medium mb-2">Schärfservice Hartmann</p>
                <p className="text-neutral-600 mb-1">Inhaber: Björn Hartmann</p>
                <p className="text-neutral-600 mb-1">Petershagener Str. 27</p>
                <p className="text-neutral-600 mb-3">15566 Schöneiche bei Berlin</p>
                <p className="text-neutral-600">
                  <span className="font-medium">Telefon:</span> 030 92371278<br />
                  <span className="font-medium">E-Mail:</span> hartmann-schaerfservice@web.de
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Verantwortlich für den Inhalt</h2>
              <p className="text-neutral-600 leading-relaxed">
                Björn Hartmann, Petershagener Str. 27, 15566 Schöneiche bei Berlin<br />
                <span className="text-sm text-neutral-500">nach § 55 Abs. 2 RStV</span>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Haftungsausschluss</h2>
              <p className="text-neutral-600 leading-relaxed">
                Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Urheberrecht</h2>
              <p className="text-neutral-600 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue-600)]">Online-Streitbeilegung</h2>
              <div className="space-y-4">
                <p className="text-neutral-600 leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: {" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


