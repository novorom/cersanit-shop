const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  const stockPath = "/Users/r/Downloads/Копия ОСТАТКИ Янино.xls";
  if (!fs.existsSync(stockPath)) {
    console.error("Stock file not found in Downloads");
    return;
  }

  const workbook = xlsx.readFile(stockPath);
  const stockMap = new Map();

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
  let skuIdx = -1;
  let stockIdx = -1;
  let startRow = -1;

  for (let i = 0; i < Math.min(rows.length, 30); i++) {
    const row = rows[i];
    if (!row) continue;
    
    const skuIdxTemp = row.findIndex(cell => String(cell).toLowerCase() === 'артикул');
    const stockIdxTemp = row.findIndex(cell => String(cell).toLowerCase().includes('доступно') || String(cell).toLowerCase().includes('свободный остаток'));
    
    if (skuIdxTemp !== -1 && stockIdxTemp !== -1) {
        skuIdx = skuIdxTemp;
        stockIdx = stockIdxTemp;
        startRow = i + 1;
        break;
    }
  }

  if (startRow === -1) {
    console.error("Could not find stock headers");
    return;
  }

  console.log(`Found stock headers at row ${startRow}. SKU index: ${skuIdx}, Stock index: ${stockIdx}`);

  for (let i = startRow; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;
    const sku = String(row[skuIdx] || "").trim();
    let stock = parseFloat(row[stockIdx]);
    
    if (sku && !isNaN(stock)) {
        stockMap.set(sku, stock);
    }
  }

  console.log(`Collected stock for ${stockMap.size} unique SKUs.`);

  // Update TS file
  const arrayStartText = 'export const products: Product[] = [';
  const startIndex = tsContent.indexOf(arrayStartText);
  const arrayEndIndex = tsContent.lastIndexOf('\n];');
  
  const header = tsContent.substring(0, startIndex + arrayStartText.length);
  const footer = tsContent.substring(arrayEndIndex);
  const productsContent = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);

  let updatedCount = 0;
  const blocks = productsContent.split(/\n\s*\},?\s*\{/);
  const updatedBlocks = blocks.map(block => {
      let fullBlock = block.trim();
      if (!fullBlock.startsWith('{')) fullBlock = '{' + fullBlock;
      if (!fullBlock.endsWith('}')) fullBlock = fullBlock + '}';
      
      const skuMatch = fullBlock.match(/"sku":\s*"([^"]*)"/);
      if (skuMatch) {
          const sku = skuMatch[1];
          if (stockMap.has(sku)) {
              const newStock = stockMap.get(sku);
              // Update stock_yanino
              const updatedBlock = fullBlock.replace(/"stock_yanino":\s*\d+(\.\d+)?/g, `"stock_yanino": ${newStock}`)
                                           .replace(/stock_yanino:\s*\d+(\.\d+)?/g, `stock_yanino: ${newStock}`);
              updatedCount++;
              return updatedBlock;
          } else {
              // If not in stock file, set to 0? 
              // Usually safer to keep as is or set to 0 if we want "real-time" accuracy.
              // Let's keep it as is unless it's a Lincer product we're refreshing.
              return fullBlock.replace(/"stock_yanino":\s*\d+(\.\d+)?/g, `"stock_yanino": 0`)
                               .replace(/stock_yanino:\s*\d+(\.\d+)?/g, `stock_yanino: 0`);
          }
      }
      return fullBlock;
  });

  const finalArrayContent = updatedBlocks.join(',\n  ');
  fs.writeFileSync(tsPath, header + '\n  ' + finalArrayContent + footer, 'utf8');

  console.log(`Successfully updated stock for ${updatedCount} products.`);
}

run();
