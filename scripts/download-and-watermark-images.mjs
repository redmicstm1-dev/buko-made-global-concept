/**
 * Download free-to-use Pexels stock photographs, embed the Buko Made watermark,
 * and create one locally stored WebP image for each catalogue product.
 *
 * Run once from the project root with: npm run assets:download
 * Images are fetched from Pexels' public CDN; after this script runs, the website
 * references only local files under /public/images/products/.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import products from '../lib/products.json' with { type: 'json' };

const root = process.cwd();
const outputDir = path.join(root, 'public', 'images', 'products');
const sourceDir = path.join(root, 'public', 'images', 'source-stock');
const width = 1500;

// Pexels pages identify each free stock photograph and its photographer.
// The selected images are representative category photography, not proof of an
// exact manufacturer/model. Product detail pages therefore state this clearly.
const sources = {
  ecg: { id: 9408868, page: 'https://www.pexels.com/photo/professional-electrocardiogram-monitor-9408868/' },
  ecgPaper: { id: 35044386, page: 'https://www.pexels.com/photo/medical-instruments-on-electrocardiogram-printout-35044386/' },
  medicalPrinterPaper: { id: 7088539, page: 'https://www.pexels.com/photo/technology-computer-health-medical-7088539/' },
  vitalSigns: { id: 32417921, page: 'https://www.pexels.com/photo/blood-pressure-monitor-and-medical-equipment-close-up-32417921/' },
  bpMonitor: { id: 8088865, page: 'https://www.pexels.com/photo/digital-blood-pressure-monitor-and-pressure-cuff-on-white-fabric-8088865/' },
  ultrasound: { id: 7108390, page: 'https://www.pexels.com/photo/photo-of-an-ultrasound-machine-7108390/' },
  ultrasoundDetail: { id: 7089029, page: 'https://www.pexels.com/photo/technology-computer-health-hospital-7089029/' },
  monitorRoom: { id: 13697732, page: 'https://www.pexels.com/photo/equipment-at-hospital-13697732/' },
  hospitalBed: { id: 8410647, page: 'https://www.pexels.com/photo/hospital-beds-with-medical-equipment-8410647/' },
  hospitalRoom: { id: 4966406, page: 'https://www.pexels.com/photo/hospital-bed-near-the-glass-window-4966406/' },
  examRoom: { id: 8460220, page: 'https://www.pexels.com/photo/bed-in-a-clinic-8460220/' },
  operatingRoom: { id: 18112241, page: 'https://www.pexels.com/photo/modern-operating-room-18112241/' },
  surgicalEquipment: { id: 13697729, page: 'https://www.pexels.com/photo/hospital-equipment-with-monitors-13697729/' },
  labCentrifuge: { id: 6629397, page: 'https://www.pexels.com/photo/laboratory-centrifuge-in-hospital-6629397/' },
  labMicroscope: { id: 8325755, page: 'https://www.pexels.com/photo/a-microscope-and-laboratory-equipments-8325755/' },
  labBench: { id: 3735718, page: 'https://www.pexels.com/photo/laboratory-equipment-3735718/' },
  labGlassware: { id: 8392792, page: 'https://www.pexels.com/photo/laboratory-equipment-on-a-table-8392792/' },
  defibrillator: { id: 8460235, page: 'https://www.pexels.com/photo/defibrillator-in-hospital-8460235/' },
  consumables: { id: 8830475, page: 'https://www.pexels.com/photo/person-wearing-medical-gloves-holding-a-syringe-8830475/' },
  syringeSupplies: { id: 5664737, page: 'https://www.pexels.com/photo/syringe-on-latex-gloves-5664737/' },
  maternity: { id: 30582929, page: 'https://www.pexels.com/photo/modern-delivery-room-setup-with-medical-equipment-30582929/' },
};

function chooseSource(product) {
  const text = `${product.slug} ${product.name} ${product.category} ${(product.tags || []).join(' ')}`.toLowerCase();
  if (/upp-series|medical-video-printer/.test(text)) return sources.medicalPrinterPaper;
  if (/ecg-recording-paper|printing-paper/.test(text)) return sources.ecgPaper;
  if (/electrocardiograph|ecg-machine|ecg-monitor|electrocardiogram/.test(text)) return sources.ecg;
  if (/ultrasound/.test(text)) return sources.ultrasound;
  if (/blood-pressure/.test(text)) return sources.bpMonitor;
  if (/pulse-oximeter|patient-monitor|fetal-monitor|vital-sign|spirometer|glucose-monitor/.test(text)) return sources.monitorRoom;
  if (/centrifuge/.test(text)) return sources.labCentrifuge;
  if (/microscope/.test(text)) return sources.labMicroscope;
  if (/haematology|chemistry-analyser|incubator|water-bath|laboratory-refrigerator|biosafety-cabinet/.test(text)) return sources.labBench;
  if (/laboratory/.test(text)) return sources.labGlassware;
  if (/hospital-bed|bedside-cabinet|patient-transfer-trolley|wheelchair|examination-couch/.test(text)) return sources.hospitalBed;
  if (/infant|neonatal|fetal-doppler|cardiotocograph|maternity/.test(text)) return sources.maternity;
  if (/defibrillator/.test(text)) return sources.defibrillator;
  if (/syringe|glove|catheter|infusion-set|consumable/.test(text)) return sources.consumables;
  if (/operating-theatre|surgical|electrosurgical|autoclave|sterilisation|sterilization|instrument-trolley/.test(text)) return sources.operatingRoom;
  if (/oxygen|ventilator|suction|infusion-pump|syringe-pump|nebuliser|nebulizer/.test(text)) return sources.surgicalEquipment;
  if (/examination-light/.test(text)) return sources.examRoom;
  if (/thermometer/.test(text)) return sources.vitalSigns;
  return sources.hospitalRoom;
}

async function downloadSource(source) {
  const destination = path.join(sourceDir, `${source.id}.jpg`);
  try {
    await fs.access(destination);
    return destination;
  } catch {}

  const url = `https://images.pexels.com/photos/${source.id}/pexels-photo-${source.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
  console.log(`Downloading Pexels photo ${source.id}…`);
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Could not download Pexels image ${source.id} (${response.status}). Check internet access and retry.`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`Downloaded image ${source.id} looks too small to be a valid photograph.`);
  await fs.writeFile(destination, bytes);
  return destination;
}

function watermarkSvg() {
  return Buffer.from(`<svg width="360" height="66" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="358" height="64" rx="10" fill="#12304a" fill-opacity="0.78"/><text x="180" y="42" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" letter-spacing="1.1" fill="#ffffff">BUKO MADE</text></svg>`);
}

await fs.mkdir(sourceDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });
const downloaded = new Map();
const creditLines = new Set();

for (const product of products) {
  const source = chooseSource(product);
  let sourcePath = downloaded.get(source.id);
  if (!sourcePath) {
    sourcePath = await downloadSource(source);
    downloaded.set(source.id, sourcePath);
    creditLines.add(`- Photo ID ${source.id}: ${source.page} (Pexels free stock photo; used as representative category imagery).`);
  }

  const output = path.join(outputDir, `${product.slug}.webp`);
  const metadata = await sharp(sourcePath).metadata();
  const watermark = watermarkSvg();
  const left = Math.max(12, (metadata.width || width) - 380);
  const top = Math.max(12, (metadata.height || 1100) - 86);
  await sharp(sourcePath)
    .rotate()
    .resize({ width: 1500, height: 1250, fit: 'inside', withoutEnlargement: true })
    .composite([{ input: watermark, gravity: 'southeast', blend: 'over' }])
    .webp({ quality: 88, effort: 5 })
    .toFile(output);

  product.image = `/images/products/${product.slug}.webp`;
  product.imageAlt = `Representative medical equipment photograph for ${product.name}, branded with the Buko Made watermark. Exact model and configuration may differ; confirm details before ordering.`;
}

await fs.writeFile(path.join(root, 'lib', 'products.json'), `${JSON.stringify(products, null, 2)}\n`);

// Point the homepage feature images to the downloaded, watermarked local photos.
const homePath = path.join(root, 'app', 'page.tsx');
let home = await fs.readFile(homePath, 'utf8');
home = home.replace('/images/products/portable-ultrasound-system.svg', '/images/products/portable-ultrasound-system.webp');
home = home.replace('/images/products/electric-hospital-bed.svg', '/images/products/electric-hospital-bed.webp');
home = home.replace('Buko Made medical equipment illustration; run the local stock-photo downloader for the photographic asset', 'Representative ultrasound equipment photograph branded for Buko Made');
await fs.writeFile(homePath, home);

const notes = `# Product photography sources and watermarking\n\nThe catalogue images are downloaded from Pexels' free stock-photo collection and stored locally in public/images/products/. The script embeds the Buko Made watermark into each output WebP image. These are representative category photographs, not manufacturer-authorised images of a guaranteed exact model. Verify the model, configuration, and compatibility before accepting an order.\n\n${[...creditLines].sort().join('\n')}\n\nSource pages identify the photographers and the applicable Pexels licence. Review current licence terms before commercial publication.\n`;
await fs.writeFile(path.join(root, 'docs', 'IMAGE-SOURCES.md'), notes);
console.log(`\nDone. Created ${products.length} locally stored, watermarked product photos from ${downloaded.size} Pexels source images.`);
console.log('The site will use local WebP files after this command completes. Commit the generated images and updated lib/products.json to GitHub.');
