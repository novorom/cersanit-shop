import re
import urllib.request
import urllib.error
import concurrent.futures
import json
import time

def find_urls(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple regex to find http/https URLs that look like images
    urls = set(re.findall(r'https?://[^\s\'"]+\.(?:jpg|jpeg|png|webp)', content))
    return urls

files_to_check = [
    '/Users/r/6/lib/products-data.ts',
    '/Users/r/6/lib/seo-data.ts',
    '/Users/r/6/lib/collection-seo.ts'
]

all_urls = set()
for f in files_to_check:
    try:
        all_urls.update(find_urls(f))
    except Exception as e:
        print(f"Error reading {f}: {e}")

print(f"Found {len(all_urls)} unique image URLs to check.")

def check_url(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            return (url, response.status)
    except urllib.error.HTTPError as e:
        return (url, e.code)
    except Exception as e:
        return (url, str(e))

broken_urls = []
checked = 0

start_time = time.time()
with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
    futures = {executor.submit(check_url, url): url for url in all_urls}
    for future in concurrent.futures.as_completed(futures):
        url = futures[future]
        try:
            url, status = future.result()
            if status != 200:
                broken_urls.append((url, status))
        except Exception as e:
            broken_urls.append((url, str(e)))
            
        checked += 1
        if checked % 100 == 0:
            print(f"Checked {checked}/{len(all_urls)} in {time.time()-start_time:.1f}s")

print(f"\nFinished checking! Found {len(broken_urls)} broken links.")
for url, status in broken_urls[:20]:
    print(f"{status}: {url}")
    
with open('/Users/r/6/scratch/broken_links.json', 'w') as f:
    json.dump(broken_urls, f, indent=2)
