import Link from "next/link"
import { products } from "@/lib/products-data"
import { seoPages } from "@/lib/seo-data"

export const metadata = {
  title: "Карта сайта | Керамогранит Опт",
  description: "Полный список страниц, категорий и товаров магазина Керамогранит Опт.",
}

export default function SitemapPage() {
  const collections = [...new Set(products.map(p => p.collection).filter(Boolean))].sort()
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Карта сайта</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Основные разделы */}
        <section>
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-primary">Основные страницы</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Главная</Link></li>
            <li><Link href="/catalog" className="hover:underline">Каталог товаров</Link></li>
            <li><Link href="/collections" className="hover:underline">Все коллекции</Link></li>
            <li><Link href="/delivery" className="hover:underline">Доставка и самовывоз</Link></li>
            <li><Link href="/contacts" className="hover:underline">Контакты и адрес склада</Link></li>
            <li><Link href="/blog" className="hover:underline">Блог и советы</Link></li>
          </ul>
        </section>

        {/* SEO Лендинги */}
        <section>
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-primary">Популярные категории</h2>
          <ul className="space-y-2">
            {Object.values(seoPages).map(page => (
              <li key={page.slug}>
                <Link href={`/${page.slug}`} className="hover:underline">{page.breadcrumbLabel}</Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Коллекции */}
        <section>
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-primary">Коллекции</h2>
          <ul className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {collections.map(col => {
              const slug = col!.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яё0-9-]/gi, "")
              return (
                <li key={col}>
                  <Link href={`/collections/${slug}`} className="hover:underline">{col}</Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {/* Популярные товары */}
      <section className="mt-16">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-primary">Популярные товары</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 40).map(p => (
            <Link key={p.slug} href={`/catalog/${p.slug}`} className="text-sm text-muted-foreground hover:text-primary hover:underline truncate">
              {p.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
