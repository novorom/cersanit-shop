import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Как ухаживать за керамогранитом: уборка и защита | Керамогранит Опт",
  description: "Как правильно мыть и ухаживать за керамогранитом Lincer. Какие средства подходят, чем нельзя чистить, как защитить швы от грязи. Советы от официального дилера.",
  alternates: { canonical: `${SITE_URL}/blog/kak-uhazhivat-za-keramogranitom` },
  openGraph: { title: "Уход за керамогранитом: как правильно мыть и чистить", url: `${SITE_URL}/blog/kak-uhazhivat-za-keramogranitom`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "article" },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Как ухаживать за керамогранитом: уборка и защита",
        description: "Правила ухода за керамогранитом — какие средства использовать, чего избегать.",
        publisher: { "@type": "Organization", name: "Керамогранит Опт", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/kak-uhazhivat-za-keramogranitom`,
        datePublished: "2025-03-10",
        author: { "@type": "Organization", name: "Керамогранит Опт" },
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Уход за керамогранитом</span>
          </nav>
        </div>
      </div>


                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/keramogranit-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит в СПб</Link>
              <Link href="/keramogranit-60x60-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит 60x60</Link>
              <Link href="/plitka-dlya-balkona-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для балкона</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">5 минут чтения · Практические советы</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Как ухаживать за керамогранитом</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Керамогранит неприхотлив, но есть нюансы. Рассказываем как он будет выглядеть как новый спустя 10 лет.</p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Ежедневный уход: всё просто</h2>
            <p className="leading-relaxed mb-3">Керамогранит — один из самых неприхотливых материалов для пола. Для повседневной уборки достаточно:</p>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• Подметать или пылесосить по мере загрязнения</li>
              <li>• Протирать влажной шваброй с любым нейтральным средством для пола</li>
              <li>• Для блеска полированного керамогранита — протереть сухой микрофиброй после мытья</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Сложные загрязнения: как убрать</h2>
            <div className="flex flex-col gap-4">
              {[
                { stain: "Известковый налёт (белые разводы)", solution: "Слабый раствор уксуса или специальный кислотный очиститель. Нанести на 5–10 минут, смыть. Не допускать засыхания." },
                { stain: "Жировые пятна на кухне", solution: "Щелочной обезжириватель или обычный моющий для посуды. Нанести, подождать 2–3 минуты, протереть жёсткой щёткой." },
                { stain: "Ржавчина от металлических предметов", solution: "Специальный преобразователь ржавчины или кислотный очиститель. Не тереть металлическими предметами — царапины." },
                { stain: "Краска, лак, клей", solution: "Пока свежее — ацетон или растворитель. Засохшее — механически (пластиковый скребок), затем растворитель." },
                { stain: "Чёрные полосы от подошвы обуви", solution: "Обычный универсальный очиститель или резинка для стирания (аккуратно). Не оставляйте надолго — въедается." },
              ].map(item => (
                <div key={item.stain} className="border border-border rounded-xl p-4">
                  <div className="font-semibold text-foreground text-sm mb-1">{item.stain}</div>
                  <div className="text-sm text-muted-foreground">{item.solution}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Чего нельзя делать</h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <ul className="flex flex-col gap-2 text-sm text-red-900">
                <li>• <strong>Металлические скребки и щётки</strong> — царапают даже твёрдый керамогранит</li>
                <li>• <strong>Концентрированная кислота</strong> (соляная, серная) — разъедает затирку швов</li>
                <li>• <strong>Хлорные отбеливатели на цветной плитке</strong> — обесцвечивают затирку</li>
                <li>• <strong>Абразивные порошки типа «Пемолюкс»</strong> — могут оцарапать поверхность</li>
                <li>• <strong>Пар под высоким давлением на холодную плитку</strong> — термический шок</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Защита швов — самое важное</h2>
            <p className="leading-relaxed mb-3">Сама плитка практически не впитывает грязь. Но затирочные швы — уязвимое место, особенно в светлом цвете.</p>
            <p className="leading-relaxed mb-3"><strong>Что делать:</strong></p>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• Через 2–3 недели после укладки нанесите пропитку-гидрофобизатор на швы</li>
              <li>• Повторяйте раз в 1–2 года в зонах высокой нагрузки (кухня, ванная)</li>
              <li>• В душевых зонах используйте эпоксидную затирку — она не впитывает влагу вообще</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Полированный керамогранит: особый уход</h2>
            <p className="leading-relaxed">Полированная поверхность требует чуть больше внимания — на ней видны следы воды и пыль. После мытья протирайте сухой микрофиброй. Один раз в несколько месяцев можно нанести полироль для керамики — восстанавливает блеск и защищает от пятен.</p>
          </section>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Нужна консультация по выбору плитки?</p>
            <p className="text-muted-foreground text-sm mb-4">Поможем подобрать коллекцию с оптимальными характеристиками для вашего помещения</p>
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Перейти в каталог →
            </Link>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/rekomendatsii-po-zatirke" className="text-primary hover:underline text-sm">→ Рекомендации по затирке швов</Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="text-primary hover:underline text-sm">→ Укладка плитки своими руками</Link>
              <Link href="/keramogranit-spb" className="text-primary hover:underline text-sm">→ Каталог керамогранита</Link>
            </div>
          </div>
        </div>
      
              {/* Товары по теме */}
              <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/5b6/C_NW4M012D_1a.jpg&w=300&output=webp&q=80" alt="Керамогранит Northwood бежевый 18x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood бежевый 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-wood-concept-natural-bezhevyy-22x90" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/4af/15971_1.jpg&w=300&output=webp&q=80" alt="Керамогранит Wood Concept Natural 22x90" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Wood Concept Natural 22x90</span><span className="mt-2 block text-base font-bold text-foreground">1610 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>              </article>
    </div>
  )
}
