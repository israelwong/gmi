import Link from "next/link";

import { cn } from "@/lib/utils";

type GmiLogoProps = {
  className?: string;
  withWordmark?: boolean;
};

export function GmiLogo({ className, withWordmark = true }: GmiLogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-sm", className)}
      aria-label="Grupo GMI — Inicio"
    >
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden
      >
        <rect width="40" height="40" rx="8" className="fill-primary" />
        <path
          d="M12 20c0-4.5 3.5-8 8-8h4v4h-4c-2.2 0-4 1.8-4 4s1.8 4 4 4h4v4h-4c-4.5 0-8-3.5-8-8z"
          className="fill-primary-foreground"
        />
        <path
          d="M22 12h6v16h-4v-6h-2v-4h2v-6z"
          className="fill-primary-foreground/90"
        />
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-semibold tracking-tight text-foreground">
            Grupo GMI
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Ingeniería &amp; Logística
          </span>
        </span>
      )}
    </Link>
  );
}
