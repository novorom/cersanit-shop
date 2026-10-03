const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Загружаем текущий список товаров из stroy-client.tsx
const stroyClientPath = path.join(__dirname, '../app/stroy/stroy-client.tsx');
const stroyClientContent = fs.readFileSync(stroyClientPath, 'utf-8');

// Извлекаем ITEMS из файла
const itemsMatch = stroyClientContent.match(/const ITEMS: StroyItem\[\] = \[([\s\S]*?)\]/);
if (!itemsMatch) {
  console.error('Не удалось найти ITEMS в stroy-client.tsx');
  process.exit(1);
}

// Парсим ITEMS (упрощенно - ищем объекты с img)
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

console.log(`Загружено ${items.length} товаров из stroy-client.tsx`);

// Функция для HTTP запроса
function fetch(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Поиск изображений на keramoopt.ru
async function searchKeramoopt(brand, name) {
  try {
    // Формируем поисковый запрос
    const searchUrl = `https://keramoopt.ru/search/?q=${encodeURIComponent(name)}`;
    console.log(`Поиск: ${name} на keramoopt.ru...`);
    
    const html = await fetch(searchUrl);
    
    // Ищем изображения в HTML
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const images = [];
    let imgMatch;
    
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      const src = imgMatch[1];
      if (src.includes('/upload/') || src.includes('/images/')) {
        // Преобразуем относительные URL в абсолютные
        const absoluteUrl = src.startsWith('http') ? src : `https://keramoopt.ru${src}`;
        images.push(absoluteUrl);
      }
    }
    
    return images.length > 0 ? images[0] : null;
  } catch (error) {
    console.error(`Ошибка при поиске ${name}:`, error.message);
    return null;
  }
}

// Обновляем изображения
async function updateImages() {
  let updated = 0;
  let notFound = 0;
  
  for (const item of items) {
    // Пропускаем товары, у которых уже есть реальные фото (не текстуры)
    if (item.isPhoto && !item.img.startsWith('/images/tiles/')) {
      console.log(`Пропуск: ${item.n} (уже есть фото)`);
      continue;
    }
    
    const newImg = await searchKeramoopt(item.b, item.n);
    
    if (newImg) {
      console.log(`✓ Найдено фото для: ${item.n}`);
      console.log(`  Старый: ${item.img}`);
      console.log(`  Новый: ${newImg}`);
      
      // Обновляем в файле
      const oldPattern = item.img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`img:\\s*"${oldPattern}"`, 'g');
      const newContent = stroyClientContent.replace(regex, `img: "${newImg}"`);
      
      if (newContent !== stroyClientContent) {
        fs.writeFileSync(stroyClientPath, newContent, 'utf-8');
        updated++;
      }
    } else {
      console.log(`✗ Не найдено фото для: ${item.n}`);
      notFound++;
    }
    
    // Задержка между запросами
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\nИтого: обновлено ${updated}, не найдено ${notFound}`);
}

updateImages().catch(console.error);
