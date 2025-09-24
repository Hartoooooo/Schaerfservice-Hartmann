import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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
    default: "Schärfservice Hartmann - Professionelle Instrumentenschärfung",
    template: "%s | Schärfservice Hartmann",
  },
  description: "Professionelle Schärfung von dentalen und chirurgischen Instrumenten mit über 20 Jahren Erfahrung. Schärfaufträge ab 6,04€, Kurse und Express-Service in Berlin. Hu-Friedy zertifiziert.",
  keywords: [
    "Schärfservice",
    "Instrumentenschärfung",
    "Dental Instrumente",
    "Chirurgische Instrumente", 
    "Scaler schärfen",
    "Kürretten schärfen",
    "Raspatorien schärfen",
    "Berlin",
    "Schöneiche",
    "Schärfkurse",
    "Hu-Friedy",
    "Björn Hartmann",
    "Carina Hartmann"
  ],
  authors: [{ name: "Björn Hartmann", url: "https://schaerfservice-hartmann.de" }],
  creator: "Schärfservice Hartmann",
  publisher: "Schärfservice Hartmann",
  metadataBase: new URL("https://www.dentalschleifen.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Schärfservice Hartmann - Professionelle Instrumentenschärfung",
    description: "Professionelle Schärfung von dentalen und chirurgischen Instrumenten mit über 20 Jahren Erfahrung. Schärfaufträge ab 6,04€, Kurse und Express-Service in Berlin. Hu-Friedy zertifiziert.",
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
    title: "Schärfservice Hartmann - Professionelle Instrumentenschärfung",
    description: "Professionelle Schärfung von dentalen und chirurgischen Instrumenten mit über 20 Jahren Erfahrung. Schärfaufträge ab 6,04€, Express-Service Berlin.",
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
    // Google Search Console - Fügen Sie hier Ihren Verification Code ein
    // google: "verification-code",
    // Bing Webmaster Tools (optional)
    // other: "bing-verification-code",
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
  
  return (
    <html lang="de" dir="ltr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Google Analytics */}
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        
        <Header />
        <main className="pt-20 pb-20 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
