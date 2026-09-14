import clientPromise from "@/app/lib/mongodb";

export default async function sitemap() {
  const baseUrl = "https://brain-teasers.co.in";

  // Get books from DB
  const client = await clientPromise;
  const db = client.db("bookstore");
  const books = await db.collection("books").find({ active: true }).toArray();

  const bookEntries = books.map((book) => ({
    url: `${baseUrl}/book/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticEntries = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticEntries, ...bookEntries];
}