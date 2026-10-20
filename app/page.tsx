import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardList, PackageCheck, SearchCheck, ShieldCheck, Truck } from "lucide-react";
import { products, categories } from "@/lib/catalogue";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = products.filter(p => p.featured).slice(0, 12);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            {/* Fixed the literal long dash "—" to standard character notation */}
            <span className="hero-kicker"><span className="status-dot" /> Medical equipment sourcing &amp; supply</span>
            <h1>Equip your facility.<br /><em>Care with confidence.</em></h1>
            {/* Fixed standard em dash symbol */}
            <p>Explore hospital equipment, diagnostic systems, laboratory essentials and everyday clinical supplies&mdash;with clear product information and a straightforward quotation process.</p>
            <div className="hero-actions">
              <Link className="button" href="/products">Explore products <ArrowRight size={18} /></Link>
              <Link className="button button-light" href="/source-product">Find a specific product</Link>
            </div>
            <div className="hero-trust">
              <span><ShieldCheck size={17} /> Product details checked before quotation</span>
              <span><PackageCheck size={17} /> Sourcing on request</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <Image src="/images/products/portable-ultrasound-system.webp" alt="Representative ultrasound equipment photograph branded for Buko Made" fill priority sizes="(max-width: 900px) 90vw, 45vw" />
              <div className="hero-image-note">
                <span className="note-icon"><BadgeCheck size={19} /></span>
                {/* Fixed the literal long dash "—" to standard character notation */}
                <span><strong>Equipment for care settings</strong><small>Hospitals &middot; Clinics &middot; Laboratories</small></span>
              </div>
            </div>
            <div className="hero-float-card">
              <span className="float-number">50</span>
              <span>products to explore<br />and growing</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-strip-inner">
          <span><ShieldCheck /> Clear product information</span>
          <span><ClipboardList /> Quotation-led purchasing</span>
          <span><Truck /> Sourcing enquiries welcome</span>
          <span><SearchCheck /> Model compatibility checks</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Browse by need</span>
              <h2>Find the right equipment for your facility</h2>
              <p>Start with a category, then explore product details and request a quotation for the configuration you need.</p>
            </div>
            <Link className="text-link" href="/products">View the catalogue <ArrowRight size={17} /></Link>
          </div>
          <div className="category-grid">
            {categories.map((c, i) => (
              <Link key={c.slug} href={`/products?category=${encodeURIComponent(c.name)}`} className="category-card">
                <span className={`category-number category-number-${i + 1}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <span className="category-arrow"><ArrowRight size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Featured catalogue</span>
              <h2>Equipment worth exploring</h2>
              <p>A starting selection from our wider catalogue. Specifications, compatibility and availability are confirmed for the requested model.</p>
            </div>
            <Link className="button button-outline" href="/products">Browse all 50 products <ArrowRight size={17} /></Link>
          </div>
          <div className="product-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="center-action">
            <Link className="button" href="/products">Explore the full catalogue <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-section">
          <div className="split-visual">
            <Image src="/images/products/electric-hospital-bed.webp" alt="Buko Made medical equipment illustration; run the local stock-photo downloader for the photographic asset" fill sizes="(max-width: 900px) 90vw, 45vw" />
            <div className="visual-caption">
              <span>BUKO MADE</span>
              <strong>Medical equipment sourcing</strong>
            </div>
          </div>
          <div className="split-copy">
            <span className="eyebrow">Beyond the catalogue</span>
            <h2>Looking for a specific model or specialised item?</h2>
            {/* Fixed we'll to we&apos;ll */}
            <p>Not every requirement fits neatly into a standard catalogue. Tell us the product name, model, quantity and intended use, and we&apos;ll review the sourcing request with you.</p>
            <ul className="check-list">
              <li><BadgeCheck /> Share the model or reference number, if known.</li>
              <li><BadgeCheck /> Tell us the quantity and delivery location.</li>
              <li><BadgeCheck /> Include a brochure or specification if available.</li>
            </ul>
            <Link className="button" href="/source-product">Request a product search <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow eyebrow-light">Ready to discuss your requirements?</span>
            {/* Fixed we'll to we&apos;ll */}
            <h2>Build your equipment list.<br />We&apos;ll help you take the next step.</h2>
            {/* Fixed don't to don&apos;t */}
            <p>Add products to your cart or send a sourcing request for equipment you don&apos;t see listed.</p>
          </div>
          <div className="quote-band-actions">
            <Link className="button button-white" href="/cart">Review your cart</Link>
            <Link className="button button-ghost" href="/quote">Request a quotation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
