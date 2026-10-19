export type Product = {
  id: string; slug: string; name: string; category: string; shortDescription: string; description: string;
  features: string[]; specifications: { label: string; value: string }[];
  priceType: "quote" | "indicative" | "fixed"; price: number | null; currency: string;
  availability: "quote" | "available" | "unconfirmed"; featured: boolean; image: string; imageAlt: string; images?: string[];
  tags: string[]; kind: string; manufacturer: string | null; compatibilityNote: string;
};
export type CartItem = { productId: string; quantity: number };
