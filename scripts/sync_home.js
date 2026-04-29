const fs = require('fs');
const path = require('path');

function run() {
  const tsPath = path.join(__dirname, '../lib/products-data.ts');
  const content = fs.readFileSync(tsPath, 'utf8');

  // Extract products array
  const startMarker = 'export const products: Product[] = [';
  const startIndex = content.indexOf(startMarker);
  const arrayContent = content.substring(startIndex + startMarker.length);
  const lastBracketIndex = arrayContent.lastIndexOf(']');
  const productsRaw = arrayContent.substring(0, lastBracketIndex).trim();

  // Very rough parsing
  const products = [];
  const blocks = productsRaw.split(/},\s*{/);
  blocks.forEach(block => {
      const nameMatch = block.match(/"name":\s*"([^"]+)"/);
      const collectionMatch = block.match(/"collection":\s*"([^"]+)"/);
      const imageMatch = block.match(/"main_image":\s*"([^"]+)"/);
      const slugMatch = block.match(/"slug":\s*"([^"]+)"/);
      
      if (nameMatch && collectionMatch && imageMatch) {
          products.push({
              name: nameMatch[1],
              collection: collectionMatch[1],
              image: imageMatch[1],
              slug: slugMatch ? slugMatch[1] : ''
          });
      }
  });

  // Group by collection and pick one image
  const collectionsMap = {};
  products.forEach(p => {
      if (!collectionsMap[p.collection]) {
          collectionsMap[p.collection] = {
              name: p.collection,
              slug: p.collection.toLowerCase().replace(/\s+/g, '-'),
              image: p.image
          };
      }
  });

  const allCollections = Object.values(collectionsMap);
  // Sort and pick top ones
  // We'll pick some Cersanit and some others
  const topCollections = allCollections.slice(0, 12);

  const homePath = path.join(__dirname, '../components/home-content.tsx');
  let homeContent = fs.readFileSync(homePath, 'utf8');

  const startCol = 'const TOP_COLLECTIONS = [';
  const endCol = ']';
  const startIdx = homeContent.indexOf(startCol);
  const endIdx = homeContent.indexOf(endCol, startIdx);

  const newColArray = 'const TOP_COLLECTIONS = [\n' + 
      topCollections.map((c, i) => `  { id: ${i+1}, name: "${c.name}", slug: "${c.slug}", image: "${c.image}" }`).join(',\n') +
      '\n]';

  const finalHome = homeContent.substring(0, startIdx) + newColArray + homeContent.substring(endIdx + 1);
  fs.writeFileSync(homePath, finalHome, 'utf8');
  console.log("Updated TOP_COLLECTIONS in home-content.tsx");
}

run();
