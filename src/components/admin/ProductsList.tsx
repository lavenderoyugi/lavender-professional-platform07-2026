"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  description?: string;
  image_url?: string;
};
export default function ProductsList({
  onEdit,
}: {
  onEdit: (product: Product) => void;
}) {
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
    <th className="py-4">Image</th>
    <th>Product</th>
    <th>Price</th>
    <th>Status</th>
    <th>Category</th>
    <th>Actions</th>
  </tr>
</thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-white/5"
            >
              <td className="py-4">
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

<td className="py-6 font-semibold">
  {product.name}
</td>

              <td>
                €{product.price}
              </td>

              <td>
                {product.status}
              </td>

              <td>
                {product.category}
              </td>
              <td className="space-x-2">
  <button
    onClick={() => onEdit(product)}
    className="rounded-lg border border-white/20 px-4 py-2 hover:border-violet-500"
  >
    Edit
  </button>

  <button
    onClick={() => deleteProduct(product.id)}
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