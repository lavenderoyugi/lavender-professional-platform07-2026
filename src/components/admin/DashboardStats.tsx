"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function DashboardStats() {

const [stats, setStats] = useState({
  products: 0,
  available: 0,
  sold: 0,

  inventoryInvestment: 0,
  unsoldInventory: 0,
  potentialRevenue: 0,
  actualRevenue: 0,
  netProfit: 0,
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

    const inventoryInvestment = data.reduce(
  (sum, item) => sum + Number(item.purchase_price || 0),
  0
);
const unsoldInventory = data
  .filter((item) => item.status === "Available")
  .reduce(
    (sum, item) => sum + Number(item.purchase_price || 0),
    0
  );

const potentialRevenue = data.reduce(
  (sum, item) => sum + Number(item.listing_price || 0),
  0
);

const actualRevenue = data
  .filter((item) => item.status === "Sold")
  .reduce(
    (sum, item) => sum + Number(item.selling_price || 0),
    0
  );

const netProfit = data
  .filter((item) => item.status === "Sold")
  .reduce(
    (sum, item) =>
      sum +
      (Number(item.selling_price || 0) -
        Number(item.purchase_price || 0)),
    0
  );

setStats({
  products,
  available,
  sold,

  inventoryInvestment,
  unsoldInventory,

  potentialRevenue,
  actualRevenue,
  netProfit,
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

    <div className="rounded-2xl border border-blue-500/30 bg-white/5 p-6">
  <p className="text-sm uppercase tracking-wider text-gray-400">
    Inventory Investment
  </p>

  <h2 className="mt-3 text-3xl font-bold text-blue-400">
    €{stats.inventoryInvestment.toFixed(2)}
  </h2>
</div>
<div className="rounded-2xl border border-orange-500/30 bg-white/5 p-6">
  <p className="text-sm uppercase tracking-wider text-gray-400">
    Unsold Inventory
  </p>

  <h2 className="mt-3 text-3xl font-bold text-orange-400">
    €{stats.unsoldInventory.toFixed(2)}
  </h2>
</div>

<div className="rounded-2xl border border-yellow-500/30 bg-white/5 p-6">
  <p className="text-sm uppercase tracking-wider text-gray-400">
    Potential Revenue
  </p>

  <h2 className="mt-3 text-3xl font-bold text-yellow-400">
    €{stats.potentialRevenue.toFixed(2)}
  </h2>
</div>

<div className="rounded-2xl border border-cyan-500/30 bg-white/5 p-6">
  <p className="text-sm uppercase tracking-wider text-gray-400">
    Actual Revenue
  </p>

  <h2 className="mt-3 text-3xl font-bold text-cyan-400">
    €{stats.actualRevenue.toFixed(2)}
  </h2>
</div>

<div className="rounded-2xl border border-emerald-500/30 bg-white/5 p-6">
  <p className="text-sm uppercase tracking-wider text-gray-400">
    Net Profit
  </p>

  <h2 className="mt-3 text-3xl font-bold text-emerald-400">
    €{stats.netProfit.toFixed(2)}
  </h2>
</div>

    </div>
  );
}