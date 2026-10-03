'use client'

import { useState, useEffect } from 'react'
import { Phone, X, Search, Send, Copy, ArrowUp } from 'lucide-react'

const SITE_URL = 'https://www.opt-plitki-spb.ru'

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Строителям", item: `${SITE_URL}/stroy` },
  ],
}

export const metadata = {
  title: 'Строителям — оптовые поставки керамической плитки и керамогранита в СПб | Керамогранит Опт',
  description: 'Плитка и керамогранит от 400 ₽/м² со склада в Войскорово. Работаем по счёту с НДС, самовывоз, бесплатный расчёт количества. Телефон: +7 (905) 205-09-00.',
  alternates: { canonical: 'https://www.opt-plitki-spb.ru/stroy' },
  openGraph: {
    title: 'Строителям — оптовые поставки керамической плитки и керамогранита в СПб',
    description: 'Плитка и керамогранит от 400 ₽/м² со склада в Войскорово. Работаем по счёту с НДС.',
    url: 'https://www.opt-plitki-spb.ru/stroy',
    siteName: 'Керамогранит Опт',
    locale: 'ru_RU',
    type: 'website',
  },
}

const CFG = {
  phone: '+7 905 205-09-00',
  tg: 'https://t.me/flyroman',
  updated: '1 октября 2026',
  address: 'Ленинградская область, Тосненский район, Тельмановское городское поселение, посёлок Войскорово, 14В',
  hours: 'Пн–Пт, с 08:00 до 18:00',
}

const ITEMS = [
  { t: "gres", b: "Kerama Marazzi", n: "Мирабо Серый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 7848, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Джойс Светлый", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 7293, p: null },
  { t: "gres", b: "М-Квадрат", n: "Bianco Белый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 6708, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Terrazzo mix Бежевый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 6378, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Astaria Ice Белый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 6309, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Hornito Amber Коричневый Светлый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 5197, p: 650 },
  { t: "gres", b: "Квадро Декор", n: "Керамогранит технический Соль-Перец Серый Матовая", s: "300 × 300 × 7 мм", k: "300×300", g: "", q: 4912, p: null },
  { t: "gres", b: "М-Квадрат", n: "Toronto Betton Grey", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 4841, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Ferrum Коричневый", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 4017, p: 950 },
  { t: "gres", b: "Kerama Marazzi", n: "Мирабо Серый Тёмный Матовый Обрезной", s: "600 × 1200 × 9 мм", k: "1200×600", g: "1 сорт", q: 3342, p: null },
  { t: "gres", b: "М-Квадрат", n: "Терраццо Серый", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 3126, p: 950 },
  { t: "gres", b: "М-Квадрат", n: "Каньон Серый Светлый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 3126, p: 650 },
  { t: "tile", b: "Нефрит-Керамика", n: "Kids Белый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 3115, p: null },
  { t: "gres", b: "М-Квадрат", n: "Torino Grey", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 2994, p: 650 },
  { t: "gres", b: "Kerama Marazzi", n: "Челси Беж", s: "600 × 300 × 9 мм", k: "600×300", g: "1 сорт", q: 2952, p: null },
  { t: "gres", b: "Квадро Декор", n: "Керамогранит технический Соль-Перец Коричневый Матовая", s: "300 × 300 × 7 мм", k: "300×300", g: "", q: 2858, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Челси Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "1 сорт", q: 2827, p: null },
  { t: "gres", b: "М-Квадрат", n: "Manhattan Grey", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 2790, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Manhattan Бежевый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 2781, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Arctic White", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 2630, p: 650 },
  { t: "gres", b: "Kerama Marazzi", n: "Мирабо Серый Тёмный Матовый Обрезной", s: "600 × 1200 × 9 мм", k: "1200×600", g: "1 сорт", q: 3342, p: null },
  { t: "gres", b: "Грани Таганая", n: "GTF400M ЗИМНИЙ БЕЛЫЙ", s: "1200 × 600 мм", k: "1200×600", g: "", q: 1587, p: null },
  { t: "gres", b: "Грани Таганая", n: "GT047M УМБРА", s: "1200 × 600 мм", k: "1200×600", g: "", q: 1451, p: null },
  { t: "gres", b: "Грани Таганая", n: "GTF427M БЕЖЕВЫЙ", s: "1200 × 600 мм", k: "1200×600", g: "", q: 1406, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Королевская Дорога Черный Обрезной", s: "600 × 1200 × 9 мм", k: "1200×600", g: "2 сорт", q: 763, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Монте Тиберио Серый Светлый Обрезной", s: "600 × 1200 × 9 мм", k: "1200×600", g: "2 сорт", q: 762, p: 1250 },
  { t: "gres", b: "Грани Таганая", n: "GTF422M РЖАВЧИНА", s: "1200 × 600 мм", k: "1200×600", g: "", q: 680, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Королевская Дорога Серый Светлый Обрезной", s: "600 × 1200 × 9 мм", k: "1200×600", g: "1 сорт", q: 567, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Королевская Дорога Серый Светлый Обрезной", s: "600 × 1200 × 9 мм", k: "1200×600", g: "2 сорт", q: 283, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Белый Обрезной", s: "600 × 1200 × 11 мм", k: "1200×600", g: "3 сорт", q: 197, p: null },
  { t: "gres", b: "Грани Таганая", n: "GT061M ЯНТАРЬ", s: "1200 × 600 мм", k: "1200×600", g: "", q: 35, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Фрегат Бежевый Обрезной", s: "200 × 800 × 9 мм", k: "800×200", g: "1 сорт", q: 359, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Мирабо Бежевый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 2675, p: null },
  { t: "gres", b: "Казахстан", n: "DACITE BASE GREY", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 2633, p: 1080 },
  { t: "gres", b: "М-Квадрат", n: "Savage Коричневый Светлый", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 2478, p: 950 },
  { t: "gres", b: "Казахстан", n: "SILENT GREY", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 2345, p: 1080 },
  { t: "gres", b: "М-Квадрат", n: "Black Terrazzo Чёрный", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 2187, p: 950 },
  { t: "gres", b: "М-Квадрат", n: "Matera Бежевый", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 2158, p: 950 },
  { t: "gres", b: "Казахстан", n: "ВАITEREK BEJ", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 1946, p: 1080 },
  { t: "gres", b: "М-Квадрат", n: "Прожетто Серый Светлый", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 1751, p: 950 },
  { t: "gres", b: "Kerama Marazzi", n: "Мирабо Серый Тёмный Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 1421, p: null },
  { t: "gres", b: "Грани Таганая", n: "GT202M КРИСТАЛЬНО-МОЛОЧНЫЙ", s: "600 × 600 мм", k: "600×600", g: "", q: 1369, p: null },
  { t: "gres", b: "Евро-Керамика", n: "РИМ БЕЖЕВЫЙ Рект", s: "600 × 600 × 10 мм", k: "600×600", g: "1 сорт", q: 1362, p: null },
  { t: "gres", b: "Казахстан", n: "CALACATTA GREY", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 1251, p: 1080 },
  { t: "gres", b: "Казахстан", n: "AUTUNNO BASE LIGHT BEIGE", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 1176, p: 1080 },
  { t: "gres", b: "М-Квадрат", n: "Калакатта Серые", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 1134, p: 950 },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Белый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 1085, p: null },
  { t: "gres", b: "М-Квадрат", n: "Marble line dark grey Серый Тёмный", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 1042, p: 950 },
  { t: "gres", b: "М-Квадрат", n: "Магма Коричневый Темный", s: "600 × 600 × 10 мм", k: "600×600", g: "Стандарт", q: 961, p: 950 },
  { t: "gres", b: "Казахстан", n: "PULPIS GREY", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 839, p: 1080 },
  { t: "gres", b: "Казахстан", n: "NATURA WHITE РЫЖИЕ ПРОЖИЛКИ", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 761, p: 1080 },
  { t: "gres", b: "Казахстан", n: "CONCRETE LIGHT GREY", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 735, p: 1080 },
  { t: "gres", b: "Kerama Marazzi", n: "Королевская Дорога Серый Светлый", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 732, p: null },
  { t: "gres", b: "М-Квадрат", n: "Ривьера Серый", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 707, p: 950 },
  { t: "gres", b: "Kerama Marazzi", n: "Королевская Дорога Коричневый Светлый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 521, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Оранжевый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 442, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Фиолетовый Обрезной", s: "600 × 600 × 11 мм", k: "600×600", g: "2 сорт", q: 403, p: null },
  { t: "gres", b: "М-Квадрат", n: "Antibs Бежевый Тёмный", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 387, p: 950 },
  { t: "gres", b: "М-Квадрат", n: "Matera СЕРЫЙ", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 360, p: 950 },
  { t: "gres", b: "Казахстан", n: "CHIPS WHITE", s: "600 × 600 × 9,5 мм", k: "600×600", g: "", q: 358, p: 1080 },
  { t: "gres", b: "Kerama Marazzi", n: "Терраццо Серый", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 353, p: null },
  { t: "gres", b: "М-Квадрат", n: "Магма Серый Светлый", s: "600 × 600 × 10 мм", k: "600×600", g: "Стандарт", q: 334, p: 950 },
  { t: "gres", b: "М-Квадрат", n: "Магма Серый Темный", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 240, p: 950 },
  { t: "gres", b: "Kerama Marazzi", n: "Терраццо Серый", s: "600 × 600 × 9 мм", k: "600×600", g: "2 сорт", q: 237, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Красный Обрезной", s: "600 × 600 × 11 мм", k: "600×600", g: "1 сорт", q: 226, p: null },
  { t: "gres", b: "М-Квадрат", n: "Магма Коричневый Светлый", s: "600 × 600 × 10 мм", k: "600×600", g: "ГОСТ", q: 216, p: 950 },
  { t: "gres", b: "Kerama Marazzi", n: "Терраццо Серый Светлый", s: "600 × 600 × 9 мм", k: "600×600", g: "2 сорт", q: 210, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Белый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "2 сорт", q: 190, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Монте Тиберио Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 158, p: null },
  { t: "gres", b: "Евро-Керамика", n: "ГРАНДАС Рект", s: "600 × 600 × 10 мм", k: "600×600", g: "2 сорт", q: 156, p: null },
  { t: "gres", b: "Казахстан", n: "В60324", s: "600 × 600 мм", k: "600×600", g: "", q: 154, p: 1080 },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Желтый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 106, p: null },
  { t: "gres", b: "М-Квадрат", n: "Rocks Light Grey Серый Светлый", s: "600 × 600 × 10 мм", k: "600×600", g: "Стандарт", q: 105, p: 950 },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Бежевый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 101, p: null },
  { t: "gres", b: "Казахстан", n: "В60336", s: "600 × 600 мм", k: "600×600", g: "", q: 97, p: 1080 },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Пурпурно-Красный Обрезной", s: "600 × 600 × 11 мм", k: "600×600", g: "1 сорт", q: 74, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Зеленый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 72, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Синий Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "1 сорт", q: 50, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Радуга Бежевый Обрезной", s: "600 × 600 × 11 мм", k: "600×600", g: "1 сорт", q: 48, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Фондамента Серый Темный", s: "600 × 600 × 11 мм", k: "600×600", g: "1 сорт", q: 44, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Королевская Дорога Коричневый Светлый Обрезной", s: "600 × 600 × 9 мм", k: "600×600", g: "2 сорт", q: 34, p: null },
  { t: "gres", b: "Евро-Керамика", n: "10 GCR 0016. ТЕХНО", s: "600 × 600 × 10 мм", k: "600×600", g: "1 сорт", q: 34, p: null },
  { t: "gres", b: "Казахстан", n: "В60332", s: "600 × 600 мм", k: "600×600", g: "", q: 32, p: 1080 },
  { t: "tile", b: "Нефрит-Керамика", n: "Лия Бежевый", s: "600 × 300 × 9 мм", k: "600×300", g: "Стандарт", q: 1152, p: 450 },
  { t: "tile", b: "Нефрит-Керамика", n: "Роял Ноэль Эмперадор Коричневый", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 1044, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Шерон Бежевый", s: "600 × 300 × 9 мм", k: "600×300", g: "Стандарт", q: 961, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Прайм Цемент Светло-Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "Сортовая", q: 802, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Мадра Коричневый", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 642, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Mono smoke Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 633, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Луксор Вуд Коричневый", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 563, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Palette Skin Бежевый", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 534, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Сарагоса Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "Оптимум", q: 385, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Однотонная Белый Матовая", s: "600 × 300 × 9 мм", k: "600×300", g: "Сортовая", q: 228, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Слим Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 207, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Сарагоса Коричневый", s: "600 × 300 × 9 мм", k: "600×300", g: "Оптимум", q: 201, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "S.WHITE Белый", s: "600 × 300 × 9 мм", k: "600×300", g: "Оптимум", q: 172, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Сарагоса Бежевый", s: "600 × 300 × 9 мм", k: "600×300", g: "Оптимум", q: 163, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Про Матрикс Серый Светлый Матовый обрезной", s: "300 × 600 × 9 мм", k: "600×300", g: "", q: 126, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Монохромо Белый", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 115, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Saboya Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "Стандарт", q: 111, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Сарагоса Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 68, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Раф Рельеф зеленый", s: "600 × 300 × 9 мм", k: "600×300", g: "Сортовая", q: 61, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Стоун Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "Оптимум", q: 61, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Frida Grey", s: "600 × 300 × 9 мм", k: "600×300", g: "ПК", q: 57, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Hugo Серый", s: "600 × 300 × 9 мм", k: "600×300", g: "Стандарт", q: 54, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Venice Crema Бежевый", s: "600 × 300 × 9 мм", k: "600×300", g: "Оптимум", q: 45, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Лия Бежевый", s: "600 × 300 × 9 мм", k: "600×300", g: "Оптимум", q: 40, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Бейс Калакатта Грей", s: "600 × 300 × 9 мм", k: "600×300", g: "Стандарт", q: 39, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Сиата Оливковый", s: "600 × 300 × 9 мм", k: "600×300", g: "Сортовая", q: 34, p: null },
  { t: "tile", b: "Unitile (г. Шахты)", n: "Delux beige wall 02 РЕФЛЁНАЯ", s: "600 × 250 × 9 мм", k: "600×250", g: "", q: 1335, p: null },
  { t: "tile", b: "Unitile (г. Шахты)", n: "Delux beige wall 01 ГЛАДКАЯ", s: "600 × 250 × 9 мм", k: "600×250", g: "", q: 31, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Риф Бежевый", s: "600 × 200 × 9 мм", k: "600×200", g: "Стандарт", q: 2570, p: 400 },
  { t: "tile", b: "Нефрит-Керамика", n: "Террацио Белый", s: "600 × 200 × 9 мм", k: "600×200", g: "Стандарт", q: 2274, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Тесина Песочный", s: "600 × 200 × 9 мм", k: "600×200", g: "Стандарт", q: 2205, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Террацио Синий", s: "600 × 200 × 9 мм", k: "600×200", g: "Стандарт", q: 1454, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Грэйс Белый", s: "600 × 200 × 9 мм", k: "600×200", g: "Стандарт", q: 1362, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Нарни Серый", s: "600 × 200 × 9 мм", k: "600×200", g: "Стандарт", q: 1347, p: 450 },
  { t: "tile", b: "Нефрит-Керамика", n: "Лайт Бежевый", s: "600 × 200 × 9 мм", k: "600×200", g: "Стандарт", q: 1150, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Моногамма Серый", s: "600 × 200 × 9 мм", k: "600×200", g: "ПК", q: 840, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Alcor Светлый", s: "600 × 200 × 9 мм", k: "600×200", g: "ПК", q: 498, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Даф Серый", s: "600 × 200 × 9 мм", k: "600×200", g: "Оптимум", q: 420, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Нарни Серый", s: "600 × 200 × 9 мм", k: "600×200", g: "Оптимум", q: 37, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Про Матрикс Бежевый обрезной", s: "600 × 150 × 11 мм", k: "600×150", g: "1 сорт", q: 93, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Дрим Белый", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 1155, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Глэдис Бежевый", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 828, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Джойс Бирюзовый", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 598, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Джойс Синий", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 562, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Джойс Розовый", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 546, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Дрим Голубой", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 531, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Джойс Бирюзовый", s: "500 × 250 × 9 мм", k: "500×250", g: "ПК", q: 505, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Однотонная Белый Матовая", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 472, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Sens Light Серый", s: "500 × 250 × 9 мм", k: "500×250", g: "Оптимум", q: 368, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Paradise White Белый", s: "500 × 250 × 9 мм", k: "500×250", g: "Оптимум", q: 264, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Джойс Коричневый", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 224, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Interni Grey Серый", s: "500 × 250 × 9 мм", k: "500×250", g: "Оптимум", q: 173, p: null },
  { t: "tile", b: "-", n: "Oslo Синий", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 124, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Эмилия Бежевый", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 120, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Atlantic Light Белый", s: "500 × 250 × 9 мм", k: "500×250", g: "Оптимум", q: 99, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Artdeco White Белый", s: "500 × 250 × 9 мм", k: "500×250", g: "Оптимум", q: 86, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Касл Серый", s: "500 × 250 × 9 мм", k: "500×250", g: "Оптимум", q: 69, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Джойс Синий", s: "500 × 250 × 9 мм", k: "500×250", g: "ПК", q: 68, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Дрим Лиловый", s: "500 × 250 × 9 мм", k: "500×250", g: "Стандарт", q: 43, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Фреш Белый", s: "500 × 250 × 9 мм", k: "500×250", g: "Оптимум", q: 30, p: null },
  { t: "gres", b: "Unitile (г. Шахты)", n: "НОРДЛАНД Бежевый 01", s: "125 × 500 мм", k: "500×125", g: "Стандарт", q: 1133, p: null },
  { t: "gres", b: "Unitile (г. Шахты)", n: "СМОУК Серый 01", s: "125 × 500 мм", k: "500×125", g: "Стандарт", q: 1133, p: null },
  { t: "gres", b: "Unitile (г. Шахты)", n: "ВАРДИ Бежевый 01", s: "125 × 500 мм", k: "500×125", g: "Стандарт", q: 1070, p: null },
  { t: "gres", b: "Unitile (г. Шахты)", n: "НОРДЛАНД Бежевый 03", s: "125 × 500 мм", k: "500×125", g: "Стандарт", q: 377, p: null },
  { t: "gres", b: "М-Квадрат", n: "Hornito Silver Серый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 2626, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Chantilly Cemento Navy", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 2432, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Astaria Graphite Графит", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 2255, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Breccia Romano Белый", s: "450 × 450 × 8 мм", k: "450×450", g: "Стандарт", q: 1573, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Terrazzo mix Бежевый", s: "450 × 450 × 8 мм", k: "450×450", g: "Стандарт", q: 1002, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Sonata Серый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 430, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Grandwood Бежевый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 390, p: 650 },
  { t: "gres", b: "М-Квадрат", n: "Mezzo Серый", s: "450 × 450 × 8 мм", k: "450×450", g: "ГОСТ", q: 109, p: 650 },
  { t: "gres", b: "Unitile (г. Шахты)", n: "NEO Серый", s: "400 × 400 × 7 мм", k: "400×400", g: "Стандарт", q: 1731, p: null },
  { t: "gres", b: "Unitile (г. Шахты)", n: "ГЕРМЕС Белый Терраццо 02", s: "400 × 400 × 8 мм", k: "400×400", g: "Стандарт", q: 640, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Сенат Бежевый Обрезной", s: "400 × 400 × 8 мм", k: "400×400", g: "1 сорт", q: 325, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Мотиво Серый Светлый", s: "400 × 400 × 8 мм", k: "400×400", g: "1 сорт", q: 309, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Сенат Серый Светлый Обрезной", s: "400 × 400 × 8 мм", k: "400×400", g: "1 сорт", q: 239, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Норд Белый", s: "400 × 400 × 8 мм", k: "400×400", g: "3 сорт", q: 144, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Гермес Короичневый", s: "400 × 250 × 8 мм", k: "400×250", g: "Стандарт", q: 994, p: 450 },
  { t: "tile", b: "Нефрит-Керамика", n: "Парфюм бежевый", s: "400 × 250 × 8 мм", k: "400×250", g: "Стандарт", q: 170, p: 450 },
  { t: "tile", b: "Нефрит-Керамика", n: "Хитроу Синий", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 804, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Kids Желтый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 478, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Kids Оранжевый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 472, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Kids Голубой", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 351, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Норд Серый", s: "400 × 200 × 8 мм", k: "400×200", g: "Оптимум", q: 350, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Kids Зеленый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 344, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Норд Бежевый", s: "400 × 200 × 8 мм", k: "400×200", g: "Оптимум", q: 319, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Норд ТЕМНО Бежевый", s: "400 × 200 × 8 мм", k: "400×200", g: "Оптимум", q: 312, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Kids Серый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 268, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Норд Бежевый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 219, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Норд Серый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 174, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Фьюжен Серый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 172, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Моноколор Белый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 169, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Фьюжен Белый", s: "400 × 200 × 8 мм", k: "400×200", g: "Оптимум", q: 129, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Сарагоса Белый", s: "400 × 200 × 8 мм", k: "400×200", g: "ПК", q: 128, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Kids Красный", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 117, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Фьюжен Белый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 87, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Хитроу Терракотовый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 72, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Карен Серый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 64, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Кураж 2 КРАСНЫЙ", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 57, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Дженни Бежевый", s: "400 × 200 × 8 мм", k: "400×200", g: "Стандарт", q: 43, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Элегия Песочный", s: "385 × 385 × 8,5 мм", k: "385×385", g: "Стандарт", q: 126, p: null },
  { t: "tile", b: "Нефрит-Керамика", n: "Росси Серый", s: "385 × 385 × 8,5 мм", k: "385×385", g: "Стандарт", q: 63, p: null },
  { t: "gres", b: "М-Квадрат", n: "Мюнхен Камни Коричневый", s: "330 × 330 × 8 мм", k: "330×330", g: "ГОСТ", q: 351, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Коллиано Бежевый Светлый", s: "300 × 300 × 8 мм", k: "300×300", g: "1 сорт", q: 2073, p: null },
  { t: "gres", b: "Квадро Декор", n: "Керамогранит технический Соль-Перец Светло-Серый Матовая", s: "300 × 300 × 7 мм", k: "300×300", g: "", q: 1373, p: 610 },
  { t: "gres", b: "Kerama Marazzi", n: "Гармония Белый", s: "300 × 300 × 8 мм", k: "300×300", g: "2 сорт", q: 272, p: null },
  { t: "gres", b: "Квадро Декор", n: "Керамогранит технический Соль-Перец Серый Матовая", s: "300 × 300 × 8 мм", k: "300×300", g: "", q: 220, p: null },
  { t: "gres", b: "Квадро Декор", n: "Керамогранит технический Техно 2 Серый Матовая", s: "300 × 300 × 7 мм", k: "300×300", g: "", q: 87, p: null },
  { t: "gres", b: "-", n: "Керамогранит технический Техно-2 Серый Матовая Ступень", s: "300 × 300 × 7 мм", k: "300×300", g: "", q: 87, p: null },
  { t: "gres", b: "Квадро Декор", n: "Керамогранит технический УТОЛЩЕННЫЙ Соль-Перец Серый Матовая", s: "300 × 300 × 12 мм", k: "300×300", g: "", q: 74, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Урбан Серый Светлый", s: "300 × 300 × 8 мм", k: "300×300", g: "1 сорт", q: 66, p: null },
  { t: "gres", b: "Kerama Marazzi", n: "Коллиано Серый", s: "300 × 300 × 8 мм", k: "300×300", g: "1 сорт", q: 47, p: null },
  { t: "tile", b: "Kerama Marazzi", n: "Калейдоскоп Белый", s: "200 × 200 мм", k: "200×200", g: "1 сорт", q: 742, p: null },
  { t: "tile", b: "Kerama Marazzi", n: "Калейдоскоп Бежевый", s: "200 × 200 мм", k: "200×200", g: "1 сорт", q: 339, p: null },
  { t: "tile", b: "Kerama Marazzi", n: "Калейдоскоп Персиковый", s: "200 × 200 мм", k: "200×200", g: "1 сорт", q: 99, p: null },
]

const COL = [
  ['бел', '#eeeeea'],
  ['беж', '#d9c7a5'],
  ['песоч', '#dccbb0'],
  ['графит', '#4a4f54'],
  ['перец', '#b9b9b6'],
  ['сер', '#9ea3a6'],
  ['чер', '#2b2e31'],
  ['чёр', '#2b2e31'],
  ['корич', '#8a6a4f'],
  ['терракот', '#b5654a'],
  ['гол', '#9cc3dc'],
  ['син', '#4a6fa5'],
  ['navy', '#4a6fa5'],
  ['бирюз', '#6fc1c0'],
  ['зел', '#7fae7a'],
  ['салат', '#a9c97a'],
  ['жел', '#e6c84a'],
  ['жёл', '#e6c84a'],
  ['оранж', '#e69a4a'],
  ['красн', '#c0504a'],
  ['роз', '#e5a9b5'],
  ['лил', '#b9a0d0'],
  ['фиол', '#8b6bb0'],
]

function getColor(name: string): string {
  const n = name.toLowerCase()
  for (const [k, v] of COL) {
    if (n.includes(k)) return v
  }
  return '#cfcac0'
}

function formatNumber(n: number): string {
  return n.toLocaleString('ru-RU')
}

function swatch(item: any, big: boolean = false): JSX.Element {
  if (item.img) {
    return (
      <img
        src={item.img}
        alt={item.n}
        title="Увеличить"
        loading="lazy"
        className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform"
        onClick={() => openLightbox(item)}
      />
    )
  }
  const m = item.s.match(/(\d+)\s*×\s*(\d+)/)
  const w = +m[1]
  const h = +m[2]
  const k = (big ? 120 : 30) / Math.max(w, h)
  const bgSize = `${Math.max(w * k, 6).toFixed(1)}px ${Math.max(h * k, 6).toFixed(1)}px`
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: getColor(item.n),
        backgroundImage: `
          linear-gradient(90deg, rgba(255,255,255,0.7) 2px, transparent 2px),
          linear-gradient(0deg, rgba(255,255,255,0.7) 2px, transparent 2px)
        `,
        backgroundSize: bgSize,
      }}
    />
  )
}

export default function StroyPage() {
  const [cat, setCat] = useState('all')
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('stock')
  const [shown, setShown] = useState(40)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [quantity, setQuantity] = useState('')
  const [callDialogOpen, setCallDialogOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [callPhone, setCallPhone] = useState('')
  const [callName, setCallName] = useState('')
  const [callStatus, setCallStatus] = useState('')
  const [callSuccess, setCallSuccess] = useState(false)

  const cnt: Record<string, number> = {}
  ITEMS.forEach((i) => (cnt[i.k] = (cnt[i.k] || 0) + 1))
  const keys = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])
  const TOP = keys.slice(0, 8)
  const hasOther = keys.length > TOP.length

  function ok(item: any): boolean {
    const q = searchQuery.trim().toLowerCase()
    const matchesCat = cat === 'all' || item.t === cat
    const matchesSize = !selectedSizes.size || selectedSizes.has(item.k) || (selectedSizes.has('other') && !TOP.includes(item.k))
    const matchesSearch = (item.n + ' ' + item.s + ' ' + item.b).toLowerCase().includes(q)
    return matchesCat && matchesSize && matchesSearch
  }

  function getFilteredItems() {
    let rows = ITEMS.map((it, i) => ({ it, i })).filter(({ it }) => ok(it))
    if (sortBy !== 'stock') {
      const d = sortBy === 'asc' ? 1 : -1
      rows.sort((a, b) => {
        const pa = a.it.p
        const pb = b.it.p
        if (!pa && !pb) return b.it.q - a.it.q
        if (!pa) return 1
        if (!pb) return -1
        return d * (pa - pb) || b.it.q - a.it.q
      })
    }
    return rows
  }

  const filteredItems = getFilteredItems()
  const displayedItems = filteredItems.slice(0, shown)
  const n = filteredItems.length
  const m10 = n % 10
  const m100 = n % 100
  const positionWord =
    m10 === 1 && m100 !== 11
      ? 'позиция'
      : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)
        ? 'позиции'
        : 'позиций'

  function toggleSize(k: string) {
    const newSet = new Set(selectedSizes)
    if (newSet.has(k)) {
      newSet.delete(k)
    } else {
      newSet.add(k)
    }
    setSelectedSizes(newSet)
    setShown(40)
  }

  function openDialog(item?: any, qty?: number) {
    setSelectedItem(item)
    setQuantity(qty ? qty.toString() : '')
    setCallDialogOpen(true)
    setCallStatus('')
    setCallSuccess(false)
    setCallPhone('')
    setCallName('')
  }

  function openLightbox(item: any) {
    if (item.img) {
      setLightboxImage(item.img)
      setLightboxOpen(true)
    }
  }

  function copyRequest() {
    const msg = getMessage(selectedItem, parseFloat(quantity) || 0)
    navigator.clipboard.writeText(msg)
    const btn = document.getElementById('dcopy') as HTMLButtonElement
    if (btn) {
      btn.textContent = 'Скопировано'
      setTimeout(() => (btn.textContent = 'Скопировать запрос'), 1800)
    }
  }

  function getMessage(item: any, q: number): string {
    let t = 'Здравствуйте! Интересует: ' + item.n + ', ' + item.s
    if (item.b) t += ', ' + item.b
    if (item.g) t += ', ' + item.g
    t += q > 0 ? '. Нужное количество: ' + q + ' м².' : '. Подскажите, пожалуйста, остаток.'
    t += item.p ? ' Цена на сайте: ' + formatNumber(item.p) + ' ₽/м².' : ' Назовите, пожалуйста, цену.'
    return t + ' Счёт на организацию, самовывоз или доставка.'
  }

  function handleCallSubmit(e: React.FormEvent) {
    e.preventDefault()
    const phone = callPhone.trim()
    if (phone.replace(/\D/g, '').length < 10) {
      setCallStatus('Проверьте номер телефона')
      return
    }
    setCallStatus('Отправляем...')
    const name = callName.trim()
    const what = selectedItem
      ? 'Позиция: ' +
        selectedItem.n +
        ', ' +
        selectedItem.s +
        (selectedItem.b ? ', ' + selectedItem.b : '') +
        (selectedItem.g ? ', ' + selectedItem.g : '') +
        (quantity ? '. Нужно: ' + quantity + ' м²' : '') +
        (selectedItem.p ? '. Цена на сайте: ' + formatNumber(selectedItem.p) + ' ₽/м²' : '')
      : 'Запрос с главной страницы'
    const text = 'Заказ звонка: ' + phone + (name ? ' (' + name + ')' : '') + '. ' + what
    const tg = CFG.tg + '?text=' + encodeURIComponent(text)
    window.open(tg, '_blank')
    setCallDialogOpen(false)
  }

  return (
    <main className="min-h-screen bg-[#e9e8e4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#e9e8e4] border-b border-[#c6c5be]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <span className="font-bold text-xl" style={{ fontFamily: 'Arial Narrow, Roboto Condensed, sans-serif' }}>
            Керамогранит Опт
          </span>
          <button
            onClick={() => openDialog()}
            className="px-5 py-2.5 rounded-md bg-[#1f2429] text-white font-semibold border-2 border-[#1f2429] hover:opacity-90 transition-opacity"
          >
            Заказать звонок
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="py-10 md:py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight" style={{ fontFamily: 'Arial Narrow, Roboto Condensed, sans-serif' }}>
            Плитка и керамогранит для строителей. Остатки со склада от 400 ₽/м²
          </h1>
          <p className="text-lg text-[#5d646b] mb-6 max-w-2xl">
            Цены с НДС, работаем по счёту. Забираете сами в Войскорово или заказываете доставку. Цены действуют до 31 октября или до окончания остатков.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#prices" className="px-5 py-2.5 rounded-md bg-[#1f2429] text-white font-semibold border-2 border-[#1f2429] hover:opacity-90 transition-opacity">
              Смотреть цены
            </a>
            <a href={CFG.tg} target="_blank" rel="noopener" className="px-5 py-2.5 rounded-md bg-transparent text-[#1f2429] font-semibold border-2 border-[#1f2429] hover:bg-[#1f2429]/5 transition-colors">
              Написать в Telegram
            </a>
          </div>
        </div>

        {/* Prices */}
        <section id="prices" className="py-9">
          <h2 className="text-2xl font-extrabold mb-4" style={{ fontFamily: 'Arial Narrow, Roboto Condensed, sans-serif' }}>
            Цены и остатки
          </h2>
          <div className="flex gap-2 flex-wrap mb-4 items-center">
            <button
              onClick={() => { setCat('all'); setShown(40) }}
              className={`px-4 py-2 rounded-full border-2 font-medium cursor-pointer ${cat === 'all' ? 'bg-[#1f2429] text-white border-[#1f2429]' : 'border-[#1f2429] text-[#1f2429]'}`}
            >
              Всё
            </button>
            <button
              onClick={() => { setCat('tile'); setShown(40) }}
              className={`px-4 py-2 rounded-full border-2 font-medium cursor-pointer ${cat === 'tile' ? 'bg-[#1f2429] text-white border-[#1f2429]' : 'border-[#1f2429] text-[#1f2429]'}`}
            >
              Плитка
            </button>
            <button
              onClick={() => { setCat('gres'); setShown(40) }}
              className={`px-4 py-2 rounded-full border-2 font-medium cursor-pointer ${cat === 'gres' ? 'bg-[#1f2429] text-white border-[#1f2429]' : 'border-[#1f2429] text-[#1f2429]'}`}
            >
              Керамогранит
            </button>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShown(40) }}
              placeholder="Название или размер"
              className="flex-1 min-w-40 px-3 py-2 border-2 rounded-md bg-[#f6f5f2] text-[#1f2429]"
            />
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setShown(40) }}
              className="px-3 py-2 border-2 rounded-md bg-[#f6f5f2] text-[#1f2429]"
            >
              <option value="stock">Сначала больше остаток</option>
              <option value="asc">Сначала дешевле</option>
              <option value="desc">Сначала дороже</option>
            </select>
          </div>
          <div className="flex gap-2 flex-wrap mb-4" role="group" aria-label="Размер">
            {TOP.map((k) => (
              <button
                key={k}
                onClick={() => toggleSize(k)}
                className={`px-4 py-1.5 border-2 rounded-md bg-[#f6f5f2] font-medium cursor-pointer text-sm ${selectedSizes.has(k) ? 'bg-[#f4c400] border-[#111] font-bold' : 'border-[#c6c5be] text-[#1f2429]'}`}
              >
                {k}
              </button>
            ))}
            {hasOther && (
              <button
                onClick={() => toggleSize('other')}
                className={`px-4 py-1.5 border-2 rounded-md bg-[#f6f5f2] font-medium cursor-pointer text-sm ${selectedSizes.has('other') ? 'bg-[#f4c400] border-[#111] font-bold' : 'border-[#c6c5be] text-[#1f2429]'}`}
              >
                Другие размеры
              </button>
            )}
          </div>
          <p className="text-sm text-[#5d646b] mb-3">
            Нажмите на позицию, чтобы открыть карточку. Цены за м², с НДС. В списке остатки от 30 м². Обновлено: {CFG.updated}.
          </p>
          <p className="text-sm font-bold text-[#1f2429] mb-4">
            Найдено: {n} {positionWord}
          </p>
          <div className="grid gap-2">
            {displayedItems.map(({ it, i }) => (
              <button
                key={i}
                onClick={() => setSelectedItem(it)}
                className="grid grid-cols-[76px_1fr_auto] gap-4 items-center w-full text-left bg-[#f6f5f2] border border-[#c6c5be] rounded-lg p-3 hover:border-[#1f2429] transition-colors"
              >
                <div className="w-20 h-20 rounded-md border border-black/18 overflow-hidden">
                  {swatch(it)}
                </div>
                <div>
                  <div className="font-bold">{it.n}</div>
                  <div className="text-sm text-[#5d646b]">{it.s}</div>
                  {it.b && <div className="text-sm text-[#5d646b]">{it.b}</div>}
                  {it.g && <div className="text-sm text-[#5d646b]">{it.g}</div>}
                  <div className="text-sm text-[#5d646b]">В наличии {formatNumber(it.q)} м²</div>
                </div>
                <div
                  className={`text-xl font-bold px-4 py-1.5 ${it.p ? 'bg-[#f4c400] text-[#111]' : 'bg-transparent text-[#5d646b] border-2 border-dashed border-[#c6c5be] font-semibold text-sm py-1 px-3'}`}
                  style={it.p ? { clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)' } : {}}
                >
                  {it.p ? (
                    <>
                      {formatNumber(it.p)} <small className="text-sm font-bold">₽/м²</small>
                    </>
                  ) : (
                    'Цена по запросу'
                  )}
                </div>
              </button>
            ))}
            {displayedItems.length === 0 && (
              <div className="p-5 text-[#5d646b]">Ничего не найдено. Позвоните, подберём аналог.</div>
            )}
          </div>
          <div className="text-center mt-4">
            {filteredItems.length > shown && (
              <button
                onClick={() => setShown(shown + 40)}
                className="px-5 py-2.5 rounded-md bg-transparent text-[#1f2429] font-semibold border-2 border-[#1f2429] hover:bg-[#1f2429]/5 transition-colors"
              >
                Показать ещё ({Math.min(40, filteredItems.length - shown)})
              </button>
            )}
            {filteredItems.length > 40 && filteredItems.length <= shown && (
              <button
                onClick={() => document.getElementById('prices')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 rounded-md bg-transparent text-[#1f2429] font-semibold border-2 border-[#1f2429] hover:bg-[#1f2429]/5 transition-colors"
              >
                Наверх, к фильтрам
              </button>
            )}
          </div>
        </section>

        {/* How we work */}
        <section className="py-9">
          <h2 className="text-2xl font-extrabold mb-4" style={{ fontFamily: 'Arial Narrow, Roboto Condensed, sans-serif' }}>
            Как мы работаем
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-t-4 border-[#1f2429] pt-3">
              <dt className="font-bold mb-1">Оплата по счёту</dt>
              <dd className="text-sm text-[#5d646b]">Безналичный расчёт для организаций, цены с НДС.</dd>
            </div>
            <div className="border-t-4 border-[#1f2429] pt-3">
              <dt className="font-bold mb-1">Самовывоз</dt>
              <dd className="text-sm text-[#5d646b]">Забираете со склада в Войскорово в рабочие дни.</dd>
            </div>
            <div className="border-t-4 border-[#1f2429] pt-3">
              <dt className="font-bold mb-1">Расчёт количества</dt>
              <dd className="text-sm text-[#5d646b]">Посчитаем нужный объём под ваш объект бесплатно.</dd>
            </div>
            <div className="border-t-4 border-[#1f2429] pt-3">
              <dt className="font-bold mb-1">Фото и сертификаты</dt>
              <dd className="text-sm text-[#5d646b]">Пришлём по любой позиции по запросу.</dd>
            </div>
          </dl>
        </section>

        {/* Contact */}
        <section className="py-9">
          <h2 className="text-2xl font-extrabold mb-4" style={{ fontFamily: 'Arial Narrow, Roboto Condensed, sans-serif' }}>
            Нужна плитка на объект?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#1f2429] text-[#f2f2ee] rounded-xl p-6">
            <div>
              <p>Назовите объём, подберём, зарезервируем и выставим счёт.</p>
              <p className="mt-4">
                <button
                  onClick={() => openDialog()}
                  className="px-5 py-2.5 rounded-md bg-[#f4c400] text-[#111] font-semibold border-2 border-[#f4c400] hover:opacity-90 transition-opacity"
                >
                  Заказать звонок
                </button>
              </p>
              <p className="mt-4">
                <a href={CFG.tg} target="_blank" rel="noopener" className="px-5 py-2.5 rounded-md bg-transparent text-white font-semibold border-2 border-white hover:bg-white/10 transition-colors inline-block">
                  Написать в Telegram
                </a>
              </p>
            </div>
            <div>
              <p className="font-bold">Наш склад</p>
              <p>Телефон: <a href={`tel:${CFG.phone.replace(/[^+\d]/g, '')}`} className="text-white hover:underline">{CFG.phone}</a></p>
              <p>{CFG.address}</p>
              <p>{CFG.hours}</p>
              <p>
                <a href={`https://yandex.ru/maps/?text=${encodeURIComponent(CFG.address)}`} target="_blank" rel="noopener" className="text-white hover:underline">
                  Открыть на карте
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-sm text-[#5d646b] py-8">
          ООО «Керамогранит Опт». Цены и наличие актуальны на дату обновления, остатки по позициям уточняйте у менеджера.
        </footer>
      </div>

      {/* Item Dialog */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedItem(null)}>
          <div className="bg-[#f6f5f2] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-3 top-3 w-10 h-10 rounded-full bg-[#f6f5f2] text-xl font-bold hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
            <div className="h-48 bg-[#ddd] cursor-pointer" onClick={() => openLightbox(selectedItem)}>
              {swatch(selectedItem, true)}
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-bold mb-1">{selectedItem.n}</h3>
              <div className="text-sm text-[#5d646b] mb-4">{selectedItem.b}</div>
              <dl className="grid grid-cols-[auto_1fr] gap-1 mb-4 text-sm">
                <dt className="text-[#5d646b]">Размер</dt>
                <dd className="font-semibold">{selectedItem.s}</dd>
                {selectedItem.g && (
                  <>
                    <dt className="text-[#5d646b]">Сорт</dt>
                    <dd className="font-semibold">{selectedItem.g}</dd>
                  </>
                )}
                <dt className="text-[#5d646b]">Наличие</dt>
                <dd className="font-semibold">{formatNumber(selectedItem.q)} м²</dd>
              </dl>
              <div className="text-xl font-bold px-4 py-1.5 bg-[#f4c400] text-[#111] inline-block" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)' }}>
                {selectedItem.p ? (
                  <>
                    {formatNumber(selectedItem.p)} <small className="text-sm font-bold">₽/м² с НДС</small>
                  </>
                ) : (
                  'Цена по запросу'
                )}
              </div>
              <label className="block mt-4 font-semibold">
                Сколько нужно, м² (по желанию)
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  step="any"
                  placeholder="например, 100"
                  className="block w-full mt-2 px-3 py-2 border-2 rounded-md bg-white text-[#1f2429]"
                />
              </label>
              <div className="flex gap-2 flex-wrap mt-4">
                <button
                  onClick={() => { setSelectedItem(null); openDialog(selectedItem, parseFloat(quantity) || 0) }}
                  className="px-5 py-2.5 rounded-md bg-[#1f2429] text-white font-semibold border-2 border-[#1f2429] hover:opacity-90 transition-opacity"
                >
                  Заказать звонок
                </button>
                <a
                  href={CFG.tg + '?text=' + encodeURIComponent(getMessage(selectedItem, parseFloat(quantity) || 0))}
                  target="_blank"
                  rel="noopener"
                  className="px-5 py-2.5 rounded-md bg-transparent text-[#1f2429] font-semibold border-2 border-[#1f2429] hover:bg-[#1f2429]/5 transition-colors inline-block"
                >
                  Написать в Telegram
                </a>
                <button
                  id="dcopy"
                  onClick={copyRequest}
                  className="px-5 py-2.5 rounded-md bg-transparent text-[#1f2429] font-semibold border-2 border-[#1f2429] hover:bg-[#1f2429]/5 transition-colors"
                >
                  Скопировать запрос
                </button>
              </div>
              <p className="text-xs text-[#5d646b] mt-2">
                В Telegram откроется готовое сообщение с названием, размером и количеством.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Call Dialog */}
      {callDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setCallDialogOpen(false)}>
          <div className="bg-[#f6f5f2] rounded-xl max-w-md w-full p-5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setCallDialogOpen(false)}
              className="absolute right-3 top-3 w-10 h-10 rounded-full bg-[#f6f5f2] text-xl font-bold hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-2">Заказать звонок</h3>
            <p className="text-sm text-[#5d646b] mb-4">
              Оставьте номер, перезвоним в рабочее время: Пн–Пт, с 08:00 до 18:00.
            </p>
            {selectedItem && (
              <p className="text-sm text-[#5d646b] mb-4">
                Позиция: {selectedItem.n}, {selectedItem.s}
                {quantity && `, ${quantity} м²`}
              </p>
            )}
            {!callSuccess ? (
              <form onSubmit={handleCallSubmit}>
                <label className="block font-semibold mb-1">
                  Телефон
                  <input
                    type="tel"
                    value={callPhone}
                    onChange={(e) => setCallPhone(e.target.value)}
                    placeholder="+7 900 000-00-00"
                    required
                    className="block w-full mt-1 px-3 py-2 border-2 rounded-md bg-white text-[#1f2429]"
                  />
                </label>
                <label className="block font-semibold mb-1">
                  Имя (по желанию)
                  <input
                    type="text"
                    value={callName}
                    onChange={(e) => setCallName(e.target.value)}
                    className="block w-full mt-1 px-3 py-2 border-2 rounded-md bg-white text-[#1f2429]"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-4 w-full px-5 py-2.5 rounded-md bg-[#1f2429] text-white font-semibold border-2 border-[#1f2429] hover:opacity-90 transition-opacity"
                >
                  Перезвоните мне
                </button>
                {callStatus && <p className="text-sm mt-2" aria-live="polite">{callStatus}</p>}
                <p className="text-xs text-[#5d646b] mt-2">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных для связи с вами.
                </p>
              </form>
            ) : (
              <p className="font-bold">Спасибо! Заявка принята. Перезвоним в рабочее время.</p>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black" onClick={() => setLightboxOpen(false)}>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white text-xl font-bold hover:bg-gray-200 transition-colors z-10"
            >
              ×
            </button>
            <img src={lightboxImage} alt="" className="w-full max-h-[78vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </main>
  )
}
