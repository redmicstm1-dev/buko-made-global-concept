"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import Brand from "@/components/Brand";
import { useCart } from "@/components/CartProvider";

export default function Header() {
  const [open, setOpen] = useState(false); 
  const { count } = useCart();
  
  const links = [
    { href: "/products", label: "Products" }, 
    { href: "/about", label: "About us" }, 
    { href: "/source-product", label: "Source a product" }, 
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="site-header">
      <div className="topline">
        <div className="container topline-inner">
          <span>Medical equipment &amp; hospital supplies</span>
          {/* Replaced raw middle dot literal "·" with valid entity code "&middot;" */}
          <span>Lagos, Nigeria &middot; <a href="mailto:chibukoakwuobu@gmail.com">chibukoakwu@gmail.com</a></span>
        </div>
      </div>
      
      <div className="container nav-row">
        <Brand />
        <nav className={open ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link className="mobile-quote" href="/quote" onClick={() => setOpen(false)}>Request a quote</Link>
        </nav>
        
        <div className="nav-actions">
          <Link href="/cart" className="cart-link" aria-label={`Shopping cart, \${count} items`}>
            <ShoppingBag size={20} />
            <span>Cart</span>
            <b>{count}</b>
          </Link>
          <Link href="/quote" className="button button-small">Request a quote</Link>
          <button 
            className="menu-toggle" 
            aria-label={open ? "Close menu" : "Open menu"} 
            aria-expanded={open} 
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
