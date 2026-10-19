import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import AddToCart from "@/components/AddToCart";
export default function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><Link href={`/products/${product.slug}`} className="product-image"><Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw" /><span className="image-badge">Buko Made</span></Link><div className="product-card-body"><span className="eyebrow">{product.category}</span><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p>{product.shortDescription}</p><div className="product-card-bottom"><span className="price-label">{product.priceType === "fixed" && product.price !== null ? `₦${product.price.toLocaleString("en-NG")}` : product.priceType === "indicative" && product.price !== null ? `Indicative ₦${product.price.toLocaleString("en-NG")}` : "Request a quote"}</span><Link className="text-link" href={`/products/${product.slug}`}>View details →</Link></div><AddToCart productId={product.id} compact /></div></article>;
}
