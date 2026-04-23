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

  // 1. Remove all existing Lincer products from the TS content
  // We look for objects that have id starting with "lincer-"
  // This is a more robust way to clear the slate
  const arrayStartText = 'export const products: Product[] = [';
  const startIndex = tsContent.indexOf(arrayStartText);
  if (startIndex === -1) {
    console.error("Could not find products array start");
    return;
  }

  const arrayEndIndex = tsContent.lastIndexOf('\n];');
  if (arrayEndIndex === -1) {
    console.error("Could not find products array end");
    return;
  }

  const productsContent = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);
  
  // Regex to split by objects (rough but effective for our structure)
  const productBlocks = productsContent.split(/\n\s+\},\s+\{/);
  
  // Filter out any block that belongs to Lincer
  const nonLincerBlocks = productBlocks.filter(block => {
    return !block.includes('id: "lincer-') && !block.includes('"id": "lincer-');
  });

  console.log(`Removed existing Lincer entries. Re-adding ${lincerProducts.length} items with fresh SEO...`);

  const newTsProducts = [];
  lincerProducts.forEach((p, index) => {
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

    newTsProducts.push({
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
    });
  });

  const lincerString = newTsProducts.map(p => JSON.stringify(p, null, 2)).join(',\n  ');
  
  let finalProductsContent = nonLincerBlocks.join('\n  }, {\n  ');
  if (finalProductsContent.trim()) {
      finalProductsContent += ',\n  ' + lincerString;
  } else {
      finalProductsContent = '\n  ' + lincerString;
  }

  const newContent = tsContent.substring(0, startIndex + arrayStartText.length) + 
                     finalProductsContent + 
                     tsContent.substring(arrayEndIndex);

  fs.writeFileSync(tsPath, newContent, 'utf8');
  console.log(`Successfully refreshed ${newTsProducts.length} Lincer products into lib/products-data.ts`);
}

run();
