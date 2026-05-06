import Link from "next/link";
import { ArrowRight, Factory, Layers, ShieldCheck } from "lucide-react";

import { InstitutionalVideoEmbed } from "@/components/home/institutional-video-embed";
import { Button } from "@/components/ui/button";

const INSTITUTIONAL_VIDEO_URL =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/video/web-Grupo-GMI-institucional.webm";

const POINTS = [
  {
    icon: Factory,
    title: "Parque y cadena técnica",
    text: "HAAS · Doosan y equipamiento complementario para piezas exigentes.",
  },
  {
    icon: Layers,
    title: "Series y desarrollo",
    text: "Lotes recurrentes y prototipos bajo planos y tolerancias acordadas.",
  },
  {
    icon: ShieldCheck,
    title: "Confidencialidad",
    text: "Acuerdos de confidencialidad en cada proyecto, sin divulgar proceso.",
  },
] as const;

export function InstitutionalVideo() {
  return (
    <section
      className="border-b border-border bg-background"
      aria-labelledby="titulo-trabajo-en-planta"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* Columna 1: copy + vídeo */}
          <div className="flex min-w-0 flex-col gap-4">
            <header className="space-y-2 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Grupo GMI
              </p>
              <h2
                id="titulo-trabajo-en-planta"
                className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl"
              >
                Así trabajamos en planta
              </h2>
              <p className="max-w-prose text-pretty text-sm leading-snug text-muted-foreground sm:text-base">
                Un recorrido por nuestra operación: precisión industrial, equipo y
                compromiso con la confidencialidad de cada proyecto.
              </p>
            </header>

            <figure className="min-w-0">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-1 ring-border/50">
                <div className="relative aspect-video w-full bg-zinc-950 dark:bg-black">
                  <InstitutionalVideoEmbed
                    src={INSTITUTIONAL_VIDEO_URL}
                    mimeType="video/webm"
                    title="Grupo GMI — recorrido por nuestra operación"
                  />
                </div>
              </div>
              <figcaption className="sr-only">
                Contenido audiovisual de Grupo GMI. Use los controles del reproductor
                para reproducir o pausar.
              </figcaption>
            </figure>
          </div>

          {/* Columna 2: puntos fuertes + CTA */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="flex flex-col gap-7 rounded-xl border border-border bg-card p-6 shadow-sm sm:gap-8 sm:p-8 dark:shadow-none">
              <ul className="flex flex-col divide-y divide-border/90" role="list">
                {POINTS.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3 py-3 first:pt-0 last:pb-0 sm:gap-3.5 sm:py-3.5">
                    <Icon
                      className="mt-px size-[18px] shrink-0 text-primary sm:size-5"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-sm font-semibold leading-snug text-foreground">
                        {title}
                      </p>
                      <p className="text-sm leading-snug text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2.5 border-t border-border pt-6 sm:pt-7">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contacto">
                    Solicitar cotización de proyecto
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
