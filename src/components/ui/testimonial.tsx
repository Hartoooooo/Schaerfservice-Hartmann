"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StandardCard } from "@/components/StandardCard";

type Review = {
  name: string;
  date?: string;
  text: string;
  image?: string;
};

const reviews: readonly Review[] = [
  {
    name: "Kerstin Schumann",
    text: "Wir lassen seit einigen Wochen unsere Instrumente (Küretten und Scaler) bei Frau Hartmann schärfen. Bei der ersten Lieferung kam von ihr das Feedback, dass ihr bei uns an den eingeschickten Instrumenten grobe Schärffehler aufgefallen waren. Wir belegten einen Schärfkurs bei ihr (die kam dazu in die Praxis) und gab meinen Mitarbeiter*innen sehr wertvolle Hinweise und praktische Tipps. Der Kontakt ist immer angenehm und vertrauensvoll. Vielen Dank Frau Hartmann für die tolle Zusammenarbeit!",
  },
  {
    name: "Ina Albrecht",
    date: "vor einem Monat",
    text: "Sehr schnelle Bearbeitung der Instrumente und super scharf. Vielen Dank",
    image: "/google-reviews/ina-albrecht.png",
  },
  {
    name: "anke wulfes",
    date: "vor 9 Monaten",
    text: "Immer sehr freundliche, zuverlässige und zügige Erledigung aller Wünsche und Aufträge. Sehr empfehlenswert",
    image: "/google-reviews/anke-wulfes.png",
  },
  {
    name: "Janin",
    date: "vor 9 Monaten",
    text: "Zuverlässig und sehr guter Service. Vielen Dank",
    image: "/google-reviews/janin.png",
  },
];

function GoogleLogo() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.42l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.87A6.01 6.01 0 0 1 6.08 12c0-.65.11-1.28.31-1.87V7.51H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.49l3.35-2.62Z" />
      <path fill="#EA4335" d="M12 6c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.51l3.35 2.62C7.18 7.76 9.39 6 12 6Z" />
    </svg>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} className="size-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="m10 1.6 2.5 5.07 5.6.81-4.05 3.95.96 5.58L10 14.37 5 17l.95-5.58L1.9 7.48l5.6-.81L10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanPrev(track.scrollLeft > 4);
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: "smooth" });
  };

  const arrowClass =
    "inline-flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-default disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700";

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-1 pt-2 pb-4 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <StandardCard
            key={review.name}
            className="!h-auto min-h-80 w-[85%] shrink-0 snap-start p-6 md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <div className="flex items-center justify-between gap-4">
              <Stars />
              <GoogleLogo />
            </div>
            <blockquote className="mt-4 flex-1 text-base leading-6 text-gray-600 md:mt-5 md:leading-7">
              <p>„{review.text}“</p>
            </blockquote>
            <footer className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4 md:mt-6 md:pt-5">
              {review.image ? (
                <Image
                  src={review.image}
                  alt={`Google-Profilbild von ${review.name}`}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
              ) : (
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white"
                  aria-hidden="true"
                >
                  {review.name.charAt(0)}
                </span>
              )}
              <div>
                <cite className="not-italic font-semibold text-gray-900">{review.name}</cite>
                <p className="text-sm text-gray-500">
                  Google-Rezension{review.date ? ` · ${review.date}` : ""}
                </p>
              </div>
            </footer>
          </StandardCard>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Vorherige Bewertung" className={arrowClass}>
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Nächste Bewertung" className={arrowClass}>
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
