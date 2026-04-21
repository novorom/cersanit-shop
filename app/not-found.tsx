import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Страница не найдена | Керамогранит Опт",
  description: "Страница не найдена. Перейдите в каталог плитки или на главную страницу магазина.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <span className="text-8xl font-bold text-primary/20">404</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Страница не найдена
        </h1>
        <p className="text-muted-foreground mb-8">
          Возможно, страница была удалена или адрес введён неверно.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            На главную
          </Link>
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-accent transition-colors"
          >
            Каталог плитки
          </Link>
        </div>
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Популярные разделы:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/keramogranit-spb" className="text-sm text-primary hover:underline">Керамогранит</Link>
            <Link href="/plitka-dlya-vannoj-spb" className="text-sm text-primary hover:underline">Плитка для ванной</Link>
            <Link href="/mozaika-spb" className="text-sm text-primary hover:underline">Мозаика</Link>
            <Link href="/blog" className="text-sm text-primary hover:underline">Блог</Link>
            <Link href="/delivery" className="text-sm text-primary hover:underline">Доставка</Link>
            <Link href="/contacts" className="text-sm text-primary hover:underline">Контакты</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
