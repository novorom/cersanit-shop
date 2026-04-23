const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  const pricePath = "/Users/r/Downloads/Копия Прайсы - вход.xlsx";
  if (!fs.existsSync(pricePath)) {
    console.error("Price file not found in Downloads");
    return;
  }

  const workbook = xlsx.readFile(pricePath);
  const priceMap = new Map();

  console.log(`Analyzing ${workbook.SheetNames.length} sheets...`);

  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    // Convert to 2D array to find headers manually (since they aren't at row 0)
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    
    let skuIdx = -1;
    let priceIdx = -1;
    let startRow = -1;

    for (let i = 0; i < Math.min(rows.length, 15); i++) {
        const row = rows[i];
        if (!row) continue;
        
        const skuIdxTemp = row.findIndex(cell => String(cell).toLowerCase().includes('артикул'));
        const priceIdxTemp = row.findIndex(cell => String(cell).toLowerCase().includes('розничная цена'));
        
        if (skuIdxTemp !== -1 && priceIdxTemp !== -1) {
            skuIdx = skuIdxTemp;
            priceIdx = priceIdxTemp;
            startRow = i + 1;
            break;
        }
    }

    if (startRow !== -1) {
        console.log(`Sheet "${sheetName}": Found headers at row ${startRow}. SKU index: ${skuIdx}, Price index: ${priceIdx}`);
        for (let i = startRow; i < rows.length; i++) {
            const row = rows[i];
            if (!row) continue;
            const sku = String(row[skuIdx] || "").trim();
            const price = parseFloat(row[priceIdx]);
            
            if (sku && !isNaN(price) && price > 0) {
                // Formula: Retail - 11%
                const ourPrice = Math.round(price * 0.89);
                priceMap.set(sku, ourPrice);
            }
        }
    }
  });

  console.log(`Collected prices for ${priceMap.size} unique SKUs.`);

  // Now update the TS file
  // We'll use a regex approach to replace price_retail: N with price_retail: M for each SKU
  let updatedCount = 0;
  
  // Since the file is huge, I'll iterate through the SKUs we found and do replacements
  // However, it's better to do it once by parsing the TS content more intelligently.
  
  // Let's use the object replacement approach
  const arrayStartText = 'export const products: Product[] = [';
  const startIndex = tsContent.indexOf(arrayStartText);
  const arrayEndIndex = tsContent.lastIndexOf('\n];');
  
  const header = tsContent.substring(0, startIndex + arrayStartText.length);
  const footer = tsContent.substring(arrayEndIndex);
  const productsContent = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);

  const blocks = productsContent.split(/\n\s*\},?\s*\{/);
  const updatedBlocks = blocks.map(block => {
      let fullBlock = block.trim();
      if (!fullBlock.startsWith('{')) fullBlock = '{' + fullBlock;
      if (!fullBlock.endsWith('}')) fullBlock = fullBlock + '}';
      
      // Extract SKU
      const skuMatch = fullBlock.match(/"sku":\s*"([^"]*)"/);
      if (skuMatch) {
          const sku = skuMatch[1];
          if (priceMap.has(sku)) {
              const newPrice = priceMap.get(sku);
              // Replace price_retail: 0 or whatever with the new price
              const updatedBlock = fullBlock.replace(/"price_retail":\s*\d+/g, `"price_retail": ${newPrice}`)
                                           .replace(/price_retail:\s*\d+/g, `price_retail: ${newPrice}`);
              updatedCount++;
              return updatedBlock;
          }
      }
      return fullBlock;
  });

  const finalArrayContent = updatedBlocks.join(',\n  ');
  fs.writeFileSync(tsPath, header + '\n  ' + finalArrayContent + footer, 'utf8');

  console.log(`Successfully updated prices for ${updatedCount} products in lib/products-data.ts`);
}

run();
