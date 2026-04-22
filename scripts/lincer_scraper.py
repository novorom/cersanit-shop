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
            await asyncio.sleep(random.uniform(0.1, 0.4)) # Slightly faster but still safe
            
            async with session.get(url, timeout=20) as response:
                if response.status != 200:
                    return None
                
                html = await response.text()
                
                # JUMP OUT IF DISCONTINUED
                if "Снят с производства" in html or "Снята с производства" in html:
                    return None
                
                soup = BeautifulSoup(html, 'html.parser')

                name_tag = soup.select_one('h1')
                if not name_tag:
                    return None
                name = name_tag.text.strip()
                
                brand = "LINCER"
                sku = None
                collection = ""
                format_val = ""
                surface = ""
                color = ""
                material_type = ""
                application = ""

                # Characteristics Table
                props = soup.select('.properties__item')
                for prop in props:
                    p_title_el = prop.select_one('.properties__title')
                    p_val_el = prop.select_one('.properties__value')
                    if p_title_el and p_val_el:
                        p_name = p_title_el.text.strip()
                        p_val = p_val_el.text.strip()
                        if "Артикул" in p_name:
                            sku = p_val
                        elif "Коллекция" in p_name or "Серия" in p_name:
                            collection = p_val
                        elif "Размер" in p_name or "Формат" in p_name:
                            format_val = p_val
                        elif "Поверхность" in p_name:
                            surface = p_val
                        elif "Цвет" in p_name:
                            color = p_val
                        elif "Тип материала" in p_name:
                            material_type = p_val
                        elif "Назначение" in p_name:
                            application = p_val
                        elif "Производитель" in p_name or "Бренд" in p_name:
                            brand = p_val

                # Description
                description = ""
                desc_el = soup.select_one('.product-detail-description') or soup.select_one('.product-item-detail-tab-content')
                if desc_el:
                    description = desc_el.text.strip()

                # Image
                image = None
                img_selectors = [
                    '.product-detail-gallery__picture',
                    '.product-detail-gallery__item img',
                    '.product-item-detail-slider-image img',
                    '.elm-photo img'
                ]
                for sel in img_selectors:
                    img_el = soup.select_one(sel)
                    if img_el:
                        image = img_el.get('data-src') or img_el.get('src')
                        if image: break

                if image and not image.startswith('http'):
                    image = f"https://lincer.ru{image}"

                if not sku:
                    sku = url.strip('/').split('/')[-1]

                if collection == "Бренды" or not collection:
                    if ' ' in name:
                        collection = name.split(' ')[0]

                return {
                    "sku": sku,
                    "name": name,
                    "brand": brand,
                    "collection": collection,
                    "format": format_val,
                    "surface": surface,
                    "color": color,
                    "material_type": material_type,
                    "application": application,
                    "description": description,
                    "image": image,
                    "url": url
                }
        except Exception as e:
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
    
    sem = asyncio.Semaphore(15) # Boosted concurrency
    products = []
    
    async with aiohttp.ClientSession(headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}) as session:
        tasks = [fetch_product(session, url, sem) for url in urls]
        
        count = 0
        for task in asyncio.as_completed(tasks):
            res = await task
            if res:
                products.append(res)
            
            count += 1
            if count % 100 == 0:
                logging.info(f"Processed {count}/{len(urls)}. Found {len(products)} products.")
                save_to_json(products)

    save_to_json(products)
    logging.info("Scraping completed!")

if __name__ == "__main__":
    asyncio.run(main())
