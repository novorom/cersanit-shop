"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { Product } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const totalStock = product.stock_yanino + product.stock_factory
  const hasDiscount = product.price_official && product.price_official > product.price_retail

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.main_image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">
              New
            </span>
          )}
          {product.is_bestseller && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-foreground text-xs font-medium">
              Hit
            </span>
          )}
          {product.is_discount && (
            <span className="px-2 py-0.5 rounded-md bg-destructive text-destructive-foreground text-xs font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorite(!isFavorite)
          }}
          className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Добавить в избранное"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isFavorite ? "fill-destructive text-destructive" : "text-foreground/60"}`}
          />
        </button>

        {/* Stock indicator */}
        {totalStock > 0 && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-md bg-green-500/90 text-background text-[11px] font-medium backdrop-blur-sm">
              В наличии
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3.5">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
          {product.collection} / {product.format}
        </span>
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-foreground">
            {product.price_retail.toLocaleString("ru-RU")} {"₽/м²"}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {product.price_official?.toLocaleString("ru-RU")} {"₽"}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {product.surface} / {product.color}
        </span>
      </div>
    </Link>
  )
}
