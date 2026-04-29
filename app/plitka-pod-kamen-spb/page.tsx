import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

const STONE_COLLECTIONS = [
  "Royal Stone", "Royal stone", "Slate", "Mont Blanc", "Deco",
  "Silver Roots", "Grigio Nuovalato", "Fancy Stone", "Stonehouse",
  "Sandstone", "Limestone", "Desert", "Pamir", "JackStone",
]

export const metadata: Metadata = {
  title: "Плитка под камень Cersanit купить в Санкт-Петербурге | Дом Плитки",
  description: "Керамогранит под натуральный камень Cersanit в СПб. Royal Stone, Slate, Stonehouse, Sandstone — склад Янино, доставка по СПб от 1 дня. Природная фактура без сложного ухода.",
  alternates: { canonical: `${SITE_URL}/plitka-pod-kamen-spb` },
  openGraph: {
    title: "Плитка под камень Cersanit в Санкт-Петербурге",
    description: "Керамогранит с имитацией камня — Royal Stone, Slate, Stonehouse, Sandstone. Склад в Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/plitka-pod-kamen-spb`,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  {
    question: "Чем керамогранит под камень лучше натурального?",
    answer: "Натуральный камень (гранит, сланец) тяжёлый, пористый, требует пропитки и сложного ухода. Керамогранит воспроизводит фактуру и цвет камня, но не впитывает влагу, не окрашивается от кофе или вина, не требует особого ухода и весит значительно меньше.",
  },
  {
    question: "Какие коллекции под камень подходят для улицы и балконов?",
    answer: "Для наружных работ и балконов нужен морозостойкий керамогранит. В нашем каталоге это коллекции Slate, Pamir, Sandstone и Desert — они имеют класс морозостойкости F100 и выше. Обязательно уточняйте при заказе.",
  },
  {
    question: "Плитка под камень подходит для ванной комнаты?",
    answer: "Да, это один из самых популярных вариантов для ванных. Фактурная поверхность создаёт природную атмосферу спа. Выбирайте матовые коллекции — они не скользкие и хорошо скрывают капли воды.",
  },
  {
    question: "Есть ли плитка под камень для стен?",
    answer: "Да, коллекция Royal Stone и Deco специально разработаны как настенная плитка формата 29.8x59.8 см. Для стен подходят также Slate и Silver Roots.",
  },
  {
    question: "Как быстро доставите плитку в Санкт-Петербурге?",
    answer: "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный в день оплаты. Пн-Пт 10:00-16:45.",
  },
]

const BLOG_ARTICLES_PLITKA_POD_KAMEN_SPB = [
            { href: "/blog/kak-ukladyvat-plitku", title: "Как укладывать плитку под камень", desc: "Особенности укладки крупноформатной плитки под натуральный камень." },
            { href: "/blog/trendy-plitki-2025", title: "Тренды 2025: природные текстуры", desc: "Камень, сланец и травертин — популярные фактуры сезона." },
          ]
export default function PlitkaПодКамень() {
  const stoneProducts = products
    .filter((p) => p.slug && p.collection && STONE_COLLECTIONS.includes(p.collection))
    .sort((a, b) => b.price_retail - a.price_retail)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
          { "@type": "ListItem", position: 3, name: "Плитка под камень", item: `${SITE_URL}/plitka-pod-kamen-spb` },
        ],
      })}} />

      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Плитка под камень</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Плитка под камень Cersanit в Санкт-Петербурге
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">
            Природная фактура гранита, сланца и песчаника без сложного ухода. Royal Stone, Slate,
            Stonehouse, Sandstone — {stoneProducts.length} позиций в наличии на складе в Янино.
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

      {/* Products */}
      <section id="products" className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Керамогранит под камень — {stoneProducts.length} позиций
          </h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {stoneProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Text */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Природная красота без хлопот — керамогранит под камень
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Плитка с имитацией природного камня создаёт особую атмосферу в интерьере — основательную,
              природную, вне времени. Cersanit передаёт фактуру гранита, сланца, песчаника и известняка
              с высокой точностью. При этом керамогранит не требует пропитки, не впитывает жиры и влагу,
              легко моется обычными средствами.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Коллекции под камень в нашем каталоге
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              <strong>Royal Stone</strong> — натуральный камень для стен, формат 29.8x59.8 см,
              белый и тёмный варианты. <strong>Slate</strong> — рельефная поверхность сланца,
              морозостойкий, подходит для улицы. <strong>Stonehouse</strong> — крупноформатный
              керамогранит под кладочный камень. <strong>Sandstone</strong> и <strong>Limestone</strong> —
              песчаник и известняк в тёплых бежевых тонах. <strong>Pamir</strong> — горный камень,
              брутальная фактура для прихожих и прочих зон.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Купить плитку под камень в СПб — наши условия
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Весь ассортимент в наличии на складе в Янино-1. Самовывоз бесплатный.
              Доставка по СПб и ЛО от 1-2 рабочих дней. Бесплатный расчёт количества,
              помощь с подбором коллекции под ваш проект.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
            <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_ARTICLES_PLITKA_POD_KAMEN_SPB.map((a) => (
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
            Бесплатная консультация и расчёт количества плитки под камень.
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
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Укладка плитки под камень.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Форматы для каменного декора.</p>
              </Link>
              <Link href="/blog/trendy-plitki-2025" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Тренды плитки 2025</p>
                <p className="text-sm text-muted-foreground">Натуральный камень в трендах.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
