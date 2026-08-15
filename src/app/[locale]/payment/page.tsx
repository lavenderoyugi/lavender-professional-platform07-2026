"use client";

import { useCart } from "@/context/CartContext";

export default function PaymentPage() {
  const { cart, cartTotal } = useCart();

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold text-violet-400">
          Payment
        </h1>

        <p className="mt-2 text-gray-400">
          Complete your payment to place your order.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          {/* Payment Information */}
          <section className="rounded-2xl border border-white/10 bg-zinc-900 p-8">

            <h2 className="text-2xl font-bold text-violet-400">
              Payment Information
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Cardholder Name
                </label>

                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Card Number
                </label>

                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    CVC
                  </label>

                  <input
                    type="text"
                    placeholder="123"
                    className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
                  />
                </div>

              </div>

            </div>

            <button
              type="button"
              className="mt-8 w-full rounded-xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700"
            >
              Pay €{cartTotal.toFixed(2)}
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Secure payment processing will be connected in the next step.
            </p>

          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl border border-white/10 bg-zinc-900 p-8">

            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-white/10 pb-4"
                >

                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            <div className="mt-6 flex justify-between border-t border-white/10 pt-6 text-xl font-bold">
              <span>Total</span>

              <span className="text-violet-400">
                €{cartTotal.toFixed(2)}
              </span>
            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}