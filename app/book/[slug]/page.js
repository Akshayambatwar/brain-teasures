"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import BulkOrderModal from "@/app/components/BulkOrderModal";
import Loader from "@/app/components/Loader";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart, updateQuantity, MAX_ALLOWED } = useCart();

  const cartItem = cart.find(
    (item) => item._id === book?._id
  );
  console.log(params,"params")
  useEffect(() => {
    if (!params?.slug) return;

    fetch(`/api/books/${params.slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => {
        router.push("/");
      });
  }, [params?.slug, router]);

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
      <div className="min-h-screen bg-zinc-50">
        <Loader />
      </div>
    );
  }

  if (!book) return null;

  return (
    <>
      <div className="bg-zinc-50 py-6">
        <div className="max-w-5xl mx-auto px-4">

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-8 cursor-pointer text-zinc-600 hover:text-zinc-900 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Books
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] bg-white rounded-lg overflow-hidden shadow-md max-h-[520px]">
                <Image
                  src={book.images[currentImageIndex]}
                  alt={`${book.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  ‹
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                  ›
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {book.images.length}
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {book.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative w-24 h-32 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index
                        ? "border-red-600"
                        : "border-transparent hover:border-zinc-300"
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

            {/* Details Section */}
            <div className="space-y-6">

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
                  {book.title}
                </h1>

                <p className="text-xl text-zinc-600 mb-4">
                  by {book.author}
                </p>

                <div className="flex items-end mb-6">
                  <div className="text-2xl md:text-3xl font-bold text-zinc-900">
                    ₹{book.price}
                  </div>
                  <div className="ml-1 text-sm font-normal text-zinc-900">
                    + Shipping
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-zinc-700 leading-relaxed">
                  {book.fullDescription}
                </p>
              </div>

              {/* Cart Section */}
              <div className="pt-6 space-y-4">

                {!cartItem ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="space-y-4">

                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() =>
                          cartItem.quantity > 1 &&
                          updateQuantity(book._id, cartItem.quantity - 1)
                        }
                        className="w-10 h-10 rounded-full border"
                      >
                        −
                      </button>

                      <span>{cartItem.quantity}</span>

                      <button
                        onClick={() => {
                          if (totalQuantity >= MAX_ALLOWED) {
                            setShowBulkModal(true);
                            return;
                          }
                          updateQuantity(book._id, cartItem.quantity + 1);
                        }}
                        className="w-10 h-10 rounded-full border"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => router.push("/cart")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                    >
                      Go to Cart
                    </button>

                  </div>
                )}

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