import { NextResponse } from "next/server"
import { products } from "@/lib/products-data"

const SITE_URL = "https://keramogranit-opt.ru"
const SHOP_NAME = "Керамогранит Опт"

export const dynamic = "force-dynamic"
export const revalidate = 86400

export async function GET(request: Request) {
  const host = request.headers.get("host") || "cersanit-spb.ru"
  const protocol = host.includes("localhost") ? "http" : "https"
  const dynamicSiteUrl = `${protocol}://${host}`

  const activeProducts = products.filter(
    (p) => p.slug && p.price_retail && p.price_retail > 0 && p.main_image
  )

  const items = activeProducts
    .map((p) => {
      const inStock =
        (p.stock_yanino && p.stock_yanino > 0) ||
        (p.stock_factory && p.stock_factory > 0)

      const availability = inStock ? "in_stock" : "out_of_stock"

      const condition = "new"

      const description = [
        p.collection ? `Коллекция ${p.collection}.` : "",
        p.format ? `Формат ${p.format} см.` : "",
        p.surface ? `Поверхность: ${p.surface}.` : "",
        p.color ? `Цвет: ${p.color}.` : "",
        p.material_type ? `Материал: ${p.material_type}.` : "",
        p.frost_resistant ? "Морозостойкая." : "",
        "Доставка по Санкт-Петербургу и Ленинградской области от 1 дня.",
      ]
        .filter(Boolean)
        .join(" ")

      // Google product category for tiles
      const googleCategory = p.product_type?.toLowerCase().includes("мозаика")
        ? "Building Materials > Flooring > Mosaic Tiles"
        : "Building Materials > Flooring > Ceramic Tiles"

      const allImages = [
        p.main_image,
        ...(p.images || []).slice(0, 9),
      ]
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 10)

      const additionalImages = allImages.slice(1)
        .map((img) => `      <g:additional_image_link>${escapeXml(img!)}</g:additional_image_link>`)
        .join("\n")

      return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(p.name)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${dynamicSiteUrl}/catalog/${escapeXml(p.slug)}</g:link>
      <g:image_link>${escapeXml(p.main_image!)}</g:image_link>
${additionalImages ? additionalImages + "\n" : ""}      <g:price>${p.price_retail} RUB</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>${condition}</g:condition>
      <g:brand>${escapeXml(p.brand || "Lincer")}</g:brand>
      ${(p.sku || p.bsu) ? `<g:mpn>${escapeXml(p.sku || p.bsu)}</g:mpn>` : ""}
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:product_type>${escapeXml(p.product_type || "Керамогранит")} &gt; ${escapeXml(p.collection || "")}</g:product_type>
      <g:shipping>
        <g:country>RU</g:country>
        <g:service>Доставка по СПб и ЛО</g:service>
        <g:price>0 RUB</g:price>
      </g:shipping>
      <g:identifier_exists>${(p.sku || p.bsu) ? "yes" : "no"}</g:identifier_exists>
      ${p.material_type ? `<g:material>${escapeXml(p.material_type)}</g:material>` : ""}
      ${p.color ? `<g:color>${escapeXml(p.color)}</g:color>` : ""}
      ${p.format ? `<g:size>${escapeXml(p.format)}</g:size>` : ""}
      ${p.country ? `<g:country_of_origin>${escapeXml(p.country)}</g:country_of_origin>` : ""}
      ${p.collection ? `<g:item_group_id>${escapeXml(p.collection.replace(/\s+/g, "_").toLowerCase())}</g:item_group_id>` : ""}
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${SHOP_NAME}</title>
    <link>${dynamicSiteUrl}</link>
    <description>Керамическая плитка и керамогранит ведущих брендов в Санкт-Петербурге</description>
${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
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
