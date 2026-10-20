"use client";

import { useState, Suspense } from "react"; 
import { useSearchParams } from "next/navigation"; 
import Link from "next/link"; 
import { site } from "@/lib/site";

// 1. Separate the form component so useSearchParams is safely isolated
function QuoteForm() {
  const params = useSearchParams(); 
  const product = params.get("product") || ""; 
  
  const [form, setForm] = useState({ 
    name: "", 
    organisation: "", 
    email: "", 
    phone: "", 
    product, 
    quantity: "1", 
    location: "", 
    contact: "WhatsApp", 
    notes: "" 
  }); 
  const [status, setStatus] = useState("");

  function submit(e: React.FormEvent) { 
    e.preventDefault(); 
    const body = [
      `Hello ${site.name}, I would like a quotation.`, 
      "", 
      `Name: ${form.name}`, 
      `Organisation: ${form.organisation || "Not provided"}`, 
      `Email: ${form.email}`, 
      `Phone: ${form.phone}`, 
      `Product(s): ${form.product}`, 
      `Quantity: ${form.quantity}`, 
      `Delivery location: ${form.location}`, 
      `Preferred contact: ${form.contact}`, 
      `Notes: ${form.notes || "None"}`
    ].join("\n"); 

    if (form.contact === "WhatsApp") { 
      window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer"); 
      setStatus("WhatsApp opened with your enquiry prepared. Please review and press Send."); 
    } else { 
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Quotation request — Buko Made Global Concept")}&body=${encodeURIComponent(body)}`; 
      setStatus("Your email application should open with the enquiry prepared. Review and send it to complete your request."); 
    } 
  }

  // Notice how the opening bracket is on the same line as return
  return (
    <form className="form-panel" onSubmit={submit}>
      <h2 className="panel-title">Equipment enquiry</h2>
      <p className="panel-intro">All fields marked * are required.</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="q-name">Full name *</label>
          <input id="q-name" required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="q-org">Hospital / organisation</label>
          <input id="q-org" autoComplete="organization" value={form.organisation} onChange={e => setForm({ ...form, organisation: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="q-email">Email address *</label>
          <input id="q-email" type="email" required autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="q-phone">Telephone *</label>
          <input id="q-phone" type="tel" required autoComplete="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="field field-full">
          <label htmlFor="q-product">Product(s) or equipment required *</label>
          <input id="q-product" required value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} placeholder="Product name, model or specification" />
        </div>
        <div className="field">
          <label htmlFor="q-quantity">Quantity / requirement *</label>
          <input id="q-quantity" required value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="q-location">Delivery location *</label>
          <input id="q-location" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="q-contact">Preferred contact *</label>
          <select id="q-contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })}>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor="q-notes">Additional details</label>
          <textarea id="q-notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Intended use, model requirements, accessories or timeline" />
        </div>
      </div>
      {status && <div className="form-status success" role="status">{status}</div>}
      <div className="form-actions">
        <button className="button" type="submit">Prepare quotation request →</button>
        <Link className="button button-outline" href="/products">Browse catalogue</Link>
      </div>
      <p className="form-note">This free form opens WhatsApp or your email application. It does not transmit the form in the background or verify delivery.</p>
    </form>
  );
}

// 2. Main Page default export wraps everything inside a Suspense boundary
export default function QuotePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Home</Link> / Request a quote</div>
          <h1>Request a quotation</h1>
          <p>Tell us what you need, and include a model or specification if you have one.</p>
        </div>
      </section>
      <section className="section">
        <div className="container form-wrap">
          <Suspense fallback={<div className="loading">Loading form configurations...</div>}>
            <QuoteForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
