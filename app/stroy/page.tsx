import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"
import Script from "next/script"

const SITE_URL = "https://cersanit-spb.ru"
const source = readFileSync(join(process.cwd(), "data/tf-keramika-landing-v4.html"), "utf8")
const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? ""
const landingMarkup = body.replace(/<script>[\s\S]*?<\/script>/i, "")

export const metadata: Metadata = {
  title: "Плитка и керамогранит для строителей в СПб — ТФ Керамика",
  description:
    "Плитка и керамогранит со склада в Войскорово для строительных бригад и подрядчиков. Цены с НДС, оплата по счёту, самовывоз и доставка по Санкт-Петербургу и Ленинградской области.",
  alternates: { canonical: `${SITE_URL}/stroy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Плитка и керамогранит для строителей в СПб — ТФ Керамика",
    description:
      "Актуальные остатки плитки и керамогранита со склада в Войскорово. Цены с НДС, оплата по счёту, самовывоз и доставка.",
    url: `${SITE_URL}/stroy`,
    siteName: "ТФ Керамика",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${SITE_URL}/stroy/img/photos/001.jpg`, alt: "Плитка из каталога ТФ Керамика" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Плитка для строителей — ТФ Керамика",
    description: "Остатки со склада в Войскорово, цены с НДС, самовывоз и доставка.",
    images: [`${SITE_URL}/stroy/img/photos/001.jpg`],
  },
}

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": `${SITE_URL}/stroy#store`,
  name: "ТФ Керамика",
  url: `${SITE_URL}/stroy`,
  image: `${SITE_URL}/stroy/img/photos/001.jpg`,
  description:
    "Плитка и керамогранит со склада в Войскорово для строительных бригад и подрядчиков. Цены с НДС, самовывоз и доставка.",
  telephone: "+7 905 205-09-00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "14В",
    addressLocality: "посёлок Войскорово",
    addressRegion: "Ленинградская область",
    addressCountry: "RU",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  }],
}

export default function StroyPage() {
  return (
    <>
      <link rel="stylesheet" href="/stroy/landing.css" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd).replace(/</g, "\\u003c") }}
      />
      <div id="tf-stroy-landing" dangerouslySetInnerHTML={{ __html: landingMarkup }} />
      <Script src="/stroy/landing.js" strategy="afterInteractive" />
    </>
  )
}
