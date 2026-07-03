import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type GmiLogoProps = {
  className?: string;
};

const GMI_LOGO_URL =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/logos/gmi.svg";

const GMI_ALT_LOGO_URL =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/logos/gmi-alt.svg";

export function GmiLogo({ className }: GmiLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 sm:gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-sm",
        className,
      )}
      aria-label="Grupo GMI, Generado de Maquinados Industriales — Inicio"
    >
      <Image
        src={GMI_LOGO_URL}
        alt=""
        width={160}
        height={40}
        priority
        className="h-7 w-auto shrink-0 dark:brightness-0 dark:invert"
        style={{ width: "auto" }}
        aria-hidden
      />
      <span className="flex min-w-0 flex-col justify-center gap-0.5 leading-none">
        <span className="truncate text-sm font-semibold leading-none tracking-tight text-foreground sm:text-base">
          Grupo GMI
        </span>
        <span className="max-w-[16rem] truncate text-[9px] font-medium leading-snug text-muted-foreground sm:max-w-[20rem] sm:text-[10px]">
          Generado de Maquinados Industriales
        </span>
      </span>
    </Link>
  );
}

export function GmiAltMark({ className }: GmiLogoProps) {
  return (
    <Image
      src={GMI_ALT_LOGO_URL}
      alt=""
      width={36}
      height={36}
      className={cn(
        "h-9 w-9 shrink-0 object-contain opacity-90 dark:brightness-0 dark:invert",
        className,
      )}
      aria-hidden
    />
  );
}
