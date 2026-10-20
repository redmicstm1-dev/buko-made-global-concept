import Link from "next/link";

export default function NotFound() { 
  return (
    <section className="section">
      <div className="container empty-state">
        <span className="eyebrow">Page not found</span>
        {/* Fixed couldn't contraction to couldn&apos;t */}
        <h1>We couldn&apos;t find that page</h1>
        <p>The link may have changed. Explore the catalogue or return to the homepage.</p>
        <Link className="button" href="/products">Browse products</Link>
      </div>
    </section>
  ); 
}
