import type { Metadata } from "next";
import Link from "next/link";

import { SectionLayout } from "@/components/layout/section-layout";
import { EquipoIsomaqSlider } from "@/components/tecnologia/equipo-isomaq-slider";
import { TecnologiaHero } from "@/components/tecnologia/tecnologia-hero";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/company-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Capacidades y Tecnología",
  description:
    "Equipo HAAS y Doosan, tornos paralelos, Bridgeport, rectificado, electroerosión, CMM y comparador óptico Mitutoyo; CAD/CAM Solid Edge · MasterCAM · SurfCAM.",
};

export default function TecnologiaPage() {
  const { manufactura } = companyInfo;

  return (
    <>
      <TecnologiaHero />
      <SectionLayout contentClassName="max-w-6xl">
        <section id="manufactura" className="scroll-mt-24">
          <header>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Servicios
            </h2>
          </header>
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
              {manufactura.procesos.map((proc) => (
                <article
                  key={proc.titulo}
                  className={cn(
                    "relative isolate flex min-h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm ring-1 ring-border/45",
                    "dark:bg-card/90 dark:ring-border/60",
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(0,74,153,0.07),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(92,166,247,0.1),transparent_55%)]"
                    aria-hidden
                  />
                  <div className="relative flex flex-1 flex-col gap-3 p-6 sm:p-8">
                    <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-[1.35rem]">
                      {proc.titulo}
                    </h3>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-[1.65]">
                      {proc.descripcion}
                    </p>
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

        <section
          id="equipo"
          className="mt-14 scroll-mt-24 border-t border-border pt-12"
        >
          <h2 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
            Algunos de nuestros equipos
          </h2>
        </section>

        <section
          id="equipo-galeria"
          className="mt-8 scroll-mt-24 pt-6"
          aria-label="Galería de equipo"
        >
          <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-y border-border">
            <EquipoIsomaqSlider />
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-border pt-10">
          <Button asChild>
            <Link href="/contacto">Solicitar cotización de proyecto especial</Link>
          </Button>
        </div>
      </SectionLayout>
    </>
  );
}
