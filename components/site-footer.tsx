import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = {
  catalog: [
    { label: "Керамическая плитка", href: "/catalog?type=keramicheskaya-plitka" },
    { label: "Керамогранит", href: "/catalog?type=keramogranit" },
    { label: "Мозаика", href: "/catalog?type=mozaika" },
    { label: "Ступени", href: "/catalog?type=stupeni" },
  ],
  info: [
    { label: "О компании", href: "#" },
    { label: "Доставка и оплата", href: "#" },
    { label: "Гарантия", href: "#" },
    { label: "Контакты", href: "#" },
  ],
  help: [
    { label: "Как выбрать плитку", href: "#" },
    { label: "Уход за плиткой", href: "#" },
    { label: "Сертификаты", href: "#" },
    { label: "Видеообзоры", href: "#" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-background">Cersanit</span>
                <span className="text-[10px] text-background/50 tracking-widest uppercase">Shop</span>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Официальный дилер керамической плитки Cersanit в России. Более 750 наименований в наличии.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+78123091234" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                +7 (812) 309-12-34
              </a>
              <a href="mailto:info@cersanit-shop.ru" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                info@cersanit-shop.ru
              </a>
              <span className="flex items-center gap-2 text-background/70">
                <MapPin className="h-4 w-4 shrink-0" />
                СПб, п. Янино-1
              </span>
            </div>
          </div>

          {/* Catalog links */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4">Каталог</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.catalog.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4">Информация</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4">Покупателям</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            {"2024-2025 Cersanit Shop. Все права защищены."}
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
