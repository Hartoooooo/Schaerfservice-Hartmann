import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type StandardCardProps = ComponentPropsWithoutRef<"article">;

export function StandardCard({ className, ...props }: StandardCardProps) {
  return (
    <article
      className={clsx(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      {...props}
    />
  );
}
