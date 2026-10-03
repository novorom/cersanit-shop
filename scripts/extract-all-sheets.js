const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_DIR = '/Users/r/Documents/1 job/компреды тф керамика';
const OUTPUT_FILE = '/Users/r/cersanit-shop/scripts/extracted-all-sheets.json';

function extractAllSheets(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const result = {
      fileName: path.basename(filePath),
      sheets: {}
    };
    
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      result.sheets[sheetName] = {
        rows: data.length,
        preview: data.slice(0, 15)
      };
      
      console.log(`\n=== ${path.basename(filePath)} / ${sheetName} ===`);
      console.log(`Строк: ${data.length}`);
      console.log('Превью:', data.slice(0, 5));
    });
    
    return result;
  } catch (error) {
    console.error(`Ошибка при чтении ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  const files = fs.readdirSync(EXCEL_DIR).filter(f => 
    f.endsWith('.xlsx') || f.endsWith('.xlsm')
  );
  
  console.log(`Найдено файлов: ${files.length}`);
  
  const allData = [];
  
  files.forEach(file => {
    const filePath = path.join(EXCEL_DIR, file);
    const result = extractAllSheets(filePath);
    if (result) {
      allData.push(result);
    }
  });
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allData, null, 2), 'utf8');
  console.log(`\n\nВсе данные сохранены в: ${OUTPUT_FILE}`);
}

main();
