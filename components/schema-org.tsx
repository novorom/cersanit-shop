import { COMPANY_NAME, SITE_URL, PHONE, ADDRESS } from "@/lib/seo-data"

export function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": PHONE,
      "contactType": "customer service",
      "areaServed": "RU",
      "availableLanguage": "Russian"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ADDRESS,
      "addressLocality": "Янино-1",
      "addressRegion": "Leningrad Oblast",
      "postalCode": "188689",
      "addressCountry": "RU"
    }
  }
  return <JsonLd data={schema} />
}

export function BreadcrumbSchema({ items }: { items: { name: string; item: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.item}`
    }))
  }
  return <JsonLd data={schema} />
}

export function ProductSchema({ product }: { product: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.main_image,
    "description": product.description || `${product.name} - купить в интернет-магазине ${COMPANY_NAME}. Цена: ${product.price_retail} руб.`,
    "sku": product.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Lincer"
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/catalog/${product.slug}`,
      "priceCurrency": "RUB",
      "price": product.price_retail,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  }
  return <JsonLd data={schema} />
}

export function FAQSchema({ faq }: { faq: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }
  return <JsonLd data={schema} />
}
