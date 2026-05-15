import type { Metadata } from "next";
import { Target, Telescope } from "lucide-react";

import { SectionLayout } from "@/components/layout/section-layout";
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
        headerClassName="mb-5 max-w-none space-y-1.5 sm:mb-6 sm:space-y-2"
        titleClassName="mb-4 sm:mb-5"
        subtitleClassName="text-base leading-snug md:text-[1.0625rem] md:leading-relaxed"
      >
      <div className="space-y-3 text-muted-foreground md:space-y-4">
        {companyInfo.historia.narrativa.map((p, i) => (
          <p key={i} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 md:mt-12">
        <div className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x md:divide-y-0">
          <section className="py-8 md:px-8 md:py-10 lg:px-10">
            <header className="mb-5 flex items-center gap-3 border-b border-border pb-4">
              <Target
                className="size-5 shrink-0 text-primary md:size-6"
                aria-hidden
              />
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                Misión
              </h3>
            </header>
            <p className="max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base md:leading-[1.65]">
              {companyInfo.historia.mision}
            </p>
          </section>
          <section className="py-8 md:px-8 md:py-10 lg:px-10">
            <header className="mb-5 flex items-center gap-3 border-b border-border pb-4">
              <Telescope
                className="size-5 shrink-0 text-primary md:size-6"
                aria-hidden
              />
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                Visión
              </h3>
            </header>
            <p className="max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base md:leading-[1.65]">
              {companyInfo.historia.vision}
            </p>
          </section>
        </div>
      </div>

      <div className="pt-8 md:pt-10">
        <p className="text-lg font-medium leading-snug text-foreground md:leading-relaxed">
          {companyInfo.confidencialidad.titulo}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:mt-3.5">
          {companyInfo.confidencialidad.texto}
        </p>
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
