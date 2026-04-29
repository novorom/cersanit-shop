import fetch from 'node-fetch';
import fs from 'fs';

const KEY = 'XryjspYdja9YiYzwSAm5o058RhV3TLca';
const HOST = 'keramogranit-opt.ru';

// List of all URLs to submit
const urls = [
  `https://${HOST}/`,
  `https://${HOST}/catalog`,
  `https://${HOST}/collections`,
  `https://${HOST}/delivery`,
  `https://${HOST}/contacts`,
  `https://${HOST}/blog`,
  `https://${HOST}/spb`,
  `https://${HOST}/keramicheskaya-plitka-spb`,
  `https://${HOST}/keramogranit-spb`,
  `https://${HOST}/plitka-dlya-vannoj-spb`,
  `https://${HOST}/blog/keramogranit-opt-novoe-imya`,
];

// Add products (limit to first 100 for batching test)
// Note: In a real environment, you'd import products-data.ts
// but for this script we'll just use a small list or dynamic generation if possible.

async function submitToIndexNow(engine) {
  const endpoint = engine === 'yandex' 
    ? 'https://yandex.com/indexnow' 
    : 'https://www.bing.com/indexnow';

  const data = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/indexnow_key.txt`,
    urlList: urls
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log(`Successfully submitted to ${engine}`);
    } else {
      console.error(`Failed to submit to ${engine}: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error(text);
    }
  } catch (error) {
    console.error(`Error submitting to ${engine}:`, error);
  }
}

async function main() {
  await submitToIndexNow('yandex');
  await submitToIndexNow('bing');
}

main();
