import Link from "next/link";
import { Product } from "@/lavender-finds/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link href={`/finds/${product.slug}`}>
      <div className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20">

        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Sold Badge */}
          {product.status === "sold" && (
            <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
              Sold
            </span>
          )}

          {/* Available Badge */}
          {product.status === "available" && (
            <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
              Available
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3 p-6">

          <h3 className="text-2xl font-semibold text-white">
            {product.title}
          </h3>

          <p className="text-gray-400">
            🇫🇷 {product.country}
          </p>

          <p className="text-gray-400">
            {product.condition}
          </p>

          <div className="flex items-center justify-between">

            <span className="text-2xl font-bold text-violet-400">
              {product.price}
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