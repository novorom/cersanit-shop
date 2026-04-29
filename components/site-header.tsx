"use client"

import { useState, KeyboardEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Heart, ShoppingCart, Menu, X, Phone } from "lucide-react"
import { Logo } from "./logo"
import { useCart } from "@/lib/cart-context"

const navLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/collections", label: "Коллекции" },
  { href: "/blog", label: "Блог" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
]

export function SiteHeader() {
  const router = useRouter()
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-auto py-2.5 text-sm flex-wrap gap-3">
          <span className="hidden sm:block">Мультибрендовый дилер керамической плитки в РФ</span>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+79052050900" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>+7 (905) 205-09-00</span>
            </a>
            <span className="text-primary-foreground/70 hidden lg:inline">Склад: Пн–Пт 10:00–16:45 | Шоурум: ежедн. 10:00–17:00</span>
            <span className="text-primary-foreground/70 lg:hidden">Пн–Пт 10:00–16:45</span>
            <a href="https://t.me/flyroman" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" title="Telegram" aria-label="Telegram @flyroman">
              <Image 
                src="/images/telegram-logo.svg" 
                alt="Telegram" 
                width={32} 
                height={32}
                className="h-7 w-7 shrink-0"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo className="h-11 md:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className={`${searchOpen ? "flex" : "hidden"} lg:flex items-center relative`}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Поиск плитки..."
              className="h-9 w-48 xl:w-64 rounded-lg border border-input bg-muted/50 px-3 pr-9 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2.5 hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-foreground/70" />
          </button>

          <button className="p-2 rounded-lg hover:bg-accent transition-colors relative" aria-label="Favourites">
            <Heart className="h-5 w-5 text-foreground/70" />
          </button>
          <button 
            onClick={() => router.push('/cart')}
            className="p-2 rounded-lg hover:bg-accent transition-colors relative" 
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5 text-foreground/70" />
            {items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground/70" />
            ) : (
              <Menu className="h-5 w-5 text-foreground/70" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
