import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/lib/cart-context"
import { ProductsProvider } from "@/lib/products-context"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

const SITE_URL = "https://keramogranit-opt.ru"

export const metadata: Metadata = {
  title: {
    default: "Керамогранит Опт — мультибрендовый гипермаркет плитки, склад в Янино",
    template: "%s | Керамогранит Опт",
  },
  description:
    "Официальный мультибрендовый дилер (Lincer, Kerama Marazzi, Gracia Ceramica) в Санкт-Петербурге. Керамическая плитка и керамогранит от 750 ₽/м². Более 2000 моделей в наличии на складе в Янино. Доставка по СПб и ЛО от 1 дня.",
  metadataBase: new URL(SITE_URL),
  applicationName: "Керамогранит Опт",
  keywords: [
    "плитка Керамогранит Опт",
    "купить керамогранит Санкт-Петербург",
    "плитка Янино",
    "мультибрендовый дилер плитки",
    "керамическая плитка под дерево СПб",
    "плитка для ванной СПб",
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Керамогранит Опт — склад в Янино",
    description:
      "Керамическая плитка и керамогранит Керамогранит Опт с доставкой по Санкт-Петербургу. Более 2000 моделей в наличии.",
    url: SITE_URL,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Керамогранит Опт Керамогранит Опт — гипермаркет плитки в Санкт-Петербурге",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Керамогранит Опт",
    description: "Оптовый дилер в СПб. Склад в Янино. 2000+ товаров в наличии.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  other: {
    "yandex-verification": "1f85757551ab6b60",
    // Geo-метатеги для Яндекса (определение региона)
    "geo.region": "RU-SPE",
    "geo.placename": "Санкт-Петербург",
    "geo.position": "59.9311;30.3609",
    "ICBM": "59.9311, 30.3609",
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
  alternateName: "Lincer-SPb",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Мультибрендовый гипермаркет керамической плитки и керамогранита в Санкт-Петербурге. Склад в Янино-1. Доставка по СПб и ЛО от 1 дня.",
  telephone: "+7-905-205-09-00",
  email: "info@keramogranit-opt.ru",
  priceRange: "₽₽",
  currenciesAccepted: "RUB",
  paymentAccepted: "Наличные, банковская карта, безналичный расчёт",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Заводская улица, 37",
    addressLocality: "Янино-1",
    addressRegion: "Ленинградская область",
    postalCode: "188661",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.9311,
    longitude: 30.3609,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-905-205-09-00",
    contactType: "sales",
    areaServed: ["Санкт-Петербург", "Ленинградская область"],
    availableLanguage: "Russian",
    contactOption: "TollFree",
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
        <ProductsProvider>
          <CartProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
