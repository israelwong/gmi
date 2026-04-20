import type { Metadata } from "next";
import { Award, Globe2, Users } from "lucide-react";

import { SectionLayout } from "@/components/layout/section-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description:
    "Historia, valores y ADN mexicano de Grupo GMI: compromiso con la ingeniería y el país.",
};

const VALUES = [
  {
    title: "Excelencia técnica",
    description:
      "Procesos documentados, seguridad industrial y mejora continua en cada entrega.",
    icon: Award,
  },
  {
    title: "ADN mexicano",
    description:
      "Talento local, proveeduría nacional y responsabilidad con las comunidades donde operamos.",
    icon: Globe2,
  },
  {
    title: "Trabajo en equipo",
    description:
      "Coordinación multidisciplinaria entre ingeniería, obra y logística para cumplir plazos.",
    icon: Users,
  },
] as const;

export default function QuienesSomosPage() {
  return (
    <SectionLayout
      eyebrow="Nuestra esencia"
      title="Quiénes somos"
      subtitle="Grupo GMI nace de la convicción de que la industria mexicana merece socios que combinen rigor de ingeniería, ejecución impecable y un sentido claro de país."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6 text-muted-foreground">
          <p className="leading-relaxed">
            Desde nuestros inicios hemos acompañado proyectos de infraestructura,
            manufactura y cadena de suministro con soluciones modulares y
            sistemas de almacenamiento que escalan con el negocio.
          </p>
          <p className="leading-relaxed">
            Operamos con una cultura de transparencia: cada propuesta se apoya en
            diagnósticos claros, especificaciones técnicas y un acompañamiento
            cercano del inicio al arranque.
          </p>
          <p className="leading-relaxed">
            Nuestro ADN mexicano se traduce en decisiones locales, desarrollo de
            proveedores y un compromiso real con la seguridad de las personas y
            el medio ambiente.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-1">
          {VALUES.map((v) => (
            <Card key={v.title} className="border-border/80">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-primary">
                  <v.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <CardTitle className="text-lg">{v.title}</CardTitle>
                  <CardDescription className="mt-2 text-base leading-relaxed">
                    {v.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-14 border-primary/20 bg-muted/40">
        <CardContent className="p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Compromiso
          </p>
          <p className="mt-3 max-w-3xl text-lg font-medium leading-relaxed text-foreground">
            Construimos activos industriales que perduran: diseño sobrio,
            materiales adecuados y un enfoque de ciclo de vida que reduce riesgos
            operativos para nuestros clientes.
          </p>
        </CardContent>
      </Card>
    </SectionLayout>
  );
}
