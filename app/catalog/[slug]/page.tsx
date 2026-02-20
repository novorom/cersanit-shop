"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Truck,
  Package,
  ShieldCheck,
  Minus,
  Plus,
  MapPin,
} from "lucide-react"
import { products } from "@/lib/mock-data"
import { ProductGallery } from "@/components/product-gallery"
import { ProductCard } from "@/components/product-card"

type TabId = "description" | "specs" | "delivery"

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = products.find((p) => p.slug === slug) || products[0]
  const [activeTab, setActiveTab] = useState<TabId>("description")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4)

  const totalStock = product.stock_yanino + product.stock_factory
  const hasDiscount = product.price_official && product.price_official > product.price_retail

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: "Описание" },
    { id: "specs", label: "Характеристики" },
    { id: "delivery", label: "Доставка" },
  ]

  const specifications = [
    { label: "Артикул", value: product.sku },
    { label: "Бренд", value: product.brand },
    { label: "Коллекция", value: product.collection },
    { label: "Тип", value: product.product_type },
    { label: "Формат", value: product.format },
    { label: "Поверхность", value: product.surface },
    { label: "Цвет", value: product.color },
    { label: "Материал", value: product.material_type },
    { label: "Назначение", value: product.application },
    { label: "Толщина", value: product.thickness },
    { label: "Штук в коробке", value: String(product.pieces_per_box) },
    { label: "М\u00B2 в коробке", value: String(product.sqm_per_box) },
    { label: "Страна", value: product.country },
  ]

  return (
    <div className="bg-muted/30 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
              Каталог
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
        {/* Product top section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:w-1/2">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product info */}
          <div className="lg:w-1/2 flex flex-col gap-5">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.is_new && (
                <span className="px-2.5 py-0.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                  Новинка
                </span>
              )}
              {product.is_bestseller && (
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-foreground text-xs font-medium">
                  Хит продаж
                </span>
              )}
              {product.is_discount && (
                <span className="px-2.5 py-0.5 rounded-md bg-destructive text-destructive-foreground text-xs font-medium">
                  Скидка
                </span>
              )}
            </div>

            {/* Name */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {product.brand} / {product.collection}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Арт. {product.sku}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                {product.price_retail.toLocaleString("ru-RU")} {"₽/м²"}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.price_official?.toLocaleString("ru-RU")} {"₽"}
                </span>
              )}
            </div>

            {/* Stock info */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${totalStock > 0 ? "bg-green-500" : "bg-destructive"}`} />
                <span className="text-sm font-medium text-foreground">
                  {totalStock > 0 ? "В наличии" : "Под заказ"}
                </span>
              </div>
              {totalStock > 0 && (
                <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {product.stock_yanino > 0 && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Склад Янино: {product.stock_yanino} м²</span>
                    </div>
                  )}
                  {product.stock_factory > 0 && (
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5" />
                      <span>Завод: {product.stock_factory} м²</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-border rounded-xl overflow-hidden bg-background">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-11 w-11 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Уменьшить количество"
                >
                  <Minus className="h-4 w-4 text-foreground/70" />
                </button>
                <div className="h-11 w-14 flex items-center justify-center border-x border-border">
                  <span className="text-sm font-medium text-foreground">{quantity} м²</span>
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-11 w-11 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Увеличить количество"
                >
                  <Plus className="h-4 w-4 text-foreground/70" />
                </button>
              </div>

              {/* Add to cart */}
              <button className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                <ShoppingCart className="h-4 w-4" />
                В корзину{" "}
                <span className="text-primary-foreground/70">
                  {(product.price_retail * quantity).toLocaleString("ru-RU")} {"₽"}
                </span>
              </button>

              {/* Favorite */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`h-11 w-11 shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
                  isFavorite
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-border hover:bg-accent"
                }`}
                aria-label="Добавить в избранное"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isFavorite ? "fill-destructive text-destructive" : "text-foreground/60"
                  }`}
                />
              </button>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {[
                { icon: Truck, label: "Доставка", value: "от 1-2 дней" },
                { icon: ShieldCheck, label: "Гарантия", value: "Сертификат" },
                { icon: Package, label: "Коробка", value: `${product.sqm_per_box} м²` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border"
                >
                  <item.icon className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 lg:mt-16">
          {/* Tab headers */}
          <div className="border-b border-border">
            <div className="flex gap-0 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="py-6 lg:py-8">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-foreground/80 leading-relaxed">{product.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.rooms.map((room) => (
                    <span
                      key={room}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {room}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-2xl">
                <div className="flex flex-col gap-0">
                  {specifications.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex items-center justify-between py-3 ${
                        i < specifications.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <span className="text-sm text-muted-foreground">{spec.label}</span>
                      <span className="text-sm font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="max-w-3xl flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Доставка</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        title: "Самовывоз со склада",
                        desc: "Бесплатно. Склад в п. Янино-1 (Ленинградская обл.)",
                        time: "Сегодня",
                      },
                      {
                        title: "Доставка по СПб и ЛО",
                        desc: "Стоимость зависит от объёма заказа",
                        time: "1-2 рабочих дня",
                      },
                      {
                        title: "Доставка по России",
                        desc: "Транспортной компанией (СДЭК, Деловые линии)",
                        time: "3-7 рабочих дней",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border"
                      >
                        <Truck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                          <p className="text-xs text-primary font-medium mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Оплата</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Наличный и безналичный расчёт. Для юридических лиц -- оплата по счёту с НДС.
                    Возможна оплата картой при получении на складе.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 lg:mt-12 pb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-6">
              Похожие товары
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
