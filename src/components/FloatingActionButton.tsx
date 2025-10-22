"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { analytics } from "@/components/GoogleAnalytics";
import { useState, useEffect } from "react";

export function FloatingActionButton() {
  const pathname = usePathname();
  const [isInFooterArea, setIsInFooterArea] = useState(false);

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

  // Prüfen, ob der Benutzer im Footer-Bereich ist (auf allen Geräten)
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Prüfe, ob der Footer im Viewport sichtbar ist
        setIsInFooterArea(footerRect.top < viewportHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prüfen, ob die aktuelle Seite ausgeschlossen ist
  const shouldHide = excludedPages.some((page) => pathname === page);

  if (shouldHide) {
    return null;
  }

  return (
    <Link
      href="/schaerfauftrag"
      onClick={() => analytics.buttonClick('floating_action_button', pathname)}
      className={`fixed bottom-6 right-6 z-50 ${isInFooterArea ? 'hidden' : 'flex'} items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
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

