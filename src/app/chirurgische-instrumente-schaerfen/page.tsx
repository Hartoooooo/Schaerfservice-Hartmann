import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const canonical = "https://www.dentalschleifen.de/chirurgische-instrumente-schaerfen";

export const metadata: Metadata = {
  title: {
    absolute:
      "Chirurgische Instrumente schärfen Berlin | Scheren, Pinzetten | Schärfservice Hartmann",
  },
  description:
    "Chirurgische Instrumente schärfen lassen ✓ Scheren, Pinzetten ✓ Professionelle Bearbeitung ✓ Express-Service Berlin ✓ Ab 5,69 € – Jetzt beauftragen",
  keywords: [
    "chirurgische Instrumente schärfen",
    "OP-Instrumente schärfen",
    "Scheren schärfen Dental",
    "chirurgische Instrumente schärfen Berlin",
  ],
  alternates: { canonical: "/chirurgische-instrumente-schaerfen" },
  openGraph: {
    title:
      "Chirurgische Instrumente schärfen Berlin | Scheren, Pinzetten | Schärfservice Hartmann",
    description:
      "Chirurgische Instrumente schärfen lassen ✓ Scheren, Pinzetten ✓ Professionelle Bearbeitung ✓ Express-Service Berlin ✓ Ab 5,69 € – Jetzt beauftragen",
    url: canonical,
  },
};

const instrumente = [
  { t: "Dentale Scheren", d: "Weichgewebs-, Naht- und Präparierscheren" },
  { t: "Pinzetten", d: "Anatomische und chirurgische Pinzetten" },
  { t: "Raspatorien & Hebel", d: "Aufarbeitung der Arbeitsflächen" },
  { t: "Luxationsinstrumente", d: "Schärfen der Arbeitskanten" },
];

const anzeichen = [
  "Scheren schneiden nicht mehr sauber oder reißen das Gewebe",
  "Erhöhter Kraftaufwand bei der Anwendung",
  "Sichtbare Abnutzung, Korrosion oder beschädigte Kanten",
];

const eckdaten = [
  { label: "ab 5,69 €", sub: "pro Instrument" },
  { label: "7 % Rabatt", sub: "ab 15 Instrumenten" },
  { label: "Aufarbeitung", sub: "inklusive Prüfung" },
  { label: "Express", sub: "in Berlin & Umgebung" },
];

const CheckIcon = () => (
  <svg className="mt-0.5 h-5 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
  </svg>
);

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
              "Professionelle Schärfung und Aufarbeitung dentaler OP-Instrumente wie Scheren und Pinzetten.",
            provider: {
              "@type": "LocalBusiness",
              name: "Schärfservice Hartmann",
              telephone: "+49 174 9342576",
            },
            areaServed: { "@type": "Country", name: "Deutschland" },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/dental-schere-schaerfwinkel-berlin.jpg"
            alt="Chirurgische Dental-Schere mit Goldgriff in Nahaufnahme vor grauem Hintergrund"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25) 100%)' }} />
        </div>
        <Container className="relative z-10">
          <div className="py-24 sm:py-32 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-5">
              Chirurgische Instrumente schärfen
              <span className="block text-blue-400 text-2xl sm:text-3xl font-medium mt-2">
                Professioneller Service in Berlin
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8">
              Chirurgische Instrumente müssen höchsten Ansprüchen genügen. Scheren und Pinzetten, die nicht
              mehr einwandfrei funktionieren, beeinträchtigen die Präzision bei oralen Eingriffen. Wir schärfen und
              überholen chirurgische Dental-Instrumente professionell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/schaerfauftrag" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-base lg:text-lg font-medium" hover="lift">
                Jetzt beauftragen
              </Button>
              <Button href="/express-schaerfen" className="border border-white/60 text-white hover:bg-white/10 px-8 py-4 text-base lg:text-lg font-medium" hover="lift">
                Express-Service
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Eckdaten */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {eckdaten.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 text-center">
                <div className="text-base sm:text-lg font-semibold text-blue-700">{item.label}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Welche Instrumente */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Welche chirurgischen Instrumente schärfen wir?
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {instrumente.map((item) => (
              <div key={item.t} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">{item.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Wann schärfen */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Wann müssen chirurgische Instrumente geschärft werden?
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
            {anzeichen.map((text) => (
              <div key={text} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <CheckIcon />
                <span className="text-gray-700 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Aufarbeitung + CTA */}
      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                Professionelle Aufarbeitung statt Neukauf
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hochwertige chirurgische Instrumente sind eine Investition. Professionelles Schärfen und Aufarbeiten
                verlängert die Lebensdauer erheblich und spart gegenüber dem Neukauf oft 80–90&nbsp;% der Kosten.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                Preise ab 5,69 € pro Instrument · Express-Service verfügbar · ab 15 Instrumenten 7&nbsp;% Rabatt.
              </p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 sm:p-10 text-white shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Instrumente aufarbeiten lassen</h2>
              <p className="text-blue-50 leading-relaxed mb-6">
                Erteilen Sie Ihren Auftrag online – wir kümmern uns um Schärfung, Prüfung und Rücksendung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/schaerfauftrag" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 font-medium" hover="lift-sm">
                  Jetzt beauftragen
                </Button>
                <Button href="/express-schaerfen" className="border border-white/60 text-white hover:bg-white/10 px-6 py-3 font-medium" hover="lift-sm">
                  Express-Service
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
