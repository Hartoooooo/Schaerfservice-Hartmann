"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const footerLinks = [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/agb", label: "AGB" },
    { href: "/widerrufsbelehrung", label: "Widerrufsbelehrung" },
  ];

  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container-page py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p className="text-sm text-neutral-600">© {new Date().getFullYear()} Schärfservice Hartmann. Alle Rechte vorbehalten.</p>
          <p className="text-xs text-neutral-500">
            Entwickelt von{" "}
            <a 
              href="https://www.neoklar.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-[var(--color-blue-600)] transition-colors duration-200"
            >
              Neoklar™
            </a>
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          {footerLinks.map((link) => (
            <Link 
              key={link.href}
              className={`hover:underline transition-colors duration-200 ${
                pathname === link.href 
                  ? "text-[var(--color-blue-600)] font-medium underline" 
                  : "text-neutral-600"
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}


