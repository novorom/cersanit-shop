import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
const SITE_URL = "https://cersanit-spb.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"
const COLS = ["Slate","Pamir","Sandstone","Limestone","Desert","JackStone","Stonehouse","Lofthouse","Soft Concrete","Royal Stone","Royal stone"]
export const metadata: Metadata = {
  title: "Плитка для балкона и лоджии Lincer купить в Санкт-Петербурге | Керамогранит Опт",
  description: "Морозостойкий керамогранит для балкона и лоджии Lincer в СПб. Выдерживает -50°C, класс скользкости R11. Склад Янино, доставка по СПб от 1 дня.",
  alternates: { canonical: `${SITE_URL}/plitka-dlya-balkona-spb` },
  openGraph: { title: "Плитка для балкона Lincer в СПб", url: `${SITE_URL}/plitka-dlya-balkona-spb`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "website" },
}
const faq = [
  { question: "Какая плитка подходит для открытого балкона в СПб?", answer: "Для открытого балкона нужен морозостойкий керамогранит: класс морозостойкости F100 и выше (выдерживает 100+ циклов замораживания/оттаивания). Это обязательное требование для климата Санкт-Петербурга. Также важен класс скользкости R11 — балкон бывает мокрым и обледеневшим." },
  { question: "Чем отличается плитка для балкона от обычной?", answer: "Основное отличие — морозостойкость. Обычная керамическая плитка впитывает воду, которая при замерзании разрушает материал. Морозостойкий керамогранит имеет водопоглощение менее 0,5% — замерзающей воде просто некуда деться, и плитка не трескается." },
  { question: "Нужна ли специальная укладка плитки на балконе?", answer: "Да. На балконе необходима гидроизоляция основания и морозостойкий клей. Швы заполняются специальной затиркой для наружных работ. При укладке делается небольшой уклон (1-2%) для стока воды. Рекомендуем обратиться к специалисту." },
  { question: "Какой размер плитки для балкона?", answer: "Для балконов и лоджий обычно выбирают форматы 30x30, 30x60 или 42x42 см — они практичны при укладке и не требуют подгонки сложных фрагментов. На просторных лоджиях смотрится 60x60 см." },
  { question: "Как быстро доставите в СПб?", answer: "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный. Пн-Пт 10:00-16:45." },
]
const BLOG_ARTICLES_PLITKA_DLYA_BALKONA_SPB = [
            { href: "/blog/kak-ukladyvat-plitku", title: "Укладка плитки на балконе", desc: "Особенности укладки морозостойкого керамогранита." },
            { href: "/blog/keramogranit-ili-laminat", title: "Керамогранит или ламинат для балкона", desc: "Что выбрать с учётом влагостойкости и морозостойкости." },
          ]
export default function PlitkaBalkon() {
  const items = products.filter(p => p.slug && p.collection && COLS.includes(p.collection) && p.frost_resistant).sort((a,b) => b.price_retail - a.price_retail)
  const allItems = items.length > 0 ? items : products.filter(p => p.slug && p.collection && COLS.includes(p.collection)).sort((a,b) => b.price_retail - a.price_retail)
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(f=>({ "@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer} }))}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://cersanit-spb.ru"},{"@type":"ListItem","position":2,"name":"Плитка для балкона","item":"https://cersanit-spb.ru/plitka-dlya-balkona-spb"}]}` }} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Плитка для балкона</span></nav></div></div>
      <section className="bg-primary text-primary-foreground py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Плитка для балкона и лоджии ведущих брендов в Санкт-Петербурге</h1><p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">Морозостойкий керамогранит для открытых и застеклённых балконов. Выдерживает климат СПб, не скользит при намокании. {allItems.length} позиций в наличии в Янино.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors">Смотреть товары <ChevronRight className="h-4 w-4" /></Link><a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors"><Phone className="h-4 w-4" /> {PHONE}</a></div></div></section>
      <section id="products" className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold mb-2">Морозостойкая плитка для балкона — {allItems.length} позиций</h2><p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">{allItems.map((p,i) => <ProductCard key={p.id} product={p} priority={i<4} />)}</div></div></section>
      <section className="py-12 lg:py-16 bg-muted/30"><div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Морозостойкость — главное требование для балкона</h2><p className="text-foreground/80 leading-relaxed">В Санкт-Петербурге балконная плитка ежегодно проходит многократные циклы замораживания и оттаивания. Только морозостойкий керамогранит с водопоглощением менее 0,5% способен выдержать такую нагрузку на протяжении 20+ лет. Обычная керамическая плитка на открытом балконе начнёт трескаться уже через 2-3 зимы.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Наши рекомендации для балкона в СПб</h2><p className="text-foreground/80 leading-relaxed"><strong>Открытый балкон:</strong> Slate (рельефный сланец, R11), Pamir (горный камень), Sandstone (песчаник) — все морозостойкие, не скользят. <strong>Застеклённая лоджия:</strong> здесь выбор шире — Lofthouse, Soft Concrete, Royal Stone. <strong>Формат:</strong> 30x30 или 30x60 см — оптимально для стандартного балкона.</p></div>
      </div></section>
      <section className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold mb-8">Частые вопросы</h2><div className="max-w-3xl flex flex-col gap-4">{faq.map((item,i) => (<details key={i} className="group rounded-xl border border-border bg-card overflow-hidden"><summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium hover:bg-muted/50"><span className="pr-4">{item.question}</span><ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" /></summary><div className="px-6 pb-4"><p className="text-foreground/80 leading-relaxed">{item.answer}</p></div></details>))}</div></div></section>
            <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_ARTICLES_PLITKA_DLYA_BALKONA_SPB.map((a) => (
              <Link key={a.href} href={a.href} className="group flex flex-col bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{a.title}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{a.desc}</span>
                <span className="mt-4 text-xs text-primary font-medium group-hover:underline">Читать →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-4 text-center"><h2 className="text-2xl lg:text-3xl font-bold mb-4">Нужна помощь с выбором?</h2><div className="flex flex-wrap items-center justify-center gap-3 mt-8"><a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90"><Phone className="h-4 w-4" /> Позвонить</a><Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10">Весь каталог <ChevronRight className="h-4 w-4" /></Link></div></div></section>
      {/* Полезные статьи */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Link href="/blog/keramogranit-dlya-balkona-i-terraisy" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Керамогранит для балкона и террасы</p>
                <p className="text-sm text-muted-foreground">Как выбрать морозостойкую плитку.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Технология укладки на балконе.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Оптимальные форматы для балкона.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
