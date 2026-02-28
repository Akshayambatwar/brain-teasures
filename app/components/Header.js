"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function Header() {
  const { cart } = useCart();
  const [animate, setAnimate] = useState(false);
  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);

      const timer = setTimeout(() => {
        setAnimate(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [totalItems]);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/books/logo.png"
            alt="Brain Teasers Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />

          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold text-zinc-900">
              Brain Teasers
            </h1>
            <p className="text-xs md:text-sm text-zinc-500">
              Thought-provoking books
            </p>
          </div>
        </Link>

        {/* Cart Section */}
        <Link
          href="/cart"
          className="relative flex items-center gap-2 hover:opacity-80 transition"
        >
          <ShoppingCart className="w-6 h-6 text-zinc-800" />

          {totalItems > 0 && (
            <span
              className={`
      absolute -top-2 -right-2 
      bg-red-600 text-white text-xs font-bold 
      px-2 py-0.5 rounded-full 
      transition-transform duration-300
      ${animate ? "scale-125" : "scale-100"}
    `}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
