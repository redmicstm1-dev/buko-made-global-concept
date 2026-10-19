#!/usr/bin/env python3
"""Permanently watermark local PNG/JPEG images using Pillow (install Pillow locally first)."""
import argparse
from pathlib import Path
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError as exc:
    raise SystemExit("Pillow is required: run `python -m pip install Pillow` locally. No paid service is used.") from exc
parser = argparse.ArgumentParser()
parser.add_argument("input", type=Path)
parser.add_argument("output", type=Path)
parser.add_argument("--text", default="BUKO MADE")
args = parser.parse_args()
image = Image.open(args.input).convert("RGBA")
font_size = max(18, round(image.width * .025))
try:
    font = ImageFont.truetype("arial.ttf", font_size)
except OSError:
    font = ImageFont.load_default()
draw = ImageDraw.Draw(image, "RGBA")
bbox = draw.textbbox((0, 0), args.text, font=font)
pad = max(10, round(font_size * .5))
width, height = bbox[2] - bbox[0], bbox[3] - bbox[1]
x, y = image.width - width - pad * 2 - 12, image.height - height - pad * 2 - 12
draw.rounded_rectangle((x, y, x + width + pad * 2, y + height + pad * 2), radius=8, fill=(18, 48, 74, 185))
draw.text((x + pad, y + pad), args.text, font=font, fill=(255, 255, 255, 245))
args.output.parent.mkdir(parents=True, exist_ok=True)
image.convert("RGB").save(args.output, quality=94, optimize=True)
print(f"Watermarked image saved to {args.output}")
