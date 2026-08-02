export default function ProductTable() {
  return (
    <div className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            Products
          </h2>

          <p className="mt-2 text-gray-400">
            Manage your Lavender Finds inventory.
          </p>
        </div>

        <button className="rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500">
          + New Product
        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b border-white/10 text-left text-gray-400">

            <th className="py-4">Product</th>
            <th>Price</th>
            <th>Status</th>
            <th>Category</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b border-white/5">

            <td className="py-6 font-semibold">
              Vintage Fish Lamp
            </td>

            <td>€49</td>

            <td>
              <span className="rounded-full bg-red-600 px-3 py-1 text-sm">
                Sold
              </span>
            </td>

            <td>Lighting</td>

            <td className="space-x-2">

              <button className="rounded-lg border border-white/20 px-3 py-1 hover:border-violet-500">
                Edit
              </button>

              <button className="rounded-lg border border-red-500 px-3 py-1 text-red-400 hover:bg-red-600 hover:text-white">
                Delete
              </button>

            </td>

          </tr>

          <tr>

            <td className="py-6 font-semibold">
              Murano Glass Fish
            </td>

            <td>€25</td>

            <td>
              <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
                Available
              </span>
            </td>

            <td>Lighting</td>

            <td className="space-x-2">

              <button className="rounded-lg border border-white/20 px-3 py-1 hover:border-violet-500">
                Edit
              </button>

              <button className="rounded-lg border border-red-500 px-3 py-1 text-red-400 hover:bg-red-600 hover:text-white">
                Delete
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}