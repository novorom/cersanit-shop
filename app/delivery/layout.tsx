import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Доставка плитки по СПб и ЛО -- самовывоз со склада Янино",
  description:
    "Доставка керамической плитки и керамогранита по Санкт-Петербургу и Ленинградской области по согласованию. Бесплатный самовывоз со склада в Янино. Доставка по всей России.",
  alternates: { canonical: "https://www.opt-plitki-spb.ru/delivery" },
  openGraph: {
    title: "Доставка плитки по СПб и ЛО",
    description:
      "Самовывоз бесплатно со склада Янино. Доставка по СПб по согласованию. Транспорт по всей России.",
  },
}

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
