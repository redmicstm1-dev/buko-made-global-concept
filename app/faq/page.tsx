import Link from "next/link";

const faqs = [
  ["Can I request a product that is not listed?", "Yes. Use the Source a Product form and share the equipment name, manufacturer or model if known, quantity, delivery location and any available specifications."],
  ["Are all listed products in stock?", "The catalogue is a guide to products Buko Made can discuss or source. Availability is not guaranteed by a listing and must be confirmed for the requested configuration."],
  ["How do I get a price?", "Select Request a Quote on a product page or add several products to your cart and send the list by WhatsApp or email. Indicative prices remain estimates until Buko Made confirms the quotation."],
  ["Can I order several products together?", "Yes. Add multiple products to your cart, adjust quantities and choose WhatsApp or email checkout to prepare a combined enquiry."],
  ["Can you confirm accessory compatibility?", "Provide the equipment manufacturer, exact model and accessory reference. Compatibility must be checked against relevant documentation before it is confirmed."],
  ["How do I send a cart by WhatsApp?", "WhatsApp opens with a prepared product list and quantities. Review the message and press Send; opening WhatsApp alone does not deliver the enquiry."],
  // Fixed plain text contraction to use character entity below
  ["Does email checkout send an email automatically?", "No. The free first release prepares a message using your device&apos;s email application. You must review and send it. The website cannot confirm delivery."],
  ["Can I ask for product documentation?", "Yes. Mention the specific model and documents you need. Availability and applicability of manufacturer documentation must be confirmed."],
  ["What about delivery, installation and warranty?", "These depend on the product, supplier and final quotation. Ask for written confirmation of delivery, installation, warranty, training, service support and terms before ordering."],
  // Fixed plain text contractions to use character entities below
  ["Are the product descriptions a substitute for manufacturer instructions?", "No. Descriptions are general purchasing guides. Use the selected manufacturer&apos;s official documentation and appropriate professional guidance for specifications, installation, operation and maintenance."]
];

export default function FAQPage() { 
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Home</Link> / FAQs</div>
          <h1>Frequently asked questions</h1>
          <p>Practical answers about browsing products, requesting quotations and sourcing medical equipment.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                {/* Handled unescaped strings safely inside JSX strings wrapper formatting mapping loops */}
                <p>{a.replace(/'/g, "’")}</p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <Link className="button" href="/contact">Ask us a question</Link>
          </div>
        </div>
      </section>
    </>
  ); 
}
