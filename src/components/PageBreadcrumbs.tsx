"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { blogPosts } from "@/lib/blogPosts";

const LEGAL_PATHS = new Set([
  "/impressum",
  "/datenschutz",
  "/agb",
  "/widerrufsbelehrung",
  "/cookie-einstellungen",
]);

const SEGMENT_LABELS: Record<string, string> = {
  kontakt: "Kontakt",
  schaerfauftrag: "Schärfauftrag",
  "express-schaerfen": "Express-Schärfen",
  schaerfkurse: "Schärfkurse",
  blog: "Blog",
  danke: "Danke",
  "stepper-demo": "Stepper-Demo",
};

function humanizeSegment(segment: string): string {
  const mapped = SEGMENT_LABELS[segment];
  if (mapped) return mapped;
  return segment
    .split("-")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function PageBreadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === "/" || LEGAL_PATHS.has(pathname)) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const items: { href: string; label: string }[] = [{ href: "/", label: "Startseite" }];

  let acc = "";
  for (let i = 0; i < segments.length; i++) {
    acc += `/${segments[i]}`;
    let label: string;
    if (segments[0] === "blog" && i === 1) {
      const post = blogPosts.find((p) => p.id === segments[i]);
      label = post?.title ?? humanizeSegment(segments[i]);
    } else {
      label = humanizeSegment(segments[i]);
    }
    const href = acc === "/blog" ? "/#expertentipps" : acc;
    items.push({ href, label });
  }

  return (
    <>
      {/* Unter fixem Header: kompakter Abstand, ohne Brotkrümel-Zeile (nur mobil) */}
      <div className="md:hidden container-page pt-16" aria-hidden />
      <div className="hidden md:block container-page pt-[4.25rem] pb-3 sm:pt-20 sm:pb-4 text-left">
        <nav aria-label="Brotkrumennavigation" className="text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            {items.map((item, index) => (
              <li key={`${item.href}-${index}`} className="flex items-center gap-1.5 min-w-0">
                {index > 0 ? (
                  <span className="text-[var(--color-border)] select-none shrink-0" aria-hidden>
                    /
                  </span>
                ) : null}
                {index === items.length - 1 ? (
                  <span className="font-medium text-gray-800 truncate" title={item.label}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-blue-600 hover:text-blue-700 hover:underline underline-offset-2 transition-colors shrink-0"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
