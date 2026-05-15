import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SectionLayout } from "@/components/layout/section-layout";
import { TecnologiaDisclosureSection } from "@/components/tecnologia/tecnologia-disclosure-section";
import { EquipoIsomaqSlider } from "@/components/tecnologia/equipo-isomaq-slider";
import { MachineryFichaCard } from "@/components/tecnologia/machinery-ficha-card";
import { TecnologiaHero } from "@/components/tecnologia/tecnologia-hero";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Capacidades y Tecnología",
  description:
    "Equipo HAAS y Doosan, tornos paralelos, Bridgeport, rectificado, electroerosión, CMM y comparador óptico Mitutoyo; CAD/CAM Solid Edge · MasterCAM · SurfCAM.",
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

  return (
    <>
      <TecnologiaHero />
      <SectionLayout contentClassName="max-w-6xl">
        <TecnologiaDisclosureSection
          id="manufactura"
          className="scroll-mt-24"
          summary={
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Servicios y materiales
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                Servicios especializados y materiales de trabajo
              </h2>
            </div>
          }
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-10 border-y border-border py-10 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-border sm:py-12">
              {manufactura.procesos.map((proc, i) => (
                <div
                  key={proc.titulo}
                  className={i === 0 ? "sm:pr-8 lg:pr-12" : "sm:pl-8 lg:pl-12"}
                >
                  <h3 className="border-b border-border pb-2 text-base font-semibold tracking-tight text-foreground">
                    {proc.titulo}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {proc.descripcion}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-12">
              <h2 className="text-sm font-semibold text-foreground">
                Materiales de trabajo
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
                {manufactura.materiales.map((bloque) => (
                  <div
                    key={bloque.titulo}
                    className="min-w-0 md:px-4 first:md:pl-0 last:md:pr-0 lg:px-5"
                  >
                    <h3 className="text-sm font-semibold text-foreground">
                      {bloque.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {bloque.detalle}
                    </p>
                    {bloque.imagenes && bloque.imagenes.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2.5 sm:gap-3">
                        {bloque.imagenes.map((img) => (
                          <figure
                            key={img.url}
                            className="flex w-14 flex-col items-center sm:w-[4.25rem]"
                          >
                            <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-border bg-muted/50 sm:size-[4.25rem]">
                              <Image
                                src={img.url}
                                alt={
                                  img.etiqueta
                                    ? `${img.etiqueta} · ${bloque.titulo}`
                                    : bloque.titulo
                                }
                                width={68}
                                height={68}
                                sizes="(max-width: 640px) 56px, 68px"
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            {img.etiqueta ? (
                              <figcaption className="mt-1 max-w-14 text-center text-[10px] font-medium leading-snug text-muted-foreground sm:max-w-[4.25rem] sm:text-[11px]">
                                {img.etiqueta}
                              </figcaption>
                            ) : null}
                          </figure>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TecnologiaDisclosureSection>

        <TecnologiaDisclosureSection
          id="equipo"
          className="mt-14 scroll-mt-24 border-t border-border pt-12"
          summary={
            <h2 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
              Equipo con el que contamos
            </h2>
          }
        >
          <ol className="list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-muted-foreground marker:font-medium marker:text-primary sm:pl-6 sm:text-[0.9375rem]">
            {companyInfo.equipoInventario.map((item) => (
              <li key={item.descripcion} className="pl-1.5">
                {item.descripcion}
              </li>
            ))}
          </ol>
        </TecnologiaDisclosureSection>

        <TecnologiaDisclosureSection
          id="equipo-galeria"
          className="mt-14 scroll-mt-24 border-t border-border pt-12"
          summary={
            <h2 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
              Galería de equipo
            </h2>
          }
        >
          <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-y border-border">
            <EquipoIsomaqSlider />
          </div>
        </TecnologiaDisclosureSection>

        <TecnologiaDisclosureSection
          id="cnc"
          className="mt-14 scroll-mt-24"
          summary={
            <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Centros verticales (CNC)
            </h2>
          }
        >
          <>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Inventario consolidado HAAS VF y línea Doosan DNM; cantidades de
              herramientas y RPM según ficha técnica de equipo.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cnc.map((item) => (
                <MachineryFichaCard key={item.id} item={item} />
              ))}
            </div>
          </>
        </TecnologiaDisclosureSection>

        <TecnologiaDisclosureSection
          id="torneado"
          className="mt-20 scroll-mt-24"
          summary={
            <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Torneado (CNC)
            </h2>
          }
        >
          <>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Centro HAAS ST-1 (referencia cruzada LT-1/ST-1) y ST-10Y con eje Y
              horizontal.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {torneado.map((item) => (
                <MachineryFichaCard key={item.id} item={item} />
              ))}
            </div>
          </>
        </TecnologiaDisclosureSection>

        <TecnologiaDisclosureSection
          id="convencional"
          className="mt-20 scroll-mt-24"
          summary={
            <h2 className="border-b border-border pb-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Maquinaria convencional
            </h2>
          }
        >
          <>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Fresado Bridgeport, tornos paralelos con capacidad declarada entre
              puntos y volteo, y rectificadoras cilíndricas universales.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {convencional.map((item) => (
                <MachineryFichaCard key={item.id} item={item} />
              ))}
            </div>
          </>
        </TecnologiaDisclosureSection>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-border pt-10">
          <Button asChild>
            <Link href="/contacto">Solicitar cotización de proyecto especial</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/nosotros">Perfil corporativo y trayectoria</Link>
          </Button>
        </div>
      </SectionLayout>
    </>
  );
}
