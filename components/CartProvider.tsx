"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/types";

type CartContextValue = { 
  items: CartItem[]; 
  count: number; 
  add: (id: string) => void; 
  update: (id: string, quantity: number) => void; 
  remove: (id: string) => void 
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "buko-made-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]); 
  const [ready, setReady] = useState(false);

  // 1. Safely hydrate state directly inside the client mount frame to bypass SSR discrepancies
  useEffect(() => { 
    try { 
      const saved = localStorage.getItem(STORAGE_KEY); 
      if (saved) {
        setItems(JSON.parse(saved) as CartItem[]);
      }
    } catch { 
      localStorage.removeItem(STORAGE_KEY); 
    } 
    setReady(true); 
  }, []);

  // 2. Synchronize changes to storage blocks only after confirmation of hydration readiness
  useEffect(() => { 
    if (ready) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); 
    }
  }, [items, ready]);

  const add = useCallback((id: string) => 
    setItems(prev => { 
      const found = prev.find(i => i.productId === id); 
      return found 
        ? prev.map(i => i.productId === id ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i) 
        : [...prev, { productId: id, quantity: 1 }]; 
    }), 
    []
  );

  const update = useCallback((id: string, quantity: number) => 
    setItems(prev => 
      quantity < 1 
        ? prev.filter(i => i.productId !== id) 
        : prev.map(i => i.productId === id ? { ...i, quantity: Math.min(99, Math.max(1, Math.floor(quantity))) } : i)
    ), 
    []
  );

  const remove = useCallback((id: string) => 
    setItems(prev => prev.filter(i => i.productId !== id)), 
    []
  );

  const value = useMemo(() => ({ 
    items, 
    count: items.reduce((sum, item) => sum + item.quantity, 0), 
    add, 
    update, 
    remove 
  }), [items, add, update, remove]);

  // 3. Prevent rendering nested child layouts until state tracking matches client reality
  // This bypasses deep server hydration errors across layouts completely.
  if (!ready) {
    return null;
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { 
  const context = useContext(CartContext); 
  if (!context) {
    throw new Error("useCart must be used within CartProvider"); 
  }
  return context; 
}
