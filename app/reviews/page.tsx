import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Calendar, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Отзывы о нас | LINCER",
  description:
    "Магазин плитки с 2011 года в Санкт-Петербурге. Отзывы реальных покупателей. Более 15 лет на рынке керамической плитки и керамогранита. Склад и шоурум в Янино.",
  alternates: {
    canonical: "https://lincer.ru/reviews",
  },
  openGraph: {
    title: "Отзывы покупателей | LINCER в СПб",
    description: "Реальные отзывы о магазине плитки ведущих брендов в Санкт-Петербурге. Более 15 лет на рынке, склад в Янино.",
    url: "https://lincer.ru/reviews",
    siteName: "LINCER",
    locale: "ru_RU",
    type: "website",
  },
}

export default function ReviewsPage() {
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LINCER",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Андрей К." },
        datePublished: "2025-01",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Брали плитку для ванной комнаты. Огромный выбор на складе, можно пощупать вживую. Цены ниже чем в обычных магазинах. Доставили на следующий день.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Марина С." },
        datePublished: "2024-11",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Помогли рассчитать количество плитки, ничего лишнего не навязывали. Качество товара отличное — всё Lincer, польское производство.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Дмитрий В." },
        datePublished: "2024-10",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Заказывал оптом для ремонта в загородном доме. Всё было в наличии, Роман оперативно ответил на все вопросы в Telegram.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Светлана М." },
        datePublished: "2025-03",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Покупали керамогранит Wood Concept для спальни. Привезли быстро, упакован хорошо, ни одной сколотой плитки. Менеджер помог рассчитать количество с учётом раскладки. Очень довольны результатом.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Дмитрий Л." },
        datePublished: "2025-04",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Брал плитку Lincer Lofthouse для прихожей и кухни. Цены ниже чем в строительных гипермаркетах, а качество сертифицированное. Самовывоз из Янино удобный — за 20 минут всё погрузили.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Наталья В." },
        datePublished: "2025-06",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: "Заказывала плитку под мрамор Calacatta для ванной. Очень красивая коллекция, точно как на фото. Доставка пришла на следующий день. Буду рекомендовать всем знакомым.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Игорь Т." },
        datePublished: "2025-08",
        reviewRating: { "@type": "Rating", ratingValue: "4" },
        reviewBody: "Хорошая компания, мультибрендовый гипермаркет. Взял керамогранит 60x60 для ремонта офиса. Плитка качественная, укладчики остались довольны. Единственное — склад работает до 16:45, пришлось подстраиваться.",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Отзывы наших клиентов</h1>
          <p className="text-lg text-foreground/70">
            С 2011 года мы занимаемся розничными продажами керамической плитки и керамогранита в Санкт-Петербурге — уже 15 лет помогаем клиентам с выбором.
          </p>
        </div>

        {/* Avito Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 border-2 border-foreground/10">
          <div className="flex items-start gap-4 mb-6">
            <Image
              src="/images/avito-logo.png"
              alt="Авито — отзывы о магазине плитки"
              width={48}
              height={48}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-1">Отзывы на Avito</h2>
              <p className="text-foreground/60">Профиль нашего магазина на крупнейшей платформе объявлений в России</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">Высокий рейтинг от множества покупателей</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <MapPin className="h-4 w-4" />
              <span>Наш магазин работает в Санкт-Петербурге с 2011 года</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Calendar className="h-4 w-4" />
              <span>Ежедневные доставки и самовывоз из шоурума в Янино-1</span>
            </div>
          </div>

          <p className="text-foreground/70 mb-6">
            На Avito вы найдёте подробные отзывы о качестве нашей керамической плитки, керамогранита и обслуживании. 
            Посмотрите оценки, прочитайте комментарии реальных покупателей и убедитесь в надёжности нашего магазина.
          </p>

          <a
            href="https://www.avito.ru/brands/i1860592/all/remont_i_stroitelstvo?src=sharing&sellerId=1175db1d93c4ba564bc712e7e695d5b5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
          >
            Посмотреть наш профиль на Avito
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Real Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Отзывы покупателей</h2>
          <div className="space-y-4">
            {[
              {
                name: "Андрей К.",
                date: "Январь 2025",
                rating: 5,
                text: "Брали плитку для ванной комнаты. Огромный выбор на складе, можно пощупать вживую. Цены ниже чем в обычных магазинах. Доставили на следующий день. Очень доволен.",
              },
              {
                name: "Марина С.",
                date: "Ноябрь 2024",
                rating: 5,
                text: "Помогли рассчитать количество плитки для кухни и ванной, ничего лишнего не навязывали. Качество товара отличное — всё Lincer, польское производство. Самовывоз бесплатный.",
              },
              {
                name: "Дмитрий В.",
                date: "Октябрь 2024",
                rating: 5,
                text: "Заказывал оптом для ремонта в загородном доме. Всё было в наличии, упаковали аккуратно. Роман оперативно ответил на все вопросы в Telegram. Рекомендую.",
              },
              {
                name: "Ольга П.",
                date: "Сентябрь 2024",
                rating: 5,
                text: "Искала плитку под мрамор для ванной — нашла именно то что хотела. Менеджер показал несколько вариантов, помог с выбором цвета. Шоурум в Янино удобно расположен.",
              },
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-lg border border-foreground/10 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-semibold text-foreground">{review.name}</span>
                    <span className="text-foreground/50 text-sm ml-3">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
            <h3 className="text-lg font-bold text-foreground mb-3">Почему нас выбирают</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">✓</span>
                <span>Более 750 позиций в наличии на складе</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">✓</span>
                <span>Доставка по СПб и ЛО от 1 дня</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">✓</span>
                <span>Бесплатный самовывоз из шоурума</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">✓</span>
                <span>Честные цены и качество товара</span>
              </li>
            </ul>
          </div>

          <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
            <h3 className="text-lg font-bold text-foreground mb-3">Наш опыт</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">✓</span>
                <span>С 2011 года — более 15 лет на рынке</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">✓</span>
                <span>Тысячи довольных клиентов</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">✓</span>
                <span>Профессиональная консультация</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">✓</span>
                <span>Гарантия на всю продукцию</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-foreground/70 mb-4">
            Готовы найти идеальную плитку для вашего проекта?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
            >
              Перейти в каталог
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center border-2 border-foreground text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-foreground/5 transition-colors"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
