import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/lib/cart-context"
import { ProductsProvider } from "@/lib/products-context"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: {
    default: "Дом Плитки Cersanit СПб — официальный дилер, склад в Янино",
    template: "%s | Дом Плитки Cersanit СПб",
  },
  description:
    "Официальный дилер Cersanit в Санкт-Петербурге. Керамическая плитка и керамогранит от 750 ₽/м². 200+ моделей в наличии на складе в Янино. Доставка по СПб и ЛО от 1 дня.",
  metadataBase: new URL(SITE_URL),
  applicationName: "Дом Плитки Cersanit СПб",
  keywords: [
    "плитка Cersanit СПб",
    "купить керамогранит Санкт-Петербург",
    "плитка Церсанит Янино",
    "официальный дилер Cersanit",
    "керамическая плитка под дерево СПб",
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
    title: "Дом Плитки Cersanit СПб — официальный дилер, склад в Янино",
    description:
      "Керамическая плитка и керамогранит Cersanit с доставкой по Санкт-Петербургу. 200+ моделей в наличии. Официальный дилер.",
    url: SITE_URL,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Дом Плитки Cersanit — официальный дилер в Санкт-Петербурге",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Дом Плитки Cersanit СПб",
    description: "Официальный дилер Cersanit в СПб. Склад в Янино. 200+ товаров в наличии.",
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
  name: "Дом Плитки CERSANIT",
  alternateName: "Cersanit-SPb",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Официальный дилер керамической плитки и керамогранита Cersanit в Санкт-Петербурге. Склад в Янино-1. Доставка по СПб и ЛО от 1 дня.",
  telephone: "+7-905-205-09-00",
  email: "info@cersanit-spb.ru",
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
    "https://zoon.ru/spb/building/internet-magazin_cersanit-spb/",
    "https://cersanit.ru/dealers/",
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
        <script src="https://apis.google.com/js/platform.js?onload=renderBadge" async defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.renderBadge = function() {
                var ratingBadgeContainer = document.createElement("div");
                document.body.appendChild(ratingBadgeContainer);
                window.gapi.load('ratingbadge', function() {
                  window.gapi.ratingbadge.render(ratingBadgeContainer, {
                    "merchant_id": 5750220121,
                    "position": "BOTTOM_LEFT"
                  });
                });
              }
              
              window.renderOptIn = function(orderId, email) {
                window.gapi.load('surveyoptin', function() {
                  window.gapi.surveyoptin.render({
                    "merchant_id": 5750220121,
                    "order_id": orderId,
                    "email": email || "",
                    "delivery_country": "RU",
                    "estimated_delivery_date": new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                  });
                });
              }
            `,
          }}
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
