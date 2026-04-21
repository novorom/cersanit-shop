import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { products } from "@/lib/products-data"
import { getCollectionSeo } from "@/lib/collection-seo"
import { ProductPageClient } from "./product-client"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://lincer.ru"

export async function generateStaticParams() {
  return products
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return { title: "Товар не найден | LINCER" }
  }

  const isUnit = ["Мозаика", "Ступень", "Плинтус", "Вставка"].includes(product.product_type ?? "")
  const priceUnit = isUnit ? "₽/шт" : "₽/м²"
  const title = `${product.name} — купить в СПб ${product.price_retail} ${priceUnit}`

  // Уникальное описание: комбинируем характеристики + SEO текст коллекции
  const collectionSeo = product.collection ? getCollectionSeo(product.collection) : null
  const appText = collectionSeo?.application
    ? ` ${collectionSeo.application.slice(0, 120)}...`
    : ""
  const description =
    `Купить ${product.name} в Санкт-Петербурге. Цена ${product.price_retail} ${priceUnit}.` +
    `${product.surface ? ` Поверхность: ${product.surface}.` : ""}` +
    `${product.color ? ` Цвет: ${product.color}.` : ""}` +
    `${product.format ? ` Формат ${product.format} см.` : ""}` +
    `${appText}` +
    ` Склад Янино, доставка по СПб и ЛО от 1 дня. Артикул: ${product.sku}.`

  return {
    title,
    description: description.slice(0, 300),
    alternates: { canonical: `${SITE_URL}/catalog/${product.slug}` },
    openGraph: {
      title,
      description: description.slice(0, 200),
      url: `${SITE_URL}/catalog/${product.slug}`,
      siteName: "LINCER",
      locale: "ru_RU",
      type: "website",
      images: product.main_image
        ? [{ url: product.main_image, alt: product.name }]
        : [],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Товар не найден</h1>
        <Link href="/catalog" className="text-primary hover:underline">Вернуться в каталог</Link>
      </div>
    )
  }

  const isUnit = ["Мозаика", "Ступень", "Плинтус", "Вставка"].includes(product.product_type ?? "")
  const priceUnit = isUnit ? "₽/шт" : "₽/м²"
  const collectionSeo = product.collection ? getCollectionSeo(product.collection) : null
  const collectionSlug = product.collection
    ? product.collection.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, "")
    : null

  // Preload главного фото через weserv
  const rawImage = product.main_image || (product.images && product.images[0])
  const preloadUrl = rawImage
    ? `https://images.weserv.nl/?url=${rawImage.replace("https://", "").replace("http://", "")}&w=900&output=webp&q=80&il`
    : null

  // Schema.org Product — SSR для Яндекса
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: collectionSeo?.about
      ? `${collectionSeo.about} ${collectionSeo.application}`
      : `${product.name} — керамическая плитка и керамогранит ${product.brand || 'LINCER'}. Купить в Санкт-Петербурге на складе.`,
    sku: product.sku,
    mpn: product.bsu,
    brand: { "@type": "Brand", name: product.brand || "LINCER" },
    image: product.main_image ? [product.main_image] : [],
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      price: product.price_retail,
      priceCurrency: "RUB",
      availability:
        (product.stock_yanino ?? 0) > 0 || (product.stock_factory ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: "LINCER",
        url: SITE_URL,
      },
      url: `${SITE_URL}/catalog/${product.slug}`,
      areaServed: "Санкт-Петербург и Ленинградская область",
      priceValidUntil: "2026-12-31",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "RUB",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "RU",
          addressRegion: ["Санкт-Петербург", "Ленинградская область"],
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
        },
      },
    },
    ...(product.color ? { color: product.color } : {}),
    ...(product.material_type ? { material: product.material_type } : {}),
    ...(product.width && product.length
      ? { width: { "@type": "QuantitativeValue", value: parseFloat(product.width), unitCode: "CMT" } }
      : {}),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
      ...(product.collection && collectionSlug
        ? [{ "@type": "ListItem", position: 3, name: product.collection, item: `${SITE_URL}/collections/${collectionSlug}` }]
        : []),
      { "@type": "ListItem", position: product.collection ? 4 : 3, name: product.name, item: `${SITE_URL}/catalog/${product.slug}` },
    ],
  }

  return (
    <>
      {/* Preload главного фото */}
      {preloadUrl && (
        <link rel="preload" as="image" href={preloadUrl} fetchPriority="high" />
      )}

      {/* Schema.org — SSR, Яндекс видит без JS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb — SSR */}
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            {product.collection && collectionSlug && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href={`/collections/${collectionSlug}`} className="hover:text-primary transition-colors">
                  {product.collection}
                </Link>
              </>
            )}
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Основной клиентский компонент */}
      <ProductPageClient slug={slug} />

      {/* SEO-блок с текстом коллекции — SSR, Яндекс читает без JS */}
      {collectionSeo && (
        <section className="bg-muted/30 border-t border-border py-10">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-lg font-bold text-foreground mb-3">
              О коллекции {product.collection}
            </h2>
            <div className="flex flex-col gap-3 text-sm text-foreground/75 leading-relaxed">
              <p>{collectionSeo.about}</p>
              <p>{collectionSeo.application}</p>
              <p>
                Купить <strong>{product.name}</strong> в Санкт-Петербурге с доставкой на склад Янино.
                Цена {product.price_retail} {priceUnit}.
                {product.surface ? ` Поверхность: ${product.surface}.` : ""}
                {product.wear_class ? ` Класс износостойкости: ${product.wear_class}.` : ""}
                {product.slip_class ? ` Класс скользкости: ${product.slip_class}.` : ""}
                {" "}Доставка по Санкт-Петербургу и Ленинградской области от 1 рабочего дня.
              </p>
            </div>
            <div className="mt-4">
              <Link
                href={`/collections/${collectionSlug}`}
                className="text-sm text-primary hover:underline"
              >
                Все товары коллекции {product.collection} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Если нет текста коллекции — общий SEO-блок */}
      {!collectionSeo && (
        <section className="bg-muted/30 border-t border-border py-10">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-lg font-bold text-foreground mb-3">
              {product.name} — купить в СПб
            </h2>
            <p className="text-sm text-foreground/75 leading-relaxed">
              {product.name} — {product.product_type?.toLowerCase() || "керамическая плитка"} от 
              производителя {product.brand || "LINCER"}.
              {product.format ? ` Формат ${product.format} см.` : ""}
              {product.surface ? ` Поверхность ${product.surface.toLowerCase()}.` : ""}
              {product.color ? ` Цвет: ${product.color}.` : ""}
              {" "}Сертифицирована в России. В наличии на складе в Янино-1 (СПб).
              Самовывоз бесплатный. Доставка по Санкт-Петербургу и Ленинградской области
              от 1 рабочего дня. Цена {product.price_retail} {priceUnit}. Артикул: {product.sku}.
            </p>
          </div>
        </section>
      )}
    </>
  )
}
