import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type TecnologiaDisclosureSectionProps = {
  id?: string;
  className?: string;
  /** Contenido del encabezado plegable (típicamente un `<h2>` o bloque con eyebrow). */
  summary: ReactNode;
  children: ReactNode;
};

/**
 * Sección colapsable (nativo `details`) para páginas largas como Capacidades.
 * Abierta por defecto; el usuario puede plegar para orientarse.
 */
export function TecnologiaDisclosureSection({
  id,
  className,
  summary,
  children,
}: TecnologiaDisclosureSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <details className="group/ds open:[&_.ds-chevron]:rotate-180" open>
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-1 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0 flex-1">{summary}</div>
          <ChevronDown
            className="ds-chevron mt-1 size-5 shrink-0 text-primary transition-transform duration-200"
            aria-hidden
          />
        </summary>
        <div className="mt-6">{children}</div>
      </details>
    </section>
  );
}
