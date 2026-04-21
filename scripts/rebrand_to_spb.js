const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '../app'),
  path.join(__dirname, '../lib'),
  path.join(__dirname, '../components'),
  path.join(__dirname, '../resources'),
  path.join(__dirname, '../routes'),
  path.join(__dirname, '../config')
];

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.next' || f === '.git' || f === 'vendor') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

const replacements = [
  { from: /https:\/\/lincer\.ru/g, to: 'https://keramogranit-spb.ru' },
  { from: /LINCER СПб/g, to: 'Керамогранит СПб' },
  { from: /LINCER/g, to: 'Керамогранит СПб' },
  { from: /ЛИНЦЕР/g, to: 'КЕРАМОГРАНИТ СПБ' },
  { from: /lincer\.ru/g, to: 'keramogranit-spb.ru' },
];

targetDirs.forEach(dir => {
  walk(dir, (filePath) => {
    // CRITICAL: Avoid products-data.ts because Lincer IS the supplier brand
    if (filePath.includes('products-data.ts') || filePath.includes('lincer_products_bulk.json')) return;
    
    const ext = path.extname(filePath);
    if (['.tsx', '.ts', '.php', '.md', '.html', '.js'].includes(ext)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;
      
      replacements.forEach(r => {
        content = content.replace(r.from, r.to);
      });

      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  });
});

console.log("Rebranding to Keramogranit-SPB finished.");
