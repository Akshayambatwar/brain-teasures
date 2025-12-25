import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Link href="/" className="block text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Brain Teasers Bookstore
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
            Expand your mind with our collection of thought-provoking books
          </p>
        </Link>
      </div>
    </header>
  );
}

