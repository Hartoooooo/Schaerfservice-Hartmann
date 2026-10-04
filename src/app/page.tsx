import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: {
    absolute: "Dentalinstrumente schärfen lassen – ab 30 Instrumenten ab 6 € | Schärfservice Hartmann",
  },
  description: "Dentalinstrumente schärfen lassen: professioneller Schleifservice, deutschlandweiter Einsendeservice. Ab 30 Instrumenten ab 6 € pro Instrument.",
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
    title: "Dentalinstrumente schärfen lassen – ab 30 Instrumenten ab 6 € | Schärfservice Hartmann",
    description: "Dentalinstrumente schärfen lassen: professioneller Schleifservice, deutschlandweiter Einsendeservice. Ab 30 Instrumenten ab 6 € pro Instrument.",
    url: "https://www.dentalschleifen.de",
  },
};

export default function Home() {
  return <HomeContent />;
}
