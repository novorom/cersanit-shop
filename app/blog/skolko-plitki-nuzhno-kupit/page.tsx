import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Как рассчитать количество плитки — калькулятор и формулы | Керамогранит Опт",
  description: "Как посчитать сколько плитки нужно для ванной, кухни, пола. Формула расчёта, запас на подрезку, учёт декоров и бордюров. Бесплатный расчёт от специалиста.",
  alternates: { canonical: `${SITE_URL}/blog/skolko-plitki-nuzhno-kupit` },
  openGraph: { title: "Как рассчитать количество плитки", url: `${SITE_URL}/blog/skolko-plitki-nuzhno-kupit`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "article" },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Как рассчитать количество плитки — калькулятор и формулы",
        description: "Расчёт плитки для ванной, кухни и пола. Формулы, запас, советы.",
        publisher: { "@type": "Organization", name: "Керамогранит Опт", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/skolko-plitki-nuzhno-kupit`,
        datePublished: "2025-02-10",
        author: { "@type": "Organization", name: "Керамогранит Опт" },
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Расчёт количества плитки</span>
          </nav>
        </div>
      </div>


                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной</Link>
              <Link href="/keramogranit-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит в СПб</Link>
              <Link href="/plitka-dlya-kuhni-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для кухни</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">8 минут чтения · Практический гид</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Как рассчитать количество плитки</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Пошаговая инструкция с формулами. Поможет не купить лишнего и не остаться без плитки на финишной прямой.</p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="font-semibold text-foreground mb-1">🧮 Базовая формула</p>
            <p className="text-sm">Площадь помещения ÷ площадь одной плитки × коэффициент запаса = количество плиток</p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 1. Замерьте площадь</h2>
            <p className="leading-relaxed mb-3">Для <strong>пола</strong>: длина × ширина комнаты. Например, 2,5 × 1,8 м = 4,5 м². Из общей площади вычтите площадь ванны, душевой кабины, унитаза — они не требуют плитки под собой.</p>
            <p className="leading-relaxed mb-3">Для <strong>стен</strong>: (периметр × высота) − площадь дверей и окон. Например: (2,5+1,8+2,5+1,8) × 2,6 − (0,9×2,1) = 22,36 − 1,89 = 20,5 м².</p>
            <p className="leading-relaxed">Если плиткой облицовывается только часть стен (до уровня потолка не по всей высоте) — считайте именно ту часть, которую нужно облицевать.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 2. Переведите м² в штуки</h2>
            <p className="leading-relaxed mb-3">Площадь одной плитки = длина × ширина (в метрах). Например, плитка 30×60 см = 0,30 × 0,60 = 0,18 м².</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border border-border font-medium">Формат</th>
                    <th className="text-left p-3 border border-border font-medium">Площадь 1 шт, м²</th>
                    <th className="text-left p-3 border border-border font-medium">Штук на 10 м²</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["30×30 см", "0,09", "111"],
                    ["30×60 см", "0,18", "56"],
                    ["42×42 см", "0,176", "57"],
                    ["60×60 см", "0,36", "28"],
                    ["60×120 см", "0,72", "14"],
                    ["45×90 см", "0,405", "25"],
                  ].map(([f, s, n]) => (
                    <tr key={f} className="hover:bg-muted/50">
                      <td className="p-3 border border-border">{f}</td>
                      <td className="p-3 border border-border">{s}</td>
                      <td className="p-3 border border-border">{n} шт</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 3. Прибавьте запас</h2>
            <p className="leading-relaxed mb-3">Запас нужен всегда — на подрезку, бой при транспортировке и укладке, а также на будущий ремонт.</p>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• <strong>+10%</strong> — стандартная укладка прямо или в шахматку</li>
              <li>• <strong>+15%</strong> — укладка со смещением (кирпичная кладка)</li>
              <li>• <strong>+20%</strong> — укладка диагональю или ёлочкой</li>
              <li>• <strong>+15%</strong> — помещения с большим количеством выступов, ниш, труб</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Пример расчёта для ванной</h2>
            <div className="bg-muted/50 rounded-xl p-5">
              <p className="font-medium text-foreground mb-3">Ванная 2,5 × 1,8 м, высота 2,6 м. Плитка Lofthouse 29,7×59,8 см для стен.</p>
              <ol className="flex flex-col gap-2 text-sm">
                <li>1. Площадь стен: (2,5+1,8)×2 × 2,6 − дверь (0,9×2,1) = 22,4 − 1,9 = 20,5 м²</li>
                <li>2. Площадь пола: 2,5 × 1,8 − ванна (1,7×0,75) = 4,5 − 1,3 = 3,2 м²</li>
                <li>3. Итого: 20,5 + 3,2 = 23,7 м²</li>
                <li>4. С запасом 10%: 23,7 × 1,1 = <strong>26,1 м²</strong> — берите 27 м²</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Частые ошибки при расчёте</h2>
            <ul className="flex flex-col gap-3 ml-4">
              <li>• <strong>Не учли запас</strong> — самая частая ошибка. Потом невозможно докупить ту же партию.</li>
              <li>• <strong>Не вычли проёмы</strong> — переплата за лишнюю плитку.</li>
              <li>• <strong>Не учли швы</strong> — при расчёте учитывается плитка без швов, но в реальности они есть. Разница небольшая, но при крупных объёмах — значимая.</li>
              <li>• <strong>Разные партии</strong> — если берёте в разных местах или доезжаете, убедитесь что номер партии совпадает. Разные партии могут отличаться по тону.</li>
            </ul>
          </section>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Сделаем расчёт за вас — бесплатно</p>
            <p className="text-muted-foreground text-sm mb-4">Скажите размеры комнаты и какую плитку выбрали — посчитаем точное количество</p>
            <a href="tel:+79052050900" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              +7 (905) 205-09-00
            </a>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/kak-vybrat-plitku-dlya-vannoj" className="text-primary hover:underline text-sm">→ Как выбрать плитку для ванной</Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="text-primary hover:underline text-sm">→ Укладка плитки своими руками</Link>
              <Link href="/catalog" className="text-primary hover:underline text-sm">→ Каталог плитки</Link>
            </div>
          </div>
        </div>
      
              {/* Товары по теме */}
              <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/plitka-calacatta-belyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/77c/KTL051st.jpg&w=300&output=webp&q=80" alt="Плитка Calacatta белый 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Calacatta белый 30x60</span><span className="mt-2 block text-base font-bold text-foreground">780 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/5b6/C_NW4M012D_1a.jpg&w=300&output=webp&q=80" alt="Керамогранит Northwood 18x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                  <Link href="/catalog/plitka-deco-chernyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/b22/DEL232.jpg&w=300&output=webp&q=80" alt="Плитка Deco черный 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Deco черный 30x60</span><span className="mt-2 block text-base font-bold text-foreground">750 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>              </article>
    </div>
  )
}
