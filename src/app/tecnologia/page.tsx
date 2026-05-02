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
    "Parque tecnológico GMI: CNC HAAS y Doosan, tornos paralelos y CNC, Bridgeport, rectificado cilíndrico, metrología CMM y comparador óptico Mitutoyo; CAD/CAM Solid Edge · MasterCAM · SurfCAM.",
};

export default function TecnologiaPage() {
  const { manufactura } = companyInfo;
  const cnc = companyInfo.maquinaria.filter((m) => m.grupoCapacidad === "cnc");
  const torneado = companyInfo.maquinaria.filter(
    (m) => m.grupoCapacidad === "torneado",
  );
  const convencional = companyInfo.maquinaria.filter(
    (m) => m.grupoCapacidad === "convencional",
  );
  const metrologia = companyInfo.capacidades.find((c) => c.id === "metrologia");

  return (
    <SectionLayout
      eyebrow="Inventario de taller"
      title="Capacidades y tecnología"
      subtitle={`${manufactura.especialidad} Sectores: ${manufactura.sectoresExperiencia}`}
      contentClassName="max-w-6xl"
    >
      <section
        id="manufactura"
        className="scroll-mt-24 rounded-xl border border-border bg-muted/30 p-6 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Procesos y materiales (referencia técnica)
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Servicios especializados
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {manufactura.procesos.map((line) => (
                <li key={line}>— {line}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            {manufactura.materiales.map((bloque) => (
              <div key={bloque.titulo}>
                <h3 className="text-sm font-semibold text-foreground">
                  {bloque.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {bloque.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cnc" className="mt-14 scroll-mt-24">
        <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Centros verticales (CNC)
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Inventario consolidado HAAS VF y línea Doosan DNM; cantidades de
          herramientas y RPM según ficha técnica de equipo.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cnc.map((item) => (
            <MachineryFichaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="torneado" className="mt-20 scroll-mt-24">
        <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Torneado (CNC)
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Centro HAAS ST-1 (referencia cruzada LT-1/ST-1) y ST-10Y con eje Y
          horizontal.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {torneado.map((item) => (
            <MachineryFichaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="convencional" className="mt-20 scroll-mt-24">
        <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Maquinaria convencional
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Fresado Bridgeport, tornos paralelos con capacidad declarada entre
          puntos y volteo, y rectificadoras cilíndricas universales.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {convencional.map((item) => (
            <MachineryFichaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="metrologia" className="mt-20 scroll-mt-24">
        <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Metrología y control dimensional
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

      <section id="ingenieria" className="mt-20 scroll-mt-24">
        <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Ingeniería y CAD/CAM
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Soporte desde modelado hasta generación de trayectorias cuando el
          proyecto lo requiere.
        </p>
        <ul className="mt-6 grid gap-3 sm:max-w-md">
          {companyInfo.softwareCadCam.map((sw) => (
            <li
              key={sw}
              className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-primary"
            >
              {sw}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex flex-wrap gap-4 border-t border-border pt-10">
        <Button asChild>
          <Link href="/contacto">Solicitar cotización de proyecto especial</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/nosotros">Perfil corporativo y trayectoria</Link>
        </Button>
      </div>
    </SectionLayout>
  );
}
