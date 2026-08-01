export type Product = {
  id: string;
  slug: string;

  title: string;
  description: string;

  images: string[];

  price: string;
  condition: string;
  category: string;
  country: string;

  vintedLink?: string;
  leboncoinLink?: string;
};