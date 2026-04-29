// import_prices.js
// Usage: node import_prices.js <path-to-prices.xlsx>
// The XLSX file should contain rows with at least `sku` (or `id`) and `price_retail` columns.
// This script loads the file, matches products by SKU (fallback to ID), updates the price, and rewrites lib/products-data.ts.

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

if (process.argv.length < 3) {
  console.error('Usage: node import_prices.js <path-to-prices.xlsx>');
  process.exit(1);
}

const priceFile = path.resolve(process.argv[2]);
if (!fs.existsSync(priceFile)) {
  console.error('File not found:', priceFile);
  process.exit(1);
}

// Load price workbook
const wb = XLSX.readFile(priceFile);
const sheetName = wb.SheetNames[0];
const sheet = wb.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet);

// Prepare a map of price data by SKU or ID
const priceMap = new Map();
rows.forEach(row => {
  const key = row.sku?.toString().trim() || row.id?.toString().trim();
  const price = Number(row.price_retail);
  if (key && !isNaN(price)) {
    priceMap.set(key, price);
  }
});

// Load existing products data
const productsPath = path.join(__dirname, '..', 'lib', 'products-data.ts');
let content = fs.readFileSync(productsPath, 'utf8');
const exportIdx = content.indexOf('export const products');
const arrStart = content.indexOf('[', exportIdx);
const arrEnd = content.lastIndexOf('];');
let arrayText = content.slice(arrStart, arrEnd + 1);
let products = JSON.parse(arrayText);

let updatedCount = 0;
products = products.map(p => {
  const key = p.sku?.trim() || p.id?.trim();
  if (priceMap.has(key)) {
    p.price_retail = priceMap.get(key);
    updatedCount++;
  }
  return p;
});

const newArray = JSON.stringify(products, null, 2);
const newContent = content.slice(0, arrStart) + newArray + content.slice(arrEnd + 2);
fs.writeFileSync(productsPath, newContent, 'utf8');
console.log(`Updated price_retail for ${updatedCount} products in lib/products-data.ts`);
