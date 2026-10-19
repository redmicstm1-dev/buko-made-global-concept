import productsJson from "@/lib/products.json";
import categoriesJson from "@/lib/categories.json";
import type { Product } from "@/lib/types";
export const products = productsJson as Product[];
export const categories = categoriesJson;
export function getProductBySlug(slug: string): Product | undefined { return products.find((p) => p.slug === slug); }
