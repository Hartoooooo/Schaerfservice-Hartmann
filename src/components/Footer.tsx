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
    <footer className="border-t border-blue-700 bg-blue-600 text-white">
      <div className="container-page py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Desktop: Copyright links, Mobile: Order 2 */}
        <div className="flex flex-col items-center sm:items-start gap-1 order-2 sm:order-1">
          <p className="text-xs text-white sm:text-sm">© {new Date().getFullYear()} Schärfservice Hartmann. Alle Rechte vorbehalten.</p>
            <p className="text-xs text-blue-100">
              Umsetzung von{" "}
              <a
                href="https://www.neoklar.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-200 hover:text-blue-100"
              >
                Neoklar
              </a>
            </p>
        </div>
        {/* Desktop: Nav rechts, Mobile: Order 1 (oben) */}
        <nav className="flex items-center gap-4 text-sm order-1 sm:order-2">
          {footerLinks.map((link) => (
            <Link 
              key={link.href}
              className={`hover:underline transition-colors duration-200 ${
                pathname === link.href 
                  ? "font-medium text-white underline"
                  : "text-blue-100 hover:text-white"
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

