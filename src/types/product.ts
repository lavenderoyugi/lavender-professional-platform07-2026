export interface Product {
  // Database
  id?: string;
  created_at?: string;

  // URLs
  slug?: string | null;

  // Basic Information
  name?: string;
  title?: string;
  description?: string;
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
  status: string;
  is_featured?: boolean;
  published?: boolean;

  // Images
  image_url?: string;
  gallery?: string[];

  // Details
  condition?: string;
  brand?: string;
  manufacturer?: string;
  material?: string;
  dimensions?: string;
  year?: string;
  origin_country?: string;
  weight?: number | string;
  color?: string;
  style?: string;

  // Marketplace
  vinted?: string;
  leboncoin?: string;

  // Optional
  story?: string;
}