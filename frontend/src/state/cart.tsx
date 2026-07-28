/**
 * Cart state — React context persisted to localStorage, hydration-safe:
 * the first client render matches SSR (empty cart) and real contents load
 * in an effect, so static HTML never mismatches.
 */

import * as React from 'react';

export interface CartLine {
  productId: number;
  slug: string;
  title: string;
  price: number;
  qty: number;
  imageUrl?: string | null;
}

interface CartState {
  lines: CartLine[];
  hydrated: boolean;
  add: (line: Omit<CartLine, 'qty'>, qty?: number) => void;
  setQty: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const STORAGE_KEY = 'gramo-cart-v1';
const MAX_QTY = 24;

const CartContext = React.createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setLines(parsed.filter((l) => l && l.productId > 0 && l.qty > 0));
        }
      }
    } catch {
      // Ignore corrupted storage.
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage may be unavailable (private mode); the cart still works in memory.
    }
  }, [lines, hydrated]);

  const add = React.useCallback((line: Omit<CartLine, 'qty'>, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === line.productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === line.productId ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l
        );
      }
      return [...prev, { ...line, qty: Math.min(MAX_QTY, qty) }];
    });
  }, []);

  const setQty = React.useCallback((productId: number, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, qty: Math.min(MAX_QTY, qty) } : l))
    );
  }, []);

  const remove = React.useCallback((productId: number) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clear = React.useCallback(() => setLines([]), []);

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.price, 0);

  const value = React.useMemo(
    () => ({ lines, hydrated, add, setQty, remove, clear, count, subtotal }),
    [lines, hydrated, add, setQty, remove, clear, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
