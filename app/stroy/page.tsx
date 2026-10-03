import { Metadata } from 'next'
import StroyPageClient from './stroy-client'

export const metadata: Metadata = {
  title: 'Строителям — оптовые поставки керамической плитки и керамогранита в СПб | Керамогранит Опт',
  description: 'Плитка и керамогранит от 400 ₽/м² со склада в Войскорово. Работаем по счёту с НДС, самовывоз, бесплатный расчёт количества. Телефон: +7 (905) 205-09-00.',
  alternates: { canonical: 'https://www.opt-plitki-spb.ru/stroy' },
  openGraph: {
    title: 'Строителям — оптовые поставки керамической плитки и керамогранита в СПб',
    description: 'Плитка и керамогранит от 400 ₽/м² со склада в Войскорово. Работаем по счёту с НДС.',
    url: 'https://www.opt-plitki-spb.ru/stroy',
    siteName: 'Керамогранит Опт',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function StroyPage() {
  return <StroyPageClient />
}
