
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lavender-finds/helpers";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";


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
  {product.name || product.title || "Untitled Product"}
</h1>

        <p className="text-4xl font-bold text-violet-400">
         €{product.price}
        </p>

{String(product.status).toLowerCase() === "available" && (
  <p className="text-lg font-semibold text-green-400">
    🟢 Available
  </p>
)}
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
  {product.origin_country || "Unknown"}
</p>

          {product.material && (
  <p>
    <span className="font-semibold">
      Material:
    </span>{" "}
    {product.material}
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

{/* ================= SHIPPING OPTIONS ================= */}

<div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">

  <h3 className="mb-4 text-xl font-semibold text-violet-400">
    🚚 Delivery & Pickup
  </h3>

  <p className="mb-5 text-sm text-gray-400">
    Choose your preferred delivery method. Shipping costs will be calculated
    according to the destination and package size.
  </p>

  <div className="grid gap-3">

    {/* Mondial Relay */}
    <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition hover:border-violet-500">
      <input
        type="radio"
        name="shipping"
        value="mondial-relay"
        className="h-5 w-5 accent-violet-600"
      />

      <div>
        <span className="block font-semibold text-white">
          📦 Mondial Relay — Point Relais / Locker
        </span>

        <span className="text-sm text-gray-400">
          Convenient pickup from a nearby collection point.
        </span>
      </div>
    </label>

    {/* Chronopost Shop2Shop */}
    <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition hover:border-violet-500">
      <input
        type="radio"
        name="shipping"
        value="chronopost-shop2shop"
        className="h-5 w-5 accent-violet-600"
      />

      <div>
        <span className="block font-semibold text-white">
          🚚 Chronopost Shop2Shop
        </span>

        <span className="text-sm text-gray-400">
          Delivery to a participating pickup point.
        </span>
      </div>
    </label>

    {/* Chronopost Home */}
    <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition hover:border-violet-500">
      <input
        type="radio"
        name="shipping"
        value="chronopost-home"
        className="h-5 w-5 accent-violet-600"
      />

      <div>
        <span className="block font-semibold text-white">
          🏠 Chronopost Home Delivery
        </span>

        <span className="text-sm text-gray-400">
          Have your item delivered directly to your address.
        </span>
      </div>
    </label>

    {/* Local Pickup */}
    {product.pickup_available && (
      <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition hover:border-violet-500">
        <input
          type="radio"
          name="shipping"
          value="local-pickup"
          className="h-5 w-5 accent-violet-600"
        />

        <div>
          <span className="block font-semibold text-white">
            📍 Local Pickup — Saint-Nazaire
          </span>

          <span className="text-sm text-gray-400">
            Collect your purchase directly in Saint-Nazaire.
          </span>
        </div>
      </label>
    )}

  </div>

  <div className="mt-5 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
    <p className="text-sm text-gray-300">
      💡 <span className="font-semibold text-white">Shipping cost:</span>{" "}
      calculated at checkout based on the delivery method, destination and
      package dimensions.
    </p>
  </div>

</div>

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

                <AddToCartButton
    product={{
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock: product.stock,
      shipping_weight: product.shipping_weight,
      package_length: product.package_length,
      package_width: product.package_width,
      package_height: product.package_height,
      fragile: product.fragile,
    }}
  />

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