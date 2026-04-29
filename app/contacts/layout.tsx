import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Контакты магазина плитки в СПб -- телефон, Telegram, адрес",
  description:
    "Свяжитесь с нами: +7 (905) 205-09-00, Telegram @flyroman, email novorom@mail.ru. Склад в Янино-1 (СПб). Режим работы: Пн-Пт 10:00-16:45. Доставка плитки по СПб и ЛО.",
  alternates: { canonical: "https://keramogranit-opt.ru/contacts" },
  openGraph: {
    title: "Контакты магазина плитки в СПб",
    description:
      "Телефон, Telegram, email. Склад и шоурум в Янино-1, Ленинградская область.",
  },
}

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
