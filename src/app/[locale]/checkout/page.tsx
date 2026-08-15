"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
  try {
    setLoading(true);

   const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  items: cart,
  deliveryMethod,
}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to start checkout.");
    }

    if (!data.url) {
      throw new Error("Stripe checkout URL was not returned.");
    }

    window.location.href = data.url;
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Unable to start checkout."
    );
  } finally {
    setLoading(false);
  }
};

  const [deliveryMethod, setDeliveryMethod] = useState(
    "Mondial Relay"
  );

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-4 text-gray-400">
          Please add an item to your cart before checking out.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold">
        Checkout
      </h1>

      <p className="mt-2 text-gray-400">
        Complete your information to place your order.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">

        {/* CUSTOMER INFORMATION */}
        <section className="lg:col-span-2 rounded-2xl border border-white/10 bg-zinc-900 p-6">

          <h2 className="text-2xl font-bold text-violet-400">
            Customer Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                First Name
              </label>

              <input
                type="text"
                placeholder="First name"
                className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Last name"
                className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Phone
              </label>

              <input
                type="tel"
                placeholder="+33"
                className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
              />
            </div>

          </div>

          <h2 className="mt-10 text-2xl font-bold text-violet-400">
            Delivery Address
          </h2>

          <div className="mt-6 space-y-5">

            <input
              type="text"
              placeholder="Address"
              className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
            />

            <div className="grid gap-5 md:grid-cols-2">

              <input
                type="text"
                placeholder="Postal Code"
                className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
              />

              <input
                type="text"
                placeholder="City"
                className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
              />

            </div>

            <input
              type="text"
              placeholder="Country"
              defaultValue="France"
              className="w-full rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none focus:border-violet-500"
            />

          </div>

          <h2 className="mt-10 text-2xl font-bold text-violet-400">
            Delivery Method
          </h2>

          <div className="mt-6 space-y-4">

            {[
              {
                name: "Mondial Relay",
                description:
                  "Pickup from a nearby collection point or locker.",
              },
              {
                name: "Chronopost Shop2Shop",
                description:
                  "Delivery to a participating pickup point.",
              },
              {
                name: "Chronopost Home Delivery",
                description:
                  "Have your order delivered directly to your address.",
              },
              {
                name: "Local Pickup — Saint-Nazaire",
                description:
                  "Collect your purchase directly in Saint-Nazaire.",
              },
            ].map((method) => (
              <label
                key={method.name}
                className="flex cursor-pointer items-start gap-4 rounded-xl border border-white/10 bg-zinc-800 p-4 hover:border-violet-500"
              >
                <input
                  type="radio"
                  name="delivery"
                  value={method.name}
                  checked={deliveryMethod === method.name}
                  onChange={(e) =>
                    setDeliveryMethod(e.target.value)
                  }
                  className="mt-1 h-5 w-5 accent-violet-600"
                />

                <div>
                  <p className="font-semibold text-white">
                    {method.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    {method.description}
                  </p>
                </div>
              </label>
            ))}

          </div>

        </section>

        {/* ORDER SUMMARY */}
        <aside className="h-fit rounded-2xl border border-white/10 bg-zinc-900 p-6">

          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-white/10 pb-4"
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                )}

                <div className="flex-1">
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-1 text-violet-400">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

          </div>

          <div className="mt-6 space-y-3">

            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>
                  €{cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

          </div>

          <button
  type="button"
  onClick={handleCheckout}
  disabled={loading}
  className="mt-8 block w-full rounded-xl bg-violet-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading ? "Connecting to Stripe..." : "Continue to Payment"}
</button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Payment will be securely processed at the next step.
          </p>

        </aside>

      </div>
    </main>
  );
}