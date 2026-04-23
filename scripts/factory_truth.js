const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const FACTORY_FILES = [
  {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Azori загрузочный 25.02.26.xlsx",
    brand: "Azori",
    sku: "ID элемента",
    name: "Наименование элемента",
    collection: "Коллекция [COLLECTION]",
    surface: "Поверхность [SURFACE]",
    format: "Размер [SIZE]",
    thickness: "Толщина [THICKNESS]"
  },
  {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Gracia ceramica.xlsx",
    brand: "Gracia Ceramica",
    sku: "Артикул",
    name: "Наименование (для сайта)",
    collection: "Дизайн номенклатуры",
    surface: "Поверхность (для сайта)",
    color: "Цвет (для сайта)",
    width: "Ширина (для сайта)",
    height: "Высота (для сайта)",
    box_pcs: "Количество номенклатуры в упаковке ШТ",
    box_m2: "Количество номенклатуры в упаковке м2",
    thickness: "Толщина (для сайта)"
  },
  {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Keramark_12.10.2025.xlsx",
    brand: "Keramark",
    sku: "Артикул",
    name: "Название",
    collection: "Коллекция",
    surface: "Поверхность",
    color: "Цвет",
    thickness: "Толщина"
  },
  {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Eletto 25.02.26.xlsx",
    brand: "Eletto",
    sku: "Артикул [CML2_ARTICLE]",
    name: "Наименование элемента",
    collection: "Коллекция [COLLECTION]",
    surface: "Поверхность [SURFACE]",
    format: "Размер [SIZE]"
  }
];

function normalizeName(name) {
  if (!name) return "";
  return name.toLowerCase()
    .replace(/[^a-zа-я0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function loadFactoryData() {
  const masterMap = new Map();
  console.log("Loading factory data source of truth...");

  for (const file of FACTORY_FILES) {
    if (!fs.existsSync(file.path)) {
      console.warn(`File not found: ${file.path}`);
      continue;
    }
    console.log(`Processing ${file.brand}...`);
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    data.forEach(row => {
      const rawName = String(row[file.name] || "").trim();
      const sku = String(row[file.sku] || "").trim();
      if (!rawName) return;

      const norm = normalizeName(rawName);
      const entry = {
        sku: sku,
        collection: row[file.collection] || null,
        surface: row[file.surface] || null,
        color: row[file.color] || null,
        format: file.format ? row[file.format] : (row[file.width] && row[file.height] ? `${row[file.width]}x${row[file.height]}` : null),
        brand: file.brand,
        box_pcs: row[file.box_pcs] || null,
        box_m2: row[file.box_m2] || null,
        thickness: row[file.thickness] || null
      };

      masterMap.set(norm, entry);
      
      // Also try name without brand suffix
      const shortName = rawName.split(',')[0].trim();
      masterMap.set(normalizeName(shortName), entry);
    });
  }
  return masterMap;
}

module.exports = { loadFactoryData, normalizeName };
