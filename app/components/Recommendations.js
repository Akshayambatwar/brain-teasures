"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Recommendations({ excludeIds = [] }) {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const excludeIdsString = JSON.stringify(excludeIds);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        const booksArray = Array.isArray(data) ? data : [];
        // Filter out the excluded books and take up to 2 items
        const other = booksArray
          .filter((b) => !excludeIds.includes(b._id))
          .slice(0, 2);
        setRecommendedBooks(other);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load recommendations", err);
        setLoading(false);
      });
  }, [excludeIdsString, excludeIds]);

  if (loading || recommendedBooks.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-zinc-200 w-full animate-fade-in">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-zinc-900">
        You May Also Like
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recommendedBooks.map((book) => (
          <Link
            href={`/book/${book.slug}`}
            key={book._id}
            className="flex gap-4 p-4 border border-zinc-100 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 group"
          >
            <div className="relative w-24 h-32 shrink-0 bg-zinc-100 rounded-lg overflow-hidden">
              <Image
                src={book.landingImage}
                alt={book.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center grow py-1">
              <h4 className="font-semibold text-zinc-900 text-[1.05rem] leading-snug mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                {book.title}
              </h4>
              <p className="text-sm text-zinc-500 mb-2 line-clamp-1">by {book.author}</p>
              <div className="mt-auto font-bold text-zinc-900">₹{book.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
