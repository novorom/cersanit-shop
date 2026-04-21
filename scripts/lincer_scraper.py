import asyncio
import aiohttp
from bs4 import BeautifulSoup
import json
import xml.etree.ElementTree as ET
import logging
import sys

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

async def fetch_sitemap_urls(url):
    urls = []
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=20) as response:
                content = await response.text()
                root = ET.fromstring(content)
                namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
                for loc in root.findall(f".//{namespace}loc"):
                    if '/catalog/' in loc.text and not any(x in loc.text for x in ['/filter/', '/?']):
                        urls.append(loc.text)
    except Exception as e:
        logging.error(f"Error fetching sitemap: {e}")
    return list(set(urls))

import random

async def fetch_product(session, url, sem):
    async with sem:
        try:
            await asyncio.sleep(random.uniform(0.1, 0.5)) # Be nice
            async with session.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}, timeout=20) as response:
                if response.status != 200:
                    return None
                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')
                
                name_tag = soup.find('h1')
                if not name_tag:
                    return None
                name = name_tag.text.strip()
                
                # Check if it's a product or category (category usually has products list, product has price)
                price_tag = soup.select_one('.price_value')
                price_val = price_tag.text.strip() if price_tag else None
                sku = None
                brand = None
                collection = None
                format_val = None
                surface = None
                color = None
                material_type = None
                application = None
                
                # Try to find Brand via link
                brand_link = soup.select_one('a[href*="brand-is"]')
                if brand_link:
                    brand = brand_link.text.strip()
                
                # Try to find Collection via link
                coll_link = soup.select_one('a[href*="/catalog/kollekcii_plitki/"]')
                if coll_link:
                    collection = coll_link.text.strip()

                # Characteristics Table
                props = soup.select('.properties__item')
                for prop in props:
                    prop_name = prop.select_one('.properties__title')
                    prop_val = prop.select_one('.properties__value')
                    if prop_name and prop_val:
                        p_name = prop_name.text.strip()
                        p_val = prop_val.text.strip()
                        if "Артикул" in p_name:
                            sku = p_val
                        elif "Формат" in p_name or "Размер" in p_name or "Длина x Ширина" in p_name:
                            format_val = p_val
                        elif "Поверхность" in p_name:
                            surface = p_val
                        elif "Цвет" in p_name:
                            color = p_val
                        elif "Тип материала" in p_name:
                            material_type = p_val
                        elif "Назначение" in p_name:
                            application = p_val

                # Image (using .elm-photo img)
                image_tag = soup.select_one('.elm-photo img') or soup.select_one('.product-detail-gallery__item img')
                image = image_tag.get('src') if image_tag else None
                if image and not image.startswith('http'):
                    image = f"https://lincer.ru{image}"

                if not sku:
                    parts = url.strip('/').split('/')
                    sku = parts[-1] if len(parts) > 0 else 'Unknown'

                # Price from .prices-info-wrap
                price_val = "0.0"
                price_wrap = soup.select_one('.prices-info-wrap')
                if price_wrap:
                    # Extracts digits from the text
                    price_text = price_wrap.text.split('₽')[0]
                    price_val = ''.join(filter(lambda x: x.isdigit() or x == '.' or x == ',', price_text))
                else:
                    price_tag = soup.select_one('.price_value')
                    if price_tag:
                        price_val = price_tag.text.strip()

                return {
                    "sku": sku,
                    "name": name,
                    "brand": brand or "Lincer",
                    "collection": collection or "Unknown",
                    "price": float(price_val.replace(' ', '').replace(',', '.')) if price_val and ''.join(filter(str.isdigit, price_val)) else 0.0,
                    "image": image,
                    "format": format_val,
                    "surface": surface,
                    "color": color,
                    "material_type": material_type,
                    "application": application,
                    "url": url
                }
        except Exception as e:
            logging.debug(f"Error parsing {url}: {e}")
            return None

async def main():
    logging.info("Fetching sitemap...")
    sitemap_url = "https://lincer.ru/sitemap-iblock-8.xml"
    urls = await fetch_sitemap_urls(sitemap_url)
    logging.info(f"Found {len(urls)} product URLs")
    
    urls = urls[:3000] 
    
    sem = asyncio.Semaphore(10) # Slower but safer
    products = []
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_product(session, url, sem) for url in urls]
        for i, future in enumerate(asyncio.as_completed(tasks)):
            result = await future
            if result:
                products.append(result)
            if (i + 1) % 100 == 0:
                logging.info(f"Processed {i + 1}/{len(urls)}. Found {len(products)} products.")
                with open('lincer_products.json', 'w', encoding='utf-8') as f:
                    json.dump(products, f, ensure_ascii=False, indent=2)

    with open('lincer_products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    logging.info(f"Saved total {len(products)} products to lincer_products.json")

if __name__ == "__main__":
    asyncio.run(main())
