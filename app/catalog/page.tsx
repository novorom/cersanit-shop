import type { Metadata } from "next"
import { CatalogClient } from "./catalog-client"
import { products } from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

export const metadata: Metadata = {
  title: "Каталог плитки Керамогранит Опт в СПб — купить керамогранит и керамическую плитку со склада",
  description: "Каталог керамической плитки и керамогранита Керамогранит Опт в Санкт-Петербурге. Сотни моделей в наличии на складе. Цены оптовые. Доставка по СПб и ЛО от 1 дня. Самовывоз бесплатно.",
  alternates: { canonical: "https://lincer-spb.ru/catalog" },
  openGraph: {
    title: "Каталог плитки Керамогранит Опт в СПб — все новинки в наличии",
    description: "Керамическая плитка и керамогранит со склада. Доставка по СПб от 1 дня.",
    url: "https://lincer-spb.ru/catalog",
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

export default function CatalogPage() {
  const initialProducts: Product[] = products
    .filter((p) => p.name && p.name.trim() && p.price_retail && p.price_retail > 0 && p.slug)

  return <CatalogClient initialProducts={initialProducts} />
}
