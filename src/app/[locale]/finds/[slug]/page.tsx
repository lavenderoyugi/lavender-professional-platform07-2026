
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lavender-finds/helpers";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  

  const { slug } = await params;
  console.log("Slug received:", slug);

const { data: product, error } = await supabase
  .from("products")
  .select("*")
  .eq("id", slug)
  .single();

if (error || !product) {
  notFound();
}

const relatedProducts: any[] = [];
  return (
  <main className="max-w-7xl mx-auto px-6 py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

      {/* LEFT COLUMN */}
      <div>
        <ProductGallery
  images={
    product.gallery?.length
      ? product.gallery
      : product.image_url
      ? [product.image_url]
      : []
  }
  title={product.name}
/>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6">

        <h1 className="text-5xl font-bold">
          {product.title}
        </h1>

        <p className="text-4xl font-bold text-violet-400">
          {product.price}
        </p>

        <div className="space-y-2 text-lg">

          <p>
            <span className="font-semibold">
              Condition:
            </span>{" "}
            {product.condition}
          </p>

          <p>
            <span className="font-semibold">
              Category:
            </span>{" "}
            {product.category}
          </p>

          <p>
            <span className="font-semibold">
              Country:
            </span>{" "}
            {product.country}
          </p>

          {product.materials && (
            <p>
              <span className="font-semibold">
                Materials:
              </span>{" "}
              {product.materials}
            </p>
          )}

          {product.dimensions && (
            <p>
              <span className="font-semibold">
                Dimensions:
              </span>{" "}
              {product.dimensions}
            </p>
          )}

          {product.year && (
            <p>
              <span className="font-semibold">
                Year:
              </span>{" "}
              {product.year}
            </p>
          )}

        </div>

        <div className="pt-6">
          <p className="text-lg leading-8 text-gray-300">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-8">
           {String(product.status).toLowerCase() === "available" ? (
              <>
                {product.vinted && (
                  <a
                    href={product.vinted}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                  >
                    🛍️ Buy on Vinted
                  </a>
                )}

                {product.leboncoin && (
                  <a
                    href={product.leboncoin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/20 px-6 py-3 font-semibold transition hover:bg-white hover:text-black"
                  >
                    📦 View on Leboncoin
                  </a>
                )}
              </>
            ) : (
              <div className="w-full rounded-xl border border-red-500 bg-red-500/10 p-5">
                <h3 className="text-xl font-bold text-red-400">
                  🔴 Sold Out
                </h3>

                <p className="mt-2 text-gray-300">
                  This item has already found a new home.
                  Explore our other vintage treasures.
                </p>
              </div>
            )}
                </div>
                </div>

            </div>
      {/* END RIGHT COLUMN */}

    </div>
    {/* END GRID */}

    {/* ================= RELATED PRODUCTS ================= */}

    {relatedProducts.length > 0 && (
      <section className="mt-24">
        <h2 className="mb-8 text-3xl font-bold">
          You may also like
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <a
              key={item.slug}
              href={`/en/finds/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-violet-500 hover:bg-white/10"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-lg font-bold text-violet-400">
                  {item.price}
                </p>

                {String(item.status).toLowerCase() === "sold" && (
                  <span className="mt-3 inline-block rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-400">
                    Sold
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>
    )}

  </main>
);
}