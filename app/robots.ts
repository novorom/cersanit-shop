import type { MetadataRoute } from "next"

const SITE_URL = "https://keramogranit-opt.ru"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/", "/cart", "/*.json$", "/checkout"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/cart", "/*.json$", "/checkout"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/admin/", "/api/", "/cart", "/*.json$", "/checkout"],
        crawlDelay: 1,
      },
      // AI bots — разрешаем для видимости в AI-ответах
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      // Яндекс ИИ (Алиса, YandexGPT)
      { userAgent: "YandexBot", allow: "/" },
      { userAgent: "YandexImages", allow: "/" },
      { userAgent: "AliceSuggestion", allow: "/" },
      // Meta AI
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Meta-ExternalFetcher", allow: "/" },
      // Other AI crawlers
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
