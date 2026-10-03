const fs = require('fs');
const path = require('path');

const stroyClientPath = '/Users/r/cersanit-shop/app/stroy/stroy-client.tsx';
const lines = fs.readFileSync(stroyClientPath, 'utf8').split('\n');

// Карта сопоставления названий из Excel с названиями в ITEMS
const nameMapping = {
  "AUTUNNO BASE LIGHT BEIGE": "AUTUNNO BASE LIGHT BEIGE",
  "CALACATTA GREY": "CALACATTA GREY",
  "CHIPS WHITE": "CHIPS WHITE",
  "CONCRETE LIGHT GREY": "CONCRETE LIGHT GREY",
  "DACITE BASE GREY": "ВАITEREK BEJ",
  "NATURA WHITE": "NATURA WHITE РЫЖИЕ ПРОЖИЛКИ",
  "PALLADINO LIGHT": "PALLADINO LIGHT",
  "PULPIS GREY": "PULPIS GREY",
  "SILENT GREY": "SILENT GREY",
};

// Цены из Excel (ZERDE)
const excelPrices = {
  "AUTUNNO BASE LIGHT BEIGE": 980,
  "CALACATTA GREY": 980,
  "CHIPS WHITE": 980,
  "CONCRETE LIGHT GREY": 980,
  "DACITE BASE GREY": 980,
  "NATURA WHITE": 980,
  "PALLADINO LIGHT": 980,
  "PULPIS GREY": 980,
  "SILENT GREY": 980,
};

console.log('Обновляю цены из Excel...');

let updated = false;
let inItemsArray = false;
let updatedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Определяем начало массива ITEMS
  if (line.includes('const ITEMS: StroyItem[] = [')) {
    inItemsArray = true;
    continue;
  }
  
  // Конец массива
  if (inItemsArray && line.trim() === '];') {
    inItemsArray = false;
    continue;
  }
  
  if (!inItemsArray) continue;
  
  // Ищем строки с ценой p: null
  for (const [excelName, itemName] of Object.entries(nameMapping)) {
    if (line.includes(`n: "${itemName}"`) && line.includes('p: null')) {
      const newPrice = excelPrices[excelName];
      if (newPrice) {
        lines[i] = line.replace('p: null', `p: ${newPrice}`);
        console.log(`✓ Обновлена цена для ${itemName}: ${newPrice} р/м²`);
        updated = true;
        updatedCount++;
      }
    }
  }
}

if (updated) {
  fs.writeFileSync(stroyClientPath, lines.join('\n'), 'utf8');
  console.log(`\n✓ Обновлено ${updatedCount} позиций`);
  console.log(`Файл сохранён: ${stroyClientPath}`);
} else {
  console.log('Изменений не требуется');
}
