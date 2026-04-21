import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://lincer.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Плитка для душевой кабины купить в Санкт-Петербурге | LINCER",
  description: "Плитка для душевой кабины Lincer в СПб — нескользкая, влагостойкая. Mosaic, Calacatta, Lofthouse — склад Янино, доставка по СПб от 1 дня.",
  alternates: { canonical: `${SITE_URL}/plitka-dlya-dushi-spb` },
  openGraph: {
    title: "Плитка для душевой кабины в Санкт-Петербурге",
    description: "Плитка для душевой кабины Lincer в СПб — нескользкая, влагостойкая. Mosaic, Calacatta, Lofthouse — склад Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/plitka-dlya-dushi-spb`,
    siteName: "LINCER",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  { question: "Какая плитка не скользит в душе?", answer: "Выбирайте плитку с классом скользкости R10 и выше. Мозаика на полу душа — отличный вариант: много швов создают дополнительное сцепление. Матовая поверхность скользит меньше, чем полированная. Все эти параметры указаны в характеристиках товара на нашем сайте." },
  { question: "Мозаика или плитка для пола в душевой?", answer: "Мозаика предпочтительнее для пола душа: маленький формат легко укладывается с уклоном к сливу, больше затирочных швов создают антискользящий эффект. Для стен душа лучше подходит плитка форматом 30x60 или крупнее." },
  { question: "Нужна ли специальная затирка для душа?", answer: "Да, для зоны душа рекомендуем эпоксидную затирку — она не впитывает влагу, не темнеет и устойчива к бытовой химии. Стоит дороже цементной, но прослужит весь срок жизни плитки." },
  { question: "Сколько плитки нужно на стандартную душевую кабину?", answer: "Стандартная душевая 90x90 см с высотой стен 2.1 м: около 8-9 м² плитки на стены + 0.8 м² мозаики на пол. Точный расчёт сделаем бесплатно по вашим размерам — звоните." },
]

const BLOG_ARTICLES = [
  { href: "/blog/rekomendatsii-po-zatirke", title: "Как выбрать затирку для душа", desc: "Эпоксидная или цементная — что лучше." },
  { href: "/blog/kak-ukladyvat-mozaiku", title: "Укладка мозаики в душе", desc: "Пошаговая инструкция для пола душевой." },
  { href: "/blog/skolko-plitki-nuzhno-kupit", title: "Расчёт плитки для душа", desc: "Как правильно рассчитать количество." },
]

export default function LandingPage() {
  const filteredProducts = products.filter((p) => p.slip_class && ["R10","R11","R12","R13"].some(r => p.slip_class!.includes(r)))
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
          { "@type": "ListItem", position: 3, name: "Плитка для душа", item: `${SITE_URL}/plitka-dlya-dushi-spb` },
        ],
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Плитка для душа</span>
          </nav>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Плитка для душевой кабины в Санкт-Петербурге</h1>
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
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Плитка для душа — {filteredProducts.length} позиций</h2>
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
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Требования к плитке для душевой</h2>
            <p className="text-foreground/80 leading-relaxed">Плитка для душевой должна быть нескользкой (класс R10 и выше), влагостойкой и устойчивой к чистящим средствам. Керамогранит — идеальный выбор: водопоглощение менее 0.5%, срок службы более 50 лет. Мозаика на полу душа — классическое решение: маленький формат создаёт больше швов, которые дают сцепление с ногой.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Что выбрать: мозаику или плитку для душа</h2>
            <p className="text-foreground/80 leading-relaxed">Мозаика отлично подходит для пола душа: маленький формат создаёт больше швов для сцепления. На стены — плитка 30x60 или крупный формат 60x120. Используйте эпоксидную затирку — она не темнеет и не пропускает влагу.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Купить плитку для душа в СПб</h2>
            <p className="text-foreground/80 leading-relaxed">Весь ассортимент в наличии на складе в Янино-1. Консультация по подбору плитки для душа бесплатно. Самовывоз или доставка по СПб и ЛО от 1-2 дней.</p>
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
                <p className="text-sm text-muted-foreground">Укладка плитки в душевой.</p>
              </Link>
              <Link href="/blog/rekomendatsii-po-zatirke" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Рекомендации по затирке</p>
                <p className="text-sm text-muted-foreground">Водостойкая затирка для душа.</p>
              </Link>
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как выбрать плитку для ванной</p>
                <p className="text-sm text-muted-foreground">Выбор плитки для душа.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
