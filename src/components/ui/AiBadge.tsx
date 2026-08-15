"use client";

import { useState, useRef, useEffect } from "react";

interface AiBadgeProps {
  /** Zusätzliche Positionierungsklassen, z. B. "top-3 right-3". */
  className?: string;
  /** Popup-Ausrichtung relativ zum Badge. */
  align?: "left" | "right";
}

/**
 * Kennzeichnung für KI-generierte/-bearbeitete Bilder.
 * Zeigt bei Hover (Desktop) oder Tap (Mobil) einen erklärenden Hinweis.
 */
export default function AiBadge({ className = "top-3 right-3", align = "right" }: AiBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div
      ref={ref}
      className={`absolute z-20 ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        aria-label="Hinweis zur KI-Kennzeichnung"
        className="flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-2.5 py-1 text-white text-xs font-semibold shadow-sm hover:bg-white/30 transition-colors cursor-pointer"
      >
        KI
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 w-60 rounded-xl bg-gray-900/95 backdrop-blur-sm text-white text-xs leading-relaxed px-3.5 py-2.5 shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
          role="tooltip"
        >
          Dieses Bild wurde teilweise oder vollständig mit KI erstellt bzw. bearbeitet.
        </div>
      )}
    </div>
  );
}
