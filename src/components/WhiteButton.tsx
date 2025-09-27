import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type WhiteButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline";
    href?: string;
    hover?: "lift" | "lift-sm" | "none";
  }
>;

export function WhiteButton({ children, className, variant = "primary", href, hover = "none", ...rest }: WhiteButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-white text-blue-600 hover:bg-gray-50 px-4 py-2.5"
      : "px-4 py-2 border border-[var(--color-border)]";
  
  const hoverEffect = hover === "lift" ? "hover:-translate-y-0.5" : hover === "lift-sm" ? "hover:-translate-y-px" : "";
  const cursorEffect = hover === "lift" || hover === "lift-sm" ? "cursor-pointer" : "";
  
  if (href) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href={href} className={clsx(base, styles, hoverEffect, cursorEffect, className)}>
        {children}
      </a>
    );
  }
  return <button className={clsx(base, styles, hoverEffect, cursorEffect, className)} {...rest}>{children}</button>;
}
