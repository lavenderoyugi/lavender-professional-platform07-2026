"use client";

import { Link } from "@/i18n/navigation";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <h1 className="text-4xl font-bold text-white">
            Your Cart
          </h1>

          <p className="mt-4 text-gray-400">
            Your cart is currently empty.
          </p>

          <Link
            href="/en/finds"
            className="mt-8 inline-block rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Your Cart
        </h1>

        <p className="mt-2 text-gray-400">
          {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

        {/* CART ITEMS */}

        <section className="space-y-4">

          {cart.map((item) => (

            <div
              key={item.id}
              className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5"
            >

              {/* Image */}

              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-800">

                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500">
                    No image
                  </div>
                )}

              </div>

              {/* Product information */}

              <div className="flex flex-1 flex-col justify-between">

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {item.name}
                  </h2>

                  <p className="mt-1 text-violet-400">
                    €{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4">

                  {/* Quantity */}

                  <div className="flex items-center overflow-hidden rounded-lg border border-white/10">

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      className="px-3 py-2 text-white hover:bg-white/10"
                    >
                      −
                    </button>

                    <span className="px-4 py-2 text-white">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      disabled={
                        item.stock !== undefined &&
                        item.quantity >= item.stock
                      }
                      className="px-3 py-2 text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>

                  </div>

                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>

                </div>

              </div>

              {/* Item total */}

              <div className="hidden text-right sm:block">

                <p className="font-semibold text-white">
                  €{(item.price * item.quantity).toFixed(2)}
                </p>

              </div>

            </div>

          ))}

        </section>

        {/* SUMMARY */}

        <aside className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-2xl font-bold text-white">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>

              <span>
                €{cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>

              <span>
                Calculated at checkout
              </span>
            </div>

            <div className="border-t border-white/10 pt-4">

              <div className="flex justify-between text-xl font-bold text-white">

                <span>Total</span>

                <span>
                  €{cartTotal.toFixed(2)}
                </span>

              </div>

            </div>

          </div>

          <Link
  href="/checkout"
  className="mt-8 block w-full rounded-xl bg-violet-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-violet-700"
>
  Continue to Checkout
</Link>

          <Link
            href="/en/finds"
            className="mt-4 block text-center text-sm text-gray-400 hover:text-white"
          >
            Continue Shopping
          </Link>

        </aside>

      </div>

    </main>
  );
}