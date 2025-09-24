import type { Metadata } from "next";
import SchaerfauftragForm from "@/components/SchaerfauftragForm";

// SEO-Metadaten für Server-Side Rendering
export const metadata: Metadata = {
  title: "Schärfauftrag starten",
  description: "Starten Sie jetzt Ihren Schärfauftrag für dentale und chirurgische Instrumente. Scaler ab 6,04€, Raspatorien ab 11,06€. Express-Service verfügbar. Einfacher Online-Prozess mit 3-5 Tagen Bearbeitungszeit.",
  keywords: [
    "Schärfauftrag",
    "Online Auftrag",
    "Instrumente schärfen lassen",
    "Dental Schärfservice",
    "Scaler Kürretten",
    "Raspatorien",
    "Preise Schärfung"
  ],
  openGraph: {
    title: "Schärfauftrag starten | Schärfservice Hartmann",
    description: "Starten Sie jetzt Ihren Schärfauftrag für dentale und chirurgische Instrumente. Scaler ab 6,04€, Raspatorien ab 11,06€. Express-Service verfügbar.",
  },
};

// Instrumenten-Daten (Server-Side verfügbar für SEO)
const instrumentRows = [
  { name: "Scaler & Küretten ( Universal, Gracey )", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Exkavatoren", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Knochenküretten & scharfe Löffel", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Meißel & Gingivalrandschräger", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Messer & Schnitzinstrumente", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Microscheren", price: "€26,25", price7: "€24,41", price15: "€22,31" },
  { name: "Periotome & Tunnelierungsinstr.", price: "€7,11", price7: "€6,61", price15: "€6,04" },
  { name: "Raspatorien", price: "€13,01", price7: "€12,10", price15: "€11,06" },
  { name: "Scheren", price: "€17,10", price7: "€15,90", price15: "€14,54" },
  { name: "Wurzelheber & Luxatoren", price: "€7,11", price7: "€6,61", price15: "€6,04" },
];

// Server-Component für bessere SEO und Performance
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
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Startseite",
                "item": "https://www.dentalschleifen.de"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Schärfauftrag",
                "item": "https://www.dentalschleifen.de/schaerfauftrag"
              }
            ]
          })
        }}
      />
      
      {/* Service Schema für SEO */}
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
              "telephone": "+49-174-93-42-576",
              "email": "hartmann-schaerfservice@web.de"
            },
            "serviceType": "Instrumentenschärfung",
            "areaServed": {
              "@type": "Country",
              "name": "Deutschland"
            },
            "offers": instrumentRows.map(row => ({
              "@type": "Offer",
              "name": row.name,
              "price": row.price.replace('€', ''),
              "priceCurrency": "EUR"
            }))
          })
        }}
      />
      
      {/* Client-Component für Interaktivität */}
      <SchaerfauftragForm rows={instrumentRows} />
    </>
  );
}