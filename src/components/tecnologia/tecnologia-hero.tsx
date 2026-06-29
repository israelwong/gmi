import {
  SplitHeroSlides,
  type SplitHeroSlide,
} from "@/components/layout/split-hero-slides";
import { companyInfo } from "@/lib/company-data";

function buildTecnologiaSlides(): SplitHeroSlide[] {
  const m = companyInfo.manufactura;
  const fallbackSrc = m.materiales[0]?.imagenes?.[0]?.url ?? "";

  return m.materiales.map((mat) => {
    const img = mat.imagenes?.[0];
    return {
      image: {
        src: img?.url ?? fallbackSrc,
        alt: img?.etiqueta ?? mat.titulo,
      },
      title: mat.titulo,
      description: mat.detalle,
      highlights: companyInfo.capacidades.map((c) => c.titulo),
    } satisfies SplitHeroSlide;
  });
}

export function TecnologiaHero() {
  return (
    <SplitHeroSlides
      slides={buildTecnologiaSlides()}
      eyebrow="Inventario de taller · Referencia técnica"
      autoRotateMs={3000}
    />
  );
}
