import {
  SplitHeroSlides,
  type SplitHeroSlide,
} from "@/components/layout/split-hero-slides";
import { companyInfo } from "@/lib/company-data";

const SLIDE_PHOTOS_BASE =
  "https://fhwfdwrrnwkbnwxabkcq.supabase.co/storage/v1/object/public/Grupo%20GMI/tecnologia-fotos-slide";

function slidePhotoForMaterial(titulo: string) {
  switch (titulo) {
    case "Aceros inoxidables":
      return {
        src: `${SLIDE_PHOTOS_BASE}/506.jpg`,
        alt: "Aceros inoxidables · pieza mecanizada",
      };
    case "Plásticos y compuestos":
      return {
        src: `${SLIDE_PHOTOS_BASE}/451.jpg`,
        alt: "Plásticos y compuestos · piezas mecanizadas",
      };
    case "Metales aleados y herramental":
      return {
        src: `${SLIDE_PHOTOS_BASE}/cobre-berilio.jpg`,
        alt: "Cobre de berilio · pieza mecanizada",
      };
    default:
      return null;
  }
}

function buildTecnologiaSlides(): SplitHeroSlide[] {
  const m = companyInfo.manufactura;
  const fallbackSrc = `${SLIDE_PHOTOS_BASE}/506.jpg`;

  return m.materiales.map((mat) => {
    const mapped = slidePhotoForMaterial(mat.titulo);
    const img = mat.imagenes?.[0];

    return {
      image: mapped ?? {
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
      autoRotateMs={3000}
    />
  );
}
