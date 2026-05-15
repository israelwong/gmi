import type { Metadata } from "next";
import { Target, Telescope } from "lucide-react";

import { SectionLayout } from "@/components/layout/section-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ClientsMarquee } from "@/components/home/clients-marquee";
import { companyInfo } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Perfil corporativo Generado de Maquinados Industriales (GMI): trayectoria, misión y visión desde Taller Salinas (1985).",
};

export default function NosotrosPage() {
  return (
    <>
      <SectionLayout
        eyebrow="Trayectoria"
        title={companyInfo.identidad.nombreOficial}
        subtitle={companyInfo.historia.resumen}
        contentClassName="max-w-5xl"
        headerClassName="mb-8 max-w-none space-y-2 sm:mb-10 sm:space-y-2.5"
        subtitleClassName="text-base leading-snug md:text-[1.0625rem] md:leading-relaxed"
      >
      <div className="space-y-5 text-muted-foreground md:space-y-6">
        {companyInfo.historia.narrativa.map((p, i) => (
          <p key={i} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 md:mt-12">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="grid md:grid-cols-2">
            <section className="border-border p-6 sm:p-8 md:border-r md:p-9">
              <header className="mb-5 flex items-center gap-3.5 border-b border-border pb-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60 text-primary">
                  <Target className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                    Misión
                  </h3>
                </div>
              </header>
              <p className="max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base md:leading-[1.65]">
                {companyInfo.historia.mision}
              </p>
            </section>
            <section className="border-t border-border p-6 sm:p-8 md:border-t-0 md:p-9">
              <header className="mb-5 flex items-center gap-3.5 border-b border-border pb-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60 text-primary">
                  <Telescope className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                    Visión
                  </h3>
                </div>
              </header>
              <p className="max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base md:leading-[1.65]">
                {companyInfo.historia.vision}
              </p>
            </section>
          </div>
        </div>
      </div>

      <Card className="mt-10 border-primary/20 bg-muted/40 md:mt-11">
        <CardContent className="p-6 sm:p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Confidencialidad
          </p>
          <p className="mt-2.5 text-lg font-medium leading-snug text-foreground md:mt-3 md:leading-relaxed">
            {companyInfo.confidencialidad.titulo}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:mt-3.5">
            {companyInfo.confidencialidad.texto}
          </p>
        </CardContent>
      </Card>
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
