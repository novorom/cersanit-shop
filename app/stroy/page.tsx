import { Metadata } from 'next'
import StroyPageClient from './stroy-client'

export const metadata: Metadata = {
  title: 'ТФ Керамика: плитка и керамогранит для строителей, остатки со склада',
  description: 'Плитка и керамогранит от 400 ₽/м² со склада в Войскорово. Работаем по счёту с НДС, самовывоз, бесплатный расчёт количества.',
  alternates: { canonical: 'https://www.opt-plitki-spb.ru/stroy' },
  openGraph: {
    title: 'ТФ Керамика: плитка и керамогранит для строителей, остатки со склада',
    description: 'Плитка и керамогранит от 400 ₽/м² со склада в Войскорово (Ленинградская область). Работаем по счёту с НДС, самовывоз, бесплатный расчёт количества.',
    url: 'https://www.opt-plitki-spb.ru/stroy',
    siteName: 'ТФ Керамика',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function StroyPage() {
  return <StroyPageClient />
}
