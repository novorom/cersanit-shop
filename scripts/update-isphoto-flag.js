const fs = require('fs');
const path = require('path');

// Загружаем stroy-client.tsx
const stroyClientPath = path.join(__dirname, '../app/stroy/stroy-client.tsx');
const stroyClientContent = fs.readFileSync(stroyClientPath, 'utf-8');

// Извлекаем ITEMS
const itemsMatch = stroyClientContent.match(/const ITEMS: StroyItem\[\] = \[([\s\S]*?)\]/);
if (!itemsMatch) {
  console.error('Не удалось найти ITEMS в stroy-client.tsx');
  process.exit(1);
}

// Парсим ITEMS
const items = [];
const itemRegex = /\{\s*t:\s*"(gres|tile)",\s*b:\s*"([^"]+)",\s*n:\s*"([^"]+)",\s*s:\s*"([^"]+)",\s*k:\s*"([^"]+)",\s*g:\s*"([^"]*)",\s*q:\s*(\d+),\s*p:\s*(null|\d+),\s*img:\s*"([^"]+)",\s*isPhoto:\s*(true|false)\s*\}/g;
let match;
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

console.log(`Загружено ${items.length} товаров`);

// Обновляем isPhoto для товаров с реальными фото
let updated = 0;
let newContent = stroyClientContent;

for (const item of items) {
  // Если изображение - это внешняя ссылка (не текстура), меняем isPhoto на true
  if (item.img.startsWith('http') && !item.isPhoto) {
    console.log(`✓ Обновляем isPhoto для: ${item.n}`);
    
    // Находим и заменяем
    const pattern = item.img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`img:\\s*"${pattern}",\\s*isPhoto:\\s*false`, 'g');
    newContent = newContent.replace(regex, `img: "${item.img}", isPhoto: true`);
    
    updated++;
  }
}

if (updated > 0) {
  fs.writeFileSync(stroyClientPath, newContent, 'utf-8');
  console.log(`\n✓ Файл обновлен: ${updated} товаров`);
} else {
  console.log(`\nНет товаров для обновления`);
}
