import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Коллекции плитки -- Calacatta, Wood Concept и другие | СПб",
  description:
    "Все коллекции керамической плитки и керамогранита: Calacatta, Wood Concept Natural, Deco, Lofthouse и 80+ коллекций. Склад в Янино, доставка по Санкт-Петербургу и ЛО.",
  alternates: { canonical: "https://cersanit-spb.ru/collections" },
  openGraph: {
    title: "Коллекции плитки в СПб",
    description:
      "Все дизайнерские коллекции Lincer в наличии на складе Янино. Доставка по СПб от 1 дня.",
  },
}

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
