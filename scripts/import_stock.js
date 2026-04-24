const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { normalizeName } = require('./factory_truth');

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  const stockPath = "/Users/r/Downloads/Копия ОСТАТКИ Янино.xls";
  if (!fs.existsSync(stockPath)) {
    console.error("Stock file not found in Downloads");
    return;
  }

  const workbook = xlsx.readFile(stockPath);
  const stockMapBySku = new Map();
  const stockMapByName = new Map();

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
  let skuIdx = -1;
  let nameIdx = -1;
  let stockIdx = -1;
  let startRow = -1;

  for (let i = 0; i < Math.min(rows.length, 30); i++) {
    const row = rows[i];
    if (!row) continue;
    
    const skuIdxTemp = row.findIndex(cell => String(cell).toLowerCase() === 'артикул');
    const nameIdxTemp = row.findIndex(cell => String(cell).toLowerCase().includes('номенклатура') || String(cell).toLowerCase() === 'название');
    const stockIdxTemp = row.findIndex(cell => String(cell).toLowerCase().includes('доступно') || String(cell).toLowerCase().includes('свободный остаток'));
    
    if (stockIdxTemp !== -1 && (skuIdxTemp !== -1 || nameIdxTemp !== -1)) {
        skuIdx = skuIdxTemp;
        nameIdx = nameIdxTemp;
        stockIdx = stockIdxTemp;
        startRow = i + 1;
        break;
    }
  }

  if (startRow === -1) {
    console.error("Could not find stock headers");
    return;
  }

  console.log(`Found stock headers at row ${startRow}. SKU: ${skuIdx}, Name: ${nameIdx}, Stock: ${stockIdx}`);

  for (let i = startRow; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;
    const sku = skuIdx !== -1 ? String(row[skuIdx] || "").trim() : "";
    const rawName = nameIdx !== -1 ? String(row[nameIdx] || "").trim() : "";
    const stock = parseFloat(String(row[stockIdx] || "0").replace(',', '.'));
    
    if (!isNaN(stock) && stock > 0) {
        if (sku) stockMapBySku.set(sku, stock);
        if (rawName) stockMapByName.set(normalizeName(rawName), stock);
    }
  }

  console.log(`Collected stocks: ${stockMapBySku.size} by SKU, ${stockMapByName.size} by Name.`);

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
      const nameMatch = fullBlock.match(/"name":\s*"([^"]*)"/);
      
      let newStock = null;
      if (skuMatch && stockMapBySku.has(skuMatch[1])) {
          newStock = stockMapBySku.get(skuMatch[1]);
      } else if (nameMatch) {
          const normName = normalizeName(nameMatch[1]);
          if (stockMapByName.has(normName)) {
              newStock = stockMapByName.get(normName);
          } else {
              for (const [pName, pStock] of stockMapByName.entries()) {
                  if (normName.includes(pName) || pName.includes(normName)) {
                      newStock = pStock;
                      break;
                  }
              }
          }
      }

      if (newStock !== null) {
          updatedCount++;
          return fullBlock.replace(/"stock_yanino":\s*[\d.]+/g, `"stock_yanino": ${newStock}`)
                          .replace(/stock_yanino:\s*[\d.]+/g, `stock_yanino: ${newStock}`);
      }
      return fullBlock;
  });

  fs.writeFileSync(tsPath, header + '\n  ' + updatedBlocks.join(',\n  ') + footer, 'utf8');
  console.log(`Successfully updated stocks for ${updatedCount} products.`);
}

run();
