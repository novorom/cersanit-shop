const fs = require('fs');
const content = fs.readFileSync('lib/products-data.ts', 'utf8');
const match = content.match(/export const products: any\[\] = (\[.*\]);/s);
if (match) {
  const products = eval(match[1]);
  const active = products.filter(p => p.slug && p.price_retail && p.price_retail > 0 && p.main_image);
  const missingMpn = active.filter(p => !p.sku && !p.bsu);
  console.log('Total active:', active.length);
  console.log('Missing MPN:', missingMpn.length);
} else {
  console.log("Could not parse products array.");
}
