import BookClient from "./BookClient";
import clientPromise from "@/app/lib/mongodb";

async function getBook(slug) {
  const client = await clientPromise;
  const db = client.db("bookstore");

  return await db.collection("books").findOne({
    slug,
    active: true,
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ FIX

  const book = await getBook(slug);

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  return {
    title: `${book.title} - Buy Online in India`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: book.images,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params; // ✅ FIX

  const book = await getBook(slug);

  const serializedBook = JSON.parse(JSON.stringify(book));

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: book.title,
    image: book.images,
    description: book.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: book.price,
      availability: "https://schema.org/InStock",
      url: `https://brain-teasers.co.in/book/${book.slug}`,
    },
  };

  return (
    <>
      {/* ✅ JSON-LD Schema (Server Rendered) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <BookClient initialBook={serializedBook} />
    </>
  );
}