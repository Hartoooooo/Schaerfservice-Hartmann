import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingActionButton } from "@/components/FloatingActionButton";

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
    default: "Schärfservice Hartmann - Dentalinstrumente schärfen & schleifen Berlin | Dentalinstrumente schärfen ab 6,04€",
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
        alt: "Schärfservice Hartmann Werkstatt in Berlin - Professionelle Instrumentenschärfung",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Google Analytics */}
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        
        {/* Microsoft Clarity */}
        {isProd && clarityId && <MicrosoftClarity projectId={clarityId} />}
        
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <FloatingActionButton />
      </body>
    </html>
  );
}
