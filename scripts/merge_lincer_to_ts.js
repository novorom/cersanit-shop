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
  const price = p.price_retail;
  
  let desc = `Купить ${name} от бренда ${brand} (коллекция ${collection}) оптом и в розницу по выгодной цене в Санкт-Петербурге. `;
  
  if (price && price > 0) desc += `Актуальная цена: ${price} руб. за м2/шт. `;
  if (format) desc += `Товар представлен в формате ${format}. `;
  if (surface) desc += `Тип поверхности: ${surface}. `;
  
  desc += `\n\n${p.description || ''}\n\n`;
  desc += `В гипермаркете «Керамогранит Опт» вы можете заказать ${name} напрямую со склада в Янино. Мы являемся официальным поставщиком продукции ${brand} в Ленинградской области, что гарантирует лучшую цену и оригинальное качество. Доставка по СПб и области осуществляется в кратчайшие сроки, также доступен бесплатный самовывоз.`;
  
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

  const { loadFactoryData, normalizeName } = require('./factory_truth');
  const { masterMap: factoryMap, nameList, normalizeName: normFunc } = loadFactoryData();

  const lincerObjects = lincerProducts.map((p, index) => {
    let name = p.name.trim();
    name = name.replace(/^\d+\s+/, '');
    
    // Check factory source of truth
    const norm = normalizeName(name);
    let factory = factoryMap.get(norm);
    
    // Partial matching if exact fails
    if (!factory) {
        factory = nameList.find(f => norm.includes(f.normName) || f.normName.includes(norm));
    }
    
    let brand = factory ? factory.brand : extractBrand(name, p.brand);
    let collection = factory ? factory.collection : p.collection;
    let sku = factory ? factory.sku : (p.sku || '');
    let color = factory ? factory.color : (p.color || 'Ассорти');
    let surface = factory ? factory.surface : (p.surface || '');
    let format = factory ? factory.format : (p.format || 'Не указан');

    const blacklist = [
        'керамогранит', 'плитка', 'декор', 'бренды', 'панно', 'вставка',
        'серый', 'бежевый', 'белый', 'черный', 'коричневый', 'голубой',
        'глянцевая', 'матовая', 'сатиновая', 'лаппатированная',
        'mirror', 'mosaic', 'base', 'collection', 'бордюр', 'плинтус', 'ступень',
        'карандаш', 'керамический', 'метлахская', 'матовый', 'пола', 'угловой',
        'стен', 'верх', 'низ', 'для', 'составной', 'элемент', 'набор', 'комплект'
    ];

    const isTechnicalCode = (str) => /^[A-Z]{1,2}\d{2,5}[A-Z]{0,2}$/.test(str) || /^\d{10,15}$/.test(str);

    if (!collection || blacklist.some(b => collection.toLowerCase().includes(b)) || isTechnicalCode(collection)) {
        const parts = name.split(/[\s,._-]+/);
        collection = collection || "Base"; 
        
        for (let part of parts) {
            const pClean = part.replace(/[^\wа-яё]/gi, '');
            if (pClean.length > 3 && 
                !blacklist.some(b => pClean.toLowerCase().includes(b)) && 
                !isTechnicalCode(pClean) &&
                !/^\d+$/.test(pClean)) {
                collection = pClean.charAt(0).toUpperCase() + pClean.slice(1).toLowerCase();
                break;
            }
        }
    }

    // Ensure first letter cap for collection if it's still raw
    if (collection && collection !== "Base") {
        collection = collection.trim();
        collection = collection.charAt(0).toUpperCase() + collection.slice(1).toLowerCase();
    }

    const specs = [];
    if (p.characteristics) {
      Object.entries(p.characteristics).forEach(([key, value]) => {
        specs.push({ key: key.toLowerCase(), label: String(value) });
      });
    }

    // Add factory specs
    if (factory) {
        if (factory.box_pcs) specs.push({ key: "штук в упаковке", label: String(factory.box_pcs) });
        if (factory.box_m2) specs.push({ key: "кв.м в упаковке", label: String(factory.box_m2) });
        if (factory.thickness) specs.push({ key: "толщина", label: String(factory.thickness) + " мм" });
        if (factory.more) {
            Object.entries(factory.more).forEach(([k, v]) => {
                specs.push({ key: k, label: v });
            });
        }
    }

    const saved = existingDataMap.get(sku) || { price: 0, stock: 0 };

    return {
      id: "lincer-" + (400000 + index),
      sku: sku,
      name: name,
      slug: generateSlug(name),
      brand: brand,
      collection: collection || "Base",
      product_type: p.name.toLowerCase().includes('ступен') ? 'Ступень' : (p.name.toLowerCase().includes('вставк') || p.name.toLowerCase().includes('декор') ? 'Вставка' : 'Керамогранит'),
      format: format,
      color: color,
      surface: surface,
      material_type: p.material_type || '',
      application: p.application || '',
      description: generateSellingDescription(p, brand, collection || "Base"),
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
