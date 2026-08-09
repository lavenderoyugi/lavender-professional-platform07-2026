import { Link } from "@/i18n/navigation";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
const image =
  product.gallery?.[0] ||
  product.image_url ||
  "/images/placeholder.jpg";

  const title = product.name || product.title || "Untitled Product";

 const country =
  product.origin_country ||
  "France";

  const condition = product.condition || "Excellent condition";

  const status = String(product.status).toLowerCase();

  return (
    <Link href={`/finds/${product.slug ?? product.id}`}>
      <div className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20">

        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {status === "sold" ? (
            <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
              Sold
            </span>
          ) : (
            <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
              Available
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3 p-6">

          <h3 className="text-2xl font-semibold text-white">
            {title}
          </h3>

          <p className="text-gray-400">
            🇫🇷 {country}
          </p>

          <p className="text-gray-400">
            {condition}
          </p>

          <div className="flex items-center justify-between">

            <span className="text-2xl font-bold text-violet-400">
              €{product.price}
            </span>

            <span className="rounded-full border border-violet-500 px-5 py-2 transition group-hover:bg-violet-500 group-hover:text-black">
              View Details →
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}