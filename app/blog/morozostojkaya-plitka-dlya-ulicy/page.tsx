import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://lincer.ru"

export const metadata: Metadata = {
  title: "Морозостойкая плитка для улицы в СПб | Керамогранит",
  description: "Выбираем морозостойкую уличную плитку для Санкт-Петербурга. Керамогранит, характеристики, укладка. Официальный дилер ведущих брендов.",
  alternates: { canonical: `${SITE_URL}/blog/morozostojkaya-plitka-dlya-ulicy` },
  openGraph: { title: "Морозостойкая плитка для улицы в СПб | Керамогранит", url: `${SITE_URL}/blog/morozostojkaya-plitka-dlya-ulicy`, siteName: "LINCER", locale: "ru_RU", type: "article" },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Морозостойкая плитка для улицы: что выбрать в Санкт-Петербурге",
        publisher: { "@type": "Organization", name: "LINCER", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/morozostojkaya-plitka-dlya-ulicy`,
        datePublished: "2026-03-19",
        author: { "@type": "Organization", name: "LINCER" },
      }) }} />
      <article className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Морозостойкая плитка для улицы: что выбрать в Санкт-Петербурге</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Почему морозостойкость — критический параметр для СПб</h2>
            <p className="mb-4">В Санкт-Петербурге зимы суровые и снежные. Уличная плитка здесь подвергается экстремальным нагрузкам: резким перепадам температур, влаге, льду и соли для размораживания. Обычная керамическая плитка в таких условиях быстро трескается и разрушается, теряя эстетичный вид уже после первого зимнего сезона.</p>
            <p className="mb-4">Морозостойкая плитка имеет низкий показатель водопоглощения — влага не проникает глубоко в материал и не расширяется при замерзании, разрывая структуру. Именно поэтому выбор правильной плитки для улицы в СПб — это инвестиция в долговечность вашего дома или коммерческого объекта.</p>
            <p>Профессионалы в Санкт-Петербурге рекомендуют выбирать плитку с морозостойкостью не менее F100 (выдерживает 100 циклов замораживания-оттаивания). Это гарантирует, что материал прослужит минимум 10-15 лет без повреждений.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Керамогранит — лучший выбор для уличной плитки</h2>
            <p className="mb-4">Керамогранит значительно превосходит обычную керамику по характеристикам. Это материал, спёченный при температурах свыше 1200 градусов, что придаёт ему исключительную прочность и водонепроницаемость. Водопоглощение керамогранита составляет всего 0,05-0,1%, в то время как у керамической плитки оно достигает 1-3%.</p>
            <p className="mb-4">Lincer предлагает широкий ассортимент технического керамогранита специально для уличных работ. Наши коллекции прошли испытания в суровых климатических условиях и подтверждены сертификатами морозостойкости. Плитка от Lincer сохраняет цвет и фактуру годами, не подвергаясь истиранию и деформации.</p>
            <p>Как мультибрендовый гипермаркет в Санкт-Петербурге, мы гарантируем оригинальность материала и его полное соответствие европейским стандартам качества. Керамогранит — это долгосрочное решение для вашего сада, входной зоны или мощения.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">На что обратить внимание при выборе уличной плитки</h2>
            <p className="mb-4">При покупке морозостойкой плитки в СПб важно проверить несколько параметров. Во-первых, класс водопоглощения — он должен быть обозначен как BIa или BIb (не выше 3%). Во-вторых, противоскользящее покрытие — летом плитка может быть скользкой от дождя, а зимой от льда, поэтому рекомендуется выбирать материал с R10 или R11.</p>
            <p className="mb-4">Также важна толщина плитки. Для пешеходных зон рекомендуется минимум 8-10 мм, для въездных зон — 12-14 мм. Формат плитки должен быть удобным для укладки без большого количества подрезов. Популярны размеры 300х300, 600х600 или прямоугольные варианты 600х300 мм.</p>
            <p>Цвет плитки для Санкт-Петербурга лучше выбирать более светлый — такая поверхность не перегревается летом и лучше видна в снег и туман. Рассмотрите варианты серого, бежевого или светло-коричневого керамогранита из коллекций Lincer, которые идеально подходят для климата СПб и улиц Янино.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Популярные коллекции Lincer для уличного применения</h2>
            <p className="mb-4">Компания Lincer разработала специализированные линейки керамогранита для экстремальных климатических условий. Плитка проходит серьёзные тесты на морозостойкость и выдерживает циклы замораживания-оттаивания, характерные для Санкт-Петербурга и северных регионов России.</p>
            <p className="mb-4">Технический керамогранит отличается однородной структурой, что обеспечивает равномерное распределение нагрузки и исключает образование пустот. Противоскользящая поверхность создана специально для уличных условий, где безопасность пешеходов критична.</p>
            <p>В нашем магазине в Санкт-Петербурге представлены как классические варианты в сером и чёрном цветах, так и современные коллекции с имитацией натурального камня. Все материалы имеют сертификаты морозостойкости F100 и выше, что подтверждает их пригодность для укладки в условиях северного климата.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Монтаж и уход за морозостойкой плиткой</h2>
            <p className="mb-4">Правильная укладка морозостойкой плитки — залог её долговечности. Необходимо обеспечить хороший дренаж под плиткой, чтобы влага не скапливалась. Используйте специальные наружные клеи и затирки, устойчивые к влаге и морозу. В Санкт-Петербурге рекомендуется делать небольшой уклон (2-3 градуса) для стока воды.</p>
            <p className="mb-4">При укладке в осенне-зимний период важно использовать морозостойкие монтажные смеси, так как обычные клеи потеряют свойства на холоде. Шов между плитками рекомендуется делать 5-10 мм, чтобы избежать трещин при расширении материала.</p>
            <p>Уход за уличной плиткой простой: регулярная очистка от грязи и листьев, удаление льда без использования острых инструментов, применение специальных средств для очистки два раза в год. Наш магазин в районе Янино и центре СПб предоставляет консультации по уходу за каждой коллекцией Lincer.</p>
          </section>

        </div>
                    <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood бежевый 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-wood-concept-natural-bezhevyy-22x90" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Wood Concept Natural 22x90</span><span className="mt-2 block text-base font-bold text-foreground">1610 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-tiffany-belyy-42x42" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Tiffany белый 42x42</span><span className="mt-2 block text-base font-bold text-foreground">1370 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>
                  <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/plitka-dlya-balkona-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для балкона в СПб</Link>
              <Link href="/keramogranit-pod-derevo-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит под дерево в СПб</Link>
              <Link href="/keramogranit-60x60-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит 60x60 в СПб</Link>
            </div>
          </div>
        </article>
    </div>
  )
}