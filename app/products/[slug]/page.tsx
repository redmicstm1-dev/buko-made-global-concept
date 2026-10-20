import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { products, getProductBySlug } from "@/lib/catalogue";
import { site } from "@/lib/site";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";

export function generateStaticParams() { 
  return products.map(p => ({ slug: p.slug })); 
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { 
  const { slug } = await params; 
  const p = getProductBySlug(slug); 
  return p ? { title: p.name, description: p.shortDescription } : {}; 
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const product = getProductBySlug(slug); 
  if (!product) notFound();

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const waText = `Hello Buko Made Global Concept, I would like a quotation for:\nProduct: ${product.name}\nReference: ${product.id}\nPlease confirm model options, compatibility, availability and price.`;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / {product.category}
          </div>
          <Link href="/products" className="text-link">
            <ArrowLeft size={16} /> Back to catalogue
          </Link>
        </div>
      </section>

      <section className="product-detail">
        <div className="container detail-grid">
          <ProductGallery 
            image={product.image} 
            imageAlt={product.imageAlt} 
            images={product.images} 
            productName={product.name} 
          />
          <div className="detail-copy">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="lead">{product.description}</p>
            <div className="detail-price">
              {product.priceType === "fixed" && product.price !== null 
                ? `₦${product.price.toLocaleString("en-NG")}` 
                : product.priceType === "indicative" && product.price !== null 
                  ? `Indicative price: ₦${product.price.toLocaleString("en-NG")}` 
                  : "Price available on request"}
            </div>
            <p className="notice-box">
              {product.compatibilityNote} Product availability and final quotation are confirmed by Buko Made before an order is accepted.
            </p>
            <div className="detail-actions">
              <AddToCart productId={product.id} />
              <Link className="button button-outline" href={`/quote?product=${encodeURIComponent(product.name)}`}>
                Request a quote
              </Link>
              <a 
                className="button button-outline" 
                target="_blank" 
                rel="noreferrer" 
                href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(waText)}`}
              >
                <MessageCircle size={17} /> Ask on WhatsApp
              </a>
            </div>
            <div className="detail-section">
              <h2>Product overview</h2>
              <p className="lead">{product.description}</p>
            </div>
            <div className="detail-section">
              <h2>What to confirm before ordering</h2>
              <ul>
                {product.features.map((f: string) => (
                  <li key={f}>
                    <CheckCircle2 size={15} style={{ display: "inline", color: "#0d9488", marginRight: 7 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="detail-section">
              <h2>Specifications & ordering notes</h2>
              <table className="spec-table">
                <tbody>
                  {product.specifications.map((s: { label: string; value: string }) => (
                    <tr key={s.label}>
                      <th>{s.label}</th>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Fixed manufacturer's to manufacturer&apos;s */}
            <p className="site-notice">
              Product information is a purchasing guide, not a substitute for the manufacturer&apos;s official documentation. Confirm the precise model, regulatory documentation, installation needs, consumables and service arrangements before purchase.
            </p>
          </div>
        </div>
        <div className="container">
          {related.length > 0 && (
            <>
              <h2 className="related-heading">Related products</h2>
              <div className="product-grid">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
