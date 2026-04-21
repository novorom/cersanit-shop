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

  const newTsProducts = lincerProducts.map((p, index) => {
    // Extract actual brand and collection from name if possible, since scraper might have put 'Бренды'
    let brand = p.brand;
    let name = p.name;
    if (brand === 'Бренды') {
        const match = name.match(/,\s*(.+)$/);
        if (match) brand = match[1].trim();
        else brand = 'LINCER';
    }

    return {
      id: "lincer-" + (Date.now() + index),
      sku: p.sku || '',
      name: name,
      slug: generateSlug(name),
      brand: brand,
      collection: p.collection !== 'Бренды' && p.collection ? p.collection : 'Lincer Collection',
      product_type: name.toLowerCase().includes('ступен') ? 'Ступень' : (name.toLowerCase().includes('вставк') || name.toLowerCase().includes('декор') ? 'Вставка' : 'Керамогранит'),
      format: p.format || 'Не указан',
      color: p.color || 'Ассорти',
      price_retail: p.price || 0,
      main_image: p.image || '',
      images: p.image ? [p.image] : [],
      is_new: true
    };
  });

  // Now, we need to inject this into the ts file.
  // The file ends with `];` or `}  \n]` or similar.
  // Instead of complex string manipulation, let's just find the last `]` and insert our items.
  const lastBracketIndex = tsContent.lastIndexOf(']');
  if (lastBracketIndex === -1) {
    console.error("Could not find array end in ts file");
    return;
  }

  const itemsString = newTsProducts.map(p => JSON.stringify(p, null, 2)).join(',\n  ');
  
  // Insert with a comma before it if the array wasn't empty
  const beforeBracket = tsContent.substring(0, lastBracketIndex).trimEnd();
  const needsComma = !beforeBracket.endsWith('[');
  
  const newContent = tsContent.substring(0, lastBracketIndex) + (needsComma ? ',\n  ' : '\n  ') + itemsString + '\n];\n';

  fs.writeFileSync(tsPath, newContent, 'utf8');
  console.log(`Successfully merged ${newTsProducts.length} Lincer products into lib/products-data.ts`);
}

run();
