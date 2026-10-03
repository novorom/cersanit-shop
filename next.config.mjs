/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pvi.cersanit.ru",
      },
      {
        protocol: "https",
        hostname: "images.weserv.nl",
      },
    ],
  },
  async redirects() {
    return [
      // без www → www
      {
        source: "/:path*",
        has: [{ type: "host", value: "opt-plitki-spb.ru" }],
        destination: "https://www.opt-plitki-spb.ru/:path*",
        permanent: true,
      },
      // Vercel-домен → основной домен (предотвращает дубли в индексе Яндекса)
      {
        source: "/:path*",
        has: [{ type: "host", value: "cersanit-shop.vercel.app" }],
        destination: "https://www.opt-plitki-spb.ru/:path*",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      // Запрещаем индексацию с Vercel-домена на случай если боты обходят редиректы
      {
        source: "/:path*",
        has: [{ type: "host", value: "cersanit-shop.vercel.app" }],
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ]
  },
}

export default nextConfig
