"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Ensure at least 1 image
  const galleryImages = images.length > 0 ? images : ["/images/tiles/marble-white.jpg"]

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-border">
        <Image
          src={galleryImages[activeIndex]}
          alt={`${name} - изображение ${activeIndex + 1}`}
          fill
          className="object-contain p-4"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors bg-white ${
                i === activeIndex
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              aria-label={`Показать изображение ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${name} - миниатюра ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
