import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { SectionLayout } from "@/components/layout/section-layout";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Recursos de imágenes · Equipo",
  description:
    "Enlaces por máquina para abrir fichas oficiales y obtener fotografías según política de cada fabricante o recurso indicado.",
};

export default function RecursosImagenesEquipoPage() {
  const items = companyInfo.equipoInventario;

  return (
    <SectionLayout
      eyebrow="Capacidades y tecnología"
      title="Recursos para imágenes de equipo"
      subtitle="Un enlace por partida: abre la página indicada y descarga o guarda la imagen según permita el sitio (clic derecho · guardar imagen, o material del fabricante). Revisa siempre los términos de uso del proveedor."
      contentClassName="max-w-3xl"
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Esta lista facilita la recopilación de material para presentaciones. No
        reemplaza la autorización del titular de los derechos cuando la
        distribución comercial lo requiera.{" "}
        <Link
          href="/tecnologia#equipo"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Volver al inventario en Capacidades y tecnología
        </Link>
        .
      </p>

      <ol className="mt-10 list-decimal space-y-8 pl-5 marker:font-semibold marker:text-primary sm:pl-6">
        {items.map((item, i) => (
          <li
            key={`${i}-${item.descripcion.slice(0, 40)}`}
            className="pl-2 text-foreground"
          >
            <p className="text-[0.9375rem] leading-relaxed text-foreground">
              {item.descripcion}
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild variant="secondary" size="sm" className="w-fit">
                <a
                  href={item.recurso.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  {item.recurso.etiqueta}
                </a>
              </Button>
              <span className="font-mono text-[11px] text-muted-foreground break-all">
                {item.recurso.url}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 border-t border-border pt-8">
        <Button asChild variant="outline">
          <Link href="/tecnologia#equipo">Ir a la página de tecnología</Link>
        </Button>
      </div>
    </SectionLayout>
  );
}
