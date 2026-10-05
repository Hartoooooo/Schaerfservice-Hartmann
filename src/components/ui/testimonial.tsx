import Image from "next/image";
import { StandardCard } from "@/components/StandardCard";

const reviews = [
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
] as const;

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
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
      {reviews.map((review) => (
        <StandardCard
          key={review.name}
          className="min-h-64 w-[85%] shrink-0 snap-center p-6 sm:w-[60%] md:w-auto md:shrink"
        >
          <div className="flex items-center justify-between gap-4">
            <Stars />
            <GoogleLogo />
          </div>
          <blockquote className="mt-5 flex-1 text-base leading-7 text-gray-600">
            <p>„{review.text}“</p>
          </blockquote>
          <footer className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
            <Image
              src={review.image}
              alt={`Google-Profilbild von ${review.name}`}
              width={48}
              height={48}
              className="size-12 rounded-full object-cover"
            />
            <div>
              <cite className="not-italic font-semibold text-gray-900">{review.name}</cite>
              <p className="text-sm text-gray-500">Google-Rezension · {review.date}</p>
            </div>
          </footer>
        </StandardCard>
      ))}
    </div>
  );
}
