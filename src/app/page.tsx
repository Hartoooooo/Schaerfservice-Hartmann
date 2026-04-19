import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Dentalinstrumente schärfen lassen, ab 5,69 € | Schärfservice Hartmann Berlin",
  description: "Zahnärztliche Instrumente schärfen lassen: schnell, präzise und günstig ab 5,69 €. Einsende-Service deutschlandweit, Express-Schärfung in Berlin. Jetzt Auftrag starten.",
  keywords: [
    "dentalinstrumente schärfen lassen",
    "instrumente schärfen",
    "instrumente schleifen",
    "dental schleifen",
    "dental schärfen",
    "instrumente aufbereiten",
    "instrumente schärfen berlin",
    "scaler schärfen",
    "küretten schärfen",
    "raspatorien schärfen",
    "instrumentenschärfung",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dentalinstrumente schärfen lassen, ab 5,69 € | Schärfservice Hartmann Berlin",
    description: "Zahnärztliche Instrumente schärfen lassen: schnell, präzise und günstig ab 5,69 €. Einsende-Service deutschlandweit, Express-Schärfung in Berlin. Jetzt Auftrag starten.",
    url: "https://www.dentalschleifen.de",
  },
};

export default function Home() {
  return <HomeContent />;
}
