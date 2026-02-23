import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, ShieldCheck, Award, ChevronRight } from "lucide-react"
import { categories, collections, products } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"

export default function HomePage() {
  const popularProducts = products.filter((p) => p.is_bestseller).slice(0, 8)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[520px] lg:h-[600px] overflow-hidden">
        <Image
          src="/images/hero-bathroom.jpg"
          alt="Современный интерьер ванной комнаты с керамической плиткой Cersanit"
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
              Керамическая плитка для вашего дома
            </h1>
            <p className="text-lg text-background/70 leading-relaxed max-w-md">
              Более 750 наименований плитки Cersanit в наличии на складе в Янино. Доставка по всей России.
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
                  <span className="text-sm text-background/60 mt-0.5 block">
                    {category.count} товаров
                  </span>
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
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/catalog?collection=${collection.slug}`}
                className="group snap-start shrink-0 w-56 lg:w-64 flex flex-col rounded-xl border border-border overflow-hidden bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="256px"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <span className="text-sm text-muted-foreground mt-0.5 block">
                    {collection.product_count} товаров
                  </span>
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
                description: "Прямые поставки с заводов Cersanit. Гарантия подлинности каждого товара.",
              },
              {
                icon: Truck,
                title: "Доставка по РФ",
                description: "Собственный склад в Янино (СПб). Отгрузка в течение 1-2 рабочих дней.",
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
              href="tel:+78123091234"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-medium text-sm hover:bg-background/90 transition-colors"
            >
              Позвонить нам
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
    </div>
  )
}
