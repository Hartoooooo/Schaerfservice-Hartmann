import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";

const canonical = "https://www.dentalschleifen.de/chirurgische-instrumente-schaerfen";

export const metadata: Metadata = {
  title: {
    absolute:
      "Chirurgische Instrumente schärfen Berlin | Scheren, Pinzetten | Schärfservice Hartmann",
  },
  description:
    "Chirurgische Instrumente schärfen lassen ✓ Scheren, Nadelhalter, Pinzetten ✓ Professionelle Bearbeitung ✓ Express-Service Berlin ✓ Ab 5,69 € – Jetzt beauftragen",
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
      "Chirurgische Instrumente schärfen lassen ✓ Scheren, Nadelhalter, Pinzetten ✓ Professionelle Bearbeitung ✓ Express-Service Berlin ✓ Ab 5,69 € – Jetzt beauftragen",
    url: canonical,
  },
};

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
              telephone: "+49 174 9342576",
            },
            areaServed: { "@type": "Country", name: "Deutschland" },
          }),
        }}
      />

      <div className="container-page pt-6 pb-20">
        <article className="w-full">
          {/* Hero */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 mb-16">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="badge text-sm">Scheren &amp; Nadelhalter</span>
                <span className="badge text-sm">Aufarbeitung inklusive</span>
                <span className="badge text-sm">Express möglich</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-5">
                Chirurgische Instrumente schärfen
                <span className="block text-[var(--color-blue-600)] font-medium mt-1">
                  Professioneller Service in Berlin
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Chirurgische Instrumente müssen höchsten Ansprüchen genügen. Scheren, Nadelhalter und Pinzetten, die nicht
                mehr einwandfrei funktionieren, beeinträchtigen die Präzision bei oralen Eingriffen. Wir schärfen und
                überholen chirurgische Dental-Instrumente professionell.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/schaerfauftrag" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3" hover="lift-sm">
                  Jetzt beauftragen
                </Button>
                <Button href="/express-schaerfen" variant="outline" className="px-6 py-3" hover="lift-sm">
                  Express-Service
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-5">
                Ab <strong className="text-gray-700">5,69 €</strong> pro Instrument · ab 15 Instrumenten 7&nbsp;% Rabatt
              </p>
            </div>

            <figure className="relative">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-[var(--shadow-strong)]">
                <Image
                  src="/instrument-chirurgie.svg"
                  alt="Chirurgische Dental-Schere mit polierten Branchen in Nahaufnahme"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </figure>
          </section>

          {/* Welche Instrumente */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welche chirurgischen Instrumente schärfen wir?</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Dentale Scheren", d: "Weichgewebs-, Naht- und Präparierscheren" },
                { t: "Nadelhalter", d: "Prüfung und Aufarbeitung der Branchen" },
                { t: "Pinzetten", d: "Anatomische und chirurgische Pinzetten" },
                { t: "Raspatorien & Hebel", d: "Aufarbeitung der Arbeitsflächen" },
                { t: "Luxationsinstrumente", d: "Schärfen der Arbeitskanten" },
              ].map((item) => (
                <div key={item.t} className="card p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{item.t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Wann schärfen */}
          <section className="mb-16">
            <div className="rounded-3xl bg-slate-50 border border-gray-200 p-8 sm:p-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Wann müssen chirurgische Instrumente geschärft werden?
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Scheren schneiden nicht mehr sauber oder reißen das Gewebe",
                  "Nadelhalter halten die Nadel nicht mehr sicher",
                  "Erhöhter Kraftaufwand bei der Anwendung",
                  "Sichtbare Abnutzung, Korrosion oder beschädigte Kanten",
                ].map((text) => (
                  <div key={text} className="card p-5 flex-row items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 flex-none text-[var(--color-blue-600)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Aufarbeitung + CTA */}
          <section className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professionelle Aufarbeitung statt Neukauf</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Hochwertige chirurgische Instrumente sind eine Investition. Professionelles Schärfen und Aufarbeiten
                  verlängert die Lebensdauer erheblich und spart gegenüber dem Neukauf oft 80–90&nbsp;% der Kosten.
                </p>
                <p className="text-gray-700 leading-relaxed font-medium">
                  Preise ab 5,69 € pro Instrument · Express-Service verfügbar · ab 15 Instrumenten 7&nbsp;% Rabatt.
                </p>
              </div>
              <div className="rounded-3xl bg-blue-600 p-8 sm:p-10 text-white">
                <h2 className="text-2xl font-semibold mb-3">Instrumente aufarbeiten lassen</h2>
                <p className="text-blue-50 leading-relaxed mb-6">
                  Erteilen Sie Ihren Auftrag online – wir kümmern uns um Schärfung, Prüfung und Rücksendung.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/schaerfauftrag" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3" hover="lift-sm">
                    Jetzt beauftragen
                  </Button>
                  <Button href="/express-schaerfen" className="border border-white/60 text-white hover:bg-white/10 px-6 py-3" hover="lift-sm">
                    Express-Service
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
