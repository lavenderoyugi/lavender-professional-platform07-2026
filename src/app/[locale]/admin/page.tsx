import DashboardStats from "@/components/admin/DashboardStats";
import Navbar from "@/components/Navbar";
import ProductTable from "@/components/admin/ProductTable";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="uppercase tracking-[0.35em] text-violet-400">
          Lavender Finds
        </p>

        <h1 className="mt-4 text-6xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-gray-400">
          Welcome back, Lavender.
          Manage your products, prices, inventory and sales from one place.
        </p>

        <DashboardStats />

        <ProductTable />

        <ProductForm />
      </section>
    </main>
  );
}