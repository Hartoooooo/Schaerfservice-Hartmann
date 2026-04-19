import type { Metadata } from "next";
import ExpressSchaerfenContent from "./ExpressSchaerfenContent";

export const metadata: Metadata = {
  title: "Express-Schärfservice Berlin, Vor-Ort & 24h | Schärfservice Hartmann",
  description: "Dentalinstrumente dringend schärfen lassen? Unser Express-Service kommt direkt in Ihre Berliner Praxis oder holt Instrumente ab, 24h, ab 75 Stück, ohne Versandrisiko.",
  keywords: [
    "express schärfservice berlin",
    "express zahnarzt schärfen",
    "instrumente schärfen vor ort berlin",
    "mobiler schärfservice berlin",
    "24h schärfservice berlin",
    "express dental schärfen berlin",
    "instrumente schärfen vor ort",
  ],
  alternates: {
    canonical: "/express-schaerfen",
  },
  openGraph: {
    title: "Express-Schärfservice Berlin, Vor-Ort & 24h | Schärfservice Hartmann",
    description: "Dentalinstrumente dringend schärfen lassen? Unser Express-Service kommt direkt in Ihre Berliner Praxis oder holt Instrumente ab, 24h, ab 75 Stück, ohne Versandrisiko.",
  },
};

export default function ExpressSchaerfenPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Express-Schärfen", "item": "https://www.dentalschleifen.de/express-schaerfen" }
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
            "name": "Express-Schärfservice Berlin",
            "description": "Express-Schärfung von Dentalinstrumenten in Berlin, Vor-Ort-Service und 24h-Abhol-/Bringservice im Umkreis von 75 km",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Schärfservice Hartmann",
              "telephone": "+49 174 9342576"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "52.5200", "longitude": "13.4050" },
              "geoRadius": "75000"
            }
          })
        }}
      />

      <ExpressSchaerfenContent />
    </>
  );
}
