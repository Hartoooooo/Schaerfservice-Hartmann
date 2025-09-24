"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Startseite" },
  { href: "/schaerfauftrag", label: "Schärfauftrag" },
  { href: "/schaerfkurse", label: "Schärfkurse" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

// Footer-Seiten, die nicht im Header als aktiv angezeigt werden sollen
const footerPages = ["/impressum", "/datenschutz", "/agb", "/widerrufsbelehrung"];

export function Navigation() {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return (
      <nav className="relative flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-3 py-2 rounded-full transition-colors duration-200 hover:bg-[var(--color-blue-600)]/10"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav ref={navRef} className="relative flex items-center gap-1">
      {/* Animierter Indikator */}
      <div
        className="absolute top-0 h-full bg-[var(--color-blue-600)] rounded-full transition-all duration-300 ease-out"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
      {navItems.map((item, index) => (
        <Link
          key={item.href}
          ref={el => (itemRefs.current[index] = el)}
          href={item.href}
          className={`relative px-3 py-2 rounded-full transition-colors duration-200 ${
            pathname === item.href && !footerPages.includes(pathname)
              ? "text-white" 
              : "hover:bg-[var(--color-blue-600)]/10"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
