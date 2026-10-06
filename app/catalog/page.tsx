import type { Metadata } from "next"
import { CatalogClient } from "./catalog-client"
import { products } from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

const CATALOG_URL = "https://www.opt-plitki-spb.ru/catalog"

export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
  const params = await searchParams
  const hasFilters = Object.values(params).some((value) => value !== undefined)
  return {
  title: "Каталог плитки оптом и в розницу — купить керамогранит и плитку в СПб | Керамогранит Опт",
  description: "Огромный каталог керамической плитки и керамогранита в Санкт-Петербурге. Купить оптом и в розницу напрямую со склада в Янино. Актуальные цены, фото, быстрая доставка по СПб и ЛО.",
  alternates: { canonical: CATALOG_URL },
  ...(hasFilters ? { robots: { index: false, follow: true } } : {}),
  openGraph: {
    title: "Каталог плитки оптом и в розницу в СПб — Керамогранит Опт",
    description: "Каталог плитки и керамогранита: цены, характеристики и складские остатки в карточках товаров.",
    url: CATALOG_URL,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
  }
}

export default function CatalogPage() {
  const initialProducts: Product[] = products
    .filter((p) => p.name && p.name.trim() && p.price_retail >= 0 && p.slug);

  return <CatalogClient initialProducts={initialProducts} />
}
