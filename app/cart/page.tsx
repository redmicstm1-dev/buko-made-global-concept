"use client";

import Image from "next/image"; 
import Link from "next/link"; 
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider"; 
import { products } from "@/lib/catalogue"; 
import { site } from "@/lib/site";

export default function CartPage() {
  const { items, update, remove } = useCart(); 
  const detailed = items.map(i => ({ ...i, product: products.find(p => p.id === i.productId) })).filter(i => i.product);
  
  const message = [
    `Hello ${site.name}, I would like a quotation for the following cart:`, 
    ...detailed.map(i => `• ${i.product!.name} — Qty: ${i.quantity} (price to be confirmed)`), 
    "", 
    "Please confirm availability, model specifications, delivery and final pricing."
  ].join("\n"); 
  
  const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Home</Link> / Cart</div>
          <h1>Your equipment cart</h1>
          <p>Review your list, adjust quantities, then send your request to Buko Made by WhatsApp or email.</p>
        </div>
      </section>

      <section className="section">
        <div className="container cart-layout">
          <div className="cart-panel">
            <h2 className="panel-title">Selected products ({detailed.reduce((s, i) => s + i.quantity, 0)})</h2>
            <p className="panel-intro">Prices are confirmed in your quotation unless a product has an approved published price.</p>
            
            {detailed.length ? detailed.map(({ product, quantity }) => (
              <div className="cart-item" key={product!.id}>
                <Link className="cart-item-image" href={`/products/${product!.slug}`}>
                  <Image src={product!.image} alt={product!.imageAlt} fill sizes="94px" />
                </Link>
                <div>
                  <h3><Link href={`/products/${product!.slug}`}>{product!.name}</Link></h3>
                  <p>{product!.category}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button aria-label={`Decrease ${product!.name} quantity`} onClick={() => update(product!.id, quantity - 1)}>
                        <Minus size={13} />
                      </button>
                      <input aria-label={`${product!.name} quantity`} type="number" min="1" max="99" value={quantity} onChange={e => update(product!.id, Number(e.target.value))} />
                      <button aria-label={`Increase ${product!.name} quantity`} onClick={() => update(product!.id, quantity + 1)}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <button className="remove-button" onClick={() => remove(product!.id)}>
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
                <strong className="request-price">Request price</strong>
              </div>
            )) : (
              <div className="cart-empty">
                <ShoppingBag size={40} />
                <h3>Your cart is ready for its first product</h3>
                <p>Browse the catalogue and add the equipment you want to enquire about.</p>
                <Link className="button" href="/products">Browse products</Link>
              </div>
            )}
          </div>

          <aside className="summary-panel">
            <h2 className="panel-title">Quotation request</h2>
            <p className="panel-intro">This checkout sends an enquiry, not an automatic paid order.</p>
            <div className="summary-line"><span>Unique products</span><strong>{detailed.length}</strong></div>
            <div className="summary-line"><span>Total quantity</span><strong>{detailed.reduce((s, i) => s + i.quantity, 0)}</strong></div>
            <div className="summary-line"><span>Pricing</span><strong>Confirmed by quotation</strong></div>
            
            {detailed.length > 0 && (
              <>
                <a className="button" href={wa} target="_blank" rel="noreferrer">Send cart to WhatsApp</a>
                <Link className="button button-outline" href="/checkout">Checkout by email</Link>
              </>
            )}
            
            {/* Escaped device's contraction to device&apos;s */}
            <p className="form-note">WhatsApp opens a prepared message. You must press Send in WhatsApp. This free checkout uses your device&apos;s configured email application with the cart summary prepared.</p>
            {/* Escaped Can't contraction to Can&apos;t */}
            <Link href="/source-product" className="text-link">Can&apos;t find a product? Source it →</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
