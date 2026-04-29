import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

const WOOD_COLLECTIONS = [
  "Woodhouse", "Lofthouse", "Wood Concept Natural", "Wood Concept Prime",
  "Wood Concept Rustic", "Northwood", "Bonsai Tree", "Kauri Wood",
  "Patinawood", "Sandwood", "Oakwood", "Select Wood", "Chesterwood",
  "Finwood", "Maplewood", "Starwood", "Antiquewood", "Colorwood",
  "Harbourwood", "Teakwood", "Amberwood", "Timber Land",
]

export const metadata: Metadata = {
  title: "Плитка под дерево Cersanit купить в Санкт-Петербурге | Дом Плитки",
  description: "Керамическая плитка и керамогранит под дерево Cersanit в СПб. Woodhouse, Lofthouse, Wood Concept, Northwood — склад Янино, доставка по СПб от 1 дня. Цены от 472 ₽/м².",
  alternates: { canonical: `${SITE_URL}/plitka-pod-derevo-spb` },
  openGraph: {
    title: "Плитка под дерево Cersanit в Санкт-Петербурге",
    description: "Керамогранит с имитацией дерева — Woodhouse, Lofthouse, Wood Concept. Склад в Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/plitka-pod-derevo-spb`,
    siteName: "Дом Плитки CERSANIT",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  {
    question: "Чем керамогранит под дерево лучше натурального паркета?",
    answer: "Керамогранит не боится влаги, не царапается, не рассыхается и не требует специального ухода. Идеален для ванных комнат, кухонь, прихожих и балконов. Современная печать делает текстуру практически неотличимой от натурального дерева.",
  },
  {
    question: "Какие коллекции Cersanit под дерево самые популярные?",
    answer: "Наибольшим спросом пользуются Woodhouse (тёплые тона, 18x60 и 22x90 см), Lofthouse (серые оттенки, лофт-стиль, 30x60 см) и Wood Concept Natural (нейтральные бежевые тона, 18.5x59.8 см).",
  },
  {
    question: "Можно ли класть плитку под дерево на пол и на стену?",
    answer: "Да, большинство коллекций универсальны. Для пола выбирайте матовые и рельефные поверхности (класс скользкости R10-R11). Для стен подходят любые поверхности.",
  },
  {
    question: "Есть ли плитка под дерево с ректификатом?",
    answer: "Да, Wood Concept Natural/Prime и ряд форматов Woodhouse доступны с ректификатом — идеально ровными краями для минимальных швов от 1 мм.",
  },
  {
    question: "Как быстро доставите плитку в Санкт-Петербурге?",
    answer: "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный в день оплаты. Режим работы: Пн-Пт 10:00-16:45.",
  },
]

export default function PlitkaПодДерево() {
  const woodProducts = products
    .filter((p) => p.slug && p.collection && WOOD_COLLECTIONS.includes(p.collection))
    .sort((a, b) => b.price_retail - a.price_retail)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
          { "@type": "ListItem", position: 3, name: "Плитка под дерево", item: `${SITE_URL}/plitka-pod-derevo-spb` },
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
            <span className="text-foreground font-medium">Плитка под дерево</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Плитка под дерево Cersanit в Санкт-Петербурге
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">
            Керамогранит с фотореалистичной текстурой дерева — тепло и уют без забот о влаге и царапинах.
            {" "}{woodProducts.length} позиций в наличии на складе в Янино. Доставка по СПб от 1 дня.
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
            Керамогранит под дерево — {woodProducts.length} позиций
          </h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {woodProducts.map((product, index) => (
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
              Почему выбирают керамогранит под дерево?
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Керамогранит с имитацией дерева — оптимальное решение для современного ремонта. В отличие от натурального паркета,
              он не боится влаги, не деформируется при перепадах температур, не царапается и прост в уходе.
              Современные технологии цифровой печати позволяют воспроизвести текстуру дерева настолько точно,
              что визуально отличить керамогранит от паркета практически невозможно.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Популярные коллекции под дерево в нашем каталоге
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              <strong>Woodhouse</strong> — самая популярная линейка: форматы 18x60 и 22x90 см, тёплые коричневые
              и бежевые оттенки. <strong>Lofthouse</strong> — современный серый дуб в стиле лофт, формат 30x60 см.
              <strong> Wood Concept Natural</strong> и <strong>Wood Concept Prime</strong> — нейтральная классика
              с ректификатом для минимального шва. <strong>Northwood</strong>, <strong>Bonsai Tree</strong>,
              <strong> Kauri Wood</strong> — экзотические текстуры для дизайнерских проектов.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Условия покупки в Санкт-Петербурге
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Весь ассортимент в наличии на складе в посёлке Янино-1 (15-20 минут от КАД). Самовывоз бесплатный.
              Доставка по СПб и ЛО от 1-2 рабочих дней. Работаем с частными клиентами и строительными организациями.
              Бесплатный расчёт количества плитки по размерам помещения.
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
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Нужна помощь в выборе?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Подберём плитку под дерево для вашего проекта и бесплатно рассчитаем количество.
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
                <p className="text-sm text-muted-foreground">Плитка под дерево vs ламинат.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Укладка плитки под дерево.</p>
              </Link>
              <Link href="/blog/trendy-plitki-2025" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Тренды плитки 2025</p>
                <p className="text-sm text-muted-foreground">Дерево в современном интерьере.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
