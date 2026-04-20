import type { Metadata } from "next";
import Image from "next/image";

import { SectionLayout } from "@/components/layout/section-layout";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Sistemas modulares y soluciones de almacenamiento industrial de Grupo GMI.",
};

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    alt: "Interior de almacén industrial con estanterías",
    caption: "Sistemas de almacenamiento selectivo",
  },
  {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    alt: "Estructura modular en construcción",
    caption: "Módulos estructurales para expansión rápida",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    alt: "Contenedores y patio logístico",
    caption: "Soluciones portátiles y patio de maniobras",
  },
  {
    src: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
    alt: "Puerto con carga y grúas",
    caption: "Integración con cadena logística",
  },
  {
    src: "https://images.unsplash.com/photo-1565514020126-825a2472c932?auto=format&fit=crop&w=1200&q=80",
    alt: "Pasillo de fábrica con línea de producción",
    caption: "Layouts productivos y flujo de materiales",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    alt: "Detalle de estructura metálica",
    caption: "Ingeniería de acero y conexiones",
  },
] as const;

export default function ProductosPage() {
  return (
    <SectionLayout
      eyebrow="Catálogo visual"
      title="Productos y sistemas"
      subtitle="Referencias visuales de líneas modulares, almacenamiento y proyectos llave en mano. Las imágenes son ilustrativas; el equipo GMI adapta especificaciones a su operación."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY.map((item) => (
          <li
            key={item.src}
            className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <p className="border-t border-border px-4 py-3 text-sm font-medium text-foreground">
              {item.caption}
            </p>
          </li>
        ))}
      </ul>
    </SectionLayout>
  );
}
