const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walkDir('/Users/r/cersanit-shop', function(filePath) {
  if (filePath.includes('.git') || filePath.includes('node_modules') || filePath.includes('.next') || filePath.includes('scratch') || filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.ico')) return;
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('keramogranit-opt.ru')) {
      // 1. Fix image URLs
      content = content.replace(/pvi\.keramogranit-opt\.ru/g, 'pvi.cersanit.ru');
      // 2. Fix website URLs
      content = content.replace(/keramogranit-opt\.ru/g, 'cersanit-spb.ru');
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
      count++;
    }
  } catch (e) {}
});
console.log('Total files updated:', count);
