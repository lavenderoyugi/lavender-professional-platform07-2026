"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  
  const { clearCart, cartCount } = useCart();

useEffect(() => {
  if (cartCount > 0) {
    clearCart();
  }
}, [cartCount, clearCart]);
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl text-center">

        <div className="mb-6 text-6xl">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-violet-400">
          Thank You for Your Order!
        </h1>

        <p className="mt-6 text-lg text-gray-300">
          Your payment was successfully processed.
        </p>

        <p className="mt-3 text-gray-400">
          We have received your order and will prepare it for delivery.
        </p>

        {sessionId && (
          <div className="mt-8 rounded-xl border border-white/10 bg-zinc-900 p-5">
            <p className="text-sm text-gray-400">
              Order reference
            </p>

            <p className="mt-2 break-all text-sm text-violet-300">
              {sessionId}
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/finds"
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </main>
  );
}