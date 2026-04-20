import type { Metadata } from "next";
import {
  Cog,
  DraftingCompass,
  HardHat,
  LineChart,
  Truck,
  Warehouse,
} from "lucide-react";

import { SectionLayout } from "@/components/layout/section-layout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios de ingeniería industrial, proyectos llave en mano y logística para Grupo GMI.",
};

const SERVICES = [
  {
    title: "Ingeniería de detalle",
    description:
      "Modelado, especificaciones y paquetes constructivos alineados a normas y mejores prácticas.",
    icon: DraftingCompass,
  },
  {
    title: "Proyectos EPC / llave en mano",
    description:
      "Coordinación integral de diseño, compras y construcción con control de cronograma y costo.",
    icon: HardHat,
  },
  {
    title: "Automatización y mejora de procesos",
    description:
      "Diagnóstico de líneas, integración de sistemas y optimización de flujos productivos.",
    icon: Cog,
  },
  {
    title: "Logística industrial",
    description:
      "Diseño de redes, manejo de materiales y solución de cuellos de botella en la cadena.",
    icon: Truck,
  },
  {
    title: "Almacenamiento y layout",
    description:
      "Configuración de racks, zonas de picking y almacenes que maximizan uso de espacio.",
    icon: Warehouse,
  },
  {
    title: "Consultoría y due diligence técnico",
    description:
      "Evaluación de activos, riesgos operativos y oportunidades de eficiencia energética.",
    icon: LineChart,
  },
] as const;

export default function ServiciosPage() {
  return (
    <SectionLayout
      eyebrow="Capacidades"
      title="Servicios de ingeniería"
      subtitle="Portafolio modular para acompañar desde la conceptualización hasta la operación estable. Cada servicio se adapta al contexto de planta y a los estándares de su industria."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Card
            key={s.title}
            className="border-border/80 transition-shadow hover:shadow-md"
          >
            <CardHeader className="space-y-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted text-primary">
                <s.icon className="h-5 w-5" aria-hidden />
              </div>
              <CardTitle className="text-lg leading-snug">{s.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {s.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </SectionLayout>
  );
}
