"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
};

export default function ProductsList() {
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
            <th className="py-4">Product</th>
            <th>Price</th>
            <th>Status</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-white/5"
            >
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
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}