import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { HeroImagePreload } from "@/components/HeroImagePreload";
import Image from "next/image";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Schärfservice Hartmann: Dentalinstrumente schärfen & schleifen Berlin | Dentalinstrumente schärfen ab 6,04€",
    template: "%s | Schärfservice Hartmann",
  },
  description: "🦷 Instrumente schärfen & schleifen ✅ Dentalinstrumente schärfen & aufbereiten ab 6,04€ ⭐ Professioneller Service für alle dentalen Instrumente | Express-Schärfung 150km | Schärfkurse in ihrer Praxis | 20+ Jahre Erfahrung",
  keywords: [
    "instrumente schärfen",
    "instrumente schleifen", 
    "dental schleifen",
    "dental schärfen",
    "Instrumente aufbereiten",
    "Instrumente Schärfen Berlin",
    "instrumente schärfen berlin",
    "instrumente schleifen berlin",
    "dental schleifen berlin",
    "dental schärfen berlin",
    "instrumente aufbereiten berlin",
    "dentalinstrumente schärfen",
    "dentalinstrumente schleifen",
    "medizinische instrumente schärfen",
    "chirurgische instrumente schärfen",
    "scaler schärfen",
    "küretten schärfen", 
    "raspatorien schärfen",
    "instrumentenschärfung",
    "instrumentenschleifung"
  ],
  authors: [{ name: "Björn Hartmann", url: "https://schaerfservice-hartmann.de" }],
  creator: "Schärfservice Hartmann",
  publisher: "Schärfservice Hartmann",
  metadataBase: new URL("https://www.dentalschleifen.de"),
  alternates: {
    canonical: "/",
    languages: {
      'de-DE': '/',
      'de': '/',
    },
  },
  openGraph: {
    title: "Schärfservice Hartmann",
    description: "Professionelle Schärfung von dentalen und chirurgischen Instrumenten mit über 20 Jahren Erfahrung. Schärfaufträge ab 6,04€, Schärfkurse in ihrer Praxis und Express-Service in Berlin.",
    url: "https://www.dentalschleifen.de",
    siteName: "Schärfservice Hartmann",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://www.dentalschleifen.de/schaerfservice-werkstatt-berlin.jpg",
        width: 1200,
        height: 630,
        alt: "Schärfservice Hartmann Werkstatt in Berlin, professionelle Instrumentenschärfung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schärfservice Hartmann",
    description: "Professionelle Schärfung von dentalen und chirurgischen Instrumenten mit über 20 Jahren Erfahrung. Schärfaufträge ab 6,04€, Schärfkurse in ihrer Praxis, Express-Service Berlin.",
    images: ["https://www.dentalschleifen.de/schaerfservice-werkstatt-berlin.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification=schaerfservice-hartmann-verification",
    other: {
      "msvalidate.01": "bing-verification-code",
    },
  },
  category: "Medical Services",
  classification: "Dental Instrument Sharpening Service",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "geo.region": "DE-BB",
    "geo.placename": "Schöneiche bei Berlin",
    "geo.position": "52.4667;13.7833",
    "ICBM": "52.4667, 13.7833",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "twv4i5n7yv";
  const isProd = process.env.NODE_ENV === "production";
  
  return (
    <html lang="de" dir="ltr">
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17687247253"
        strategy="afterInteractive"
      />
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17687247253');
        `}
      </Script>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Organization Schema für Google Brand Name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.dentalschleifen.de/#organization",
              "name": "Schärfservice Hartmann",
              "alternateName": "Schärfservice Hartmann",
              "legalName": "Schärfservice Hartmann",
              "url": "https://www.dentalschleifen.de",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.dentalschleifen.de/SHLogo.png",
                "width": 5489,
                "height": 5489
              },
              "image": "https://www.dentalschleifen.de/SHLogo.png",
              "description": "Professionelle Schärfung von dentalen und chirurgischen Instrumenten mit über 20 Jahren Erfahrung",
              "foundingDate": "2004",
              "founder": {
                "@type": "Person",
                "name": "Björn Hartmann"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Petershagener Str. 27",
                "addressLocality": "Schöneiche bei Berlin",
                "postalCode": "15566",
                "addressCountry": "DE"
              },
              "telephone": "+49-174-9342576",
              "email": "hartmann-schaerfservice@web.de",
              "sameAs": [
                "https://www.dentalschleifen.de"
              ]
            })
          }}
        />
        
        {/* Preload Hero-Bild für schnelles Laden beim ersten Besuch */}
        <HeroImagePreload />
        
        {/* Verstecktes Image-Element zum Vorladen des Hero-Bildes - bleibt im Browser-Cache */}
        <div className="fixed -z-50 opacity-0 pointer-events-none">
          <Image
            src="/schaerfservice-werkstatt-berlin.jpg"
            alt=""
            width={1920}
            height={1080}
            priority
            quality={90}
            fetchPriority="high"
          />
        </div>
        
        {/* Google Analytics */}
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        
        {/* Microsoft Clarity */}
        {isProd && clarityId && <MicrosoftClarity projectId={clarityId} />}
        
        {/* Announcement Bar */}
        <div className="fixed top-0 left-0 right-0 z-[70] bg-blue-600 text-white text-sm">
          <div className="container-page h-8 flex items-center justify-center">
            <span className="font-medium">
              <span className="hidden md:inline">ab 15 Instr. sparen Sie 7%</span>
              <span className="md:hidden">ab 15 Instr. sparen Sie 7%</span>
            </span>
          </div>
        </div>

        <Header />
        <main className="flex-1 pt-8">{children}</main>
        <Footer />
        <CookieBanner />
        <FloatingActionButton />
      </body>
    </html>
  );
}
