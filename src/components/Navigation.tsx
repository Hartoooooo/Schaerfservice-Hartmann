"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Startseite", mobileLabel: "Startseite" },
  { href: "/schaerfauftrag", label: "Schärfauftrag", mobileLabel: "Schärfauftrag" },
  { href: "/schaerfkurs", label: "Schärfkurs", mobileLabel: "Schärfkurs" },
  { href: "/express-schaerfen", label: "Express", mobileLabel: "Express Schärfen" },
  { href: "/kontakt", label: "Kontakt", mobileLabel: "Kontakt" },
] as const;

const leistungenLinks = [
  { href: "/scaler-schaerfen", label: "Scaler schärfen" },
  { href: "/kueretten-schaerfen", label: "Küretten schärfen" },
  { href: "/chirurgische-instrumente-schaerfen", label: "Chirurgische Instrumente" },
] as const;

const leistungenPaths: Set<string> = new Set(leistungenLinks.map((l) => l.href));

// Footer-Seiten, die nicht im Header als aktiv angezeigt werden sollen
const footerPages = ["/impressum", "/datenschutz", "/agb", "/widerrufsbelehrung"];

/** Index des Leistungen-Eintrags in der Desktop-Leiste (0-basiert) */
const LEISTUNGEN_INDEX = 1;

function FlagIcon({ country, className = "h-5 w-5" }: { country: "de" | "gb"; className?: string }) {
  if (country === "de") {
    return (
      <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
        <path fill="#cc2b1d" d="M1 11H31V21H1z" />
        <path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" />
        <path d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24)" fill="#f8d147" />
        <path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15" />
        <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65" />
      <path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff" />
      <path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932" />
      <path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932" />
      <path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff" />
      <rect x="13" y="4" width="6" height="24" fill="#fff" />
      <rect x="1" y="13" width="30" height="6" fill="#fff" />
      <rect x="14" y="4" width="4" height="24" fill="#b92932" />
      <rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932" />
      <path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932" />
      <path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932" />
      <path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15" />
      <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2" />
    </svg>
  );
}

function getActiveDesktopItemIndex(pathname: string): number {
  if (leistungenPaths.has(pathname)) return LEISTUNGEN_INDEX;
  if (footerPages.includes(pathname)) return -1;
  const i = navItems.findIndex((item) => item.href === pathname);
  if (i < 0) return -1;
  if (i === 0) return 0;
  // Schärfauftrag steht nach „Leistungen“ (Index 2); ab Schärfkurse: +1 wegen Dropdown-Leist
  if (i === 1) return 2;
  return i + 1;
}

interface NavigationProps {
  isTransparentMobile?: boolean;
  onMenuToggle?: (isOpen: boolean) => void;
}

export function Navigation({ isTransparentMobile = false, onMenuToggle }: NavigationProps) {
  const rawPathname = usePathname();
  const isEnglish = rawPathname === "/en" || rawPathname.startsWith("/en/");
  const pathname = isEnglish ? rawPathname.replace(/^\/en(?=\/|$)/, "") || "/" : rawPathname;
  const localize = (href: string) => isEnglish ? (href === "/" ? "/en" : `/en${href}`) : href;
  const englishHref = pathname === "/" ? "/en" : `/en${pathname}`;
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileLeistungenOpen, setMobileLeistungenOpen] = useState(false);
  /** Nur Hover (ohne CSS focus-within), damit das Menü nach Klick auf einen Link wieder zuverlässig schließt */
  const [desktopLeistungenOpen, setDesktopLeistungenOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileLeistungenOpen(false);
    setDesktopLeistungenOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    onMenuToggle?.(isMobileMenuOpen);
  }, [isMobileMenuOpen, onMenuToggle]);

  const isLeistungenActive = leistungenPaths.has(pathname);

  useEffect(() => {
    if (!mounted) return;

    if (footerPages.includes(pathname)) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const activeIndex = getActiveDesktopItemIndex(pathname);
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
    } else {
      setIndicatorStyle({ left: 0, width: 0 });
    }
  }, [pathname, mounted]);

  const linkClass = (isActive: boolean) =>
    `relative px-3 py-2 rounded-full transition-colors duration-200 ${
      isActive && !footerPages.includes(pathname)
        ? "text-white"
        : "hover:bg-[var(--color-blue-600)]/10"
    }`;

  return (
    <>
      {/* Desktop Navigation */}
      <nav ref={navRef} className="hidden md:flex relative items-center gap-1" suppressHydrationWarning>
        {mounted && (
          <div
            className="absolute top-0 h-full bg-[var(--color-blue-600)] rounded-full transition-all duration-300 ease-out pointer-events-none z-0"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
        )}

        <Link
          ref={(el) => {
            itemRefs.current[0] = el;
          }}
          href={localize(navItems[0].href)}
          className={`${linkClass(pathname === navItems[0].href)} z-[1]`}
          suppressHydrationWarning
        >
          {navItems[0].label}
        </Link>

        <div
          ref={(el) => {
            itemRefs.current[LEISTUNGEN_INDEX] = el;
          }}
          className={`relative z-[1] ${isLeistungenActive && !footerPages.includes(pathname) ? "text-white" : ""}`}
          onMouseEnter={() => setDesktopLeistungenOpen(true)}
          onMouseLeave={() => setDesktopLeistungenOpen(false)}
        >
          <button
            type="button"
            className={`relative px-1 sm:px-3 py-2 rounded-full transition-colors duration-200 inline-flex items-center gap-0.5 text-left ${isLeistungenActive && !footerPages.includes(pathname) ? "text-white" : "hover:bg-[var(--color-blue-600)]/10"}`}
            aria-expanded={desktopLeistungenOpen}
            aria-haspopup="true"
            aria-controls="desktop-leistungen-menu"
          >
            <span className="px-2 sm:px-0">Leistungen</span>
            <svg className="w-3.5 h-3.5 opacity-70 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            id="desktop-leistungen-menu"
            aria-hidden={!desktopLeistungenOpen}
            className={`absolute left-0 top-full pt-1 z-[100] transition-[opacity,visibility] duration-200 ${
              desktopLeistungenOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
            }`}
          >
            <div className="rounded-xl border border-gray-200 bg-white min-w-[17rem] shadow-[var(--shadow-strong)] py-2">
              {leistungenLinks.map((item) => (
                <Link
                  key={item.href}
                  href={localize(item.href)}
                  className={`block px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 transition-colors ${
                    pathname === item.href ? "bg-blue-50 text-blue-700 font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link
          ref={(el) => {
            itemRefs.current[2] = el;
          }}
          href={localize(navItems[1].href)}
          className={`${linkClass(pathname === navItems[1].href)} z-[1]`}
          suppressHydrationWarning
        >
          {navItems[1].label}
        </Link>

        {navItems.slice(2).map((item, sliceIndex) => {
          const globalIndex = sliceIndex + 3;
          return (
            <Link
              key={item.href}
              ref={(el) => {
                itemRefs.current[globalIndex] = el;
              }}
              href={localize(item.href)}
              className={`${linkClass(pathname === item.href)} z-[1]`}
              suppressHydrationWarning
            >
              {item.label}
            </Link>
          );
        })}

        <details className="group relative z-[2] ml-1">
          <summary
            className="flex cursor-pointer list-none items-center gap-1 rounded-full px-2 py-2 hover:bg-[var(--color-blue-600)]/10 [&::-webkit-details-marker]:hidden"
            aria-label="Sprache wählen"
          >
            <FlagIcon country={isEnglish ? "gb" : "de"} />
            <svg className="h-3 w-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="absolute right-0 top-full mt-1 min-w-36 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 text-sm text-gray-900 shadow-[var(--shadow-strong)]">
            <a href={pathname} data-no-localize onClick={() => { document.cookie = "site-language=de; path=/; SameSite=Lax"; }} hrefLang="de" className={`flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 ${!isEnglish ? "font-semibold text-blue-700" : ""}`}>
              <FlagIcon country="de" /> Deutsch
            </a>
            <a href={englishHref} hrefLang="en" className={`flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 ${isEnglish ? "font-semibold text-blue-700" : ""}`}>
              <FlagIcon country="gb" /> English
            </a>
          </div>
        </details>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden p-2 relative z-[60]"
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Menü öffnen"
        suppressHydrationWarning
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            suppressHydrationWarning
            className={`block h-0.5 w-full transition-all duration-300 ease-out ${
              isMobileMenuOpen ? "rotate-45 translate-y-2 bg-gray-900" : isTransparentMobile ? "bg-white" : "bg-gray-900"
            }`}
          ></span>
          <span
            suppressHydrationWarning
            className={`block h-0.5 w-full transition-all duration-300 ease-out ${
              isMobileMenuOpen ? "opacity-0" : ""
            } ${isTransparentMobile && !isMobileMenuOpen ? "bg-white" : "bg-gray-900"}`}
          ></span>
          <span
            suppressHydrationWarning
            className={`block h-0.5 w-full transition-all duration-300 ease-out ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-gray-900" : isTransparentMobile ? "bg-white" : "bg-gray-900"
            }`}
          ></span>
        </div>
      </button>

      {mounted && (
        <div
          className={`md:hidden fixed top-0 left-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="pt-20 px-6 h-full w-full flex flex-col overflow-y-auto">
            <nav
              className={`flex flex-col space-y-2 flex-1 pb-8 transition-all duration-500 ease-out ${
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              <Link
                href={localize(navItems[0].href)}
                className={`block px-4 py-4 rounded-xl text-xl font-medium transition-all duration-200 ${
                  pathname === navItems[0].href && !footerPages.includes(pathname)
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-900 hover:bg-gray-100 active:bg-gray-200"
                }`}
              >
                {navItems[0].mobileLabel}
              </Link>
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileLeistungenOpen((o) => !o)}
                  className={`flex w-full items-center justify-between px-4 py-4 text-xl font-medium text-left transition-colors ${
                    isLeistungenActive ? "bg-blue-600 text-white" : "text-gray-900 hover:bg-gray-100"
                  }`}
                  aria-expanded={mobileLeistungenOpen}
                >
                  Leistungen
                  <svg
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${mobileLeistungenOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileLeistungenOpen && (
                  <div className="border-t border-gray-100 bg-gray-50 py-2">
                    {leistungenLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={localize(item.href)}
                        className={`block px-6 py-3 text-base font-medium ${
                          pathname === item.href ? "text-blue-600 bg-white" : "text-gray-700 hover:bg-white/80"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={localize(navItems[1].href)}
                className={`block px-4 py-4 rounded-xl text-xl font-medium transition-all duration-200 ${
                  pathname === navItems[1].href && !footerPages.includes(pathname)
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-900 hover:bg-gray-100 active:bg-gray-200"
                }`}
              >
                {navItems[1].mobileLabel}
              </Link>

              {navItems.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={localize(item.href)}
                  className={`block px-4 py-4 rounded-xl text-xl font-medium transition-all duration-200 ${
                    pathname === item.href && !footerPages.includes(pathname)
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-900 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  {item.mobileLabel}
                </Link>
              ))}

              <details className="mt-2 rounded-xl border border-gray-200">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-xl font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3"><FlagIcon country={isEnglish ? "gb" : "de"} className="h-6 w-6" /> Sprache</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-gray-100 bg-gray-50 py-2">
                  <a href={pathname} data-no-localize onClick={() => { document.cookie = "site-language=de; path=/; SameSite=Lax"; }} hrefLang="de" className="flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-700">
                    <FlagIcon country="de" className="h-6 w-6" /> Deutsch
                  </a>
                  <a href={englishHref} hrefLang="en" className="flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-700">
                    <FlagIcon country="gb" className="h-6 w-6" /> English
                  </a>
                </div>
              </details>
            </nav>

            <div
              className={`text-center py-8 text-gray-500 text-sm transition-all duration-500 ease-out ${
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              © {new Date().getFullYear()} Schärfservice Hartmann
            </div>
          </div>
        </div>
      )}
    </>
  );
}
