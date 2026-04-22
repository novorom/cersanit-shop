"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SlidersHorizontal, ChevronRight, Grid3X3, LayoutGrid } from "lucide-react"
import { filterOptions } from "@/lib/filter-options"
import { ProductCard } from "@/components/product-card"
import { CatalogFilters, MobileFilterDrawer } from "@/components/catalog-filters"
import { useProducts } from "@/lib/products-context"
import type { Product } from "@/lib/products-data"

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешёвые" },
  { value: "price_desc", label: "Сначала дорогие" },
  { value: "name", label: "По названию" },
]

function CatalogContent({ initialProducts = [] }: { initialProducts?: Product[] }) {
  const searchParams = useSearchParams()
  const { products } = useProducts()
  const collectionSlug = searchParams.get("collection")
  const productType = searchParams.get("product_type")
  const searchQuery = searchParams.get("search") || ""

  const initialFilters = useMemo((): Record<string, string[]> => {
    const filters: Record<string, string[]> = {}
    if (productType) filters.product_types = [productType]
    if (collectionSlug) {
      const collectionName = collectionSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      filters.collections = [collectionName]
    }
    return filters
  }, [productType, collectionSlug])

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(initialFilters)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])

  useEffect(() => {
    const filters: Record<string, string[]> = {}
    if (productType) filters.product_types = [productType]
    if (collectionSlug) {
      const collectionName = collectionSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      filters.collections = [collectionName]
    }
    if (Object.keys(filters).length > 0) setActiveFilters(filters)
  }, [productType, collectionSlug])

  const [sort, setSort] = useState("name")
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

  const handleClearAll = () => setActiveFilters({})

  const filteredProducts = useMemo(() => {
    let result = products.length > 0 ? [...products] : [...initialProducts]

    // Filter out invalid products (missing name or sku)
    result = result.filter(
      (p) =>
        p.name &&
        p.name.trim() &&
        p.sku &&
        p.sku.trim()
    )

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.sku ?? "").toLowerCase().includes(query) ||
          p.collection.toLowerCase().includes(query) ||
          p.product_type.toLowerCase().includes(query)
      )
    }

    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values.length === 0) return
      result = result.filter((p) => {
        const fieldMap: Record<string, string> = {
          product_types: "product_type",
          colors: "color",
          dimensions: "format",
          designs: "collection",
          surface_types: "surface",
          collections: "collection",
        }
        const field = fieldMap[key]
        if (!field) return true
        const record = p as unknown as Record<string, unknown>
        const productValue = record[field] as string

        // Нормализация: "Керамическая плитка" → "Плитка"
        const normalizedValues = values.map(v => v === "Керамическая плитка" ? "Плитка" : v === "Ступени" ? "Ступень" : v)

        if (key === "designs") {
          const designMapping = filterOptions.designCategoryMapping as Record<string, string[]>
          const matchedCollections = values.flatMap((v) => designMapping[v] || [])
          return matchedCollections.includes(productValue)
        }

        if (key === "surface_types" && values.includes("полированная (глянец)")) {
          if (productValue === "глянцевая" || productValue === "полированная") return true
        }

        return normalizedValues.includes(productValue)
      })
    })

    // Price filter
    result = result.filter(
      (p) => p.price_retail >= priceRange[0] && p.price_retail <= priceRange[1]
    )

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
        result.sort((a, b) => {
          const aScore = (a.rating || 0) * (a.reviews_count || 0)
          const bScore = (b.rating || 0) * (b.reviews_count || 0)
          return bScore - aScore
        })
    }

    return result
  }, [searchQuery, activeFilters, sort, products, initialProducts, priceRange])

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
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {searchQuery ? `Поиск: "${searchQuery}"` : "Каталог плитки"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} товаров</p>
          </div>
          <div className="flex items-center gap-3">
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
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-background rounded-xl border border-border p-5">
              <CatalogFilters
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
              />
            </div>
          </div>

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={`grid grid-cols-2 gap-4 lg:gap-5 ${
                  gridCols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={`${product.id}-${index}`} product={product} priority={index < 4} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <SlidersHorizontal className="h-7 w-7 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Ничего не найдено</h3>
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

      <MobileFilterDrawer isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        <CatalogFilters
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />
      </MobileFilterDrawer>
    </div>
  )
}

interface CatalogClientProps {
  initialProducts?: Product[]
}

export function CatalogClient({ initialProducts = [] }: CatalogClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-muted/30" />}>
      <CatalogContent initialProducts={initialProducts} />
    </Suspense>
  )
}
