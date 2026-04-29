import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://keramogranit-opt.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Белая плитка купить в Санкт-Петербурге | Керамогранит Опт",
  description: "Белая плитка и керамогранит в СПб — 32 позиции в наличии. Calacatta, Tiffany, Silvia — склад Янино, доставка по СПб от 1 дня. Цены от 780 ₽/м².",
  alternates: { canonical: `${SITE_URL}/plitka-belaya-spb` },
  openGraph: {
    title: "Белая плитка в Санкт-Петербурге",
    description: "Белая плитка — Calacatta, Tiffany, Silvia. Склад в Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/plitka-belaya-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  {
    question: "Белая плитка — практично ли это?",
    answer: "Белый керамогранит очень практичен: легко чистится, не выгорает, сохраняет цвет десятилетиями. Единственный нюанс — белые затирочные швы могут темнеть. Решение: используйте эпоксидную затирку или выбирайте светло-серую затирку вместо белой.",
  },
  {
    question: "Какую белую плитку выбрать для маленькой ванной?",
    answer: "Для маленькой ванной идеально подходит белая плитка формата 30x60 в вертикальной укладке — она визуально поднимает потолок. Коллекция Calacatta с тонкими прожилками добавляет изысканности без перегруза. Глянцевая поверхность отражает свет и дополнительно расширяет пространство.",
  },
  {
    question: "Белая плитка для пола — не будет ли заметна грязь?",
    answer: "Матовый белый керамогранит на полу практичнее, чем кажется — он не показывает мелкий мусор так сильно, как тёмные поверхности. Глянец на полу не рекомендуется. Выбирайте формат 60x60 или 60x120 — меньше швов, меньше мест для загрязнений.",
  },
  {
    question: "С чем сочетается белая плитка?",
    answer: "Белый — самый универсальный цвет. Сочетается с любым цветом мебели, сантехники и декора. Классика: белые стены + деревянный пол или мебель. Современно: белые стены + чёрная фурнитура и затирка. Люкс: белый с золотом или медью.",
  },
  {
    question: "Есть ли белая плитка в наличии?",
    answer: "Да, более 30 позиций белой плитки и керамогранита на складе в Янино. Самовывоз в день оплаты, доставка по СПб и ЛО 1-2 рабочих дня.",
  },
]

const BLOG_ARTICLES = [
  { href: "/blog/plitka-dlya-vannoy-bez-dizajnera", title: "Плитка для ванной без дизайнера", desc: "Как выбрать белую плитку самостоятельно." },
  { href: "/blog/plitka-dlya-malenkoj-vannoj", title: "Плитка для маленькой ванной", desc: "Белый цвет для визуального расширения пространства." },
  { href: "/blog/formaty-plitki", title: "Какой формат белой плитки выбрать", desc: "30x60, 60x60 или 60x120 — разбираем отличия." },
]

export default function PlitkaBelay() {
  const whiteProducts = products
    .filter((p) => p.color === "белый")
    .sort((a, b) => a.price_retail - b.price_retail)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
          { "@type": "ListItem", position: 3, name: "Белая плитка", item: `${SITE_URL}/plitka-belaya-spb` },
        ],
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Белая плитка</span>
          </nav>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Белая плитка в Санкт-Петербурге
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">
            Классика никогда не выходит из моды. Calacatta, Tiffany, Silvia —
            {whiteProducts.length} позиций в наличии на складе в Янино.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors">
              Смотреть товары <ChevronRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Белая плитка — {whiteProducts.length} позиций</h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {whiteProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Почему белая плитка — лучший выбор</h2>
            <p className="text-foreground/80 leading-relaxed">
              Белый цвет в отделке — это чистота, простор и универсальность. Белая плитка делает
              любое помещение светлее и больше, легко вписывается в любой стиль интерьера.
              Она не выйдет из моды через 5 лет — это вечная классика. Особенно актуальна
              для ванных комнат, кухонных фартуков и прихожих.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Белые коллекции Lincer</h2>
            <p className="text-foreground/80 leading-relaxed">
              <strong>Calacatta</strong> — белый керамогранит с мраморными прожилками, форматы 30x60
              и 60x120. <strong>Tiffany</strong> — классический белый моноколор 42x42, матовая
              поверхность, класс скользкости R13. <strong>Silvia</strong> — структурированная белая
              плитка для стен. <strong>Neve</strong> — белый с деликатным рисунком, сатиновая поверхность.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Купить белую плитку в Санкт-Петербурге</h2>
            <p className="text-foreground/80 leading-relaxed">
              Весь ассортимент белой плитки в наличии на складе в Янино-1.
              Самовывоз бесплатный. Доставка по СПб и ЛО от 1-2 рабочих дней.
              Мы — мультибрендовый гипермаркет, все товары с сертификатами качества.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Частые вопросы</h2>
          <div className="max-w-3xl flex flex-col gap-4">
            {faq.map((item, i) => (
              <details key={i} className="group rounded-xl border border-border bg-card overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-foreground font-medium hover:bg-muted/50 transition-colors">
                  <span className="pr-4">{item.question}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-foreground/80 leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_ARTICLES.map((a) => (
              <Link key={a.href} href={a.href} className="group flex flex-col bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{a.title}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{a.desc}</span>
                <span className="mt-4 text-xs text-primary font-medium group-hover:underline">Читать →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Подберём белую плитку под ваш проект</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Бесплатная консультация и расчёт количества плитки для вашего помещения.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors">
              <Phone className="h-4 w-4" /> Позвонить
            </a>
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors">
              Весь каталог <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* Полезные статьи */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как выбрать плитку для ванной</p>
                <p className="text-sm text-muted-foreground">Белая плитка для ванной.</p>
              </Link>
              <Link href="/blog/trendy-plitki-2025" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Тренды плитки 2025</p>
                <p className="text-sm text-muted-foreground">Белый цвет — классика трендов.</p>
              </Link>
              <Link href="/blog/rekomendatsii-po-zatirke" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Рекомендации по затирке</p>
                <p className="text-sm text-muted-foreground">Затирка для белой плитки.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
