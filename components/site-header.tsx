"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, ShoppingCart, Menu, X, Phone } from "lucide-react"

const navLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/collections", label: "Коллекции" },
  { href: "#", label: "Доставка" },
  { href: "#", label: "О компании" },
  { href: "#", label: "Контакты" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-9 text-sm">
          <span className="hidden sm:block">Официальный дилер Cersanit в России</span>
          <div className="flex items-center gap-4">
            <a href="tel:+78123091234" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span>+7 (812) 309-12-34</span>
            </a>
            <span className="hidden sm:block text-primary-foreground/70">Пн-Пт 9:00-18:00</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-foreground">Cersanit</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Shop</span>
            </div>
          </div>
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
              placeholder="Поиск плитки..."
              className="h-9 w-48 xl:w-64 rounded-lg border border-input bg-muted/50 px-3 pr-9 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
            />
            <Search className="absolute right-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Поиск"
          >
            <Search className="h-5 w-5 text-foreground/70" />
          </button>

          <button className="p-2 rounded-lg hover:bg-accent transition-colors relative" aria-label="Избранное">
            <Heart className="h-5 w-5 text-foreground/70" />
          </button>
          <button className="p-2 rounded-lg hover:bg-accent transition-colors relative" aria-label="Корзина">
            <ShoppingCart className="h-5 w-5 text-foreground/70" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              0
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Меню"
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
