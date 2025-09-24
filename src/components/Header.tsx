import Link from "next/link";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/90 border-b border-[var(--color-border)]">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-semibold tracking-tight">Schärfservice Hartmann</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}


