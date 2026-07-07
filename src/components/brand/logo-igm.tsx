import Image from "next/image";

import { cn } from "@/lib/utils";

const GMI_ALT_LOGO_URL =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/logos/gmi-alt.svg";

type LogoIgmProps = {
  className?: string;
};

export function LogoIgm({ className }: LogoIgmProps) {
  return (
    <div
      className={cn("flex min-w-0 items-center gap-2 sm:gap-2.5", className)}
      aria-label="Industria Generadora de Maquinados"
    >
      <Image
        src={GMI_ALT_LOGO_URL}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 object-contain opacity-90 dark:brightness-0 dark:invert"
        aria-hidden
      />
      <span className="flex min-w-0 max-w-[7.5rem] flex-col justify-center leading-none sm:max-w-none">
        <span className="truncate text-[9px] font-semibold leading-snug tracking-tight text-zinc-600 dark:text-zinc-300 sm:text-[10px] lg:text-[11px]">
          Industria Generadora
        </span>
        <span className="truncate text-[9px] font-medium leading-snug text-zinc-600 dark:text-zinc-300 sm:text-[10px] lg:text-[11px]">
          de Maquinados
        </span>
      </span>
    </div>
  );
}
