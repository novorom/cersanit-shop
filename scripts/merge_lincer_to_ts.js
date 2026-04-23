const fs = require('fs');
const path = require('path');

const BRANDS = [
    "Azori", "Eletto", "Gracia Ceramica", "Kerama Marazzi", "Keramark", 
    "Graniteya", "Гранитея", "Cersanit", "Hidalgo", "Идальго", 
    "Italon", "Laminam", "Atlas Concorde", "Kerranova", "Grasaro"
];

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() || 'product-' + Date.now();
}

function extractBrand(name, currentBrand) {
    if (currentBrand && currentBrand !== 'LINCER' && currentBrand !== 'Бренды' && currentBrand !== 'Lincer') {
        return currentBrand;
    }
    
    // Try to find known brand in name
    for (const b of BRANDS) {
        if (name.toLowerCase().includes(b.toLowerCase())) {
            return b;
        }
    }
    
    // Fallback: Check for patterns like ", Brand Name" at the end
    const match = name.match(/,\s*([^,]+)$/);
    if (match) {
        const potential = match[1].trim();
        if (potential.length > 2 && potential.length < 30) return potential;
    }
    
    return "Lincer Collection"; // Better than just "LINCER" brand
}

function generateSellingDescription(p, brand, collection) {
  const name = p.name;
  const format = p.format || '';
  const surface = p.surface || '';
  
  let desc = `Купить ${name} от бренда ${brand} (коллекция ${collection}) по оптовой цене в Санкт-Петербурге. `;
  
  if (format) desc += `Данный товар имеет формат ${format}. `;
  if (surface) desc += `Поверхность: ${surface}. `;
  
  desc += `\n\n${p.description || ''}\n\n`;
  desc += `В гипермаркете «Керамогранит Опт» вы можете заказать ${name} с доставкой со склада в Янино по Санкт-Петербургу и Ленинградской области. Мы предлагаем только оригинальную продукцию ${brand} напрямую от производителя. Для оптовых покупателей и строительных компаний действуют специальные условия.`;
  
  return desc.trim();
}

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  const jsonPath = path.join(__dirname, '../lincer_full_dump.json');
  if (!fs.existsSync(jsonPath)) {
    console.log("No lincer_full_dump.json found.");
    return;
  }
  const lincerProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Use a map to keep track of prices/stocks if we have them in the current TS
  // to avoid losing them when re-merging from JSON
  const existingDataMap = new Map();
  const arrayStartText = 'export const products: Product[] = [';
  const startIndex = tsContent.indexOf(arrayStartText);
  const arrayEndIndex = tsContent.lastIndexOf('\n];');
  
  if (startIndex !== -1 && arrayEndIndex !== -1) {
      const content = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);
      const blocks = content.split(/\n\s*\},?\s*\{/);
      blocks.forEach(block => {
          const skuMatch = block.match(/"sku":\s*"([^"]*)"/);
          if (skuMatch) {
              const sku = skuMatch[1];
              const priceMatch = block.match(/"price_retail":\s*(\d+)/);
              const stockMatch = block.match(/"stock_yanino":\s*(\d+(\.\d+)?)/);
              existingDataMap.set(sku, {
                  price: priceMatch ? parseInt(priceMatch[1]) : 0,
                  stock: stockMatch ? parseFloat(stockMatch[1]) : 0
              });
          }
      });
  }

  const header = tsContent.substring(0, startIndex + arrayStartText.length);
  const footer = tsContent.substring(arrayEndIndex);

  const cleanBlocks = [];
  if (startIndex !== -1) {
      const content = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);
      const blocks = content.split(/\n\s*\},?\s*\{/);
      blocks.forEach(block => {
          let b = block.trim();
          if (!b.startsWith('{')) b = '{' + b;
          if (!b.endsWith('}')) b = b + '}';
          if (b.includes('id: "lincer-') || b.includes('"id": "lincer-')) return;
          if (b.length < 10) return;
          cleanBlocks.push(b);
      });
  }

  const lincerObjects = lincerProducts.map((p, index) => {
    const brand = extractBrand(p.name, p.brand);
    let collection = p.collection;

    if (collection === 'Бренды' || !collection || collection === 'Панно' || collection === 'Керамогранит') {
        const parts = p.name.split(' ');
        // Try to find a good collection name in the product name
        for (let part of parts) {
            if (part.length > 3 && !part.includes(',') && !part.includes('(') && !/^\d+$/.test(part)) {
                collection = part;
                break;
            }
        }
    }

    const specs = [];
    if (p.characteristics) {
      Object.entries(p.characteristics).forEach(([key, value]) => {
        specs.push({ key: key.toLowerCase(), label: String(value) });
      });
    }

    const saved = existingDataMap.get(p.sku) || { price: 0, stock: 0 };

    return {
      id: "lincer-" + (400000 + index),
      sku: p.sku || '',
      name: p.name,
      slug: generateSlug(p.name),
      brand: brand,
      collection: collection || "Base",
      product_type: p.name.toLowerCase().includes('ступен') ? 'Ступень' : (p.name.toLowerCase().includes('вставк') || p.name.toLowerCase().includes('декор') ? 'Вставка' : 'Керамогранит'),
      format: p.format || 'Не указан',
      color: p.color || 'Ассорти',
      surface: p.surface || '',
      material_type: p.material_type || '',
      application: p.application || '',
      description: generateSellingDescription(p, brand, collection),
      price_retail: saved.price || 0,
      stock_yanino: saved.stock || 0,
      main_image: p.image || '',
      images: p.image ? [p.image] : [],
      specs: specs,
      is_new: true
    };
  });

  const finalArrayContent = cleanBlocks.join(',\n  ') + (cleanBlocks.length > 0 ? ',\n  ' : '') + 
                            lincerObjects.map(o => JSON.stringify(o, null, 2)).join(',\n  ');

  fs.writeFileSync(tsPath, header + '\n  ' + finalArrayContent + footer, 'utf8');
  console.log(`Successfully fixed brands and collections for ${lincerObjects.length} products.`);
}

run();
