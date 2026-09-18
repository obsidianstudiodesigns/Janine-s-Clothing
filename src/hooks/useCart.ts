import { useState, useEffect, useMemo, useCallback } from 'react';
import { CartLine, ClothingItem } from '../types';
import { CLOTHING_ITEMS } from '../data/clothingData';

const STORAGE_KEY = 'janines_cart';

/** Persisted shape — only ids + quantities, so price/stock edits always win on reload. */
interface StoredLine {
  id: string;
  quantity: number;
}

function readStoredCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const stored: StoredLine[] = JSON.parse(raw);
    return stored
      .map(({ id, quantity }) => {
        const item = CLOTHING_ITEMS.find((i) => i.id === id);
        return item ? { item, quantity: Math.max(1, quantity) } : null;
      })
      .filter((line): line is CartLine => line !== null);
  } catch {
    return [];
  }
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(readStoredCart);

  useEffect(() => {
    try {
      const stored: StoredLine[] = lines.map((l) => ({ id: l.item.id, quantity: l.quantity }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // storage unavailable (private mode) — cart stays in memory only
    }
  }, [lines]);

  const addItem = useCallback((item: ClothingItem, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { item, quantity }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.item.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      quantity < 1
        ? prev.filter((l) => l.item.id !== id)
        : prev.map((l) => (l.item.id === id ? { ...l, quantity } : l))
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.item.priceZAR * l.quantity, 0),
    [lines]
  );

  const isInCart = useCallback(
    (id: string) => lines.some((l) => l.item.id === id),
    [lines]
  );

  return { lines, addItem, removeItem, setQuantity, clearCart, itemCount, subtotal, isInCart };
}
