import type { Metadata } from "next";
import Link from "next/link";

import { SectionLayout } from "@/components/layout/section-layout";
import { MachineryFichaCard } from "@/components/tecnologia/machinery-ficha-card";
import { MetrologiaFichaCard } from "@/components/tecnologia/metrologia-ficha-card";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Capacidades y Tecnología",
  description:
    "Inventario de maquinaria GMI: centros HAAS y Doosan, tornos CNC, Bridgeport y equipamiento de taller.",
};

export default function TecnologiaPage() {
  const cnc = companyInfo.maquinaria.filter((m) => m.grupoCapacidad === "cnc");
  const torneado = companyInfo.maquinaria.filter(
    (m) => m.grupoCapacidad === "torneado",
  );
  const metrologia = companyInfo.capacidades.find((c) => c.id === "metrologia");

  return (
    <SectionLayout
      eyebrow="Inventario de taller"
      title="Capacidades y tecnología"
      subtitle="Especificaciones orientativas del parque actual; los valores se confirman en hoja de proceso y orden de trabajo."
      contentClassName="max-w-6xl"
    >
      <section id="cnc" className="scroll-mt-24">
        <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Maquinado CNC
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Centros verticales HAAS y Doosan, fresado convencional Bridgeport y
          rectificado para acabados y ajustes dimensionales.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cnc.map((item) => (
            <MachineryFichaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="torneado" className="mt-20 scroll-mt-24">
        <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Torneado de precisión
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Torno CNC con configuraciones HAAS y capacidad convencional en tornos
          paralelos para series y repuestos.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {torneado.map((item) => (
            <MachineryFichaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="metrologia" className="mt-20 scroll-mt-24">
        <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Metrología
        </h2>
        {metrologia ? (
          <div className="mt-8">
            <MetrologiaFichaCard
              cap={{
                titulo: metrologia.titulo,
                descripcion: metrologia.descripcion,
                detalle: metrologia.detalle,
              }}
            />
          </div>
        ) : null}
      </section>

      <div className="mt-16 flex flex-wrap gap-4 border-t border-border pt-10">
        <Button asChild>
          <Link href="/contacto">Solicitar cotización de proyecto especial</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/nosotros">Conocer nuestra historia</Link>
        </Button>
      </div>
    </SectionLayout>
  );
}
