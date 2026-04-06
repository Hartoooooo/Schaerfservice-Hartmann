import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SeoImagePlaceholder } from "@/components/SeoImagePlaceholder";

const canonical = "https://www.dentalschleifen.de/kueretten-schaerfen";

export const metadata: Metadata = {
  title: {
    absolute: "Küretten schärfen lassen Berlin | Gracey & Universal | Schärfservice Hartmann",
  },
  description:
    "Küretten schärfen lassen vom Profi ✓ Gracey-Küretten & Universal-Küretten ✓ Handgeschärft auf korrekten Winkel ✓ Express-Service Berlin ✓ Ab 6,04 €",
  keywords: [
    "Küretten schärfen",
    "Küretten schärfen lassen",
    "Gracey Küretten schärfen",
    "Universal Küretten schärfen",
    "Küretten schärfen Berlin",
  ],
  alternates: { canonical: "/kueretten-schaerfen" },
  openGraph: {
    title: "Küretten schärfen lassen Berlin | Gracey & Universal | Schärfservice Hartmann",
    description:
      "Küretten schärfen lassen vom Profi ✓ Gracey-Küretten & Universal-Küretten ✓ Handgeschärft auf korrekten Winkel ✓ Express-Service Berlin ✓ Ab 6,04 €",
    url: canonical,
  },
};

function RelatedLinks() {
  return (
    <section className="mt-14 pt-10 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Auch interessant</h2>
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-blue-600">
        <li>
          <Link href="/scaler-schaerfen" className="hover:underline">
            Scaler schärfen lassen
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

export default function KuerettenSchaerfenPage() {
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
              { "@type": "ListItem", position: 2, name: "Küretten schärfen", item: canonical },
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
            name: "Küretten schärfen lassen Berlin",
            description:
              "Professionelles Handschärfen von Gracey- und Universal-Küretten mit exakten Schärfwinkeln.",
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
            Küretten schärfen lassen – Experten-Service für Gracey &amp; Universal-Küretten
          </h1>

          <div className="mb-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <p className="text-lg text-gray-600 leading-relaxed">
              Küretten sind das wichtigste Instrument in der Parodontitistherapie und professionellen Zahnreinigung. Präzise,
              schonend und effektiv – so müssen Küretten arbeiten. Dafür ist regelmäßiges Schärfen unerlässlich. Beim
              Schärfservice Hartmann in Berlin lassen Sie Ihre Küretten professionell schärfen: handgeschärft, auf den
              korrekten Winkel, für beste Behandlungsergebnisse.
            </p>
            <figure className="w-full">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200 bg-slate-100 shadow-sm">
                <Image
                  src="/Kuerettenseite.png"
                  alt="Nahaufnahme Dental-Küretten und Scaler vor klinischem Hintergrund mit Zahnmodell und Röntgenbild"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </figure>
          </div>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-4">
              Gracey-Küretten vs. Universal-Küretten schärfen
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Beide Kürettentypen stellen beim Schärfen unterschiedliche Anforderungen – und genau hier liegt der Unterschied
              zum Selbstschärfen.
            </p>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Gracey-Küretten schärfen</h3>
                <p>
                  Gracey-Küretten haben eine einseitig angeschliffene Arbeitskante mit einem spezifischen Offset-Winkel von
                  70°. Beim Schärfen muss dieser Winkel exakt eingehalten werden – sonst verliert das Instrument seine
                  charakteristischen Eigenschaften für die bereichsspezifische Parodontalbehandlung.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Universal-Küretten schärfen</h3>
                <p>
                  Universal-Küretten besitzen zwei Arbeitskanten und einen Anschliffwinkel von 90°. Beim Schärfen müssen beide
                  Kanten gleichmäßig bearbeitet werden, damit die Balance des Instruments erhalten bleibt.
                </p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">
              Wir schärfen beide Typen aller gängigen Hersteller – Hu-Friedy, Deppeler, LM-Instruments, American Eagle und
              weitere.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-4">Anzeichen für stumpfe Küretten</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
              <li>Die Arbeitskante greift nicht mehr sauber unter den Zahnstein</li>
              <li>Erhöhter Kraftaufwand und schlechtere Kontrolle</li>
              <li>Das Instrument „rutscht“ statt zu greifen</li>
              <li>Sichtbare Abnutzung unter guter Beleuchtung oder Lupe</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-6">
              Küretten schärfen lassen statt selbst schärfen – lohnt sich das?
            </h2>
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Selbstschärfen kostet Zeit, erfordert Übung und birgt das Risiko, den Schärfwinkel zu verändern oder zu viel
                  Material abzutragen. Professionelles Schärfen durch den Schärfservice Hartmann ist:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
                  <li>
                    <strong>Präziser</strong> – korrekte Winkel durch erfahrene Handschärfung
                  </li>
                  <li>
                    <strong>Materialschonender</strong> – minimaler Materialabtrag
                  </li>
                  <li>
                    <strong>Zeitsparender</strong> – kein Aufwand für die Praxis
                  </li>
                  <li>
                    <strong>Günstiger als Neukauf</strong> – ab 6,04 € pro Instrument
                  </li>
                </ul>
              </div>
              <SeoImagePlaceholder
                caption="Winkel & Handschärfung"
                suggestedAlt="Handschärfung einer Kürette am Schleifstein mit korrektem Winkel"
                ideaHint="Idee: Nahaufnahme Arbeitshand mit Kürette am (grob-/fein-)Schleifstein; oder Diagramm-Foto 70° vs. 90° als spätere Grafik — bis dahin authentische Werkstatt-Szene."
              />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-4">So einfach funktioniert der Auftrag</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600 leading-relaxed">
              <li>Auftrag online erteilen</li>
              <li>Küretten sicher einsenden</li>
              <li>Professionelles Schärfen &amp; Qualitätsprüfung</li>
              <li>Schnelle Rücksendung – Express auf Wunsch</li>
            </ol>
            <p className="text-gray-600 leading-relaxed mt-6 font-medium">
              Ab 15 Instrumenten 7&nbsp;% Rabatt | Preise ab 6,04 € pro Instrument
            </p>
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
