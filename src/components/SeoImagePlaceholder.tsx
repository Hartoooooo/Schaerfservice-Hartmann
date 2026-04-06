import clsx from "clsx";

type SeoImagePlaceholderProps = {
  /** Kurzer Titel im Kasten */
  caption: string;
  /** Empfohlener Alt-Text, wenn ein echtes Bild eingebunden wird */
  suggestedAlt: string;
  /** Bildidee für die spätere Produktion (sichtbar im Platzhalter) */
  ideaHint: string;
  className?: string;
  /** Darstellungsvariante */
  variant?: "default" | "compact";
};

/**
 * Visueller Platzhalter für SEO-Landingpages. Ersetzen durch next/image mit echtem Asset.
 */
export function SeoImagePlaceholder({
  caption,
  suggestedAlt,
  ideaHint,
  className,
  variant = "default",
}: SeoImagePlaceholderProps) {
  return (
    <figure className={clsx("w-full", className)}>
      <div
        role="img"
        aria-label={suggestedAlt}
        className={clsx(
          "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 px-5 text-center text-gray-600",
          variant === "compact" ? "aspect-[16/7] py-6" : "aspect-[16/10] py-8 sm:aspect-[16/9]",
        )}
      >
        <svg
          className="h-10 w-10 shrink-0 opacity-40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm font-semibold text-gray-700">{caption}</span>
        <span className="max-w-lg text-xs leading-relaxed text-gray-500">{ideaHint}</span>
      </div>
      <figcaption className="mt-2 text-xs text-gray-400">Platzhalter – Bild folgt</figcaption>
    </figure>
  );
}
