import { products } from '../lib/products-data';

const active = products.filter(p => p.slug && p.price_retail && p.price_retail > 0 && p.main_image);
const missingMpn = active.filter(p => !p.sku && !p.bsu);
console.log(`Total active: ${active.length}`);
console.log(`Missing MPN: ${missingMpn.length}`);
