import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";

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

      <div className="container-page pt-6 pb-20">
        <article className="w-full">
          {/* Hero */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 mb-16">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="badge text-sm">Handgeschärft</span>
                <span className="badge text-sm">Korrekter Schärfwinkel</span>
                <span className="badge text-sm">Express möglich</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-5">
                Scaler schärfen lassen
                <span className="block text-[var(--color-blue-600)] font-medium mt-1">
                  Professioneller Schärfservice in Berlin
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Scaler gehören zu den meistgenutzten Instrumenten in Zahnarztpraxis und Prophylaxe. Durch den täglichen
                Einsatz verlieren sie schnell ihre Schärfe. Beim Schärfservice Hartmann erhalten Sie Ihre Scaler
                handgeschärft und in neuwertigem Zustand zurück.
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
                  src="/instrument-scaler.svg"
                  alt="Doppelendiger Dental-Scaler mit geriffeltem Griff in Nahaufnahme"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </figure>
          </section>

          {/* Anzeichen */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Wann sollten Scaler geschärft werden?</h2>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">
              Ein stumpfer Scaler ist nicht nur ineffizient – er macht die Behandlung für Patienten deutlich unangenehmer.
              Typische Anzeichen, dass Ihre Scaler geschärft werden müssen:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Die Arbeitskante gleitet über Zahnstein, ohne ihn zu fassen",
                "Der Behandler muss mehr Kraft aufwenden als gewohnt",
                "Die Behandlungszeit verlängert sich spürbar",
                "Sichtbare Abnutzung oder Verrundung der Arbeitskante",
              ].map((text) => (
                <div key={text} className="card p-5 flex-row items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-none text-[var(--color-blue-600)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed mt-6 max-w-3xl">
              Faustregel: Scaler sollten nach <strong>jeweils 3–5 Behandlungen</strong> nachgeschärft werden – oder
              spätestens, wenn die ersten Anzeichen einer Abstumpfung erkennbar sind.
            </p>
          </section>

          {/* Wie wir schärfen */}
          <section className="mb-16">
            <div className="rounded-3xl bg-slate-50 border border-gray-200 p-8 sm:p-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Wie schärfen wir Ihre Scaler?</h2>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">
                Beim Schärfservice Hartmann werden alle Scaler <strong>handgeschärft</strong> – mit dem richtigen
                Schärfwinkel für jeden Instrumententyp. Wir schärfen alle gängigen Scaler-Typen:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { t: "Sichel-Scaler", d: "z.B. H6/H7, Jacquette" },
                  { t: "Hoe-Scaler", d: "gerade Arbeitskante" },
                  { t: "Push- / File-Scaler", d: "präzise nachgezogen" },
                ].map((item) => (
                  <div key={item.t} className="card p-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{item.t}</h3>
                    <p className="text-sm text-gray-600">{item.d}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mt-6 max-w-3xl">
                Alle gängigen Hersteller wie Hu-Friedy, Deppeler und LM-Instruments. Nach dem Schärfen wird jedes
                Instrument auf Schärfe und Geometrie geprüft, bevor es an Sie zurückgeht.
              </p>
            </div>
          </section>

          {/* Ablauf */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Scaler schärfen lassen – so einfach geht&apos;s</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "1", t: "Auftrag erteilen", d: "Einfach online über unser Auftragsformular" },
                { n: "2", t: "Instrumente einsenden", d: "Sicher verpackt per Post oder Kurier" },
                { n: "3", t: "Schärfen & Prüfen", d: "Professionelle Handbearbeitung in Berlin" },
                { n: "4", t: "Zurücksenden", d: "Schnell und zuverlässig, optional als Express" },
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

          {/* Warum */}
          <section className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warum Schärfservice Hartmann?</h2>
                <ul className="space-y-3">
                  {[
                    "Jahrelange Erfahrung mit Dentalinstrumenten",
                    "Handschärfung für beste Ergebnisse",
                    "Schnelle Bearbeitung & zuverlässige Rücksendung",
                    "Express-Service verfügbar",
                    "Günstige Preise – schärfen statt neu kaufen",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <svg className="mt-0.5 h-5 w-5 flex-none text-[var(--color-blue-600)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                      </svg>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-blue-600 p-8 sm:p-10 text-white">
                <h2 className="text-2xl font-semibold mb-3">Bereit, Ihre Scaler schärfen zu lassen?</h2>
                <p className="text-blue-50 leading-relaxed mb-6">
                  Erteilen Sie Ihren Auftrag online in wenigen Minuten – ab 5,69 € pro Instrument.
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
