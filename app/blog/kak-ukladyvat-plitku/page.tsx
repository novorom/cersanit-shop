import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Как укладывать плитку своими руками — инструкция Lincer | Керамогранит Опт",
  description: "Официальная инструкция по укладке керамической плитки и керамогранита. Подготовка основания, выбор клея, пошаговая укладка, затирка швов.",
  alternates: { canonical: `${SITE_URL}/blog/kak-ukladyvat-plitku` },
  openGraph: { title: "Как укладывать плитку своими руками", url: `${SITE_URL}/blog/kak-ukladyvat-plitku`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "article" },
}

export default function HowToLayTile() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Как укладывать плитку своими руками — инструкция Lincer",
        description: "Официальная инструкция по укладке керамической плитки и керамогранита.",
        publisher: { "@type": "Organization", name: "Керамогранит Опт", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/kak-ukladyvat-plitku`,
        datePublished: "2025-01-15",
      })}} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/blog" className="hover:text-primary transition-colors">Блог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Укладка плитки</span></nav></div></div>

                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной</Link>
              <Link href="/plitka-dlya-kuhni-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для кухни</Link>
              <Link href="/plitka-dlya-prihozhej-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для прихожей</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">7 минут чтения · Официальная инструкция Lincer</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Как укладывать плитку своими руками</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Официальная инструкция по укладке керамической плитки и керамогранита. Следуйте этим рекомендациям, чтобы получить качественный и долговечный результат.</p>
        </header>

        <div className="prose prose-lg max-w-none flex flex-col gap-8 text-foreground/80">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-amber-900 font-medium text-sm">⚠️ Важно: Любые претензии по видимым дефектам плитки или керамогранита принимаются только до начала монтажа. Внимательно осмотрите материал перед укладкой.</p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 1. Подготовьте плитку к работе</h2>
            <div className="flex flex-col gap-3">
              <p>Убедитесь, что плитка подобрана правильно. Для зон прямого контакта с водой (ванная, душ) она должна иметь низкую степень влагопоглощения.</p>
              <p><strong>Запас материала:</strong> приобретайте плитку с запасом 5–15% к рассчитанному количеству — на подрезку, бой и возможный ремонт в будущем.</p>
              <p><strong>Партия:</strong> проверьте маркировку на каждой коробке — вся плитка должна быть из одной партии. Разные партии могут отличаться по тону.</p>
              <p><strong>Защитный воск:</strong> если на поверхности плитки есть защитный воск — удалите его резиновым или пластиковым шпателем до укладки.</p>
              <p><strong>Визуализация:</strong> смоделируйте раскладку плитки. Используйте бесплатную программу CERAMIC 3D WEB — ссылка доступна в разделе «Файлы для скачивания» на сайте cersanit-spb.ru.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 2. Подготовьте основание</h2>
            <div className="flex flex-col gap-3">
              <p>Этот этап — основа качественной укладки. Пропускать его нельзя.</p>
              <ul className="flex flex-col gap-2 ml-4">
                <li>• <strong>Очистка:</strong> удалите с пола и стен остатки цемента, пыль и загрязнения.</li>
                <li>• <strong>Штукатурка:</strong> кирпичные и бетонные поверхности выравнивайте цементной штукатуркой; гипсовые, газобетонные и пенобетонные — гипсовой.</li>
                <li>• <strong>Грунтование:</strong> нанесите грунт в два слоя для максимального сцепления поверхности с клеем.</li>
                <li>• <strong>Гидроизоляция:</strong> в зонах прямого контакта с водой (возле раковины, за душем или ванной) обязательно нанесите жидкую гидроизоляционную плёнку.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 3. Подберите клей</h2>
            <p>Для настенной керамической плитки подойдёт любой клеевой состав для вашего типа помещения. Для керамогранита — используйте клей с эластичными добавками или универсальный (класс C2). Для крупных форматов (60x60 и более) — обязательно эластичный клей C2 TE или S1/S2.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 4. Подготовьте инструмент для резки</h2>
            <p>Настенную керамическую плитку можно резать обычным стеклорезом. Для керамогранита потребуется механический или электрический плиткорез, лобзик или циркулярная пила с алмазным диском. Для круглых отверстий — дрель со специальной насадкой-коронкой.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 5. Определите порядок укладки</h2>
            <div className="flex flex-col gap-3">
              <p>Продумайте, откуда начинать укладку:</p>
              <ul className="flex flex-col gap-2 ml-4">
                <li>• Настенную плитку без активного декора начинают со <strong>второго ряда снизу</strong>, затем укладывают вниз и вверх.</li>
                <li>• С активным декором (например, под уровнем раковины) — начинают с ряда на уровне декора и укладывают рядами вверх и вниз.</li>
              </ul>
              <p>Раскроите плитку заранее в соответствии с визуализацией раскладки.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 6. Укладка плитки</h2>
            <div className="flex flex-col gap-3">
              <ul className="flex flex-col gap-2 ml-4">
                <li>• Наносите клей <strong>на всю поверхность плитки</strong> — точечное нанесение создаёт пустоты, из-за которых плитка может треснуть.</li>
                <li>• Плотно прижимайте плитку. Для крупных форматов используйте резиновый молоток — постукивайте по центру каждой плитки.</li>
                <li>• Используйте <strong>крестики или СВП</strong> (систему выравнивания плитки) для сохранения одинаковой ширины шва.</li>
                <li>• Удаляйте остатки клея с лицевой поверхности <strong>немедленно</strong> — затвердевший клей повреждает поверхность при удалении.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 7. Затирка швов</h2>
            <p>Выполняйте затирку не ранее чем через <strong>24 часа</strong> после завершения укладки. Для угловых швов в ванной и на кухне используйте силикон в цвет затирки — это предотвращает растрескивание при микродвижениях конструкции.</p>
          </section>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-green-900 font-bold mb-2">Есть вопросы по укладке?</h3>
            <p className="text-green-800 text-sm">Наши специалисты бесплатно помогут с расчётом количества плитки и подбором клея. Звоните: <a href="tel:+79052050900" className="font-bold underline">+7 (905) 205-09-00</a></p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-bold text-foreground mb-4">Читайте также</h3>
          <div className="flex flex-col gap-3">
            <Link href="/blog/kak-ukladyvat-mozaiku" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Как укладывать керамическую мозаику</Link>
            <Link href="/blog/rekomendatsii-po-zatirke" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Рекомендации по затирке швов</Link>
          </div>
        </div>
      
              {/* Товары по теме */}
              <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/plitka-calacatta-belyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/77c/KTL051st.jpg&w=300&output=webp&q=80" alt="Плитка Calacatta белый 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Calacatta белый 30x60</span><span className="mt-2 block text-base font-bold text-foreground">780 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/5b6/C_NW4M012D_1a.jpg&w=300&output=webp&q=80" alt="Керамогранит Northwood бежевый 18x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood бежевый 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                  <Link href="/catalog/plitka-deco-chernyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/b22/DEL232.jpg&w=300&output=webp&q=80" alt="Плитка Deco черный рельеф 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Deco черный рельеф 30x60</span><span className="mt-2 block text-base font-bold text-foreground">750 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>              </article>
    </div>
  )
}
