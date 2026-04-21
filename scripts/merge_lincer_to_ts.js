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

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  const jsonPath = path.join(__dirname, '../lincer_products_bulk.json');
  if (!fs.existsSync(jsonPath)) {
    console.log("No lincer_products_bulk.json found.");
    return;
  }
  const lincerProducts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Get existing SKUs to avoid duplicates
  const existingSkus = new Set();
  const skuMatches = tsContent.match(/"sku":\s*"([^"]*)"/g) || [];
  skuMatches.forEach(m => {
      const sku = m.match(/"sku":\s*"([^"]*)"/)[1];
      if (sku) existingSkus.add(sku);
  });

  console.log(`Found ${existingSkus.size} existing SKUs.`);

  const newTsProducts = [];
  lincerProducts.forEach((p, index) => {
    if (p.sku && existingSkus.has(p.sku)) return;

    let brand = p.brand;
    let name = p.name;
    let collection = p.collection;

    if (brand === 'Бренды') {
        const brandMatch = name.match(/,\s*([^,]+)$/);
        if (brandMatch) {
            brand = brandMatch[1].trim();
        } else {
            brand = 'LINCER';
        }
    }

    if (collection === 'Бренды' || !collection) {
        // Try to extract collection from name
        // Example: "10400000986 Scarlett white..." -> Scarlett
        const parts = name.split(' ');
        if (parts.length > 1) {
            // Take the first word that's not a number
            for (let part of parts) {
                if (!/^\d+$/.test(part) && part.length > 2) {
                    collection = part;
                    break;
                }
            }
        }
        if (!collection || collection === 'Бренды') collection = 'Lincer Collection';
    }

    newTsProducts.push({
      id: "lincer-" + (Date.now() + index),
      sku: p.sku || '',
      name: name,
      slug: generateSlug(name),
      brand: brand,
      collection: collection,
      product_type: name.toLowerCase().includes('ступен') ? 'Ступень' : (name.toLowerCase().includes('вставк') || name.toLowerCase().includes('декор') ? 'Вставка' : 'Керамогранит'),
      format: p.format || 'Не указан',
      color: p.color || 'Ассорти',
      price_retail: p.price || 0,
      main_image: p.image || '',
      images: p.image ? [p.image] : [],
      is_new: true
    });
  });

  if (newTsProducts.length === 0) {
      console.log("No new products to merge.");
      return;
  }

  // Find the last ] in the products array
  const lastBracketIndex = tsContent.lastIndexOf(']');
  if (lastBracketIndex === -1) {
    console.error("Could not find array end in ts file");
    return;
  }

  const itemsString = newTsProducts.map(p => JSON.stringify(p, null, 2)).join(',\n  ');
  
  const beforeBracket = tsContent.substring(0, lastBracketIndex).trimEnd();
  const needsComma = !beforeBracket.endsWith('[');
  
  const newContent = tsContent.substring(0, lastBracketIndex).trimEnd() + (needsComma ? ',\n  ' : '\n  ') + itemsString + '\n];\n';

  fs.writeFileSync(tsPath, newContent, 'utf8');
  console.log(`Successfully merged ${newTsProducts.length} NEW Lincer products into lib/products-data.ts`);
}

run();
