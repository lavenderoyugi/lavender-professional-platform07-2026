export type Product = {
  id: string;
  slug: string;

  title: string;
  description: string;

  price: string;

  category: string;
  country: string;

  images: string[];

  featured: boolean;

  condition: string;

  story?: string;

  dimensions?: string;

  materials?: string;

  year?: string;

 vinted: string;
leboncoin: string;
status: "available" | "sold";
};

export const products: Product[] = [
  {
    id: "fish-lamp",
    slug: "fish-lamp",

    title: "Vintage Fish Lamp",

    description:
      "A beautiful handcrafted vintage fish lamp carefully selected in France.",
      price: "€49",

    category: "Lighting",

    country: "France",
   

status: "sold",

vinted: "https://www.vinted.fr/",

leboncoin: "https://www.leboncoin.fr/",

    images: [
      "/products/fish-lamp/1.jpg",
      "/products/fish-lamp/2.jpg",
      "/products/fish-lamp/3.jpg",
      "/products/fish-lamp/4.jpg"
    ],

featured: true,

condition: "Excellent vintage condition",
  },
  {
  id: "murano-fish",

  slug: "murano-fish",

  title: "Murano Glass Fish",

  description:
    "Authentic Murano glass fish carefully sourced in France. A beautiful collectible decorative piece.",

  price: "€25",

  category: "Lighting",

  country: "France",

  status: "available",

  vinted: "https://www.vinted.fr/",

  leboncoin: "https://www.leboncoin.fr/",

  images: [
    "/products/murano-fish/1.jpg",
    "/products/murano-fish/2.jpg",
    "/products/murano-fish/3.jpg",
    "/products/murano-fish/4.jpg",
    "/products/murano-fish/5.jpg",
    "/products/murano-fish/6.jpg",
    "/products/murano-fish/7.jpg",
    "/products/murano-fish/8.jpg"
  ],

  featured: true,

  condition: "Excellent vintage condition",

  materials: "Murano Glass",

  year: "1970s",
}
];