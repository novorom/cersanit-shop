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
    thickness: "Толщина [THICKNESS]",
    more_specs: {
      "фактура": "Фактура [RELIEF]",
      "тип изделия": "Тип изделия [TYPE]",
      "материал": "Материал [MATERIAL]",
      "ректификат": "Ректифицированная [RECHT]"
    }
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
    thickness: "Толщина (для сайта)",
    more_specs: {
      "тип продукции": "Тип продукции (для сайта)",
      "ректификат": "Ректификат (для сайта)",
      "морозостойкость": "Морозостойкость (для сайта)",
      "класс износостойкости": "Класс износостойкости (PEI)",
      "класс скользкости": "Класс скользкости"
    }
  },
  {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Keramark_12.10.2025.xlsx",
    brand: "Keramark",
    sku: "Артикул",
    name: "Название",
    collection: "Коллекция",
    surface: "Поверхность",
    color: "Цвет",
    thickness: "Толщина",
    more_specs: {
      "материал": "Материал",
      "применение": "Применение"
    }
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
    .replace(/\(.*?\)/g, '') // Remove parentheses content
    .replace(/[,\.\-\*]/g, ' ') // Remove common delimiters
    .replace(/[^a-zа-я0-9\s]/g, '') // Remove other special chars
    .replace(/\s+/g, ' ')
    .trim();
}

function loadFactoryData() {
  const masterMap = new Map();
  const nameList = []; // For fuzzy/partial matching
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
        thickness: row[file.thickness] || null,
        more: {},
        normName: norm
      };

      if (file.more_specs) {
        for (const [key, col] of Object.entries(file.more_specs)) {
          if (row[col]) entry.more[key] = String(row[col]);
        }
      }

      masterMap.set(norm, entry);
      nameList.push(entry);
      
      const shortName = rawName.split(',')[0].trim();
      masterMap.set(normalizeName(shortName), entry);
    });
  }
  return { masterMap, nameList, normalizeName };
}

module.exports = { loadFactoryData, normalizeName };

module.exports = { loadFactoryData, normalizeName };
