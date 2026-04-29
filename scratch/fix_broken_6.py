import json

broken_urls = [
    "https://pvi.cersanit.ru/upload/uf/7e2/ST4R092.jpg",
    "https://pvi.cersanit.ru/upload/uf/4d9/Int_Galaxy_012_2_3.jpg",
    "https://pvi.cersanit.ru/upload/uf/2b3/MM09.jpg",
    "https://pvi.cersanit.ru/upload/uf/a54/Woodhouse_DARK_BEIGE_1.jpg",
    "https://pvi.cersanit.ru/upload/uf/f6c/Northwood_1.jpg",
    "https://pvi.cersanit.ru/upload/uf/d7a/ML4A093.jpg",
    "https://pvi.cersanit.ru/upload/uf/1c2/GL01.jpg",
    "https://pvi.cersanit.ru/upload/uf/7c1/INT_Finwood_052_2_3.jpg",
    "https://pvi.cersanit.ru/upload/uf/0f8/TU6U522D.jpg",
    "https://pvi.cersanit.ru/upload/uf/ee0/wood_brown_1.jpg",
    "https://pvi.cersanit.ru/upload/uf/91c/HIU091.jpg",
    "https://pvi.cersanit.ru/upload/uf/91c/HIU521.jpg",
    "https://pvi.cersanit.ru/upload/uf/a0c/VG01.jpg",
    "https://pvi.cersanit.ru/upload/uf/6d7/WS6U402D.jpg",
    "https://pvi.cersanit.ru/upload/uf/58f/BN4R112.jpg",
    "https://pvi.cersanit.ru/upload/uf/42d/Int_Galaxy_012_2_1.jpg"
]

with open('/Users/r/cersanit-shop/lincer_full_dump.json', 'r', encoding='utf-8') as f:
    lincer_dump = json.load(f)

with open('/Users/r/6/lib/products-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'https://pvi.cersanit.ru/upload/uf/7de/7n1gg68i4tf8j5q9ij1i6r4bi4fuaee6/17950_4.jpghttps://pvi.cersanit.ru/upload/uf/7de/7n1gg68i4tf8j5q9ij1i6r4bi4fuaee6/17950_4.jpg',
    'https://pvi.cersanit.ru/upload/uf/7de/7n1gg68i4tf8j5q9ij1i6r4bi4fuaee6/17950_4.jpg'
)

content = content.replace(
    'https://pvi.cersanit.ru/upload/uf/177/kvhyvj12e7138mo5uj01opgcd0rwfv08/INT_Cambio_A17427_2_4.jpghttps://pvi.cersanit.ru/upload/uf/d94/66xlicr8kqz3zhbz4ydu16swyg4vjivo/INT_Cambio_A17427_2_5.jpg',
    'https://pvi.cersanit.ru/upload/uf/177/kvhyvj12e7138mo5uj01opgcd0rwfv08/INT_Cambio_A17427_2_4.jpg", "https://pvi.cersanit.ru/upload/uf/d94/66xlicr8kqz3zhbz4ydu16swyg4vjivo/INT_Cambio_A17427_2_5.jpg'
)

replacements = 0

for url in broken_urls:
    # Let's find out if this is a main_image for a product to find its name
    # We can do this by splitting content
    parts = content.split(url)
    if len(parts) > 1:
        # Before the URL, there might be a name
        # We can extract the name using regex
        import re
        # This is a bit hacky but works for the ts file
        name_match = re.search(r'name:\s*"([^"]+)"(?:.(?!name:))*?$', parts[0], re.DOTALL)
        if name_match:
            name = name_match.group(1)
            print(f"Broken URL belongs to: {name}")
            # find in lincer_dump
            found = False
            for item in lincer_dump:
                # remove sizes for better matching, or just basic match
                # if "Cersanit" is in name, lincer might just have collection name + color
                words = name.replace('Керамогранит', '').replace('Плитка', '').replace('Cersanit', '').strip().split()
                if len(words) >= 2:
                    match_count = sum(1 for w in words if w.lower() in item['name'].lower())
                    if match_count >= len(words) - 1 and item['brand'] == 'Cersanit':
                        print(f"  Matched with: {item['name']} -> {item['image']}")
                        content = content.replace(url, item['image'])
                        found = True
                        replacements += 1
                        break
            if not found:
                print("  No match found in Lincer. Will remove URL.")
                content = content.replace(f'"{url}", ', '')
                content = content.replace(f', "{url}"', '')
                content = content.replace(f'"{url}"', '""')
        else:
            print(f"Could not find name for {url}, removing URL.")
            content = content.replace(f'"{url}", ', '')
            content = content.replace(f', "{url}"', '')
            content = content.replace(f'"{url}"', '""')

with open('/Users/r/6/lib/products-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Replaced {replacements} URLs with Lincer images.")
