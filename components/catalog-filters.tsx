"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { filterOptions } from "@/lib/filter-options"

interface FilterSection {
  label: string
  key: string
  options: string[]
}

const filterSections: FilterSection[] = [
  { label: "Бренд", key: "brands", options: filterOptions.brands },
  { label: "Тип плитки", key: "product_types", options: filterOptions.product_types },
  { label: "Цвет", key: "colors", options: filterOptions.colors },
  { label: "Размер", key: "dimensions", options: filterOptions.dimensions },
  { label: "Дизайн", key: "designs", options: filterOptions.designs },
  { label: "Тип поверхности", key: "surface_types", options: filterOptions.surface_types },
]

interface CatalogFiltersProps {
  activeFilters: Record<string, string[]>
  onFilterChange: (key: string, value: string) => void
  onClearAll: () => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export function CatalogFilters({
  activeFilters,
  onFilterChange,
  onClearAll,
  priceRange,
  onPriceRangeChange,
}: CatalogFiltersProps) {
  const [openSections, setOpenSections] = useState<string[]>(["brands", "product_types"])

  const toggleSection = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const totalActiveFilters = Object.values(activeFilters).flat().length

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Фильтры</h2>
        {totalActiveFilters > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Сбросить ({totalActiveFilters})
          </button>
        )}
      </div>

      {/* Filter Sections */}
      {/* Price range */}
      <div className="pb-4 mb-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Цена</span>
          <span className="text-xs text-muted-foreground">
            {priceRange[0].toLocaleString("ru-RU")} — {priceRange[1].toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <div className="px-1 space-y-2">
          <input
            type="range"
            min={400}
            max={9500}
            step={100}
            value={priceRange[0]}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (val < priceRange[1]) onPriceRangeChange([val, priceRange[1]])
            }}
            className="w-full h-1.5 accent-primary cursor-pointer"
          />
          <input
            type="range"
            min={400}
            max={9500}
            step={100}
            value={priceRange[1]}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (val > priceRange[0]) onPriceRangeChange([priceRange[0], val])
            }}
            className="w-full h-1.5 accent-primary cursor-pointer"
          />
        </div>
      </div>

      {filterSections.map((section) => (
        <div key={section.key} className="pb-4 mb-4 border-b border-border last:border-0">
          <button
            onClick={() => toggleSection(section.key)}
            className="flex items-center justify-between w-full py-2"
          >
            <span className="text-sm font-medium text-foreground">
              {section.label}
              {activeFilters[section.key]?.length > 0 && (
                <span className="ml-1.5 text-xs text-primary font-normal">
                  ({activeFilters[section.key].length})
                </span>
              )}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                openSections.includes(section.key) ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSections.includes(section.key) && (
            <div className="mt-1 flex flex-col gap-1">
              {section.options.map((option) => {
                const isActive = (activeFilters[section.key] ?? []).includes(option)
                return (
                  <label
                    key={option}
                    className="flex items-center gap-2.5 py-1.5 px-1 rounded-md hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div
                      className={`h-4 w-4 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-primary border-primary"
                          : "border-input hover:border-primary/50"
                      }`}
                    >
                      {isActive && (
                        <svg viewBox="0 0 12 12" className="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={isActive ?? false}
                      onChange={() => onFilterChange(section.key, option)}
                      className="sr-only"
                    />
                    <span className="text-sm text-foreground/80">{option}</span>
                  </label>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}

/* Mobile filter drawer */
export function MobileFilterDrawer({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-[320px] max-w-[85vw] bg-background overflow-y-auto">
        <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Фильтры</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-label="Закрыть фильтры"
          >
            <X className="h-5 w-5 text-foreground/70" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
