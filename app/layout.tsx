import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteChrome } from "@/components/site-chrome"
import { CartProvider } from "@/lib/cart-context"
import { ProductsProvider } from "@/lib/products-context"
import GoogleScripts from "@/components/google-scripts"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: {
    default: "Купить плитку и керамогранит в СПб — Дом Плитки Cersanit",
    template: "%s | Дом Плитки",
  },
  description:
    "Керамическая плитка, керамогранит и мозаика Cersanit и других брендов в Санкт-Петербурге. Актуальные цены и наличие в каталоге. Самовывоз со склада в Янино и доставка по СПб и Ленинградской области.",
  metadataBase: new URL(SITE_URL),
  applicationName: "Дом Плитки CERSANIT",
  keywords: [
    "купить плитку СПб",
    "купить керамогранит СПб",
    "плитка со склада Янино",
    "плитка Cersanit Санкт-Петербург",
    "керамогранит Cersanit СПб",
    "мозаика Cersanit",
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
    title: "Купить плитку и керамогранит в СПб — Дом Плитки Cersanit",
    description:
      "Плитка, керамогранит и мозаика Cersanit и других брендов. Актуальные цены и наличие, самовывоз из Янино и доставка по Санкт-Петербургу и Ленинградской области.",
    url: SITE_URL,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Дом Плитки CERSANIT — плитка и керамогранит в Санкт-Петербурге",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Дом Плитки CERSANIT",
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
  name: "Дом Плитки CERSANIT",
  alternateName: "Дом Плитки Cersanit СПб",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-cersanit.png`,
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
