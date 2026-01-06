import type { Metadata } from "next";
import KontaktForm from "@/components/KontaktForm";
import { Suspense } from "react";

// SEO-Metadaten für Server-Side Rendering
export const metadata: Metadata = {
  title: "Kontakt - Instrumente schärfen Berlin",
  description: "📞 Kontakt Instrumente schärfen Berlin ✅ Dental schärfen & schleifen Service | Björn Hartmann 030-92376694 | hartmann-schaerfservice@web.de | Schöneiche bei Berlin",
  keywords: [
    "kontakt instrumente schärfen",
    "dental schärfen kontakt",
    "instrumente schleifen berlin kontakt",
    "schärfservice kontakt berlin",
    "Björn Hartmann",
    "Carina Hartmann", 
    "Schöneiche Berlin",
    "instrumente aufbereiten kontakt"
  ],
  openGraph: {
    title: "Kontakt | Schärfservice Hartmann",
    description: "Kontaktieren Sie Schärfservice Hartmann. Inhaber Björn Hartmann, Ansprechpartnerin Carina Hartmann. Telefon 030-92376694 in Schöneiche bei Berlin.",
  },
};

// Server-Component für bessere SEO und Performance
export default function KontaktPage() {
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
                "name": "Kontakt",
                "item": "https://www.dentalschleifen.de/kontakt"
              }
            ]
          })
        }}
      />
      
      {/* LocalBusiness Schema für SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Schärfservice Hartmann",
            "description": "Professioneller Schärfservice für dentale und chirurgische Instrumente",
            "owner": {
              "@type": "Person",
              "name": "Björn Hartmann"
            },
            "employee": {
              "@type": "Person",
              "name": "Carina Hartmann",
              "jobTitle": "Ansprechpartnerin"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Petershagener Str. 27",
              "addressLocality": "Schöneiche bei Berlin",
              "postalCode": "15566",
              "addressCountry": "DE"
            },
            "telephone": "+49-30-92376694",
            "email": "hartmann-schaerfservice@web.de",
            "taxID": "061/228/02750",
            "serviceArea": {
              "@type": "Country",
              "name": "Deutschland"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Schärfservice Angebote",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Instrumentenschärfung",
                    "description": "Professionelle Schärfung von dentalen und chirurgischen Instrumenten"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Schärfkurse",
                    "description": "Schulungen zur professionellen Instrumentenschärfung"
                  }
                }
              ]
            }
          })
        }}
      />
      
      {/* Client-Component für Interaktivität */}
      <Suspense fallback={null}>
        <KontaktForm />
      </Suspense>
    </>
  );
}