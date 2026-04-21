import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://lincer.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

const BETON_COLLECTIONS = [
  "Soft Concrete", "Concretehouse", "Effecta", "Lofthouse",
  "Loft", "Electric Mist", "Landscape",
]

export const metadata: Metadata = {
  title: "Плитка под бетон Lincer купить в Санкт-Петербурге | LINCER",
  description: "Керамогранит под бетон и лофт Lincer в СПб. Soft Concrete, Concretehouse, Lofthouse, Effecta — склад Янино, доставка по СПб от 1 дня. Стиль лофт и минимализм для пола и стен.",
  alternates: { canonical: `${SITE_URL}/plitka-pod-beton-spb` },
  openGraph: {
    title: "Плитка под бетон ведущих брендов в Санкт-Петербурге",
    description: "Керамогранит в стиле лофт — Soft Concrete, Concretehouse, Lofthouse. Склад в Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/plitka-pod-beton-spb`,
    siteName: "LINCER",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  {
    question: "Чем плитка под бетон отличается от обычной серой плитки?",
    answer: "Плитка под бетон имитирует фактуру шлифованного или необработанного бетона — с характерными порами, разводами и неоднородностью тона. Это придаёт интерьеру индустриальный или минималистичный характер, который невозможно получить от равномерно окрашенной плитки.",
  },
  {
    question: "Для каких помещений подходит плитка под бетон?",
    answer: "Стиль лофт и минимализм популярен в гостиных, кухнях, прихожих и ванных комнатах. Особенно выигрышно смотрится в просторных помещениях с высокими потолками. Коллекции Lincer под бетон подходят как для пола, так и для стен.",
  },
  {
    question: "Какие форматы плитки под бетон есть в наличии?",
    answer: "В нашем каталоге есть форматы 30x60 см (Soft Concrete, Lofthouse), 60x120 см (Concretehouse) и 42x42 см. Крупный формат 60x120 создаёт эффект монолитного бетонного покрытия.",
  },
  {
    question: "Плитка под бетон скользкая?",
    answer: "Матовые и структурные поверхности имеют хорошее сцепление. Для ванной и кухни рекомендуем выбирать матовые варианты с классом скользкости R10 и выше. Уточните при заказе — подберём подходящий вариант.",
  },
  {
    question: "Как быстро доставите в Санкт-Петербурге?",
    answer: "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный в день оплаты. Пн-Пт 10:00-16:45.",
  },
]

const BLOG_ARTICLES_PLITKA_POD_BETON_SPB = [
            { href: "/blog/trendy-plitki-2025", title: "Тренды 2025: бетон и лофт", desc: "Почему стиль лофт с плиткой под бетон снова в моде." },
            { href: "/blog/formaty-plitki", title: "Форматы для стиля лофт", desc: "60x120 или 30x60 — что лучше для интерьера под бетон." },
          ]
export default function PlitkaПодБетон() {
  const betonProducts = products
    .filter((p) => p.slug && p.collection && BETON_COLLECTIONS.includes(p.collection))
    .sort((a, b) => b.price_retail - a.price_retail)

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
          { "@type": "ListItem", position: 3, name: "Плитка под бетон", item: `${SITE_URL}/plitka-pod-beton-spb` },
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
            <span className="text-foreground font-medium">Плитка под бетон</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Плитка под бетон ведущих брендов в Санкт-Петербурге
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">
            Индустриальный стиль лофт и минимализм для пола и стен. Soft Concrete, Concretehouse,
            Lofthouse — {betonProducts.length} позиций в наличии на складе в Янино.
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
            Керамогранит под бетон и лофт — {betonProducts.length} позиций
          </h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {betonProducts.map((product, index) => (
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
              Плитка под бетон — стиль лофт в вашем интерьере
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Керамогранит с имитацией бетона — главный материал стиля лофт и индустриального минимализма.
              Характерные серые оттенки, фактурная поверхность с порами и неоднородность тона создают
              атмосферу современного городского пространства. В отличие от настоящего бетона, плитка
              не пылит, легко моется и не требует пропитки.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Коллекции под бетон в нашем каталоге
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              <strong>Soft Concrete</strong> — мягкий бетон, светло-серые оттенки, формат 30x60 см,
              подходит для пола и стен. <strong>Concretehouse</strong> — крупный формат 60x120 см
              для создания монолитного покрытия. <strong>Lofthouse</strong> — бетон с текстурой дерева,
              универсальный лофт. <strong>Effecta</strong> — декоративная рельефная поверхность
              с бетонным эффектом. <strong>Loft</strong> — минималистичная однотонная плитка с бетонной фактурой.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Условия покупки в Санкт-Петербурге
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Весь ассортимент в наличии на складе в Янино-1. Самовывоз бесплатный.
              Доставка по СПб и ЛО от 1-2 рабочих дней. Помогаем с подбором и расчётом количества.
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
            {BLOG_ARTICLES_PLITKA_POD_BETON_SPB.map((a) => (
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
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Нужна помощь в выборе?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Подберём плитку под бетон для вашего проекта, бесплатно рассчитаем количество.
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
                <p className="text-sm text-muted-foreground">Бетон и лофт в интерьере.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Укладка бетонной плитки.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Форматы для стиля лофт.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
