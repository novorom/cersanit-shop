import Link from 'next/link'
import { ExternalLink, Award, MapPin, Package } from 'lucide-react'

const SITE_URL = 'https://www.opt-plitki-spb.ru'

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "О компании", item: `${SITE_URL}/about` },
  ],
}

export const metadata = {
  title: 'О магазине плитки и керамогранита в Санкт-Петербурге | Керамогранит Опт',
  description: 'Керамогранит Опт: каталог плитки и керамогранита, склад и шоурум в Янино-1. Контакты, адрес, самовывоз и доставка по Санкт-Петербургу и области.',
  alternates: { canonical: 'https://www.opt-plitki-spb.ru/about' },
  openGraph: {
    title: 'О магазине Керамогранит Опт в Санкт-Петербурге',
    description: 'Каталог плитки и керамогранита, склад и шоурум в Янино-1, контакты и условия получения заказа.',
    url: 'https://www.opt-plitki-spb.ru/about',
    siteName: 'Керамогранит Опт',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function AboutPage() {
  const jsonLd = breadcrumbSchema
  const manufacturers = [
    { name: 'Lincer', country: 'Польша' },
    { name: 'Шахтинская плитка (GraciaCeramica)', country: 'Россия' },
    { name: 'Нефрит-керамика', country: 'Россия' },
    { name: 'Квадро-Декор', country: 'Россия' },
    { name: 'Керама-Марацци', country: 'Россия' },
    { name: 'Азори (Керабуд)', country: 'Россия' },
    { name: 'Уральский гранит (Idalgo)', country: 'Россия' },
    { name: 'Керамика Будущего', country: 'Россия' },
    { name: 'Granitea (Гранитея)', country: 'Россия' },
    { name: 'Daco', country: 'Дагестан' },
  ]

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-foreground">О компании</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              О нашей компании
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Керамогранит Опт — магазин плитки и керамогранита в Санкт-Петербурге. В каталоге собраны товары разных производителей; параметры, цена и остаток указаны в карточке каждой позиции или уточняются у менеджера.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Наша история
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Магазин помогает подобрать керамическую плитку и керамогранит для ремонта и строительных объектов. В каталоге доступны параметры и артикулы товаров, а менеджер поможет проверить остаток, уточнить условия и рассчитать объём.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Наша миссия — сделать процесс выбора плитки простым и приятным, предоставляя широкий ассортимент продукции, справедливые цены и компетентную консультацию.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/20">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Award className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                <h3 className="font-semibold text-foreground mb-2">Самовывоз в Янино-1</h3>
                <p className="text-sm text-muted-foreground">Склад и шоурум в Ленинградской области</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Package className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                <h3 className="font-semibold text-foreground mb-2">Разные производители</h3>
                <p className="text-sm text-muted-foreground">Бренд и характеристики указаны в карточке товара</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
            Отзывы наших клиентов
          </h2>
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-border shadow-sm">
            <p className="text-lg text-muted-foreground mb-6">
              Посмотрите отзывы о нашей компании на Avito. Они помогут вам узнать о качестве нашего сервиса и товара от реальных клиентов.
            </p>
            <Link
              href="https://www.avito.ru/brands/i1860592?src=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Смотреть отзывы на Avito
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Manufacturers Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Наши партнеры
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Мы работаем с ведущими производителями керамической плитки и керамогранита, предоставляя вам широкий выбор качественных товаров по справедливым ценам.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {manufacturers.map((manufacturer, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {manufacturer.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {manufacturer.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Каталог</div>
              <p className="text-sm text-muted-foreground">Остатки проверяйте в карточках товаров</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Самовывоз</div>
              <p className="text-sm text-muted-foreground">Получение заказа со склада в Янино</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">СПб и ЛО</div>
              <p className="text-sm text-muted-foreground">Стоимость и срок доставки рассчитаем по адресу</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">0 руб</div>
              <p className="text-sm text-muted-foreground">Бесплатный самовывоз со склада</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Content Section */}
      <section className="py-16 lg:py-24 bg-muted/20">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center italic">Почему выбирают гипермаркет Керамогранит Опт?</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              В нашем интернет-магазине представлен полный каталог продукции ведущих брендов: от классической керамической плитки Lincer и Kerama Marazzi до современных коллекций Lincer и Idalgo. Мы тщательно отбираем коллекции, ориентируясь на актуальные тренды дизайна интерьеров 2025-2026 годов.
            </p>
            <p>
              Наличие собственного склада в Янино-1 позволяет нам поддерживать постоянный запас популярных позиций. Это значит, что вам не нужно ждать доставки месяц — большинство заказов готовы к отгрузке или самовывозу уже на следующий рабочий день. На складе работает бригада профессиональных грузчиков, которые бесплатно загрузят ваш товар.
            </p>
            <p>
              Мы работаем как с розничными покупателями, так и с дизайнерами и строительными компаниями. Для каждого клиента мы предлагаем индивидуальный подход и профессиональный расчет необходимого количества материала, учитывая особенности раскладки и запаса на подрезку.
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Склад и шоурум в Янино
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Адрес и проезд</h3>
                    <p className="text-muted-foreground">
                      Санкт-Петербург, пос. Янино-1, Заводская улица, 37. Мы находимся в непосредственной близости от КАД, что обеспечивает удобный подъезд для любого транспорта.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Package className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Услуги доставки и загрузки</h3>
                    <p className="text-muted-foreground">
                      Наша служба доставки работает по всему Санкт-Петербургу и Ленинградской области. При самовывозе со склада в Янино мы осуществляем бесплатную механизированную или ручную загрузку в ваш автомобиль.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-primary/20 h-full min-h-96">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A15f73d9cde69a1b0f7e5bde18a8baee70c66c2e28d70cdd32f41f6d0e2f3c55&amp;source=constructor"
                width="100%"
                height="400"
                frameBorder="0"
                title="Склад гипермаркета Керамогранит Опт в Янино — Яндекс Карты"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Готовы найти идеальную плитку?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Посетите наш каталог, выберите понравившиеся товары и свяжитесь с нами для подробной консультации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors"
            >
              Перейти в каталог
            </Link>
            <Link
              href="/delivery"
              className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              Информация о доставке
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
