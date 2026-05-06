import type { Metadata } from "next";
import { Building2, History, Target, Telescope, Users } from "lucide-react";

import { SectionLayout } from "@/components/layout/section-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClientsMarquee } from "@/components/home/clients-marquee";
import { companyInfo } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Perfil corporativo Generado de Maquinados Industriales (GMI): trayectoria, misión y visión desde Taller Salinas (1985).",
};

const HITOS = [
  {
    title: "1985 — Origen",
    description: `"${companyInfo.historia.origen}", fundado por ${companyInfo.historia.fundador}.`,
    icon: History,
  },
  {
    title: `1998 — ${companyInfo.historia.nombreConsolidado}`,
    description: `Consolidación como ${companyInfo.identidad.nombreOficial}: operación industrial con parque tecnológico y enfoque en manufactura de refacciones, fixtures y gages.`,
    icon: Building2,
  },
  {
    title: "Hoy",
    description: companyInfo.manufactura.especialidad,
    icon: Users,
  },
] as const;

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

      <div className="mt-10 grid gap-6 md:mt-11 md:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-primary">
              <Target className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <CardTitle className="text-base">Misión</CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed">
                {companyInfo.historia.mision}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card className="border-border/80">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-primary">
              <Telescope className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <CardTitle className="text-base">Visión</CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed">
                {companyInfo.historia.vision}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-10 md:mt-11">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Hitos
        </p>
        <ol className="mt-4 list-none space-y-0 pl-0 md:mt-5">
          {HITOS.map((h, i) => {
            const isLast = i === HITOS.length - 1;
            return (
              <li
                key={h.title}
                className="relative flex gap-5 pb-8 last:pb-0 md:gap-8 md:pb-10"
              >
                <div className="relative flex w-11 shrink-0 flex-col items-center self-stretch md:w-12">
                  <span className="relative z-[1] mt-0.5 flex size-11 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm ring-[3px] ring-background md:size-12">
                    <h.icon className="size-5 shrink-0" aria-hidden />
                  </span>
                  {!isLast && (
                    <span
                      className="pointer-events-none absolute left-1/2 top-[3rem] bottom-0 w-px -translate-x-1/2 bg-border md:top-[3.25rem]"
                      aria-hidden
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:mt-2.5">
                    {h.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
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
