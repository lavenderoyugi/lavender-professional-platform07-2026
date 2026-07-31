"use client";

import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lavender-finds/products";

export default function FindsPage() {
  const t = useTranslations("finds");

  return (
  <main className="min-h-screen bg-black text-white">

    <Navbar />

    <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 uppercase tracking-[0.35em] text-violet-400">
          {t("welcome")}
        </p>

        <h1 className="mb-8 text-6xl font-bold text-violet-400">
          {t("title")}
        </h1>

        <p className="max-w-3xl text-xl leading-9 text-gray-300">
          {t("tagline")}
        </p>

        <p className="mt-8 max-w-3xl text-lg leading-9 text-gray-400">
          {t("paragraph1")}
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-400">
          {t("paragraph2")}
        </p>
        <div className="mt-20 border-l-4 border-violet-500 pl-8">

  <p className="text-sm uppercase tracking-[0.4em] text-violet-400">
    Curated European Treasures
  </p>

  <h2 className="mt-4 text-5xl font-bold leading-tight">
    Every piece has
    <br />
    a story worth telling.
  </h2>

  <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-400">
    Lavender Finds is more than a collection of vintage objects.
    Every piece is carefully discovered, selected and photographed
    before finding a new home.
  </p>

</div>

        <p className="mt-6 max-w-3xl text-lg leading-9 text-gray-400">
          {t("paragraph3")}
        </p>
        <div className="mt-20 rounded-2xl border border-violet-500/20 bg-zinc-900/60 p-10 text-center">

  <h2 className="text-3xl font-bold text-violet-400">
    New treasures every week ✨
  </h2>

  <p className="mx-auto mt-4 max-w-2xl text-gray-300">
    Follow Lavender Finds on Vinted, Leboncoin and social media to discover
    carefully curated vintage décor, elegant glassware and unique home
    accessories.
  </p>

  <div className="mt-8 flex flex-wrap justify-center gap-4">

    <button className="rounded-full bg-violet-500 px-8 py-3 font-semibold transition hover:bg-violet-400">
      View Collection
    </button>

    <button className="rounded-full border border-violet-500 px-8 py-3 font-semibold transition hover:bg-violet-500 hover:text-black">
      Follow Lavender Finds
    </button>

  </div>
  <h2 className="mt-24 mb-10 text-center text-5xl font-bold text-violet-400">
  Featured Collection
</h2>

<div className="grid gap-10 md:grid-cols-3">
    {products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
/>
))}

</div>
</div>
      </section>
    </main>
  );
}