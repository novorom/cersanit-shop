import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SITE_URL = "https://lincer.ru"

export const metadata: Metadata = {
  title: "Дизайн ванной в стиле лофт: плитка под бетон и кирпич | LINCER СПб",
  description: "Создайте ванную в стиле лофт с плиткой под бетон и кирпич от Lincer. Советы дизайна в Санкт-Петербурге. Официальный дилер в Янино.",
  alternates: { canonical: `${SITE_URL}/blog/kak-sozdat-dizajn-vannoj-v-stile-loft` },
  openGraph: { 
    title: "Дизайн ванной в стиле лофт: плитка под бетон и кирпич | LINCER СПб",
    url: `${SITE_URL}/blog/kak-sozdat-dizajn-vannoj-v-stile-loft`, 
    siteName: "LINCER", 
    locale: "ru_RU", 
    type: "article" 
  },
}

export default function Article() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Дизайн ванной в стиле лофт: плитка под бетон и кирпич", publisher: { "@type": "Organization", name: "LINCER", url: "https://lincer.ru" }, mainEntityOfPage: "https://lincer.ru/blog/kak-sozdat-dizajn-vannoj-v-stile-loft", datePublished: "2025-10-15", author: { "@type": "Organization", name: "LINCER" } }) }} />
      <article className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/">Главная</Link>
            <ChevronRight size={16} />
            <Link href="/blog">Блог</Link>
            <ChevronRight size={16} />
            <span>Дизайн ванной в стиле лофт</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-6">Дизайн ванной в стиле лофт: плитка под бетон и кирпич</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Что такое стиль лофт и почему он популярен в ванных</h2>
          <p className="text-base leading-7 mb-4">
            Стиль лофт пришёл из Нью-Йорка и завоевал сердца дизайнеров по всему миру, включая Санкт-Петербург. Этот направление характеризуется использованием открытых пространств, необработанных материалов и индустриальной эстетики. В ванной комнате лофт создаёт атмосферу творчества и современности, избегая излишней глянцевости.
          </p>
          <p className="text-base leading-7 mb-4">
            Плитка под бетон и кирпич становятся идеальным выбором для воплощения этого стиля. Она легко имитирует фактуру настоящих материалов, при этом обеспечивая надёжность и влагостойкость, необходимые для ванной. Многие жители Санкт-Петербурга выбирают именно эту облицовку, чтобы создать уникальный интерьер, который выражает их индивидуальность.
          </p>
          <p className="text-base leading-7">
            Лофт в ванной — это не просто тренд, а возможность создать функциональное и стильное пространство, которое будет радовать вас каждый день.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Плитка под бетон: практичность и эстетика</h2>
          <p className="text-base leading-7 mb-4">
            Плитка под бетон — один из главных элементов в дизайне ванной лофт. Она имитирует поверхность полированного или грубого бетона, создавая ощущение промышленности и минимализма. Такая плитка отлично подходит как для стен, так и для пола ванной комнаты.
          </p>
          <p className="text-base leading-7 mb-4">
            В нашем магазине в Санкт-Петербурге вы найдёте широкий выбор плитки под бетон. Эта плитка отличается высоким качеством, устойчивостью к влаге и простотой в уходе. Цветовая палитра варьируется от светло-серого до тёмного графита, что позволяет выбрать подходящий оттенок под ваше видение.
          </p>
          <p className="text-base leading-7">
            Преимущества плитки под бетон: долговечность, стойкость к царапинам, легкость очистки, универсальность в комбинировании с другими материалами. Она прекрасно работает как в качестве основного покрытия, так и в виде акцентных вставок.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Кирпичная кладка в интерьере ванной</h2>
          <p className="text-base leading-7 mb-4">
            Плитка под кирпич добавляет в ванную лофт изюминку и подлинный индустриальный шарм. Красный, белый или чёрный кирпич визуально разбивает монотонность и создаёт текстурный контраст с гладкой плиткой под бетон.
          </p>
          <p className="text-base leading-7 mb-4">
            В Санкт-Петербурге и районе Янино наши клиенты часто выбирают кирпичную плитку для создания акцентной стены за раковиной или ванной. Это привлекает внимание, становится центральным элементом дизайна. Официальный дилер ведущих брендов предлагает различные размеры и оттенки кирпичной плитки, от классических до современных вариантов.
          </p>
          <p className="text-base leading-7">
            Кирпичная плитка практична в ванной: её поверхность имеет структуру, которая обеспечивает хорошее сцепление, что важно при использовании на полу. Комбинируя кирпич с бетоном, вы получаете идеальный баланс между эстетикой и функциональностью.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Как комбинировать плитку для идеального результата</h2>
          <p className="text-base leading-7 mb-4">
            Успех лофт дизайна ванной зависит от правильного сочетания различных видов плитки. Основное правило: используйте плитку под бетон как базовое покрытие стен и пола, а плитку под кирпич — для акцентов.
          </p>
          <p className="text-base leading-7 mb-4">
            Вот несколько проверенных схем комбинирования: светлый бетон на полу и одной стене, красный или белый кирпич на другой стене; тёмный бетон везде, светлый кирпич как граница; комбинированная мозаика из обоих материалов на стене с душевой.
          </p>
          <p className="text-base leading-7">
            При выборе в магазине ведущих брендов в Санкт-Петербурге обратитесь к нашим консультантам — они помогут подобрать идеальное сочетание. Мы работаем в районе Янино и предлагаем доставку по всему городу. Не бойтесь экспериментировать: лофт приветствует смелые решения!
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Завершающие штрихи: аксессуары и мебель</h2>
          <p className="text-base leading-7 mb-4">
            Правильная плитка — это основа, но завершённый вид ванной лофт зависит от деталей. Чтобы подчеркнуть индустриальный стиль, выбирайте металлические аксессуары: никель, нержавеющая сталь или чёрный металл.
          </p>
          <p className="text-base leading-7 mb-4">
            Мебель должна быть функциональной и минималистичной. Полки из дерева или стекла, простые линии без орнаментов, открытые трубы — всё это гармонирует с плиткой под бетон. Освещение — важный элемент: потолочные светильники в виде фабричных ламп отлично дополняют лофт эстетику.
          </p>
          <p className="text-base leading-7">
            Жители Санкт-Петербурга, которые заказали плитку Lincer для своих ванных, часто говорят, что правильно выбранные аксессуары помогли им завершить образ. Наш официальный дилер в Янино готов не только помочь с выбором плитки, но и дать советы по оформлению всего интерьера.
          </p>
        </section>
                <div className="mt-6 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">По теме</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/plitka-pod-beton-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка под бетон в СПб</Link>
              <Link href="/plitka-seraya-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Серая плитка в СПб</Link>
              <Link href="/plitka-dlya-vannoj-spb" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all text-sm text-foreground font-medium">Плитка для ванной в СПб</Link>
            </div>
          </div>
          <section className="mt-8">
                <h3 className="text-base font-semibold text-foreground mb-4">Товары из этой статьи</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/catalog/mozaika-lofthouse-seryy-28x25" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/1d7/LS6O096.jpg&w=300&output=webp&q=80" alt="Мозаика Lofthouse серый 28x25" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Мозаика Lofthouse серый 28x25</span><span className="mt-2 block text-base font-bold text-foreground">1680 ₽/м²</span></div></Link>
                  <Link href="/catalog/keramogranit-soft-concrete-svetlo-seryy-60x120" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/068/gcqu8u24rft50mgxzpbijnh33k074vg0/A17122_01.jpg&w=300&output=webp&q=80" alt="Керамогранит Soft Concrete 60x120" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Керамогранит Soft Concrete 60x120</span><span className="mt-2 block text-base font-bold text-foreground">2213 ₽/м²</span></div></Link>
                  <Link href="/catalog/plitka-deco-chernyy-30x60" className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"><div className="relative aspect-square overflow-hidden bg-muted"><img src="https://images.weserv.nl/?url=https://pvi.lincer.ru/upload/uf/b22/DEL232.jpg&w=300&output=webp&q=80" alt="Плитка Deco черный 30x60" className="w-full h-full object-cover" loading="lazy" /></div><div className="p-3"><span className="text-xs text-muted-foreground line-clamp-2">Плитка Deco черный 30x60</span><span className="mt-2 block text-base font-bold text-foreground">750 ₽/м²</span></div></Link>
                </div>
                <Link href="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline font-medium">Весь каталог →</Link>
              </section>        </article>
    </div>
  )
}