import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SeoImagePlaceholder } from "@/components/SeoImagePlaceholder";

const canonical = "https://www.dentalschleifen.de/chirurgische-instrumente-schaerfen";

export const metadata: Metadata = {
  title: {
    absolute:
      "Chirurgische Instrumente schärfen Berlin | Scheren, Pinzetten | Schärfservice Hartmann",
  },
  description:
    "Chirurgische Instrumente schärfen lassen ✓ Scheren, Nadelhalter, Pinzetten ✓ Professionelle Bearbeitung ✓ Express-Service Berlin ✓ Ab 6,04 € – Jetzt beauftragen",
  keywords: [
    "chirurgische Instrumente schärfen",
    "OP-Instrumente schärfen",
    "Scheren schärfen Dental",
    "Needle holder schärfen",
    "chirurgische Instrumente schärfen Berlin",
  ],
  alternates: { canonical: "/chirurgische-instrumente-schaerfen" },
  openGraph: {
    title:
      "Chirurgische Instrumente schärfen Berlin | Scheren, Pinzetten | Schärfservice Hartmann",
    description:
      "Chirurgische Instrumente schärfen lassen ✓ Scheren, Nadelhalter, Pinzetten ✓ Professionelle Bearbeitung ✓ Express-Service Berlin ✓ Ab 6,04 € – Jetzt beauftragen",
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
          <Link href="/kueretten-schaerfen" className="hover:underline">
            Küretten schärfen lassen
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

export default function ChirurgischeInstrumentePage() {
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
              {
                "@type": "ListItem",
                position: 2,
                name: "Chirurgische Instrumente schärfen",
                item: canonical,
              },
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
            name: "Chirurgische Instrumente schärfen Berlin",
            description:
              "Professionelle Schärfung und Aufarbeitung dentaler OP-Instrumente wie Scheren, Nadelhalter und Pinzetten.",
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
            Chirurgische Instrumente schärfen – Professioneller Service in Berlin
          </h1>

          <div className="mb-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <p className="text-lg text-gray-600 leading-relaxed">
              Chirurgische Instrumente müssen höchsten Ansprüchen genügen. Scheren, Nadelhalter und Pinzetten, die nicht mehr
              einwandfrei funktionieren, beeinträchtigen die Präzision bei oralen Eingriffen. Beim Schärfservice Hartmann
              schärfen und überholen wir chirurgische Dental-Instrumente professionell – damit Sie sich auf Ihre Arbeit
              konzentrieren können.
            </p>
            <SeoImagePlaceholder
              caption="OP-Set Dental"
              suggestedAlt="Arrangement aus chirurgischen Dentalinstrumenten: Scheren, Nadelhalter und Pinzetten"
              ideaHint="Idee: Hochwertiges Stillleben OP-Scheren (verschiedene Spitzen), Nadelhalter mit Mattierung, anatomische Pinzette; dunkelgrauer Stoffhintergrund, wenig Reflex."
            />
          </div>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-6">
              Welche chirurgischen Instrumente schärfen wir?
            </h2>
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
              <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
                <li>
                  <strong>Dentale Scheren</strong> – Weichgewebsscheren, Nahtscheren, Präparierscheren
                </li>
                <li>
                  <strong>Nadelhalter</strong> – Prüfung und Aufarbeitung der Branchen
                </li>
                <li>
                  <strong>Pinzetten</strong> – Anatomische und chirurgische Pinzetten
                </li>
                <li>
                  <strong>Raspatorien &amp; Hebel</strong> – Aufarbeitung der Arbeitsflächen
                </li>
                <li>
                  <strong>Luxationsinstrumente</strong> – Schärfen der Arbeitskanten
                </li>
              </ul>
              <SeoImagePlaceholder
                caption="Scheren, Halter, Pinzetten"
                suggestedAlt="Detail mehrerer chirurgischer Instrumente mit Fokus auf Scherenblatt und Nadelhalter-Backen"
                ideaHint="Idee: Makro Scherenblatt mit sauberer Schneidkante; zweites Bild optional Nadelhalter-Drucktest – hier genügt ein stimmiges Ensemble-Foto aus der Werkstatt- oder Praxislinie."
              />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-4">
              Wann müssen chirurgische Instrumente geschärft werden?
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
              <li>Scheren schneiden nicht mehr sauber oder reißen das Gewebe</li>
              <li>Nadelhalter halten die Nadel nicht mehr sicher</li>
              <li>Erhöhter Kraftaufwand bei der Anwendung</li>
              <li>Sichtbare Abnutzung, Korrosion oder beschädigte Kanten</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[var(--color-blue-600)] mb-4">
              Professionelle Aufarbeitung statt Neukauf
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Hochwertige chirurgische Instrumente sind eine Investition. Professionelles Schärfen und Aufarbeiten verlängert
              die Lebensdauer erheblich und spart gegenüber dem Neukauf oft 80–90&nbsp;% der Kosten.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4 font-medium">
              Preise ab 6,04 € pro Instrument | Express-Service verfügbar | Ab 15 Instrumenten 7&nbsp;% Rabatt
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button href="/schaerfauftrag" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3" hover="lift-sm">
              Jetzt beauftragen
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
