"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { SlidersHorizontal, ChevronRight, Grid3X3, LayoutGrid } from "lucide-react"
import { products } from "@/lib/mock-data"
import { filterOptions } from "@/lib/filter-options"
import { ProductCard } from "@/components/product-card"
import { CatalogFilters, MobileFilterDrawer } from "@/components/catalog-filters"

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешёвые" },
  { value: "price_desc", label: "Сначала дорогие" },
  { value: "name", label: "По названию" },
]

export default function CatalogPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filterOptions.price_range.min,
    filterOptions.price_range.max,
  ])
  const [sort, setSort] = useState("popular")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [gridCols, setGridCols] = useState<3 | 4>(3)

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] || []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [key]: updated }
    })
  }

  const handleClearAll = () => {
    setActiveFilters({})
    setPriceRange([filterOptions.price_range.min, filterOptions.price_range.max])
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Apply filters
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values.length === 0) return
      result = result.filter((p) => {
        const fieldMap: Record<string, string> = {
          product_types: "product_type",
          collections: "collection",
          colors: "color",
          formats: "format",
          surfaces: "surface",
          applications: "application",
        }
        const field = fieldMap[key]
        if (!field) return true
        const record = p as unknown as Record<string, unknown>
        return values.includes(record[field] as string)
      })
    })

    // Apply price filter
    result = result.filter(
      (p) => p.price_retail >= priceRange[0] && p.price_retail <= priceRange[1]
    )

    // Sort
    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.price_retail - b.price_retail)
        break
      case "price_desc":
        result.sort((a, b) => b.price_retail - a.price_retail)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => (b.rating * b.reviews_count) - (a.rating * a.reviews_count))
    }

    return result
  }, [activeFilters, priceRange, sort])

  const totalActiveFilters = Object.values(activeFilters).flat().length

  return (
    <div className="bg-muted/30 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Каталог</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
        {/* Title + Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Каталог плитки</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredProducts.length} товаров
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Фильтры
              {totalActiveFilters > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                  {totalActiveFilters}
                </span>
              )}
            </button>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Grid toggle (desktop) */}
            <div className="hidden lg:flex items-center gap-1 border border-border rounded-lg p-0.5 bg-background">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-md transition-colors ${
                  gridCols === 3 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="3 колонки"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-md transition-colors ${
                  gridCols === 4 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="4 колонки"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {totalActiveFilters > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {Object.entries(activeFilters).map(([key, values]) =>
              values.map((value) => (
                <button
                  key={`${key}-${value}`}
                  onClick={() => handleFilterChange(key, value)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  {value}
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3l6 6M9 3l-6 6" />
                  </svg>
                </button>
              ))
            )}
            <button
              onClick={handleClearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Сбросить все
            </button>
          </div>
        )}

        {/* Main content area */}
        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-background rounded-xl border border-border p-5">
              <CatalogFilters
                activeFilters={activeFilters}
                priceRange={priceRange}
                onFilterChange={handleFilterChange}
                onPriceChange={setPriceRange}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={`grid grid-cols-2 gap-4 lg:gap-5 ${
                  gridCols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <SlidersHorizontal className="h-7 w-7 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ничего не найдено
                </h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                  Попробуйте изменить параметры фильтрации или сбросить фильтры
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        <CatalogFilters
          activeFilters={activeFilters}
          priceRange={priceRange}
          onFilterChange={handleFilterChange}
          onPriceChange={setPriceRange}
          onClearAll={handleClearAll}
        />
      </MobileFilterDrawer>
    </div>
  )
}
