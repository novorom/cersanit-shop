const fs = require('fs');
const path = require('path');

// Текущий файл ITEMS
const stroyClientPath = '/Users/r/cersanit-shop/app/stroy/stroy-client.tsx';
const stroyClientContent = fs.readFileSync(stroyClientPath, 'utf8');

// Данные из Excel
const excelData = {
  mKvadrat45: [
    { name: "Терраццо ГРАФИТ", price: 720 },
    { name: "Терраццо БЕЛЫЙ", price: 720 },
    { name: "Мрамор золотой", price: 720 },
    { name: "Цемент серый", price: 680 },
    { name: "Дерево беж", price: 680 },
    { name: "Камень коричневый светлый", price: 720 },
    { name: "Оникс серый", price: 720 },
    { name: "Версаль серый", price: 720 },
    { name: "Цемент белый", price: 790 },
    { name: "Камень серый светлый", price: 790 },
  ],
  zerde600: [
    { name: "AUTUNNO BASE LIGHT BEIGE", price: 980 },
    { name: "CALACATTA GREY", price: 980 },
    { name: "CHIPS WHITE", price: 980 },
    { name: "CONCRETE LIGHT GREY", price: 980 },
    { name: "DACITE BASE GREY", price: 980 },
    { name: "NATURA WHITE", price: 980 },
    { name: "PALLADINO LIGHT", price: 980 },
    { name: "PULPIS GREY", price: 980 },
    { name: "SILENT GREY", price: 980 },
  ]
};

// Сопоставление названий Excel с названиями в ITEMS
const nameMapping = {
  // ZERDE (Казахстан)
  "AUTUNNO BASE LIGHT BEIGE": "AUTUNNO BASE LIGHT BEIGE",
  "CALACATTA GREY": "CALACATTA GREY",
  "CHIPS WHITE": "CHIPS WHITE",
  "CONCRETE LIGHT GREY": "CONCRETE LIGHT GREY",
  "DACITE BASE GREY": "ВАITEREK BEJ",
  "NATURA WHITE": "NATURA WHITE РЫЖИЕ ПРОЖИЛКИ",
  "PALLADINO LIGHT": "PALLADINO LIGHT",
  "PULPIS GREY": "PULPIS GREY",
  "SILENT GREY": "SILENT GREY",
  
  // М-Квадрат 45x45 - будем искать по ключевым словам
  "Терраццо ГРАФИТ": "Терраццо Серый",
  "Терраццо БЕЛЫЙ": "Terrazzo mix Бежевый",
  "Мрамор золотой": "Калакатта Серые",
  "Цемент серый": "Прожетто Серый Светлый",
  "Дерево беж": "Manhattan Бежевый",
  "Камень коричневый светлый": "Matera Бежевый",
  "Оникс серый": "Manhattan Grey",
  "Версаль серый": "Torino Grey",
  "Цемент белый": "Arctic White",
  "Камень серый светлый": "Hornito Amber Коричневый Светлый",
};

console.log('Анализирую текущие позиции в ITEMS...');

// Извлекаем текущие ITEMS из файла
const itemsMatch = stroyClientContent.match(/const ITEMS: StroyItem\[\s\S]+?\];/s);
if (!itemsMatch) {
  console.error('Не удалось найти массив ITEMS в файле');
  process.exit(1);
}

console.log('Найден массив ITEMS, проверяю позиции...');

let updated = false;
let updatedCount = 0;

// Обновляем цены для Казахстана (ZERDE)
excelData.zerde600.forEach(excelItem => {
  const itemName = nameMapping[excelItem.name];
  if (!itemName) return;
  
  // Ищем позицию в ITEMS
  const regex = new RegExp(`\\{\\s*t:\\s*"gres"[^}]*n:\\s*"${itemName}"`, 'i');
  if (regex.test(stroyClientContent)) {
    // Обновляем цену
    const newPriceLine = `p: ${excelItem.price}`;
    const priceRegex = new RegExp(`\\{\\s*t:\\s*"gres"[^}]*n:\\s*"${itemName}"[^}]*p:\\s*null`, 'i');
    
    if (priceRegex.test(stroyClientContent)) {
      stroyClientContent = stroyClientContent.replace(priceRegex, newPriceLine);
      console.log(`✓ Обновлена цена для ${itemName}: ${excelItem.price} р/м²`);
      updated = true;
      updatedCount++;
    }
  }
});

console.log(`\nОбновлено позиций: ${updatedCount}`);

if (updated) {
  fs.writeFileSync(stroyClientPath, stroyClientContent, 'utf8');
  console.log(`\nФайл обновлён: ${stroyClientPath}`);
} else {
  console.log('\nИзменений не требуется');
}
