import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SeoImagePlaceholder } from "@/components/SeoImagePlaceholder";

const canonical = "https://www.dentalschleifen.de/scaler-schaerfen";

export const metadata: Metadata = {
  title: {
    absolute: "Scaler schärfen lassen Berlin | Professioneller Schärfservice | Hartmann",
  },
  description:
    "Scaler schärfen lassen vom Experten ✓ Alle Scaler-Typen ✓ Korrekter Schärfwinkel garantiert ✓ Express-Service Berlin ✓ Ab 6,04 € – Jetzt Auftrag erteilen",
  keywords: [
    "Scaler schärfen",
    "Scaler schärfen lassen",
    "Scaler schleifen",
    "Scaler schärfen Berlin",
    "Dental Scaler schärfen",
  ],
  alternates: { canonical: "/scaler-schaerfen" },
  openGraph: {
    title: "Scaler schärfen lassen Berlin | Professioneller Schärfservice | Hartmann",
    description:
      "Scaler schärfen lassen vom Experten ✓ Alle Scaler-Typen ✓ Korrekter Schärfwinkel garantiert ✓ Express-Service Berlin ✓ Ab 6,04 € – Jetzt Auftrag erteilen",
    url: canonical,
  },
};

function RelatedLinks() {
  return (
    <section className="mt-14 pt-10 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Auch interessant</h2>
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-blue-600">
        <li>
          <Link href="/kueretten-schaerfen" className="hover:underline">
            Küretten schärfen lassen
          </Link>
        </li>
        <li className="hidden sm:block text-gray-300 select-none" aria-hidden>
          ·
        </li>
        <li>
          <Link href="/chirurgische-instrumente-schaerfen" className="hover:underline">
            Chirurgische Instrumente schärfen
          </Link>
        </li>
        <li className="hidden sm:block text-gray-300 select-none" aria-hidden>
          ·
        </li>
        <li>
          <Link href="/schaerfauftrag" className="hover:underline">
            Schärfauftrag starten
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default function ScalerSchaerfenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.dentalschleifen.de" },
              { "@type": "ListItem", position: 2, name: "Scaler schärfen", item: canonical },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Scaler schärfen lassen Berlin",
            description:
              "Professionelles Handschärfen von Dental-Scaler aller gängigen Typen mit korrektem Schärfwinkel.",
            provider: {
              "@type": "LocalBusiness",
              name: "Schärfservice Hartmann",
              telephone: "+49-174-9342576",
            },
            areaServed: { "@type": "Country", name: "Deutschland" },
          }),
        }}
      />

      <div className="container-page pt-6 pb-20">
        <article className="w-full">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
            Scaler schärfen lassen – Professioneller Schärfservice in Berlin
          </h1>

          <div className="mb-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <p className="text-lg text-gray-600 leading-relaxed">
              Scaler gehören zu den meistgenutzten Instrumenten in der Zahnarztpraxis und im Prophylaxe-Bereich. Durch den
              täglichen Einsatz verlieren sie schnell ihre Schärfe – mit spürbaren Folgen für die Behandlungsqualität. Beim
              Schärfservice Hartmann lassen Sie Ihre Scaler professionell schärfen und erhalten sie in neuwertigem Zustand
              zurück.
            </p>
            <SeoImagePlaceholder
              caption="Scaler & Prophylaxe"
              suggestedAlt="Verschiedene Dental-Scaler auf sterilem Tray, Praxis-Prophylaxe"
              ideaHint="Idee: Makro verschiedener Sichel- und Hue-Scaler auf Sterilfeld oder Cassette; neutraler Hintergrund, gutes Licht auf der Spitze."
            />
          </div>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-4">Wann sollten Scaler geschärft werden?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ein stumpfer Scaler ist nicht nur ineffizient – er kann die Behandlung für Patienten deutlich unangenehmer
              machen. Typische Anzeichen, dass Ihre Scaler geschärft werden müssen:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
              <li>Die Arbeitskante gleitet über Zahnstein, ohne ihn zu fassen</li>
              <li>Der Behandler muss mehr Kraft aufwenden als gewohnt</li>
              <li>Die Behandlungszeit verlängert sich spürbar</li>
              <li>Sichtbare Abnutzung oder Verrundung der Arbeitskante</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Faustregel: Scaler sollten nach <strong>jeweils 3–5 Behandlungen</strong> nachgeschärft werden – oder spätestens
              wenn die ersten Anzeichen einer Abstumpfung erkennbar sind.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-6">Wie schärfen wir Ihre Scaler?</h2>
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Beim Schärfservice Hartmann werden alle Scaler <strong>handgeschärft</strong> – mit dem richtigen Schärfwinkel für
                  jeden Instrumententyp. Wir schärfen alle gängigen Scaler-Typen:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
                  <li>
                    <strong>Sichel-Scaler</strong> (z.B. H6/H7, Jacquette)
                  </li>
                  <li>
                    <strong>Hoe-Scaler</strong>
                  </li>
                  <li>
                    <strong>Push-Scaler / File-Scaler</strong>
                  </li>
                  <li>Alle gängigen Hersteller wie Hu-Friedy, Deppeler, LM-Instruments u.v.m.</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Nach dem Schärfen wird jedes Instrument auf Schärfe und Geometrie geprüft, bevor es an Sie zurückgeht.
                </p>
              </div>
              <SeoImagePlaceholder
                caption="Handschärfung & Werkstatt"
                suggestedAlt="Schleifstein und Dentalinstrument bei der manuellen Schärfung in der Werkstatt"
                ideaHint="Idee: Nahaufnahme professioneller Handschärfung (Schleifstein, ruhiger Hintergrund); alternativ fertig bearbeitete Scaler auf weichem Pad sortiert."
              />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-4">Scaler schärfen lassen – so einfach geht&apos;s</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600 leading-relaxed">
              <li>
                <strong>Auftrag online erteilen</strong> – einfach über unser Auftragsformular
              </li>
              <li>
                <strong>Instrumente einsenden</strong> – sicher verpackt per Post oder Kurier
              </li>
              <li>
                <strong>Schärfen &amp; Prüfen</strong> – professionelle Bearbeitung in Berlin
              </li>
              <li>
                <strong>Zurücksenden</strong> – schnell und zuverlässig, optional als Express
              </li>
            </ol>
            <p className="text-gray-600 leading-relaxed mt-6 font-medium">
              Preise ab 6,04 € pro Instrument | Ab 15 Instrumenten sparen Sie 7&nbsp;%
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-4">Warum Schärfservice Hartmann?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
              <li>Jahrelange Erfahrung mit Dentalinstrumenten</li>
              <li>Handschärfung für beste Ergebnisse</li>
              <li>Schnelle Bearbeitung &amp; zuverlässige Rücksendung</li>
              <li>Express-Service verfügbar</li>
              <li>Günstige Preise – schärfen statt neu kaufen</li>
            </ul>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button href="/schaerfauftrag" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3" hover="lift-sm">
              Jetzt Auftrag erteilen
            </Button>
            <Button href="/express-schaerfen" variant="outline" className="px-6 py-3" hover="lift-sm">
              Express-Service
            </Button>
          </div>

          <RelatedLinks />
        </article>
      </div>
    </>
  );
}
