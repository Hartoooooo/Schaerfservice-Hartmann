import { GraduationCap } from "lucide-react";
import { Container } from "@/components/Container";

type HuFriedyTrainingSectionProps = {
  detail: string;
  variant?: "blue" | "gray";
};

export function HuFriedyTrainingSection({ detail, variant = "blue" }: HuFriedyTrainingSectionProps) {
  const sectionClass =
    variant === "gray"
      ? "bg-gray-50 pt-8 pb-5 sm:pb-6 lg:pt-20"
      : "border-y border-blue-100 bg-blue-50/70 py-5 sm:py-6";

  return (
    <section className={sectionClass}>
      <Container>
        <div className="mx-auto flex max-w-6xl items-center gap-4 sm:gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-700 shadow-sm sm:h-12 sm:w-12">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Fachliche Weiterbildung
            </p>
            <h2 className="text-lg font-semibold leading-snug text-gray-900 sm:text-xl">
              Im Handschärfen bei Hu-Friedy in Chicago geschult
            </h2>
            <p className="mt-1 text-lg leading-relaxed text-gray-600">
              Als einer der wenigen Anbieter im deutschen Raum haben wir das Schärfen per Hand direkt bei Hu-Friedy in Chicago gelernt.{detail ? ` ${detail}` : ""}
            </p>
          </div>
          <div className="hidden shrink-0 border-l border-blue-200 pl-5 text-right md:block">
            <p className="text-sm font-medium text-gray-800">Chicago, 2001</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
