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
      {
        protocol: "https",
        hostname: "lincer.ru",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    const vercelHosts = [
      "v0-cersanit-shop.vercel.app",
      "cersanit-shop-eosin.vercel.app",
      "cersanit-shop-novorom-6051s-projects.vercel.app",
      "cersanit-shop.vercel.app",
    ]

    return [
      // Keep the old Vercel homepage from competing with the canonical domain.
      ...vercelHosts.flatMap((host) => [
        {
          source: "/",
          has: [{ type: "host", value: host }],
          destination: "https://cersanit-spb.ru/",
          permanent: true,
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: host }],
          destination: "https://cersanit-spb.ru/:path*",
          permanent: true,
        },
      ]),
    ]
  },
}

export default nextConfig
