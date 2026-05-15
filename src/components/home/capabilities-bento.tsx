import Link from "next/link";
import { Crosshair, Disc3 } from "lucide-react";

import { companyInfo } from "@/lib/company-data";
import { cn } from "@/lib/utils";

const ICONS = {
  cnc: Crosshair,
  torneado: Disc3,
} as const;

type CapId = keyof typeof ICONS;

type Cap = {
  id: string;
  titulo: string;
  descripcion: string;
  detalle: string;
};

type CapabilitiesBentoProps = {
  capacidades: Cap[];
};

const LINKS: Record<CapId, { href: string; label: string }> = {
  cnc: { href: "/tecnologia#cnc", label: "Ver parque CNC" },
  torneado: { href: "/tecnologia#torneado", label: "Ver torneado" },
};

export function CapabilitiesBento({ capacidades }: CapabilitiesBentoProps) {
  const bloques = (["cnc", "torneado"] as const)
    .map((id) => {
      const cap = capacidades.find((c) => c.id === id);
      if (!cap) return null;
      return { cap, icon: ICONS[id] };
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  return (
    <section className="border-y-2 border-primary/15 bg-gradient-to-b from-primary/[0.07] via-muted/50 to-muted/35 py-20 dark:border-primary/25 dark:from-primary/10 dark:via-muted/10 dark:to-muted/10 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Capacidades
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.25rem]">
            Precisión en cada eje
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {companyInfo.manufactura.especialidad}{" "}
            <span className="font-medium text-foreground/85">
              Sectores: {companyInfo.manufactura.sectoresExperiencia}
            </span>
            . Dos líneas recurrentes que apoyamos en planta: mecanizado CNC y
            torneado de precisión.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {bloques.map(({ cap, icon: Icon }) => {
          const link = LINKS[cap.id as CapId];
          return (
            <Link
              key={cap.id}
              href={link?.href ?? "/tecnologia"}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md ring-1 ring-border/45 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/25",
              )}
            >
              <span
                className="h-1.5 w-full shrink-0 bg-gradient-to-r from-primary via-primary/90 to-primary/55"
                aria-hidden
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted text-primary shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">
                  {cap.titulo}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {cap.descripcion}
                </p>
                <p className="mt-4 font-mono text-xs font-medium text-primary">
                  {cap.detalle}
                </p>
                {link && (
                  <span className="mt-5 inline-flex text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                    {link.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    </section>
  );
}
