import Navbar from "@/components/Navbar";
export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="text-6xl font-bold">
          Admin Dashboard
        </h1>

        <p>If you can see this, the page works.</p>
      </section>
    </main>
  );
}