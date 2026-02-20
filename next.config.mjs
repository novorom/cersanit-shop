/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pvi.cersanit.ru",
        pathname: "/upload/**",
      },
    ],
  },
}

export default nextConfig
