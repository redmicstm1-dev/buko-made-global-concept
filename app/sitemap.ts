import type { MetadataRoute } from "next";
import { products } from "@/lib/catalogue";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap { 
  // Fixed "/faq" to "/faqs" to match the actual folder structure /app/faqs/page.tsx
  const routes = ["", "/products", "/about", "/contact", "/quote", "/source-product", "/faqs", "/privacy"]; 
  
  return [
    ...routes.map(route => ({ 
      url: `${BASE_URL}${route}`, 
      lastModified: new Date(), 
      changeFrequency: "weekly" as const, 
      priority: route === "" ? 1 : 0.7 
    })), 
    ...products.map(p => ({ 
      url: `${BASE_URL}/products/${p.slug}`, 
      lastModified: new Date(), 
      changeFrequency: "monthly" as const, 
      priority: 0.6 
    }))
  ]; 
}
