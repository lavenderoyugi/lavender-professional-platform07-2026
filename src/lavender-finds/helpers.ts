import { products } from "./products";

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}