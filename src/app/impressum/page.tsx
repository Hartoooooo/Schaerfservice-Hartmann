import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum - Instrumente schärfen Berlin",
  description: "Impressum Schärfservice Hartmann - Instrumente schärfen & Dental schleifen Berlin. Inhaber Björn Hartmann, Petershagener Str. 27, 15566 Schöneiche bei Berlin.",
  robots: {
    index: true,
    follow: false,
  },
};

export default function ImpressumPage() {
  return (
    <div className="container-page py-16">
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
                  <span className="font-medium">Telefon:</span> 0174 9342576<br />
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
          </div>
        </div>
      </div>
    </div>
  );
}


