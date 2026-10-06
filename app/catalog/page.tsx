import type { Metadata } from "next"
import { CatalogClient } from "./catalog-client"
import { products } from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

export const metadata: Metadata = {
  title: "Каталог плитки оптом и в розницу — купить керамогранит и плитку в СПб | Дом Плитки CERSANIT",
  description: "Огромный каталог керамической плитки и керамогранита в Санкт-Петербурге. Купить оптом и в розницу напрямую со склада в Янино. Актуальные цены, фото, быстрая доставка по СПб и ЛО.",
  alternates: { canonical: "https://cersanit-spb.ru/catalog" },
  openGraph: {
    title: "Каталог плитки оптом и в розницу в СПб — Дом Плитки CERSANIT",
    description: "Более 4500 видов плитки и керамогранита со склада. Выгодные цены, доставка от 1 дня.",
    url: "https://cersanit-spb.ru/catalog",
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
  },
}

export default function CatalogPage() {
  const initialProducts: Product[] = products
    .filter((p) => p.name && p.name.trim() && p.price_retail >= 0 && p.slug);

  return <CatalogClient initialProducts={initialProducts} />
}
