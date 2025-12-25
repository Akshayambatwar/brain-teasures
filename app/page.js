import Link from "next/link";
import { books } from "./data/books";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Book Cover Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <svg
                    className="w-24 h-24 mx-auto mb-2 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <p className="text-sm font-semibold">{book.title}</p>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  {book.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm">
                  by {book.author}
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 mb-6 flex-grow">
                  {book.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    ${book.price}
                  </span>
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
