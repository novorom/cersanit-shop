import asyncio
import aiohttp
import json
import logging
from bs4 import BeautifulSoup
import re
import random

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

async def fetch_sitemap_urls(url):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=30) as response:
                text = await response.text()
                # Extract URLs starting with /catalog/
                urls = re.findall(r'<loc>(https://lincer.ru/catalog/.*?)</loc>', text)
                
                # Filter strictly for product-like paths
                # Product pages usually have /plitka/, /keramogranit/, /mozaika/ etc.
                # Avoid category/collection lists
                filtered = []
                for u in urls:
                    if "/catalog/kollekcii_plitki/" in u: continue
                    if "/catalog/brands/" in u: continue
                    if u.count('/') < 5: continue # Too shallow, likely a category
                    
                    if any(x in u for x in ["/plitka/", "/keramogranit/", "/mozaika/", "/stupeni/"]):
                        filtered.append(u)
                
                return filtered
    except Exception as e:
        logging.error(f"Error fetching sitemap: {e}")
        return []

async def fetch_product(session, url, sem):
    async with sem:
        try:
            # Stealth delay
            await asyncio.sleep(random.uniform(0.3, 1.0))
            
            async with session.get(url, timeout=20) as response:
                if response.status != 200:
                    return None
                
                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')

                name_tag = soup.select_one('h1')
                if not name_tag:
                    return None
                name = name_tag.text.strip()
                
                # Brand extraction
                brand = "LINCER"
                if ',' in name:
                    brand = name.split(',')[-1].strip()
                
                brand_link = soup.select_one('a[href*="/brands/"]')
                if brand_link and brand_link.text.strip():
                    brand = brand_link.text.strip()

                sku = None
                collection = brand
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

                # Price Extraction
                price_val = 0.0
                price_found = False
                
                # 1. Try standard UI
                price_el = soup.select_one('.product-item-detail-price-current') or soup.select_one('.price_value')
                # 1. Try standard UI (from browser subagent discovery)
                price_el = soup.select_one('.prices-info-wrap .elm-price') or soup.select_one('.price_value') or soup.select_one('.product-item-detail-price-current')
                if price_el:
                    clean_price = "".join(filter(lambda x: x.isdigit() or x in ".,", price_el.text)).replace(',', '.')
                    if clean_price:
                        try: 
                            price_val = float(clean_price)
                            price_found = True
                        except: pass

                # 2. Try Meta Tag fallback
                if not price_found:
                    meta_desc = soup.find('meta', property='og:description')
                    if meta_desc:
                        match = re.search(r'по цене ([\d\s,.]+) руб', meta_desc.get('content', ''))
                        if match:
                            clean_price = match.group(1).replace(' ', '').replace(',', '.')
                            try: 
                                price_val = float(clean_price)
                                price_found = True
                            except: pass

                if price_val == 0 or "Снят с производства" in html:
                    return None

                # Image
                image_tag = soup.select_one('.elm-photo img') or soup.select_one('.product-detail-gallery__item img')
                image = image_tag.get('src') if image_tag else None
                if image and not image.startswith('http'):
                    image = f"https://lincer.ru{image}"

                if not sku:
                    sku = url.strip('/').split('/')[-1]

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
                    "price": price_val,
                    "image": image,
                    "url": url
                }
        except Exception as e:
            return None

def save_to_json(products):
    with open('lincer_products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    logging.info(f"Saved {len(products)} products to lincer_products.json")

async def main():
    logging.info("Fetching sitemap...")
    sitemap_url = "https://lincer.ru/sitemap-iblock-8.xml"
    urls = await fetch_sitemap_urls(sitemap_url)
    logging.info(f"Found {len(urls)} potential product URLs")
    
    random.shuffle(urls)
    urls = urls[:5000] # Target batch
    
    sem = asyncio.Semaphore(15)
    products = []
    
    async with aiohttp.ClientSession(headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}) as session:
        tasks = [fetch_product(session, url, sem) for url in urls]
        
        count = 0
        for task in asyncio.as_completed(tasks):
            res = await task
            if res:
                products.append(res)
            
            count += 1
            if count % 50 == 0:
                logging.info(f"Processed {count}/{len(urls)}. Found {len(products)} products.")
                save_to_json(products)

    save_to_json(products)
    logging.info("Scraping completed!")

if __name__ == "__main__":
    asyncio.run(main())
