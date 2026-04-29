const fs = require('fs');

const content = fs.readFileSync('/Users/r/cersanit-shop/lib/products-data.ts', 'utf8');
const lines = content.split('\n');

// Find the last product brace
const lastProductLine = lines.findIndex(l => l.includes('is_new": true')) + 1;

const head = lines.slice(0, 9236); // Original head
const middle = lines.slice(9251, 12566); // Merged products

const footer_fixed = [
  '];',
  '',
  '// ─── Helpers ────────────────────────────────────────────────',
  '',
  'export const collections = [...new Set(products.map(p => p.collection))].sort()',
  '',
  'export const formats = [...new Set(products.map(p => p.format).filter(Boolean))].sort()',
  '',
  'export const colors = [...new Set(products.map(p => p.color).filter(Boolean))].sort()',
  '',
  'export function getProduct(slug: string): Product | undefined {',
  '  return products.find(p => p.slug === slug)',
  '}',
  '',
  'export function getProductsByCollection(collection: string): Product[] {',
  '  return products.filter(p => p.collection === collection)',
  '}',
  ''
];

const finalContent = head.join('\n') + ',\n' + middle.join('\n') + '\n' + footer_fixed.join('\n');

fs.writeFileSync('/Users/r/cersanit-shop/lib/products-data.ts', finalContent);
console.log('Fixed lib/products-data.ts');
