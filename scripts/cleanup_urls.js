const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '../app'),
  path.join(__dirname, '../lib'),
  path.join(__dirname, '../components'),
];

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.next' || f === '.git') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

const replacements = [
  { from: /https:\/\/lincer-spb\.ru/g, to: 'https://cersanit-spb.ru' },
  { from: /https:\/\/keramogranit-spb\.ru/g, to: 'https://cersanit-spb.ru' },
  { from: /lincer-spb\.ru/g, to: 'cersanit-spb.ru' },
  { from: /keramogranit-spb\.ru/g, to: 'cersanit-spb.ru' },
];

targetDirs.forEach(dir => {
  walk(dir, (filePath) => {
    if (filePath.includes('products-data.ts')) return;
    
    const ext = path.extname(filePath);
    if (['.tsx', '.ts', '.js', '.md'].includes(ext)) {
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
