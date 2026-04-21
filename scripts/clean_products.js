const fs = require('fs');
const path = require('path');

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let content = fs.readFileSync(tsPath, 'utf8');

  // 1. Fix brands (remove dimensions and extra text)
  content = content.replace(/"brand":\s*"[^"]*,\s*([^"]+)"/g, (match, brand) => {
    return `"brand": "${brand.trim()}"`;
  });
  
  // 2. Fix brands like "9, Kerama Marazzi (Керама Марацци)"
  content = content.replace(/"brand":\s*"[\d, ]+([^"]+)"/g, (match, brand) => {
      let b = brand.trim();
      if (b.includes('(')) b = b.split('(')[0].trim();
      return `"brand": "${b}"`;
  });

  // 3. Normalize brand names
  content = content.replace(/"brand":\s*"Cersanit"/gi, '"brand": "Cersanit"');
  content = content.replace(/"brand":\s*"Kerama Marazzi[^"]*"/gi, '"brand": "Kerama Marazzi"');
  content = content.replace(/"brand":\s*"Gracia Ceramica[^"]*"/gi, '"brand": "Gracia Ceramica"');
  content = content.replace(/"brand":\s*"Idalgo[^"]*"/gi, '"brand": "Idalgo"');

  // 4. Fix Collection names
  // If collection is "Lincer Collection" or "Керамогранит", try to extract from name
  content = content.replace(/{[\s\S]*?}/g, (productBlock) => {
      if (productBlock.includes('"collection": "Lincer Collection"') || productBlock.includes('"collection": "Керамогранит"')) {
          const nameMatch = productBlock.match(/"name":\s*"([^"]+)"/);
          if (nameMatch) {
              const name = nameMatch[1];
              // Try to find a capitalized word that looks like a collection name
              // Typical patterns: "Scarlett", "Milton", "Монтиони"
              const parts = name.split(/[\s,]+/);
              let foundCollection = null;
              for (let part of parts) {
                  // Skip numbers, "Керамогранит", "Плитка", etc.
                  if (/^\d+$/.test(part)) continue;
                  if (['Керамогранит', 'Плитка', 'Ступень', 'Вставка', 'Декор'].includes(part)) continue;
                  if (part.length > 3 && /^[A-ZА-Я]/.test(part)) {
                      foundCollection = part;
                      break;
                  }
              }
              if (foundCollection) {
                  return productBlock.replace(/"collection":\s*"[^"]+"/, `"collection": "${foundCollection}"`);
              }
          }
      }
      return productBlock;
  });

  // 5. Clean up product names (remove brand name from the end)
  content = content.replace(/"name":\s*"(.+?),\s*(Cersanit|Kerama Marazzi|Gracia Ceramica|Idalgo|Lincer).*?"/gi, (match, baseName) => {
      return `"name": "${baseName.trim()}"`;
  });

  fs.writeFileSync(tsPath, content, 'utf8');
  console.log("Successfully cleaned and normalized products and collections.");
}

run();
