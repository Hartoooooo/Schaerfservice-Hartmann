import type { Metadata } from "next";
import SchaerfkurseForm from "@/components/SchaerfkurseForm";

// SEO-Metadaten für Server-Side Rendering
export const metadata: Metadata = {
  title: "Schärfkurse - Instrumente schärfen lernen Berlin",
  description: "🎓 Schärfkurse Berlin: Instrumente schärfen & schleifen lernen ✅ Dental schärfen Schulung für Praxispersonal | Instrumente aufbereiten Kurs | 2h vor Ort ab 215€ | Hu-Friedy zertifiziert",
  keywords: [
    "Schärfkurse",
    "instrumente schärfen lernen",
    "dental schärfen schulung",
    "instrumente schleifen kurs",
    "dental schleifen lernen",
    "instrumente aufbereiten schulung",
    "schärfkurse berlin",
    "instrumentenschärfung lernen",
    "dental fortbildung berlin",
    "schärftechnik schulung"
  ],
  openGraph: {
    title: "Schärfkurse | Schärfservice Hartmann",
    description: "Professionelle Schärfkurse für Zahnärzte und Praxispersonal. 2-stündige Kurse vor Ort ab 215€. Hu-Friedy zertifizierte Schulung in Berlin.",
  },
};

// Server-Component für bessere SEO und Performance
export default function SchaerfkursePage() {
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
                "name": "Schärfkurse",
                "item": "https://www.dentalschleifen.de/schaerfkurse"
              }
            ]
          })
        }}
      />
      
      {/* Course Schema für SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Schärfkurse - Schärfservice Hartmann",
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
              "telephone": "+49-174-93-42-576",
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
                "price": "215",
                "priceCurrency": "EUR",
                "description": "Grundpreis für bis zu 2 Teilnehmer, jeder weitere Teilnehmer +45€"
              }
            }
          })
        }}
      />
      
      {/* Client-Component für Interaktivität */}
      <SchaerfkurseForm />
    </>
  );
}