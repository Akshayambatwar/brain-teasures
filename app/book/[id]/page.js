"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { books, getBookById } from "../../data/books";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import BulkOrderModal from "@/app/components/BulkOrderModal";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQuantity, MAX_ALLOWED } = useCart();
  const cartItem = cart.find((item) => item.id === book?.id);
  useEffect(() => {
    const bookData = getBookById(params.id);
    if (bookData) {
      setBook(bookData);
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [params.id, router]);

  const nextImage = () => {
    if (book) {
      setCurrentImageIndex((prev) => (prev + 1) % book.images.length);
    }
  };

  const prevImage = () => {
    if (book) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + book.images.length) % book.images.length
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };
  const totalQuantity = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const handleAddToCart = () => {
    if (totalQuantity >= MAX_ALLOWED) {
      setShowBulkModal(true);
      return;
    }

    addToCart(book);
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-8 cursor-pointer text-zinc-600  hover:text-zinc-900  flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Books
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Carousel */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={book.images[currentImageIndex]}
                  alt={`${book.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {book.images.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {book.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative cursor-pointer flex-shrink-0 w-24 h-32 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index
                      ? "border-red-600 "
                      : "border-transparent hover:border-zinc-300 "
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-zinc-900  mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-zinc-600  mb-4">
                  by {book.author}
                </p>
                <div className="flex justify-start items-end mb-6">
                  <div className="text-4xl font-bold text-zinc-900  ">
                    ₹{book.price}
                  </div>
                  <div className="ml-1 text-sm font-normal text-zinc-900 ">
                    {book.isShipping}
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold text-zinc-900  mb-4">
                  Description
                </h2>
                <p className="text-zinc-700  leading-relaxed text-lg">
                  {book.fullDescription}
                </p>
              </div>

              <div className="pt-6 space-y-4">

                {!cartItem ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="space-y-4">

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center gap-4">

                      <button
                        onClick={() =>
                          cartItem.quantity > 1 &&
                          updateQuantity(book.id, cartItem.quantity - 1)
                        }
                        className="w-10 h-10 flex items-center justify-center rounded-full border text-xl hover:bg-zinc-100"
                      >
                        −
                      </button>

                      <span className="text-xl font-semibold">
                        {cartItem.quantity}
                      </span>

                      <button
                        onClick={() => {
                          if (totalQuantity >= MAX_ALLOWED) {
                            setShowBulkModal(true);
                            return;
                          }

                          updateQuantity(book.id, cartItem.quantity + 1);
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-full border text-xl hover:bg-zinc-100"
                      >
                        +
                      </button>

                    </div>

                    {/* Go To Cart Button */}
                    <button
                      onClick={() => router.push("/cart")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                      Go to Cart
                    </button>

                  </div>
                )}

              </div>


              {/* Additional Info */}
              <div className="pt-6 border-t border-zinc-200 ">
                <div className="space-y-3 text-zinc-600 ">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Delivery: 4–5 business days</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Secure Payment via Razorpay</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>PAN India shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BulkOrderModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
      />
    </>
  );
}

