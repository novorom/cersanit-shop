"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, FileText } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

const DEFAULT_FAQ: FaqItem[] = [
  {
    question: "Как купить плитку оптом в Санкт-Петербурге?",
    answer: "Для заказа плитки оптом вы можете оформить заявку на сайте или связаться с нашими менеджерами. Мы предлагаем специальные цены для строительных компаний и дизайнеров. Отгрузка производится со склада в Янино."
  },
  {
    question: "Есть ли доставка плитки по Ленинградской области?",
    answer: "Да, мы осуществляем доставку плитки и керамогранита по всему Санкт-Петербургу и Ленинградской области. Сроки доставки составляют 1-2 рабочих дня с момента оплаты заказа."
  },
  {
    question: "Можно ли забрать плитку самовывозом?",
    answer: "Конечно! У нас доступен бесплатный самовывоз со склада в пос. Янино-1. Наши сотрудники помогут с погрузкой товара в ваш транспорт."
  },
  {
    question: "Являетесь ли вы официальным дилером?",
    answer: "Да, Керамогранит Опт — официальный поставщик ведущих заводов (Azori, Gracia Ceramica, Cersanit, Kerama Marazzi). Мы гарантируем оригинальное качество и прямые поставки без посредников."
  }
]

export function SeoBlocks() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mt-16 space-y-12">
      {/* FAQ Section */}
      <section className="bg-background rounded-2xl border border-border p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Часто задаваемые вопросы</h2>
        </div>
        
        <div className="space-y-3">
          {DEFAULT_FAQ.map((item, index) => (
            <div key={index} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground">{item.question}</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEO Text Block */}
      <section className="prose prose-sm prose-slate max-w-none bg-muted/30 rounded-2xl border border-border p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground m-0">Плитка и керамогранит оптом и в розницу в СПб</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Широкий каталог с ценами и фото</h3>
            <p>
              В нашем интернет-магазине представлен огромный выбор керамической плитки и керамогранита для любых задач. Мы предлагаем решения для ванной комнаты, кухни, пола в жилых и коммерческих помещениях. Весь ассортимент сопровождается актуальными ценами, качественными фотографиями и подробными техническими характеристиками.
            </p>
            <p>
              Мы работаем напрямую с такими гигантами индустрии, как Kerama Marazzi, Azori и Gracia Ceramica, что позволяет нам поддерживать конкурентные цены и гарантировать постоянное наличие популярных коллекций на складе в Янино.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Преимущества работы с Керамогранит Опт</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Официальный дилер:</strong> Прямые поставки с заводов гарантируют подлинность товара.</li>
              <li><strong>Собственный склад:</strong> Быстрая отгрузка и возможность забрать товар в день оплаты.</li>
              <li><strong>Логистика:</strong> Доставка по Санкт-Петербургу и Ленинградской области собственным транспортом.</li>
              <li><strong>Выгодные условия:</strong> Работаем как с частными лицами (в розницу), так и с оптовыми покупателями.</li>
            </ul>
            <p>
              Если вы ищете, где купить плитку в СПб недорого и с гарантией качества, Керамогранит Опт — ваш надежный партнер. Мы поможем рассчитать необходимое количество и подберем оптимальный вариант под ваш бюджет.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
