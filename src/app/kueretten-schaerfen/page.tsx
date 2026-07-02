import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";

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

      <div className="container-page pt-6 pb-20">
        <article className="w-full">
          {/* Hero */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 mb-16">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="badge text-sm">Gracey &amp; Universal</span>
                <span className="badge text-sm">Exakter Offset-Winkel</span>
                <span className="badge text-sm">Materialschonend</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-5">
                Küretten schärfen lassen
                <span className="block text-[var(--color-blue-600)] font-medium mt-1">
                  Experten-Service für Gracey &amp; Universal
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Küretten sind das wichtigste Instrument in der Parodontitistherapie und professionellen Zahnreinigung.
                Präzise, schonend und effektiv – dafür ist regelmäßiges Schärfen unerlässlich. Beim Schärfservice Hartmann
                werden Ihre Küretten handgeschärft, auf den korrekten Winkel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/schaerfauftrag" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3" hover="lift-sm">
                  Jetzt Auftrag erteilen
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
                  src="/instrument-kuerette.svg"
                  alt="Doppelendige Dental-Kürette mit abgerundeter Arbeitskante in Nahaufnahme"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </figure>
          </section>

          {/* Gracey vs Universal */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gracey-Küretten vs. Universal-Küretten schärfen</h2>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-3xl">
              Beide Kürettentypen stellen beim Schärfen unterschiedliche Anforderungen – und genau hier liegt der
              Unterschied zum Selbstschärfen.
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card p-7">
                <div className="badge text-sm mb-3">70° Offset-Winkel</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gracey-Küretten schärfen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Gracey-Küretten haben eine einseitig angeschliffene Arbeitskante mit einem spezifischen Offset-Winkel von
                  70°. Beim Schärfen muss dieser Winkel exakt eingehalten werden – sonst verliert das Instrument seine
                  charakteristischen Eigenschaften für die bereichsspezifische Parodontalbehandlung.
                </p>
              </div>
              <div className="card p-7">
                <div className="badge text-sm mb-3">90° Anschliffwinkel</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Universal-Küretten schärfen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Universal-Küretten besitzen zwei Arbeitskanten und einen Anschliffwinkel von 90°. Beim Schärfen müssen
                  beide Kanten gleichmäßig bearbeitet werden, damit die Balance des Instruments erhalten bleibt.
                </p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mt-6 max-w-3xl">
              Wir schärfen beide Typen aller gängigen Hersteller – Hu-Friedy, Deppeler, LM-Instruments, American Eagle und
              weitere.
            </p>
          </section>

          {/* Anzeichen */}
          <section className="mb-16">
            <div className="rounded-3xl bg-slate-50 border border-gray-200 p-8 sm:p-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Anzeichen für stumpfe Küretten</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Die Arbeitskante greift nicht mehr sauber unter den Zahnstein",
                  "Erhöhter Kraftaufwand und schlechtere Kontrolle",
                  "Das Instrument „rutscht“ statt zu greifen",
                  "Sichtbare Abnutzung unter guter Beleuchtung oder Lupe",
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

          {/* Ablauf */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">So einfach funktioniert der Auftrag</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "1", t: "Auftrag erteilen", d: "Einfach online über unser Auftragsformular" },
                { n: "2", t: "Küretten einsenden", d: "Sicher verpackt per Post oder Kurier" },
                { n: "3", t: "Schärfen & Prüfen", d: "Handschärfung und Qualitätsprüfung in Berlin" },
                { n: "4", t: "Zurücksenden", d: "Schnelle Rücksendung – Express auf Wunsch" },
              ].map((step) => (
                <div key={step.n} className="card p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-semibold mb-4">
                    {step.n}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{step.t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Warum + CTA */}
          <section className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Küretten schärfen lassen statt selbst schärfen – lohnt sich das?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Selbstschärfen kostet Zeit, erfordert Übung und birgt das Risiko, den Schärfwinkel zu verändern oder zu
                  viel Material abzutragen. Professionelles Schärfen durch den Schärfservice Hartmann ist:
                </p>
                <ul className="space-y-3">
                  {[
                    ["Präziser", "korrekte Winkel durch erfahrene Handschärfung"],
                    ["Materialschonender", "minimaler Materialabtrag"],
                    ["Zeitsparender", "kein Aufwand für die Praxis"],
                    ["Günstiger als Neukauf", "ab 5,69 € pro Instrument"],
                  ].map(([t, d]) => (
                    <li key={t} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <svg className="mt-0.5 h-5 w-5 flex-none text-[var(--color-blue-600)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                      </svg>
                      <span>
                        <strong className="text-gray-900">{t}</strong> – {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-blue-600 p-8 sm:p-10 text-white">
                <h2 className="text-2xl font-semibold mb-3">Küretten schärfen lassen leicht gemacht</h2>
                <p className="text-blue-50 leading-relaxed mb-6">
                  Ab 15 Instrumenten 7&nbsp;% Rabatt · Preise ab 5,69 € pro Instrument.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/schaerfauftrag" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3" hover="lift-sm">
                    Jetzt Auftrag erteilen
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
