import type { Metadata } from "next";
import { Target, Telescope } from "lucide-react";

import { SectionLayout } from "@/components/layout/section-layout";
import { ClientsMarquee } from "@/components/home/clients-marquee";
import { NosotrosHero } from "@/components/nosotros/nosotros-hero";
import { companyInfo } from "@/lib/company-data";
import { cn } from "@/lib/utils";

const MISION_VISION = [
  {
    id: "mision",
    titulo: "Misión",
    texto: companyInfo.historia.mision,
    icon: Target,
  },
  {
    id: "vision",
    titulo: "Visión",
    texto: companyInfo.historia.vision,
    icon: Telescope,
  },
] as const;

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Perfil corporativo Generado de Maquinados Industriales (GMI): trayectoria, misión y visión desde Taller Salinas (1985).",
};

export default function NosotrosPage() {
  return (
    <>
      <NosotrosHero />
      <SectionLayout contentClassName="max-w-5xl">
      <div className="space-y-3 text-muted-foreground md:space-y-4">
        {companyInfo.historia.narrativa.map((p, i) => (
          <p key={i} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 md:mt-12">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {MISION_VISION.map(({ id, titulo, texto, icon: Icon }) => (
            <article
              key={id}
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
                    {titulo}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-[1.65]">
                    {texto}
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
    </SectionLayout>

    <ClientsMarquee
      clientes={companyInfo.clientes}
      hideHeading
      variant="band"
      softBand
      title="Cartera referenciada de clientes"
    />
    </>
  );
}
