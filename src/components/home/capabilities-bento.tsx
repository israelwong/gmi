import Link from "next/link";
import { Crosshair, Disc3, Ruler } from "lucide-react";

import { cn } from "@/lib/utils";

const ICONS = {
  cnc: Crosshair,
  torneado: Disc3,
  metrologia: Ruler,
} as const;

type Cap = {
  id: string;
  titulo: string;
  descripcion: string;
  detalle: string;
};

type CapabilitiesBentoProps = {
  capacidades: Cap[];
};

const LINKS: Record<string, { href: string; label: string }> = {
  cnc: { href: "/tecnologia#cnc", label: "Ver parque CNC" },
  torneado: { href: "/tecnologia#torneado", label: "Ver torneado" },
  metrologia: { href: "/tecnologia#metrologia", label: "Ver metrología" },
};

export function CapabilitiesBento({ capacidades }: CapabilitiesBentoProps) {
  const [cnc, torneado, metro] = capacidades;

  const bloques = [
    cnc && { cap: cnc, icon: ICONS.cnc },
    torneado && { cap: torneado, icon: ICONS.torneado },
    metro && { cap: metro, icon: ICONS.metrologia },
  ].filter(Boolean) as Array<{ cap: Cap; icon: (typeof ICONS)[keyof typeof ICONS] }>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Capacidades
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Precisión en cada eje
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          Tres pilares que resumen nuestro taller: mecanizado CNC, torneado y
          control dimensional para entregas repetibles.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {bloques.map(({ cap, icon: Icon }) => {
          const link = LINKS[cap.id];
          return (
            <Link
              key={cap.id}
              href={link?.href ?? "/tecnologia"}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm ring-1 ring-border/50 transition-shadow hover:shadow-md sm:p-7",
              )}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {cap.titulo}
              </h3>
              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                {cap.descripcion}
              </p>
              <p className="mt-4 font-mono text-xs text-primary/90">{cap.detalle}</p>
              {link && (
                <span className="mt-5 inline-flex text-sm font-medium text-primary underline-offset-4 group-hover:underline">
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
