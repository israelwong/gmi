"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Product, ProductCategory } from "@/types/product";
import { PRODUCT_CATEGORIES } from "@/types/product";

import { ProductCard } from "./ProductCard";

type ProductsProps = {
  products: Product[];
};

const FILTERS: Array<"Todos" | ProductCategory> = [
  "Todos",
  ...PRODUCT_CATEGORIES,
];

export function Products({ products }: ProductsProps) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");

  const list = useMemo(() => {
    if (filter === "Todos") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  return (
    <div className="space-y-10">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrar por categoría"
      >
        {FILTERS.map((f) => (
          <Button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-8 text-center text-sm text-muted-foreground">
          No hay productos en esta categoría.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((product, index) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                priority={index < 9}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
