import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://keramogranit-opt.ru"

export const metadata: Metadata = {
  title: "Керамогранит под дерево или ламинат — что лучше для пола? | Керамогранит Опт",
  description: "Сравниваем керамогранит под дерево и ламинат: срок службы, влагостойкость, цена, уход. Что выбрать для ванной, кухни, гостиной в 2025 году.",
  alternates: { canonical: `${SITE_URL}/blog/keramogranit-ili-laminat` },
  openGraph: { title: "Керамогранит под дерево или ламинат — что лучше?", url: `${SITE_URL}/blog/keramogranit-ili-laminat`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "article" },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Керамогранит под дерево или ламинат — что лучше для пола?",
        description: "Детальное сравнение керамогранита и ламината по 8 параметрам.",
        publisher: { "@type": "Organization", name: "Керамогранит Опт", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/keramogranit-ili-laminat`,
        datePublished: "2025-02-20",
        author: { "@type": "Organization", name: "Керамогранит Опт" },
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Керамогранит или ламинат</span>
          </nav>
        </div>
      </div>


                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/keramogranit-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит в СПб</Link>
              <Link href="/plitka-pod-derevo-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка под дерево</Link>
              <Link href="/keramogranit-pod-derevo-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит под дерево</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">7 минут чтения · Сравнение материалов</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Керамогранит под дерево или ламинат: что выбрать?</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Честное сравнение двух популярных напольных покрытий по цене, сроку службы, уходу и применению.</p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Быстрое сравнение</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border border-border font-medium">Параметр</th>
                    <th className="text-left p-3 border border-border font-medium text-primary">Керамогранит</th>
                    <th className="text-left p-3 border border-border font-medium">Ламинат</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Срок службы", "30–50 лет", "7–15 лет"],
                    ["Влагостойкость", "Полная — не боится воды", "Средняя — разбухает"],
                    ["Уход", "Простой — любые средства", "Нельзя лить воду"],
                    ["Цена материала", "От 850 ₽/м²", "От 600 ₽/м²"],
                    ["Укладка", "Требует плиточника", "Можно самому"],
                    ["Тёплый пол", "Идеально совместим", "Ограниченно"],
                    ["Ремонт", "Трудно заменить 1 плитку", "Легко заменить доску"],
                    ["Балкон/улица", "Подходит (морозостойкий)", "Не подходит"],
                  ].map(([p, k, l]) => (
                    <tr key={p} className="hover:bg-muted/50">
                      <td className="p-3 border border-border font-medium text-foreground">{p}</td>
                      <td className="p-3 border border-border text-primary">{k}</td>
                      <td className="p-3 border border-border">{l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Где керамогранит выигрывает однозначно</h2>
            <ul className="flex flex-col gap-3 ml-4">
              <li>• <strong>Ванная и санузел</strong> — ламинат здесь нельзя категорически. Постоянная влага разрушает его за 2–3 года.</li>
              <li>• <strong>Кухня</strong> — разлитая вода, жирные брызги, частая уборка с водой. Керамогранит переносит это без следов.</li>
              <li>• <strong>Прихожая</strong> — грязь с улицы, снег, лужи от обуви. Керамогранит легко моется, не деформируется.</li>
              <li>• <strong>Балкон и лоджия</strong> — только керамогранит. Ламинат разрушится от первых же перепадов температуры.</li>
              <li>• <strong>Тёплый пол</strong> — керамогранит идеально передаёт тепло. Ламинат — только специальные серии, и греть можно до 27°C.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Где ламинат имеет преимущества</h2>
            <ul className="flex flex-col gap-3 ml-4">
              <li>• <strong>Спальня</strong> — ламинат теплее под ногами, тише при ходьбе, проще уложить самостоятельно.</li>
              <li>• <strong>Небольшой бюджет и срочный ремонт</strong> — ламинат дешевле по укладке, можно обойтись без плиточника.</li>
              <li>• <strong>Аренда и временное жильё</strong> — короткий горизонт использования, нет смысла переплачивать.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Экономика: что дешевле за 20 лет?</h2>
            <p className="leading-relaxed mb-3">Ламинат стоит дешевле при покупке, но за 20 лет его придётся заменить 1–2 раза. Керамогранит вы укладываете один раз и забываете.</p>
            <div className="bg-muted/50 rounded-xl p-5">
              <p className="font-medium text-foreground mb-3">Пример для 50 м² за 20 лет:</p>
              <ul className="flex flex-col gap-2 text-sm">
                <li>• Ламинат: 600 ₽/м² × 50 м² × 2 замены + укладка = ~130 000 ₽</li>
                <li>• Керамогранит: 1 200 ₽/м² × 50 м² + укладка = ~90 000 ₽</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">Керамогранит выгоднее уже в 10-летней перспективе.</p>
            </div>
          </section>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Подберём керамогранит под дерево под ваш бюджет</p>
            <p className="text-muted-foreground text-sm mb-4">48 позиций в наличии — от 1098 до 1610 ₽/м²</p>
            <Link href="/keramogranit-pod-derevo-spb" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Смотреть каталог →
            </Link>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной</Link>
              <Link href="/keramogranit-pod-derevo-spb" className="text-primary hover:underline text-sm">→ Керамогранит под дерево — каталог</Link>
              <Link href="/plitka-pod-derevo-spb" className="text-primary hover:underline text-sm">→ Плитка под дерево в СПб</Link>
            </div>
          </div>
        </div>
      
              {/* Товары по теме */}
              <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/keramogranit-wood-concept-natural-bezhevyy-22x90" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.keramogranit-opt.ru/upload/uf/4af/15971_1.jpg&w=300&output=webp&q=80" alt="Керамогранит Wood Concept Natural 22x90" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Wood Concept Natural 22x90</span><span className="mt-2 block text-base font-bold text-foreground">1610 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.keramogranit-opt.ru/upload/uf/5b6/C_NW4M012D_1a.jpg&w=300&output=webp&q=80" alt="Керамогранит Northwood бежевый 18x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood бежевый 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.keramogranit-opt.ru/upload/uf/068/gcqu8u24rft50mgxzpbijnh33k074vg0/A17122_01.jpg&w=300&output=webp&q=80" alt="Керамогранит Soft Concrete 60x120" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Soft Concrete 60x120</span><span className="mt-2 block text-base font-bold text-foreground">2213 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>              </article>
    </div>
  )
}
