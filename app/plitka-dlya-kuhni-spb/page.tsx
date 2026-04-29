import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"

const COLLECTIONS = ["Calacatta","Deep Calacatta","Soft Concrete","Lofthouse","Wood Concept Natural","Wood Concept Prime","Woodhouse","Concretehouse","Travertino","Limestone","Sandstone","Sevilla","Siena","Stilo","Silvia","Lina","Marble","Polaris","Cambio"]

export const metadata: Metadata = {
  title: "Плитка для кухни Cersanit купить в Санкт-Петербурге | Дом Плитки",
  description: "Керамическая плитка и керамогранит для кухни Cersanit в СПб. Влагостойкая, жиростойкая, легко моется. Склад Янино, доставка по СПб от 1 дня. Цены от 472 руб/м2.",
  alternates: { canonical: `${SITE_URL}/plitka-dlya-kuhni-spb` },
  openGraph: { title: "Плитка для кухни Cersanit в СПб", url: `${SITE_URL}/plitka-dlya-kuhni-spb`, siteName: "Дом Плитки CERSANIT", locale: "ru_RU", type: "website" },
}

const faq = [
  { question: "Какая плитка лучше для кухонного фартука?", answer: "Для фартука — глазурованная керамическая плитка или керамогранит: не впитывают жир, легко моются. Популярные варианты: Calacatta (под мрамор), Soft Concrete (лофт, бетон), Woodhouse (под дерево). Формат 30x60 или 60x60 — современно и минимум швов." },
  { question: "Можно ли класть керамогранит на кухонный пол?", answer: "Да, керамогранит — лучший выбор для кухонного пола. Прочный, устойчив к царапинам, не боится воды и жира. Для безопасности выбирайте матовые поверхности с классом скользкости R10 и выше." },
  { question: "Какой формат плитки для маленькой кухни?", answer: "Для маленькой кухни (до 9 м²) — форматы 30x60 или 42x42 в светлых тонах: визуально увеличивают пространство. Избегайте мелких форматов с большим количеством швов." },
  { question: "Как ухаживать за кухонной плиткой?", answer: "Керамогранит легко моется обычными средствами. Глазурованная поверхность не впитывает жир. Швы лучше обработать водоотталкивающей затиркой — тогда уход минимальный." },
  { question: "Как быстро доставите в СПб?", answer: "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный в день оплаты. Пн-Пт 10:00-16:45." },
]

const BLOG_ARTICLES_PLITKA_DLYA_KUHNI_SPB = [
            { href: "/blog/plitka-dlya-kuhni-kak-vybrat", title: "Плитка для кухни: как выбрать фартук и пол", desc: "Требования к износостойкости, простоте ухода и сочетанию с интерьером." },
            { href: "/blog/kak-ukladyvat-plitku", title: "Как правильно укладывать плитку", desc: "Пошаговая инструкция — подготовка, клей, укладка, затирка." },
            { href: "/blog/rekomendatsii-po-zatirke", title: "Рекомендации по затирке швов", desc: "Какую затирку выбрать и как наносить. Секреты идеальных швов." },
          ]
export default function PlitkaKuhnya() {
  const items = products.filter(p => p.slug && p.collection && COLLECTIONS.includes(p.collection)).sort((a,b) => b.price_retail - a.price_retail)
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Главная",item:SITE_URL},{"@type":"ListItem",position:2,name:"Каталог",item:`${SITE_URL}/catalog`},{"@type":"ListItem",position:3,name:"Плитка для кухни",item:`${SITE_URL}/plitka-dlya-kuhni-spb`}]}) }} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Плитка для кухни</span></nav></div></div>
      <section className="bg-primary text-primary-foreground py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Плитка для кухни Cersanit в Санкт-Петербурге</h1><p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">Влагостойкая, жиростойкая, легко моется — для пола и стен кухни. {items.length} позиций в наличии на складе в Янино.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors">Смотреть товары <ChevronRight className="h-4 w-4" /></Link><a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors"><Phone className="h-4 w-4" /> {PHONE}</a></div></div></section>
      <section id="products" className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Плитка для кухни — {items.length} позиций</h2><p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">{items.map((p,i) => <ProductCard key={p.id} product={p} priority={i<4} />)}</div></div></section>
      <section className="py-12 lg:py-16 bg-muted/30"><div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
        <div><h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Как выбрать плитку для кухни?</h2><p className="text-foreground/80 leading-relaxed">Кухня — зона повышенной влажности и жировых загрязнений. Для пола выбирайте керамогранит с матовой поверхностью (класс скользкости R10+) — он прочнее и не скользит. Для стен и фартука — глазурованная плитка, легко моется от жира. Водопоглощение: не выше 3% для стен, не выше 0,5% для пола.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Популярные решения для кухни</h2><p className="text-foreground/80 leading-relaxed"><strong>Фартук:</strong> Calacatta (под мрамор), Soft Concrete (лофт), Woodhouse (под дерево) — форматы 30x60 и 60x60 см. <strong>Пол:</strong> Wood Concept Natural (ректификат), Lofthouse (серый бетон), Concretehouse 60x120 см. <strong>Маленькая кухня:</strong> светлые тона Calacatta, Travertino, Limestone визуально расширяют пространство.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Купить плитку для кухни в СПб</h2><p className="text-foreground/80 leading-relaxed">Склад в Янино-1 (15-20 мин от КАД). Самовывоз бесплатный. Доставка по СПб и ЛО от 1-2 рабочих дней. Бесплатный расчёт количества плитки.</p></div>
      </div></section>
      <section className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Частые вопросы</h2><div className="max-w-3xl flex flex-col gap-4">{faq.map((item,i) => (<details key={i} className="group rounded-xl border border-border bg-card overflow-hidden"><summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-foreground font-medium hover:bg-muted/50 transition-colors"><span className="pr-4">{item.question}</span><ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" /></summary><div className="px-6 pb-4"><p className="text-foreground/80 leading-relaxed">{item.answer}</p></div></details>))}</div></div></section>
            <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_ARTICLES_PLITKA_DLYA_KUHNI_SPB.map((a) => (
              <Link key={a.href} href={a.href} className="group flex flex-col bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{a.title}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{a.desc}</span>
                <span className="mt-4 text-xs text-primary font-medium group-hover:underline">Читать →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-4 text-center"><h2 className="text-2xl lg:text-3xl font-bold mb-4">Подберём плитку для вашей кухни</h2><p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">Бесплатная консультация и расчёт количества.</p><div className="flex flex-wrap items-center justify-center gap-3"><a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors"><Phone className="h-4 w-4" /> Позвонить</a><Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors">Весь каталог <ChevronRight className="h-4 w-4" /></Link></div></div></section>
      {/* Полезные статьи */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Link href="/blog/plitka-dlya-kuhni-kak-vybrat" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Плитка для кухни: как выбрать</p>
                <p className="text-sm text-muted-foreground">Советы по выбору плитки для фартука.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Пошаговая инструкция укладки.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Какой размер выбрать для кухни.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
