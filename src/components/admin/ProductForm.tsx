"use client";

import { ChangeEvent, useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import type { Product } from "@/types/product";

const CATEGORY_OPTIONS = [
  "Decoration",
  "Kitchen",
  "Lighting",
  "Glassware",
  "Ceramics",
  "Furniture",
  "Artwork",
  "Collectibles",
  "Textiles",
  "Garden",
  "Christmas",
  "Books",
  "Other",
];

const CONDITION_OPTIONS = [
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Needs Restoration",
];

const MATERIAL_OPTIONS = [
  "Ceramic",
  "Porcelain",
  "Stoneware",
  "Glass",
  "Crystal",
  "Wood",
  "Metal",
  "Copper",
  "Brass",
  "Iron",
  "Marble",
  "Mixed",
  "Other",
];

const COUNTRY_OPTIONS = [
  "France",
  "Italy",
  "Japan",
  "England",
  "Germany",
  "Belgium",
  "Netherlands",
  "Spain",
  "Portugal",
  "Mexico",
  "Unknown",
];

const BRAND_OPTIONS = [
  "",
  "Vallauris",
  "Digoin",
  "Sarreguemines",
  "Limoges",
  "Murano",
  "Tonala",
  "Si Choisans",
  "Unknown",
];
type Props = {
  selectedProduct: Product | null;
};

const emptyProduct: Product = {
  name: "",
  title: "",
  description: "",
  category: "Decoration",

  price: 0,
purchase_price: 0,
listing_price: 0,
selling_price: 0,
weight: 0,

  stock: 1,
  sku: "",

  status: "Available",

  image_url: "",
  gallery: [],

  brand: "",
  manufacturer: "",
  material: "",
  condition: "",
  dimensions: "",
  year: "",
  origin_country: "",

  color: "",
  style: "",

  vinted: "",
  leboncoin: "",

  is_featured: false,
  published: true,

 
};

export default function ProductForm({
  selectedProduct,
}: Props) {
  const [product, setProduct] = useState<Product>(emptyProduct);

  const [images, setImages] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
  if (selectedProduct) {
    setProduct({
      ...emptyProduct,
      ...selectedProduct,
      gallery: selectedProduct.gallery || [],
    });

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

  } else {
    setProduct(emptyProduct);
    setImages([]);
  }
}, [selectedProduct]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };


  const handleCheckbox = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  async function uploadImages() {
  if (images.length === 0) return [];

  const uploadedUrls: string[] = [];

  for (const image of images) {

    const fileName =
      `${Date.now()}-${Math.random()}-${image.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, image);

    if (error) {
      console.error(error);
      continue;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    uploadedUrls.push(publicUrl);
  }

  return uploadedUrls;
}

async function saveProduct() {
  setSaving(true);

  try {

    let gallery = product.gallery || [];

    if (images.length > 0) {
      gallery = await uploadImages();
    }

    const productToSave = {
  name: product.name,
 price:
  product.selling_price === ""
    ? 0
    : Number(product.selling_price),
  category: product.category,
  status: product.status,
  description: product.description,

  image_url: gallery[0] || product.image_url,
  gallery,

  slug: product.slug,

  purchase_price:
  product.purchase_price === ""
    ? null
    : Number(product.purchase_price),
 listing_price:
  product.listing_price === ""
    ? null
    : Number(product.listing_price),
 selling_price:
  product.selling_price === ""
    ? null
    : Number(product.selling_price),


 stock: product.stock ?? 1,
  brand: product.brand,
  manufacturer: product.manufacturer,
  material: product.material,

  condition: product.condition,
  dimensions: product.dimensions,
  year: product.year,

  origin_country: product.origin_country,
weight:
  product.weight === ""
    ? null
    : Number(product.weight),

  color: product.color,
  style: product.style,

  sku: product.sku,

  is_featured: product.is_featured,
  published: product.published,

  vinted: product.vinted,
  leboncoin: product.leboncoin,
};
    if (product.id) {
      const { error } = await supabase
        .from("products")
        .update(productToSave)
        .eq("id", product.id);

      if (error) throw error;

    } else {

      const { error } = await supabase
        .from("products")
        .insert(productToSave);

      if (error) throw error;
    }

    alert("Product saved successfully.");

  } catch (error: any) {
  console.error("SAVE PRODUCT ERROR:");
  console.log(error);
console.log(JSON.stringify(error, null, 2));

  if (error?.message) {
    alert(error.message);
  } else {
    alert(JSON.stringify(error));
  }

  } finally {
    setSaving(false);
  }
}
  return (
  <form 
  ref={formRef}
  className="mt-12 rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-xl">

    <div className="mb-10">
      <h2 className="text-3xl font-bold text-white">
        {product.id ? "Edit Product" : "Add Product"}
      </h2>

      <p className="mt-2 text-gray-400">
        Create and manage your Lavender Finds inventory.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

      <h3 className="mb-6 text-xl font-semibold text-violet-400">
        Product Information
      </h3>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={product.name || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
            placeholder="Vintage Murano Fish"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Category
          </label>

       <select
  name="category"
  value={product.category || ""}
  onChange={handleChange}
  className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
>
  {CATEGORY_OPTIONS.map((category) => (
    <option
      key={category}
      value={category}
      className="bg-zinc-900"
    >
      {category}
    </option>
  ))}
</select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Status
          </label>

          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            SKU
          </label>

          <input
            type="text"
            name="sku"
            value={product.sku || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
            placeholder="AUTO-001"
          />
        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm text-gray-300">
          Description
        </label>

        <textarea
          rows={6}
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
          placeholder="Describe your product..."
        />

      </div>

    </div>
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">

  <h3 className="mb-6 text-xl font-semibold text-violet-400">
    Pricing
  </h3>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Purchase Price (€)
      </label>

      <input
        type="number"
        name="purchase_price"
        value={product.purchase_price ?? ""}
        onChange={handleNumberChange}
        className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Listing Price (€)
      </label>

      <input
        type="number"
        name="listing_price"
        value={product.listing_price ?? ""}
        onChange={handleNumberChange}
        className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Selling Price (€)
      </label>

      <input
        type="number"
        name="selling_price"
        value={product.selling_price ?? ""}
        onChange={handleNumberChange}
        className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Current Price (€)
      </label>

      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleNumberChange}
        className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
      />
    </div>

  </div>

</div>

{/* =========================
    Inventory
========================= */}

<div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">

  <h3 className="mb-6 text-xl font-semibold text-violet-400">
    Inventory
  </h3>

  <div className="grid gap-6 md:grid-cols-2">

    {/* Stock */}

    <div>

      <label className="mb-2 block text-sm text-gray-300">
        Stock Quantity
      </label>

      <input
        type="number"
        name="stock"
        value={product.stock ?? 0}
        onChange={handleNumberChange}
        className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
      />

    </div>

    {/* SKU */}

    <div>

      <label className="mb-2 block text-sm text-gray-300">
        SKU
      </label>

      <div className="flex gap-2">

        <input
          type="text"
          name="sku"
          value={product.sku || ""}
          onChange={handleChange}
          className="flex-1 rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
          placeholder="AUTO-001"
        />

        <button
          type="button"
          onClick={() =>
            setProduct((prev) => ({
              ...prev,
              sku:
                "LF-" +
                Math.random()
                  .toString(36)
                  .substring(2, 8)
                  .toUpperCase(),
            }))
          }
          className="rounded-xl bg-violet-600 px-4 text-white hover:bg-violet-500"
        >
          Generate
        </button>

      </div>

    </div>

  </div>

  {/* Stock Indicator */}

  <div className="mt-6">

    <label className="mb-3 block text-sm text-gray-300">
      Stock Status
    </label>

    <div className="flex items-center gap-3">

      {Number(product.stock) > 10 && (
        <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
          In Stock
        </span>
      )}

      {Number(product.stock) > 0 &&
        Number(product.stock) <= 10 && (
          <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-black">
            Low Stock
          </span>
        )}

      {Number(product.stock) === 0 && (
        <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
          Out of Stock
        </span>
      )}

    </div>

  </div>

</div>
{/* Product Details */}

<div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">

  <h3 className="mb-6 text-xl font-semibold text-violet-400">
    Product Details
  </h3>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"></div>

  <div>

<label className="mb-2 block text-sm text-gray-300">
Brand
</label>

<select
  name="brand"
  value={product.brand || ""}
  onChange={handleChange}
  className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
>
  {BRAND_OPTIONS.map((brand) => (
    <option
      key={brand}
      value={brand}
      className="bg-zinc-900"
    >
      {brand || "Select brand"}
    </option>
  ))}
</select>

</div>

<div>

<label className="mb-2 block text-sm text-gray-300">
Manufacturer
</label>

<input
type="text"
name="manufacturer"
value={product.manufacturer || ""}
onChange={handleChange}
className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
/>

</div>
<div>

<label className="mb-2 block text-sm text-gray-300">
Material
</label>

<select
  name="material"
  value={product.material || ""}
  onChange={handleChange}
  className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
>
  {MATERIAL_OPTIONS.map((material) => (
    <option
      key={material}
      value={material}
      className="bg-zinc-900"
    >
      {material}
    </option>
  ))}
</select>

</div>

<div>

<label className="mb-2 block text-sm text-gray-300">
Color
</label>

<input
type="text"
name="color"
value={product.color || ""}
onChange={handleChange}
className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
/>

</div>

<div>

<label className="mb-2 block text-sm text-gray-300">
Style
</label>

<input
type="text"
name="style"
value={product.style || ""}
onChange={handleChange}
className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
/>

</div>
<div>

<label className="mb-2 block text-sm text-gray-300">
Condition
</label>

<select
  name="condition"
  value={product.condition || ""}
  onChange={handleChange}
  className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
>
  {CONDITION_OPTIONS.map((condition) => (
    <option
      key={condition}
      value={condition}
      className="bg-zinc-900"
    >
      {condition}
    </option>
  ))}
</select>

</div>

<div>

<label className="mb-2 block text-sm text-gray-300">
Dimensions
</label>

<input
type="text"
name="dimensions"
value={product.dimensions || ""}
onChange={handleChange}
className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
/>

</div>
<div>

<label className="mb-2 block text-sm text-gray-300">
Weight
</label>

<input
type="number"
name="weight"
value={product.weight ?? ""}
onChange={handleNumberChange}
className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
/>

</div>
<div>

<label className="mb-2 block text-sm text-gray-300">
Year
</label>

<input
type="text"
name="year"
value={product.year || ""}
onChange={handleChange}
className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
/>

</div>
<div>

<label className="mb-2 block text-sm text-gray-300">
Country
</label>

<select
  name="origin_country"
  value={product.origin_country || ""}
  onChange={handleChange}
  className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white focus:border-violet-500 focus:outline-none"
>
  {COUNTRY_OPTIONS.map((country) => (
    <option
      key={country}
      value={country}
      className="bg-zinc-900"
    >
      {country}
    </option>
  ))}
</select>
</div>

  </div>

{/* Image Management */}

<div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">

  <h3 className="mb-6 text-xl font-semibold text-violet-400">
    Product Images
  </h3>

  <label className="mb-3 block text-sm text-gray-300">
    Upload Images
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => {
      if (!e.target.files) return;

      setImages(Array.from(e.target.files));
    }}
    className="block w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
  />

  {images.length > 0 && (

    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">

      {images.map((image, index) => (

        <div
          key={index}
          className="overflow-hidden rounded-xl border border-white/10"
        >

          <img
            src={URL.createObjectURL(image)}
            alt=""
            className="h-40 w-full object-cover"
          />

          <div className="bg-black/40 p-2 text-center text-xs text-gray-300">
            {image.name}
          </div>

        </div>

      ))}

    </div>

  )}

</div>
<div className="mt-10 flex justify-end gap-4">

  <button
    type="button"
    onClick={() => {
      setProduct(emptyProduct);
      setImages([]);
    }}
    className="rounded-xl border border-white/20 px-6 py-3 text-white hover:border-red-500"
  >
    Reset
  </button>

  <button
    type="button"
    onClick={saveProduct}
    disabled={saving}
    className="rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
  >
    {saving
      ? "Saving..."
      : product.id
      ? "Update Product"
      : "Save Product"}
  </button>

</div>
  </form>
);
}