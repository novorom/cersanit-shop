const fs = require('fs');
const path = require('path');

// Загружаем товары из stroy-client.tsx
const stroyClientPath = path.join(__dirname, '../app/stroy/stroy-client.tsx');
const stroyClientContent = fs.readFileSync(stroyClientPath, 'utf-8');

// Загружаем товары из products-data.ts
const productsDataPath = path.join(__dirname, '../lib/products-data.ts');
const productsDataContent = fs.readFileSync(productsDataPath, 'utf-8');

// Извлекаем товары из products-data.ts
const productsRegex = /"name":\s*"([^"]+)"[\s\S]*?"main_image":\s*"([^"]+)"/g;
const productsMap = new Map();
let match;
while ((match = productsRegex.exec(productsDataContent)) !== null) {
  const name = match[1];
  const image = match[2];
  if (image && image.startsWith('http')) {
    productsMap.set(name.toLowerCase(), image);
  }
}

console.log(`Загружено ${productsMap.size} товаров из products-data.ts`);

// Извлекаем ITEMS из stroy-client.tsx
const itemsMatch = stroyClientContent.match(/const ITEMS: StroyItem\[\] = \[([\s\S]*?)\]/);
if (!itemsMatch) {
  console.error('Не удалось найти ITEMS в stroy-client.tsx');
  process.exit(1);
}

// Парсим ITEMS
const items = [];
const itemRegex = /\{\s*t:\s*"(gres|tile)",\s*b:\s*"([^"]+)",\s*n:\s*"([^"]+)",\s*s:\s*"([^"]+)",\s*k:\s*"([^"]+)",\s*g:\s*"([^"]*)",\s*q:\s*(\d+),\s*p:\s*(null|\d+),\s*img:\s*"([^"]+)",\s*isPhoto:\s*(true|false)\s*\}/g;
while ((match = itemRegex.exec(itemsMatch[1])) !== null) {
  items.push({
    t: match[1],
    b: match[2],
    n: match[3],
    s: match[4],
    k: match[5],
    g: match[6],
    q: parseInt(match[7]),
    p: match[8] === 'null' ? null : parseInt(match[8]),
    img: match[9],
    isPhoto: match[10] === 'true'
  });
}

console.log(`Загружено ${items.length} товаров из stroy-client.tsx`);

// Функция для поиска похожего товара
function findSimilarImage(itemName) {
  const nameLower = itemName.toLowerCase();
  
  // Прямое совпадение
  if (productsMap.has(nameLower)) {
    return productsMap.get(nameLower);
  }
  
  // Поиск по частичному совпадению (ключевые слова)
  const keywords = nameLower.split(/\s+/).filter(w => w.length > 3);
  for (const keyword of keywords) {
    for (const [productName, image] of productsMap.entries()) {
      if (productName.includes(keyword) || keyword.includes(productName.split(' ')[0])) {
        return image;
      }
    }
  }
  
  return null;
}

// Обновляем изображения
let updated = 0;
let notFound = 0;
let skipped = 0;

let newContent = stroyClientContent;

for (const item of items) {
  // Пропускаем товары, у которых уже есть реальные фото (не текстуры)
  if (item.isPhoto && !item.img.startsWith('/images/tiles/')) {
    skipped++;
    continue;
  }
  
  const similarImage = findSimilarImage(item.n);
  
  if (similarImage && similarImage.startsWith('http')) {
    console.log(`✓ Найдено фото для: ${item.n}`);
    console.log(`  Старый: ${item.img}`);
    console.log(`  Новый: ${similarImage}`);
    
    // Обновляем в файле
    const oldPattern = item.img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`img:\\s*"${oldPattern}"`, 'g');
    newContent = newContent.replace(regex, `img: "${similarImage}"`);
    
    updated++;
  } else {
    notFound++;
  }
}

if (updated > 0) {
  fs.writeFileSync(stroyClientPath, newContent, 'utf-8');
  console.log(`\n✓ Файл обновлен`);
}

console.log(`\nИтого: обновлено ${updated}, не найдено ${notFound}, пропущено ${skipped}`);
