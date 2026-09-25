"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState, ReactNode } from "react";
import { CartItem } from "@/lib/types";

type CartState = CartItem[];

type Action =
  | { type: "ADD"; item: CartItem }
  | { type: "SET_QTY"; key: string; qty: number }
  | { type: "REMOVE"; key: string }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.key === action.item.key);
      if (existing) {
        return state.map((i) =>
          i.key === action.item.key ? { ...i, qty: Math.min(i.qty + action.item.qty, 99) } : i
        );
      }
      return [...state, action.item];
    }
    case "SET_QTY":
      return state
        .map((i) => (i.key === action.key ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case "REMOVE":
      return state.filter((i) => i.key !== action.key);
    case "CLEAR":
      return [];
    case "HYDRATE":
      return action.items;
  }
}

type CartValue = {
  items: CartState;
  subtotal: number;
  count: number;
  hydrated: boolean;
  dispatch: React.Dispatch<Action>;
};

const CartContext = createContext<CartValue | null>(null);

const STORAGE_KEY = "fmc_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const value = useMemo<CartValue>(() => {
    const subtotal = state.reduce((s, i) => s + i.unitPrice * i.qty, 0);
    const count = state.reduce((s, i) => s + i.qty, 0);
    return { items: state, subtotal, count, hydrated, dispatch };
  }, [state, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
