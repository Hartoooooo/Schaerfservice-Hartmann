import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const canonical = "https://www.dentalschleifen.de/kueretten-schaerfen";

export const metadata: Metadata = {
  title: {
    absolute: "Küretten schärfen lassen Berlin | Gracey & Universal | Schärfservice Hartmann",
  },
  description:
    "Küretten schärfen lassen vom Profi ✓ Gracey-Küretten & Universal-Küretten ✓ Handgeschärft auf korrekten Winkel ✓ Express-Service Berlin ✓ Ab 5,69 €",
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
      "Küretten schärfen lassen vom Profi ✓ Gracey-Küretten & Universal-Küretten ✓ Handgeschärft auf korrekten Winkel ✓ Express-Service Berlin ✓ Ab 5,69 €",
    url: canonical,
  },
};

const anzeichen = [
  "Die Arbeitskante greift nicht mehr sauber unter den Zahnstein",
  "Erhöhter Kraftaufwand und schlechtere Kontrolle",
  "Das Instrument „rutscht“ statt zu greifen",
  "Sichtbare Abnutzung unter guter Beleuchtung oder Lupe",
];

const ablauf = [
  { n: "1", t: "Auftrag erteilen", d: "Einfach online über unser Auftragsformular" },
  { n: "2", t: "Küretten einsenden", d: "Sicher verpackt per Post oder Kurier" },
  { n: "3", t: "Schärfen & Prüfen", d: "Handschärfung und Qualitätsprüfung in Berlin" },
  { n: "4", t: "Zurücksenden", d: "Schnelle Rücksendung – Express auf Wunsch" },
];

const vorteile: [string, string][] = [
  ["Präziser", "korrekte Winkel durch erfahrene Handschärfung"],
  ["Materialschonender", "minimaler Materialabtrag"],
  ["Zeitsparender", "kein Aufwand für die Praxis"],
  ["Günstiger als Neukauf", "ab 5,69 € pro Instrument"],
];

const eckdaten = [
  { label: "ab 5,69 €", sub: "pro Instrument" },
  { label: "7 % Rabatt", sub: "ab 15 Instrumenten" },
  { label: "Gracey & Universal", sub: "alle gängigen Hersteller" },
  { label: "Express", sub: "in Berlin & Umgebung" },
];

const CheckIcon = () => (
  <svg className="mt-0.5 h-5 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
  </svg>
);

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
            src="/kueretten.webp"
            alt="Dental-Küretten mit farbigen Kennringen in Nahaufnahme vor grauem Hintergrund"
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
              Küretten schärfen lassen
              <span className="block text-blue-400 text-2xl sm:text-3xl font-medium mt-2">
                Experten-Service für Gracey &amp; Universal
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8">
              Küretten sind das wichtigste Instrument in der Parodontitistherapie und professionellen Zahnreinigung.
              Präzise, schonend und effektiv – dafür ist regelmäßiges Schärfen unerlässlich. Beim Schärfservice Hartmann
              werden Ihre Küretten handgeschärft, auf den korrekten Winkel.
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

      {/* Gracey vs Universal */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Gracey-Küretten vs. Universal-Küretten schärfen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beide Kürettentypen stellen beim Schärfen unterschiedliche Anforderungen – und genau hier liegt der
              Unterschied zum Selbstschärfen.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-md transition-shadow duration-200">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 mb-4">
                70° Offset-Winkel
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gracey-Küretten schärfen</h3>
              <p className="text-gray-600 leading-relaxed">
                Gracey-Küretten haben eine einseitig angeschliffene Arbeitskante mit einem spezifischen Offset-Winkel von
                70°. Beim Schärfen muss dieser Winkel exakt eingehalten werden – sonst verliert das Instrument seine
                charakteristischen Eigenschaften für die bereichsspezifische Parodontalbehandlung.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-md transition-shadow duration-200">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 mb-4">
                90° Anschliffwinkel
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Universal-Küretten schärfen</h3>
              <p className="text-gray-600 leading-relaxed">
                Universal-Küretten besitzen zwei Arbeitskanten und einen Anschliffwinkel von 90°. Beim Schärfen müssen
                beide Kanten gleichmäßig bearbeitet werden, damit die Balance des Instruments erhalten bleibt.
              </p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mt-8 max-w-3xl mx-auto text-center">
            Wir schärfen beide Typen aller gängigen Hersteller – Hu-Friedy, Deppeler, LM-Instruments, American Eagle und
            weitere.
          </p>
        </Container>
      </section>

      {/* Anzeichen */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Anzeichen für stumpfe Küretten
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

      {/* Ablauf */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              So einfach funktioniert der Auftrag
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ablauf.map((step) => (
              <div key={step.n} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
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
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                Küretten schärfen lassen statt selbst schärfen – lohnt sich das?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Selbstschärfen kostet Zeit, erfordert Übung und birgt das Risiko, den Schärfwinkel zu verändern oder zu
                viel Material abzutragen. Professionelles Schärfen durch den Schärfservice Hartmann ist:
              </p>
              <ul className="space-y-4">
                {vorteile.map(([t, d]) => (
                  <li key={t} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <CheckIcon />
                    <span>
                      <strong className="text-gray-900">{t}</strong> – {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 sm:p-10 text-white shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Küretten schärfen lassen leicht gemacht</h2>
              <p className="text-blue-50 leading-relaxed mb-6">
                Ab 15 Instrumenten 7&nbsp;% Rabatt · Preise ab 5,69 € pro Instrument.
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
