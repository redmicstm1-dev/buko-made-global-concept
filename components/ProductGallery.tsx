"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  image: string;
  imageAlt: string;
  images?: string[];
  productName: string;
};

/**
 * Accessible product image gallery.
 * Add two or three locally hosted paths to a product's `images` array to enable
 * selectable thumbnails. Until then, the product's existing `image` is used.
 */
export default function ProductGallery({
  image,
  imageAlt,
  images = [],
  productName,
}: ProductGalleryProps) {
  const galleryImages = Array.from(new Set([image, ...images].filter(Boolean))).slice(0, 3);
  const [activeImage, setActiveImage] = useState(0);
  const selectedImage = galleryImages[Math.min(activeImage, galleryImages.length - 1)] ?? image;

  return (
    <div className="product-gallery" aria-label={`${productName} product images`}>
      <div className="detail-image product-gallery-main">
        <Image
          key={selectedImage}
          src={selectedImage}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 850px) 95vw, 48vw"
        />
        <span className="image-badge">Buko Made</span>
        {galleryImages.length > 1 && (
          <span className="gallery-counter" aria-live="polite">
            {Math.min(activeImage + 1, galleryImages.length)} / {galleryImages.length}
          </span>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="product-gallery-thumbnails" role="group" aria-label="Choose product image">
          {galleryImages.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`product-gallery-thumbnail${index === activeImage ? " is-active" : ""}`}
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1} of ${galleryImages.length} for ${productName}`}
              aria-pressed={index === activeImage}
            >
              <Image src={src} alt="" fill sizes="100px" />
            </button>
          ))}
        </div>
      )}
      <p className="gallery-help">
        {galleryImages.length > 1
          ? "Select a thumbnail to view another product angle."
          : "Additional product views can be added when verified images are available."}
      </p>
    </div>
  );
}
