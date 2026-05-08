import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Плитка со склада Янино — самовывоз в СПб | Керамогранит Опт",
  description: "Плитка со склада в Янино-1 СПб. Более 190 позиций в наличии. Самовывоз бесплатно в день оплаты. Режим работы: Пн-Пт 10:00-16:45.",
  alternates: { canonical: `${SITE_URL}/plitka-yanino-spb` },
  openGraph: {
    title: "Плитка со склада в Янино — самовывоз",
    description: "Плитка со склада в Янино-1 СПб. Более 190 позиций в наличии. Самовывоз бесплатно в день оплаты. Режим работы: Пн-Пт 10:00-16:45.",
    url: `${SITE_URL}/plitka-yanino-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  { question: "Как добраться до склада в Янино?", answer: "Адрес: Ленинградская область, Всеволожский район, пос. Янино-1, участок 37. Со стороны СПб: КАД → выезд на Мурманское шоссе → посёлок Янино-1. Время в пути от центра СПб — около 30-40 минут." },
  { question: "Можно ли приехать без предварительного заказа?", answer: "Да, вы можете приехать в шоурум без предварительной договорённости. Режим работы шоурума: ежедневно 10:00-17:00. Для самовывоза со склада лучше позвонить заранее, чтобы мы подготовили ваш заказ." },
  { question: "Принимаете ли вы оплату картой на складе?", answer: "Да, принимаем оплату наличными и картой на месте, а также безналичным переводом. Для юридических лиц — оплата по счёту." },
  { question: "Можно ли посмотреть плитку вживую перед покупкой?", answer: "Да, в нашем шоуруме в Янино вы можете увидеть образцы большинства коллекций. Режим работы: ежедневно 10:00-17:00. Рекомендуем звонить заранее, чтобы мы подготовили интересующие вас образцы." },
]

const BLOG_ARTICLES = [
  { href: "/blog/kak-vybrat-plitku-dlya-vannoj", title: "Как выбрать плитку в шоуруме", desc: "На что обратить внимание при осмотре образцов." },
  { href: "/blog/skolko-plitki-nuzhno-kupit", title: "Расчёт количества плитки", desc: "Как не купить лишнего и не остаться без запаса." },
  { href: "/blog/sertifikaty-kachestva", title: "Сертификаты качества Lincer", desc: "Какие документы мы предоставляем при покупке." },
]

export default function LandingPage() {
  const filteredProducts = products.filter((p) => (p.stock_yanino || 0) > 0)
    .sort((a: any, b: any) => a.price_retail - b.price_retail)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
          { "@type": "ListItem", position: 3, name: "Плитка в наличии", item: `${SITE_URL}/plitka-yanino-spb` },
        ],
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Плитка в наличии</span>
          </nav>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Плитка со склада в Янино — самовывоз</h1>
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
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Плитка в наличии — {filteredProducts.length} позиций</h2>
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
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Склад в Янино-1 — удобный самовывоз</h2>
            <p className="text-foreground/80 leading-relaxed">Наш склад и шоурум расположены в посёлке Янино-1 (Всеволожский район, Ленинградская область) — 20 минут от КАД по Мурманскому шоссе. Удобный заезд для легковых автомобилей и газелей. Режим работы: Пн-Пт 10:00-16:45, шоурум ежедневно 10:00-17:00. Самовывоз бесплатный в день оплаты заказа.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Что есть в наличии на складе</h2>
            <p className="text-foreground/80 leading-relaxed">На складе в Янино постоянно доступны: керамогранит под дерево (Northwood, Wood Concept, Woodhouse), под мрамор (Calacatta, Deep Calacatta), под бетон (Soft Concrete, Lofthouse, Concretehouse), мозаика (Lofthouse, Royal Stone, Woodhouse), настенная плитка (Calacatta, Silvia, Effecta, Blend). Более 190 позиций.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Как забрать заказ самовывозом</h2>
            <p className="text-foreground/80 leading-relaxed">1. Выберите товар на сайте или позвоните нам. 2. Мы подтвердим наличие и выставим счёт. 3. Оплатите удобным способом (наличные, карта, перевод). 4. Приезжайте в Янино-1 в любое рабочее время — товар будет готов к выдаче.</p>
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
              <Link href="/blog/skolko-plitki-nuzhno-kupit" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Сколько плитки нужно купить</p>
                <p className="text-sm text-muted-foreground">Расчёт количества с запасом.</p>
              </Link>
              <Link href="/blog/sertifikaty-kachestva" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Сертификаты качества</p>
                <p className="text-sm text-muted-foreground">Официальный дилер со склада.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Подготовка к укладке.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
