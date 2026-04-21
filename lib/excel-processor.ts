import { read, utils } from "xlsx"
import type { Product } from "./products-data"

export interface ExcelProcessResult {
  updatedProducts: Product[]
  unmatched: string[]
  matchedCount: number
}

export interface YaninoRow {
  артикул?: string
  article?: string
  "свободный остаток м.кв."?: number | string
  "free m2"?: number | string
}

export interface ZavodRow {
  артикул?: string
  article?: string
  "свободный остаток"?: number | string
  "free stock"?: number | string
}

export interface PriceRow {
  артикул?: string
  article?: string
  "розничная цена"?: number | string
  "retail price"?: number | string
}

function normalizeArticle(article: string | number | undefined): string {
  if (!article) return ""
  return String(article)
    .trim()
    .toUpperCase()
    .replace(/[\\\/]/g, "")
}

function parseNumber(value: string | number | undefined): number {
  if (value === undefined || value === null || value === "") return 0
  const num = typeof value === "string" ? parseFloat(value) : value
  return isNaN(num) ? 0 : num
}

export function processYaninoFile(
  buffer: ArrayBuffer,
  products: Product[]
): ExcelProcessResult {
  const workbook = read(new Uint8Array(buffer))
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  
  // Read by column indices - Column A (0) = SKU, Column L (11) = Free stock m²
  // File has headers in row 7, so data starts from row 8 (index 8)
  const arrayData = utils.sheet_to_json<any[]>(sheet, { header: 1 })
  
  // Skip first 7 rows (headers), process only data rows (starting from index 7)
  const dataRows = arrayData.slice(8)
  
  const rows = dataRows
    .map((row: any[]) => ({
      артикул: row[0],  // Column A (index 0) = SKU
      "свободный остаток м.кв.": row[11], // Column L (index 11) = Free stock m²
    }))
    .filter((row) => row.артикул) // Filter out empty rows
  
  const updatedProducts = [...products]
  const unmatched: string[] = []
  let matchedCount = 0

  rows.forEach((row) => {
    const skuFromFile = row.артикул
    const stock = parseNumber(row["свободный остаток м.кв."])

    if (!skuFromFile) return

    const normalizedSkuFromFile = normalizeArticle(skuFromFile)
    
    // Find product by SKU (exact match) or by comparing with id (article without first letter)
    let productIndex = updatedProducts.findIndex((p) => {
      // Try direct SKU match
      if (p.sku && normalizeArticle(p.sku) === normalizedSkuFromFile) {
        return true
      }
      // Try matching with id (which is the article, SKU without first letter)
      if (p.id && normalizeArticle(p.id) === normalizedSkuFromFile) {
        return true
      }
      // Try matching: if file has A17986, remove spaces and compare
      const cleanedSku = normalizedSkuFromFile.replace(/\s+/g, "")
      if (p.sku && normalizeArticle(p.sku).replace(/\s+/g, "") === cleanedSku) {
        return true
      }
      if (p.id && normalizeArticle(p.id).replace(/\s+/g, "") === cleanedSku) {
        return true
      }
      return false
    })

    if (productIndex !== -1) {
      updatedProducts[productIndex].stock_yanino = stock
      matchedCount++
    } else {
      unmatched.push(String(skuFromFile))
    }
  })
  
  return { updatedProducts, unmatched, matchedCount }
}

export function processZavodFile(
  buffer: ArrayBuffer,
  products: Product[]
): ExcelProcessResult {
  const workbook = read(new Uint8Array(buffer))
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  
  // Read by column indices - Column D (3) = Артикул, Column P (15) = Итого Свободный остаток
  // File has headers in row 8, so data starts from row 9 (index 8)
  const arrayData = utils.sheet_to_json<any[]>(sheet, { header: 1 })
  
  // Skip first 8 rows (headers), process only data rows (starting from index 8)
  const dataRows = arrayData.slice(8)
  
  const rows = dataRows
    .map((row: any[]) => ({
      артикул: row[3],  // Column D (index 3) = Артикул
      "свободный остаток": row[15], // Column P (index 15) = Итого Свободный остаток
    }))
    .filter((row) => row.артикул) // Filter out empty rows
  
  const updatedProducts = [...products]
  const unmatched: string[] = []
  let matchedCount = 0

  rows.forEach((row) => {
    const skuFromFile = row.артикул
    const stock = parseNumber(row["свободный остаток"])

    if (!skuFromFile) return

    const normalizedSkuFromFile = normalizeArticle(skuFromFile)
    
    // Find product by SKU (exact match) or by comparing with id
    let productIndex = updatedProducts.findIndex((p) => {
      // Try direct SKU match
      if (p.sku && normalizeArticle(p.sku) === normalizedSkuFromFile) {
        return true
      }
      // Try matching with id (which is the article)
      if (p.id && normalizeArticle(p.id) === normalizedSkuFromFile) {
        return true
      }
      // Try matching with spaces removed
      const cleanedSku = normalizedSkuFromFile.replace(/\s+/g, "")
      if (p.sku && normalizeArticle(p.sku).replace(/\s+/g, "") === cleanedSku) {
        return true
      }
      if (p.id && normalizeArticle(p.id).replace(/\s+/g, "") === cleanedSku) {
        return true
      }
      return false
    })

    if (productIndex !== -1) {
      updatedProducts[productIndex].stock_factory = stock
      matchedCount++
    } else {
      unmatched.push(String(skuFromFile))
    }
  })
  
  return { updatedProducts, unmatched, matchedCount }
}

export function processPriceFile(
  buffer: ArrayBuffer,
  products: Product[]
): ExcelProcessResult {
  const workbook = read(new Uint8Array(buffer))
  
  // Find the Линцер sheet - look for sheet name containing Линцер, Lincer, or use first sheet
  let sheet = workbook.Sheets[workbook.SheetNames[0]]
  
  const lincerSheetName = workbook.SheetNames.find(
    (name) => name.toLowerCase().includes("линцер") || 
              name.toLowerCase().includes("lincer") ||
              name.toLowerCase().includes("lincere")
  )
  
  if (lincerSheetName) {
    sheet = workbook.Sheets[lincerSheetName]
  }

  // Read by column indices - Column C (2) = Артикул, Column K (10) = Розничная цена
  const arrayData = utils.sheet_to_json<any[]>(sheet, { header: 1 })
  
  // Find where actual product data starts by looking for rows where col[2] contains article numbers
  let dataStartRow = 0
  for (let i = 0; i < Math.min(arrayData.length, 150); i++) {
    const row = arrayData[i]
    if (row && row.length > 10 && row[2] && (String(row[2]).startsWith('A') || /^\d{5}/.test(String(row[2])))) {
      // Found a row with article number in column 2 - this is where data starts
      dataStartRow = i
      break
    }
  }
  
  // Skip to where actual product data starts
  const dataRows = arrayData.slice(dataStartRow)
  
  const rows = dataRows
    .map((row: any[]) => ({
      артикул: row[2],  // Column C (index 2) = Артикул
      "розничная цена": row[10], // Column K (index 10) = Розничная цена
    }))
    .filter((row) => row.артикул) // Filter out empty rows

  const updatedProducts = [...products]
  
  const unmatched: string[] = []
  let matchedCount = 0

  rows.forEach((row) => {
    const skuFromFile = row.артикул
    const retailPrice = parseNumber(row["розничная цена"])

    if (!skuFromFile || !retailPrice) return

    const normalizedSkuFromFile = normalizeArticle(skuFromFile)
    const productIndex = updatedProducts.findIndex(
      (p) => normalizeArticle(p.id) === normalizedSkuFromFile
    )

    if (productIndex !== -1) {
      // Apply 20% discount (multiply by 0.8)
      const discountedPrice = Math.round(retailPrice * 0.8)
      updatedProducts[productIndex].price_retail = discountedPrice
      matchedCount++
    } else {
      unmatched.push(String(skuFromFile))
    }
  })
  
  return { updatedProducts, unmatched, matchedCount }
}
