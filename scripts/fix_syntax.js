const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, '../lib/products-data.ts');
let content = fs.readFileSync(tsPath, 'utf8');

// Fix the specific broken transition
// Find the end of the non-lincer product and the start of lincer product
content = content.replace(/rectified: false,,\s+\{/g, 'rectified: false\n  }, {\n');

fs.writeFileSync(tsPath, content, 'utf8');
console.log("Fixed syntax error in products-data.ts");
