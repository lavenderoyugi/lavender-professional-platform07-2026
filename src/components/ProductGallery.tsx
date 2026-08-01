"use client";

import { useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center">
      {/* Main Image */}
      <img
        src={selectedImage}
        alt={title}
        className="w-full max-w-2xl rounded-xl shadow-2xl transition-all duration-300"
      />

      {/* Thumbnails */}
      <div className="mt-4 flex flex-row justify-center gap-3">
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt={title}
            onClick={() => setSelectedImage(image)}
            className={`w-24 h-24 rounded-lg cursor-pointer border-2 object-cover transition-all duration-200 ${
              selectedImage === image
                ? "border-violet-500"
                : "border-transparent hover:border-violet-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}