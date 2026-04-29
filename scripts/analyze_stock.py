import pandas as pd
import json

path = "/Users/r/Downloads/Копия ОСТАТКИ Янино.xls"
results = {}

try:
    df = pd.read_excel(path, nrows=10)
    results["columns"] = df.columns.tolist()
    results["sample"] = df.values.tolist()
except Exception as e:
    results["error"] = str(e)

with open("/Users/r/cersanit-shop/stock_structure.json", "w") as out:
    json.dump(results, out, indent=2, ensure_ascii=False)

print("Stock analysis completed.")
