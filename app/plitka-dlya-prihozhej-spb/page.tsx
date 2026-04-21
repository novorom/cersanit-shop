import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
const SITE_URL = "https://lincer.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"
const COLS = ["Lofthouse","Soft Concrete","Concretehouse","Wood Concept Natural","Wood Concept Prime","Woodhouse","Royal Stone","Royal stone","Slate","Pamir","Sandstone","Limestone","Northwood","Bonsai Tree","Stilo","Silvia","Desert","JackStone","Stonehouse"]
export const metadata: Metadata = {
  title: "Плитка для прихожей Lincer купить в Санкт-Петербурге | LINCER",
  description: "Износостойкая плитка и керамогранит для прихожей Lincer в СПб. Класс износостойкости PEI IV-V, класс скользкости R10+. Склад Янино, доставка от 1 дня.",
  alternates: { canonical: `${SITE_URL}/plitka-dlya-prihozhej-spb` },
  openGraph: { title: "Плитка для прихожей Lincer в СПб", url: `${SITE_URL}/plitka-dlya-prihozhej-spb`, siteName: "LINCER", locale: "ru_RU", type: "website" },
}
const faq = [
  { question: "Что важно при выборе плитки для прихожей?", answer: "Три ключевых параметра: износостойкость (PEI IV или V для прихожих с высокой проходимостью), класс скользкости (R10 и выше — не скользит даже с мокрой обувью), и практичный тёмный или средний цвет — не так заметна грязь." },
  { question: "Какой формат плитки выбрать для прихожей?", answer: "Крупный формат 60x60 или 60x120 см создаёт ощущение простора и уменьшает количество швов (меньше точек скопления грязи). Для узких прихожей подойдёт вытянутый формат 30x60 или 18x60 см, уложенный вдоль." },
  { question: "Нужна ли специальная плитка для прихожей с тёплым полом?", answer: "Да. Если планируется система подогрева пола — выбирайте плитку с низким коэффициентом теплового расширения и специальным клеем. Керамогранит совместим с тёплым полом — уточните при заказе." },
  { question: "Можно ли использовать плитку под дерево в прихожей?", answer: "Да, Woodhouse и Wood Concept Natural прекрасно смотрятся в прихожих — создают тёплую атмосферу. Выбирайте матовые версии с рельефной поверхностью для хорошего сцепления с ногой." },
  { question: "Как быстро доставите в СПб?", answer: "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный. Пн-Пт 10:00-16:45." },
]
const BLOG_ARTICLES_PLITKA_DLYA_PRIHOZHEJ_SPB = [
            { href: "/blog/keramogranit-ili-laminat", title: "Керамогранит или ламинат для прихожей", desc: "Что лучше выбрать — сравниваем по износостойкости и уходу." },
            { href: "/blog/formaty-plitki", title: "Форматы плитки для прихожей", desc: "Большой формат в прихожей — плюсы и минусы." },
            { href: "/blog/kak-ukladyvat-plitku", title: "Как правильно укладывать плитку", desc: "Подготовка основания, клей, затирка." },
          ]
export default function PlitkaPrivhozhaya() {
  const items = products.filter(p => p.slug && p.collection && COLS.includes(p.collection)).sort((a,b) => b.price_retail - a.price_retail)
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(f=>({ "@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer} }))}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://lincer.ru"},{"@type":"ListItem","position":2,"name":"Плитка для прихожей","item":"https://lincer.ru/plitka-dlya-prihozhej-spb"}]}` }} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Плитка для прихожей</span></nav></div></div>
      <section className="bg-primary text-primary-foreground py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Плитка для прихожей ведущих брендов в Санкт-Петербурге</h1><p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">Износостойкий керамогранит PEI IV-V, класс скользкости R10+. Выдерживает высокую проходимость, легко моется. {items.length} позиций в наличии в Янино.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors">Смотреть товары <ChevronRight className="h-4 w-4" /></Link><a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors"><Phone className="h-4 w-4" /> {PHONE}</a></div></div></section>
      <section id="products" className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Плитка для прихожей — {items.length} позиций</h2><p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">{items.map((p,i) => <ProductCard key={p.id} product={p} priority={i<4} />)}</div></div></section>
      <section className="py-12 lg:py-16 bg-muted/30"><div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Требования к плитке для прихожей</h2><p className="text-foreground/80 leading-relaxed">Прихожая — самая нагруженная зона в доме: грязь с улицы, мокрая обувь, частый трафик. Выбирайте керамогранит с классом износостойкости PEI IV или V — он выдержит даже коммерческую эксплуатацию. Класс скользкости R10-R11 обязателен для безопасности. Тёмные и средние тона — практичнее, меньше видна грязь.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Популярные решения для прихожей</h2><p className="text-foreground/80 leading-relaxed"><strong>Под бетон/лофт:</strong> Lofthouse (30x60, серый, рельеф R11), Soft Concrete (30x60, матовый), Concretehouse (60x120, монолит). <strong>Под дерево:</strong> Woodhouse, Wood Concept Natural — тепло и практичность. <strong>Под камень:</strong> Slate, Pamir, Royal Stone — брутальная текстура, прочность.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Купить в Санкт-Петербурге</h2><p className="text-foreground/80 leading-relaxed">Склад Янино-1 (15-20 мин от КАД). Самовывоз бесплатный. Доставка по СПб и ЛО 1-2 рабочих дня.</p></div>
      </div></section>
      <section className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold mb-8">Частые вопросы</h2><div className="max-w-3xl flex flex-col gap-4">{faq.map((item,i) => (<details key={i} className="group rounded-xl border border-border bg-card overflow-hidden"><summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium hover:bg-muted/50"><span className="pr-4">{item.question}</span><ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" /></summary><div className="px-6 pb-4"><p className="text-foreground/80 leading-relaxed">{item.answer}</p></div></details>))}</div></div></section>
            <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_ARTICLES_PLITKA_DLYA_PRIHOZHEJ_SPB.map((a) => (
              <Link key={a.href} href={a.href} className="group flex flex-col bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{a.title}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{a.desc}</span>
                <span className="mt-4 text-xs text-primary font-medium group-hover:underline">Читать →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-4 text-center"><h2 className="text-2xl lg:text-3xl font-bold mb-4">Подберём плитку для прихожей</h2><div className="flex flex-wrap items-center justify-center gap-3 mt-8"><a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90"><Phone className="h-4 w-4" /> Позвонить</a><Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10">Весь каталог <ChevronRight className="h-4 w-4" /></Link></div></div></section>
      {/* Полезные статьи */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как выбрать плитку</p>
                <p className="text-sm text-muted-foreground">Советы для прихожей и коридора.</p>
              </Link>
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Какой размер подойдёт для прихожей.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Пошаговая инструкция.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
