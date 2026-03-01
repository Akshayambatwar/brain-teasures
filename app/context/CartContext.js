"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const MAX_ALLOWED = 5;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getTotalQuantity = (items) =>
    items.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (book) => {
    setCart((prev) => {
      const total = getTotalQuantity(prev);
      if (total >= MAX_ALLOWED) return prev;

      const existing = prev.find(
        (item) => item._id === book._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...book,
          _id: book._id,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (_id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (_id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== _id)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        MAX_ALLOWED,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);