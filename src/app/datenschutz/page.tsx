import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Schärfservice Hartmann. Informationen zum Umgang mit personenbezogenen Daten, Ihre Rechte und Kontaktmöglichkeiten gemäß DSGVO.",
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
                  Telefon: 0175 9342576
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


