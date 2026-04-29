import pandas as pd
import os
import json

base_path = "/Users/r/Downloads/Загрузочные файлы от заводов"
files = [
    "Azori загрузочный 25.02.26.xlsx",
    "Gracia ceramica.xlsx",
    "Keramark_12.10.2025.xlsx",
    "Гранитея/Гранитея.xlsx",
    "Eletto 25.02.26.xlsx"
]

results = {}

for f in files:
    path = os.path.join(base_path, f)
    if not os.path.exists(path):
        results[f] = "Not found"
        continue
    
    try:
        # Read only header and first 5 rows
        df = pd.read_excel(path, nrows=5)
        results[f] = {
            "columns": df.columns.tolist(),
            "sample": df.values.tolist()
        }
    except Exception as e:
        results[f] = f"Error: {str(e)}"

with open("/Users/r/cersanit-shop/excel_structure.json", "w") as out:
    json.dump(results, out, indent=2, ensure_ascii=False)

print("Analysis completed. Structure saved to excel_structure.json")
