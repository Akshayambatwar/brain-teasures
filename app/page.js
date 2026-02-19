import Link from "next/link";
import { books } from "./data/books";
import Image from "next/image";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Book Cover Placeholder */}
              <div className="relative h-64 bg-zinc-100">
                <Image
                  src={book.landingImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>


              {/* Book Info */}
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-zinc-900  mb-2">
                  {book.title}
                </h2>
                <p className="text-zinc-600  mb-4 text-sm">
                  by {book.author}
                </p>
                <p className="text-zinc-700  mb-6 flex-grow">
                  {book.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-2xl font-bold text-zinc-900 ">
                      ₹{book.price}
                    </span>
                    <span className="ml-1 text-sm font-normal text-zinc-900 ">
                      {book.isShipping}
                    </span>
                  </div>

                  <Link
                    href={`/book/${book.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 text-center"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
