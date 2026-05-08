import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Корзина -- Керамогранит Опт",
  description: "Ваша корзина покупок. Оформите заказ на керамическую плитку и керамогранит с доставкой по СПб и ЛО.",
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
