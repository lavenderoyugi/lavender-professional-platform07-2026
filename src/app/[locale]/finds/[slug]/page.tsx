import { getProductBySlug } from "@/lavender-finds/helpers";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-6">
        {product.title}
      </h1>

      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full max-w-xl rounded-xl"
      />

      <p className="mt-8 text-lg">
        {product.description}
      </p>
    </main>
  );
}