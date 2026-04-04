import type { Metadata } from "next";
import SchaerfauftragForm from "@/components/SchaerfauftragForm";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Dentalinstrumente schärfen lassen, Online Auftrag starten | Schärfservice Hartmann",
  description: "Zahnarztinstrumente einfach einschicken und schärfen lassen: Online-Auftrag in 3 Minuten, ca. 5 Werktage Bearbeitungszeit, ab 6,04 € pro Instrument. Jetzt starten.",
  keywords: [
    "zahnarztinstrumente einschicken schärfen lassen",
    "instrumente schärfen lassen",
    "dental schärfen auftrag",
    "instrumente schleifen lassen",
    "online schärfauftrag",
    "scaler schärfen lassen",
    "küretten schärfen lassen",
    "raspatorien schärfen",
    "instrumente schärfen berlin auftrag",
  ],
  alternates: {
    canonical: "/schaerfauftrag",
  },
  openGraph: {
    title: "Dentalinstrumente schärfen lassen, Online Auftrag starten | Schärfservice Hartmann",
    description: "Zahnarztinstrumente einfach einschicken und schärfen lassen: Online-Auftrag in 3 Minuten, ca. 5 Werktage Bearbeitungszeit, ab 6,04 € pro Instrument. Jetzt starten.",
  },
};

const instrumentRows = [
  { name: "Scaler & Küretten ( Universal, Gracey )", price: "€7,11", price7: "€6,61", price15: "€6,04", price75: "€5,69" },
  { name: "Exkavatoren", price: "€7,11", price7: "€6,61", price15: "€6,04", price75: "€5,69" },
  { name: "Knochenküretten & scharfe Löffel", price: "€7,11", price7: "€6,61", price15: "€6,04", price75: "€5,69" },
  { name: "Meißel & Gingivalrandschräger", price: "€7,11", price7: "€6,61", price15: "€6,04", price75: "€5,69" },
  { name: "Messer & Schnitzinstrumente", price: "€7,11", price7: "€6,61", price15: "€6,04", price75: "€5,69" },
  { name: "Microscheren", price: "€26,25", price7: "€24,41", price15: "€22,31", price75: "€21,00" },
  { name: "Periotome & Tunnelierungsinstr.", price: "€7,11", price7: "€6,61", price15: "€6,04", price75: "€5,69" },
  { name: "Raspatorien", price: "€13,01", price7: "€12,10", price15: "€11,06", price75: "€10,41" },
  { name: "Scheren", price: "€17,10", price7: "€15,90", price15: "€14,54", price75: "€13,68" },
  { name: "Wurzelheber & Luxatoren", price: "€7,11", price7: "€6,61", price15: "€6,04", price75: "€5,69" },
];

export default function SchaerfauftragPage() {
  return (
    <>
      {/* Breadcrumb Schema für SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.dentalschleifen.de" },
              { "@type": "ListItem", "position": 2, "name": "Schärfauftrag", "item": "https://www.dentalschleifen.de/schaerfauftrag" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Schärfservice für Dentalinstrumente",
            "description": "Professionelle Schärfung von dentalen und chirurgischen Instrumenten",
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
              "telephone": "+49-174-9342576",
              "email": "hartmann-schaerfservice@web.de"
            },
            "serviceType": "Instrumentenschärfung",
            "areaServed": { "@type": "Country", "name": "Deutschland" },
            "offers": instrumentRows.map(row => ({
              "@type": "Offer",
              "name": row.name,
              "price": row.price.replace('€', ''),
              "priceCurrency": "EUR"
            }))
          })
        }}
      />

      {/* Page Header */}
      <div>
        <Container>
          <div className="max-w-3xl mx-auto pt-20 pb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
              Instrumente einschicken &amp; schärfen lassen
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Online-Auftrag in 3&nbsp;Minuten &middot; ca. 5&nbsp;Werktage Bearbeitungszeit &middot; ab&nbsp;6,04&nbsp;€ pro Instrument
            </p>
          </div>
        </Container>
      </div>

      {/* Formular */}
      <SchaerfauftragForm rows={instrumentRows} />

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Häufige Fragen zum Schärfauftrag
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Alles, was Sie vor dem Einschicken wissen sollten
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {[
              {
                q: "Wie lange dauert die Bearbeitung?",
                a: "In der Regel ca. 5 Werktage nach Eingang Ihrer Sendung. Bei Urlaubszeiten oder besonders hohem Aufkommen kommunizieren wir das transparent auf der Seite."
              },
              {
                q: "Muss ich einen Mindestauftrag einschicken?",
                a: "Nein. Es gibt keine Mindestanzahl. Ab 15 Instrumenten greift jedoch der 7-%-Mengenrabatt, gebündeltes Einschicken lohnt sich also."
              },
              {
                q: "Was wird geschärft und was nicht?",
                a: "Scaler, Küretten, Raspatorien, Scheren, Nadelhalter, Pinzetten und mehr, herstellerunabhängig. Nicht aufarbeitbar: Instrumente mit Rissen, gebrochenem Schaft oder irreparablem Schaden. Wir informieren Sie immer vorab."
              },
              {
                q: "Wie versichere ich meine Instrumente für den Versand?",
                a: "Wir empfehlen eine Versicherung entsprechend dem Instrumentenwert. Sobald die Sendung bei uns eingeht, sind Ihre Instrumente in unserer Obhut."
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
