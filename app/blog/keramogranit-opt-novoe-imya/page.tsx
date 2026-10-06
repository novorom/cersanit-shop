import Link from "next/link"
import { COMPANY_NAME, SITE_URL } from "@/lib/seo-data"

export const metadata = {
  title: `Керамогранит Опт — ваш надежный поставщик плитки в Санкт-Петербурге`,
  description: `Почему выгодно покупать плитку и керамогранит в магазине ${COMPANY_NAME}. Склад в Янино, оптовые цены и быстрая доставка.`,
}

export default function BlogBrandPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 prose prose-slate lg:prose-lg">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6">{COMPANY_NAME} — новое имя на рынке плитки в СПб</h1>
      
      <p className="lead text-lg text-muted-foreground mb-8">
        Мы рады представить вам наш обновленный бренд — <strong>{COMPANY_NAME}</strong>. 
        Наш магазин специализируется на оптовой и розничной продаже керамической плитки, 
        керамогранита и сопутствующих товаров напрямую от ведущих заводов.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Почему выбирают нас?</h2>
      <p>
        Рынок отделочных материалов в Санкт-Петербурге перенасыщен предложениями, но найти 
        надежного поставщика с реальным наличием на складе по-прежнему непросто. 
        {COMPANY_NAME} решает эту проблему.
      </p>

      <ul className="space-y-4 my-8">
        <li>
          <strong>Собственный склад в Янино:</strong> Мы не просто перекупщики. Большинство товаров, 
          представленных в каталоге, физически находятся на нашем складе. Вы можете приехать, 
          посмотреть образцы и забрать заказ в тот же день.
        </li>
        <li>
          <strong>Прямые контракты:</strong> Мы работаем с такими брендами как Lincer, 
          Kerama Marazzi, Cersanit и Gracia Ceramica. Это позволяет нам держать цены на уровне 
          крупных оптовых баз.
        </li>
        <li>
          <strong>Оперативная доставка:</strong> Благодаря собственному транспорту и налаженной 
          логистике, мы доставляем плитку по СПб и Ленинградской области в течение 1-2 дней.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Наш ассортимент</h2>
      <p>
        В нашем каталоге вы найдете более 10 000 наименований товаров:
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <li><Link href="/catalog?product_type=Керамогранит" className="text-primary hover:underline">Керамогранит под дерево и мрамор</Link></li>
        <li><Link href="/catalog?product_type=Керамическая плитка" className="text-primary hover:underline">Плитка для ванной и кухни</Link></li>
        <li><Link href="/catalog?product_type=Мозаика" className="text-primary hover:underline">Дизайнерская мозаика на сетке</Link></li>
        <li><Link href="/catalog?product_type=Ступени" className="text-primary hover:underline">Ступени для лестниц</Link></li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Как нас найти?</h2>
      <p>
        Наш офис и склад расположены по адресу: <strong>Ленинградская область, п. Янино-1, участок 37</strong>. 
        Мы работаем ежедневно с 10:00 до 17:00.
      </p>
      
      <div className="bg-muted p-6 rounded-xl border border-border mt-12">
        <h3 className="text-xl font-bold mb-2">Готовы сделать заказ?</h3>
        <p className="mb-4">Позвоните нам для расчета необходимого количества плитки и уточнения остатков на складе.</p>
        <Link href="/contacts" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
          Связаться с нами
        </Link>
      </div>
    </article>
  )
}
