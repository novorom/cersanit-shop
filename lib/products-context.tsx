"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import type { Product } from "@/lib/products-data"
import { products as initialProducts } from "@/lib/products-data"

interface ProductsContextType {
  products: Product[]
  updateProducts: (products: Product[]) => void
  resetProducts: () => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load products from localStorage on mount
  useEffect(() => {
    // const savedProducts = localStorage.getItem("admin-products")
    // if (savedProducts) {
    //   try {
    //     const parsed = JSON.parse(savedProducts)
    //     setProducts(parsed)
    //   } catch (error) {
    //     console.error("[v0] Failed to parse saved products:", error)
    //   }
    // }
    setIsLoaded(true)
  }, [])

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts)
    localStorage.setItem("admin-products", JSON.stringify(newProducts))
  }

  const resetProducts = () => {
    setProducts(initialProducts)
    localStorage.removeItem("admin-products")
  }

  return (
    <ProductsContext.Provider value={{ products, updateProducts, resetProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    // Return a fallback during SSR or before provider is mounted
    return {
      products: initialProducts,
      updateProducts: () => {},
      resetProducts: () => {},
    }
  }
  return context
}
