"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { Product } from "@/lib/products-data"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

const PCS_TYPES = ["Мозаика", "Ступень", "Плинтус", "Вставка", "Панно"]

// Прокси-CDN: бесплатный сервис, конвертирует в WebP, сжимает, кэширует
function optimizeImage(url: string, width = 400): string {
  if (!url || url.startsWith("/")) return url
  // Убираем https:// для weserv.nl
  const clean = url.replace(/^https?:\/\//, "")
  return `https://images.weserv.nl/?url=${clean}&w=${width}&output=webp&q=75&il`
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imgError, setImgError] = useState(false)

  const yanino = product.stock_yanino ?? 0
  const factory = product.stock_factory ?? 0
  const totalStock = yanino + factory
  const hasDiscount = product.price_official && product.price_official > product.price_retail
  const priceUnit = PCS_TYPES.includes(product.product_type) ? "₽/шт" : "₽/м²"
  const stockUnit = PCS_TYPES.includes(product.product_type) ? "шт" : "м²"

  const rawSrc = product.main_image || (product.images && product.images[0]) || "/placeholder.jpg"
  const imgSrc = imgError ? "/placeholder.jpg" : optimizeImage(rawSrc, 400)

  return (
    <Link
      href={`/catalog/${product.slug || product.id}`}
      className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={imgSrc}
          alt={[product.name, product.color, product.format, "купить СПб"].filter(Boolean).join(" ")}
          className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
          width={400}
          height={400}
          decoding="async"
          onError={() => setImgError(true)}
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
        <div className="absolute bottom-2.5 left-2.5 flex flex-col gap-1">
          {yanino > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-green-600/90 text-white text-[11px] font-medium backdrop-blur-sm">
              Янино: {yanino} {stockUnit}
            </span>
          )}
          {factory > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-blue-600/90 text-white text-[11px] font-medium backdrop-blur-sm">
              Завод: {factory} {stockUnit}
            </span>
          )}
          {totalStock === 0 && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-white text-[11px] font-medium backdrop-blur-sm">
              Под заказ
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3.5">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
          {product.brand} / {product.collection} / {product.format}
        </span>
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-foreground">
            {product.price_retail > 0 ? `${product.price_retail.toLocaleString("ru-RU")} ${priceUnit}` : "Цена по запросу"}
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
