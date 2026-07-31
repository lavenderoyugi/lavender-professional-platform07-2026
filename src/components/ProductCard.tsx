import { Product } from "@/lavender-finds/products";

type ProductCardProps = {
  product: Product;
};
export default function ProductCard({
  product,
}: ProductCardProps) {
    const image = product.images[0];
const title = product.title;
const description = product.description;
const price = "View Story";
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20">

      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-6">

        <h3 className="text-2xl font-semibold text-white">
          {title}
        </h3>

        <p className="text-gray-400">
          {description}
        </p>

        <div className="flex items-center justify-between">

          <span className="text-2xl font-bold text-violet-400">
            {price}
          </span>

          <button className="rounded-full border border-violet-500 px-5 py-2 transition hover:bg-violet-500 hover:text-black">
            View Item
          </button>

        </div>

      </div>

    </div>
  );
}