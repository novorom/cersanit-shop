import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Матовый керамогранит купить в Санкт-Петербурге | Керамогранит Опт",
  description: "Матовый керамогранит в СПб — 150 позиций в наличии. Soft Concrete, Wood Concept, Northwood — склад Янино, доставка от 1 дня.",
  alternates: { canonical: `${SITE_URL}/keramogranit-matovyy-spb` },
  openGraph: {
    title: "Матовый керамогранит в Санкт-Петербурге",
    description: "Матовый керамогранит в СПб — 150 позиций в наличии. Soft Concrete, Wood Concept, Northwood — склад Янино, доставка от 1 дня.",
    url: `${SITE_URL}/keramogranit-matovyy-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  { question: "Матовый или полированный — что лучше для пола?", answer: "Для пола однозначно рекомендуем матовый — он не скользит и не показывает царапины. Полированный хорошо смотрится, но требует осторожности: скользит при намокании. Матовый керамогранит практичнее в ванной, прихожей и на кухне." },
  { question: "Матовый керамогранит сложно мыть?", answer: "Нет, матовый керамогранит легко моется обычными средствами. Матовая поверхность не показывает разводы от воды, в отличие от полированной. Достаточно протирать влажной тряпкой или шваброй." },
  { question: "Какой матовый керамогранит подходит для тёплого пола?", answer: "Для тёплого пола подходит любой керамогранит, в том числе матовый. Керамогранит отлично проводит тепло — лучше, чем ламинат или паркет. Рекомендуем форматы 60x60 или 60x120 — меньше швов, лучше теплоотдача." },
  { question: "Есть ли матовый керамогранит в наличии?", answer: "Да, более 150 позиций матового керамогранита на складе в Янино. Самовывоз в день оплаты, доставка 1-2 дня." },
]

const BLOG_ARTICLES = [
  { href: "/blog/kak-vybrat-keramogranit-dlya-pola", title: "Как выбрать керамогранит для пола", desc: "Матовый, полированный, сатиновый — разбираем отличия." },
  { href: "/blog/krupnoformatnaya-plitka-60x120-preimushchestva", title: "Плитка 60x120: преимущества", desc: "Крупный матовый формат для современного интерьера." },
  { href: "/blog/kak-rezat-keramogranit", title: "Как резать керамогранит", desc: "Инструменты и советы для разных поверхностей." },
]

export default function LandingPage() {
  const filteredProducts = products.filter((p) => p.surface === "матовая")
    .sort((a: any, b: any) => a.price_retail - b.price_retail)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
          { "@type": "ListItem", position: 3, name: "Матовый керамогранит", item: `${SITE_URL}/keramogranit-matovyy-spb` },
        ],
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Матовый керамогранит</span>
          </nav>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Матовый керамогранит в Санкт-Петербурге</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">
            {filteredProducts.length} позиций в наличии на складе в Янино. Официальный дилер ведущих брендов в Санкт-Петербурге.
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
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Матовый керамогранит — {filteredProducts.length} позиций</h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {filteredProducts.map((product: any, index: number) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Матовый керамогранит — практично и стильно</h2>
            <p className="text-foreground/80 leading-relaxed">Матовая поверхность — самый популярный выбор для пола. Она не скользит, не показывает царапины и отпечатки пальцев. Матовый керамогранит подходит для любого стиля — от минимализма до скандинавского интерьера. Поверхность приятная на ощупь, визуально похожа на натуральный камень или дерево.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Популярные матовые коллекции</h2>
            <p className="text-foreground/80 leading-relaxed"><strong>Soft Concrete</strong> — крупный формат 60x120, имитация бетона, матовая поверхность. <strong>Wood Concept</strong> — под дерево 22x90, матовый. <strong>Northwood</strong> — светлое дерево 18x60, матовый. <strong>Lofthouse</strong> — индустриальный стиль, матовая текстура. <strong>Calacatta</strong> — белый мрамор, матовая и сатиновая поверхности.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Купить матовый керамогранит в СПб</h2>
            <p className="text-foreground/80 leading-relaxed">Весь ассортимент матового керамогранита на складе в Янино-1. Самовывоз бесплатный. Доставка по СПб и ЛО от 1-2 рабочих дней. Официальный дилер ведущих брендов.</p>
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
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Подберём плитку под ваш проект</h2>
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
              <Link href="/blog/kak-uhazhivat-za-keramogranitom" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Уход за керамогранитом</p>
                <p className="text-sm text-muted-foreground">Уход за матовой поверхностью.</p>
              </Link>
              <Link href="/blog/keramogranit-ili-laminat" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Керамогранит или ламинат</p>
                <p className="text-sm text-muted-foreground">Матовый керамогранит для пола.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Матовый керамогранит: форматы.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
