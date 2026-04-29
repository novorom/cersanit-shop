import { CollectionsClient } from "@/app/collections/collections-client"
import { products } from "@/lib/products-data"

export { metadata } from "@/app/collections/layout"

export default function CollectionsPage() {
  // Собираем уникальные коллекции из данных товаров
  const collectionsMap: Record<string, {
    id: string
    name: string
    slug: string
    image: string
    product_count: number
    types: string[]
  }> = {}

  for (const product of products) {
    if (!product.collection || !product.collection.trim()) continue

    let name = product.collection.trim()
    // Normalize name to avoid Case Mismatches (AMATI vs Amati)
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-zа-яё0-9-]/gi, "")

    if (!collectionsMap[name]) {
      collectionsMap[name] = {
        id: slug,
        name,
        slug,
        image:
          product.collection_image ||
          product.interior_images?.[0] ||
          product.main_image ||
          "",
        product_count: 0,
        types: [],
      }
    }

    collectionsMap[name].product_count += 1

    if (product.product_type && !collectionsMap[name].types.includes(product.product_type)) {
      collectionsMap[name].types.push(product.product_type)
    }

    // Обновляем изображение если лучше
    if (!collectionsMap[name].image && (product.collection_image || product.interior_images?.[0])) {
      collectionsMap[name].image =
        product.collection_image || product.interior_images?.[0] || product.main_image || ""
    }
  }

  const initialCollections = Object.values(collectionsMap).sort(
    (a, b) => b.product_count - a.product_count
  )

  return <CollectionsClient initialCollections={initialCollections} />
}
