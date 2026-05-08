import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Доставка плитки по СПб и ЛО -- самовывоз со склада Янино",
  description:
    "Доставка керамической плитки и керамогранита по Санкт-Петербургу и Ленинградской области от 1 дня. Бесплатный самовывоз со склада в Янино. Доставка по всей России.",
  alternates: { canonical: "https://cersanit-spb.ru/delivery" },
  openGraph: {
    title: "Доставка плитки по СПб и ЛО",
    description:
      "Самовывоз бесплатно со склада Янино. Доставка по СПб от 1 дня. Транспорт по всей России.",
  },
}

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
