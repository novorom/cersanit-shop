import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo-landing-page"
import { seoPages, SITE_URL } from "@/lib/seo-data"

const data = seoPages["plitka-dlya-vannoj-spb"]

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: `${SITE_URL}/plitka-dlya-vannoj-spb` },
  openGraph: {
    title: data.title,
    description: data.description,
    url: `${SITE_URL}/plitka-dlya-vannoj-spb`,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
  },
}

export default function PlitkaVannojSPBPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: data.breadcrumbLabel,
                item: `${SITE_URL}/plitka-dlya-vannoj-spb`,
              },
            ],
          }),
        }}
      />
      <SeoLandingPage data={data} />
    </>
  )
}
