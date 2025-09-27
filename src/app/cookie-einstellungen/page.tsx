import type { Metadata } from "next";
import { CookieManager } from "@/components/CookieManager";

export const metadata: Metadata = {
  title: "Cookies - Instrumente schärfen Berlin",
  description: "Cookie-Einstellungen Schärfservice Hartmann - Instrumente schärfen & Dental schleifen Berlin. Verwalten Sie Ihre Cookie-Präferenzen für unsere Website.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CookieEinstellungenPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl mx-auto">
        <div className="surface p-8">
          <CookieManager />
        </div>
      </div>
    </div>
  );
}
