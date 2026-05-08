const xlsx = require('xlsx');
const files = ['/Users/r/Downloads/Zagruzochnyi_-fai_l_19.01.2026.xlsx'] //
  '/Users/r/Downloads/Гранитея.xlsx',
  '/Users/r/Downloads/Загрузочный прайс 050226 Идальго.xls',
  '/Users/r/Downloads/Zagruzochnyi_-fai_l_19.01.2026.xlsx'
];

files.forEach(file => {
  try {
    const workbook = xlsx.readFile(file);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(`\n--- ${file} ---`);
    if (data.length > 0) {
      console.log('Headers:', Object.keys(data[0]));
      console.log('Sample Row:', data[0]);
    }
  } catch (e) {
    console.log(`Error reading ${file}:`, e.message);
  }
});
