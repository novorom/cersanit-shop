import requests
from bs4 import BeautifulSoup

url = "https://lincer.ru/catalog/plitka/amati_modern_dekor_2sht_50_5_40_2_azori/"
headers = {'User-Agent': 'Mozilla/5.0'}
resp = requests.get(url, headers=headers)
soup = BeautifulSoup(resp.content, 'html.parser')

name = soup.find('h1').text.strip() if soup.find('h1') else None
price = soup.select_one('.price_value')
price = price.text.strip() if price else None

sku = soup.select_one('.article .value')
sku = sku.text.strip() if sku else None

brand = None
collection = None

props = soup.select('.properties__item')
for prop in props:
    prop_name = prop.select_one('.properties__title')
    prop_val = prop.select_one('.properties__value')
    if prop_name and prop_val:
        prop_name = prop_name.text.strip()
        prop_val = prop_val.text.strip()
        if "Бренд" in prop_name:
            brand = prop_val
        if "Коллекция" in prop_name:
            collection = prop_val
        print(f"{prop_name}: {prop_val}")

print(f"Name: {name}")
print(f"Price: {price}")
print(f"SKU: {sku}")
print(f"Brand: {brand}")
print(f"Collection: {collection}")
