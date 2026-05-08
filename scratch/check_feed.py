import json
with open('lib/products-data.json', 'r') as f:
    products = json.load(f)

active = [p for p in products if p.get('slug') and p.get('price_retail') and p.get('price_retail') > 0 and p.get('main_image')]
print("Active products for feed:", len(active))
