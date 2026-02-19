"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const MAX_ALLOWED = 5;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const getTotalQuantity = (items) =>
    items.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (book) => {
    setCart((prev) => {
      const total = getTotalQuantity(prev);

      if (total >= MAX_ALLOWED) {
        return prev; // block
      }

      const existing = prev.find((item) => item.id === book.id);

      if (existing) {
        if (total >= MAX_ALLOWED) return prev;

        return prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      const totalWithoutCurrent = prev.reduce((acc, item) => {
        if (item.id !== id) return acc + item.quantity;
        return acc;
      }, 0);


      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        MAX_ALLOWED,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
