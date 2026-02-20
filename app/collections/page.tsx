"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from "lucide-react"
import { collections, products } from "@/lib/mock-data"

/* ---------- derived data ---------- */
console.log("[v0] Collections data:", collections.length, "collections found")
const collectionsWithMeta = collections.map((c) => {
  const collProducts = products.filter((p) => p.collection === c.name)
  const types = [...new Set(collProducts.map((p) => p.product_type))]
  const formats = [...new Set(collProducts.map((p) => p.format))]
  const colors = [...new Set(collProducts.map((p) => p.color))]
  const isNew = collProducts.some((p) => p.is_new)
  const isBestseller = collProducts.some((p) => p.is_bestseller)
  return { ...c, types, formats, colors, isNew, isBestseller, realCount: collProducts.length }
})
console.log("[v0] Collections with metadata:", collectionsWithMeta.length, "processed")

const allTypes = [...new Set(collectionsWithMeta.flatMap((c) => c.types))].sort()
const allFormats = [...new Set(products.map((p) => p.format))].sort()

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

/* ---------- Main page ---------- */
export default function CollectionsPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"popular" | "name-asc" | "name-desc">("popular")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void) => (value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value])
  }

  const activeFilterCount = selectedTypes.length + selectedFormats.length

  const filtered = useMemo(() => {
    let result = [...collectionsWithMeta]

    if (selectedTypes.length > 0) {
      result = result.filter((c) => c.types.some((t) => selectedTypes.includes(t)))
    }
    if (selectedFormats.length > 0) {
      result = result.filter((c) => c.formats.some((f) => selectedFormats.includes(f)))
    }

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "popular":
      default:
        result.sort((a, b) => b.realCount - a.realCount)
    }

    return result
  }, [selectedTypes, selectedFormats, sortBy])

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedFormats([])
  }

  const filtersContent = (
    <div className="flex flex-col gap-2">
      <FilterSection
        title="Тип продукции"
        options={allTypes}
        selected={selectedTypes}
        onToggle={toggleFilter(selectedTypes, setSelectedTypes)}
        defaultOpen
      />
      <FilterSection
        title="Формат"
        options={allFormats}
        selected={selectedFormats}
        onToggle={toggleFilter(selectedFormats, setSelectedFormats)}
      />
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="mt-2 text-sm text-primary hover:text-primary/80 transition-colors text-left"
        >
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
            <Link href="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">
              Каталог
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Коллекции</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Title row */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Коллекции Cersanit</h1>
            <p className="mt-2 text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "коллекция" : filtered.length < 5 ? "коллекции" : "коллекций"}
            </p>
          </div>

          {/* Sort */}
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
            {selectedTypes.map((t) => (
              <button
                key={t}
                onClick={() => toggleFilter(selectedTypes, setSelectedTypes)(t)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                {t}
                <X className="h-3 w-3" />
              </button>
            ))}
            {selectedFormats.map((f) => (
              <button
                key={f}
                onClick={() => toggleFilter(selectedFormats, setSelectedFormats)(f)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                {f}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
            >
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
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                  >
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
                    href={`/catalog?collection=${collection.slug}`}
                    className="group flex flex-col rounded-xl border border-border overflow-hidden bg-card hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={`Коллекция ${collection.name}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {collection.isNew && (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white text-xs font-medium">
                            Новинка
                          </span>
                        )}
                        {collection.isBestseller && (
                          <span className="px-2.5 py-1 rounded-md bg-amber-500 text-white text-xs font-medium">
                            Хит
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-1.5">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors uppercase tracking-wide">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {collection.realCount} {collection.realCount === 1 ? "товар" : collection.realCount < 5 ? "товара" : "товаров"}
                      </p>
                      {collection.types.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {collection.types.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                            >
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
