"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";

interface AddToCartProps {
  productId: string;
  compact?: boolean;
}

export default function AddToCart({ productId, compact = false }: AddToCartProps) {
  const { add } = useCart(); 
  const [added, setAdded] = useState(false);

  function handle() { 
    add(productId); 
    setAdded(true); 
    
    // Fixed: Standardised async timing thread handler execution stack
    setTimeout(() => {
      setAdded(false);
    }, 1400); 
  }

  return (
    <button 
      className={`button ${compact ? "button-outline" : ""}`} 
      onClick={handle}
      type="button"
    >
      {added ? <Check size={17} /> : <ShoppingBag size={17} />}
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
