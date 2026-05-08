import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://cersanit-spb.ru"

export const metadata: Metadata = {
  title: "Как выбрать плитку для ванной комнаты — полный гид 2025 | Керамогранит Опт",
  description: "Как правильно выбрать плитку для ванной: размер, цвет, фактура, скользкость. Советы по подбору коллекции Lincer для маленькой и большой ванной. Примеры и рекомендации.",
  alternates: { canonical: `${SITE_URL}/blog/kak-vybrat-plitku-dlya-vannoj` },
  openGraph: { title: "Как выбрать плитку для ванной — полный гид", url: `${SITE_URL}/blog/kak-vybrat-plitku-dlya-vannoj`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "article" },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Как выбрать плитку для ванной комнаты — полный гид 2025",
        description: "Полное руководство по выбору плитки для ванной: размер, цвет, фактура, бюджет.",
        publisher: { "@type": "Organization", name: "Керамогранит Опт", url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/kak-vybrat-plitku-dlya-vannoj`,
        datePublished: "2025-02-01",
        author: { "@type": "Organization", name: "Керамогранит Опт" },
      })}} />

      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-primary transition-colors">Блог</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Как выбрать плитку для ванной</span>
          </nav>
        </div>
      </div>


                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной</Link>
              <Link href="/plitka-nastennaya-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Настенная плитка</Link>
              <Link href="/plitka-dlya-dushi-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для душа</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">10 минут чтения · Советы экспертов</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Как выбрать плитку для ванной комнаты</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Полный гид по выбору: размер, фактура, цвет, скользкость пола — всё что нужно знать перед покупкой.</p>
        </header>

        <div className="flex flex-col gap-8 text-foreground/80">

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">С чего начать: определите стиль ванной</h2>
            <p className="leading-relaxed mb-3">Прежде чем идти в магазин — решите, какой стиль ванной вы хотите. От этого зависит всё остальное.</p>
            <ul className="flex flex-col gap-2 ml-4">
              <li>• <strong>Классика</strong> — белая или бежевая плитка под мрамор, Calacatta, прямоугольный формат</li>
              <li>• <strong>Лофт/Бетон</strong> — серый керамогранит с грубой текстурой, коллекции Lofthouse, Soft Concrete</li>
              <li>• <strong>Скандинавский</strong> — светлые тона, плитка под дерево, минимализм</li>
              <li>• <strong>Современный</strong> — крупный формат 60×120, полированный керамогранит, минимум швов</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Размер плитки: главное правило</h2>
            <p className="leading-relaxed mb-3">Для маленькой ванной (до 4 м²) — не берите очень мелкую плитку: она дробит пространство. Оптимально — 30×60 или 30×30 см.</p>
            <p className="leading-relaxed mb-3">Для стандартной ванной (4–8 м²) — форматы 30×60, 42×42, 45×90 см. Хорошо смотрится крупная прямоугольная плитка на стены + небольшой квадрат на пол.</p>
            <p className="leading-relaxed">Для большой ванной (от 8 м²) — смело берите крупный формат 60×120 см. Монолитный вид, минимум швов, ощущение роскоши. Нужно идеальное основание.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Пол и стены — разные требования</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
              <p className="text-blue-900 font-medium text-sm">💡 Важно: плитка для пола и стен отличается. Не путайте их местами.</p>
            </div>
            <p className="leading-relaxed mb-3"><strong>Для пола</strong> нужна плитка с классом скользкости не ниже R9 (в идеале R10–R11). Матовая поверхность или рельеф. Высокая твёрдость — PEI 4–5. В мокрых зонах особенно важно — мозаика 28×25 см со швами даёт хорошее сцепление.</p>
            <p className="leading-relaxed"><strong>Для стен</strong> — широкий выбор. Можно использовать керамическую плитку (она легче и дешевле), полированный керамогранит под мрамор, крупные форматы. Главное — влагостойкость (все плитки её имеют).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Цвет: светлый или тёмный?</h2>
            <p className="leading-relaxed mb-3"><strong>Светлые тона</strong> (белый, бежевый, светло-серый) — визуально увеличивают пространство, не устаревают, легко дополнить декором. Минус — видны загрязнения.</p>
            <p className="leading-relaxed mb-3"><strong>Тёмные тона</strong> (серый, антрацит, чёрный) — стильно, современно, скрывают следы. Минус — уменьшают пространство, нужна хорошая подсветка.</p>
            <p className="leading-relaxed"><strong>Универсальный совет:</strong> большие поверхности (пол, основная стена) — светлые. Акцентная стена или ниша — тёмная или с рисунком. Это работает в любом интерьере.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Популярные коллекции Lincer для ванной</h2>
            <div className="flex flex-col gap-4">
              {[
                { name: "Calacatta", desc: "Белый мрамор с золотыми прожилками. Классика для стен. 29,8×59,8 см. Вечный стиль." },
                { name: "Lofthouse", desc: "Серый камень, лофт-стиль. Для стен и пола. 29,7×59,8 см. Очень популярен в 2024–2025." },
                { name: "Deep Calacatta", desc: "Крупный формат 60×120, роскошный вид мрамора. Для больших ванных." },
                { name: "Wood Concept", desc: "Керамогранит под дерево. Тёплая атмосфера в ванной. 21,8×89,8 см." },
                { name: "Silvia", desc: "Доступная коллекция под мрамор от 844 ₽/м². Белый и бежевый. 60×60 и 60×120 см." },
              ].map(c => (
                <div key={c.name} className="border border-border rounded-xl p-4">
                  <div className="font-semibold text-foreground">{c.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{c.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Сколько брать с запасом?</h2>
            <p className="leading-relaxed">Стандартный запас — <strong>10% к расчётному количеству</strong>. При укладке диагональю или ёлочкой — 15–20%. Запас нужен на подрезку, возможный бой при укладке, и на будущий ремонт — через несколько лет та же партия может уже не продаваться.</p>
          </section>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Нужна помощь с выбором?</p>
            <p className="text-muted-foreground text-sm mb-4">Расскажите размеры ванной — подберём коллекцию и рассчитаем количество бесплатно</p>
            <a href="tel:+79052050900" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              +7 (905) 205-09-00
            </a>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Читайте также:</p>
            <div className="flex flex-col gap-2">
              <Link href="/blog/skolko-plitki-nuzhno-kupit" className="text-primary hover:underline text-sm">→ Как рассчитать количество плитки</Link>
              <Link href="/blog/kak-ukladyvat-plitku" className="text-primary hover:underline text-sm">→ Как укладывать плитку своими руками</Link>
              <Link href="/plitka-dlya-vannoj-spb" className="text-primary hover:underline text-sm">→ Каталог плитки для ванной в СПб</Link>
            </div>
          </div>
        </div>
      
              {/* Товары по теме */}
              <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/plitka-calacatta-belyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/77c/KTL051st.jpg&w=300&output=webp&q=80" alt="Плитка Calacatta белый 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Calacatta белый 30x60</span><span className="mt-2 block text-base font-bold text-foreground">780 ₽/м²</span></div></Link>
                  <Link href="/catalog/plitka-calacatta-belyy-30x60-glyantsevaya" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/c2b/KTL052.jpg&w=300&output=webp&q=80" alt="Плитка Calacatta белый рельеф 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Calacatta белый рельеф 30x60</span><span className="mt-2 block text-base font-bold text-foreground">795 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.cersanit.ru/upload/uf/5b6/C_NW4M012D_1a.jpg&w=300&output=webp&q=80" alt="Керамогранит Northwood 18x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>              </article>
    </div>
  )
}
