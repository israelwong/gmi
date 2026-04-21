import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/product";

import { Badge } from "@/components/ui/badge";
import { ProductCardImage } from "./ProductCardImage";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority }: ProductCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/90 bg-card/95 shadow-sm transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md">
      <div className="border-b border-border/80">
        <ProductCardImage
          src={product.image_url}
          alt={product.name}
          priority={priority}
        />
      </div>
      <CardHeader className="space-y-3 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-sans">
            {product.category}
          </Badge>
          <span
            className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
            title="SKU"
          >
            {product.sku}
          </span>
        </div>
        <CardTitle className="text-lg leading-snug tracking-tight">
          {product.name}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto border-t border-dashed border-border/80 bg-muted/30 px-6 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Ref. técnica · {product.id}
        </p>
      </CardFooter>
    </Card>
  );
}
