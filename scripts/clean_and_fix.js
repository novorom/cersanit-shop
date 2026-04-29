const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, '../lib/products-data.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

const arrayStartText = 'export const products: Product[] = [';
const startIndex = tsContent.indexOf(arrayStartText);
const arrayEndIndex = tsContent.lastIndexOf('\n];');

if (startIndex === -1 || arrayEndIndex === -1) {
    console.error("Could not find products array");
    process.exit(1);
}

// Keep only the header and the closing footer
const header = tsContent.substring(0, startIndex + arrayStartText.length);
const footer = tsContent.substring(arrayEndIndex);

// We need to keep non-Lincer products. 
// They are mostly Cersanit products which have numeric IDs like "10084".
const productsContent = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);

// Split by blocks. We'll use a regex that looks for the start of an object { id: ... }
const blocks = productsContent.split(/\n\s*\{(?=\s*(?:id|id|id|id|id|id))/);
const nonLincerBlocks = blocks.filter(block => {
    return !block.includes('id: "lincer-') && !block.includes('"id": "lincer-') && block.trim().length > 0;
}).map(b => b.trim().replace(/,$/, ''));

console.log(`Kept ${nonLincerBlocks.length} non-Lincer products.`);

// Rebuild file with just non-Lincer products first to be clean
const cleanContent = header + '\n  {' + nonLincerBlocks.join('\n  }, {\n  ') + '\n  }' + footer;
fs.writeFileSync(tsPath, cleanContent, 'utf8');
console.log("File cleaned of Lincer products and syntax errors fixed.");
