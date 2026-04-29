import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo-landing-page"
import { seoPages, SITE_URL } from "@/lib/seo-data"

const data = seoPages["mozaika-spb"]

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: `${SITE_URL}/mozaika-spb` },
  openGraph: {
    title: data.title,
    description: data.description,
    url: `${SITE_URL}/mozaika-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

export default function MozaikaSPBPage() {
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
                item: `${SITE_URL}/mozaika-spb`,
              },
            ],
          }),
        }}
      />
      <SeoLandingPage data={data} />
    </>
  )
}
