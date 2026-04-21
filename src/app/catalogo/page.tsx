import type { Metadata } from "next";

import { CatalogDataTable } from "@/components/catalog/catalog-data-table";
import { SectionLayout } from "@/components/layout/section-layout";
import type { Product } from "@/types/product";

import catalog from "@/data/products.json";

export const metadata: Metadata = {
  title: "Directorio técnico",
  description:
    "Buscador técnico de productos Grupo GMI: SKU, categoría y enlaces a ficha o solicitud de información.",
};

const products = catalog as Product[];

export default function CatalogoPage() {
  return (
    <SectionLayout
      eyebrow="Consulta rápida"
      title="Directorio técnico de productos"
      subtitle="Tabla densa para localizar claves, nombres y categorías. Use la búsqueda y el filtro; la paginación escala a grandes volúmenes de datos."
      contentClassName="max-w-7xl"
    >
      <CatalogDataTable data={products} />
    </SectionLayout>
  );
}
