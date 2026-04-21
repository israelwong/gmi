export const PRODUCT_CATEGORIES = [
  "Edificación",
  "Almacenamiento",
  "Modular",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  sku: string;
  image_url: string;
};
