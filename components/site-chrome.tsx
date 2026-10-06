"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      {pathname !== "/stroy" && <SiteHeader />}
      {children}
      {pathname !== "/stroy" && <SiteFooter />}
    </>
  )
}
