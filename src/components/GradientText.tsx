import { ReactNode } from "react";
import clsx from "clsx";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  variant?: "blue" | "purple" | "green" | "orange";
};

export function GradientText({ children, className, variant = "blue" }: GradientTextProps) {
  const gradients = {
    blue: "bg-gradient-to-r from-[var(--color-blue-600)] to-[var(--color-blue-400)]",
    purple: "bg-gradient-to-r from-purple-600 to-purple-400",
    green: "bg-gradient-to-r from-green-600 to-green-400",
    orange: "bg-gradient-to-r from-orange-600 to-orange-400",
  };

  return (
    <span
      className={clsx(
        "bg-clip-text text-transparent font-bold",
        gradients[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
