import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, ShieldCheck } from "lucide-react"
const SITE_URL = "https://lincer.ru"
export const metadata: Metadata = {
  title: "Сертификаты качества и безопасности плитки | LINCER СПб",
  description: "Вся плитка и керамогранит сертифицированы в России. Сертификат соответствия ГОСТ, пожарная безопасность, добровольная сертификация НСОПБ. Официальный дилер в СПб.",
  alternates: { canonical: `${SITE_URL}/blog/sertifikaty-kachestva` },
  openGraph: { title: "Сертификаты качества Lincer", url: `${SITE_URL}/blog/sertifikaty-kachestva`, siteName: "LINCER", locale: "ru_RU", type: "article" },
}
const certs = [
  {
    title: "Сертификат соответствия — Керамическая плитка для стен",
    number: "РОСС RU.CM29.H00522",
    valid: "05.06.2023 — 04.06.2026",
    organ: "ВНИИСТРОМ «НЦК-Сертификация»",
    desc: "Подтверждает соответствие керамической глазурованной плитки для внутренней облицовки стен (группа ВШ) требованиям ГОСТ 13996-2019 и СТО 99193760-001-2023. Изготовитель — ООО «Фряновский Керамический Завод».",
    standard: "ГОСТ 13996-2019, СТО 99193760-001-2023",
    product: "Плитка керамическая для внутренней облицовки стен (размер N ≥ 15 см), бордюры (N < 7 см, 7 ≤ N ≤ 15 см), вставки",
  },
  {
    title: "Сертификат пожарной безопасности — Керамогранит",
    number: "RU C-RU.ЧС13.В.00417/23",
    valid: "05.07.2023 — 04.07.2028",
    organ: "ПОЖТЕСТ ФГБУ ВНИИПО МЧС России",
    desc: "Обязательный сертификат пожарной безопасности. Подтверждает: керамогранит относится к категории НГ — негорючий материал (ГОСТ 30244-94). Не распространяет огонь, не выделяет токсичных веществ при нагреве.",
    standard: "123-ФЗ «Технический регламент о требованиях пожарной безопасности»",
    product: "Плитки керамические Керамогранит и декоративные элементы (бордюры, вставки) по ГОСТ 13996-2019, толщина 8,5 мм",
  },
  {
    title: "Сертификат НСОПБ — Керамогранит глазурованный",
    number: "НСОПБ.RU.ЭО.ПР.095.Н.00304",
    valid: "20.12.2023 — 19.12.2026",
    organ: "Региональный сертификационный центр «Опытное» МО",
    desc: "Добровольный сертификат системы НСОПБ. Подтверждает соответствие керамогранита группе BIa (практически нулевое водопоглощение), сорт 1, по СТО 99193760-006-2023 и ГОСТ 13996-2019.",
    standard: "ГОСТ 13996-2019, СТО 99193760-006-2023",
    product: "Керамогранит глазурованный группа BIa, сорт 1",
  },
]
export default function Certificates() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Сертификаты качества и безопасности плитки",
        publisher: { "@type": "Organization", name: "LINCER", url: "https://lincer.ru" },
        mainEntityOfPage: `${SITE_URL}/blog/sertifikaty-kachestva`,
        datePublished: "2025-03-01",
        author: { "@type": "Organization", name: "LINCER" },
      }) }} />
      <div className="bg-muted/50 border-b border-border"><div className="mx-auto max-w-7xl px-4 py-3"><nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary transition-colors">Главная</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/blog" className="hover:text-primary transition-colors">Блог</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground font-medium">Сертификаты качества</span></nav></div></div>

                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/keramogranit-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Керамогранит</Link>
              <Link href="/magazin-plitki-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Магазин плитки</Link>
              <Link href="/dostavka-plitki-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Доставка плитки</Link>
            </div>
          </div>

      <article className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <header className="mb-10">
          <div className="text-sm text-muted-foreground mb-3">3 минуты чтения · Документы и сертификаты</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">Сертификаты качества и безопасности Lincer</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Вся плитка и керамогранит производства ООО «Фряновский Керамический Завод» (г. Фряново, Московская обл.) прошли обязательную и добровольную сертификацию в России. Рассказываем, что подтверждает каждый сертификат.</p>
        </header>
        <div className="flex flex-col gap-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Действующие сертификаты</h2>
            <div className="flex flex-col gap-6">
              {certs.map((cert, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <ShieldCheck className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground leading-snug">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">№ {cert.number} · Действует до {cert.valid.split("—")[1].trim()}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-3">{cert.desc}</p>
                  <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground border-t border-border pt-3 mt-3">
                    <p><span className="font-medium text-foreground">Орган по сертификации:</span> {cert.organ}</p>
                    <p><span className="font-medium text-foreground">Стандарт:</span> {cert.standard}</p>
                    <p><span className="font-medium text-foreground">Продукция:</span> {cert.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Что означают эти сертификаты для покупателя?</h2>
            <div className="flex flex-col gap-4">
              <p>Наличие сертификатов — не просто формальность. Это независимое подтверждение того, что плитка соответствует российским государственным стандартам.</p>
              <ul className="flex flex-col gap-2 ml-4">
                <li>• <strong>Сертификат ГОСТ</strong> — плитка соответствует по геометрии, прочности и водопоглощению. Вы получите ровный материал без дефектов партии.</li>
                <li>• <strong>Пожарный сертификат (НГ)</strong> — керамогранит не горит и не выделяет токсичных веществ. Важно для ванных комнат, кухонь и общественных объектов.</li>
                <li>• <strong>Сертификат НСОПБ</strong> — дополнительная независимая проверка. Группа BIa означает практически нулевое водопоглощение — плитка не боится влаги десятилетиями.</li>
              </ul>
            </div>
          </section>

          {/* Скачать сертификаты */}
          <div className="my-8 rounded-2xl border border-border bg-muted/30 p-6"><div className="flex items-center justify-between mb-5 flex-wrap gap-3"><h2 className="text-xl font-bold text-foreground">Скачать сертификаты Lincer</h2><a href="/downloads" className="text-sm text-primary hover:underline font-medium">Все документы →</a></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://lincer.ru/upload/iblock/fc5/ymfqf50ug6xc08fipph8kfvb6arciwzi/Politika-po-okhrane-okruzhayushchey-sredy.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div><span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">Политика по охране окружающей среды</span></a>
            <a href="https://lincer.ru/upload/iblock/4a5/w50cl4imlfbfok0o7fuds6ljtt3e9uqb/Politika-po-okhrane-truda.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div><span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">Политика по охране труда</span></a>
            <a href="https://lincer.ru/upload/iblock/55d/u9g550uwsv8mh7zvoelj95l867bqud4i/Pozh.sert.-Keramogranit-KKZ.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div><span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">Пожарный сертификат — Керамогранит ККЗ</span></a>
            <a href="https://lincer.ru/upload/iblock/9db/cu9o51a6ah2rrxzl79rsdyavt1o9pyks/Pozh.sert.-Keramogranit-FKZ.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div><span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">Пожарный сертификат — Керамогранит ФКЗ</span></a>
            <a href="https://lincer.ru/upload/iblock/949/mvj32awpbq52j6dfox9bb0f0qtm5ok98/Pozh.sert.-Oblitsovka-FKZ.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div><span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">Пожарный сертификат — Облицовка ФКЗ</span></a>
            <a href="https://lincer.ru/upload/iblock/1be/h7dkgc1otu66a3rhcmni5w4l8ojjgapi/Sertifikat-Keramogranit-KKZ-2023.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div><span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">Сертификат соответствия — Керамогранит ККЗ 2023</span></a>
            <a href="https://lincer.ru/upload/iblock/7b6/ip785bdtrkkuba3xllnwoxfmsetdb3t2/Sertifikat-Keramogranit-FKZ-2023.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div><span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">Сертификат соответствия — Керамогранит ФКЗ 2023</span></a>
            <a href="https://lincer.ru/upload/iblock/14c/bk292o6u61veafwimquebqyrwow24x2v/Sertifikat-Oblitsovka-FKZ.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div><span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">Сертификат соответствия — Облицовка ФКЗ</span></a>
          </div><p className="mt-4 text-xs text-muted-foreground">Актуальные версии всегда доступны на странице{" "}<a href="/downloads" className="text-primary hover:underline">Документы и сертификаты</a>.</p></div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="text-blue-900 font-bold mb-2">Мы — мультибрендовый гипермаркет в СПб</h3>
            <p className="text-blue-800 text-sm">Продаём плитку и керамогранит официально, с полным пакетом сертификатов. Все документы предоставляем по запросу. Звоните: <a href="tel:+79052050900" className="font-bold underline">+7 (905) 205-09-00</a></p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-bold text-foreground mb-4">Читайте также</h3>
          <div className="flex flex-col gap-3">
            <Link href="/blog/kak-ukladyvat-plitku" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Как укладывать плитку своими руками</Link>
            <Link href="/blog/rekomendatsii-po-zatirke" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Рекомендации по затирке швов</Link>
            <Link href="/catalog" className="flex items-center gap-2 text-primary hover:underline"><ChevronRight className="h-4 w-4" />Каталог плитки</Link>
          </div>
        </div>
        <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/plitka-calacatta-belyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/77c/KTL051st.jpg&w=300&output=webp&q=80" alt="Плитка Calacatta белый 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Calacatta белый 30x60</span><span className="mt-2 block text-base font-bold text-foreground">780 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-northwood-bezhevyy-18x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/5b6/C_NW4M012D_1a.jpg&w=300&output=webp&q=80" alt="Керамогранит Northwood бежевый 18x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Northwood бежевый 18x60</span><span className="mt-2 block text-base font-bold text-foreground">1098 ₽/м²</span></div></Link>
                  <Link href="/catalog/mozaika-lofthouse-seryy-28x25" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/1d7/LS6O096.jpg&w=300&output=webp&q=80" alt="Мозаика Lofthouse серый 28x25" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Мозаика Lofthouse серый 28x25</span><span className="mt-2 block text-base font-bold text-foreground">1680 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>      </article>
    </div>
  )
}
