const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Configuration for different factories
const CONFIG = {
  "Azori": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Azori загрузочный 25.02.26.xlsx",
    skuCol: "ID элемента",
    mappings: {
      collection: "Коллекция [COLLECTION]",
      surface: "Поверхность [SURFACE]",
      texture: "Фактура [RELIEF]",
      thickness: "Толщина [THICKNESS]",
      pieces_per_box: "Кол-во в упаковке [PACKING]",
      format: "Размер [SIZE]"
    }
  },
  "Gracia": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Gracia ceramica.xlsx",
    skuCol: "Артикул",
    mappings: {
      brand: "Марка (бренд)",
      collection: "Коллекция (для сайта)",
      color: "Цвет (для сайта)",
      surface: "Поверхность (для сайта)",
      texture: "Текстура (для сайта)",
      material_type: "Основной материал (для сайта)",
      application: "Область применения (для сайта)",
      weight_box: "Вес упаковки",
      pieces_per_box: "Количество номенклатуры в упаковке ШТ",
      sqm_per_box: "Количество номенклатуры в упаковке м2",
      thickness: "Толщина (для сайта)",
      rectified: "Ректификат (для сайта)",
      frost_resistant: "Морозостойкость (для сайта)"
    }
  },
  "Keramark": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Keramark_12.10.2025.xlsx",
    skuCol: "Артикул",
    mappings: {
      brand: "Бренд",
      collection: "Коллекция",
      color: "цвет",
      surface: "Поверхность",
      weight_box: "Вес коробки",
      pieces_per_box: "Количество штук в коробке",
      sqm_per_box: "Количество м2 в коробке",
      thickness: "Толщина"
    }
  },
  "Graniteya": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Гранитея/Гранитея.xlsx",
    skuCol: "Артикул",
    headerRow: 3, // 0-indexed, row 4 in Excel
    mappings: {
      brand: "Торговая марка",
      collection: "Коллекция ",
      design: "Дизайн",
      color: "Цвет",
      surface: "Поверхности",
      product_type: "Тип плитки",
      format: "Форматы"
    }
  },
  "Eletto": {
    path: "/Users/r/Downloads/Загрузочные файлы от заводов/Eletto 25.02.26.xlsx",
    skuCol: "Артикул [CML2_ARTICLE]",
    mappings: {
      brand: "Производитель [ATT_BRAND]",
      collection: "Коллекции [COLLECTION_1]",
      weight_box: "Масса упаковки (кг) [MASSA_UPAKOVKI_KG]",
      sqm_per_box: "Кол-во в упаковке (м2) [KOL_VO_V_UPAKOVKE]",
      surface: "Поверхность [POVERKHNOST]",
      thickness: "Толщина, мм [Tolshina_mm]"
    }
  }
};

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  let tsContent = fs.readFileSync(tsPath, 'utf8');

  // Extract products array
  const arrayStartText = 'export const products: Product[] = [';
  const startIndex = tsContent.indexOf(arrayStartText);
  const arrayEndIndex = tsContent.lastIndexOf('\n];');
  
  if (startIndex === -1 || arrayEndIndex === -1) {
    console.error("Could not find products array");
    return;
  }

  const header = tsContent.substring(0, startIndex + arrayStartText.length);
  const footer = tsContent.substring(arrayEndIndex);
  const productsContent = tsContent.substring(startIndex + arrayStartText.length, arrayEndIndex);

  // We'll use a Map for efficiency. Since it's JS code, we might need a rough parser.
  // BUT: a safer way is to use JSON.stringify-like objects.
  // Actually, I'll just re-sync everything from the JSON dump + Excel.
  
  const jsonPath = path.join(__dirname, '../lincer_full_dump.json');
  if (!fs.existsSync(jsonPath)) {
    console.log("No lincer_full_dump.json found. Run scraper first.");
    return;
  }
  const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const productsMap = new Map();
  products.forEach(p => {
      if (p.sku) productsMap.set(String(p.sku), p);
  });

  console.log(`Initial products: ${productsMap.size}`);

  // Process Excel files
  for (const [factory, config] of Object.entries(CONFIG)) {
    if (!fs.existsSync(config.path)) {
      console.log(`File for ${factory} not found: ${config.path}`);
      continue;
    }

    console.log(`Processing ${factory}...`);
    const workbook = xlsx.readFile(config.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { range: config.headerRow || 0 });

    data.forEach(row => {
      const sku = String(row[config.skuCol] || "").trim();
      if (!sku || !productsMap.has(sku)) return;

      const p = productsMap.get(sku);
      
      // Update fields
      for (const [targetField, sourceCol] of Object.entries(config.mappings)) {
          let value = row[sourceCol];
          if (value === undefined || value === null || value === "") continue;
          
          // Basic normalization
          if (typeof value === 'string') value = value.trim();
          
          // Special handling for numbers
          if (['weight_box', 'pieces_per_box', 'sqm_per_box', 'thickness'].includes(targetField)) {
              if (typeof value === 'string') value = parseFloat(value.replace(',', '.'));
          }
          
          // Special handling for booleans
          if (targetField === 'rectified' || targetField === 'frost_resistant') {
              value = String(value).toLowerCase().includes('да') || String(value).toLowerCase() === 'y';
          }

          p[targetField] = value;
          
          // Also update characteristics dictionary
          if (!p.characteristics) p.characteristics = {};
          p.characteristics[sourceCol] = value;
      }
    });
  }

  // Now re-generate the TS file
  // Reuse the logic from merge_lincer_to_ts.js for consistency
  const generateSlug = (text) => text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  
  const lincerObjects = Array.from(productsMap.values()).map((p, index) => {
    // Re-run the mapping logic to ensure all Excel updates are reflected in the final object
    const brand = p.brand || 'Lincer';
    const collection = p.collection || 'Lincer Collection';
    
    const specs = [];
    if (p.characteristics) {
        Object.entries(p.characteristics).forEach(([key, value]) => {
            specs.push({ key: key.toLowerCase(), label: String(value) });
        });
    }

    return {
      id: "lincer-" + (400000 + index),
      sku: p.sku || '',
      name: p.name,
      slug: generateSlug(p.name),
      brand: brand,
      collection: collection,
      product_type: p.product_type || (p.name.toLowerCase().includes('ступен') ? 'Ступень' : (p.name.toLowerCase().includes('вставк') || p.name.toLowerCase().includes('декор') ? 'Вставка' : 'Керамогранит')),
      format: p.format || 'Не указан',
      color: p.color || 'Ассорти',
      surface: p.surface || '',
      material_type: p.material_type || '',
      application: p.application || '',
      description: p.description || '', // Assuming it's already generated or we'll keep what's there
      price_retail: p.price_retail || 0,
      weight_box: p.weight_box,
      pieces_per_box: p.pieces_per_box,
      sqm_per_box: p.sqm_per_box,
      thickness: String(p.thickness || ''),
      main_image: p.image || '',
      images: p.image ? [p.image] : [],
      specs: specs,
      is_new: true
    };
  });

  // We need to keep non-lincer products!
  // I'll reuse the logic to filter existing ones.
  const oldBlocks = productsContent.split(/\n\s*\},?\s*\{/);
  const cleanBlocks = [];
  oldBlocks.forEach(block => {
      let fullBlock = block.trim();
      if (!fullBlock.startsWith('{')) fullBlock = '{' + fullBlock;
      if (!fullBlock.endsWith('}')) fullBlock = fullBlock + '}';
      if (fullBlock.includes('id: "lincer-') || fullBlock.includes('"id": "lincer-')) return;
      if (fullBlock.length < 10) return;
      cleanBlocks.push(fullBlock);
  });

  const finalArrayContent = cleanBlocks.join(',\n  ') + (cleanBlocks.length > 0 ? ',\n  ' : '') + 
                            lincerObjects.map(o => JSON.stringify(o, null, 2)).join(',\n  ');

  fs.writeFileSync(tsPath, header + '\n  ' + finalArrayContent + footer, 'utf8');
  console.log(`Successfully enriched catalog with factory data. Total products updated: ${lincerObjects.length}`);
}

run();
