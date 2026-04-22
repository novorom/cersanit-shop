"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from "lucide-react"
import { filterOptions } from "@/lib/filter-options"
import { useProducts } from "@/lib/products-context"

// Прокси-CDN: бесплатный сервис, конвертирует в WebP, сжимает, кэширует
function optimizeImage(url: string | undefined | null, width = 600): string {
  if (!url || typeof url !== "string" || url.startsWith("/")) return url ?? ""
  const clean = url.replace("https://", "").replace("http://", "")
  return `https://images.weserv.nl/?url=${clean}&w=${width}&output=webp&q=80&il`
}

// Переопределённые главные изображения для конкретных коллекций
const COLLECTION_IMAGE_OVERRIDES: Record<string, string> = {
  "CALACATTA": "https://pvi.keramogranit-opt.ru/upload/uf/ae8/Calacatta_large_1.jpg",
  "NORTHWOOD": "https://pvi.keramogranit-opt.ru/upload/uf/a08/INT_Northwood_012_2_2.jpg",
  "DECO": "https://pvi.keramogranit-opt.ru/upload/uf/b22/DEL232.jpg",
}

/* ---------- Filter sidebar section ---------- */
function FilterSection({
  title,
  options,
  selected,
  onToggle,
  defaultOpen = false,
}: {
  title: string
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-1.5 mt-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.includes(opt) ?? false}
                onChange={() => onToggle(opt)}
                className="sr-only"
              />
              <div
                className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                  selected.includes(opt)
                    ? "bg-primary border-primary"
                    : "border-border group-hover:border-primary/50"
                }`}
              >
                {selected.includes(opt) && (
                  <svg className="h-3 w-3 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

interface InitialCollection {
  id: string
  name: string
  slug: string
  image: string
  product_count: number
  types: string[]
}

interface CollectionsClientProps {
  initialCollections?: InitialCollection[]
}

/* ---------- Main client component ---------- */
export function CollectionsClient({ initialCollections = [] }: CollectionsClientProps) {
  const { products } = useProducts()

  // Visible products: have a slug, non‑negative price, and a real collection (exclude "other")
  const visibleProducts = products.filter(p => p.slug && (p.price_retail ?? 0) >= 0 && p.collection && p.collection.toLowerCase() !== "other")

  const allCollections = [...new Set(visibleProducts.map(p => p.collection))].sort()

  const collections = allCollections.map((collName) => {
    const collectionProducts = visibleProducts.filter(p => p.collection === collName)
    const firstProduct = collectionProducts[0]
    return {
      id: collName,
      name: collName,
      slug: collName.toLowerCase().replace(/\s+/g, "-"),
      image: COLLECTION_IMAGE_OVERRIDES[collName.toUpperCase()] || collectionProducts.flatMap(p => (p.interior_images as string[] | undefined) || []).filter(Boolean)[0] || firstProduct?.collection_image || firstProduct?.main_image || "",
      product_count: collectionProducts.length,
    }
  }).filter(c => c.product_count > 1) // keep only collections with at least 2 products

  const collectionsWithMeta = collections.map((c) => {
    const collProducts = products.filter((p) => p.collection === c.name)
    const types = [...new Set(collProducts.map((p) => p.product_type))]
    const colors = [...new Set(collProducts.map((p) => p.color).filter((c): c is string => !!c))]
    const surfaces = [...new Set(collProducts.map((p) => p.surface).filter((s): s is string => !!s))]
    const isNew = collProducts.some((p) => p.is_new)
    const isBestseller = collProducts.some((p) => p.is_bestseller)
    return { ...c, types, colors, surfaces, isNew, isBestseller, realCount: collProducts.length }
  })

  // При первой загрузке используем серверные данные, чтобы не было пустой страницы
  const initialCollectionsWithMeta = initialCollections.map((c) => ({
    ...c,
    colors: [] as string[],
    surfaces: [] as string[],
    isNew: false,
    isBestseller: false,
    realCount: c.product_count,
  }))

  const effectiveCollectionsWithMeta =
    collectionsWithMeta.length === 0 && initialCollectionsWithMeta.length > 0
      ? initialCollectionsWithMeta
      : collectionsWithMeta

  const allTypes = [...new Set(collectionsWithMeta.flatMap((c) => c.types))].sort()
  const allColors = filterOptions.colors
  const allDimensions = filterOptions.dimensions
  const allDesigns = filterOptions.designs
  const allSurfaceTypes = filterOptions.surface_types

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([])
  const [selectedDesigns, setSelectedDesigns] = useState<string[]>([])
  const [selectedSurfaceTypes, setSelectedSurfaceTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"popular" | "name-asc" | "name-desc">("popular")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void) => (value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value])
  }

  const activeFilterCount =
    selectedTypes.length +
    selectedColors.length +
    selectedDimensions.length +
    selectedDesigns.length +
    selectedSurfaceTypes.length

  const filtered = useMemo(() => {
    let result = [...effectiveCollectionsWithMeta]

    if (selectedTypes.length > 0) {
      result = result.filter((c) => c.types.some((t) => selectedTypes.includes(t)))
    }
    if (selectedColors.length > 0) {
      result = result.filter((c) => c.colors.some((col) => selectedColors.includes(col)))
    }
    if (selectedDesigns.length > 0) {
      const designMapping = filterOptions.designCategoryMapping as Record<string, string[]>
      const matchedCollections = selectedDesigns.flatMap((d) => designMapping[d] || [])
      result = result.filter((c) => matchedCollections.includes(c.name))
    }
    if (selectedSurfaceTypes.length > 0) {
      result = result.filter((c) =>
        c.surfaces.some((s) => {
          if (selectedSurfaceTypes.includes("полированная (глянец)")) {
            if (s === "глянцевая" || s === "полированная") return true
          }
          return selectedSurfaceTypes.includes(s)
        })
      )
    }

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        result.sort((a, b) => b.realCount - a.realCount)
    }

    return result
  }, [selectedTypes, selectedColors, selectedDesigns, selectedSurfaceTypes, sortBy, effectiveCollectionsWithMeta])

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedColors([])
    setSelectedDimensions([])
    setSelectedDesigns([])
    setSelectedSurfaceTypes([])
  }

  const filtersContent = (
    <div className="flex flex-col gap-2">
      <FilterSection title="Тип плитки" options={allTypes} selected={selectedTypes} onToggle={toggleFilter(selectedTypes, setSelectedTypes)} defaultOpen />
      <FilterSection title="Цвет" options={allColors} selected={selectedColors} onToggle={toggleFilter(selectedColors, setSelectedColors)} />
      <FilterSection title="Размер" options={allDimensions} selected={selectedDimensions} onToggle={toggleFilter(selectedDimensions, setSelectedDimensions)} />
      <FilterSection title="Дизайн" options={allDesigns} selected={selectedDesigns} onToggle={toggleFilter(selectedDesigns, setSelectedDesigns)} />
      <FilterSection title="Тип поверхности" options={allSurfaceTypes} selected={selectedSurfaceTypes} onToggle={toggleFilter(selectedSurfaceTypes, setSelectedSurfaceTypes)} />
      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="mt-2 text-sm text-primary hover:text-primary/80 transition-colors text-left">
          Очистить фильтры
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Коллекции</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Title row */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Наши коллекции</h1>
            <p className="mt-2 text-muted-foreground">
              {filtered.length}{" "}
              {filtered.length === 1 ? "коллекция" : filtered.length < 5 ? "коллекции" : "коллекций"}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="popular">По популярности</option>
              <option value="name-asc">{"По названию А\u2014Я"}</option>
              <option value="name-desc">{"По названию Я\u2014А"}</option>
            </select>
          </div>
        </div>

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden mb-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Фильтры
          {activeFilterCount > 0 && (
            <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              ...selectedTypes.map((t) => ({ val: t, toggle: toggleFilter(selectedTypes, setSelectedTypes) })),
              ...selectedColors.map((c) => ({ val: c, toggle: toggleFilter(selectedColors, setSelectedColors) })),
              ...selectedDimensions.map((d) => ({ val: d, toggle: toggleFilter(selectedDimensions, setSelectedDimensions) })),
              ...selectedDesigns.map((d) => ({ val: d, toggle: toggleFilter(selectedDesigns, setSelectedDesigns) })),
              ...selectedSurfaceTypes.map((s) => ({ val: s, toggle: toggleFilter(selectedSurfaceTypes, setSelectedSurfaceTypes) })),
            ].map(({ val, toggle }) => (
              <button
                key={val}
                onClick={() => toggle(val)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                {val}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2">
              Сбросить все
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">{filtersContent}</aside>

          {/* Mobile filters drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background p-6 overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Фильтры</h2>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {filtersContent}
              </div>
            </div>
          )}

          {/* Collections grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Коллекции не найдены</p>
                <button onClick={clearFilters} className="mt-4 text-sm text-primary hover:text-primary/80">
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.slug}`}
                    className="group flex flex-col rounded-xl border border-border overflow-hidden bg-card hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {collection.image && (
                        <img
                          src={optimizeImage(collection.image, 600)}
                          alt={`Коллекция ${collection.name}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {collection.isNew && (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white text-xs font-medium">Новинка</span>
                        )}
                        {collection.isBestseller && (
                          <span className="px-2.5 py-1 rounded-md bg-amber-500 text-white text-xs font-medium">Хит</span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-1.5">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors uppercase tracking-wide">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {collection.realCount}{" "}
                        {collection.realCount === 1 ? "товар" : collection.realCount < 5 ? "товара" : "товаров"}
                      </p>
                      {collection.types.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {collection.types.slice(0, 3).map((t) => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
