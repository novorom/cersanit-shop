import asyncio
import json
import logging
import re
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

async def extract_product_urls_from_page(page, url):
    try:
        await page.goto(url, wait_until='domcontentloaded', timeout=15000)
        # Extract links to products from the catalog grid
        html = await page.content()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Brute force regex extraction
        product_links = []
        for match in re.finditer(r'href="(/catalog/(?:plitka|keramogranit_|mozaika|keramogranit)[^"]*/)"', html):
            href = match.group(1)
            # Filter out pagination, collections, and base categories
            if '?' in href or 'kollekcii_plitki' in href or href.count('/') <= 4:
                continue
            
            full_url = f"https://lincer.ru{href}"
            if full_url not in product_links:
                product_links.append(full_url)

        return product_links
    except Exception as e:
        logging.error(f"Error fetching product list from {url}: {e}")
        return []

async def scrape_product(page, url):
    try:
        await page.goto(url, wait_until='domcontentloaded', timeout=15000)
        html = await page.content()
        soup = BeautifulSoup(html, 'html.parser')

        name_tag = soup.select_one('h1')
        if not name_tag:
            return None
        name = name_tag.text.strip()

        brand = "LINCER"
        if ',' in name:
            brand = name.split(',')[-1].strip()

        brand_link = soup.select_one('a[href*="/brands/"]')
        if brand_link and brand_link.text.strip():
            brand = brand_link.text.strip()

        sku = url.strip('/').split('/')[-1]
        collection = brand
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

        price_val = 0.0
        price_found = False

        price_el = soup.select_one('.prices-info-wrap .elm-price') or soup.select_one('.price_value') or soup.select_one('.product-item-detail-price-current')
        if price_el:
            clean_price = "".join(filter(lambda x: x.isdigit() or x in ".,", price_el.text)).replace(',', '.')
            if clean_price:
                try: 
                    price_val = float(clean_price)
                    price_found = True
                except: pass

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

        image_tag = soup.select_one('.elm-photo img') or soup.select_one('.product-detail-gallery__item img')
        image = image_tag.get('src') if image_tag else None
        if image and not image.startswith('http'):
            image = f"https://lincer.ru{image}"

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
        logging.error(f"Error scraping product {url}: {e}")
        return None

async def main():
    results = []
    
    # Define categories and page ranges to scrape
    categories = [
        ("https://lincer.ru/catalog/plitka/keramogranit_/", 1, 10), # Scraping pages 1 to 10
        ("https://lincer.ru/catalog/plitka/", 1, 10)
    ]
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Create a single context and reuse a page for efficiency, or a pool of pages
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        # Step 1: Collect product URLs
        all_product_urls = set()
        for base_url, start_page, end_page in categories:
            for i in range(start_page, end_page + 1):
                url = f"{base_url}?PAGEN_1={i}" if i > 1 else base_url
                logging.info(f"Extracting links from {url}")
                urls = await extract_product_urls_from_page(page, url)
                all_product_urls.update(urls)
                logging.info(f"Found {len(urls)} links on this page. Total unique so far: {len(all_product_urls)}")

        urls_to_scrape = list(all_product_urls)
        logging.info(f"Total product URLs to scrape: {len(urls_to_scrape)}")

        # Step 2: Scrape products
        count = 0
        for url in urls_to_scrape:
            count += 1
            logging.info(f"Scraping {count}/{len(urls_to_scrape)}: {url}")
            product_data = await scrape_product(page, url)
            if product_data:
                results.append(product_data)
                logging.info(f"Success! {product_data['name']} for {product_data['price']}")
            else:
                logging.info(f"Skipped (No price or discontinued)")

            # Save periodically
            if count % 20 == 0:
                with open('lincer_products_bulk.json', 'w', encoding='utf-8') as f:
                    json.dump(results, f, ensure_ascii=False, indent=2)
                logging.info(f"Intermediate save: {len(results)} products saved.")

        # Final save
        with open('lincer_products_bulk.json', 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        
        logging.info(f"Scraping finished. Total valid products: {len(results)}")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
