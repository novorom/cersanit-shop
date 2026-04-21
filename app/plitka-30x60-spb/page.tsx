import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
const SITE_URL = "https://keramogranit-opt.ru"
const PHONE = "+7 (905) 205-09-00"
const PHONE_RAW = "+79052050900"
export const metadata: Metadata = {
  title: "Плитка 30x60 Lincer купить в Санкт-Петербурге | Керамогранит Опт",
  description: "Керамическая плитка и керамогранит 30x60 см Lincer в СПб. Самый популярный формат — подходит для любых помещений. Склад Янино, доставка от 1 дня.",
  alternates: { canonical: `${SITE_URL}/plitka-30x60-spb` },
  openGraph: { title: "Плитка 30x60 Lincer в СПб", url: `${SITE_URL}/plitka-30x60-spb`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "website" },
}
const faq = [{"q": "Почему формат 30x60 такой популярный?", "a": "30x60 — универсальный формат, идеально подходящий для ванных комнат, кухонь и прихожих. Удобен в укладке, хорошо смотрится и на полу, и на стенах, оптимален для помещений от 4 до 20 м². Именно поэтому большинство коллекций Lincer выпускается в этом формате."}, {"q": "Как укладывать плитку 30x60 — вертикально или горизонтально?", "a": "Горизонтальная укладка визуально расширяет комнату, вертикальная — поднимает потолок. В стандартной ванной (высота 2,5 м) чаще укладывают горизонтально. Укладка по диагонали или кирпичиком (смещение 50%) добавляет динамики."}, {"q": "Подходит ли 30x60 для малогабаритной ванной?", "a": "Да, это один из лучших форматов для ванной до 6 м². Не слишком крупный (легко кроится), но достаточно большой, чтобы не перегрузить маленькое пространство мелкими швами. В светлых тонах визуально увеличивает помещение."}, {"q": "Как быстро доставите в СПб?", "a": "Доставка по СПб и ЛО — 1-2 рабочих дня. Самовывоз из Янино бесплатный. Пн-Пт 10:00-16:45."}]
const BLOG_ARTICLES_PLITKA_30X60_SPB = [
            { href: "/blog/formaty-plitki", title: "Форматы плитки: когда выбирать 30x60", desc: "Универсальный формат для стен и пола." },
            { href: "/blog/kak-ukladyvat-plitku", title: "Способы укладки плитки 30x60", desc: "Прямая, со смещением, ёлочка — плюсы каждого способа." },
          ]
export default function FormatPage() {
  const items = products.filter(p => p.slug && (p.format === "30x60" || p.format_collection === "30x60")).sort((a,b) => b.price_retail - a.price_retail)
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Где купить плитку 30x60 в СПб?","acceptedAnswer":{"@type":"Answer","text":"Плитка 30x60 Lincer в наличии на складе в Янино. Самовывоз бесплатно, доставка по Санкт-Петербургу от 1 рабочего дня. Звоните: +7 (905) 205-09-00."}},{"@type":"Question","name":"Куда лучше класть плитку 30x60?","acceptedAnswer":{"@type":"Answer","text":"Формат 30x60 универсален: подходит для стен ванной и кухни, коридоров, жилых помещений. Для пола выбирайте плитку с маркировкой PEI 3 и выше."}},{"@type":"Question","name":"Сколько плитки 30x60 нужно на комнату?","acceptedAnswer":{"@type":"Answer","text":"Разделите площадь на 0.18 и добавьте 10% запаса на порезку. Наши менеджеры сделают расчёт бесплатно по вашим размерам."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":"https://keramogranit-opt.ru"},{"@type":"ListItem","position":2,"name":"Плитка 30x60","item":"https://keramogranit-opt.ru/plitka-30x60-spb"}]}` }} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Плитка 30x60</span></nav></div></div>
      <section className="bg-primary text-primary-foreground py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">Плитка 30x60 ведущих брендов в Санкт-Петербурге</h1><p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed max-w-3xl">{items.length} позиций в наличии на складе в Янино. Доставка по СПб от 1 дня.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors">Смотреть товары <ChevronRight className="h-4 w-4" /></Link><a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors"><Phone className="h-4 w-4" /> {PHONE}</a></div></div></section>
      <section id="products" className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold mb-2">Плитка 30x60 — {items.length} позиций</h2><p className="text-muted-foreground mb-8">Все товары в наличии на складе Янино</p><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">{items.map((p,i) => <ProductCard key={p.id} product={p} priority={i<4} />)}</div></div></section>
      <section className="py-12 lg:py-16 bg-muted/30"><div className="mx-auto max-w-4xl px-4 flex flex-col gap-8">
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Формат 30x60 — самый популярный в России</h2><p className="text-foreground/80 leading-relaxed">По объёму продаж 30x60 см занимает первое место среди всех форматов плитки. Причин несколько: удобен при транспортировке и укладке, подходит для стен и пола, выглядит современно. Именно поэтому Lincer предлагает в этом формате максимальное количество коллекций.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Что есть в формате 30x60?</h2><p className="text-foreground/80 leading-relaxed">Lofthouse, Soft Concrete, Woodhouse, Wood Concept, Calacatta, Slate и десятки других коллекций — все доступны в 30x60 см. Для ванной, кухни, прихожей, гостиной. Матовые, полированные, сатиновые, рельефные поверхности.</p></div>
        <div><h2 className="text-xl lg:text-2xl font-bold mb-4">Купить в Санкт-Петербурге</h2><p className="text-foreground/80 leading-relaxed">Склад в Янино-1 (15-20 мин от КАД). Самовывоз бесплатный. Доставка по СПб и ЛО 1-2 рабочих дня. Бесплатный расчёт количества.</p></div>
      </div></section>
      <section className="py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4"><h2 className="text-2xl lg:text-3xl font-bold mb-8">Частые вопросы</h2><div className="max-w-3xl flex flex-col gap-4">{faq.map((item,i) => (<details key={i} className="group rounded-xl border border-border bg-card overflow-hidden"><summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium hover:bg-muted/50"><span className="pr-4">{item.q}</span><ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" /></summary><div className="px-6 pb-4"><p className="text-foreground/80 leading-relaxed">{item.a}</p></div></details>))}</div></div></section>
            <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Полезные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_ARTICLES_PLITKA_30X60_SPB.map((a) => (
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
                <p className="text-sm text-muted-foreground">Формат 30x60: где использовать.</p>
              </Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Как укладывать плитку</p>
                <p className="text-sm text-muted-foreground">Укладка формата 30x60.</p>
              </Link>
              <Link href="/blog/rekomendatsii-po-zatirke" className="block p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">Рекомендации по затирке</p>
                <p className="text-sm text-muted-foreground">Затирка для формата 30x60.</p>
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
            <h3 className="font-semibold text-foreground mb-2">Где купить плитку 30x60 в СПб?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Плитка 30x60 Lincer в наличии на складе в Янино. Самовывоз бесплатно, доставка по Санкт-Петербургу от 1 рабочего дня. Звоните: +7 (905) 205-09-00.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-2">Куда лучше класть плитку 30x60?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Формат 30x60 универсален: подходит для стен ванной и кухни, коридоров, жилых помещений. При укладке на пол убедитесь, что плитка предназначена для напольного применения (PEI 3 и выше).</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-2">Сколько плитки 30x60 нужно на комнату?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Разделите площадь помещения на 0.18 (площадь одной плитки) и добавьте 10% запаса на порезку и бой. Наши менеджеры сделают расчёт бесплатно по замерам.</p>
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}
