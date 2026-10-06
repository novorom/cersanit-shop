import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Каталог плитки и керамогранита в Санкт-Петербурге",
  description:
    "Керамическая плитка, керамогранит и мозаика разных брендов. Смотрите характеристики, цены и складские остатки в карточках товаров. Самовывоз в Янино и доставка по Санкт-Петербургу и Ленинградской области.",
  alternates: { canonical: "https://www.opt-plitki-spb.ru/catalog" },
  openGraph: {
    title: "Каталог плитки и керамогранита в Санкт-Петербурге",
    description:
      "Каталог керамической плитки, керамогранита и мозаики. Цены, характеристики и складские остатки указаны в карточках товаров.",
  },
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
