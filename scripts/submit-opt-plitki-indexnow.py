import requests
import xml.etree.ElementTree as ET
import json
import uuid
import os

SITE_URL = 'https://www.opt-plitki-spb.ru'
SITEMAP_URL = f'{SITE_URL}/sitemap.xml'
INDEXNOW_KEY = '3e1f7e74c42645c6acef98fd0830e84d'
INDEXNOW_KEY_LOCATION = f'{SITE_URL}/{INDEXNOW_KEY}.txt'

# Save key to public dir so Vercel serves it
os.makedirs('public', exist_ok=True)
with open(f'public/{INDEXNOW_KEY}.txt', 'w') as f:
    f.write(INDEXNOW_KEY)
print(f"Created key file public/{INDEXNOW_KEY}.txt")

def get_urls_from_sitemap(url):
    print(f"Fetching sitemap from {url}...")
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            print(f"Failed to fetch sitemap: {response.status_code}")
            return []
        
        content = response.text
        root = ET.fromstring(content)
        
        urls = []
        ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        for url_tag in root.findall('.//ns:url/ns:loc', ns):
            urls.append(url_tag.text)
            
        if not urls:
            for url_tag in root.findall('.//url/loc'):
                urls.append(url_tag.text)
                
        print(f"Found {len(urls)} URLs in sitemap.")
        return urls
    except Exception as e:
        print(f"Error fetching sitemap: {e}")
        return []

def submit_to_indexnow(urls):
    if not urls:
        print("No URLs to submit.")
        return

    payload = {
        "host": "www.opt-plitki-spb.ru",
        "key": INDEXNOW_KEY,
        "keyLocation": INDEXNOW_KEY_LOCATION,
        "urlList": urls
    }
    
    headers = {'Content-Type': 'application/json; charset=utf-8'}
    engines = [
        'https://yandex.com/indexnow',
        'https://www.bing.com/indexnow',
        'https://api.indexnow.org'
    ]
    
    for engine in engines:
        print(f"Submitting {len(urls)} URLs to {engine}...")
        try:
            response = requests.post(engine, data=json.dumps(payload), headers=headers)
            print(f"Status for {engine}: {response.status_code} {response.reason}")
        except Exception as e:
            print(f"Error submitting to {engine}: {e}")

if __name__ == "__main__":
    urls = get_urls_from_sitemap(SITEMAP_URL)
    submit_to_indexnow(urls)
