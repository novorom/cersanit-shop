const fs = require('fs');
const path = require('path');

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() || 'product-' + Date.now();
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

  // SAFE REMOVAL:
  // Find the start of the array
  const arrayStartText = 'export const products: Product[] = [';
  const startIndex = tsContent.indexOf(arrayStartText);
  const arrayEndIndex = tsContent.lastIndexOf('\n];');

  if (startIndex === -1 || arrayEndIndex === -1) {
    console.error("Could not find products array");
    return;
  }

  const header = tsContent.substring(0, startIndex + arrayStartText.length);
  const footer = tsContent.substring(arrayEndIndex);
  const content = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);

  // Split content by products. We look for "}," which ends a product.
  // This is still a bit risky but we can filter by the ID content.
  const blocks = content.split(/\n\s*\},?\s*\{/);
  
  const cleanBlocks = [];
  blocks.forEach((block, idx) => {
      // Ensure block is wrapped in {} if it's not the first/last parts of the split
      let fullBlock = block.trim();
      if (!fullBlock.startsWith('{')) fullBlock = '{' + fullBlock;
      if (!fullBlock.endsWith('}')) fullBlock = fullBlock + '}';
      
      // Check if it's a lincer product
      if (fullBlock.includes('id: "lincer-') || fullBlock.includes('"id": "lincer-')) {
          return;
      }
      if (fullBlock.length < 10) return; // ignore empty/junk
      
      cleanBlocks.push(fullBlock);
  });

  console.log(`Kept ${cleanBlocks.length} base products. Adding ${lincerProducts.length} Lincer products...`);

  const lincerObjects = lincerProducts.map((p, index) => {
    let brand = p.brand;
    let name = p.name;
    let collection = p.collection;

    if (brand === 'Бренды') {
        const brandMatch = name.match(/,\s*([^,]+)$/);
        brand = brandMatch ? brandMatch[1].trim() : 'LINCER';
    }

    if (collection === 'Бренды' || !collection) {
        const parts = name.split(' ');
        if (parts.length > 1) {
            for (let part of parts) {
                if (!/^\d+$/.test(part) && part.length > 2) {
                    collection = part;
                    break;
                }
            }
        }
        if (!collection || collection === 'Бренды') collection = 'Lincer Collection';
    }

    const specs = [];
    if (p.characteristics) {
      Object.entries(p.characteristics).forEach(([key, value]) => {
        specs.push({ key: key.toLowerCase(), label: value });
      });
    }

    return {
      id: "lincer-" + (400000 + index),
      sku: p.sku || '',
      name: name,
      slug: generateSlug(name),
      brand: brand,
      collection: collection,
      product_type: name.toLowerCase().includes('ступен') ? 'Ступень' : (name.toLowerCase().includes('вставк') || name.toLowerCase().includes('декор') ? 'Вставка' : 'Керамогранит'),
      format: p.format || 'Не указан',
      color: p.color || 'Ассорти',
      surface: p.surface || '',
      material_type: p.material_type || '',
      application: p.application || '',
      description: generateSellingDescription(p, brand, collection),
      price_retail: p.price_retail || 0,
      main_image: p.image || '',
      images: p.image ? [p.image] : [],
      specs: specs,
      is_new: true
    };
  });

  const finalArrayContent = cleanBlocks.join(',\n  ') + (cleanBlocks.length > 0 ? ',\n  ' : '') + 
                            lincerObjects.map(o => JSON.stringify(o, null, 2)).join(',\n  ');

  fs.writeFileSync(tsPath, header + '\n  ' + finalArrayContent + footer, 'utf8');
  console.log(`Successfully synced ${lincerObjects.length} Lincer products.`);
}

run();
