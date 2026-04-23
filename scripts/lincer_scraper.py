import asyncio
import aiohttp
import json
import logging
from bs4 import BeautifulSoup
import re
import random

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

async def fetch_sitemap_urls(url):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=30) as response:
                text = await response.text()
                urls = re.findall(r'<loc>(https://lincer.ru/catalog/.*?)</loc>', text)
                
                filtered = []
                for u in urls:
                    if "/catalog/kollekcii_plitki/" in u: continue
                    if "/catalog/brands/" in u: continue
                    if u.count('/') < 5: continue
                    
                    if any(x in u for x in ["/plitka/", "/keramogranit/", "/mozaika/", "/stupeni/"]):
                        filtered.append(u)
                
                return filtered
    except Exception as e:
        logging.error(f"Error fetching sitemap: {e}")
        return []

async def fetch_product(session, url, sem):
    async with sem:
        try:
            # Random delay to avoid detection
            await asyncio.sleep(random.uniform(1.0, 3.0))
            
            for attempt in range(3):
                async with session.get(url, timeout=30) as response:
                    if response.status == 200:
                        html = await response.text()
                        break
                    elif response.status == 503:
                        logging.warning(f"503 error for {url}, attempt {attempt+1}. Sleeping...")
                        await asyncio.sleep(10 * (attempt + 1))
                        continue
                    else:
                        if response.status != 404:
                            logging.warning(f"Status {response.status} for {url}")
                        return None
                if attempt == 2: return None
            
            # IMPORTANT: Check for discontinued products
            if "Снят с производства" in html or "Снята с производства" in html:
                return None
            
            soup = BeautifulSoup(html, 'html.parser')
            # ... (rest of the parsing logic stays same)
            name_tag = soup.select_one('h1')
            if not name_tag: return None
            name = name_tag.text.strip()
            
            brand = "LINCER"
            sku = None
            collection = ""
            format_val = ""
            surface = ""
            color = ""
            material_type = ""
            application = ""

            props = soup.select('.properties__item')
            for prop in props:
                p_title_el = prop.select_one('.properties__title')
                p_val_el = prop.select_one('.properties__value')
                if p_title_el and p_val_el:
                    p_name = p_title_el.text.strip()
                    p_val = p_val_el.text.strip()
                    if "Артикул" in p_name: sku = p_val
                    elif "Коллекция" in p_name or "Серия" in p_name: collection = p_val
                    elif "Размер" in p_name or "Формат" in p_name: format_val = p_val
                    elif "Поверхность" in p_name: surface = p_val
                    elif "Цвет" in p_name: color = p_val
                    elif "Тип материала" in p_name: material_type = p_val
                    elif "Назначение" in p_name: application = p_val
                    elif "Производитель" in p_name or "Бренд" in p_name: brand = p_val

            description = ""
            desc_el = soup.select_one('.product-detail-description') or soup.select_one('.product-item-detail-tab-content')
            if desc_el: description = desc_el.text.strip()

            image = None
            img_selectors = ['.product-detail-gallery__picture', '.product-detail-gallery__item img', '.product-item-detail-slider-image img', '.elm-photo img']
            for sel in img_selectors:
                img_el = soup.select_one(sel)
                if img_el:
                    image = img_el.get('data-src') or img_el.get('src')
                    if image: break

            if image and not image.startswith('http'): image = f"https://lincer.ru{image}"
            if not sku: sku = url.strip('/').split('/')[-1]
            if not collection or collection == "Бренды":
                if ' ' in name: collection = name.split(' ')[0]

            return {
                "sku": sku, "name": name, "brand": brand, "collection": collection,
                "format": format_val, "surface": surface, "color": color,
                "material_type": material_type, "application": application,
                "description": description, "image": image, "url": url
            }
        except Exception:
            return None

def save_to_json(products):
    with open('lincer_full_dump.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    logging.info(f"Saved {len(products)} products to lincer_full_dump.json")

async def main():
    logging.info("Fetching sitemap...")
    sitemap_url = "https://lincer.ru/sitemap-iblock-8.xml"
    urls = await fetch_sitemap_urls(sitemap_url)
    logging.info(f"Found {len(urls)} potential product URLs")
    
    products = []
    processed_urls = set()
    if os.path.exists('lincer_full_dump.json'):
        try:
            with open('lincer_full_dump.json', 'r', encoding='utf-8') as f:
                products = json.load(f)
                processed_urls = {p['url'] for p in products}
            logging.info(f"Loaded {len(products)} existing products.")
        except: pass

    # Start from the beginning; already processed URLs will be skipped via processed_urls set
    start_index = 0 
    logging.info(f"Starting from index {start_index} (full run).")
    
    sem = asyncio.Semaphore(2) 
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
    }
    
    async with aiohttp.ClientSession(headers=headers) as session:
        batch_size = 20
        for i in range(start_index, len(urls), batch_size):
            batch = [u for u in urls[i:i+batch_size] if u not in processed_urls]
            
            if not batch:
                logging.info(f"Batch {i}-{i+batch_size} already done or empty.")
                continue

            tasks = [fetch_product(session, url, sem) for url in batch]
            results = await asyncio.gather(*tasks)
            
            new_found = 0
            for res in results:
                if res:
                    products.append(res)
                    processed_urls.add(res['url'])
                    new_found += 1
            
            logging.info(f"Index {i + batch_size}/{len(urls)}. Found {new_found} new (Total products: {len(products)}).")
            save_to_json(products)
            await asyncio.sleep(5)

    save_to_json(products)
    logging.info("Scraping completed!")

import os
if __name__ == "__main__":
    asyncio.run(main())
