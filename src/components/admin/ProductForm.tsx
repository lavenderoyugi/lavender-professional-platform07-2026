"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductForm() {
    const [product, setProduct] = useState({
  name: "",
  price: "",
  category: "Lighting",
  status: "Available",
  description: "",
});
const saveProduct = async () => {
  const { error } = await supabase
    .from("products")
    .insert([
      {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        status: product.status,
        description: product.description,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Product saved!");
  window.location.reload();

  setProduct({
    name: "",
    price: "",
    category: "Lighting",
    status: "Available",
    description: "",
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
                status: e.target.value,
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

        <button
          onClick={saveProduct}
          className="rounded-xl bg-violet-600 py-4 font-semibold transition hover:bg-violet-500"
        >
          Save Product
        </button>

      </div>

    </div>
  );
}