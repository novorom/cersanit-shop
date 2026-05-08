"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, ShieldCheck, Award, ChevronRight } from "lucide-react"
import { categories } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"
import { useProducts } from "@/lib/products-context"

const homeFaq = [
  {
    question: "Вы продаете плитку разных брендов?",
    answer:
      "Да, мы являемся мультибрендовым дилером (Lincer, Kerama Marazzi, Lincer, Gracia Ceramica, Idalgo и др.). Все товары поставляются напрямую с заводов, имеют сертификаты качества и гарантию производителя.",
  },
  {
    question: "Где находится ваш склад?",
    answer:
      "Наш склад расположен в п. Янино-1, Ленинградская область (15-20 минут от КАД). Здесь хранится весь ассортимент -- более 750 наименований. Режим работы: Пн-Пт 10:00-16:45. Приезжайте, чтобы увидеть плитку вживую.",
  },
  {
    question: "Как быстро доставляете по Санкт-Петербургу?",
    answer:
      "Доставка по СПб и Ленинградской области -- от 1-2 рабочих дней. Самовывоз со склада Янино бесплатный в день оплаты. Мы сами загружаем плитку в ваш транспорт.",
  },
  {
    question: "Помогаете рассчитать количество плитки?",
    answer:
      "Да, мы бесплатно рассчитаем нужное количество плитки по размерам вашего помещения. Свяжитесь с нами по телефону +7 (905) 205-09-00 или в Telegram @flyroman.",
  },
  {
    question: "Работаете с юридическими лицами?",
    answer:
      "Да, работаем с юридическими лицами и строительными компаниями. Предоставляем все документы: сертификаты качества, счета-фактуры, товарные накладные. Оплата по безналичному расчёту с НДС.",
  },
]

const TOP_COLLECTIONS = [
  { id: 1, name: "Scarlett", slug: "scarlett", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/463/400_400_1/46351b2a080c05738c5bb5478cf5a888.webp" },
  { id: 2, name: "ML4A093", slug: "ml4a093", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/52a/400_400_1/hgdawantgiuobgrcedhpcdzxuw9c74vg.webp" },
  { id: 3, name: "KM6060G0432R", slug: "km6060g0432r", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/a23/400_400_1/qaogznk3rafoy1cxgitbnhky1qmd32ix.webp" },
  { id: 4, name: "FS4R452", slug: "fs4r452", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/693/400_400_1/sutzkomzee6v5vlro7abqmta8c1xe0hm.webp" },
  { id: 5, name: "SG701590R", slug: "sg701590r", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/iblock/598/8vx15hmo786thu21kktqxhxg7j6firyu.webp" },
  { id: 6, name: "SG526520R", slug: "sg526520r", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/c06/400_400_1/2icltbmwudr3p35wuoammfu10ltoiko8.webp" },
  { id: 7, name: "Dako", slug: "dako", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/c10/400_400_1/608m1icvhds3rbw6ykn5p9di4g2x4f78.webp" },
  { id: 8, name: "A17914", slug: "a17914", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/09d/400_400_1/z38ajz4tn8ijg0ftrlvjvu6n0oz0jvuu.webp" },
  { id: 9, name: "DD200620R", slug: "dd200620r", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/ec3/400_400_1/4ule6tpom5do2c6jq3mpc3uwmkznncuu.webp" },
  { id: 10, name: "Лейла", slug: "лейла", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/49f/400_400_1/49f16f29896a552fde9366a2401c2e80.webp" },
  { id: 11, name: "Armani", slug: "armani", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/58b/400_400_1/lgrm6gv4ntazjgykj4dmob7bylt7zum0.webp" },
  { id: 12, name: "Camelot", slug: "camelot", image: "https://cersanit-spb.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/91d/400_400_1/91df86fbe33980a6272cac31af9d41ad.webp" }
]

export function HomeContent() {
  const { products } = useProducts()
  const popularProducts = products.filter((p) => p.is_bestseller).slice(0, 8)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[520px] lg:h-[600px] overflow-hidden">
        <Image
          src="/images/hero-bathroom.jpg"
          alt="Современный интерьер ванной комнаты с керамической плиткой Lincer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 h-full flex items-center">
          <div className="max-w-xl flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-sm font-medium text-background/80 tracking-wide uppercase">
                Официальный дилер
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-background leading-tight text-balance">
              Керамическая плитка и керамогранит в Санкт-Петербурге
            </h1>
            <p className="text-lg text-background/70 leading-relaxed max-w-md">
              Оптовый гипермаркет Керамогранит Опт. Более 2000 наименований в наличии на складе. Доставка по СПб и ЛО от 1 дня.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Перейти в каталог
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background/10 text-background font-medium text-sm backdrop-blur-sm border border-background/20 hover:bg-background/20 transition-colors"
              >
                Категории товаров
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 lg:py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-8 lg:mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                Категории товаров
              </h2>
              <p className="mt-2 text-muted-foreground">
                Широкий ассортимент керамической продукции
              </p>
            </div>
            <Link
              href="/catalog"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Весь каталог
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?product_type=${encodeURIComponent(category.name)}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[3/4]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <h3 className="text-base lg:text-lg font-semibold text-background text-balance">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/catalog"
            className="sm:hidden flex items-center justify-center gap-1 mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Весь каталог
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-8 lg:mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                Популярные товары
              </h2>
              <p className="mt-2 text-muted-foreground">Лучшие предложения по отзывам покупателей</p>
            </div>
            <Link
              href="/catalog"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Все товары
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {popularProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-8 lg:mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                Коллекции
              </h2>
              <p className="mt-2 text-muted-foreground">
                Дизайнерские серии для создания единого стиля
              </p>
            </div>
            <Link
              href="/collections"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Все коллекции
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {TOP_COLLECTIONS.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group snap-start shrink-0 w-56 lg:w-64 flex flex-col rounded-xl border border-border overflow-hidden bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={`https://images.weserv.nl/?url=${collection.image.replace("https://","")}&w=512&output=webp&q=80&il`}
                    alt={collection.name}
                    fill
                    priority={collection.id <= 4}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="256px"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-10 lg:mb-12 text-balance">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Award,
                title: "Официальный дилер",
                description: "Прямые поставки от ведущих заводов. Гарантия подлинности каждого товара.",
              },
              {
                icon: Truck,
                title: "Доставка по СПб и ЛО",
                description: "Собственный склад в Янино. Доставка по Санкт-Петербургу от 1 дня. Самовывоз бесплатно.",
              },
              {
                icon: ShieldCheck,
                title: "Гарантия качества",
                description: "Вся продукция сертифицирована. Обмен и возврат в течение 14 дней.",
              },
            ].map((advantage) => (
              <div
                key={advantage.title}
                className="flex flex-col items-center text-center gap-4 p-6 lg:p-8 rounded-xl border border-border bg-card"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <advantage.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Text Block */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 text-balance">
              Мультибрендовый гипермаркет плитки Керамогранит Опт в Санкт-Петербурге
            </h2>
            <div className="flex flex-col gap-4 text-foreground/80 leading-relaxed">
              <p>
                Керамогранит Опт -- специализированный интернет-магазин керамической плитки и керамогранита в Санкт-Петербурге. Мы обеспечиваем жителей СПб и Ленинградской области качественной продукцией от крупнейших производителей (Kerama Marazzi, Lincer, Idalgo, Gracia Ceramica и др.). Наш склад позволяет поддерживать в наличии тысячи наименований.
              </p>
              <p>
                В каталоге представлены все основные категории: керамическая плитка для ванной и кухни, керамогранит под дерево, мрамор и бетон, мозаика на сетке, ступени и плинтуса. Все товары сертифицированы и соответствуют российским стандартам качества.
              </p>
              <p>
                Мы предлагаем удобные условия покупки: бесплатный самовывоз со склада в Янино с погрузкой в ваш транспорт, доставку по Санкт-Петербургу и Ленинградской области от 1 рабочего дня, а также отправку по всей России транспортными компаниями. Для строительных компаний и юридических лиц -- работа по безналичному расчёту с НДС.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-balance">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-3xl flex flex-col gap-4">
            {homeFaq.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-foreground font-medium hover:bg-muted/50 transition-colors">
                  <span className="pr-4">{item.question}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-foreground/80 leading-relaxed text-sm">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4 text-balance">
            Нужна консультация?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Наши специалисты помогут подобрать плитку для вашего проекта и рассчитают необходимое количество.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+79052050900"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors"
            >
              +7 (905) 205-09-00
            </a>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              Открыть каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
