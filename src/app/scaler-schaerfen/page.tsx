import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const canonical = "https://www.dentalschleifen.de/scaler-schaerfen";

export const metadata: Metadata = {
  title: {
    absolute: "Scaler schärfen lassen Berlin | Professioneller Schärfservice | Hartmann",
  },
  description:
    "Scaler schärfen lassen vom Experten ✓ Alle Scaler-Typen ✓ Korrekter Schärfwinkel garantiert ✓ Express-Service Berlin ✓ Ab 5,69 € – Jetzt Auftrag erteilen",
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
      "Scaler schärfen lassen vom Experten ✓ Alle Scaler-Typen ✓ Korrekter Schärfwinkel garantiert ✓ Express-Service Berlin ✓ Ab 5,69 € – Jetzt Auftrag erteilen",
    url: canonical,
  },
};

const anzeichen = [
  "Die Arbeitskante gleitet über Zahnstein, ohne ihn zu fassen",
  "Der Behandler muss mehr Kraft aufwenden als gewohnt",
  "Die Behandlungszeit verlängert sich spürbar",
  "Sichtbare Abnutzung oder Verrundung der Arbeitskante",
];

const ablauf = [
  { n: "1", t: "Auftrag erteilen", d: "Einfach online über unser Auftragsformular" },
  { n: "2", t: "Instrumente einsenden", d: "Sicher verpackt per Post oder Kurier" },
  { n: "3", t: "Schärfen & Prüfen", d: "Professionelle Handbearbeitung in Berlin" },
  { n: "4", t: "Zurücksenden", d: "Schnell und zuverlässig, optional als Express" },
];

const warum = [
  "Jahrelange Erfahrung mit Dentalinstrumenten",
  "Handschärfung für beste Ergebnisse",
  "Schnelle Bearbeitung & zuverlässige Rücksendung",
  "Express-Service verfügbar",
  "Günstige Preise – schärfen statt neu kaufen",
];

const eckdaten = [
  { label: "ab 5,69 €", sub: "pro Instrument" },
  { label: "7 % Rabatt", sub: "ab 15 Instrumenten" },
  { label: "Handgeschärft", sub: "korrekter Schärfwinkel" },
  { label: "Express", sub: "in Berlin & Umgebung" },
];

const CheckIcon = () => (
  <svg className="mt-0.5 h-5 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
  </svg>
);

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
            src="/scaler.webp"
            alt="Dental-Scaler mit geriffeltem Griff in Nahaufnahme vor grauem Hintergrund"
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
              Scaler schärfen lassen
              <span className="block text-blue-400 text-2xl sm:text-3xl font-medium mt-2">
                Professioneller Schärfservice in Berlin
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8">
              Scaler gehören zu den meistgenutzten Instrumenten in Zahnarztpraxis und Prophylaxe. Durch den täglichen
              Einsatz verlieren sie schnell ihre Schärfe. Beim Schärfservice Hartmann erhalten Sie Ihre Scaler
              handgeschärft und in neuwertigem Zustand zurück.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/schaerfauftrag" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-base lg:text-lg font-medium" hover="lift">
                Jetzt Auftrag erteilen
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

      {/* Anzeichen */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Wann sollten Scaler geschärft werden?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ein stumpfer Scaler ist nicht nur ineffizient – er macht die Behandlung für Patienten deutlich unangenehmer.
              Typische Anzeichen, dass Ihre Scaler geschärft werden müssen:
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
            {anzeichen.map((text) => (
              <div key={text} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
                <CheckIcon />
                <span className="text-gray-700 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mt-8 max-w-3xl mx-auto text-center">
            Faustregel: Scaler sollten nach <strong>jeweils 3–5 Behandlungen</strong> nachgeschärft werden – oder
            spätestens, wenn die ersten Anzeichen einer Abstumpfung erkennbar sind.
          </p>
        </Container>
      </section>

      {/* Ablauf */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Scaler schärfen lassen – so einfach geht&apos;s
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ablauf.map((step) => (
              <div key={step.n} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-semibold mb-4">
                  {step.n}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">{step.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Warum + CTA */}
      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">Warum Schärfservice Hartmann?</h2>
              <ul className="space-y-4">
                {warum.map((text) => (
                  <li key={text} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <CheckIcon />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 sm:p-10 text-white shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Bereit, Ihre Scaler schärfen zu lassen?</h2>
              <p className="text-blue-50 leading-relaxed mb-6">
                Erteilen Sie Ihren Auftrag online in wenigen Minuten – ab 5,69 € pro Instrument.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/schaerfauftrag" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 font-medium" hover="lift-sm">
                  Jetzt Auftrag erteilen
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
