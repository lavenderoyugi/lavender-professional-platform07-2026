"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useState as useReactState } from "react";
import DashboardStats from "@/components/admin/DashboardStats";
import SalesForm from "@/components/admin/SalesForm";
import Navbar from "@/components/Navbar";
import ProductsList from "@/components/admin/ProductsList";
import ProductForm from "@/components/admin/ProductForm";
import type { Product } from "@/types/product";

export default function AdminPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/check-auth", { cache: "no-store" })
      .then((response) => { if (response.ok) setAuthenticated(true); })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to sign in");
      setAuthenticated(true);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setSubmitting(false);
    }
  }

  if (checking) return <main className="min-h-screen bg-black text-white grid place-items-center">Checking access…</main>;

  if (!authenticated) return (
    <main className="min-h-screen bg-black text-white grid place-items-center px-6">
      <form onSubmit={login} className="w-full max-w-md rounded-2xl border border-violet-500/30 bg-zinc-900 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-400">Lavender Finds</p>
        <h1 className="mt-3 text-3xl font-bold">Admin login</h1>
        <p className="mt-2 text-gray-400">Enter your dashboard password to access your private inventory and sales data.</p>
        <label htmlFor="admin-password" className="mt-6 block text-sm text-gray-300">Password</label>
        <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-violet-500" />
        {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
        <button disabled={submitting} className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 disabled:opacity-50">{submitting ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="uppercase tracking-[0.35em] text-violet-400">Lavender Finds</p>
        <h1 className="mt-4 text-6xl font-bold">Admin Dashboard</h1>
        <p className="mt-6 max-w-3xl text-lg text-gray-400">Welcome back. Manage your products, prices, inventory and sales from one place.</p>
        <DashboardStats />
        <SalesForm />
        <ProductsList onEdit={setSelectedProduct} />
        <ProductForm selectedProduct={selectedProduct} />
      </section>
    </main>
  );
}