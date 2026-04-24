const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { normalizeName } = require('./factory_truth');

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  // Try multiple potential paths for the price file
  const potentialPaths = [
    path.join(__dirname, '../Копия Прайсы - вход.xlsx'),
    "/Users/r/Downloads/Копия Прайсы - вход.xlsx",
    path.join(__dirname, '../ИМ_2D_заливочный_файл_Cersanit_22_09_2025_2.xlsx'),
    "/Users/r/Downloads/ИМ_2D_заливочный_файл_Cersanit_22.09.2025 (7).xlsx"
  ];

  let pricePath = "";
  for (const p of potentialPaths) {
      if (fs.existsSync(p)) {
          pricePath = p;
          break;
      }
  }

  if (!pricePath) {
    console.error("Price file not found in potential locations");
    return;
  }

  console.log(`Using price file: ${pricePath}`);

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

    for (let i = 0; i < Math.min(rows.length, 30); i++) {
        const row = rows[i];
        if (!row) continue;
        
        const skuIdxTemp = row.findIndex(cell => String(cell || "").toLowerCase().includes('артикул'));
        const nameIdxTemp = row.findIndex(cell => {
            const c = String(cell || "").toLowerCase();
            return c.includes('наименование') || c === 'товар' || c === 'номенклатура' || c.includes('наименование для сайта');
        });
        const priceIdxTemp = row.findIndex(cell => String(cell || "").toLowerCase().includes('розничная цена') || String(cell || "").toLowerCase().includes('цена розн'));
        
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
            if (!row || row.length < Math.max(skuIdx, nameIdx, priceIdx)) continue;
            const sku = skuIdx !== -1 ? String(row[skuIdx] || "").trim() : "";
            const rawName = nameIdx !== -1 ? String(row[nameIdx] || "").trim() : "";
            const priceStr = String(row[priceIdx] || "");
            const price = parseFloat(priceStr.replace(',', '.').replace(/[^\d.]/g, ''));
            
            if (!isNaN(price) && price > 0) {
                const ourPrice = Math.round(price * 0.89);
                if (sku && sku !== "undefined") priceMapBySku.set(sku, ourPrice);
                if (rawName && rawName !== "undefined") priceMapByName.set(normalizeName(rawName), ourPrice);
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

  // Use a more flexible split that handles both formatted and minified JSON-like objects
  const blocks = productsContent.split(/\},?\s*\{/);
  console.log(`Found ${blocks.length} product blocks to analyze.`);

  let updatedCount = 0;
  const updatedBlocks = blocks.map((block, idx) => {
      let fullBlock = block.trim();
      // Restore braces removed by split
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
      
      let newPrice = null;
      if (skuMatch && priceMapBySku.has(skuMatch[1])) {
          newPrice = priceMapBySku.get(skuMatch[1]);
      } else if (nameMatch) {
          const normName = normalizeName(nameMatch[1]);
          if (priceMapByName.has(normName)) {
              newPrice = priceMapByName.get(normName);
          } else {
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

  // Re-join with proper spacing
  const newContent = header + '\n  ' + updatedBlocks.join(',\n  ') + footer;
  fs.writeFileSync(tsPath, newContent, 'utf8');
  console.log(`Successfully updated prices for ${updatedCount} products.`);
}

run();

