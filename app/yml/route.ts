import { NextResponse } from "next/server"
import { products } from "@/lib/products-data"

const SITE_URL = "https://keramogranit-opt.ru"
const SHOP_NAME = "Lincer-SPb"
const SHOP_COMPANY = "Магазин керамической плитки в Санкт-Петербурге"

export const dynamic = "force-dynamic"
export const revalidate = 86400

export async function GET() {
  const activeProducts = products.filter(
    (p) => p.slug && p.price_retail && p.price_retail > 0 && p.main_image
  )

  const offers = activeProducts
    .map((p) => {
      const inStock =
        (p.stock_yanino && p.stock_yanino > 0) ||
        (p.stock_factory && p.stock_factory > 0)

      const description = [
        p.description || "",
        p.collection ? `Коллекция ${p.collection}.` : "",
        p.format ? `Формат ${p.format} см.` : "",
        p.surface ? `Поверхность: ${p.surface}.` : "",
        p.color ? `Цвет: ${p.color}.` : "",
        p.material_type ? `Материал: ${p.material_type}.` : "",
        "Доставка по Санкт-Петербургу и Ленинградской области от 1 дня.",
      ]
        .filter(Boolean)
        .join(" ")

      const allImages = [
        p.main_image,
        ...(p.images || []).slice(0, 3),
        ...(p.interior_images || []).slice(0, 2),
      ]
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 10)

      const picturesTags = allImages
        .map((img) => `      <picture url="${escapeXml(img!)}"/>`)
        .join("\n")

      const paramTags = [
        p.collection ? `      <param name="Коллекция">${escapeXml(p.collection)}</param>` : "",
        p.format ? `      <param name="Формат">${escapeXml(p.format)}</param>` : "",
        p.surface ? `      <param name="Поверхность">${escapeXml(p.surface)}</param>` : "",
        p.color ? `      <param name="Цвет">${escapeXml(p.color)}</param>` : "",
        p.material_type ? `      <param name="Материал">${escapeXml(p.material_type)}</param>` : "",
        p.country ? `      <param name="Страна">${escapeXml(p.country)}</param>` : "",
        p.thickness ? `      <param name="Толщина (мм)">${escapeXml(p.thickness)}</param>` : "",
        p.frost_resistant ? `      <param name="Морозостойкость">Да</param>` : "",
        p.rectified ? `      <param name="Ректификация">Да</param>` : "",
        p.sqm_per_box ? `      <param name="В упаковке (м²)">${p.sqm_per_box}</param>` : "",
      ]
        .filter(Boolean)
        .join("\n")

      return `    <offer id="${escapeXml(p.id)}" available="${inStock ? "true" : "false"}">
      <url>${SITE_URL}/catalog/${escapeXml(p.slug)}</url>
      <price>${p.price_retail}</price>
      <currencyId>RUB</currencyId>
      <categoryId>${getCategoryId(p.product_type)}</categoryId>
      <name>${escapeXml(p.name)}</name>
      <vendor>${escapeXml(p.brand || "Lincer")}</vendor>
      ${p.sku ? `<vendorCode>${escapeXml(p.sku)}</vendorCode>` : ""}
      <description>${escapeXml(description)}</description>
      <sales_notes>Доставка от 1 дня. Склад в Янино (СПб).</sales_notes>
      <pickup>true</pickup>
      <delivery>true</delivery>
${picturesTags}
${paramTags}
    </offer>`
    })
    .join("\n")

  const now = new Date().toISOString().replace("T", " ").slice(0, 19)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="${now}">
  <shop>
    <name>${SHOP_NAME}</name>
    <company>${SHOP_COMPANY}</company>
    <url>${SITE_URL}</url>
    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>
    <categories>
      <category id="1">Керамогранит</category>
      <category id="2">Керамическая плитка</category>
      <category id="3">Мозаика</category>
      <category id="4">Плитка для стен</category>
      <category id="5">Плитка для пола</category>
    </categories>
    <delivery-options>
      <option cost="0" days="1-3" order-before="18"/>
    </delivery-options>
    <offers>
${offers}
    </offers>
  </shop>
</yml_catalog>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
}

function getCategoryId(productType: string): number {
  const type = (productType || "").toLowerCase()
  if (type.includes("мозаика")) return 3
  if (type.includes("керамогранит")) return 1
  if (type.includes("настенн") || type.includes("стен")) return 4
  if (type.includes("напольн") || type.includes("пол")) return 5
  return 2
}

function escapeXml(str: string): string {
  if (!str) return ""
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
