import { products } from "./products";

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(category: string, currentSlug: string) {
  return products.filter(
    (product) =>
      product.category === category &&
      product.slug !== currentSlug
  );
}