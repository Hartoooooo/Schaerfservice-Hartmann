import type { Metadata } from "next";
import Image from "next/image";
import SchaerfkursForm from "@/components/SchaerfkursForm";
import AiBadge from "@/components/ui/AiBadge";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Schärfkurs für Zahnarztpraxen, 2h Vor-Ort-Training",
  description: "Instrumente selbst schärfen lernen: 2-stündiger Praxiskurs direkt in Ihrer Zahnarztpraxis, für bis zu 4 Teilnehmer, ab 285 € zzgl. MwSt. Jetzt unverbindlich anfragen.",
  keywords: [
    "schärfkurs zahnarztpraxis",
    "instrumente schärfen lernen",
    "dental schärfen schulung",
    "schärfkurs berlin",
    "instrumentenschärfung lernen",
    "dental fortbildung berlin",
    "schärftechnik schulung",
    "instrumente schleifen kurs",
    "schärfkurs praxis",
  ],
  alternates: {
    canonical: "/schaerfkurs",
  },
  openGraph: {
    title: "Schärfkurs für Zahnarztpraxen, 2h Vor-Ort-Training",
    description: "Instrumente selbst schärfen lernen: 2-stündiger Praxiskurs direkt in Ihrer Zahnarztpraxis, für bis zu 4 Teilnehmer, ab 285 € zzgl. MwSt. Jetzt unverbindlich anfragen.",
  },
};

const kursInhalte = [
  {
    title: "Stumpfe Instrumente sicher erkennen",
    text: "Fingernagel-Test, Testplastik, Arbeitsgefühl: Wer das einmal verstanden hat, greift nie wieder unwissend zu einem stumpfen Instrument.",
  },
  {
    title: "Schärftechnik für jeden Instrumententyp",
    text: "Gracey-Küretten, Universalküretten, Scaler, Scheren: Jeder Typ hat seinen eigenen Winkel. Wir üben genau die Instrumente, die in Ihrer Praxis täglich im Einsatz sind.",
  },
  {
    title: "Direktes Feedback & ehrliche Einschätzung",
    text: "Sie schärfen selbst, mit sofortigem Feedback unseres Technikers. Dazu eine ehrliche Einschätzung zu Schleifmitteln, ohne Provisionsinteresse.",
  },
];

const zielgruppen = [
  { title: "ZFA, DH, ZMP, ZMF", text: "Zahnärztliches Fachpersonal, das das Schärfen eigenständig übernehmen und zur Routine machen möchte." },
  { title: "Zahnärzte & Teams", text: "Praxisinhaber, die den Kurs für ihr gesamtes Team buchen und alle auf denselben Stand bringen möchten." },
  { title: "Praxen mit hohem Volumen", text: "Praxen mit vielen Instrumenten, bei denen sich das Einschicken zum Schärfen durch Eigenständigkeit reduzieren lässt." },
  { title: "Unsichere Einsteiger", text: "Teams, die bisher unsicher waren, ob sie das Schärfen selbst übernehmen können. Nach dem Kurs haben sie Klarheit." },
  { title: "Auf Lebensdauer bedacht", text: "Praxen, die ihre Instrumente lange nutzen und durch regelmäßige Eigenverantwortung deren Lebensdauer maximieren." },
  { title: "Kostenbewusste Praxen", text: "Wer langfristig Schärfkosten senken will, investiert einmal in das Wissen und profitiert täglich davon." },
];

const eckdaten = [
  {
    label: "2 Stunden",
    sub: "kompakt & praxisnah",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "1-4 Teilnehmer",
    sub: "individuell betreut",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
      </svg>
    ),
  },
  {
    label: "In Ihrer Praxis",
    sub: "an Ihren Instrumenten",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
      </svg>
    ),
  },
  {
    label: "ab 285€",
    sub: "zzgl. MwSt., bis 2 Personen",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h4m-7 8h8a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function SchaerfkursPage() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.dentalschleifen.de" },
              { "@type": "ListItem", "position": 2, "name": "Schärfkurs", "item": "https://www.dentalschleifen.de/schaerfkurs" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Schärfkurse, Schärfservice Hartmann",
            "description": "Professionelle Schärfkurse für Zahnärzte und Praxispersonal",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Schärfservice Hartmann",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Petershagener Str. 27",
                "addressLocality": "Schöneiche bei Berlin",
                "postalCode": "15566",
                "addressCountry": "DE"
              },
              "telephone": "+49 174 9342576",
              "email": "hartmann-schaerfservice@web.de"
            },
            "course": {
              "@type": "Course",
              "name": "Schärfkurs für Dentalinstrumente",
              "description": "2-stündiger Kurs zur professionellen Schärfung von dentalen Instrumenten",
              "provider": "Schärfservice Hartmann",
              "courseMode": "InPerson",
              "duration": "PT2H",
              "offers": {
                "@type": "Offer",
                "price": "285",
                "priceCurrency": "EUR",
                "description": "Grundpreis für bis zu 2 Teilnehmer, jeder weitere Teilnehmer +45€"
              }
            }
          })
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/schaerfkursbild.png"
            alt="Schärfkurs für Dentalinstrumente, professionelle Schulung in Ihrer Praxis"
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
              Schärfkurs für <span className="text-blue-400">Zahnarztpraxen</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8">
              Lernen Sie in 2 Stunden, Ihre Instrumente selbst zu schärfen. Praxisnah, an Ihrem eigenen Instrumentenbestand, mit direktem Feedback vom Spezialisten.
            </p>
            <a
              href="#anfrage"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-full text-base lg:text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Jetzt Kurs anfragen
            </a>
          </div>
        </Container>
        <AiBadge className="top-4 right-4 sm:top-6 sm:right-6" align="right" />
      </section>

      {/* Eckdaten */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {eckdaten.map((item) => (
              <div key={item.label} className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 px-5 py-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formular + Kursinhalte */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
            <SchaerfkursForm />

            <div className="space-y-6 lg:sticky lg:top-28">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Was Sie im Kurs lernen
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Kein Frontalunterricht, sondern echtes Üben an Ihrem eigenen Instrumentenbestand, zugeschnitten auf Ihr Team.
              </p>
              <div className="space-y-4">
                {kursInhalte.map((item, i) => (
                  <div key={item.title} className="flex gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Sie lernen vom selben Spezialisten, der in Berlin täglich Instrumente schärft und aufbereitet. Wissen aus der täglichen Praxis, nicht aus Handbüchern.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Für wen? */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Für wen ist der Schärfkurs geeignet?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Der Kurs richtet sich an alle, die ihre Instrumente selbst schärfen und langfristig Kosten sparen wollen
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {zielgruppen.map(({ title, text }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-gray-900">
              Bereit, selbst zu schärfen?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Fragen Sie jetzt unverbindlich Ihren Wunschtermin an. Wir melden uns schnellstmöglich bei Ihnen.
            </p>
            <a
              href="#anfrage"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Zum Anfrageformular
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
