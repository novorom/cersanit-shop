const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const FACTORY_FILES = [
  {
    path: "/Users/r/cersanit-shop/ИМ_2D_заливочный_файл_Cersanit_22_09_2025_2.xlsx",
    brand: "Cersanit",
    sku: "Артикул",
    name: "Наименование для сайта",
    collection: "Коллекция",
    surface: "Поверхность",
    color: "Цвет плитки",
    width: "Ширина плитки (см)",
    height: "Длина плитки (см)",
    box_pcs: "Количество изделий в коробке",
    box_m2: "М2 в одной коробке",
    thickness: "Толщина плитки (см)",
    more_specs: {
      "фактура": "Фактура поверхности",
      "материал": "Материал",
      "ректификат": "Ректификат",
      "морозостойкость": "Морозостойкость",
      "износостойкость": "Класс износостойкости",
      "скольжение": "Класс устойчивости к скольжению",
      "дизайн": "Дизайн",
      "применение": "Применение",
      "назначение": "Назначение",
      "поверхность": "Поверхность"
    }
  },
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
  },
  {
    path: "/Users/r/Downloads/Загрузочный прайс 050226 Идальго.xls",
    brand: "Hidalgo",
    sku: "Артикул",
    name: "Наименование",
    collection: "Коллекция",
    surface: "Поверхность",
    color: "Цвет",
    format: "Размер"
  },
  {
    path: "/Users/r/Downloads/Гранитея.xlsx",
    brand: "Graniteya",
    sku: "__EMPTY_2",
    name: "__EMPTY",
    collection: "__EMPTY",
    surface: "__EMPTY_7",
    color: "__EMPTY_3",
    format: "__EMPTY_6",
    thickness: "__EMPTY_4",
    headerRow: 1 
  },
  {
    path: "/Users/r/Downloads/Zagruzochnyi_-fai_l_19.01.2026.xlsx",
    brand: "Unitile",
    sku: "Артикул",
    name: "Наименование (ИМ)",
    collection: "Коллекция (ИМ)",
    surface: "Поверхность (ИМ)",
    color: "Цвет (ИМ)",
    width: "Ширина (ИМ)",
    height: "Высота (ИМ)",
    box_pcs: "Количество в упаковке (шт)",
    box_m2: "Количество в упаковке (м2)",
    thickness: "Толщина (ИМ)",
    more_specs: {
      "тип": "Тип продукции (ИМ)",
      "материал": "Основной материал (ИМ)",
      "рельеф": "Рельеф (ИМ)",
      "ректификат": "Ректификат (ИМ)",
      "текстура": "Текстура (ИМ)",
      "износостойкость": "Износостойкость (ИМ)",
      "морозостойкость": "Морозостойкость (ИМ)",
      "применение": "Область применения (ИМ)"
    }
  },
  {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Керама Марацци/ExportPlitka_10_19_34.csv",
    brand: "Kerama Marazzi",
    sku: "Артикул",
    name: "НаименованиеИМ",
    collection: "КоллекцияИМ",
    surface: "ПоверхностьИМ",
    color: "Цвет",
    format: "ФорматИМ",
    box_pcs: "ШтукВКоробке",
    box_m2: "МетровВКоробке",
    thickness: "ТолщинаИМ",
    isCsv: true,
    encoding: "windows-1251",
    delimiter: ";",
    more_specs: {
      "ректификат": "Реттификат",
      "износостойкость": "УстойчивостьКИстираемости",
      "страна": "СтранаПроизводства",
      "материал": "ВидПродукцииИМ"
    }
  }
];

function normalizeName(name) {
  if (!name) return "";
  return String(name).toLowerCase()
    .replace(/\(.*?\)/g, '') 
    .replace(/(\d+),(\d+)/g, '$1.$2') 
    .replace(/[,\-\*\/]/g, ' ') 
    .replace(/[^a-zа-я0-9.\s]/g, '') 
    .replace(/\s+/g, ' ')
    .trim();
}

const { execSync } = require('child_process');

function parseCsvLine(line, delimiter) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === delimiter && !inQuotes) {
            parts.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    parts.push(current);
    return parts;
}

function loadFactoryData() {
  const masterMap = new Map();
  const skuMap = new Map();
  const nameList = []; 
  console.log("Loading factory data source of truth...");

  for (const file of FACTORY_FILES) {
    if (!fs.existsSync(file.path)) {
      console.warn(`File not found: ${file.path}`);
      continue;
    }
    console.log(`Processing ${file.brand}...`);
    let data = [];
    if (file.isCsv) {
      try {
        const encoding = file.encoding || 'utf-8';
        const buffer = execSync(`iconv -f ${encoding} -t UTF-8 "${file.path}"`, { maxBuffer: 1024 * 1024 * 100 });
        const content = buffer.toString();
        const lines = content.split('\n').filter(l => l.trim());
        if (lines.length === 0) continue;
        
        const headers = parseCsvLine(lines[0], file.delimiter || ',');
        for (let i = 1; i < lines.length; i++) {
            const values = parseCsvLine(lines[i], file.delimiter || ',');
            const row = {};
            headers.forEach((h, idx) => {
                row[h.trim()] = values[idx] || '';
            });
            data.push(row);
        }
      } catch (e) {
        console.error(`Error parsing CSV ${file.path}:`, e.message);
        continue;
      }
    } else {
      const workbook = xlsx.readFile(file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(sheet, { range: file.headerRow || 0 });
    }

    let count = 0;
    data.forEach(row => {
      const rawName = String(row[file.name] || "").trim();
      const sku = String(row[file.sku] || "").trim();
      if (!rawName && !sku) return;

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

      if (norm) {
          masterMap.set(norm, entry);
          const shortName = rawName.split(',')[0].trim();
          masterMap.set(normalizeName(shortName), entry);
      }
      if (sku && sku !== "undefined") {
          skuMap.set(sku, entry);
      }
      nameList.push(entry);
    });
  }
  return { masterMap, skuMap, nameList, normalizeName };
}

module.exports = { loadFactoryData, normalizeName };

