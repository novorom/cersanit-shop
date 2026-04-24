const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { normalizeName } = require('./factory_truth');

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  // Try multiple potential paths for the stock file
  const potentialPaths = [
    path.join(__dirname, '../Копия ОСТАТКИ Янино.xls'),
    "/Users/r/Downloads/Копия ОСТАТКИ Янино.xls",
    path.join(__dirname, '../ОСТАТКИ ЯНИНО.xls'),
    "/Users/r/Downloads/ОСТАТКИ ЯНИНО.xls"
  ];

  let stockPath = "";
  for (const p of potentialPaths) {
      if (fs.existsSync(p)) {
          stockPath = p;
          break;
      }
  }

  if (!stockPath) {
    console.error("Stock file not found in potential locations");
    return;
  }

  console.log(`Using stock file: ${stockPath}`);

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
    
    const skuIdxTemp = row.findIndex(cell => String(cell || "").toLowerCase().includes('артикул'));
    const nameIdxTemp = row.findIndex(cell => {
        const c = String(cell || "").toLowerCase();
        return c.includes('номенклатура') || c === 'название' || c.includes('наименование');
    });
    const stockIdxTemp = row.findIndex(cell => {
        const c = String(cell || "").toLowerCase();
        return c.includes('доступно') || c.includes('свободный остаток') || c.includes('остаток');
    });
    
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
    if (!row || row.length < Math.max(skuIdx, nameIdx, stockIdx)) continue;
    const sku = skuIdx !== -1 ? String(row[skuIdx] || "").trim() : "";
    const rawName = nameIdx !== -1 ? String(row[nameIdx] || "").trim() : "";
    const stockVal = String(row[stockIdx] || "0").replace(',', '.').replace(/[^\d.]/g, '');
    const stock = parseFloat(stockVal);
    
    if (!isNaN(stock) && stock > 0) {
        if (sku && sku !== "undefined") stockMapBySku.set(sku, stock);
        if (rawName && rawName !== "undefined") stockMapByName.set(normalizeName(rawName), stock);
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
  const blocks = productsContent.split(/\},?\s*\{/);
  console.log(`Found ${blocks.length} product blocks to analyze.`);

  const updatedBlocks = blocks.map((block, idx) => {
      let fullBlock = block.trim();
      if (idx === 0) {
          if (!fullBlock.endsWith('}')) fullBlock += '}';
      } else if (idx === blocks.length - 1) {
          if (!fullBlock.startsWith('{')) fullBlock = '{' + fullBlock;
      } else {
          if (!fullBlock.startsWith('{')) fullBlock = '{' + fullBlock;
          if (!fullBlock.endsWith('}')) fullBlock += '}';
      }
      
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

  const newContent = header + '\n  ' + updatedBlocks.join(',\n  ') + footer;
  fs.writeFileSync(tsPath, newContent, 'utf8');
  console.log(`Successfully updated stocks for ${updatedCount} products.`);
}

run();

