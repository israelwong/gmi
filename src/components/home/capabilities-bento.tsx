import { Crosshair, Disc3 } from "lucide-react";

import { cn } from "@/lib/utils";

const ICONS = {
  cnc: Crosshair,
  torneado: Disc3,
} as const;

type Cap = {
  id: string;
  titulo: string;
  descripcion: string;
};

type CapabilitiesBentoProps = {
  capacidades: Cap[];
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
    <section
      className="border-y border-border py-12 sm:py-16"
      aria-label="Capacidades de maquinado"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {bloques.map(({ cap, icon: Icon }) => (
            <article
              key={cap.id}
              className={cn(
                "relative isolate flex min-h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm ring-1 ring-border/45",
                "dark:bg-card/90 dark:ring-border/60",
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(0,74,153,0.07),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(92,166,247,0.1),transparent_55%)]"
                aria-hidden
              />

              <div className="relative flex flex-1 flex-col gap-5 p-6 sm:p-8">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.07] text-primary shadow-sm sm:size-14">
                  <Icon className="size-6 sm:size-7" strokeWidth={1.75} aria-hidden />
                </div>

                <div className="min-w-0 space-y-2.5">
                  <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-[1.35rem]">
                    {cap.titulo}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-[1.65]">
                    {cap.descripcion}
                  </p>
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/70 via-primary to-primary/50"
                aria-hidden
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
