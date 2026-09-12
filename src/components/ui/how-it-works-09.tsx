import { ArrowRight, BadgeEuro, Search, TriangleAlert } from "lucide-react";

import { Button } from "@/components/Button";

const steps = [
  {
    icon: Search,
    title: "Stumpfheit erkennen",
    body: "Scaler und Küretten greifen nicht mehr zuverlässig, gleiten über Beläge und erfordern spürbar mehr Druck.",
  },
  {
    icon: TriangleAlert,
    title: "Folgen vermeiden",
    body: "Stumpfe Instrumente erfordern mehr Kraft, belasten Hände und Handgelenke und können Patienten Schmerzen verursachen.",
  },
  {
    icon: BadgeEuro,
    title: "Regelmäßig schärfen",
    body: "Schärfen stellt die Schneidleistung wieder her, verlängert die Nutzungsdauer und senkt Neukaufkosten.",
  },
];

export default function HowItWorks09() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-semibold text-gray-900 sm:text-4xl">
            Stumpfe Instrumente früh erkennen
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Anzeichen richtig deuten, Belastungen vermeiden und Instrumente durch regelmäßiges Schärfen länger nutzen.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="absolute left-[16.6667%] right-[16.6667%] top-7 hidden h-px bg-blue-200 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center gap-4 text-center"
              >
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-blue-600 bg-blue-600 shadow-[0_8px_24px_rgba(37,99,235,0.18)]">
                  <Icon aria-hidden="true" className="size-6 text-white" strokeWidth={2} />
                </div>
                <div className="flex max-w-sm flex-col gap-3">
                  <h3 className="text-xl leading-7 font-semibold text-gray-900 sm:text-2xl sm:leading-8">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                    {step.body}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-2 size-4 rotate-90 text-gray-400 md:hidden"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            href="/schaerfauftrag"
            hover="lift"
            className="gap-2 rounded-full bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
          >
            Instrumente schärfen lassen
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
