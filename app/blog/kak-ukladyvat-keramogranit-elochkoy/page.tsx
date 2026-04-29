import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://keramogranit-opt.ru"

export const metadata: Metadata = {
  title: "Укладка керамогранита ёлочкой и диагональю: пошаговая инструкция | Керамогранит Опт",
  description: "Полная инструкция по укладке керамогранита ёлочкой и диагональю. Советы мастеров Lincer Санкт-Петербурга. Пошаговое руководство для начинающих.",
  alternates: { canonical: `${SITE_URL}/blog/kak-ukladyvat-keramogranit-elochkoy` },
  openGraph: { title: "Укладка керамогранита ёлочкой и диагональю: пошаговая инструкция | Керамогранит Опт", url: `${SITE_URL}/blog/kak-ukladyvat-keramogranit-elochkoy`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "article" },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Укладка керамогранита ёлочкой и диагональю: пошаговая инструкция",
        publisher: { "@type": "Organization", name: "Керамогранит Опт", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/kak-ukladyvat-keramogranit-elochkoy`,
        datePublished: "2026-04-06",
        author: { "@type": "Organization", name: "Керамогранит Опт" },
      }) }} />
      <article className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/">Главная</Link>
          <ChevronRight size={16} />
          <Link href="/blog">Блог</Link>
          <ChevronRight size={16} />
          <span>Укладка керамогранита</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">Укладка керамогранита ёлочкой и диагональю: пошаговая инструкция</h1>
        
        <div className="mb-8 text-gray-600">
          <p>Опубликовано: 6 апреля 2026 | Официальный дилер ведущих брендов в Санкт-Петербурге</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Почему ёлочка и диагональ так популярны</h2>
            <p className="text-gray-700 mb-4">Укладка керамогранита ёлочкой и диагональю — это не просто модный тренд, а практичное решение для преображения интерьера. В Санкт-Петербурге всё чаще можно встретить квартиры и дома, где полы и стены выложены именно такими паттернами. Ёлочка (или «ёлка») визуально расширяет помещение, делает его более динамичным и современным. Диагональная укладка подходит как для классических, так и для минималистичных интерьеров.</p>
            <p className="text-gray-700">Эти техники требуют большей аккуратности и расчётов, но результат того стоит. Официальный дилер ведущих брендов в Янино и по всему Санкт-Петербургу рекомендует керамогранит от Lincer именно для таких укладок — материал отличается идеальной геометрией и прочностью. Давайте разберёмся, как правильно выполнить эту работу.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Подготовка: материалы и инструменты</h2>
            <p className="text-gray-700 mb-4">Перед началом укладки керамогранита необходимо подготовить всё необходимое. Выбор качественного материала — это половина успеха. Керамогранит из нашего магазина в Санкт-Петербурге полностью соответствует международным стандартам и гарантирует ровную укладку.</p>
            <p className="text-gray-700 mb-3">Вам понадобятся:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Керамогранит нужного размера и количеством с запасом 10%</li>
              <li>Плиточный клей (рекомендуем использовать клей для керамогранита повышенной прочности)</li>
              <li>Затирка (фугу) нужного цвета</li>
              <li>Плиточный нож или болгарка с алмазным диском</li>
              <li>Шпатель зубчатый (размер зубьев зависит от размера плитки)</li>
              <li>Уровень, рулетка, карандаш</li>
              <li>Крестики для регулировки швов</li>
              <li>Резиновый шпатель для затирки</li>
            </ul>
            <p className="text-gray-700">Качество инструмента играет большую роль. В нашем магазине в Янино можно приобрести всё необходимое оборудование от проверенных производителей. Подготовьте основание: оно должно быть ровным, сухим и чистым. Неровности более 3 мм необходимо устранить.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Укладка керамогранита ёлочкой: пошаговая схема</h2>
            <p className="text-gray-700 mb-4">Ёлочка — это укладка, когда каждый следующий ряд плиток повёрнут на 90 градусов относительно предыдущего. Это создаёт характерный V-образный паттерн. Укладка ёлочкой керамогранита требует особой внимательности при разметке.</p>
            <p className="text-gray-700 mb-3">Первый шаг — разметка. Найдите центр помещения и начните укладку с центра, постепенно двигаясь к стенам. Это обеспечит симметричность рисунка. Начните с первой полосы плиток в вертикальном направлении. Нанесите клей на основание зубчатым шпателем, держите его под углом 45 градусов для создания равномерных борозд.</p>
            <p className="text-gray-700 mb-3">Второй шаг — укладка первого ряда. Прижимайте каждую плитку керамогранита к клею с лёгким давлением и поворотом. Убедитесь, что плитка сидит ровно, используя уровень. Расстояние между плитками регулируйте крестиками толщиной 3-5 мм.</p>
            <p className="text-gray-700 mb-3">Третий шаг — второй ряд под 90 градусов. Каждая плитка второго ряда должна перпендикулярно ложиться на плитку первого ряда. Это и создаёт эффект ёлочки. Продолжайте чередовать направления, постоянно проверяя уровень и горизонтальность укладки.</p>
            <p className="text-gray-700">В Санкт-Петербурге, особенно в районе Янино, многие владельцы выбирают именно эту технику для ванных комнат и кухонь. Керамогранит идеально подходит для такой укладки благодаря точным размерам и устойчивости к влаге. После завершения укладки подождите 24 часа перед затиркой швов.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Диагональная укладка плитки: техника и нюансы</h2>
            <p className="text-gray-700 mb-4">Диагональная укладка плитки — это классический способ, который делает помещение визуально больше и добавляет динамики интерьеру. Плитки укладываются под углом 45 градусов к стенам помещения. Эта техника требует больше обрезков, но результат выглядит очень эффектно.</p>
            <p className="text-gray-700 mb-3">Разметка при диагональной укладке. Нужно найти центр помещения и провести две диагональные линии. От центра начните укладку в сторону углов. Помните, что при диагональной укладке керамогранита отходы увеличиваются примерно на 15-20%, поэтому материал нужно заказать с большим запасом.</p>
            <p className="text-gray-700 mb-3">Процесс укладки диагональной плитки. Нанесите клей на основание крест-накрест и укладывайте плитки вдоль диагональных линий. При необходимости обрезайте плитки плиточным ножом. На краях помещения обязательно будут треугольные кусочки — обрезайте их аккуратно, примеряя каждый элемент перед приклеиванием.</p>
            <p className="text-gray-700">В Санкт-Петербурге диагональная укладка плитки часто используется в больших помещениях — холлах жилых комплексов, офисах, торговых центрах. Керамогранит, который предлагает наш магазин, имеет размеры от 30х30 см до 120х120 см, что позволяет подобрать оптимальный вариант для любого проекта. Диагональная укладка выглядит особенно эффектно на крупноформатном керамограните.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Затирка швов и финальные работы</h2>
            <p className="text-gray-700 mb-4">После того как клей полностью высох (обычно это занимает 24-48 часов), можно приступать к затирке швов. Это финальный и очень важный этап, который определяет общий вид укладки керамогранита ёлочкой или диагональю.</p>
            <p className="text-gray-700 mb-3">Подготовка к затирке. Удалите все крестики из швов. Очистите швы от остатков клея на глубину примерно 5 мм. Слегка смочите швы водой (но не переувлажняйте). Затирка должна быть нужной консистенции — не слишком жидкой и не слишком густой.</p>
            <p className="text-gray-700 mb-3">Процесс затирки. Используя резиновый шпатель, заполните швы затиркой, двигаясь под углом 45 градусов к швам. Излишки затирки удаляйте той же техникой. После начального схватывания затирки (15-20 минут) протрите поверхность влажной губкой, удаляя остатки материала. Через 3 часа сделайте окончательную влажную уборку. Полное высыхание затирки происходит в течение 72 часов.</p>
            <p className="text-gray-700">В магазине ведущих брендов в Санкт-Петербурге и в Янино мы рекомендуем использовать специализированные затирки для керамогранита. Они обладают лучшей адгезией и устойчивостью к влаге. После завершения всех работ обработайте швы защитным составом, особенно если укладка проведена в ванной или на кухне. Правильная затирка — это залог долговечности и красоты вашего пола или стены.</p>
          </section>
        </div>
                    <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood бежевый 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-wood-concept-natural-bezhevyy-22x90" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Wood Concept Natural 22x90</span><span className="mt-2 block text-base font-bold text-foreground">1610 ₽/м²</span></div></Link>
                  <Link href="/catalog/plitka-calacatta-belyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="aspect-square bg-muted" /><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Calacatta белый 30x60</span><span className="mt-2 block text-base font-bold text-foreground">780 ₽/м²</span></div></Link>
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