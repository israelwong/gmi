import Link from "next/link";
import {
  Anchor,
  Boxes,
  Factory,
  ShieldCheck,
} from "lucide-react";

import { Hero } from "@/components/home/hero";
import { SectionLayout } from "@/components/layout/section-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HIGHLIGHTS = [
  {
    title: "Quiénes Somos",
    description: "Historia, cultura y valores con raíces en México.",
    href: "/quienes-somos",
    icon: Factory,
  },
  {
    title: "Servicios",
    description: "Ingeniería aplicada a procesos y activos industriales.",
    href: "/servicios",
    icon: ShieldCheck,
  },
  {
    title: "Productos",
    description: "Sistemas modulares y almacenamiento listos para operar.",
    href: "/productos",
    icon: Boxes,
  },
  {
    title: "Contacto",
    description: "Cotizaciones, alianzas y soporte con respuesta ágil.",
    href: "/contacto",
    icon: Anchor,
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectionLayout
        eyebrow="Presencia nacional"
        title="Ingeniería con estándares globales y visión local"
        subtitle="Explora las áreas principales del sitio. Cada sección está pensada para comunicar con claridad técnica y cercanía humana."
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <Card
              key={item.href}
              className="border-border/80 transition-shadow hover:shadow-md"
            >
              <CardHeader className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted text-primary">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={item.href}>Ir a la sección</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
