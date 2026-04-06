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
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileLeistungenOpen, setMobileLeistungenOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileLeistungenOpen(false);
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
          href={navItems[0].href}
          className={`${linkClass(pathname === navItems[0].href)} z-[1]`}
          suppressHydrationWarning
        >
          {navItems[0].label}
        </Link>

        <div
          ref={(el) => {
            itemRefs.current[LEISTUNGEN_INDEX] = el;
          }}
          className={`relative group/leist z-[1] ${isLeistungenActive && !footerPages.includes(pathname) ? "text-white" : ""}`}
        >
          <button
            type="button"
            className={`relative px-1 sm:px-3 py-2 rounded-full transition-colors duration-200 inline-flex items-center gap-0.5 text-left ${isLeistungenActive && !footerPages.includes(pathname) ? "text-white" : "hover:bg-[var(--color-blue-600)]/10"}`}
            aria-expanded={false}
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
            className="absolute left-0 top-full pt-1 z-[100] opacity-0 invisible group-hover/leist:opacity-100 group-hover/leist:visible group-focus-within/leist:opacity-100 group-focus-within/leist:visible transition-[opacity,visibility] duration-200"
          >
            <div className="rounded-xl border border-gray-200 bg-white min-w-[17rem] shadow-[var(--shadow-strong)] py-2">
              {leistungenLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
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
          href={navItems[1].href}
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
              href={item.href}
              className={`${linkClass(pathname === item.href)} z-[1]`}
              suppressHydrationWarning
            >
              {item.label}
            </Link>
          );
        })}
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
                href={navItems[0].href}
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
                        href={item.href}
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
                href={navItems[1].href}
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
