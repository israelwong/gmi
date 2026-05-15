import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SectionLayout } from "@/components/layout/section-layout";
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
      <section id="manufactura" className="scroll-mt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Procesos y materiales (referencia técnica)
        </p>
        <div className="mt-6 space-y-12">
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

          <div className="border-t border-border pt-12">
            <h2 className="text-sm font-semibold text-foreground">
              Materiales de trabajo
            </h2>
            <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm ring-1 ring-border/35 sm:p-6 md:p-7">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
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
                            <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-border bg-muted/50 shadow-sm sm:size-[4.25rem]">
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
        </div>
      </section>

      <section
        id="equipo"
        className="mt-14 scroll-mt-24 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm"
      >
        <h2 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
          Equipo con el que contamos
        </h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Imágenes para presentaciones:{" "}
            <Link
              href="/tecnologia/recursos-imagenes"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              página de enlaces por equipo
            </Link>
            .
          </p>
        </div>
        <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-muted-foreground marker:font-medium marker:text-primary sm:pl-6 sm:text-[0.9375rem]">
          {companyInfo.equipoInventario.map((item) => (
            <li key={item.descripcion} className="pl-1.5">
              {item.descripcion}
            </li>
          ))}
        </ol>
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
