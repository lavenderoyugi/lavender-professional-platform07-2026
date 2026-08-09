"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import type { Product } from "@/types/product";

type Props = {
  selectedProduct: Product | null;
};

const emptyProduct: Product = {
  name: "",
  title: "",
  description: "",
  category: "Decoration",

  price: "",
  purchase_price: "",
  listing_price: "",
  selling_price: "",

  stock: 1,
  sku: "",

  status: "Available",

  image_url: "",
  gallery: [],

  brand: "",
  manufacturer: "",
  material: "",
  condition: "",
  dimensions: "",
  year: "",
  origin_country: "",

  weight: "",
  color: "",
  style: "",

  vinted: "",
  leboncoin: "",

  is_featured: false,
  published: true,

  story: "",
};

export default function ProductForm({
  selectedProduct,
}: Props) {
  const [product, setProduct] = useState<Product>(emptyProduct);

  const [images, setImages] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        ...emptyProduct,
        ...selectedProduct,
        gallery: selectedProduct.gallery || [],
      });
    } else {
      setProduct(emptyProduct);
      setImages([]);
    }
  }, [selectedProduct]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleCheckbox = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">
      <h2 className="text-3xl font-bold text-white">
        Product Form
      </h2>

      <p className="mt-2 text-gray-400">
        Building the premium product manager...
      </p>
    </div>
  );
}