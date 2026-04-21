import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
const SITE_URL = "https://keramogranit-opt.ru"
export const metadata: Metadata = {
  title: "Как укладывать керамическую мозаику — инструкция Lincer | Керамогранит Опт",
  description: "Инструкция по укладке мозаики Lincer на сетке. Подготовка поверхности, нанесение клея, затирка швов, важные советы для качественного результата.",
  alternates: { canonical: `${SITE_URL}/blog/kak-ukladyvat-mozaiku` },
  openGraph: { title: "Как укладывать керамическую мозаику", url: `${SITE_URL}/blog/kak-ukladyvat-mozaiku`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "article" },
}
export default function HowToLayMosaic() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Как укладывать керамическую мозаику — инструкция Lincer",
        publisher: { "@type": "Organization", name: "Керамогранит Опт", url: "https://keramogranit-opt.ru" },
        mainEntityOfPage: `${SITE_URL}/blog/kak-ukladyvat-mozaiku`,
        datePublished: "2025-01-25",
        author: { "@type": "Organization", name: "Керамогранит Опт" },
      }) }} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/blog" className="hover:text-primary transition-colors">Блог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Укладка мозаики</span></nav></div></div>

                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/mozaika-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Мозаика в СПб</Link>
              <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной</Link>
              <Link href="/plitka-dlya-dushi-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для душа</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">4 минуты чтения · Официальная инструкция Lincer</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Как укладывать керамическую мозаику</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Инструкция по укладке мозаики из керамической плитки и керамического гранита Lincer. Мозаика укладывается на сетке листами 30x30 см — это упрощает работу и обеспечивает равномерный рисунок.</p>
        </header>
        <div className="flex flex-col gap-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 1. Подготовка поверхности</h2>
            <div className="flex flex-col gap-3">
              <p>Поверхность под мозаику должна быть <strong>выровненной, очищенной и отшлифованной</strong>. Перепад не более 2 мм на 2 м.</p>
              <p><strong>Температура:</strong> укладывайте мозаику при температуре в помещении от +5°C до +25°C. При более высокой температуре клей быстро высыхает, не давая выровнять листы.</p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 2. Приготовление клея</h2>
            <div className="flex flex-col gap-3">
              <p>Разведите клеевой раствор строго по инструкции производителя клея.</p>
              <ul className="flex flex-col gap-2 ml-4">
                <li>• Клей должен быть <strong>средней консистенции</strong>: слишком густой быстро сохнет, слишком жидкий — течёт.</li>
                <li>• Для мозаики из керамики или керамогранита используйте стандартный плиточный клей класса C1 или C2.</li>
                <li>• Слой клея — не более <strong>3 мм</strong>, чтобы излишки не осложняли затирку.</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 3. Нанесение клея и укладка</h2>
            <div className="flex flex-col gap-3">
              <p>Плоским краем шпателя равномерно нанесите клей на стену. <strong>Площадь нанесения — не более 9 листов мозаики за один раз</strong> (примерно 0,8 м²). Это не даст клею высохнуть раньше времени.</p>
              <p>Зубчатой стороной шпателя (зубцы не менее 3,5 мм) разровняйте раствор и уберите излишки.</p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-900 text-sm font-medium">⚠️ Важно: Не прижимайте листы мозаики к стене руками — это создаёт неровности. Используйте резиновую тёрку или плоскую доску с лёгким давлением по всей поверхности листа.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 4. Затирка (через 24 часа)</h2>
            <p>После полного высыхания клея (не ранее чем через <strong>24 часа</strong>) приступайте к затирке. Для мозаики используйте затирку с мелким зерном, рекомендованную производителем для узких швов. Наносите резиновой тёркой диагональными движениями, затем удалите излишки влажной губкой.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Ключевые рекомендации</h2>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• Не прижимайте листы руками — используйте правило или плоскую доску</li>
              <li>• Обрабатывайте не более 9 листов за раз, чтобы клей не засох</li>
              <li>• Консистенция клея — средняя: густой быстро сохнет, жидкий течёт</li>
              <li>• Укладывайте при температуре не выше +25°C</li>
              <li>• Слой клея — не более 3 мм</li>
            </ul>
          </section>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-green-900 font-bold mb-2">Есть вопросы по мозаике?</h3>
            <p className="text-green-800 text-sm">Бесплатная консультация: <a href="tel:+79052050900" className="font-bold underline">+7 (905) 205-09-00</a>. Мозаика Lincer в наличии на складе в Янино.</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-bold text-foreground mb-4">Читайте также</h3>
          <div className="flex flex-col gap-3">
            <Link href="/blog/kak-ukladyvat-plitku" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Как укладывать плитку своими руками</Link>
            <Link href="/blog/rekomendatsii-po-zatirke" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Рекомендации по затирке швов</Link>
            <Link href="/mozaika-spb" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Купить мозаику Lincer в СПб</Link>
          </div>
        </div>
      
              {/* Товары по теме */}
              <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/mozaika-lofthouse-seryy-28x25" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.keramogranit-opt.ru/upload/uf/1d7/LS6O096.jpg&w=300&output=webp&q=80" alt="Мозаика Lofthouse серый 28x25" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Мозаика Lofthouse серый 28x25</span><span className="mt-2 block text-base font-bold text-foreground">1680 ₽/м²</span></div></Link>
                  <Link href="/catalog/mozaika-royal-stone-mnogotsvetnyy-30x30" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.keramogranit-opt.ru/upload/uf/084/RS2L451.jpg&w=300&output=webp&q=80" alt="Мозаика Royal Stone 30x30" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Мозаика Royal Stone 30x30</span><span className="mt-2 block text-base font-bold text-foreground">1820 ₽/м²</span></div></Link>
                  <Link href="/catalog/mozaika-woodhouse-korichnevyy-30x30" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.keramogranit-opt.ru/upload/uf/e89/WS6O116.jpg&w=300&output=webp&q=80" alt="Мозаика Woodhouse коричневый 30x30" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Мозаика Woodhouse коричневый 30x30</span><span className="mt-2 block text-base font-bold text-foreground">626 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>              </article>
    </div>
  )
}
