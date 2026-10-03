'use client'

import { useState, useMemo, useEffect, FormEvent } from 'react'
import {
  Phone,
  X,
  Search,
  Send,
  Copy,
  Check,
  Download,
  ArrowUp,
  RotateCcw,
  ZoomIn,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  Sparkles,
  Calculator,
  Layers,
  Truck,
  FileCheck,
  PackageCheck,
  HelpCircle,
} from 'lucide-react'

const SITE_URL = 'https://www.opt-plitki-spb.ru'

// Прокси-CDN: бесплатный сервис, конвертирует в WebP, сжимает, кэширует
function optimizeImage(url: string, width = 400): string {
  if (!url || url.startsWith("/")) return url
  // Убираем https:// для weserv.nl
  const clean = url.replace(/^https?:\/\//, "")
  return `https://images.weserv.nl/?url=${clean}&w=${width}&output=webp&q=75&il`
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Строителям", item: `${SITE_URL}/stroy` },
  ],
}

const CFG = {
  web3formsKey: '15b32313-a149-4439-8169-15ec9f6669fe',
  phone: '+7 905 205-09-00',
  phoneClean: '+79052050900',
  tg: 'https://t.me/flyroman',
  email: 'info@cersanit-spb.ru',
  updated: '1 октября 2026',
  address: 'Ленинградская область, Тосненский район, Тельмановское городское поселение, посёлок Войскорово, 14В',
  hours: 'Пн–Пт, с 08:00 до 18:00',
}

export interface StroyItem {
  t: 'gres' | 'tile'
  b: string
  n: string
  s: string
  k: string
  g: string
  q: number
  p: number | null
  img: string
  isPhoto: boolean
}

const ITEMS: StroyItem[] = [
{"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":7848,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/dc8/320_320_1/dc8bdb371c36720a80ee968a312a79be.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Джойс Светлый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":7293,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Bianco Белый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":6708,"p":650,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Terrazzo mix Бежевый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":6378,"p":650,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Astaria Ice Белый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":6309,"p":650,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Hornito Amber Коричневый Светлый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":5197,"p":650,"img":"","isPhoto":false},
  {"t":"gres","b":"Квадро Декор","n":"Керамогранит технический Соль-Перец Серый Матовая","s":"300 × 300 × 7 мм","k":"300×300","g":"","q":4912,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/f36/320_320_1/f3632254448c78a146ea7d6b6466452c.jpg","isPhoto":true},
  {"t":"gres","b":"М-Квадрат","n":"Toronto Betton Grey","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":4841,"p":650,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Ferrum Коричневый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":4017,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Тёмный Матовый Обрезной","s":"600 × 1200 × 9 мм","k":"1200×600","g":"1 сорт","q":3342,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/ad5/320_320_1/ojciu7ia6dwjzdcw4kfgwuqfrisupghi.jpg","isPhoto":true},
  {"t":"gres","b":"М-Квадрат","n":"Терраццо Серый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":3126,"p":950,"img":"https://lincer.ru/upload/resize_cache/iblock/87a/320_320_1/mypaloms3ft1giuwjl8x14yl299ls3yl.jpg","isPhoto":true},
  {"t":"gres","b":"М-Квадрат","n":"Каньон Серый Светлый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":3126,"p":650,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Kids Белый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":3115,"p":null,"img":"https://plitburg.ru/upload/dev2fun.imagecompress/webp/iblock/4b3/nmipqyxeiau2a0n5jy2b9eoyb9kuxqkx.webp","isPhoto":true},
  {"t":"gres","b":"М-Квадрат","n":"Sanar Серый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":2794,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Мирабо Бежевый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":2675,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/c28/320_320_1/c28a4186e0e7997886825dab7afbafda.jpg","isPhoto":true},
  {"t":"gres","b":"Казахстан","n":"DACITE BASE GREY","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":2633,"p":1080,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Hornito Silver Серый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":2626,"p":650,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Риф Бежевый","s":"600 × 200 × 9 мм","k":"600×200","g":"Стандарт","q":2570,"p":400,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Savage Коричневый Светлый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":2478,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Chantilly Cemento Navy","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":2432,"p":650,"img":"","isPhoto":false},
  {"t":"gres","b":"Казахстан","n":"SILENT GREY","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":2345,"p":1080,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Террацио Белый","s":"600 × 200 × 9 мм","k":"600×200","g":"Стандарт","q":2274,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Astaria Graphite Графит","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":2255,"p":650,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Тесина Песочный","s":"600 × 200 × 9 мм","k":"600×200","g":"Стандарт","q":2205,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Black Terrazzo Чёрный","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":2187,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Matera Бежевый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":2158,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Коллиано Бежевый Светлый","s":"300 × 300 × 8 мм","k":"300×300","g":"1 сорт","q":2073,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/d76/320_320_1/d76904bb801634dabcc3be9fe4071b7a.jpg","isPhoto":true},
  {"t":"gres","b":"Казахстан","n":"ВAITEREK BEJ","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":1946,"p":1080,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Прожетто Серый Светлый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":1751,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Unitile (г. Шахты)","n":"NEO Серый","s":"400 × 400 × 7 мм","k":"400×400","g":"Стандарт","q":1731,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Грани Таганая","n":"Грани Таганая GTF400M ЗИМНИЙ БЕЛЫЙ","s":"1200 × 600 мм","k":"1200×600","g":"","q":1587,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Breccia Romano Белый","s":"450 × 450 × 8 мм","k":"450×450","g":"Стандарт","q":1573,"p":650,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Террацио Синий","s":"600 × 200 × 9 мм","k":"600×200","g":"Стандарт","q":1454,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Грани Таганая","n":"Грани Таганая GT047M УМБРА","s":"1200 × 600 мм","k":"1200×600","g":"","q":1451,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Мирабо Серый Тёмный Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1421,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/2cd/320_320_1/2cd2214d6c329885ba69f01a8d3d2554.jpg","isPhoto":true},
  {"t":"gres","b":"Грани Таганая","n":"Грани Таганая GTF427M БЕЖЕВЫЙ","s":"1200 × 600 мм","k":"1200×600","g":"","q":1406,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Квадро Декор","n":"Керамогранит технический Соль-Перец Светло-Серый Матовая","s":"300 × 300 × 7 мм","k":"300×300","g":"","q":1373,"p":610,"img":"https://lincer.ru/upload/resize_cache/iblock/074/320_320_1/07433e15fc146e615fa871f61bfddcdd.jpg","isPhoto":true},
  {"t":"gres","b":"Грани Таганая","n":"Грани Таганая GT202M КРИСТАЛЬНО-МОЛОЧНЫЙ","s":"600 × 600 мм","k":"600×600","g":"","q":1369,"p":null,"img":"https://lincer.ru/upload/dev2fun.imagecompress/webp/iblock/074/074477d5e79cd5c0a8c701e9aac7cd3f.webp","isPhoto":true},
  {"t":"gres","b":"Евро-Керамика","n":"РИМ БЕЖЕВЫЙ Рект","s":"600 × 600 × 10 мм","k":"600×600","g":"1 сорт","q":1362,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Грэйс Белый","s":"600 × 200 × 9 мм","k":"600×200","g":"Стандарт","q":1362,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Нарни Серый","s":"600 × 200 × 9 мм","k":"600×200","g":"Стандарт","q":1347,"p":450,"img":"","isPhoto":false},
  {"t":"tile","b":"Unitile (г. Шахты)","n":"Delux beige wall 02 РЕФЛЁНАЯ","s":"600 × 250 × 9 мм","k":"600×250","g":"","q":1335,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Казахстан","n":"CALACATTA GREY","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":1251,"p":1080,"img":"https://lincer.ru/upload/resize_cache/iblock/189/320_320_1/bwvvmtb0w29a1e5ig1ti01ex0uctlyqn.jpg","isPhoto":true},
  {"t":"gres","b":"Казахстан","n":"AUTUNNO BASE LIGHT BEIGE","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":1176,"p":1080,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Дрим Белый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":1155,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Лия Бежевый","s":"600 × 300 × 9 мм","k":"600×300","g":"Стандарт","q":1152,"p":450,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Лайт Бежевый","s":"600 × 200 × 9 мм","k":"600×200","g":"Стандарт","q":1150,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Калакатта Серые","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":1134,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Unitile (г. Шахты)","n":"НОРДЛАНД Бежевый 01","s":"125 × 500 мм","k":"500×125","g":"Стандарт","q":1133,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Unitile (г. Шахты)","n":"СМОУК Серый 01","s":"125 × 500 мм","k":"500×125","g":"Стандарт","q":1133,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Белый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":1085,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/987/320_320_1/h0p5tfapegkuhuhqm9colvsgz03qyniy.jpg","isPhoto":true},
  {"t":"gres","b":"Unitile (г. Шахты)","n":"ВАРДИ Бежевый 01","s":"125 × 500 мм","k":"500×125","g":"Стандарт","q":1070,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Роял Ноэль Эмперадор Коричневый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":1044,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Marble line dark grey Серый Тёмный","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":1042,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Terrazzo mix Бежевый","s":"450 × 450 × 8 мм","k":"450×450","g":"Стандарт","q":1002,"p":650,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Гермес Короичневый","s":"400 × 250 × 8 мм","k":"400×250","g":"Стандарт","q":994,"p":450,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Шерон Бежевый","s":"600 × 300 × 9 мм","k":"600×300","g":"Стандарт","q":961,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Магма Коричневый Темный","s":"600 × 600 × 10 мм","k":"600×600","g":"Стандарт","q":961,"p":950,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Моногамма Серый","s":"600 × 200 × 9 мм","k":"600×200","g":"ПК","q":840,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Казахстан","n":"PULPIS GREY","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":839,"p":1080,"img":"https://lincer.ru/upload/resize_cache/iblock/633/320_320_1/gt78h1h5ulbfvfc0sfki5ebdmrku8luu.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Глэдис Бежевый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":828,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Хитроу Синий","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":804,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Прайм Цемент Светло-Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"Сортовая","q":802,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Черный Обрезной","s":"600 × 1200 × 9 мм","k":"1200×600","g":"2 сорт","q":763,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/7af/320_320_1/02rtp2m0si13z5p0kbmfrwul036u1btz.jpg","isPhoto":true},
  {"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Серый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"1200×600","g":"2 сорт","q":762,"p":1250,"img":"https://lincer.ru/upload/resize_cache/iblock/27f/320_320_1/y96vd38d6ojtddaop04dbnhl66h59qyy.jpg","isPhoto":true},
  {"t":"gres","b":"Казахстан","n":"NATURA WHITE РЫЖИЕ ПРОЖИЛКИ","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":761,"p":1080,"img":"","isPhoto":false},
  {"t":"tile","b":"Kerama Marazzi","n":"Калейдоскоп Белый","s":"200 × 200 мм","k":"200×200","g":"1 сорт","q":742,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/ab0/320_320_1/ab0ecf1b0eea13b132c3268f1657199c.jpg","isPhoto":true},
  {"t":"gres","b":"Казахстан","n":"CONCRETE LIGHT GREY","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":735,"p":1080,"img":"https://lincer.ru/upload/resize_cache/iblock/d15/320_320_1/fxq1hg787qs4058kcebbj1h1zz0tnpyl.jpg","isPhoto":true},
  {"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Серый Светлый","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":732,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/2f2/320_320_1/ikzxo89o0691wt3mp8u0soa67ikrdmiu.jpg","isPhoto":true},
  {"t":"gres","b":"М-Квадрат","n":"Ривьера Серый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":707,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Грани Таганая","n":"Грани Таганая GTF422M РЖАВЧИНА","s":"1200 × 600 мм","k":"1200×600","g":"","q":680,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Мадра Коричневый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":642,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Unitile (г. Шахты)","n":"ГЕРМЕС Белый Терраццо 02","s":"400 × 400 × 8 мм","k":"400×400","g":"Стандарт","q":640,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Mono smoke Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":633,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Джойс Бирюзовый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":598,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Серый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"1200×600","g":"1 сорт","q":567,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/51d/320_320_1/v86dse7a7ijxsxer2sqrkp73btlb4xxd.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Луксор Вуд Коричневый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":563,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Джойс Синий","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":562,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Джойс Розовый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":546,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Palette Skin Бежевый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":534,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Дрим Голубой","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":531,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Коричневый Светлый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":521,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/711/320_320_1/xbcbspb16oufl6yvj1c3sc6eemuuc152.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Джойс Бирюзовый","s":"500 × 250 × 9 мм","k":"500×250","g":"ПК","q":505,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Alcor Светлый","s":"600 × 200 × 9 мм","k":"600×200","g":"ПК","q":498,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Kids Желтый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":478,"p":null,"img":"https://plitburg.ru/upload/dev2fun.imagecompress/webp/iblock/496/r9mfds7eitcpsnh48vyjt1qd9v0nq5qa.webp","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Однотонная Белый Матовая","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":472,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Kids Оранжевый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":472,"p":null,"img":"https://plitburg.ru/upload/dev2fun.imagecompress/webp/iblock/c02/vyzarrh7xs95g1ffn91tox698l3r1ffm.webp","isPhoto":true},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Оранжевый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":442,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/bf7/320_320_1/bf7bfb7bc912600c203b11b30e249e6f.jpg","isPhoto":true},
  {"t":"gres","b":"М-Квадрат","n":"Sonata Серый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":430,"p":650,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Даф Серый","s":"600 × 200 × 9 мм","k":"600×200","g":"Оптимум","q":420,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Фиолетовый Обрезной","s":"600 × 600 × 11 мм","k":"600×600","g":"2 сорт","q":403,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Grandwood Бежевый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":390,"p":650,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Antibs Бежевый Тёмный","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":387,"p":950,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Сарагоса Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"Оптимум","q":385,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Unitile (г. Шахты)","n":"НОРДЛАНД Бежевый 03","s":"125 × 500 мм","k":"500×125","g":"Стандарт","q":377,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Sens Light Серый","s":"500 × 250 × 9 мм","k":"500×250","g":"Оптимум","q":368,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Matera СЕРЫЙ","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":360,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Фрегат Бежевый Обрезной","s":"200 × 800 × 9 мм","k":"800×200","g":"1 сорт","q":359,"p":null,"img":"https://lincer.ru/upload/dev2fun.imagecompress/webp/iblock/595/k49kgdbh7ve7t4wc2y72z1j6mk7tleuj.webp","isPhoto":true},
  {"t":"gres","b":"Казахстан","n":"CHIPS WHITE","s":"600 × 600 × 9,5 мм","k":"600×600","g":"","q":358,"p":1080,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Терраццо Серый","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":353,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/87a/320_320_1/mypaloms3ft1giuwjl8x14yl299ls3yl.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Kids Голубой","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":351,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Мюнхен Камни Коричневый","s":"330 × 330 × 8 мм","k":"330×330","g":"ГОСТ","q":351,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Норд Серый","s":"400 × 200 × 8 мм","k":"400×200","g":"Оптимум","q":350,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Kids Зеленый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":344,"p":null,"img":"https://plitburg.ru/upload/dev2fun.imagecompress/webp/iblock/dbb/2fzdgksdey0vmtrm6gl3iedlf8v6hmp1.webp","isPhoto":true},
  {"t":"tile","b":"Kerama Marazzi","n":"Калейдоскоп Бежевый","s":"200 × 200 мм","k":"200×200","g":"1 сорт","q":339,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/228/320_320_1/2284eac41c089343473a7f1a23dcdc9f.jpg","isPhoto":true},
  {"t":"gres","b":"М-Квадрат","n":"Магма Серый Светлый","s":"600 × 600 × 10 мм","k":"600×600","g":"Стандарт","q":334,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Сенат Бежевый Обрезной","s":"400 × 400 × 8 мм","k":"400×400","g":"1 сорт","q":325,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/6ea/320_320_1/6eadbcee3e531c3fab774b0833f3d5b3.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Норд Бежевый","s":"400 × 200 × 8 мм","k":"400×200","g":"Оптимум","q":319,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Норд ТЕМНО Бежевый","s":"400 × 200 × 8 мм","k":"400×200","g":"Оптимум","q":312,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Мотиво Серый Светлый","s":"400 × 400 × 8 мм","k":"400×400","g":"1 сорт","q":309,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/445/320_320_1/2krbffdgfkvcaewnwfd84ulcagd5omm0.jpg","isPhoto":true},
  {"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Серый Светлый Обрезной","s":"600 × 1200 × 9 мм","k":"1200×600","g":"2 сорт","q":283,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/51d/320_320_1/v86dse7a7ijxsxer2sqrkp73btlb4xxd.jpg","isPhoto":true},
  {"t":"gres","b":"Kerama Marazzi","n":"Гармония Белый","s":"300 × 300 × 8 мм","k":"300×300","g":"2 сорт","q":272,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/4b0/320_320_1/4b0df93b7a79705c7a03fe961d4346e2.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Kids Серый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":268,"p":null,"img":"https://plitburg.ru/upload/dev2fun.imagecompress/webp/iblock/a13/udf6xzjl3o93le7m16wvv4pw4n886eog.webp","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Paradise White Белый","s":"500 × 250 × 9 мм","k":"500×250","g":"Оптимум","q":264,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Магма Серый Темный","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":240,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Сенат Серый Светлый Обрезной","s":"400 × 400 × 8 мм","k":"400×400","g":"1 сорт","q":239,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/aaa/320_320_1/aaa3fcf9c9e51774b9a950761fa03e9a.jpg","isPhoto":true},
  {"t":"gres","b":"Kerama Marazzi","n":"Терраццо Серый","s":"600 × 600 × 9 мм","k":"600×600","g":"2 сорт","q":237,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/87a/320_320_1/mypaloms3ft1giuwjl8x14yl299ls3yl.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Однотонная Белый Матовая","s":"600 × 300 × 9 мм","k":"600×300","g":"Сортовая","q":228,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Красный Обрезной","s":"600 × 600 × 11 мм","k":"600×600","g":"1 сорт","q":226,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/c56/320_320_1/c569e0b98e41ea5d77f381553347d971.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Джойс Коричневый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":224,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Квадро Декор","n":"Керамогранит технический Соль-Перец Серый Матовая","s":"300 × 300 × 8 мм","k":"300×300","g":"","q":220,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/f36/320_320_1/f3632254448c78a146ea7d6b6466452c.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Норд Бежевый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":219,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Магма Коричневый Светлый","s":"600 × 600 × 10 мм","k":"600×600","g":"ГОСТ","q":216,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Терраццо Серый Светлый","s":"600 × 600 × 9 мм","k":"600×600","g":"2 сорт","q":210,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/da6/320_320_1/utn5o6eyu170ihwyk9dtk34g9ppvhrat.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Слим Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":207,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/22c/320_320_1/22cb48df2a0fb5fe7fdab54a249d3297.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Сарагоса Коричневый","s":"600 × 300 × 9 мм","k":"600×300","g":"Оптимум","q":201,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Белый Обрезной","s":"600 × 1200 × 11 мм","k":"1200×600","g":"3 сорт","q":197,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/e92/320_320_1/f25c894udzyz113ia4jr7xcqhxcej3bm.jpg","isPhoto":true},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Белый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"2 сорт","q":190,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/987/320_320_1/h0p5tfapegkuhuhqm9colvsgz03qyniy.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Норд Серый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":174,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Interni Grey Серый","s":"500 × 250 × 9 мм","k":"500×250","g":"Оптимум","q":173,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Фьюжен Серый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":172,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"S.WHITE Белый","s":"600 × 300 × 9 мм","k":"600×300","g":"Оптимум","q":172,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Парфюм бежевый","s":"400 × 250 × 8 мм","k":"400×250","g":"Стандарт","q":170,"p":450,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Моноколор Белый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":169,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Сарагоса Бежевый","s":"600 × 300 × 9 мм","k":"600×300","g":"Оптимум","q":163,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Монте Тиберио Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":158,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/2ac/320_320_1/henze2hcdkhrgr7e2887sy25of8i4stt.jpg","isPhoto":true},
  {"t":"gres","b":"Евро-Керамика","n":"ГРАНДАС Рект","s":"600 × 600 × 10 мм","k":"600×600","g":"2 сорт","q":156,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/123/320_320_1/123f8bedf353356e7ac33c35dd1b9c0d.jpg","isPhoto":true},
  {"t":"gres","b":"Казахстан","n":"В60324","s":"600 × 600 мм","k":"600×600","g":"","q":154,"p":1080,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Норд Белый","s":"400 × 400 × 8 мм","k":"400×400","g":"3 сорт","q":144,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Фьюжен Белый","s":"400 × 200 × 8 мм","k":"400×200","g":"Оптимум","q":129,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Сарагоса Белый","s":"400 × 200 × 8 мм","k":"400×200","g":"ПК","q":128,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Элегия Песочный","s":"385 × 385 × 8,5 мм","k":"385×385","g":"Стандарт","q":126,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Kerama Marazzi","n":"Про Матрикс Серый Светлый Матовый обрезной","s":"300 × 600 × 9 мм","k":"600×300","g":"","q":126,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/4cc/320_320_1/g925pob859qw8zoamqjnf566jng8qfgv.jpg","isPhoto":true},
  {"t":"tile","b":"","n":"Oslo Синий","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":124,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Эмилия Бежевый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":120,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Kids Красный","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":117,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Монохромо Белый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":115,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Saboya Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"Стандарт","q":111,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Mezzo Серый","s":"450 × 450 × 8 мм","k":"450×450","g":"ГОСТ","q":109,"p":650,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Желтый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":106,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"М-Квадрат","n":"Rocks Light Grey Серый Светлый","s":"600 × 600 × 10 мм","k":"600×600","g":"Стандарт","q":105,"p":950,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Бежевый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":101,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Kerama Marazzi","n":"Калейдоскоп Персиковый","s":"200 × 200 мм","k":"200×200","g":"1 сорт","q":99,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/30e/320_320_1/30e44ac55fb493d514c5ab350c79334f.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Atlantic Light Белый","s":"500 × 250 × 9 мм","k":"500×250","g":"Оптимум","q":99,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Казахстан","n":"В60336","s":"600 × 600 мм","k":"600×600","g":"","q":97,"p":1080,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Про Матрикс Бежевый обрезной","s":"600 × 150 × 11 мм","k":"600×150","g":"1 сорт","q":93,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Фьюжен Белый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":87,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Квадро Декор","n":"Керамогранит технический Техно 2 Серый Матовая","s":"300 × 300 × 7 мм","k":"300×300","g":"","q":87,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"","n":"Керамогранит технический Техно-2 Серый Матовая Ступень","s":"300 × 300 × 7 мм","k":"300×300","g":"","q":87,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Artdeco White Белый","s":"500 × 250 × 9 мм","k":"500×250","g":"Оптимум","q":86,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Пурпурно-Красный Обрезной","s":"600 × 600 × 11 мм","k":"600×600","g":"1 сорт","q":74,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Квадро Декор","n":"Керамогранит технический УТОЛЩЕННЫЙ Соль-Перец Серый Матовая","s":"300 × 300 × 12 мм","k":"300×300","g":"","q":74,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Хитроу Терракотовый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":72,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Зеленый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":72,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Касл Серый","s":"500 × 250 × 9 мм","k":"500×250","g":"Оптимум","q":69,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Сарагоса Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":68,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Джойс Синий","s":"500 × 250 × 9 мм","k":"500×250","g":"ПК","q":68,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Урбан Серый Светлый","s":"300 × 300 × 8 мм","k":"300×300","g":"1 сорт","q":66,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Карен Серый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":64,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Росси Серый","s":"385 × 385 × 8,5 мм","k":"385×385","g":"Стандарт","q":63,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Раф Рельеф зеленый","s":"600 × 300 × 9 мм","k":"600×300","g":"Сортовая","q":61,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Стоун Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"Оптимум","q":61,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/446/320_320_1/68vzptybe8dc07ywhrj8n5f9da9yjdf9.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Кураж 2 КРАСНЫЙ","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":57,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Frida Grey","s":"600 × 300 × 9 мм","k":"600×300","g":"ПК","q":57,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Hugo Серый","s":"600 × 300 × 9 мм","k":"600×300","g":"Стандарт","q":54,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Синий Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"1 сорт","q":50,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/d9b/320_320_1/d9bbd7a253dee9327756a136743fcb74.jpg","isPhoto":true},
  {"t":"gres","b":"Kerama Marazzi","n":"Радуга Бежевый Обрезной","s":"600 × 600 × 11 мм","k":"600×600","g":"1 сорт","q":48,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Коллиано Серый","s":"300 × 300 × 8 мм","k":"300×300","g":"1 сорт","q":47,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/3cf/320_320_1/3cf5d0f682068a56d659a174b1f0d69a.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Venice Crema Бежевый","s":"600 × 300 × 9 мм","k":"600×300","g":"Оптимум","q":45,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Фондамента Серый Темный","s":"600 × 600 × 11 мм","k":"600×600","g":"1 сорт","q":44,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/2ac/320_320_1/rn7mt6d93dditm0g7ddk3xl2un2ojbpn.jpg","isPhoto":true},
  {"t":"tile","b":"Нефрит-Керамика","n":"Дрим Лиловый","s":"500 × 250 × 9 мм","k":"500×250","g":"Стандарт","q":43,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Дженни Бежевый","s":"400 × 200 × 8 мм","k":"400×200","g":"Стандарт","q":43,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Лия Бежевый","s":"600 × 300 × 9 мм","k":"600×300","g":"Оптимум","q":40,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Бейс Калакатта Грей","s":"600 × 300 × 9 мм","k":"600×300","g":"Стандарт","q":39,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Нарни Серый","s":"600 × 200 × 9 мм","k":"600×200","g":"Оптимум","q":37,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Грани Таганая","n":"Грани Таганая GT061M ЯНТАРЬ","s":"1200 × 600 мм","k":"1200×600","g":"","q":35,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Kerama Marazzi","n":"Королевская Дорога Коричневый Светлый Обрезной","s":"600 × 600 × 9 мм","k":"600×600","g":"2 сорт","q":34,"p":null,"img":"https://lincer.ru/upload/resize_cache/iblock/711/320_320_1/xbcbspb16oufl6yvj1c3sc6eemuuc152.jpg","isPhoto":true},
  {"t":"gres","b":"Евро-Керамика","n":"10 GCR 0016. ТЕХНО","s":"600 × 600 × 10 мм","k":"600×600","g":"1 сорт","q":34,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Сиата Оливковый","s":"600 × 300 × 9 мм","k":"600×300","g":"Сортовая","q":34,"p":null,"img":"","isPhoto":false},
  {"t":"gres","b":"Казахстан","n":"В60332","s":"600 × 600 мм","k":"600×600","g":"","q":32,"p":1080,"img":"","isPhoto":false},
  {"t":"tile","b":"Unitile (г. Шахты)","n":"Delux beige wall 01 ГЛАДКАЯ","s":"600 × 250 × 9 мм","k":"600×250","g":"","q":31,"p":null,"img":"","isPhoto":false},
  {"t":"tile","b":"Нефрит-Керамика","n":"Фреш Белый","s":"500 × 250 × 9 мм","k":"500×250","g":"Оптимум","q":30,"p":null,"img":"","isPhoto":false}
]
// Текстуры для безопасного отката, если удаленная ссылка не загрузилась
const FALLBACK_TEXTURES = {
  marbleWhite: '/images/tiles/marble-white.jpg',
  marbleBeige: '/images/tiles/marble-beige.jpg',
  terrazzo: '/images/tiles/terrazzo-light.jpg',
  concrete: '/images/tiles/gray-concrete.jpg',
  slate: '/images/tiles/slate-dark.jpg',
  sandstone: '/images/tiles/sandstone-beige.jpg',
  woodBeige: '/images/tiles/wood-beige.jpg',
  mosaicBlue: '/images/tiles/mosaic-blue.jpg',
}

function getSafeFallback(item: StroyItem): string {
  const n = (item.n || '').toLowerCase()
  if (n.includes('terrazzo') || n.includes('терраццо') || n.includes('перец')) return FALLBACK_TEXTURES.terrazzo
  if (n.includes('каньон') || n.includes('песоч') || n.includes('amber') || n.includes('тесина')) return FALLBACK_TEXTURES.sandstone
  if (n.includes('wood') || n.includes('вуд') || n.includes('дерево') || n.includes('фрегат') || n.includes('нордланд')) return FALLBACK_TEXTURES.woodBeige
  if (n.includes('черн') || n.includes('чёрн') || n.includes('ferrum') || n.includes('магма темн')) return FALLBACK_TEXTURES.slate
  if (n.includes('син') || n.includes('голуб') || n.includes('navy')) return FALLBACK_TEXTURES.mosaicBlue
  if (n.includes('бел') || n.includes('white') || n.includes('калакатта') || n.includes('тиберио')) return FALLBACK_TEXTURES.marbleWhite
  if (n.includes('беж') || n.includes('crema') || n.includes('роял')) return FALLBACK_TEXTURES.marbleBeige
  return FALLBACK_TEXTURES.concrete
}

function formatNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return '0'
  return n.toLocaleString('ru-RU')
}

// Нормализация поискового запроса строителей
function normalizeSearchText(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[xх*×]/g, 'x')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function StroyPageClient() {
  const [cat, setCat] = useState<string>('all')
  const [brand, setBrand] = useState<string>('all')
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set())
  const [onlyWithPrice, setOnlyWithPrice] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('stock')
  const [shown, setShown] = useState<number>(40)

  const [selectedItem, setSelectedItem] = useState<StroyItem | null>(null)
  const [quantity, setQuantity] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)

  const [callDialogOpen, setCallDialogOpen] = useState<boolean>(false)
  const [callPhone, setCallPhone] = useState<string>('')
  const [callName, setCallName] = useState<string>('')
  const [callStatus, setCallStatus] = useState<string>('')
  const [callSuccess, setCallSuccess] = useState<boolean>(false)

  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [lightboxImage, setLightboxImage] = useState<string>('')
  const [lightboxTitle, setLightboxTitle] = useState<string>('')

  // Статистика размеров и брендов
  const { topSizes, hasOtherSizes, allBrands } = useMemo(() => {
    const sizeCounts: Record<string, number> = {}
    const brandSet = new Set<string>()
    ITEMS.forEach((i) => {
      sizeCounts[i.k] = (sizeCounts[i.k] || 0) + 1
      if (i.b && i.b !== '-') brandSet.add(i.b)
    })
    const sortedSizes = Object.keys(sizeCounts).sort((a, b) => sizeCounts[b] - sizeCounts[a])
    const top = sortedSizes.slice(0, 8)
    return {
      topSizes: top,
      hasOtherSizes: sortedSizes.length > top.length,
      allBrands: Array.from(brandSet).sort(),
    }
  }, [])

  // Блокировка скролла body при открытых модалках и слушатель Esc
  useEffect(() => {
    const isAnyModalOpen = Boolean(selectedItem || callDialogOpen || lightboxOpen)
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false)
        } else if (callDialogOpen) {
          setCallDialogOpen(false)
        } else if (selectedItem) {
          setSelectedItem(null)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedItem, callDialogOpen, lightboxOpen])

  // Фильтрация товаров
  const filteredItems = useMemo(() => {
    const qRaw = searchQuery.trim()
    const qNorm = normalizeSearchText(qRaw)

    return ITEMS.filter((item) => {
      // 1. Категория
      if (cat !== 'all' && item.t !== cat) return false

      // 2. Бренд
      if (brand !== 'all' && item.b !== brand) return false

      // 3. Только с ценой
      if (onlyWithPrice && (item.p === null || item.p <= 0)) return false

      // 4. Размер
      if (selectedSizes.size > 0) {
        const matchesSelected = selectedSizes.has(item.k)
        const matchesOther = selectedSizes.has('other') && !topSizes.includes(item.k)
        if (!matchesSelected && !matchesOther) return false
      }

      // 5. Поиск
      if (qNorm) {
        const itemTextNorm = normalizeSearchText(`${item.n} ${item.b} ${item.s} ${item.g} ${item.k}`)
        const isGres = item.t === 'gres'
        const categorySynonyms = isGres
          ? 'керамогранит gres гранит пол напольная'
          : 'плитка tile кафель стена настенная'

        // Проверяем формат (напр. 600x600, 60x60, 1200x600)
        const formatVariants = [item.k.replace(/×/g, 'x'), item.k.replace(/×/g, '*')]
        if (item.k === '600×600') formatVariants.push('60x60', '600x600', '60 60')
        if (item.k === '1200×600') formatVariants.push('120x60', '1200x600', '60x120')
        if (item.k === '450×450') formatVariants.push('45x45', '450x450')
        if (item.k === '300×300') formatVariants.push('30x30', '300x300')

        const searchTokens = qNorm.split(' ')
        const allTokensMatch = searchTokens.every((token) => {
          return (
            itemTextNorm.includes(token) ||
            categorySynonyms.includes(token) ||
            formatVariants.some((fv) => fv.includes(token))
          )
        })

        if (!allTokensMatch) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'stock') {
        return b.q - a.q
      }
      const pa = a.p
      const pb = b.p
      if (!pa && !pb) return b.q - a.q
      if (!pa) return 1
      if (!pb) return -1
      return sortBy === 'asc' ? pa - pb : pb - pa
    })
  }, [cat, brand, onlyWithPrice, selectedSizes, searchQuery, sortBy, topSizes])

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

  const isAnyFilterActive =
    cat !== 'all' ||
    brand !== 'all' ||
    selectedSizes.size > 0 ||
    onlyWithPrice ||
    searchQuery.trim().length > 0 ||
    sortBy !== 'stock'

  function resetAllFilters() {
    setCat('all')
    setBrand('all')
    setSelectedSizes(new Set())
    setOnlyWithPrice(false)
    setSearchQuery('')
    setSortBy('stock')
    setShown(40)
  }

  function toggleSize(k: string) {
    const next = new Set(selectedSizes)
    if (next.has(k)) {
      next.delete(k)
    } else {
      next.add(k)
    }
    setSelectedSizes(next)
    setShown(40)
  }

  function openItemDetails(item: StroyItem) {
    setSelectedItem(item)
    setQuantity('')
    setCopied(false)
  }

  function openDialog(item?: StroyItem | null, qty?: number) {
    setSelectedItem(item || null)
    setQuantity(qty ? qty.toString() : '')
    setCallDialogOpen(true)
    setCallStatus('')
    setCallSuccess(false)
    setCallPhone('')
    setCallName('')
  }

  function openLightbox(item: StroyItem) {
    if (item.img) {
      setLightboxImage(item.img)
      setLightboxTitle(`${item.n} (${item.s})`)
      setLightboxOpen(true)
    }
  }

  function getMessage(item: StroyItem | null, q: number): string {
    if (!item) return 'Здравствуйте! Интересуют оптовые поставки плитки и керамогранита со склада.'
    let t = `Здравствуйте! Интересует: ${item.n}, ${item.s}`
    if (item.b) t += `, ${item.b}`
    if (item.g) t += `, ${item.g}`
    t += q > 0 ? `. Нужный объём: ${q} м².` : `. Подскажите, пожалуйста, текущий остаток.`
    t += item.p ? ` Цена на сайте: ${formatNumber(item.p)} ₽/м² с НДС.` : ` Назовите, пожалуйста, оптовую цену.`
    return t + ' Счёт на организацию с НДС, самовывоз в Войскорово или доставка.'
  }

  function copyRequest() {
    if (!selectedItem) return
    const msg = getMessage(selectedItem, parseFloat(quantity) || 0)
    navigator.clipboard.writeText(msg)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  async function handleCallSubmit(e: FormEvent) {
    e.preventDefault()
    const digitsOnly = callPhone.replace(/\D/g, '')
    if (digitsOnly.length < 10) {
      setCallStatus('Пожалуйста, укажите корректный номер телефона (не менее 10 цифр)')
      return
    }

    setCallStatus('Отправляем...')

    const what = selectedItem
      ? `Позиция: ${selectedItem.n}, ${selectedItem.s}${selectedItem.b ? `, ${selectedItem.b}` : ''}${selectedItem.g ? `, ${selectedItem.g}` : ''}${quantity > 0 ? `. Нужно: ${quantity} м²` : ''}${selectedItem.p ? `. Цена на сайте: ${formatNumber(selectedItem.p)} ₽/м²` : ''}`
      : 'Запрос с главной страницы'

    const message = `Заказ звонка: ${callPhone}${callName ? ` (${callName})` : ''}. ${what}`

    try {
      if (CFG.web3formsKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: CFG.web3formsKey,
            subject: 'Заказ звонка: ТФ Керамика',
            from_name: 'Сайт ТФ Керамика',
            name: callName || 'Не указано',
            phone: callPhone,
            message: what,
          }),
        })

        const data = await response.json()
        if (!data.success) throw new Error('Failed')
      }

      setCallStatus('')
      setCallSuccess(true)
      setCallPhone('')
      setCallName('')
    } catch (error) {
      const tgLink = `${CFG.tg}?text=${encodeURIComponent(message)}`
      setCallStatus(
        `Не удалось отправить. Напишите нам в <a href="${tgLink}" target="_blank" rel="noopener" className="underline">Telegram</a>.`
      )
    }
  }

  function exportToCsv() {
    const headers = [
      'Наименование',
      'Тип',
      'Производитель/Бренд',
      'Размер (мм)',
      'Сорт/ГОСТ',
      'Остаток на складе, м²',
      'Оптовая цена, ₽/м² с НДС',
    ]

    const rows = filteredItems.map((it) => [
      `"${it.n.replace(/"/g, '""')}"`,
      `"${it.t === 'gres' ? 'Керамогранит' : 'Плитка'}"`,
      `"${it.b.replace(/"/g, '""')}"`,
      `"${it.s.replace(/"/g, '""')}"`,
      `"${(it.g || 'ГОСТ / 1 сорт').replace(/"/g, '""')}"`,
      it.q,
      it.p !== null ? it.p : 'По запросу',
    ])

    const csvContent =
      '\uFEFF' + [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute(
      'download',
      `Ostatki_Plitka_Sklad_Voyskorovo_${new Date().toISOString().slice(0, 10)}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-[#f3f2ee] text-[#1f2429]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Banner / Information bar */}
      <div className="bg-[#1f2429] text-[#e8e7e1] py-2.5 px-4 text-xs border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Склад в Войскорово (СПб) открыт: {CFG.hours}</span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="hidden sm:inline text-gray-300">Работаем по счёту с НДС 20%</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${CFG.phoneClean}`}
              className="font-bold text-[#f4c400] hover:underline flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> {CFG.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4c400]/20 border border-[#f4c400] text-xs font-bold text-[#6a5400] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b08800]" />
            Оптовые складские остатки со скидкой до 70%
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            Плитка и керамогранит для строителей. Остатки со склада от 400 ₽/м²
          </h1>
          <p className="text-base sm:text-lg text-[#555d64] mb-6 max-w-3xl leading-relaxed">
            Цены с НДС, работаем по счёту. Забираете сами в Войскорово или заказываете доставку. Цены действуют до 31 октября или до окончания остатков.
          </p>

          <div className="flex gap-3 flex-wrap items-center">
            <a
              href="#prices"
              className="px-6 py-3 rounded-xl bg-[#1f2429] text-white font-bold hover:bg-[#2e353c] transition-all shadow-md flex items-center gap-2"
            >
              Смотреть остатки и цены ({ITEMS.length})
            </a>
            <button
              onClick={() => openDialog()}
              className="px-5 py-3 rounded-xl bg-[#f4c400] text-gray-900 font-bold hover:bg-[#ffcf10] transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" /> Заказать звонок / расчёт
            </button>
            <a
              href={CFG.tg}
              target="_blank"
              rel="noopener"
              className="px-5 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-800 font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-[#229ED9]" /> Написать в Telegram
            </a>
          </div>
        </div>

        {/* Catalog Section */}
        <section id="prices" className="scroll-mt-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Складская ведомость наличия
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Цены за м² с НДС. Нажмите на плитку для детального просмотра и расчёта сметы.
              </p>
            </div>
            <button
              onClick={exportToCsv}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:border-gray-900 text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              title="Скачать отфильтрованный список в формате Excel / CSV"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              Скачать ведомость в Excel
            </button>
          </div>

          {/* Main Filter Controls Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200/90 mb-5 space-y-4">
            {/* Row 1: Category pills + Search + Sort */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Type selector */}
              <div className="inline-flex rounded-xl bg-gray-100 p-1">
                <button
                  onClick={() => { setCat('all'); setShown(40) }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    cat === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Всё ({ITEMS.length})
                </button>
                <button
                  onClick={() => { setCat('tile'); setShown(40) }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    cat === 'tile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Плитка
                </button>
                <button
                  onClick={() => { setCat('gres'); setShown(40) }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    cat === 'gres' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Керамогранит
                </button>
              </div>

              {/* Search bar */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShown(40) }}
                  placeholder="Поиск: коллекция, размер (600x600), бренд или сорт..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-[#1f2429] text-gray-900"
                />
              </div>

              {/* Sorting */}
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setShown(40) }}
                className="px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white font-medium text-gray-800 focus:outline-none focus:border-[#1f2429] cursor-pointer"
              >
                <option value="stock">Сначала больше остаток</option>
                <option value="asc">Сначала дешевле</option>
                <option value="desc">Сначала дороже</option>
              </select>
            </div>

            {/* Row 2: Brand filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-500 mr-1">Завод / Бренд:</span>
              <button
                onClick={() => { setBrand('all'); setShown(40) }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  brand === 'all'
                    ? 'bg-[#1f2429] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Все
              </button>
              {allBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => { setBrand(b); setShown(40) }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    brand === b
                      ? 'bg-[#1f2429] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Row 3: Size Filters + "Только с ценой" + Reset */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Фильтр по размеру">
                <span className="text-xs font-bold text-gray-500 mr-1">Формат:</span>
                {topSizes.map((k) => {
                  const isSelected = selectedSizes.has(k)
                  return (
                    <button
                      key={k}
                      onClick={() => toggleSize(k)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#f4c400] text-gray-950 font-bold border border-[#a88700]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {k}
                    </button>
                  )
                })}
                {hasOtherSizes && (
                  <button
                    onClick={() => toggleSize('other')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedSizes.has('other')
                        ? 'bg-[#f4c400] text-gray-950 font-bold border border-[#a88700]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                    }`}
                  >
                    Другие размеры
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={onlyWithPrice}
                    onChange={(e) => { setOnlyWithPrice(e.target.checked); setShown(40) }}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  Только с ценой
                </label>

                {isAnyFilterActive && (
                  <button
                    onClick={resetAllFilters}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Сбросить фильтры
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Result Count and Status */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-3 px-1">
            <div>
              Найдено: <span className="font-extrabold text-gray-900">{n}</span> {positionWord}
              {selectedSizes.size > 0 && ` (фильтр по ${selectedSizes.size} форматам)`}
            </div>
            <div className="text-gray-500">
              Склад в Войскорово • Обновлено {CFG.updated}
            </div>
          </div>

          {/* Items List */}
          <div className="grid gap-3">
            {displayedItems.map((item, idx) => (
              <div
                key={`${item.n}-${idx}`}
                className="group bg-white rounded-xl border border-gray-200 hover:border-gray-900 transition-all shadow-xs hover:shadow-md p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Thumbnail & Details */}
                <div
                  onClick={() => openItemDetails(item)}
                  className="flex items-center gap-4 cursor-pointer flex-1"
                >
                  {/* Photo Container */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      openLightbox(item)
                    }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-1 group/img"
                    title="Нажмите для увеличения"
                  >
                    <img
                      src={optimizeImage(item.img, 200)}
                      alt={item.n}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = getSafeFallback(item)
                      }}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover/img:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white drop-shadow" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-base sm:text-lg text-gray-900 group-hover:text-amber-800 transition-colors">
                        {item.n}
                      </span>
                      {item.isPhoto ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Фото
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Текстура
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm text-gray-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-semibold text-gray-700">{item.s}</span>
                      <span>•</span>
                      <span>{item.b}</span>
                      {item.g && (
                        <>
                          <span>•</span>
                          <span className="text-gray-600 font-medium">{item.g}</span>
                        </>
                      )}
                    </div>

                    <div className="text-xs text-gray-600 flex items-center gap-1.5 pt-0.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                      <span>В наличии на складе: </span>
                      <span className="font-bold text-gray-900">{formatNumber(item.q)} м²</span>
                    </div>
                  </div>
                </div>

                {/* Right: Price & CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="text-right">
                    {item.p ? (
                      <div className="inline-flex items-baseline gap-1 px-3 py-1.5 rounded-lg bg-[#f4c400] text-gray-950 font-black text-lg sm:text-xl">
                        {formatNumber(item.p)} <span className="text-xs font-bold text-gray-800">₽/м²</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-xs sm:text-sm font-semibold text-gray-600 bg-gray-50">
                        Цена по объёму
                      </div>
                    )}
                    <span className="block text-[10px] text-gray-500 mt-0.5">с НДС 20%</span>
                  </div>

                  <button
                    onClick={() => openItemDetails(item)}
                    className="px-4 py-2 rounded-lg bg-[#1f2429] text-white text-xs font-bold hover:bg-[#343d46] transition-colors cursor-pointer"
                  >
                    Заказать
                  </button>
                </div>
              </div>
            ))}

            {displayedItems.length === 0 && (
              <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 space-y-3">
                <HelpCircle className="w-10 h-10 text-gray-400 mx-auto" />
                <div className="text-base font-bold text-gray-800">
                  По вашему запросу ничего не найдено
                </div>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Свяжитесь с нами — на складе регулярно появляются новые партии плитки и керамогранита. Подберём аналог под ваш проект.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={resetAllFilters}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-bold text-gray-800 cursor-pointer"
                  >
                    Сбросить фильтры
                  </button>
                  <button
                    onClick={() => openDialog()}
                    className="px-4 py-2 rounded-lg bg-[#f4c400] hover:bg-[#ffcf10] text-sm font-bold text-gray-900 cursor-pointer"
                  >
                    Оставить заявку на подбор
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination / Load more */}
          <div className="text-center mt-6">
            {filteredItems.length > shown && (
              <button
                onClick={() => setShown(shown + 40)}
                className="px-6 py-3 rounded-xl bg-white border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              >
                Показать ещё ({Math.min(40, filteredItems.length - shown)})
              </button>
            )}
            {filteredItems.length > 40 && filteredItems.length <= shown && (
              <button
                onClick={() => document.getElementById('prices')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto text-sm cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" /> Наверх, к фильтрам
              </button>
            )}
          </div>
        </section>

        {/* How We Work Block */}
        <section className="py-12 mt-8 border-t border-gray-200">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900">
            Условия для строительных организаций и снабжения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900">Оплата по счёту с НДС</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Безналичный расчёт для юридических лиц и ИП с НДС 20%. Полный пакет закрывающих документов (УПД).
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900">Самовывоз и Доставка</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Самовывоз со склада в Войскорово (Пн–Пт, 08:00–18:00). Либо организуем доставку манипулятором по СПб и ЛО.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900">Бесплатный расчёт</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Пришлите ведомость или проект — посчитаем необходимое количество с учётом подрезки и запаса.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900">Сертификаты и ГОСТ</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Паспорта качества, сертификаты пожарной безопасности и протоколы испытаний на каждую партию.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section className="py-6">
          <div className="bg-[#1f2429] text-white rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4c400]/20 text-[#f4c400] text-xs font-bold mb-3">
                Прямая связь со складом
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
                Нужна плитка на строительный объект?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                Назовите объём или скиньте проектную спецификацию. Забронируем нужный метраж, зафиксируем цену и выставим счёт за 20 минут.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => openDialog()}
                  className="px-6 py-3 rounded-xl bg-[#f4c400] text-gray-950 font-bold hover:bg-[#ffcf10] transition-colors cursor-pointer"
                >
                  Заказать звонок
                </button>
                <a
                  href={CFG.tg}
                  target="_blank"
                  rel="noopener"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#229ED9]" /> Написать в Telegram
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 text-sm">
              <div className="font-bold text-lg text-[#f4c400] flex items-center gap-2">
                <Building2 className="w-5 h-5" /> ТФ Керамика
              </div>
              <p className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                <span>{CFG.address}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{CFG.hours}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${CFG.phoneClean}`} className="hover:underline text-white font-semibold">
                  {CFG.phone}
                </a>
              </p>
              <div className="pt-2">
                <a
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(CFG.address)}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs text-[#f4c400] hover:underline font-bold"
                >
                  Посмотреть проезд на Яндекс Картах →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer info note */}
        <div className="text-center text-xs text-gray-500 py-6">
          ООО «ТФ Керамика». Цены и наличие актуальны на дату обновления, остатки по позициям уточняйте у менеджера.
        </div>
      </div>

      {/* DETAIL MODAL: Beautiful Tile Presentation */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button anchored in corner */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-gray-100 border border-gray-200 text-gray-700 shadow-md flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Закрыть окно"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Showcase Stage */}
            <div className="relative bg-gradient-to-b from-[#fcfbf9] via-[#f4f2ec] to-[#e6e4dc] p-5 sm:p-6 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[310px] select-none border-b border-gray-200 shrink-0">
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap max-w-[70%]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f2429]/90 text-white text-xs font-semibold backdrop-blur-sm shadow-sm">
                  <Layers className="w-3.5 h-3.5 text-[#f4c400]" />
                  {selectedItem.s}
                </span>
                {selectedItem.isPhoto ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-medium backdrop-blur-sm shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Фото завода
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-600/90 text-white text-xs font-medium backdrop-blur-sm shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Образец текстуры
                  </span>
                )}
              </div>

              {/* Main Tile Image */}
              <div
                onClick={() => openLightbox(selectedItem)}
                className="relative group cursor-zoom-in max-h-[220px] sm:max-h-[260px] flex items-center justify-center my-2"
                title="Нажмите для увеличения на весь экран"
              >
                <img
                  src={selectedItem.img}
                  alt={selectedItem.n}
                  onError={(e) => {
                    e.currentTarget.src = getSafeFallback(selectedItem)
                  }}
                  className="max-h-[210px] sm:max-h-[250px] max-w-[85%] object-contain rounded-lg drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" /> На весь экран
                  </span>
                </div>
              </div>

              {/* Hint */}
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Нажмите на плитку, чтобы открыть в максимальном размере
              </div>
            </div>

            {/* Scrollable details and actions */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Title & Brand */}
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1 flex items-center gap-1.5">
                  <span>{selectedItem.b}</span>
                  <span>•</span>
                  <span>{selectedItem.t === 'gres' ? 'Керамогранит' : 'Керамическая плитка'}</span>
                  {selectedItem.g && (
                    <>
                      <span>•</span>
                      <span>{selectedItem.g}</span>
                    </>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  {selectedItem.n}
                </h3>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-gray-50 p-3.5 rounded-xl border border-gray-200/80 text-sm">
                <div>
                  <span className="text-xs text-gray-500 block">Размер</span>
                  <span className="font-bold text-gray-900">{selectedItem.s}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Сорт</span>
                  <span className="font-bold text-gray-900">{selectedItem.g || 'ГОСТ / 1 сорт'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">В наличии</span>
                  <span className="font-bold text-emerald-700">{formatNumber(selectedItem.q)} м²</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Склад</span>
                  <span className="font-bold text-gray-900">Войскорово</span>
                </div>
              </div>

              {/* Price & Live Calculator */}
              <div className="bg-[#fcfaf5] border-2 border-[#f4c400]/70 p-4 rounded-xl">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-bold text-gray-500 block uppercase tracking-wide">
                      Оптовая цена с НДС 20%
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">
                      {selectedItem.p ? (
                        <>
                          {formatNumber(selectedItem.p)}{' '}
                          <span className="text-lg font-bold text-gray-600">₽/м²</span>
                        </>
                      ) : (
                        <span className="text-xl text-gray-800">Цена по запросу (от 400 ₽/м²)</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Работаем по безналичному расчёту</span>
                </div>

                {/* Calculator input */}
                <div className="space-y-2 pt-3 border-t border-gray-200">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5 text-[#1f2429]" />
                      Рассчитать стоимость на объект:
                    </span>
                    {quantity && selectedItem.p && (
                      <span className="text-emerald-700 font-extrabold text-sm">
                        Итого: {formatNumber(Math.round((parseFloat(quantity) || 0) * selectedItem.p))} ₽ с НДС
                      </span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      step="any"
                      placeholder="Нужный объём, м² (напр. 150)"
                      className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-[#1f2429] text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity('100')}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                    >
                      100 м²
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantity('500')}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                    >
                      500 м²
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantity(selectedItem.q.toString())}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-[#f4c400]/40 hover:bg-[#f4c400] text-gray-900 cursor-pointer"
                      title="Забрать весь складской остаток"
                    >
                      Весь остаток
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <button
                  onClick={() => {
                    const qVal = parseFloat(quantity) || 0
                    setSelectedItem(null)
                    openDialog(selectedItem, qVal)
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#1f2429] text-white font-bold text-sm hover:bg-[#2b333a] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#f4c400]" />
                  Заказать счёт / звонок
                </button>
                <a
                  href={CFG.tg + '?text=' + encodeURIComponent(getMessage(selectedItem, parseFloat(quantity) || 0))}
                  target="_blank"
                  rel="noopener"
                  className="w-full py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  В Telegram
                </a>
                <button
                  onClick={copyRequest}
                  className={`w-full py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    copied
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                      : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Скопировано!' : 'Скопировать запрос'}
                </button>
              </div>

              {/* B2B Points */}
              <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-y-1 gap-x-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Оплата с НДС 20%
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-600" /> Самовывоз: склад Войскорово
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-gray-600" /> Быстрая доставка по СПб и ЛО
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALLBACK / ORDER DIALOG */}
      {callDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setCallDialogOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCallDialogOpen(false)}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            {!callSuccess ? (
              <>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Заказать звонок / расчёт</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                  Оставьте телефон — перезвоним в течение 15 минут в рабочее время ({CFG.hours}).
                </p>

                {selectedItem && (
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl mb-4 text-xs">
                    <span className="text-gray-500 block">Выбранная позиция:</span>
                    <span className="font-bold text-gray-900 block text-sm">
                      {selectedItem.n} ({selectedItem.s})
                    </span>
                    {quantity && (
                      <span className="text-emerald-700 font-bold block mt-0.5">
                        Объём: {quantity} м²
                      </span>
                    )}
                  </div>
                )}

                <form onSubmit={handleCallSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Номер телефона <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={callPhone}
                      onChange={(e) => setCallPhone(e.target.value)}
                      placeholder="+7 (900) 000-00-00"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-[#1f2429] text-gray-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Ваше имя или организация
                    </label>
                    <input
                      type="text"
                      value={callName}
                      onChange={(e) => setCallName(e.target.value)}
                      placeholder="например, ООО СтройИнвест или Алексей"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-[#1f2429] text-gray-900 text-sm"
                    />
                  </div>

                  {callStatus && (
                    <p className="text-xs text-rose-600 font-semibold">{callStatus}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#1f2429] text-white font-bold text-sm hover:bg-[#343e47] transition-all shadow-md mt-2 cursor-pointer"
                  >
                    Перезвоните мне
                  </button>

                  <p className="text-[11px] text-gray-400 text-center leading-tight">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных для связи с вами.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Заявка принята!</h3>
                <p className="text-sm text-gray-600">
                  Спасибо! Менеджер свяжется с вами по номеру{' '}
                  <span className="font-bold text-gray-900">{callPhone}</span> в рабочее время ({CFG.hours}).
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={
                      CFG.tg +
                      '?text=' +
                      encodeURIComponent(
                        `Запрос с сайта от ${callName || 'клиента'}: телефон ${callPhone}. ` +
                          (selectedItem ? `Позиция: ${selectedItem.n} (${selectedItem.s})` : '')
                      )
                    }
                    target="_blank"
                    rel="noopener"
                    className="w-full py-2.5 rounded-xl bg-[#229ED9] text-white text-xs font-bold hover:bg-[#1f8fce] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Написать прямо сейчас в Telegram
                  </a>
                  <button
                    onClick={() => setCallDialogOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX: High-Res Fullscreen View */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 sm:-top-12 sm:right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white text-xl font-bold flex items-center justify-center transition-all z-10 cursor-pointer"
              aria-label="Закрыть фото"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white rounded-2xl p-2.5 sm:p-4 shadow-2xl overflow-hidden">
              <img
                src={optimizeImage(lightboxImage, 800)}
                alt={lightboxTitle || 'Плитка'}
                className="w-full max-h-[80vh] object-contain rounded-xl mx-auto"
              />
              {lightboxTitle && (
                <div className="text-center text-xs sm:text-sm font-bold text-gray-800 pt-3">
                  {lightboxTitle}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
