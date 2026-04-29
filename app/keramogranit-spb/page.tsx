import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo-landing-page"
import { seoPages, SITE_URL } from "@/lib/seo-data"

const data = seoPages["keramogranit-spb"]

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: `${SITE_URL}/keramogranit-spb` },
  openGraph: {
    title: data.title,
    description: data.description,
    url: `${SITE_URL}/keramogranit-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

export default function KeramoGranitSPBPage() {
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
                item: `${SITE_URL}/keramogranit-spb`,
              },
            ],
          }),
        }}
      />
      <SeoLandingPage data={data} />
    </>
  )
}
