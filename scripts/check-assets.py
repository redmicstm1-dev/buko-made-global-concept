#!/usr/bin/env python3
"""Check that every local product image path in lib/products.json exists."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
products = json.loads((ROOT / "lib/products.json").read_text(encoding="utf-8"))
missing = []
for product in products:
    path = product.get("image", "")
    local_path = ROOT / "public" / path.lstrip("/")
    if not path.startswith("/") or not local_path.is_file():
        missing.append((product.get("id"), product.get("name"), path))
if missing:
    for item in missing:
        print("MISSING:", *item)
    raise SystemExit(1)
print(f"OK: all {len(products)} product image paths resolve to local files.")
