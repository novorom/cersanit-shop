import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
const SITE_URL = "https://lincer.ru"
export const metadata: Metadata = {
  title: "Рекомендации по затирке швов плитки — инструкция Lincer | LINCER СПб",
  description: "Как выбрать затирку для плитки, подготовить швы и нанести состав. Как удалить остатки затирки и цветные ореолы с поверхности плитки.",
  alternates: { canonical: `${SITE_URL}/blog/rekomendatsii-po-zatirke` },
  openGraph: { title: "Рекомендации по затирке швов плитки", url: `${SITE_URL}/blog/rekomendatsii-po-zatirke`, siteName: "LINCER", locale: "ru_RU", type: "article" },
}
export default function GroutingAdvice() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Рекомендации по затирке швов плитки — инструкция Lincer",
        publisher: { "@type": "Organization", name: "LINCER", url: "https://lincer.ru" },
        mainEntityOfPage: `${SITE_URL}/blog/rekomendatsii-po-zatirke`,
        datePublished: "2025-02-15",
        author: { "@type": "Organization", name: "LINCER" },
      }) }} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/blog" className="hover:text-primary transition-colors">Блог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Затирка швов</span></nav></div></div>

                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной</Link>
              <Link href="/mozaika-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Мозаика в СПб</Link>
              <Link href="/plitka-dlya-dushi-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для душа</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">5 минут чтения · Рекомендации Lincer</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Рекомендации по затирке швов плитки</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Как подобрать, нанести затирку и удалить её остатки с поверхности плитки для внутренней облицовки стен. Официальные рекомендации Lincer.</p>
        </header>
        <div className="flex flex-col gap-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 1. Выбор материала</h2>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• Определите материал основания, на котором будет использована затирка</li>
              <li>• Установите физическую и химическую нагрузку: есть ли температурные колебания (тёплый пол)?</li>
              <li>• Измерьте глубину и ширину шва</li>
              <li>• Продумайте цветовое оформление</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 2. Выбор затирки</h2>
            <div className="flex flex-col gap-3">
              <p>По составу смеси для затирки делятся на:</p>
              <ul className="flex flex-col gap-2 ml-4">
                <li>• <strong>Цементные</strong> — универсальные, доступные, подходят для большинства задач</li>
                <li>• <strong>Эпоксидные</strong> — химически стойкие, для зон с агрессивной средой (кухонный фартук, промышленные помещения)</li>
                <li>• <strong>Модифицированные эпоксидные</strong> (фурановая смола) — для особых условий</li>
                <li>• <strong>Акриловые и силиконовые герметики</strong> — для угловых швов и деформационных зазоров</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-900 text-sm">💡 Совет: для светлых дизайнов используйте затирку светлых тонов. Перед заполнением всех швов проведите пробу на окрашивание плитки.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 3. Подготовка швов</h2>
            <div className="flex flex-col gap-3">
              <ul className="flex flex-col gap-2 ml-4">
                <li>• Очистите швы: удалите крестики, остатки раствора, пыль</li>
                <li>• <strong>Затирка — только после высыхания клея</strong>, минимум через 24 часа после укладки</li>
                <li>• Обязательно увлажните швы перед затиркой — иначе плитка поглощает влагу из затирки, вызывая преждевременное высыхание</li>
                <li>• Заклейте поверхность плитки вдоль швов малярным скотчем (или держите под рукой влажную поролоновую губку)</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-900 text-sm">⚠️ Правило «одного квадратного метра»: затерев 1 м², сразу же очищайте поверхность. Особенно важно при работе с силиконовой затиркой.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Как удалить остатки затирки?</h2>
            <p className="mb-4">Если на поверхности образовался цветной ореол (пятно) по краю плитки — попробуйте простые средства:</p>
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-bold mb-2">Способ 1: Пищевая сода</h3>
                <ol className="flex flex-col gap-1 ml-4 text-sm">
                  <li>1. Растворите соду в воде до «кашицы»</li>
                  <li>2. Нанесите на плитку и оставьте на 15 минут</li>
                  <li>3. Потрите абразивной частью губки круговыми движениями</li>
                  <li>4. Смойте водой</li>
                </ol>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-bold mb-2">Способ 2: Раствор на основе перекиси водорода</h3>
                <p className="text-sm text-muted-foreground mb-2">Состав: 50 мл перекиси + 100 г пищевой соды + 10-15 мл жидкого мыла</p>
                <ol className="flex flex-col gap-1 ml-4 text-sm">
                  <li>1. Перемешайте до однородной массы</li>
                  <li>2. Нанесите губкой и потрите пятно</li>
                  <li>3. При застарелых пятнах — оставьте на 15 минут</li>
                  <li>4. Смойте водой</li>
                </ol>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Использование химических средств может увеличить время удаления остатков затирки.</p>
          </section>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-green-900 font-bold mb-2">Нужна помощь с выбором затирки?</h3>
            <p className="text-green-800 text-sm">Наши специалисты помогут подобрать затирку в тон плитке. Звоните: <a href="tel:+79052050900" className="font-bold underline">+7 (905) 205-09-00</a></p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-bold text-foreground mb-4">Читайте также</h3>
          <div className="flex flex-col gap-3">
            <Link href="/blog/kak-ukladyvat-plitku" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Как укладывать плитку своими руками</Link>
            <Link href="/blog/sertifikaty-kachestva" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Сертификаты качества Lincer</Link>
          </div>
        </div>
      
              {/* Товары по теме */}
              <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/plitka-calacatta-belyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/77c/KTL051st.jpg&w=300&output=webp&q=80" alt="Плитка Calacatta белый 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Calacatta белый 30x60</span><span className="mt-2 block text-base font-bold text-foreground">780 ₽/м²</span></div></Link>
                  <Link href="/catalog/mozaika-lofthouse-seryy-28x25" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/1d7/LS6O096.jpg&w=300&output=webp&q=80" alt="Мозаика Lofthouse серый 28x25" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Мозаика Lofthouse серый 28x25</span><span className="mt-2 block text-base font-bold text-foreground">1680 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>              </article>
    </div>
  )
}
