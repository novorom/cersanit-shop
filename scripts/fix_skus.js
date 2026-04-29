const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const CONFIG = {
  "Azori": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Azori загрузочный 25.02.26.xlsx",
    skuCol: "ID элемента",
    nameCol: "Наименование элемента",
    mappings: { brand: "Azori" }
  },
  "Gracia": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Gracia ceramica.xlsx",
    skuCol: "Артикул",
    nameCol: "Наименование (для сайта)",
    mappings: { brand: "Gracia Ceramica" }
  },
  "Keramark": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Keramark_12.10.2025.xlsx",
    skuCol: "Артикул",
    nameCol: "Название",
    mappings: { brand: "Keramark" }
  },
  "Graniteya": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Гранитея/Гранитея.xlsx",
    skuCol: "Артикул",
    nameCol: "Коллекция ", // Need to be careful here
    headerRow: 3,
    mappings: { brand: "Гранитея" }
  },
  "Eletto": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Eletto 25.02.26.xlsx",
    skuCol: "Артикул [CML2_ARTICLE]",
    nameCol: "Наименование элемента",
    mappings: { brand: "Eletto" }
  }
};

function normalizeName(name) {
    if (!name) return "";
    return name.toLowerCase()
        .replace(/[^a-zа-я0-9]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  // Load current products from TS (we need to fix them in place)
  const arrayStartText = 'export const products: Product[] = [';
  const startIndex = tsContent.indexOf(arrayStartText);
  const arrayEndIndex = tsContent.lastIndexOf('\n];');
  
  if (startIndex === -1 || arrayEndIndex === -1) return;

  const header = tsContent.substring(0, startIndex + arrayStartText.length);
  const footer = tsContent.substring(arrayEndIndex);
  const productsContent = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);

  const blocks = productsContent.split(/\n\s*\},?\s*\{/).map(b => {
      let full = b.trim();
      if (!full.startsWith('{')) full = '{' + full;
      if (!full.endsWith('}')) full = full + '}';
      return full;
  });

  console.log(`Analyzing ${blocks.length} products...`);

  // Build a lookup map from factory files: normalized_name -> real_sku
  const nameToSkuMap = new Map();
  
  for (const [factory, config] of Object.entries(CONFIG)) {
    if (!fs.existsSync(config.path)) continue;
    console.log(`Building map for ${factory}...`);
    const workbook = xlsx.readFile(config.path);
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { range: config.headerRow || 0 });
    
    data.forEach(row => {
        const realSku = String(row[config.skuCol] || "").trim();
        const rawName = String(row[config.nameCol] || "").trim();
        if (realSku && rawName) {
            nameToSkuMap.set(normalizeName(rawName), realSku);
            // Also try without the brand suffix if it exists in the name
            const cleanName = rawName.split(',')[0].split('(')[0].trim();
            nameToSkuMap.set(normalizeName(cleanName), realSku);
        }
    });
  }

  let fixedCount = 0;
  const updatedBlocks = blocks.map(block => {
      if (!block.includes('id: "lincer-') && !block.includes('"id": "lincer-')) return block;

      const nameMatch = block.match(/"name":\s*"([^"]*)"/);
      if (!nameMatch) return block;
      
      const currentName = nameMatch[1];
      const norm = normalizeName(currentName);
      
      let realSku = null;
      // Try direct match
      if (nameToSkuMap.has(norm)) {
          realSku = nameToSkuMap.get(norm);
      } else {
          // Try partial match: if any key in map is contained in our normalized name
          // This is slow but we only have a few thousand
          for (const [mapNorm, mapSku] of nameToSkuMap.entries()) {
              if (norm.includes(mapNorm) || mapNorm.includes(norm)) {
                  realSku = mapSku;
                  break;
              }
          }
      }

      if (realSku) {
          const updatedBlock = block.replace(/"sku":\s*"[^"]*"/, `"sku": "${realSku}"`);
          if (updatedBlock !== block) fixedCount++;
          return updatedBlock;
      }
      
      return block;
  });

  fs.writeFileSync(tsPath, header + '\n  ' + updatedBlocks.join(',\n  ') + footer, 'utf8');
  console.log(`Successfully fixed SKUs for ${fixedCount} products using factory data.`);
}

run();
