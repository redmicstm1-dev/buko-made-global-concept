"use client";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
export default function AddToCart({ productId, compact = false }: { productId: string; compact?: boolean }) {
  const { add } = useCart(); const [added, setAdded] = useState(false);
  function handle() { add(productId); setAdded(true); window.setTimeout(() => setAdded(false), 1400); }
  return <button className={`button ${compact ? "button-outline" : ""}`} onClick={handle}>{added ? <Check size={17} /> : <ShoppingBag size={17} />}{added ? "Added to cart" : "Add to cart"}</button>;
}
