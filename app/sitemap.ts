import type { MetadataRoute } from "next"
import { products } from "@/lib/products-data"

const SITE_URL = "https://keramogranit-opt.ru"

// Дата последнего обновления прайса и каталога
const CATALOG_UPDATED = "2026-04-16"
// Дата последней правки статичных страниц сайта
const SITE_UPDATED = "2026-04-16"

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages — реальные даты последнего изменения, НЕ динамические
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                        lastModified: CATALOG_UPDATED, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/catalog`,           lastModified: CATALOG_UPDATED, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/collections`,       lastModified: CATALOG_UPDATED, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/delivery`,          lastModified: SITE_UPDATED,    changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/reviews`,           lastModified: "2026-02-01",    changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`,             lastModified: SITE_UPDATED,    changeFrequency: "yearly",  priority: 0.5 },
    { url: `${SITE_URL}/contacts`,          lastModified: SITE_UPDATED,    changeFrequency: "yearly",  priority: 0.5 },
  ]

  // SEO landing pages — реальные даты создания/обновления
  const seoLandingDates: Record<string, string> = {
    "spb":                                   "2025-06-01",
    "keramicheskaya-plitka-spb":             "2025-06-01",
    "keramogranit-spb":                      "2025-06-01",
    "plitka-dlya-vannoj-spb":               "2025-06-01",
    "mozaika-spb":                           "2025-07-01",
    "dostavka-plitki-spb":                  "2025-07-01",
    "magazin-plitki-spb":                   "2025-07-01",
    "plitka-pod-derevo-spb":               "2025-07-01",
    "plitka-pod-mramor-spb":               "2025-08-01",
    "plitka-pod-beton-spb":                "2025-08-01",
    "plitka-pod-kamen-spb":                "2025-08-01",
    "plitka-dlya-kuhni-spb":               "2025-08-01",
    "plitka-dlya-prihozhej-spb":           "2025-08-01",
    "plitka-dlya-balkona-spb":             "2025-09-01",
    "keramogranit-60x120-spb":             "2025-09-01",
    "keramogranit-60x60-spb":              "2025-09-01",
    "plitka-30x60-spb":                    "2025-09-01",
    "keramogranit-pod-derevo-spb":         "2025-09-01",
    "keramogranit-pod-mramor-spb":         "2025-09-01",
    "downloads":                            "2025-10-01",
    "faq":                                  "2025-10-01",
    "plitka-seraya-spb":                   "2025-10-01",
    "plitka-belaya-spb":                   "2025-10-01",
    "keramogranit-matovyy-spb":            "2025-10-01",
    "plitka-dlya-dushi-spb":              "2025-10-01",
    "plitka-nastennaya-spb":              "2025-11-01",
    "keramogranit-45x90-spb":             "2025-11-01",
    "plitka-dlya-ofisa-spb":             "2025-11-01",
    "plitka-yanino-spb":                  "2025-11-01",
    // Блог — реальные даты публикации статей
    "blog":                                "2026-03-10",
    "blog/kak-ukladyvat-plitku":          "2025-01-15",
    "blog/kak-ukladyvat-mozaiku":         "2025-01-20",
    "blog/rekomendatsii-po-zatirke":      "2025-02-01",
    "blog/sertifikaty-kachestva":         "2025-02-10",
    "blog/trendy-plitki-2025":            "2025-02-15",
    "blog/kak-rezat-keramogranit":        "2025-02-20",
    "blog/formaty-plitki":                "2025-03-01",
    "blog/kak-vybrat-plitku-dlya-vannoj": "2025-03-05",
    "blog/plitka-dlya-kuhni-kak-vybrat":  "2025-03-10",
    "blog/kak-uhazhivat-za-keramogranitom": "2025-03-15",
    "blog/skolko-plitki-nuzhno-kupit":    "2025-03-20",
    "blog/keramogranit-ili-laminat":      "2025-04-01",
    "blog/keramogranit-dlya-balkona-i-terraisy": "2025-04-10",
    "blog/plitka-pod-mramor-v-interere":  "2025-04-20",
    "blog/kak-sozdat-dizajn-vannoj-v-stile-loft": "2025-05-01",
  }

  const seoPages: MetadataRoute.Sitemap = Object.entries(seoLandingDates).map(([slug, date]) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: date,
    changeFrequency: slug.startsWith("blog/") ? ("monthly" as const) : ("monthly" as const),
    priority: slug === "blog" ? 0.8 : slug.startsWith("blog/") ? 0.75 : 0.8,
  }))

  // Collection pages — только коллекции с 3+ товарами (тонкие закрыты noindex на странице)
  // Счётчик товаров по коллекциям
  const collectionProductCount: Record<string, number> = {}
  for (const p of products) {
    if (p.collection && p.collection.trim()) {
      const slug = p.collection.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, "")
      collectionProductCount[slug] = (collectionProductCount[slug] || 0) + 1
    }
  }

  const collectionSlugs = [
    ...new Set(
      products
        .filter((p) => p.collection && p.collection.trim())
        .map((p) =>
          p.collection!
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-zа-яё0-9-]/gi, "")
        )
    ),
  ]
  // В sitemap включаем только коллекции с 3+ товарами
  const collectionPages: MetadataRoute.Sitemap = collectionSlugs
    .filter((slug) => (collectionProductCount[slug] || 0) >= 3)
    .map((slug) => ({
      url: `${SITE_URL}/collections/${slug}`,
      lastModified: CATALOG_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  // Product pages — с image sitemap (все фото + интерьерные для Google/Яндекс Images)
  const productPages: MetadataRoute.Sitemap = products
    .filter((p) => p.slug)
    .map((product) => {
      const allImages: string[] = []

      // Основные фото товара
      if (product.images) {
        for (const img of product.images) {
          const urls = img.includes(";") ? img.split(";").map((s) => s.trim()).filter(Boolean) : [img]
          for (const url of urls) {
            if (url.startsWith("http") && !allImages.includes(url)) allImages.push(url)
          }
        }
      } else if (product.main_image) {
        allImages.push(product.main_image)
      }

      // Интерьерные фото
      if (product.interior_images) {
        for (const url of product.interior_images) {
          if (url.startsWith("http") && !allImages.includes(url)) allImages.push(url)
        }
      }

      return {
        url: `${SITE_URL}/catalog/${product.slug}`,
        lastModified: CATALOG_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        images: allImages.length > 0 ? allImages : undefined,
      }
    })

  return [...staticPages, ...seoPages, ...collectionPages, ...productPages]
}
