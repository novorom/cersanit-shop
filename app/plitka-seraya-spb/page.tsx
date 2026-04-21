import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://keramogranit-opt.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

const GRAY_COLORS = ["серый", "светло-серый", "темно-серый"]

export const metadata: Metadata = {
  title: "Серая плитка купить в Санкт-Петербурге | Керамогранит Опт",
  description: "Серая плитка и керамогранит в СПб — 64 позиции в наличии. Soft Concrete, Lofthouse, Northwood — склад Янино, доставка по СПб от 1 дня. Цены от 665 ₽/м².",
  alternates: { canonical: `${SITE_URL}/plitka-seraya-spb` },
  openGraph: {
    title: "Серая плитка в Санкт-Петербурге",
    description: "Серая плитка и керамогранит — Soft Concrete, Lofthouse, Northwood. Склад в Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/plitka-seraya-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  {
    question: "Какая серая плитка подходит для ванной комнаты?",
    answer: "Для ванной выбирайте матовую серую плитку с классом скользкости R10 и выше. Хорошие варианты: Soft Concrete (имитация бетона), Lofthouse (лофт стиль), Northwood (серые оттенки дерева). Для стен можно использовать и глянцевую поверхность.",
  },
  {
    question: "Серая плитка — это модно или уже устарело?",
    answer: "Серый остаётся одним из самых актуальных цветов в отделке. Он универсален: сочетается с деревом, металлом, белым, чёрным. Оттенки светло-серого визуально увеличивают пространство, тёмно-серый создаёт выразительный контраст.",
  },
  {
    question: "Как сочетать серую плитку с другими материалами?",
    answer: "Серая плитка отлично сочетается с деревянными акцентами (мебель, двери), белой сантехникой и белыми стенами. Для смелых решений — чёрная фурнитура и тёмные затирки. Медь и латунь добавляют тепло в серый интерьер.",
  },
  {
    question: "Есть ли серая плитка для пола и стен?",
    answer: "Да, большинство серых коллекций Lincer выпускаются в универсальном исполнении — подходят и для пола, и для стен. Для пола выбирайте матовую поверхность, для стен можно использовать сатиновую или глянцевую.",
  },
  {
    question: "Как быстро доставите серую плитку в СПб?",
    answer: "Доставка по Санкт-Петербургу и ЛО — 1-2 рабочих дня. Самовывоз из склада в Янино-1 бесплатный в день оплаты. Режим работы склада: Пн-Пт 10:00-16:45.",
  },
]

const BLOG_ARTICLES = [
  { href: "/blog/kak-vybrat-plitku-dlya-vannoj", title: "Как выбрать плитку для ванной", desc: "Советы по выбору цвета, формата и фактуры." },
  { href: "/blog/formaty-plitki", title: "Форматы серой плитки", desc: "Какой размер выбрать для вашего помещения." },
  { href: "/blog/kak-sozdat-dizajn-vannoj-v-stile-loft", title: "Дизайн ванной в стиле лофт", desc: "Серая плитка как основа лофт-интерьера." },
]

export default function PlitkaSeraya() {
  const grayProducts = products
    .filter((p) => p.color && GRAY_COLORS.some(c => p.color!.includes(c)))
    .sort((a, b) => a.price_retail - b.price_retail)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
          { "@type": "ListItem", position: 3, name: "Серая плитка", item: `${SITE_URL}/plitka-seraya-spb` },
        ],
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Серая плитка</span>
          </nav>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Серая плитка в Санкт-Петербурге
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">
            Универсальный цвет для любого интерьера. Soft Concrete, Lofthouse, Northwood —
            {grayProducts.length} позиций в наличии на складе в Янино.
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
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Серая плитка — {grayProducts.length} позиций
          </h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {grayProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Серая плитка — вне времени</h2>
            <p className="text-foreground/80 leading-relaxed">
              Серый цвет в отделке — это баланс между строгостью и уютом. Он универсален: подходит
              для ванной, кухни, прихожей и гостиной. Светло-серые оттенки визуально расширяют
              пространство, тёмно-серые создают глубину и акцент. Lincer предлагает широкую палитру
              серых коллекций — от нежного светло-серого до насыщенного антрацита.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Популярные серые коллекции</h2>
            <p className="text-foreground/80 leading-relaxed">
              <strong>Soft Concrete</strong> — имитация бетона, форматы 60x120 и 60x60, матовая
              поверхность. Идеальна для лофта и минимализма. <strong>Lofthouse</strong> — серая
              мозаика и плитка, urban-стиль. <strong>Northwood</strong> — керамогранит под светлое
              дерево с серым оттенком, форматы 18x60. <strong>Concretehouse</strong> — крупноформатный
              керамогранит под бетон.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Купить серую плитку в СПб</h2>
            <p className="text-foreground/80 leading-relaxed">
              Весь ассортимент серой плитки в наличии на складе в Янино-1.
              Самовывоз бесплатный. Доставка по СПб и ЛО от 1-2 рабочих дней.
              Бесплатный расчёт количества плитки и помощь в подборе коллекции.
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
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Подберём серую плитку под ваш проект</h2>
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
              <Link href="/blog/trendy-plitki-2025" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Тренды плитки 2025</p>
                <p className="text-sm text-muted-foreground">Серый цвет в трендах 2025.</p>
              </Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как выбрать плитку</p>
                <p className="text-sm text-muted-foreground">Серая плитка для ванной.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Форматы серой плитки.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
