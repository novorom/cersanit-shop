import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
const SITE_URL = "https://keramogranit-opt.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"
export const metadata: Metadata = {
  title: "Керамогранит 60x120 Lincer купить в Санкт-Петербурге | Керамогранит Опт",
  description: "Крупноформатный керамогранит 60x120 см Lincer в СПб. Минимум швов, эффект монолитного покрытия. Склад Янино, доставка от 1 дня.",
  alternates: { canonical: `${SITE_URL}/keramogranit-60x120-spb` },
  openGraph: { title: "Керамогранит 60x120 Lincer в СПб", url: `${SITE_URL}/keramogranit-60x120-spb`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "website" },
}
const faq = [{"q": "Что такое крупный формат плитки и в чём его преимущества?", "a": "Крупный формат 60x120 см создаёт эффект монолитного покрытия с минимальным количеством швов. Это делает помещение визуально просторнее, а уборка становится проще — меньше швов, меньше точек накопления грязи. Особенно эффектно смотрится в гостиных и холлах от 15 м²."}, {"q": "Сложно ли укладывать плитку 60x120 самостоятельно?", "a": "Крупный формат требует идеально ровного основания (перепад не более 2-3 мм на 2 м) и опыта укладки. Рекомендуется профессиональная укладка. Клей наносится и на плитку, и на основание (double buttering). Используйте систему выравнивания плитки (СВП)."}, {"q": "Какой клей нужен для плитки 60x120?", "a": "Для крупного формата нужен эластичный клей (С2 или S1/S2 по EN 12004). Он компенсирует небольшие деформации основания и предотвращает отслоение тяжёлой плитки. Нанесение — гребенчатым шпателем 10-12 мм."}, {"q": "Как быстро доставите в СПб?", "a": "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный. Пн-Пт 10:00-16:45."}]
const BLOG_ARTICLES_KERAMOGRANIT_60X120_SPB = [
            { href: "/blog/formaty-plitki", title: "Форматы плитки: зачем нужен 60x120", desc: "Большой формат визуально расширяет пространство — когда это работает." },
            { href: "/blog/kak-ukladyvat-plitku", title: "Как укладывать плитку 60x120", desc: "Клей, уровень, СВП — всё об укладке крупного формата." },
          ]
export default function FormatPage() {
  const items = products.filter(p => p.slug && (p.format === "60x120" || p.format_collection === "60x120")).sort((a,b) => b.price_retail - a.price_retail)
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Где купить керамогранит 60x120 в СПб?","acceptedAnswer":{"@type":"Answer","text":"Керамогранит 60x120 Lincer есть в наличии на складе в Янино. Самовывоз бесплатно, доставка по СПб от 1 дня. Звоните: +7 (905) 205-09-00."}},{"@type":"Question","name":"Подходит ли формат 60x120 для пола?","acceptedAnswer":{"@type":"Answer","text":"Да, крупный формат 60x120 отлично подходит для пола — меньше швов и визуально расширяет пространство. Минимальная толщина основания — 5 см бетонной стяжки."}},{"@type":"Question","name":"Нужно ли резать плитку 60x120?","acceptedAnswer":{"@type":"Answer","text":"Как правило, да. Для этого формата нужен профессиональный плиткорез или болгарка с алмазным диском. Наши менеджеры рассчитают нужный запас бесплатно."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://keramogranit-opt.ru"},{"@type":"ListItem","position":2,"name":"Керамогранит 60x120","item":"https://keramogranit-opt.ru/keramogranit-60x120-spb"}]}` }} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Керамогранит 60x120</span></nav></div></div>
      <section className="bg-primary text-primary-foreground py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Керамогранит 60x120 ведущих брендов в Санкт-Петербурге</h1><p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">{items.length} позиций в наличии на складе в Янино. Доставка по СПб от 1 дня.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors">Смотреть товары <ChevronRight className="h-4 w-4" /></Link><a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors"><Phone className="h-4 w-4" /> {PHONE}</a></div></div></section>
      <section id="products" className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold mb-2">Керамогранит 60x120 — {items.length} позиций</h2><p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">{items.map((p,i) => <ProductCard key={p.id} product={p} priority={i<4} />)}</div></div></section>
      <section className="py-12 lg:py-16 bg-muted/30"><div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Что такое крупный формат и зачем он нужен?</h2><p className="text-foreground/80 leading-relaxed">Плитка 60x120 см — флагманский формат современного интерьера. Большие листы создают ощущение монолитного покрытия с минимальным количеством швов. Особенно впечатляет в больших гостиных, холлах и open-space кухнях. Все коллекции Lincer в формате 60x120 обладают эффектом Full HD — текстура раскрывается на большой площади.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Коллекции Lincer в формате 60x120</h2><p className="text-foreground/80 leading-relaxed">В этом формате представлены: <strong>Concretehouse</strong> (серый бетон, матовый), <strong>Royal Stone</strong> (натуральный камень), <strong>Calacatta</strong> (итальянский мрамор), <strong>Wood Concept Natural</strong> (дерево с ректификатом). Все с ровными прямыми краями — минимальный шов от 1,5 мм.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Купить в Санкт-Петербурге</h2><p className="text-foreground/80 leading-relaxed">Склад в Янино-1 (15-20 мин от КАД). Самовывоз бесплатный. Доставка по СПб и ЛО 1-2 рабочих дня. Бесплатный расчёт количества.</p></div>
      </div></section>
      <section className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold mb-8">Частые вопросы</h2><div className="max-w-3xl flex flex-col gap-4">{faq.map((item,i) => (<details key={i} className="group rounded-xl border border-border bg-card overflow-hidden"><summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium hover:bg-muted/50"><span className="pr-4">{item.q}</span><ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" /></summary><div className="px-6 pb-4"><p className="text-foreground/80 leading-relaxed">{item.a}</p></div></details>))}</div></div></section>
            <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_ARTICLES_KERAMOGRANIT_60X120_SPB.map((a) => (
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
              <Link href="/blog/formaty-plitki" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Форматы плитки</p>
                <p className="text-sm text-muted-foreground">Крупноформатная плитка 60x120.</p>
              </Link>
              <Link href="/blog/kak-rezat-keramogranit" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как резать керамогранит</p>
                <p className="text-sm text-muted-foreground">Резка плитки 60x120.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Укладка крупного формата.</p>
              </Link>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Часто задаваемые вопросы</h2>
          <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-2">Где купить керамогранит 60x120 в СПб?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Керамогранит 60x120 Lincer есть в наличии на складе в Янино. Самовывоз бесплатно, доставка по СПб от 1 дня. Звоните: +7 (905) 205-09-00.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-2">Подходит ли формат 60x120 для пола?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Да, крупный формат 60x120 отлично подходит для пола — визуально увеличивает пространство и имеет меньше швов. Минимальная толщина основания для укладки — 5 см бетонной стяжки.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-2">Нужно ли резать плитку 60x120?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Как правило, да — без резки не обходится. Для этого формата нужен профессиональный плиткорез или болгарка с алмазным диском. Наши менеджеры помогут рассчитать процент боя и рекомендуемый запас.</p>
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}
