import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Download, FileText, Shield, Cpu, BookOpen } from "lucide-react"
const SITE_URL = "https://cersanit-spb.ru"
export const metadata: Metadata = {
  title: "Документы и сертификаты Lincer — скачать бесплатно | Керамогранит Опт",
  description: "Бесплатные материалы Lincer: сертификаты качества, инструкции по укладке, программа 3D-визуализации Ceramic 3D Web. Официальный дилер в Санкт-Петербурге.",
  alternates: { canonical: `${SITE_URL}/downloads` },
  openGraph: { title: "Документы и сертификаты Lincer", url: `${SITE_URL}/downloads`, siteName: "Керамогранит Опт", locale: "ru_RU", type: "website" },
}
const sections = [
  {
    icon: Shield,
    title: "Сертификаты качества",
    desc: "Вся продукция Lincer имеет требуемые законодательством РФ гигиенические сертификаты и знаки соответствия. Подробнее о сертификатах читайте в нашей статье.",
    items: [
      { name: "Политика по охране окружающей среды", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/fc5/ymfqf50ug6xc08fipph8kfvb6arciwzi/Politika-po-okhrane-okruzhayushchey-sredy.pdf", ext: true },
      { name: "Политика по охране труда", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/4a5/w50cl4imlfbfok0o7fuds6ljtt3e9uqb/Politika-po-okhrane-truda.pdf", ext: true },
      { name: "Пожарный сертификат — Керамогранит ККЗ", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/55d/u9g550uwsv8mh7zvoelj95l867bqud4i/Pozh.sert.-Keramogranit-KKZ.pdf", ext: true },
      { name: "Пожарный сертификат — Керамогранит ФКЗ", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/9db/cu9o51a6ah2rrxzl79rsdyavt1o9pyks/Pozh.sert.-Keramogranit-FKZ.pdf", ext: true },
      { name: "Пожарный сертификат — Облицовка ФКЗ", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/949/mvj32awpbq52j6dfox9bb0f0qtm5ok98/Pozh.sert.-Oblitsovka-FKZ.pdf", ext: true },
      { name: "Сертификат соответствия — Керамогранит ККЗ 2023", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/1be/h7dkgc1otu66a3rhcmni5w4l8ojjgapi/Sertifikat-Keramogranit-KKZ-2023.pdf", ext: true },
      { name: "Сертификат соответствия — Керамогранит ФКЗ 2023", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/7b6/ip785bdtrkkuba3xllnwoxfmsetdb3t2/Sertifikat-Keramogranit-FKZ-2023.pdf", ext: true },
      { name: "Сертификат соответствия — Облицовка ФКЗ", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/14c/bk292o6u61veafwimquebqyrwow24x2v/Sertifikat-Oblitsovka-FKZ.pdf", ext: true },
    ],
  },
  {
    icon: Cpu,
    title: "Программы для 3D-визуализации",
    desc: "Создайте дизайн своей ванной или кухни с плиткой Lincer до начала ремонта — бесплатно.",
    items: [
      { name: "Ceramic 3D Web — программа для создания 3D-интерьеров с плиткой Lincer", format: "EXE", url: "https://cersanit-spb.ru/upload/files/ceramic3d_SetupRus.exe", ext: true, highlight: true },
    ],
  },
  {
    icon: BookOpen,
    title: "Инструкции по укладке",
    desc: "Официальные инструкции Lincer для профессионалов и самостоятельной укладки.",
    items: [
      { name: "Инструкция по укладке керамогранита", format: "Статья", url: "/blog/kak-ukladyvat-plitku", ext: false },
      { name: "Инструкция по укладке керамической мозаики на сетке", format: "Статья", url: "/blog/kak-ukladyvat-mozaiku", ext: false },
      { name: "Рекомендации по затирке швов", format: "Статья", url: "/blog/rekomendatsii-po-zatirke", ext: false },
    ],
  },
  {
    icon: FileText,
    title: "Каталоги продукции",
    desc: "Актуальный ассортимент плитки с характеристиками и изображениями.",
    items: [
      { name: "Онлайн-каталог нашего склада — все товары в наличии", format: "Онлайн", url: "/catalog", ext: false, highlight: true },
      { name: "Каталог коллекций Lincer с описаниями", format: "Онлайн", url: "/collections", ext: false },
      { name: "Каталог Lincer 2024–2025 (PDF)", format: "PDF", url: "https://cersanit-spb.ru/upload/iblock/66f/s1vcj280vz582d3zfif1takjhbrwaa35/Lincer_2d_2024_2025_light.pdf", ext: true },
    ],
  },
]
export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Документы и загрузки</span>
          </nav>
        </div>
      </div>
      <section className="bg-primary text-primary-foreground py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Документы, сертификаты и программы</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">Официальные материалы Lincer: сертификаты качества, инструкции по укладке и бесплатные программы для 3D-визуализации интерьера.</p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-4 py-12 lg:py-16">
        <div className="flex flex-col gap-10">
          {sections.map(section => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.desc}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-13">
                {section.items.map(item => (
                  <a key={item.name}
                    href={item.url}
                    target={item.ext ? "_blank" : undefined}
                    rel={item.ext ? "noopener noreferrer" : undefined}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-sm group ${item.highlight ? "border-primary/30 bg-primary/5 hover:border-primary/50" : "border-border bg-card hover:border-primary/30"}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <Download className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                      <span className={`text-sm font-medium leading-snug ${item.highlight ? "text-primary" : "text-foreground"}`}>{item.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full ml-3 shrink-0">{item.format}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-muted/50 rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-2">О программе Ceramic 3D Web</h3>
          <p className="text-foreground/70 text-sm leading-relaxed mb-4">
            Ceramic 3D Web — бесплатная программа Lincer для создания 3D-проектов интерьера с реальными коллекциями плитки. Интуитивно понятный интерфейс: подходит не только дизайнерам, но и обычным покупателям.
            Ассортимент обновляется автоматически при появлении новых коллекций. Программа позволяет смоделировать ванную или кухню за несколько минут и сразу понять, как будет смотреться та или иная плитка.
          </p>
          <p className="text-foreground/70 text-sm leading-relaxed">
            После загрузки программы с сайта cersanit-spb.ru вы получите доступ ко всем коллекциям, включая те, которые есть в нашем каталоге: Wood Concept, Calacatta, Lofthouse, Deep Calacatta и другие.
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Не нашли нужный документ? Свяжитесь с нами</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+79052050900" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              +7 (905) 205-09-00
            </a>
            <Link href="/catalog" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-xl font-medium hover:bg-muted transition-colors">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
      {/* Ссылка на статью блога */}
      <div className="mx-auto max-w-4xl mt-8 mb-4 px-4">
        <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-muted/30 hover:border-primary transition-colors">
          <div className="flex-shrink-0 text-3xl">📖</div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Статья по теме</p>
            <a href="/blog/sertifikaty-kachestva" className="font-semibold text-foreground hover:text-primary transition-colors">
              Сертификаты качества Lincer — что они означают и зачем нужны
            </a>
            <p className="text-sm text-muted-foreground mt-1">Узнайте, какие стандарты подтверждают качество плитки</p>
          </div>
        </div>
      </div>
    </div>
  )
}
