import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://keramogranit-opt.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Плитка для офиса и коммерческих помещений в СПб | Керамогранит Опт Lincer",
  description: "Плитка для офиса и коммерческих помещений Lincer в СПб. Высокий класс износостойкости 4-5, морозостойкая. Склад Янино, доставка по СПб от 1 дня.",
  alternates: { canonical: `${SITE_URL}/plitka-dlya-ofisa-spb` },
  openGraph: {
    title: "Плитка для офиса и коммерческих помещений в Санкт-Петербурге",
    description: "Плитка для офиса и коммерческих помещений Lincer в СПб. Высокий класс износостойкости 4-5, морозостойкая. Склад Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/plitka-dlya-ofisa-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  { question: "Какой класс износостойкости нужен для офиса?", answer: "Для офиса с умеренным трафиком достаточно класса 4. Для торговых центров, ресторанов и помещений с высоким трафиком — класс 5. Все характеристики указаны в карточках товара на нашем сайте." },
  { question: "Можно ли использовать обычную плитку в коммерческих помещениях?", answer: "Нет. Плитка класса 1-2 предназначена для жилых помещений с минимальной нагрузкой. В коммерческих помещениях она быстро потеряет вид. Выбирайте керамогранит класса 4-5 с соответствующей нагрузке поверхностью." },
  { question: "Работаете ли вы с юридическими лицами?", answer: "Да, работаем с ИП и юридическими лицами. Предоставляем полный пакет документов: счёт, УПД, договор поставки. Для крупных заказов возможна индивидуальная скидка и отсрочка платежа." },
  { question: "Какой объём заказа минимальный для B2B?", answer: "Минимального объёма нет — работаем от одной упаковки. Для оптовых заказов (от 50 м²) предоставляем скидку. Звоните, обсудим условия." },
]

const BLOG_ARTICLES = [
  { href: "/blog/keramicheskaya-plitka-ili-keramogranit-razlichiya", title: "Керамогранит vs плитка для офиса", desc: "Что выбрать для коммерческого помещения." },
  { href: "/blog/kak-uhazhivat-za-keramogranitom", title: "Уход за плиткой в офисе", desc: "Как поддерживать вид в условиях высокой нагрузки." },
  { href: "/blog/formaty-plitki", title: "Форматы плитки для офиса", desc: "60x120 для open space, 60x60 для кабинетов." },
]

export default function LandingPage() {
  const filteredProducts = products.filter((p) => p.wear_class && ["4","5"].includes(p.wear_class))
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
          { "@type": "ListItem", position: 3, name: "Плитка для офиса", item: `${SITE_URL}/plitka-dlya-ofisa-spb` },
        ],
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Плитка для офиса</span>
          </nav>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Плитка для офиса и коммерческих помещений в Санкт-Петербурге</h1>
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
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Плитка для офиса — {filteredProducts.length} позиций</h2>
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
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Требования к плитке для коммерческих помещений</h2>
            <p className="text-foreground/80 leading-relaxed">Для офиса, магазина, ресторана или торгового центра нужна плитка с высоким классом износостойкости — 4 или 5. Это означает устойчивость к интенсивному пешеходному трафику. Дополнительные требования: антискользящая поверхность (R10+), лёгкость уборки, устойчивость к химии. Керамогранит соответствует всем этим требованиям.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Какие коллекции подходят для офиса</h2>
            <p className="text-foreground/80 leading-relaxed">Для офисов и коммерческих помещений рекомендуем: <strong>Soft Concrete 60x120</strong> — строгий, минималистичный, класс износостойкости 4. <strong>Calacatta 60x120</strong> — представительный вид для переговорных и рецепции. <strong>Tiffany 42x42</strong> — классика для зон ожидания. Все коллекции прошли сертификацию и соответствуют ГОСТ.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Купить плитку для офиса в СПб оптом и в розницу</h2>
            <p className="text-foreground/80 leading-relaxed">Работаем как с розничными покупателями, так и с B2B-клиентами — строительными компаниями, дизайнерами, застройщиками. Возможна работа по договору с отсрочкой платежа. Склад в Янино-1, самовывоз бесплатный, доставка по СПб и ЛО.</p>
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
              <Link href="/blog/keramogranit-ili-laminat" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Керамогранит или ламинат</p>
                <p className="text-sm text-muted-foreground">Что лучше для офиса.</p>
              </Link>
              <Link href="/blog/kak-uhazhivat-za-keramogranitom" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Уход за керамогранитом</p>
                <p className="text-sm text-muted-foreground">Уход за офисным полом.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Крупный формат для офиса.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
