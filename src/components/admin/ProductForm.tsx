"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
type Product = {
  id?: string;

  // Basic
  name: string;
  description: string;
  category: string;

  // Prices
  price: number | string;
  purchase_price: number | string;
  listing_price: number | string;
  selling_price: number | string;

  // Inventory
  stock: number;
  sku: string;

  // Status
  status: "Available" | "Sold";
  // Images
image_url: string;
gallery: string[];

  // Product Information
  condition: string;
  brand: string;
  manufacturer: string;
  material: string;
  dimensions: string;
  year: string;
  origin_country: string;

  // Extra Details
  weight: number | string;
  color: string;
  style: string;

  // Marketplace
  vinted: string;
  leboncoin: string;

  // Visibility
  featured: boolean;
  published: boolean;
};

export default function ProductForm({
  selectedProduct,
}: {
  selectedProduct: any;
}) {
    const [product, setProduct] = useState<Product>({
  name: "",
  description: "",

  category: "Decoration",

  price: "",
  purchase_price: "",
  listing_price: "",
  selling_price: "",

  stock: 1,
  sku: "",

  status: "Available",
  image_url: "",
gallery: [],

  condition: "",
  brand: "",
  manufacturer: "",
  material: "",
  dimensions: "",
  year: "",
  origin_country: "",

  weight: "",
  color: "",
  style: "",

  vinted: "",
  leboncoin: "",

  featured: false,
  published: true,
});
const [images, setImages] = useState<File[]>([]);
useEffect(() => {
  if (!selectedProduct) return;

  setProduct({
    id: selectedProduct.id,

    name: selectedProduct.name || "",
    description: selectedProduct.description || "",

    category: selectedProduct.category || "Decoration",

    price: selectedProduct.price || "",
    purchase_price: selectedProduct.purchase_price || "",
    listing_price: selectedProduct.listing_price || "",
    selling_price: selectedProduct.selling_price || "",

    stock: selectedProduct.stock || 1,
    sku: selectedProduct.sku || "",

    status: selectedProduct.status || "Available",

    image_url: selectedProduct.image_url || "",
    gallery: selectedProduct.gallery || [],

    condition: selectedProduct.condition || "",
    brand: selectedProduct.brand || "",
    manufacturer: selectedProduct.manufacturer || "",
    material: selectedProduct.material || "",
    dimensions: selectedProduct.dimensions || "",
    year: selectedProduct.year || "",
    origin_country: selectedProduct.origin_country || "",

    weight: selectedProduct.weight || "",
    color: selectedProduct.color || "",
    style: selectedProduct.style || "",

    vinted: selectedProduct.vinted || "",
    leboncoin: selectedProduct.leboncoin || "",

    featured: selectedProduct.featured ?? false,
    published: selectedProduct.published ?? true,
  });
}, [selectedProduct]);
const saveProduct = async () => {
    let imageUrl = "";

let imageUrls: string[] = [];

for (const image of images) {

  const cleanName = image.name.replace(/[^a-zA-Z0-9.-]/g, "_");

  const fileName = `${Date.now()}-${cleanName}`;

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    toast.error(uploadError.message);
    return;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  imageUrls.push(data.publicUrl);
}
    if (product.id) {
  const { error } = await supabase
    .from("products")
    
  .update({
  name: product.name,
  price: Number(product.price),
  category: product.category,
  status: product.status,
  description: product.description,
 image_url: imageUrls[0] || null,
gallery: imageUrls,
})
    .eq("id", product.id);

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Product updated successfully!");

  setTimeout(() => {
    window.location.reload();
  }, 2000);

  return;
}
  const { error } = await supabase
    .from("products")
    .insert([
  {
    name: product.name,
    price: Number(product.price),
    category: product.category,
    status: product.status,
    description: product.description,
    image_url: imageUrls[0] || null,
gallery: imageUrls,
  },
]);
  if (error) {
  toast.error(error.message);
  return;
}

toast.success("Product saved successfully!");

setTimeout(() => {
  window.location.reload();
}, 2000);

  setProduct({
  name: "",
  description: "",

  category: "Decoration",

  price: "",
  purchase_price: "",
  listing_price: "",
  selling_price: "",

  stock: 1,
  sku: "",

  status: "Available",

  image_url: "",
  gallery: [],

  brand: "",
  material: "",
  condition: "",
  dimensions: "",
  year: "",
  origin_country: "",

  weight: "",
  color: "",
  style: "",
  manufacturer: "",

  vinted: "",
  leboncoin: "",

  featured: false,
  published: true,
});
};
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">

      <h2 className="text-3xl font-bold">
        Add New Product
      </h2>

      <p className="mt-2 text-gray-400">
        Fill in the details below to add a new product.
      </p>

      <div className="mt-8 grid gap-6">

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Product Name
          </label>

          <input
  type="text"
  placeholder="Murano Glass Fish"
  value={product.name}
  onChange={(e) =>
    setProduct({
      ...product,
      name: e.target.value,
    })
  }
  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-violet-500"
/>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Price (€)
          </label>

          <input
            type="number"
            placeholder="25"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Category
          </label>

          <select
            value={product.category}
            onChange={(e) =>
              setProduct({
                ...product,
                category: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-violet-500"
          >
            <option>Lighting</option>
            <option>Glass</option>
            <option>Decoration</option>
            <option>Furniture</option>
            <option>Kitchen</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Status
          </label>

          <select
            value={product.status}
            onChange={(e) =>
              setProduct({
                ...product,
                status: e.target.value as "Available" | "Sold",
              })
            }
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-violet-500"
          >
            <option>Available</option>
            <option>Sold</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Describe the product..."
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>
        <div>
  <label className="mb-2 block text-sm text-gray-300">
    Product Image
  </label>

<input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  }}
  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3"
/>
</div>

        <button
  onClick={saveProduct}
  className="rounded-xl bg-violet-600 py-4 font-semibold transition hover:bg-violet-500"
>
  {product.id ? "Update Product" : "Save Product"}
</button>

      </div>

    </div>
  );
}