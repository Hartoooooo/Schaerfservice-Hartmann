"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { analytics } from "@/components/GoogleAnalytics";

export function FloatingActionButton() {
  const pathname = usePathname();

  // Seiten, auf denen der Button NICHT angezeigt werden soll
  const excludedPages = [
    "/impressum",
    "/datenschutz",
    "/schaerfauftrag",
    "/schaerfkurse",
    "/express-schaerfen",
    "/kontakt",
    "/cookie-einstellungen",
    "/widerrufsbelehrung",
    "/agb"
  ];

  // Prüfen, ob die aktuelle Seite ausgeschlossen ist
  const shouldHide = excludedPages.some((page) => pathname === page);

  if (shouldHide) {
    return null;
  }

  return (
    <Link
      href="/schaerfauftrag"
      onClick={() => analytics.buttonClick('floating_action_button', pathname)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      aria-label="Jetzt schärfen - Schärfauftrag starten"
    >
      {/* Blitz-Icon */}
      <svg
        className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
      </svg>

      {/* Text */}
      <span className="font-semibold text-lg whitespace-nowrap">
        Jetzt schärfen
      </span>
    </Link>
  );
}

