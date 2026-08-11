"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/product";


type Props = {
  onEdit: (product: Product) => void;
};

export default function ProductsList({
  onEdit,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data || []);
  }
  async function deleteProduct(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  loadProducts();
}

  return (
    <div className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            Products
          </h2>

          <p className="mt-2 text-gray-400">
            Products stored in Supabase
          </p>
        </div>

      </div>

      <table className="w-full">

  <thead>
  <tr className="border-b border-white/10 text-left text-gray-400">
    <th className="px-4 py-4 w-24">Image</th>
    <th className="px-4 py-4">Product</th>
    <th className="px-4 py-4 w-32">Price</th>
    <th className="px-4 py-4 w-36">Status</th>
    <th className="px-4 py-4 w-40">Category</th>
    <th className="px-4 py-4 w-40 text-center">Actions</th>
  </tr>
</thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-white/5"
            >
              <td className="px-4 py-4 align-middle">
  {product.image_url ? (
    <img
      src={product.image_url}
      alt={product.name}
      className="h-16 w-16 rounded-lg object-cover border border-white/10"
    />
  ) : (
    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 text-xs text-gray-500">
      No Image
    </div>
  )}
</td>

<td className="px-4 py-4 font-semibold align-middle max-w-md">
  {product.name}
</td>

              <td className="px-4 py-4 font-semibold text-yellow-400 whitespace-nowrap">
  €{Number(product.selling_price || product.price).toFixed(2)}
</td>

              <td className="px-4 py-4">
  <span
    className={`rounded-full px-3 py-1 text-sm font-medium ${
      product.status === "Available"
        ? "bg-green-500/20 text-green-400"
        : "bg-red-500/20 text-red-400"
    }`}
  >
    {product.status}
  </span>
</td>
              <td className="px-4 py-4">
  <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-300">
    {product.category}
  </span>
</td>
              <td className="space-x-2">
  <button
    onClick={() => onEdit(product)}
    className="rounded-lg border border-white/20 px-4 py-2 hover:border-violet-500"
  >
    Edit
  </button>

  <button
onClick={() => deleteProduct(product.id!)}
    className="rounded-lg border border-red-500 px-4 py-2 text-red-400 transition hover:bg-red-600 hover:text-white"
  >
    Delete
  </button>
</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}