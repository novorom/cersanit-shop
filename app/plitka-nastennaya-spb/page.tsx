import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://lincer.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Настенная плитка купить в Санкт-Петербурге | LINCER",
  description: "Настенная керамическая плитка в СПб — 24 позиции для стен. Calacatta, Silvia, Effecta — склад Янино, доставка по СПб от 1 дня. Цены от 665 ₽/м².",
  alternates: { canonical: `${SITE_URL}/plitka-nastennaya-spb` },
  openGraph: {
    title: "Настенная плитка в Санкт-Петербурге",
    description: "Настенная керамическая плитка в СПб — 24 позиции для стен. Calacatta, Silvia, Effecta — склад Янино, доставка по СПб от 1 дня. Цены от 665 ₽/м².",
    url: `${SITE_URL}/plitka-nastennaya-spb`,
    siteName: "LINCER",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  { question: "Можно ли укладывать напольную плитку на стены?", answer: "Да, универсальный керамогранит отлично ложится на стены. Наоборот нельзя — настенная плитка не выдержит нагрузку на полу. Большинство наших коллекций универсальны и подходят для любых поверхностей." },
  { question: "Как выбрать формат плитки для стен ванной?", answer: "Для небольшой ванной (до 5 м²) — 30x60 вертикально, визуально поднимает потолок. Для просторной ванной — 60x120 создаёт эффект роскоши с минимумом швов. Мозаика — для акцентных зон: ниши, фартук, пол душа." },
  { question: "Сколько плитки нужно на стены ванной?", answer: "Площадь стен = периметр × высота − площадь дверей и окон. Добавьте 10-15% на обрезку. Для стандартной ванной 2x2 м с высотой 2.4 м: около 17-18 м² плитки. Бесплатный расчёт — звоните нам." },
  { question: "Плитка для кухонного фартука — что выбрать?", answer: "Для кухонного фартука подходит любая настенная плитка или универсальный керамогранит. Популярный выбор: белый Calacatta, мозаика Lofthouse или Woodhouse, тёмная плитка Deco. Фартук — это место для эксперимента с цветом и фактурой." },
]

const BLOG_ARTICLES = [
  { href: "/blog/plitka-na-kuhne-fartuk-idei", title: "Плитка для кухонного фартука", desc: "10 идей для фартука из настенной плитки." },
  { href: "/blog/kak-ukladyvat-plitku", title: "Укладка настенной плитки", desc: "Как правильно уложить плитку на стены." },
  { href: "/blog/kak-vybrat-plitku-dlya-vannoj", title: "Выбор плитки для стен ванной", desc: "Советы по цвету, формату и фактуре." },
]

export default function LandingPage() {
  const filteredProducts = products.filter((p) => p.application === "Стена")
    .sort((a: any, b: any) => a.price_retail - b.price_retail)

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
          { "@type": "ListItem", position: 3, name: "Настенная плитка", item: `${SITE_URL}/plitka-nastennaya-spb` },
        ],
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Настенная плитка</span>
          </nav>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Настенная плитка в Санкт-Петербурге</h1>
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
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Настенная плитка — {filteredProducts.length} позиций</h2>
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
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Чем настенная плитка отличается от напольной</h2>
            <p className="text-foreground/80 leading-relaxed">Настенная плитка имеет более высокое водопоглощение (до 10-15%), что делает её легче и проще в монтаже на стены. Она не рассчитана на нагрузку при ходьбе. Напольная плитка и керамогранит универсальны — подходят и для пола, и для стен. Выбирая плитку только для стен, можно сэкономить — настенная коллекция обычно дешевле универсальной.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Популярные настенные коллекции</h2>
            <p className="text-foreground/80 leading-relaxed"><strong>Calacatta</strong> — белый мрамор для стен ванной, форматы 30x60 и 60x120. <strong>Silvia</strong> — структурированная белая плитка для стен. <strong>Effecta</strong> — бежевая плитка 2.5x60 см, вертикальные линии, современный дизайн. <strong>Blend</strong> — нейтральные оттенки, универсальный стиль для кухни и ванной.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Купить настенную плитку в СПб</h2>
            <p className="text-foreground/80 leading-relaxed">24 позиции настенной плитки в наличии на складе в Янино. Плюс более 150 универсальных коллекций — подходят и для стен. Самовывоз бесплатный, доставка по СПб и ЛО от 1-2 дней.</p>
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
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Укладка настенной плитки.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Форматы для стен.</p>
              </Link>
              <Link href="/blog/rekomendatsii-po-zatirke" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Рекомендации по затирке</p>
                <p className="text-sm text-muted-foreground">Затирка для стеновой плитки.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
