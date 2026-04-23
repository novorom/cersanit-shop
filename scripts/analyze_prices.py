import pandas as pd
import json

path = "/Users/r/Downloads/Копия Прайсы - вход.xlsx"
results = {}

try:
    xl = pd.ExcelFile(path)
    results["sheets"] = xl.sheet_names
    
    for sheet in xl.sheet_names:
        df = pd.read_excel(path, sheet_name=sheet, nrows=10)
        results[sheet] = {
            "columns": df.columns.tolist(),
            "sample": df.values.tolist()
        }
except Exception as e:
    results["error"] = str(e)

with open("/Users/r/cersanit-shop/price_structure.json", "w") as out:
    json.dump(results, out, indent=2, ensure_ascii=False)

print("Price analysis completed.")
