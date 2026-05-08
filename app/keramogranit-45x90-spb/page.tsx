import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

export const metadata: Metadata = {
  title: "Керамогранит 45x90 Lincer купить в Санкт-Петербурге | Керамогранит Опт",
  description: "Керамогранит формата 45x90 Lincer в СПб — 12 позиций в наличии. Популярный формат для пола и стен — склад Янино, доставка по СПб от 1 дня.",
  alternates: { canonical: `${SITE_URL}/keramogranit-45x90-spb` },
  openGraph: {
    title: "Керамогранит 45x90 ведущих брендов в Санкт-Петербурге",
    description: "Керамогранит формата 45x90 Lincer в СПб — 12 позиций в наличии. Популярный формат для пола и стен — склад Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/keramogranit-45x90-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  { question: "Сколько плитки 45x90 нужно на 20 м²?", answer: "На 20 м² нужно примерно 50 плиток (одна плитка 45x90 = 0.405 м²). Плюс 10% на обрезку = 55 плиток. Уточните у нас — сделаем бесплатный точный расчёт с учётом раскладки." },
  { question: "Формат 45x90 или 60x60 — что лучше для коридора?", answer: "45x90 создаёт более динамичный рисунок в коридоре, особенно при укладке вдоль помещения — визуально вытягивает пространство. 60x60 — более статичный и нейтральный. Для узкого коридора 45x90 вдоль — отличное решение." },
  { question: "Можно ли уложить 45x90 на тёплый пол?", answer: "Да, формат 45x90 отлично подходит для тёплого пола. Керамогранит хорошо проводит тепло. Используйте специальный клей для тёплых полов и следуйте инструкции производителя системы обогрева." },
  { question: "Есть ли 45x90 в наличии?", answer: "Да, 12 позиций формата 45x90 на складе в Янино. Самовывоз в день оплаты." },
]

const BLOG_ARTICLES = [
  { href: "/blog/kak-ukladyvat-plitku", title: "Укладка плитки 45x90", desc: "Способы раскладки и советы мастера." },
  { href: "/blog/kak-ukladyvat-keramogranit-elochkoy", title: "Укладка ёлочкой и со смещением", desc: "Пошаговая инструкция для формата 45x90." },
  { href: "/blog/kak-rezat-keramogranit", title: "Как резать керамогранит 45x90", desc: "Инструменты и техника резки." },
]

export default function LandingPage() {
  const filteredProducts = products.filter((p) => p.format === "45x90")
    .sort((a: any, b: any) => a.price_retail - b.price_retail)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
          { "@type": "ListItem", position: 3, name: "Керамогранит 45x90", item: `${SITE_URL}/keramogranit-45x90-spb` },
        ],
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Керамогранит 45x90</span>
          </nav>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Керамогранит 45x90 ведущих брендов в Санкт-Петербурге</h1>
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
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Керамогранит 45x90 — {filteredProducts.length} позиций</h2>
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
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Почему формат 45x90 так популярен</h2>
            <p className="text-foreground/80 leading-relaxed">Формат 45x90 см — золотая середина между крупным 60x120 и классическим 60x60. Он создаёт эффект простора без сложностей монтажа крупного формата. При укладке со смещением 50% имитирует формат паркетной доски. Одинаково хорошо смотрится на полу и стенах, особенно в ванных комнатах и прихожих.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Укладка 45x90: советы</h2>
            <p className="text-foreground/80 leading-relaxed">Формат 45x90 обычно укладывают тремя способами: <strong>прямая раскладка</strong> — ряды параллельно стенам, классика. <strong>Со смещением 1/2</strong> — имитирует паркет, скрывает неровности пола. <strong>Ёлочкой</strong> — декоративный эффект, требует больше обрезков. Рекомендуем шов 2-3 мм с эпоксидной затиркой.</p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Купить керамогранит 45x90 в СПб</h2>
            <p className="text-foreground/80 leading-relaxed">12 позиций формата 45x90 в наличии на складе в Янино. Самовывоз бесплатный, доставка по СПб и ЛО от 1-2 рабочих дней. Бесплатный расчёт количества плитки по вашим размерам.</p>
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
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Формат 45x90: где использовать.</p>
              </Link>
              <Link href="/blog/kak-rezat-keramogranit" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как резать керамогранит</p>
                <p className="text-sm text-muted-foreground">Резка формата 45x90.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Укладка прямоугольного формата.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
