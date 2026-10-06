import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteChrome } from "@/components/site-chrome"
import { CartProvider } from "@/lib/cart-context"
import { ProductsProvider } from "@/lib/products-context"
import GoogleScripts from "@/components/google-scripts"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

const SITE_URL = "https://www.opt-plitki-spb.ru"

export const metadata: Metadata = {
  title: {
    default: "Купить плитку и керамогранит в СПб — Керамогранит Опт",
    template: "%s | Керамогранит Опт",
  },
  description:
    "Каталог керамической плитки, керамогранита и мозаики разных брендов в Санкт-Петербурге. Цены, характеристики и складские остатки смотрите в карточках товаров. Самовывоз в Янино, доставка по СПб и Ленинградской области по согласованию.",
  metadataBase: new URL(SITE_URL),
  applicationName: "Керамогранит Опт",
  keywords: [
    "купить керамическую плитку в Санкт-Петербурге",
    "купить керамогранит в Санкт-Петербурге",
    "плитка со склада Янино",
    "керамогранит оптом Санкт-Петербург",
    "мозаика Санкт-Петербург",
    "склад плитки Янино",
    "плитка для ванной СПб",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-120.png", sizes: "120x120", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Купить плитку и керамогранит в СПб — Керамогранит Опт",
    description:
      "Плитка, керамогранит и мозаика разных брендов. Цены и остатки — в карточках товаров. Самовывоз в Янино, доставка по Санкт-Петербургу и Ленинградской области по согласованию.",
    url: SITE_URL,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Керамогранит Опт — плитка и керамогранит в Санкт-Петербурге",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Керамогранит Опт",
    description: "Плитка и керамогранит в Санкт-Петербурге: цены и наличие, склад в Янино.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  other: {
    "yandex-verification": "1f85757551ab6b60",
  },
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
}

// LocalBusiness вместо Organization — более конкретный тип для Яндекса/Google
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  "@id": `${SITE_URL}/#business`,
  name: "Керамогранит Опт",
  alternateName: "Керамогранит Опт СПб",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-opt.svg`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Керамическая плитка, керамогранит и мозаика разных брендов. Склад в Янино-1, самовывоз и доставка по Санкт-Петербургу и Ленинградской области.",
  telephone: "+7-905-205-09-00",
  email: "novorom@mail.ru",
  priceRange: "₽₽",
  currenciesAccepted: "RUB",
  paymentAccepted: "Наличные, банковская карта, безналичный расчёт",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Заводская улица, 37",
    addressLocality: "Янино-1",
    addressRegion: "Ленинградская область",
    addressCountry: "RU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-905-205-09-00",
    contactType: "sales",
    areaServed: ["Санкт-Петербург", "Ленинградская область"],
    availableLanguage: "Russian",
  },
  sameAs: [
    "https://yandex.ru/maps/-/CDn892w",
    "https://2gis.ru/spb",
  ],
  hasMap: "https://yandex.ru/maps/-/CDn892w",
  areaServed: {
    "@type": "State",
    name: "Санкт-Петербург и Ленинградская область",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <GoogleScripts />
        <ProductsProvider>
          <CartProvider>
          <SiteChrome>
            <main className="min-h-screen">{children}</main>
          </SiteChrome>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
