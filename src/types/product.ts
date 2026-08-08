export interface Product {
  id: string;

  slug?: string | null;

  // Names
  name?: string;
  title?: string;

  description?: string;

  // Category
  category?: string;

  // Pricing
  price: number | string;
  purchase_price?: number | string | null;
  listing_price?: number | string | null;
  selling_price?: number | string | null;

  // Inventory
  stock?: number;
  sku?: string;

  // Status
  status: "Available" | "Sold" | "available" | "sold";

  featured?: boolean;
  published?: boolean;

  // Images
  image_url?: string;
  images?: string[];
  gallery?: string[];

  // Details
  condition?: string;
  brand?: string;
  material?: string;
  dimensions?: string;
  year?: string;
  origin_country?: string;
  country?: string;

  weight?: number | string;
  color?: string;
  style?: string;
  manufacturer?: string;

  // Marketplace
  vinted?: string;
  leboncoin?: string;

  // Story
  story?: string;
}