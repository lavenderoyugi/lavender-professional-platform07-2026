export default function DashboardStats() {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-2xl border border-violet-500/30 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Products
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          2
        </h2>
      </div>

      <div className="rounded-2xl border border-green-500/30 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Available
        </p>

        <h2 className="mt-3 text-4xl font-bold text-green-400">
          1
        </h2>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Sold
        </p>

        <h2 className="mt-3 text-4xl font-bold text-red-400">
          1
        </h2>
      </div>

      <div className="rounded-2xl border border-yellow-500/30 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Revenue
        </p>

        <h2 className="mt-3 text-4xl font-bold text-yellow-400">
          €74
        </h2>
      </div>

    </div>
  );
}