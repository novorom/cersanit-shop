import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

const MARBLE_COLLECTIONS = [
  "Calacatta", "Deep Calacatta", "Lumina Onyx", "Classy Marble",
  "Gold Venice", "Madeira Onyx", "Light Marquina", "Thassos",
  "Neve", "Crema", "Onio", "Travertino",
]

export const metadata: Metadata = {
  title: "Плитка под мрамор для стен Lincer в СПб — цены со склада | Керамогранит Опт",
  description: "Керамогранит под мрамор Lincer в СПб. Calacatta, Deep Calacatta, Lumina Onyx, Travertino — в наличии на складе Янино. Доставка по СПб от 1 дня. Роскошный вид без хлопот.",
  alternates: { canonical: `${SITE_URL}/plitka-pod-mramor-spb` },
  openGraph: {
    title: "Плитка под мрамор ведущих брендов в Санкт-Петербурге",
    description: "Керамогранит с имитацией мрамора — Calacatta, Deep Calacatta, Lumina Onyx. Склад в Янино, доставка по СПб от 1 дня.",
    url: `${SITE_URL}/plitka-pod-mramor-spb`,
    siteName: "Керамогранит Опт",
    locale: "ru_RU",
    type: "website",
  },
}

const faq = [
  {
    question: "Чем керамогранит под мрамор лучше настоящего мрамора?",
    answer: "Натуральный мрамор требует специальной пропитки, боится кислот, скользит и стоит в разы дороже. Керамогранит с имитацией мрамора не впитывает влагу, устойчив к бытовой химии, не скользит и не требует ухода. При этом визуально практически неотличим от натурального камня.",
  },
  {
    question: "Что такое коллекция Calacatta и чем она популярна?",
    answer: "Calacatta — классика итальянского мрамора: белый или светло-серый фон с выразительными серыми прожилками. Это самый популярный дизайн для ванных комнат и кухонь. Lincer предлагает несколько вариантов: Calacatta (классика), Deep Calacatta (с насыщенными прожилками), Light Marquina (тёмный фон с белыми прожилками).",
  },
  {
    question: "Можно ли укладывать плитку под мрамор на пол?",
    answer: "Да, большинство коллекций под мрамор Lincer подходят для пола. Полированные поверхности лучше использовать в зонах с низкой проходимостью. Для ванных, прихожих и кухонь выбирайте матовые или сатиновые варианты — они менее скользкие.",
  },
  {
    question: "Какой формат плитки под мрамор выбрать?",
    answer: "Для большого пространства и эффекта роскоши выбирайте крупные форматы: 60x120 или 60x60 см — они подчёркивают рисунок камня. Для небольших помещений подойдут 30x60 см. Укладка \"в стык\" или с минимальным швом создаёт эффект монолитного мраморного покрытия.",
  },
  {
    question: "Как быстро доставите плитку в Санкт-Петербурге?",
    answer: "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный в день оплаты. Пн-Пт 10:00-16:45.",
  },
]

const BLOG_ARTICLES_PLITKA_POD_MRAMOR_SPB = [
            { href: "/blog/kak-vybrat-plitku-dlya-vannoj", title: "Плитка под мрамор для ванной", desc: "Как выбрать и уложить плитку под мрамор." },
            { href: "/blog/trendy-plitki-2025", title: "Тренды 2025: мрамор Calacatta", desc: "Calacatta — самый популярный тренд этого года." },
            { href: "/blog/formaty-plitki", title: "Форматы плитки под мрамор", desc: "Большой формат 60x120 для максимального эффекта мрамора." },
          ]
export default function PlitkaПодМрамор() {
  const marbleProducts = products
    .filter((p) => p.slug && p.collection && MARBLE_COLLECTIONS.includes(p.collection))
    .sort((a, b) => b.price_retail - a.price_retail)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/catalog` },
          { "@type": "ListItem", position: 3, name: "Плитка под мрамор", item: `${SITE_URL}/plitka-pod-mramor-spb` },
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
            <span className="text-foreground font-medium">Плитка под мрамор</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Плитка под мрамор ведущих брендов в Санкт-Петербурге
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">
            Роскошь натурального мрамора без сложного ухода и высоких цен. Коллекции Calacatta,
            Deep Calacatta, Lumina Onyx — {marbleProducts.length} позиций в наличии на складе в Янино.
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
            Керамогранит под мрамор — {marbleProducts.length} позиций
          </h2>
          <p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {marbleProducts.map((product, index) => (
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
              Керамогранит под мрамор — практичная роскошь
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Мраморная плитка создаёт ощущение дорогого интерьера в ванной, гостиной или прихожей.
              Lincer использует технологию цифровой печати высокого разрешения, которая воспроизводит
              мельчайшие детали мраморных прожилок. При этом керамогранит не требует пропитки, не боится
              бытовой химии и сохраняет внешний вид десятилетиями.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Коллекции под мрамор в нашем каталоге
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              <strong>Calacatta</strong> — классический итальянский мрамор, белый фон с серыми прожилками,
              форматы от 29.8x59.8 до 60x120 см. <strong>Deep Calacatta</strong> — более выразительные
              прожилки для акцентных зон. <strong>Lumina Onyx</strong> — изысканный оникс, светящийся
              эффект. <strong>Travertino</strong> — натуральный травертин, тёплые бежевые тона.
              <strong> Light Marquina</strong> — тёмный мрамор с белыми прожилками для контрастных решений.
            </p>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              Купить плитку под мрамор в СПб
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Весь ассортимент в наличии на складе в Янино-1. Самовывоз бесплатный.
              Доставка по СПб и ЛО от 1-2 рабочих дней. Бесплатный расчёт количества плитки,
              помощь в подборе коллекции под ваш проект.
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
            {BLOG_ARTICLES_PLITKA_POD_MRAMOR_SPB.map((a) => (
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
            Бесплатная консультация и расчёт количества плитки под мрамор для вашего помещения.
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
    </div>
  )
}
