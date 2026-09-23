"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

export default function FindsPage() {
  const t = useTranslations("finds");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
 const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  async function fetchProducts() {
  const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("published", true)
  .eq("status", "Available")
  .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  fetchProducts();
}, []);
  
    const filteredProducts = products
  .map((product) => {
    const status: "available" | "sold" =
      product.status === "Sold" ? "sold" : "available";

    return {
  id: product.id,
  slug: product.slug || product.id,

  name: product.name,
  title: product.name || "Untitled Product",

  description: product.description || "",
  price: product.price,

  category: product.category,

  origin_country: product.origin_country,
  gallery: product.gallery || [],
  image_url: product.image_url,

  is_featured: product.is_featured || false,

  condition: product.condition || "Excellent condition",

  story: "",
  dimensions: "",
  materials: "",
  year: "",
  vinted: "",
  leboncoin: "",

  status,
};
  })
  .filter((product) => {
    const matchesStatus =
      filter === "all" || product.status === filter;

    const matchesSearch =
  (product.title || "")
  .toLowerCase()
        .includes(search.toLowerCase()) ||
      (product.description || "")
  .toLowerCase()
        .includes(search.toLowerCase()) ||
      (product.category || "")
  .toLowerCase()
        .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

    return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO */}
     <section className="mx-auto max-w-7xl px-6 pb-4 pt-8 md:pt-10">

        <div className="max-w-3xl">

          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-violet-400">
            {t("welcome")}
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-violet-400 md:text-7xl">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-gray-300 md:text-2xl">
            {t("tagline")}
          </p>

          <button
            onClick={() =>
              document
                .getElementById("collection")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 rounded-full bg-violet-500 px-8 py-4 font-semibold text-white transition hover:bg-violet-400"
          >
            SHOP THE COLLECTION →
          </button>

        </div>

      </section>


      {/* FEATURED PRODUCTS */}
      <section
        id="collection"
        className="mx-auto max-w-7xl px-6 py-16"
      >

        <div className="mb-12 text-center">

          <p className="text-sm uppercase tracking-[0.35em] text-violet-400">
            Lavender Finds
          </p>

          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Featured Finds
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Discover unique pieces carefully selected for their beauty,
            character and story.
          </p>

        </div>


        {/* SEARCH */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-lg">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by title, category or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-5 text-white placeholder:text-gray-500 focus:border-violet-500 focus:outline-none"
            />

          </div>
        </div>


        {/* FILTERS */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">

          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              filter === "all"
                ? "bg-violet-500 text-white"
                : "border border-violet-500 text-violet-400 hover:bg-violet-500 hover:text-white"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("available")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              filter === "available"
                ? "bg-green-600 text-white"
                : "border border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
            }`}
          >
            Available
          </button>

          <button
            onClick={() => setFilter("sold")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              filter === "sold"
                ? "bg-red-600 text-white"
                : "border border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            }`}
          >
            Sold
          </button>

        </div>


        {/* PRODUCTS */}
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            Loading treasures...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            No treasures found.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}


               {/* CUSTOMER LOVE */}
        <section className="mt-24 border-t border-white/10 pt-20">

          <div className="text-center">

            <p className="text-sm uppercase tracking-[0.35em] text-violet-400">
              Customer Love
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Loved by our customers
            </h2>

            <div className="mt-6 flex flex-col items-center justify-center">

              <div className="text-3xl tracking-wide text-yellow-400">
                ★★★★★
              </div>

              <div className="mt-2 text-3xl font-bold">
                4.9 / 5
              </div>

              <p className="mt-1 text-gray-400">
                107 evaluations on Vinted
              </p>

            </div>

          </div>


          {/* REVIEWS */}
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-7 transition hover:border-violet-500/40">

              <div className="text-lg tracking-wide text-yellow-400">
                ★★★★★
              </div>

              <p className="mt-5 leading-7 text-gray-300">
                “Plus que parfait : emballage très soigné et d'une grande
                qualité pour petits articles fragiles, vendeur(se) à
                recommander sans problème aucun.”
              </p>

              <p className="mt-6 text-sm font-semibold text-violet-400">
                Vinted customer
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-7 transition hover:border-violet-500/40">

              <div className="text-lg tracking-wide text-yellow-400">
                ★★★★★
              </div>

              <p className="mt-5 leading-7 text-gray-300">
                “Parfait ! Tasses bien jolies et soigneusement emballées ! 😊”
              </p>

              <p className="mt-6 text-sm font-semibold text-violet-400">
                Vinted customer
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-7 transition hover:border-violet-500/40">

              <div className="text-lg tracking-wide text-yellow-400">
                ★★★★★
              </div>

              <p className="mt-5 leading-7 text-gray-300">
                “Un super contact et une super vente ! Vraiment un de mes
                achats les plus agréables !”
              </p>

              <p className="mt-6 text-sm font-semibold text-violet-400">
                Vinted customer
              </p>

            </div>

          </div>


          {/* VINTED LINK */}
          <div className="mt-10 text-center">

            <a
              href="https://www.vinted.fr/member/176550360?tab=feedback"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-violet-500 px-8 py-3 font-semibold text-white transition hover:bg-violet-400"
            >
              SEE ALL REVIEWS ON VINTED →
            </a>

          </div>


          {/* SOCIAL MEDIA */}
          <div className="mt-24 border-t border-white/10 pt-16">

            <div className="text-center">

              <p className="text-sm uppercase tracking-[0.35em] text-violet-400">
                Stay Connected
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Follow Lavender Finds
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Discover new finds, behind-the-scenes moments and fresh
                treasures across our social platforms.
              </p>

            </div>


            <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">

              <a
                href="https://www.instagram.com/lavender.finds_/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-5 text-center font-semibold transition hover:border-violet-500 hover:bg-violet-500/10"
              >
                Instagram
                <span className="mt-1 block text-sm font-normal text-gray-500">
                  @lavender.finds_
                </span>
              </a>


              <a
                href="https://www.facebook.com/LavenderFindsOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-5 text-center font-semibold transition hover:border-violet-500 hover:bg-violet-500/10"
              >
                Facebook
                <span className="mt-1 block text-sm font-normal text-gray-500">
                  Lavender Finds
                </span>
              </a>


              <a
                href="https://www.tiktok.com/@lavender.finds_2026"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-5 text-center font-semibold transition hover:border-violet-500 hover:bg-violet-500/10"
              >
                TikTok
                <span className="mt-1 block text-sm font-normal text-gray-500">
                  @lavender.finds_2026
                </span>
              </a>


              <a
                href="https://www.vinted.fr/member/176550360?tab=feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-5 text-center font-semibold transition hover:border-violet-500 hover:bg-violet-500/10"
              >
                Vinted
                <span className="mt-1 block text-sm font-normal text-gray-500">
                  Shop Lavender Finds
                </span>
              </a>


              <a
                href="https://www.leboncoin.fr/profil/83de4671-8f29-4d11-a817-08e022658b89/offres"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-5 text-center font-semibold transition hover:border-violet-500 hover:bg-violet-500/10"
              >
                Leboncoin
                <span className="mt-1 block text-sm font-normal text-gray-500">
                  View our listings
                </span>
              </a>

            </div>

          </div>

        </section> 
      </section>


      {/* ABOUT US */}
      <section className="mx-auto max-w-5xl px-6 py-24">

        <div className="border-l-4 border-violet-500 pl-6 md:pl-10">

          <p className="text-sm uppercase tracking-[0.4em] text-violet-400">
            About Lavender Finds
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Every piece has
            <br />
            a story worth telling.
          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-400">
            {t("paragraph1")}
          </p>

          <p className="mt-6 text-lg leading-9 text-gray-400">
            {t("paragraph2")}
          </p>

          <p className="mt-6 text-lg leading-9 text-gray-400">
            {t("paragraph3")}
          </p>

        </div>

      </section>


      {/* FOLLOW / NEW TREASURES */}
      <section className="mx-auto max-w-5xl px-6 pb-24">

        <div className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-10 text-center md:p-14">

          <h2 className="text-3xl font-bold text-violet-400 md:text-4xl">
            New treasures every week ✨
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-300">
            Follow Lavender Finds on Vinted, Leboncoin and social media to
            discover carefully curated vintage décor, elegant glassware and
            unique home accessories.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-violet-500 px-8 py-3 font-semibold transition hover:bg-violet-400"
            >
              View Collection
            </button>

            <button className="rounded-full border border-violet-500 px-8 py-3 font-semibold transition hover:bg-violet-500 hover:text-black">
              Follow Lavender Finds
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}
