# Buko Made Global Concept

A new, independent Next.js project for a quotation-led medical equipment catalogue, designed around free-tier tools and repository-based product data.

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS 4 with responsive custom CSS
- Lucide React icons
- Static JSON catalogue and locally stored, watermarked WebP product photography
- Vercel Hobby deployment target

## Business details

- Business: Buko Made Global Concept
- Email: chibukoakwuobu@gmail.com
- Phone / WhatsApp: +234 814 021 2430
- Address: No. 5 Alagbeji Street, Off Isala Eko, Idumota, Lagos State, Nigeria

## Run locally on Windows

1. Install Node.js LTS and Git.
2. Extract the ZIP and open the `buko-made-global-concept` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm install`.
5. Run `npm run assets:download` to download and locally watermark the real stock photographs.
6. Run `npm run dev`.
7. Open the local URL shown by Next.js, usually `http://localhost:3000`.

## Product photography: download and watermark locally

The project includes a downloader for real free stock photographs selected from Pexels. From the project root, run `npm install` and then `npm run assets:download` before launching the site. This downloads selected source photographs from Pexels, creates 50 locally stored WebP product image files, permanently embeds a small Buko Made watermark, and updates `lib/products.json` and the homepage to point to the local image files. Internet access is needed for this one-time download; the deployed website does not load product images from Pexels. The original local SVG illustrations remain as a working fallback if the download has not yet been run.

The photographs are representative category imagery, not a guarantee that the exact manufacturer/model shown is the product available for supply. Confirm product model, configuration and compatibility before accepting an order. Source links and photographer/stock-image references are recorded in `docs/IMAGE-SOURCES.md` after the download script runs. Pexels pages identify the photographer and licence; review the current terms before commercial publication.

## Product catalogue

The 50 initial product entries are in `lib/products.json`. Descriptions are purchasing guides; exact model specifications, compatibility, certifications, availability, pricing and service terms must be confirmed before publication. The catalogue is quotation-led and does not claim all items are in stock. Sony UPP-series items are listed as medical printing paper, not as a printer. UPP-110S is a paper type; confirm the exact printer model and compatible media before ordering.

## Local catalogue editor (no paid service)

Open `tools/admin.html` in a desktop browser. Import `lib/products.json`, add/edit/remove records and export an updated JSON file. Copy the exported file back over `lib/products.json`, place any new image in `public/images/products/`, confirm the `image` path, run the site locally, then commit and push the changes to GitHub.

This tool is intentionally local-only. With no database or paid backend, a public deployed dashboard cannot securely and persistently update the repository. This workflow lets you manage products without manually writing TypeScript, while keeping every image in the repository. Every exported catalogue change still needs to be committed and redeployed.

## Cart and checkout limitations

- The cart persists in the visitor's browser local storage.
- WhatsApp checkout creates a prefilled message; the customer must press Send.
- Email checkout uses `mailto:` and depends on a configured email application. The site cannot verify sending or delivery.
- No payment processing, customer accounts, database or background email sender is configured in this free version.

## Before launch

- Replace `https://example.com` in metadata and sitemap settings with the final domain by setting `NEXT_PUBLIC_SITE_URL` in Vercel and locally.
- Run `npm run assets:download` and review the resulting locally stored, watermarked photos before launch.
- Review all product entries and confirm technical details, compatibility, pricing and availability with Buko Made or its suppliers.
- Add prices only after they are approved; otherwise retain Request a Quote.
- Review privacy, sales, sourcing, warranty, delivery and returns terms against actual business practice.
- Test forms and WhatsApp/email flows on mobile and desktop.
- Run `npm run build` before deployment.

## Deploy to Vercel Hobby

1. Create a new GitHub repository named `buko-made-global-concept`.
2. Commit and push this folder to its `main` branch.
3. Import that new repository in Vercel.
4. Deploy using the Hobby tier; no Pro subscription is assumed.
5. Set `NEXT_PUBLIC_SITE_URL` to the final website URL and redeploy.

## Product detail image gallery

Product detail pages include an accessible, responsive image-gallery component. It displays the primary image and automatically shows clickable thumbnails when a product has multiple image paths. Existing products remain compatible and continue to use their current `image` field until additional, verified product views are added.

To add two or three locally stored views for a product, place the watermarked files under `public/images/products/` and add an `images` array to that product's record in `lib/products.json`. For example:

```json
"image": "/images/products/example-product/main.webp",
"imageAlt": "Example medical equipment, front view",
"images": [
  "/images/products/example-product/main.webp",
  "/images/products/example-product/controls.webp",
  "/images/products/example-product/side-view.webp"
]
```

The gallery uses the main `image` first, de-duplicates repeated paths, and displays up to three unique images. Every referenced file must exist in `public/`; Next.js serves it from the corresponding root path. Only use alternate images that genuinely represent the product/model, and apply the Buko Made watermark to each file before publishing.
