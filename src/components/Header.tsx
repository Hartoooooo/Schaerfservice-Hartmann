"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation } from "./Navigation";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auf mobil (< md) und Startseite: transparent mit weißem Text wenn nicht gescrollt und Menü geschlossen
  const isTransparentMobile = isHomePage && !scrolled && !isMobileMenuOpen;

  return (
    <header 
      className={`fixed top-8 left-0 right-0 z-[60] transition-all duration-300 ${
        isTransparentMobile 
          ? 'md:backdrop-blur md:bg-white/90 md:border-b md:border-[var(--color-border)]' 
          : 'backdrop-blur bg-white/90 border-b border-[var(--color-border)]'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 relative z-[70] min-w-0">
          {/* natives img: öffentliche Datei, kein /_next/image; SHLogo.png muss in Git liegen (public/). */}
          <img
            src="/SHLogo.png"
            alt="Schärfservice Hartmann Logo"
            width={36}
            height={36}
            decoding="async"
            fetchPriority="high"
            className={`h-8 w-8 sm:h-9 sm:w-9 shrink-0 object-contain ${
              isTransparentMobile ? "drop-shadow-sm md:drop-shadow-none" : ""
            }`}
          />
          <span className={`text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
            isTransparentMobile ? 'text-white md:text-gray-900' : 'text-gray-900'
          }`}>
            Schärfservice Hartmann
          </span>
        </Link>
        <Navigation 
          isTransparentMobile={isTransparentMobile} 
          onMenuToggle={setIsMobileMenuOpen}
        />
      </div>
    </header>
  );
}


