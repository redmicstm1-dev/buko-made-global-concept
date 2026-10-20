import Link from "next/link";
import Brand from "@/components/Brand";
import { site } from "@/lib/site";

export default function Footer() { 
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          {/* Fixed the raw em-dash literal "—" into safe character entity "&mdash;" */}
          <p className="footer-about">
            Medical equipment, hospital supplies and clinical essentials&mdash;supported by a clear quotation process and product sourcing on request.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/products">Product catalogue</Link>
          <Link href="/source-product">Source a product</Link>
          <Link href="/quote">Request a quote</Link>
          <Link href="/about">About Buko Made</Link>
          {/* Fixed broken route path link "/faq" into plural "/faqs" */}
          <Link href="/faqs">FAQs</Link>
        </div>
        <div>
          <h3>Get in touch</h3>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noreferrer">
            WhatsApp: {site.phoneDisplay}
          </a>
          <p>{site.address}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Buko Made Global Concept.</span>
        <span>Product specifications and availability are confirmed during quotation.</span>
        <Link href="/privacy">Privacy notice</Link>
      </div>
    </footer>
  ); 
}
