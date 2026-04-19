import type { Metadata } from "next";
import SchaerfkurseForm from "@/components/SchaerfkurseForm";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Schärfkurs für Zahnarztpraxen, 2h Vor-Ort-Training | Schärfservice Hartmann",
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
    canonical: "/schaerfkurse",
  },
  openGraph: {
    title: "Schärfkurs für Zahnarztpraxen, 2h Vor-Ort-Training | Schärfservice Hartmann",
    description: "Instrumente selbst schärfen lernen: 2-stündiger Praxiskurs direkt in Ihrer Zahnarztpraxis, für bis zu 4 Teilnehmer, ab 285 € zzgl. MwSt. Jetzt unverbindlich anfragen.",
  },
};

export default function SchaerfkursePage() {
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
              { "@type": "ListItem", "position": 2, "name": "Schärfkurse", "item": "https://www.dentalschleifen.de/schaerfkurse" }
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

      {/* Page Header mit H1 */}
      <div>
        <Container>
          <div className="max-w-3xl mx-auto pt-6 pb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
              Schärfkurs für Zahnarztpraxen
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              2&nbsp;Stunden Praxiskurs direkt bei Ihnen &middot; bis zu 4&nbsp;Teilnehmer
            </p>
          </div>
        </Container>
      </div>

      {/* Formular */}
      <SchaerfkurseForm />

      {/* Für wen ist der Kurs geeignet? */}
      <section className="py-20">
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
            {[
              { title: "ZFA, DH, ZMP, ZMF", text: "Zahnärztliches Fachpersonal, das das Schärfen eigenständig übernehmen und zur Routine machen möchte." },
              { title: "Zahnärzte & Teams", text: "Praxisinhaber, die den Kurs für ihr gesamtes Team buchen und alle auf denselben Stand bringen möchten." },
              { title: "Praxen mit hohem Volumen", text: "Praxen mit vielen Instrumenten, bei denen sich das Einschicken zum Schärfen durch Eigenständigkeit reduzieren lässt." },
              { title: "Unsichere Einsteiger", text: "Teams, die bisher unsicher waren, ob sie das Schärfen selbst übernehmen können. Nach dem Kurs haben sie Klarheit." },
              { title: "Auf Lebensdauer bedacht", text: "Praxen, die ihre Instrumente lange nutzen und durch regelmäßige Eigenverantwortung deren Lebensdauer maximieren." },
              { title: "Kostenbewusste Praxen", text: "Wer langfristig Schärfkosten senken will, investiert einmal in das Wissen und profitiert täglich davon." },
            ].map(({ title, text }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6">
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
    </>
  );
}
