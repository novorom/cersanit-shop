const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_DIR = '/Users/r/Documents/1 job/компреды тф керамика';
const OUTPUT_FILE = '/Users/r/cersanit-shop/scripts/extracted-data.json';

function extractDataFromExcel(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    console.log(`\n=== Файл: ${path.basename(filePath)} ===`);
    console.log(`Листов: ${workbook.SheetNames.join(', ')}`);
    console.log(`Строк в первом листе: ${data.length}`);
    
    // Показываем первые 10 строк для понимания структуры
    console.log('\nПервые 10 строк:');
    data.slice(0, 10).forEach((row, i) => {
      console.log(`Строка ${i}:`, row);
    });
    
    return { fileName: path.basename(filePath), sheetName, data };
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
  console.log(files);
  
  const allData = [];
  
  files.forEach(file => {
    const filePath = path.join(EXCEL_DIR, file);
    const result = extractDataFromExcel(filePath);
    if (result) {
      allData.push(result);
    }
  });
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allData, null, 2), 'utf8');
  console.log(`\nДанные сохранены в: ${OUTPUT_FILE}`);
}

main();
