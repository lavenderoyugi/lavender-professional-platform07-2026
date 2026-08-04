"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    products: 0,
    available: 0,
    sold: 0,
    revenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const products = data.length;

    const available = data.filter(
      (item) => item.status === "Available"
    ).length;

    const sold = data.filter(
      (item) => item.status === "Sold"
    ).length;

    const revenue = data.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    setStats({
      products,
      available,
      sold,
      revenue,
    });
  }

  return (
    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-2xl border border-violet-500/30 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Products
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {stats.products}
        </h2>
      </div>

      <div className="rounded-2xl border border-green-500/30 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Available
        </p>

        <h2 className="mt-3 text-4xl font-bold text-green-400">
          {stats.available}
        </h2>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Sold
        </p>

        <h2 className="mt-3 text-4xl font-bold text-red-400">
          {stats.sold}
        </h2>
      </div>

      <div className="rounded-2xl border border-yellow-500/30 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Revenue
        </p>

        <h2 className="mt-3 text-4xl font-bold text-yellow-400">
          €{stats.revenue}
        </h2>
      </div>

    </div>
  );
}