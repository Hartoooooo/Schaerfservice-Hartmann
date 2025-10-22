"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Startseite", mobileLabel: "Startseite" },
  { href: "/schaerfauftrag", label: "Schärfauftrag", mobileLabel: "Schärfauftrag" },
  { href: "/schaerfkurse", label: "Schärfkurse", mobileLabel: "Schärfkurse" },
  { href: "/express-schaerfen", label: "Express", mobileLabel: "Express Schärfen" },
  { href: "/kontakt", label: "Kontakt", mobileLabel: "Kontakt" },
] as const;

// Footer-Seiten, die nicht im Header als aktiv angezeigt werden sollen
const footerPages = ["/impressum", "/datenschutz", "/agb", "/widerrufsbelehrung"];

interface NavigationProps {
  isTransparentMobile?: boolean;
  onMenuToggle?: (isOpen: boolean) => void;
}

export function Navigation({ isTransparentMobile = false, onMenuToggle }: NavigationProps) {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Schließe das mobile Menü bei Routenwechsel
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Verhindere Body-Scroll wenn mobiles Menü offen ist
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Benachrichtige Parent über Menüstatus
  useEffect(() => {
    if (onMenuToggle) {
      onMenuToggle(isMobileMenuOpen);
    }
  }, [isMobileMenuOpen, onMenuToggle]);

  useEffect(() => {
    if (!mounted) return;
    
    // Ignoriere Footer-Seiten - zeige keinen aktiven Indikator
    if (footerPages.includes(pathname)) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }
    
    const activeIndex = navItems.findIndex(item => item.href === pathname);
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      const activeItem = itemRefs.current[activeIndex];
      const nav = navRef.current;
      if (nav && activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        setIndicatorStyle({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
        });
      }
    }
  }, [pathname, mounted]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav ref={navRef} className="hidden md:flex relative items-center gap-1" suppressHydrationWarning>
        {/* Animierter Indikator */}
        {mounted && (
          <div
            className="absolute top-0 h-full bg-[var(--color-blue-600)] rounded-full transition-all duration-300 ease-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
        )}
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            ref={el => { itemRefs.current[index] = el; }}
            href={item.href}
            className={`relative px-3 py-2 rounded-full transition-colors duration-200 ${
              pathname === item.href && !footerPages.includes(pathname)
                ? "text-white" 
                : "hover:bg-[var(--color-blue-600)]/10"
            }`}
            suppressHydrationWarning
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden p-2 relative z-[60]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Menü öffnen"
        suppressHydrationWarning
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span suppressHydrationWarning className={`block h-0.5 w-full transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-gray-900' : isTransparentMobile ? 'bg-white' : 'bg-gray-900'
          }`}></span>
          <span suppressHydrationWarning className={`block h-0.5 w-full transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'opacity-0' : ''
          } ${isTransparentMobile && !isMobileMenuOpen ? 'bg-white' : 'bg-gray-900'}`}></span>
          <span suppressHydrationWarning className={`block h-0.5 w-full transition-all duration-300 ease-out ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-gray-900' : isTransparentMobile ? 'bg-white' : 'bg-gray-900'
          }`}></span>
        </div>
      </button>

      {/* Mobile Menu Fullscreen - neue einfache Animation */}
      {mounted && (
        <div 
          className={`md:hidden fixed top-0 left-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff'
          }}
        >
          <div className="pt-20 px-6 h-full w-full flex flex-col">
            <nav className={`flex flex-col space-y-2 flex-1 transition-all duration-500 ease-out ${
              isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-4 rounded-xl text-xl font-medium transition-all duration-200 ${
                    pathname === item.href && !footerPages.includes(pathname)
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-gray-900 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  {item.mobileLabel}
                </Link>
              ))}
            </nav>
            
            {/* Copyright Text */}
            <div 
              className={`text-center py-8 text-gray-500 text-sm transition-all duration-500 ease-out ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
            >
              © 2025 Schärfservice Hartmann
            </div>
          </div>
        </div>
      )}
    </>
  );
}
