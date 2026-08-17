"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  sku: string | null;
  purchase_price: number | null;
};

export default function SalesForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sale, setSale] = useState({
    product_id: "",
    marketplace: "Vinted",
    sale_date: new Date().toISOString().split("T")[0],
    quantity: 1,
    unit_selling_price: 0,
    fees: 0,
    shipping_cost: 0,
    notes: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, sku, purchase_price")
      .order("name");

    if (error) {
      console.error("Error loading products:", error);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setSale((prev) => ({
      ...prev,
      [name]:
        name === "quantity" ||
        name === "unit_selling_price" ||
        name === "fees" ||
        name === "shipping_cost"
          ? Number(value)
          : value,
    }));
  }

  const selectedProduct = products.find(
    (product) => product.id === sale.product_id
  );

  async function handleSubmit() {
  if (!sale.product_id) {
    alert("Please select a product.");
    return;
  }

  if (sale.quantity < 1) {
    alert("Quantity must be at least 1.");
    return;
  }

  if (sale.unit_selling_price < 0) {
    alert("Selling price cannot be negative.");
    return;
  }

  const totalSale =
    sale.quantity * sale.unit_selling_price;

 const unitCost = Number(selectedProduct?.purchase_price || 0);

const costOfGoods =
  sale.quantity * unitCost;

  const netRevenue =
    totalSale -
    sale.fees -
    sale.shipping_cost;

  const profit =
    netRevenue -
    costOfGoods;

  const { error } = await supabase
    .from("sales")
    .insert({
      product_id: sale.product_id,
      sku: selectedProduct?.sku || null,
      product_name: selectedProduct?.name || null,

      quantity: sale.quantity,
      marketplace: sale.marketplace,
      sale_date: sale.sale_date,

      unit_selling_price: sale.unit_selling_price,
      total_sale: totalSale,

      unit_cost: unitCost,
cost_of_goods: costOfGoods,
fees: sale.fees,
      shipping_cost: sale.shipping_cost,

      net_revenue: netRevenue,
      profit: profit,

      notes: sale.notes || null,
    });

  if (error) {
    console.error("Error recording sale:", error);
    alert(`Could not record sale: ${error.message}`);
    return;
  }

  alert("Sale recorded successfully!");

  setSale({
    product_id: "",
    marketplace: "Vinted",
    sale_date: new Date().toISOString().split("T")[0],
    quantity: 1,
    unit_selling_price: 0,
    fees: 0,
    shipping_cost: 0,
    notes: "",
  });
}
const totalSale = sale.quantity * sale.unit_selling_price;

const unitCost = Number(selectedProduct?.purchase_price || 0);

const costOfGoods =
  sale.quantity * unitCost;
  const netRevenue =
    totalSale - sale.fees - sale.shipping_cost;

  const profit =
    netRevenue - costOfGoods;

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 text-white">
        Loading products...
      </div>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-zinc-950 p-6 text-white">
      <h2 className="mb-6 text-xl font-semibold text-violet-400">
        Record a Sale
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Product */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Product
          </label>

          <select
            name="product_id"
            value={sale.product_id}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
          >
            <option value="">Select product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
                {product.sku ? ` — ${product.sku}` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Marketplace */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Marketplace
          </label>

          <select
            name="marketplace"
            value={sale.marketplace}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
          >
            <option value="Vinted">Vinted</option>
            <option value="Leboncoin">Leboncoin</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Sale Date */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Sale Date
          </label>

          <input
            type="date"
            name="sale_date"
            value={sale.sale_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Quantity Sold
          </label>

          <input
            type="number"
            min="1"
            name="quantity"
            value={sale.quantity}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
          />
        </div>

        {/* Selling Price */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Selling Price per Unit (€)
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            name="unit_selling_price"
            value={sale.unit_selling_price}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
          />
        </div>

        {/* Fees */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Fees (€)
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            name="fees"
            value={sale.fees}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
          />
        </div>

        {/* Shipping */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Shipping Cost (€)
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            name="shipping_cost"
            value={sale.shipping_cost}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Notes
          </label>

          <textarea
            name="notes"
            value={sale.notes}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white"
            placeholder="Optional notes..."
          />
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8 grid gap-4 md:grid-cols-4">

        <div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
          <p className="text-sm text-gray-400">Total Sale</p>
          <p className="mt-1 text-xl font-semibold text-cyan-400">
            €{totalSale.toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
          <p className="text-sm text-gray-400">Cost of Goods</p>
          <p className="mt-1 text-xl font-semibold text-orange-400">
            €{costOfGoods.toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
          <p className="text-sm text-gray-400">Net Revenue</p>
          <p className="mt-1 text-xl font-semibold text-blue-400">
            €{netRevenue.toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
          <p className="text-sm text-gray-400">Profit</p>
          <p className="mt-1 text-xl font-semibold text-green-400">
            €{profit.toFixed(2)}
          </p>
        </div>
      </div>

      <button
  type="button"
  onClick={handleSubmit}
  className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-500"
>
  Record Sale
</button>
    </section>
  );
}