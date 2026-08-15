"use client";

import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

type Props = {
  product: {
    id: string;
    name: string;
    price: number | string;
    image_url?: string;
    stock?: number;
    shipping_weight?: number | null;
    package_length?: number | null;
    package_width?: number | null;
    package_height?: number | null;
    fragile?: boolean;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image_url: product.image_url,
      stock: product.stock,
      shipping_weight: product.shipping_weight,
      package_length: product.package_length,
      package_width: product.package_width,
      package_height: product.package_height,
      fragile: product.fragile,
    });

    toast.success("Added to cart!");
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
    >
      🛒 Add to Cart
    </button>
  );
}