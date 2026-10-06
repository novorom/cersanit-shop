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
    answer: "Откройте карточку товара и уточните у менеджера цену, остаток и условия заказа для нужного объёма. Склад находится в Янино."
  },
  {
    question: "Есть ли доставка плитки по Ленинградской области?",
    answer: "Доставка доступна по Санкт-Петербургу и Ленинградской области. Стоимость и срок зависят от адреса и объёма заказа — уточните их у менеджера."
  },
  {
    question: "Можно ли забрать плитку самовывозом?",
    answer: "Самовывоз доступен со склада в пос. Янино-1. Перед поездкой свяжитесь с менеджером, чтобы подтвердить остаток, готовность заказа и время выдачи."
  },
  {
    question: "Являетесь ли вы официальным дилером?",
    answer: "В каталоге представлены товары разных производителей. Информацию о бренде, документах и гарантии смотрите в карточке товара или запросите у менеджера."
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
              В каталоге представлены коллекции разных производителей. На странице товара можно посмотреть доступные характеристики и остаток, а актуальную цену и условия заказа уточнить у менеджера.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Преимущества работы с Керамогранит Опт</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Каталог с артикулами:</strong> Удобно сверить товар и сообщить менеджеру нужную позицию.</li>
              <li><strong>Склад в Янино:</strong> Перед поездкой можно уточнить наличие и готовность заказа.</li>
              <li><strong>Доставка:</strong> Стоимость и срок рассчитываются по адресу и объёму заказа.</li>
              <li><strong>Выгодные условия:</strong> Работаем как с частными лицами (в розницу), так и с оптовыми покупателями.</li>
            </ul>
            <p>
              Если вы выбираете, где купить плитку или керамогранит в Санкт-Петербурге, начните с каталога: сравните формат, поверхность, бренд и цену. Менеджер поможет проверить наличие и рассчитать количество под ваш объект.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
