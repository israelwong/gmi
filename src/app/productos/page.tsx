import type { Metadata } from "next";

import { SectionLayout } from "@/components/layout/section-layout";
import { Products } from "@/components/products/Products";
import type { Product } from "@/types/product";

import catalog from "@/data/products.json";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo de sistemas modulares, almacenamiento y edificación industrial Grupo GMI.",
};

const products = catalog as Product[];

export default function ProductosPage() {
  return (
    <SectionLayout
      eyebrow="Catálogo técnico"
      title="Productos y sistemas"
      subtitle="Referencias de línea con SKU y categoría. Las fichas se actualizarán con la sesión fotográfica; las imágenes actuales son de alta calidad (placeholder industrial)."
    >
      <Products products={products} />
    </SectionLayout>
  );
}
