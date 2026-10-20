"use client";

import { useMemo, useState, Suspense } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { products, categories } from "@/lib/catalogue";
import ProductCard from "@/components/ProductCard";

// 1. Separate the catalog content to isolate useSearchParams inside a Suspense loop
function CatalogueContent() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category") || "";
  
  // Set the initial category directly during rendering pass instead of useEffect
  const initialCategory = requested && categories.some(c => c.name === requested) 
    ? requested 
    : "All products";

  const [query, setQuery] = useState(""); 
  const [category, setCategory] = useState(initialCategory);

  const filtered = useMemo(() => 
    products.filter(p => 
      (category === "All products" || p.category === category) && 
      `${p.name} ${p.category} ${p.tags.join(" ")} ${p.shortDescription}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
    ), 
    [category, query]
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          {/* Fixed raw <a> tags to Next.js <Link> components */}
          <div className="breadcrumbs"><Link href="/">Home</Link> / Products</div>
          <span className="eyebrow">Product catalogue</span>
          <h1>Medical equipment & clinical supplies</h1>
          <p>Explore by category or search by product name. Product configurations, compatibility, availability and final pricing are confirmed during quotation.</p>
        </div>
      </section>

      <section className="section">
        <div className="container catalog-layout">
          <aside className="catalog-sidebar">
            <h2>
              <SlidersHorizontal size={17} style={{ verticalAlign: "middle", marginRight: 7 }} />
              Categories
            </h2>
            <div className="filter-list">
              <button 
                className={`filter-button ${category === "All products" ? "active" : ""}`} 
                onClick={() => setCategory("All products")}
              >
                All products <small>{products.length}</small>
              </button>
              {categories.map(c => (
                <button 
                  key={c.slug} 
                  className={`filter-button ${category === c.name ? "active" : ""}`} 
                  onClick={() => setCategory(c.name)}
                >
                  {c.name}
                  <small>{products.filter(p => p.category === c.name).length}</small>
                </button>
              ))}
            </div>
          </aside>

          <div>
            <div className="catalog-toolbar">
              <label className="search-box">
                <Search size={18} />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search equipment, category or keyword…" aria-label="Search products" />
              </label>
              <span className="results-count">Showing {filtered.length} of {products.length} products</span>
            </div>

            {filtered.length ? (
              <div className="catalog-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No matching products found</h3>
                <p>Try a broader search or select another category. You can also ask us to source a product not listed here.</p>
                {/* Fixed raw <a> tags to Next.js <Link> components */}
                <Link className="button" href="/source-product">Source a product</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// 2. The main default export page component wraps everything in a Suspense frame
export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="loading">Loading products catalogue...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
