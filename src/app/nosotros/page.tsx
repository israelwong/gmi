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
    <SectionLayout
      eyebrow="Trayectoria"
      title={companyInfo.identidad.nombreOficial}
      subtitle={companyInfo.historia.resumen}
      contentClassName="max-w-5xl"
    >
      <div className="space-y-10 text-muted-foreground">
        {companyInfo.historia.narrativa.map((p, i) => (
          <p key={i} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
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

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {HITOS.map((h) => (
          <Card key={h.title} className="border-border/80">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-primary">
                <h.icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <CardTitle className="text-base">{h.title}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed">
                  {h.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-14 border-primary/20 bg-muted/40">
        <CardContent className="p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Confidencialidad
          </p>
          <p className="mt-3 text-lg font-medium leading-relaxed text-foreground">
            {companyInfo.confidencialidad.titulo}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {companyInfo.confidencialidad.texto}
          </p>
        </CardContent>
      </Card>

      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Cartera referenciada de clientes
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {companyInfo.clientes.map((c) => (
            <li key={c.slug} className="font-mono text-sm text-foreground/90">
              — {c.nombre}
            </li>
          ))}
        </ul>
      </div>
    </SectionLayout>
  );
}
