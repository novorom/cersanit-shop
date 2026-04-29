"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Logo } from "./logo"

const footerLinks = {
  catalog: [
    { label: "Керамическая плитка", href: "/catalog?product_type=Керамическая плитка" },
    { label: "Керамогранит", href: "/catalog?product_type=Керамогранит" },
    { label: "Мозаика", href: "/catalog?product_type=Мозаика" },
    { label: "Ступени", href: "/catalog?product_type=Ступени" },
  ],
  info: [
    { label: "О компании", href: "/about" },
    { label: "Отзывы", href: "/reviews" },
    { label: "Доставка", href: "/delivery" },
    { label: "Контакты", href: "/contacts" },
    { label: "Коллекции", href: "/collections" },
    { label: "Блог", href: "/blog" },
    { label: "Вопросы и ответы", href: "/faq" },
    { label: "Документы и сертификаты", href: "/downloads" },
    { label: "Карта сайта", href: "/sitemap-html" },
  ],
  help: [
    { label: "Каталог", href: "/catalog" },
    { label: "Плитка в СПб", href: "/spb" },
    { label: "Керамическая плитка СПб", href: "/keramicheskaya-plitka-spb" },
    { label: "Керамогранит Опт", href: "/keramogranit-spb" },
    { label: "Плитка для ванной СПб", href: "/plitka-dlya-vannoj-spb" },
    { label: "Мозаика СПб", href: "/mozaika-spb" },
    { label: "Плитка под дерево СПб", href: "/plitka-pod-derevo-spb" },
    { label: "Плитка под мрамор СПб", href: "/plitka-pod-mramor-spb" },
    { label: "Плитка под бетон СПб", href: "/plitka-pod-beton-spb" },
    { label: "Плитка под камень СПб", href: "/plitka-pod-kamen-spb" },
    { label: "Плитка для кухни СПб", href: "/plitka-dlya-kuhni-spb" },
    { label: "Плитка для прихожей СПб", href: "/plitka-dlya-prihozhej-spb" },
    { label: "Плитка для балкона СПб", href: "/plitka-dlya-balkona-spb" },
    { label: "Керамогранит 60x120 СПб", href: "/keramogranit-60x120-spb" },
    { label: "Керамогранит 60x60 СПб", href: "/keramogranit-60x60-spb" },
    { label: "Плитка 30x60 СПб", href: "/plitka-30x60-spb" },
    { label: "Керамогранит под дерево СПб", href: "/keramogranit-pod-derevo-spb" },
    { label: "Керамогранит под мрамор СПб", href: "/keramogranit-pod-mramor-spb" },
    { label: "Магазин плитки СПб", href: "/magazin-plitki-spb" },
    { label: "Доставка плитки СПб", href: "/dostavka-plitki-spb" },
    { label: "Серая плитка СПб", href: "/plitka-seraya-spb" },
    { label: "Белая плитка СПб", href: "/plitka-belaya-spb" },
    { label: "Матовый керамогранит СПб", href: "/keramogranit-matovyy-spb" },
    { label: "Плитка для душа СПб", href: "/plitka-dlya-dushi-spb" },
    { label: "Настенная плитка СПб", href: "/plitka-nastennaya-spb" },
    { label: "Керамогранит 45x90 СПб", href: "/keramogranit-45x90-spb" },
    { label: "Плитка для офиса СПб", href: "/plitka-dlya-ofisa-spb" },
    { label: "Плитка Янино", href: "/plitka-yanino-spb" },
  ],
}

const socialLinks = [
  {
    name: 'Avito',
    url: 'https://www.avito.ru/brands/i1860592?src=sharing',
    logo: '/images/avito-logo.png',
  },
  {
    name: 'VK',
    url: 'https://vk.com/tilebox',
    logo: '/images/vk-logo.svg',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/tilebox/',
    logo: '/images/facebook-logo.svg',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/lincer_spb',
    logo: '/images/instagram-logo.png',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@novorom',
    logo: '/images/youtube-logo.svg',
  },
  {
    name: 'Rutube',
    url: 'https://rutube.ru/channel/17530235/',
    logo: '/images/rutube-logo.svg',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@romrom64123',
    logo: '/images/tiktok-logo.svg',
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-4 py-12" suppressHydrationWarning>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12" suppressHydrationWarning>
          {/* Brand - wider column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <Logo className="h-16 w-auto" />
            </Link>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+79052050900" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                +7 (905) 205-09-00
              </a>
              <a href="mailto:novorom@mail.ru" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                novorom@mail.ru
              </a>
              <a href="https://t.me/flyroman" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors" title="Telegram" aria-label="Telegram @flyroman">
                <Image 
                  src="/images/telegram-logo.svg" 
                  alt="Telegram" 
                  width={32} 
                  height={32}
                  className="h-8 w-8 shrink-0"
                />
              </a>
              
              <span className="flex items-center gap-2 text-background/70 mt-3 pt-2 border-t border-background/10">
                <MapPin className="h-4 w-4 shrink-0" />
                СПб, Янино-1, участок 37
              </span>
              <span className="flex items-center gap-2 text-background/70">
                <Clock className="h-4 w-4 shrink-0" />
                Ежедневно 10:00 - 17:00
              </span>
            </div>
          </div>

          {/* Catalog links */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4 uppercase tracking-widest">Каталог</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.catalog.map((link) => (
                <li key={link.label} suppressHydrationWarning>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                    suppressHydrationWarning
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4 uppercase tracking-widest">Информация</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.label} suppressHydrationWarning>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                    suppressHydrationWarning
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4 uppercase tracking-widest">Покупателям</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.label} suppressHydrationWarning>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                    suppressHydrationWarning
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media - rightmost column */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4 uppercase tracking-widest">Найдите нас</h3>
            <div className="flex items-center gap-4 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  aria-label={social.name}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={social.logo}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            {"2024-2026 Керамогранит Опт. Все права защищены."}
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

      {/* Floating Telegram Button */}
      <a
        href="https://t.me/flyroman"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] shadow-lg hover:bg-[#1a8bbf] hover:scale-110 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </a>
    </footer>
  )
}
