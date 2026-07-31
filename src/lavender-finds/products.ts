export type Product = {
  id: string;
  slug: string;

  title: string;
  description: string;

  category: string;
  country: string;

  images: string[];

  featured: boolean;

  condition: string;

  story?: string;

  dimensions?: string;

  materials?: string;

  year?: string;

  vinted?: string;
  leboncoin?: string;
};

export const products: Product[] = [
  {
    id: "fish-lamp",
    slug: "fish-lamp",

    title: "Vintage Fish Lamp",

    description:
      "A beautiful handcrafted vintage fish lamp carefully selected in France.",

    category: "Lighting",

    country: "France",

    images: [
      "/products/fish-lamp/1.jpg",
      "/products/fish-lamp/2.jpg",
      "/products/fish-lamp/3.jpg",
      "/products/fish-lamp/4.jpg"
    ],

featured: true,

condition: "Excellent vintage condition",
  }
];