import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Плитка для частного дома: выбор для каждой комнаты | Керамогранит Опт",
  description: "Как выбрать плитку для частного дома в СПб. Керамогранит для полов и стен в разных комнатах. Советы от официального дилера Lincer.",
  alternates: { canonical: `${SITE_URL}/blog/plitka-dlya-doma-chastnogo` },
  openGraph: { 
    title: "Плитка для частного дома: выбор для каждой комнаты",
    url: `${SITE_URL}/blog/plitka-dlya-doma-chastnogo`, 
    siteName: "Керамогранит Опт", 
    locale: "ru_RU", 
    type: "article" 
  },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Плитка для частного дома: что выбрать для каждой комнаты",
        publisher: { "@type": "Organization", name: "Керамогранит Опт", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/plitka-dlya-doma-chastnogo`,
        datePublished: "2026-03-30",
        author: { "@type": "Organization", name: "Керамогранит Опт" },
      }) }} />
      <article className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Плитка для частного дома: что выбрать для каждой комнаты</h1>
        
        <div className="mb-8 text-sm text-muted-foreground flex items-center gap-2">
          <span>Керамогранит Опт</span>
          <ChevronRight size={16} />
          <span>30 марта 2026</span>
        </div>

        <div className="prose prose-sm max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Основные критерии выбора плитки для дома</h2>
            <p className="text-base leading-relaxed">Выбор плитки для частного дома в Санкт-Петербурге требует внимательного подхода. Нужно учитывать не только эстетику, но и практические характеристики материала. Плитка должна быть прочной, влагостойкой и удобной в уходе. Особенно важно учитывать климат СПб с его влажностью и температурными перепадами.</p>
            <p className="text-base leading-relaxed">При выборе керамогранита или керамической плитки обратите внимание на класс износостойкости (PEI), морозостойкость и водопоглощение. Качественная плитка от надежного производителя, такого как Lincer, прослужит десятилетия без потери внешнего вида. Официальный дилер ведущих брендов в Санкт-Петербурге предложит вам самые надежные и стильные решения для вашего дома.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Плитка для кухни и столовой</h2>
            <p className="text-base leading-relaxed">Кухня — это место с повышенными требованиями к материалам. Здесь постоянно происходят температурные скачки, контакт с влагой и жирными пятнами. Для пола кухни рекомендуется керамогранит высокого класса износостойкости (не менее PEI 4). Он не скользит, легко моется и прослужит много лет.</p>
            <p className="text-base leading-relaxed">Для фартука над рабочей зоной идеально подходит плитка среднего размера — она практична и красиво смотрится. Светлые тона визуально расширяют пространство кухни, а темные керамогранит скрывает грязь. В нашем магазине в районе Янино и на других объектах Санкт-Петербурга представлены коллекции Lincer специально для кухонных пространств.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Керамогранит для ванной и санузлов</h2>
            <p className="text-base leading-relaxed">Ванная комната постоянно находится во влажной среде, поэтому здесь необходим материал с минимальным водопоглощением. Керамогранит — идеальное решение для пола и стен ванной в частном доме. Он не впитывает влагу, не поддерживает рост плесени и грибков.</p>
            <p className="text-base leading-relaxed">Для напольной плитки в ванной выбирайте матовую текстуру — она менее скользкая, чем глянцевая. Размер плитки должен соответствовать габаритам помещения: для маленькой ванной подходит плитка 30x30 см, для просторной — 60x60 см или больше. Плинтус и переходы лучше делать из того же материала для единого стиля. Lincer предлагает полные коллекции для ванных комнат в нашем офисе на улице Софийской в Санкт-Петербурге.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Плитка для гостиной и спальни</h2>
            <p className="text-base leading-relaxed">В жилых комнатах приоритет — комфорт и уют. Керамогранит для пола в гостиной или спальне может быть менее износостойким, чем в кухне, но должен быть теплым и приятным на ощупь. Популярный выбор — плитка под дерево или камень, которая создает природный, естественный вид.</p>
            <p className="text-base leading-relaxed">Крупноформатная плитка 60x120 см визуально делает комнату просторнее и требует меньше швов. Она проще укладывается и легче моется. Светлый керамогранит под мрамор или светлое дерево идеален для небольших помещений. В каталоге официального дилера ведущих брендов в Санкт-Петербурге вы найдете сотни вариантов для любого интерьера.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Плитка для полов в прихожей и коридорах</h2>
            <p className="text-base leading-relaxed">Прихожая испытывает максимальную нагрузку — грязь с улицы, постоянная ходьба, влага. Здесь необходим керамогранит самого высокого класса износостойкости (PEI 5). Темные тона практичнее скрывают грязь, но светлые выглядят современнее. Оптимальный выбор — серый или бежевый керамогранит средней тональности.</p>
            <p className="text-base leading-relaxed">Текстура должна быть противоскользящей, чтобы безопасно передвигаться в мокрой обуви. Размер плитки лучше выбрать средний или крупный — так коридор выглядит просторнее. Если прихожая маленькая, как часто бывает в старых домах Санкт-Петербурга, используйте вертикальную укладку плитки для визуального расширения. Наши специалисты в Янино помогут подобрать оптимальное решение для вашего дома.</p>
          </section>

        </div>
                    <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/keramogranit-wood-concept-natural-bezhevyy-22x90" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Wood Concept Natural 22x90</span><span className="mt-2 block text-base font-bold text-foreground">1610 ₽/м²</span></div></Link>
                  <Link href="/catalog/mozaika-lofthouse-seryy-28x25" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Мозаика Lofthouse серый 28x25</span><span className="mt-2 block text-base font-bold text-foreground">1680 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood бежевый 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>
                  <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/keramogranit-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит в СПб</Link>
              <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной в СПб</Link>
              <Link href="/katalog" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Katalog</Link>
            </div>
          </div>
        </article>
    </div>
  )
}