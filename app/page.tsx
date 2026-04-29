import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"

const HomeContent = dynamic(() => import("@/components/home-content").then(mod => ({ default: mod.HomeContent })), {
  loading: () => <div className="min-h-screen bg-background" />
})

export const metadata: Metadata = {
  alternates: {
    canonical: "https://keramogranit-opt.ru",
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <HomeContent />
      </Suspense>
    </div>
  )
}
