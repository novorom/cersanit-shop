import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
const SITE_URL = "https://lincer.ru"
export const metadata: Metadata = {
  title: "Как резать керамогранит: инструменты и правила | LINCER СПб",
  description: "Как правильно резать керамогранит: какой инструмент выбрать, как сделать прямой и фигурный рез, как избежать сколов. Советы от официального дилера Lincer.",
  alternates: { canonical: `${SITE_URL}/blog/kak-rezat-keramogranit` },
  openGraph: { title: "Как резать керамогранит: инструменты и советы", url: `${SITE_URL}/blog/kak-rezat-keramogranit`, siteName: "LINCER", locale: "ru_RU", type: "article" },
}
export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Как резать керамогранит: инструменты и правила",
        description: "Руководство по резке керамогранита: выбор инструмента, прямой и фигурный рез, советы.",
        publisher: { "@type": "Organization", name: "LINCER", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/kak-rezat-keramogranit`,
        datePublished: "2025-03-12",
        author: { "@type": "Organization", name: "LINCER" },
      })}} />
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Как резать керамогранит</span>
          </nav>
        </div>
      </div>

                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/keramogranit-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит в СПб</Link>
              <Link href="/keramogranit-60x120-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит 60x120</Link>
              <Link href="/keramogranit-matovyy-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Матовый керамогранит</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">8 минут чтения · Практическое руководство</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Как резать керамогранит</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Керамогранит значительно тверже обычной плитки. Рассказываем, какой инструмент нужен, как избежать сколов и что делать с фигурными вырезами.</p>
        </header>
        <div className="flex flex-col gap-8 text-foreground/80">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-amber-900 font-medium text-sm">⚠️ Важно: обычный ручной плиткорез для керамогранита не подходит — он создан для керамической плитки. Для керамогранита нужен электроинструмент с алмазным диском.</p>
          </div>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Инструменты для резки керамогранита</h2>
            <div className="flex flex-col gap-4">
              {[
                { tool: "Электрический плиткорез (мокрый)", desc: "Лучший выбор для прямых резов. Алмазный диск охлаждается водой — нет пыли, нет сколов, точный рез. Стоит 3 000–15 000 ₽ для аренды или покупки. Подходит для любой толщины и формата.", icon: "✅" },
                { tool: "Болгарка с алмазным диском", desc: "Универсальный вариант. Подходит для прямых и фигурных резов, выпилов под розетки и трубы. Важно: используйте диск именно для керамогранита (не для камня или металла). Обязательно используйте защитные очки.", icon: "✅" },
                { tool: "Лобзик с алмазной пилкой", desc: "Для сложных фигурных вырезов — круглых, криволинейных. Медленно, но точно. Режет без сколов при движении вперёд — назад пилкой не тянуть.", icon: "⚠️" },
                { tool: "Ручной плиткорез (механический)", desc: "Только для тонкой керамической плитки, не для керамогранита. Для керамогранита ролик не даёт достаточной глубины надреза — плитка колется неровно.", icon: "❌" },
              ].map(item => (
                <div key={item.tool} className="border border-border rounded-xl p-4 flex gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{item.tool}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Прямой рез: пошаговая инструкция</h2>
            <ol className="flex flex-col gap-3 ml-4">
              <li><strong>1. Разметьте линию</strong> — карандашом или маркером с линейкой. Для электрического плиткореза — используйте упор.</li>
              <li><strong>2. Наденьте защиту</strong> — очки и перчатки обязательно. При работе болгаркой — ещё и маска от пыли.</li>
              <li><strong>3. Режьте медленно и равномерно</strong> — не давите на плитку, дайте диску работать. Быстрый рез — больше сколов.</li>
              <li><strong>4. Охлаждайте диск</strong> — при работе болгаркой периодически погружайте диск в воду или смачивайте плитку. Перегрев диска ухудшает рез.</li>
              <li><strong>5. Обработайте край</strong> — шлифовальным камнем или абразивом уберите острые заусенцы после реза.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Фигурные вырезы: отверстия и скругления</h2>
            <p className="leading-relaxed mb-3"><strong>Круглое отверстие</strong> (под трубу, розетку) — дрель с алмазной коронкой нужного диаметра. Работайте на малых оборотах с водяным охлаждением. Начинайте с лёгкого надавливания под углом, потом выровняйте дрель вертикально.</p>
            <p className="leading-relaxed mb-3"><strong>Прямоугольный вырез</strong> (под подрозетник) — сделайте 4 пропила болгаркой, не доводя до углов на 5–10 мм, потом выбейте центральную часть и допилите углы.</p>
            <p className="leading-relaxed"><strong>Сложная фигура</strong> — насверлите несколько отверстий по контуру коронкой, потом соедините пропилами болгаркой или лобзиком.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Как избежать сколов</h2>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• Режьте лицевой стороной вверх — сколы образуются снизу при выходе диска</li>
              <li>• Приклейте малярную ленту по линии реза — снижает вибрацию и защищает поверхность</li>
              <li>• Не торопитесь на финальных миллиметрах — именно здесь чаще всего скол</li>
              <li>• Для ректификата — используйте только электрический плиткорез, никакой болгарки</li>
              <li>• Полированный керамогранит режьте только влажным способом</li>
            </ul>
          </section>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Скачайте инструкцию по укладке Lincer</p>
            <p className="text-muted-foreground text-sm mb-4">Официальные документы, сертификаты и программа 3D-визуализации</p>
            <Link href="/downloads" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Перейти в раздел загрузок →
            </Link>
          </div>
          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/kak-ukladyvat-plitku" className="text-primary hover:underline text-sm">→ Укладка плитки своими руками</Link>
              <Link href="/blog/formaty-plitki" className="text-primary hover:underline text-sm">→ Форматы плитки: какой размер выбрать</Link>
              <Link href="/keramogranit-spb" className="text-primary hover:underline text-sm">→ Каталог керамогранита</Link>
            </div>
          </div>
          <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/5b6/C_NW4M012D_1a.jpg&w=300&output=webp&q=80" alt="Керамогранит Northwood бежевый 18x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood бежевый 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-wood-concept-natural-bezhevyy-22x90" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/4af/15971_1.jpg&w=300&output=webp&q=80" alt="Керамогранит Wood Concept Natural 22x90" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Wood Concept Natural 22x90</span><span className="mt-2 block text-base font-bold text-foreground">1610 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/068/gcqu8u24rft50mgxzpbijnh33k074vg0/A17122_01.jpg&w=300&output=webp&q=80" alt="Керамогранит Soft Concrete 60x120" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Soft Concrete 60x120</span><span className="mt-2 block text-base font-bold text-foreground">2213 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>        </div>
      </article>
    </div>
  )
}
