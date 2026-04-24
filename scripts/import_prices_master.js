const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { normalizeName } = require('./factory_truth');

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  const pricePath = "/Users/r/Downloads/Копия Прайсы - вход.xlsx";
  if (!fs.existsSync(pricePath)) {
    console.error("Price file not found in Downloads");
    return;
  }

  const workbook = xlsx.readFile(pricePath);
  const priceMapBySku = new Map();
  const priceMapByName = new Map();

  console.log(`Analyzing ${workbook.SheetNames.length} sheets...`);

  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    
    let skuIdx = -1;
    let nameIdx = -1;
    let priceIdx = -1;
    let startRow = -1;

    for (let i = 0; i < Math.min(rows.length, 25); i++) {
        const row = rows[i];
        if (!row) continue;
        
        const skuIdxTemp = row.findIndex(cell => String(cell).toLowerCase().includes('артикул'));
        const nameIdxTemp = row.findIndex(cell => String(cell).toLowerCase().includes('наименование') || String(cell).toLowerCase() === 'товар' || String(cell).toLowerCase() === 'номенклатура');
        const priceIdxTemp = row.findIndex(cell => String(cell).toLowerCase().includes('розничная цена'));
        
        if (priceIdxTemp !== -1 && (skuIdxTemp !== -1 || nameIdxTemp !== -1)) {
            skuIdx = skuIdxTemp;
            nameIdx = nameIdxTemp;
            priceIdx = priceIdxTemp;
            startRow = i + 1;
            break;
        }
    }

    if (startRow !== -1) {
        for (let i = startRow; i < rows.length; i++) {
            const row = rows[i];
            if (!row) continue;
            const sku = skuIdx !== -1 ? String(row[skuIdx] || "").trim() : "";
            const rawName = nameIdx !== -1 ? String(row[nameIdx] || "").trim() : "";
            const price = parseFloat(String(row[priceIdx]).replace(',', '.').replace(/[^\d.]/g, ''));
            
            if (!isNaN(price) && price > 0) {
                const ourPrice = Math.round(price * 0.89);
                if (sku) priceMapBySku.set(sku, ourPrice);
                if (rawName) priceMapByName.set(normalizeName(rawName), ourPrice);
            }
        }
    }
  });

  console.log(`Collected prices: ${priceMapBySku.size} by SKU, ${priceMapByName.size} by Name.`);

  const arrayStartText = 'export const products: Product[] = [';
  const startIndex = tsContent.indexOf(arrayStartText);
  const arrayEndIndex = tsContent.lastIndexOf('\n];');
  
  const header = tsContent.substring(0, startIndex + arrayStartText.length);
  const footer = tsContent.substring(arrayEndIndex);
  const productsContent = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);

  const blocks = productsContent.split(/\n\s*\},?\s*\{/);
  let updatedCount = 0;
  const updatedBlocks = blocks.map(block => {
      let fullBlock = block.trim();
      if (!fullBlock.startsWith('{')) fullBlock = '{' + fullBlock;
      if (!fullBlock.endsWith('}')) fullBlock = fullBlock + '}';
      
      const skuMatch = fullBlock.match(/"sku":\s*"([^"]*)"/);
      const nameMatch = fullBlock.match(/"name":\s*"([^"]*)"/);
      
      let newPrice = null;
      if (skuMatch && priceMapBySku.has(skuMatch[1])) {
          newPrice = priceMapBySku.get(skuMatch[1]);
      } else if (nameMatch) {
          const normName = normalizeName(nameMatch[1]);
          if (priceMapByName.has(normName)) {
              newPrice = priceMapByName.get(normName);
          } else {
              // Try fuzzy name match (if catalog name contains price list name)
              // This is expensive but needed
              for (const [pName, pPrice] of priceMapByName.entries()) {
                  if (normName.includes(pName) || pName.includes(normName)) {
                      newPrice = pPrice;
                      break;
                  }
              }
          }
      }

      if (newPrice !== null) {
          updatedCount++;
          return fullBlock.replace(/"price_retail":\s*\d+/g, `"price_retail": ${newPrice}`)
                          .replace(/price_retail:\s*\d+/g, `price_retail: ${newPrice}`);
      }
      return fullBlock;
  });

  fs.writeFileSync(tsPath, header + '\n  ' + updatedBlocks.join(',\n  ') + footer, 'utf8');
  console.log(`Successfully updated prices for ${updatedCount} products.`);
}

run();
