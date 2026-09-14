import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
  process.exit(1);
}

const newBooks = [
  {
    id: 4, // you might want to use a string id if that's how your db is structured, but keeping it consistent with the JS array
    title: "Brain Teasers: Visual Detective",
    slug: "brain-teasers-visual-detective",
    author: "Nilshree Yelulkar",
    description:
      "Visual discrimination activity book, observation puzzles for kids, brain teaser workbooks. Sharpen focus, attention, and critical thinking.",
    fullDescription:
      "<strong>Target Age:</strong> 4–9 Years | <strong>Format:</strong> A5 Size, Spiral Bound (Lies Flat)<br/><strong>Key Learning Benefits:</strong> Visual Discrimination, Focus & Attention, Critical Thinking, Logic & Reasoning<br/><strong>Product Description:</strong><br/>Looking for engaging observation puzzles for kids? Brain Teasers: Visual Detective turns screen time into skill-building time! Packed with find-the-clue challenges, pattern matching, and odd-one-out activities, this visual discrimination activity book sharpens focus, attention, and critical thinking. Designed in a compact A5 spiral-bound format, the pages lie completely flat so young learners can write, draw, and solve comfortably at home or on the go. Perfect for preschoolers, kindergartners, and early elementary students.",
    isNewRelease: true,
    price: 129,
    isShipping: "+ Shipping",
    images: ["/books/Brain_Teasers_Visual_Detective.png"],
    landingImage: "/books/Brain_Teasers_Visual_Detective.png",
    active: true,
    createdAt: new Date(),
  },
  {
    id: 5,
    title: "Brain Teasers: Smart Hearts",
    slug: "brain-teasers-smart-hearts",
    author: "Nilshree Yelulkar",
    description:
      "Social emotional learning activity book, SEL workbooks for kids, emotions and feelings activity book. Nurture kindness and emotional growth.",
    fullDescription:
      "<strong>Target Age:</strong> 4–9 Years | <strong>Format:</strong> A5 Size, Spiral Bound (Lies Flat)<br/><strong>Key Learning Benefits:</strong> Emotional Intelligence, Self-Awareness, Empathy, Social Skills<br/><strong>Product Description:</strong><br/>Nurture kindness and emotional growth with Brain Teasers: Smart Hearts, an essential <strong>social emotional learning (SEL) activity book</strong> for young children. Featuring fun, relatable worksheets, this workbook helps kids understand emotions, manage feelings, build strong relationships, and make thoughtful decisions. The durable <strong>A5 spiral binding</strong> provides a flat, hassle-free surface for writing, coloring, and self-reflection. An ideal learning tool for parents, educators, and counselors supporting early childhood emotional intelligence.",
    isNewRelease: true,
    price: 129,
    isShipping: "+ Shipping",
    images: ["/books/Brain_Teasers_Smart_Hearts.png"],
    landingImage: "/books/Brain_Teasers_Smart_Hearts.png",
    active: true,
    createdAt: new Date(),
  },
  {
    id: 6,
    title: "Brain Teasers: Color with a Twist",
    slug: "brain-teasers-color-with-a-twist",
    author: "Nilshree Yelulkar",
    description:
      "Spot the difference coloring book, educational coloring book for kids, fine motor skills workbook. Combine creative expression with critical thinking!",
    fullDescription:
      "<strong>Target Age:</strong> 4–9 Years | <strong>Format:</strong> A5 Size, Spiral Bound (Lies Flat)<br/><strong>Key Learning Benefits:</strong> Fine Motor Skills, Observation, Creative Expression, Visual Comparison<br/><strong>Product Description:</strong><br/>Combine creative expression with critical thinking! Brain Teasers: Color with a Twist is an educational spot-the-difference coloring book that goes beyond standard coloring pages. Children observe, compare, and discover hidden details while practicing fine motor control and visual analysis. Thanks to the lie-flat A5 spiral-bound spine, kids enjoy a smooth, lay-flat coloring experience without fighting stubborn book folds—making it the perfect travel activity book for children ages 4 to 9.",
    isNewRelease: true,
    price: 129,
    isShipping: "+ Shipping",
    images: ["/books/Brain_Teasers_Color_with_a_Twist.png"],
    landingImage: "/books/Brain_Teasers_Color_with_a_Twist.png",
    active: true,
    createdAt: new Date(),
  },
];

async function seedBooks() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("bookstore"); // Assuming db is bookstore based on api/books/route.js
    const booksCollection = db.collection("books");

    // Insert the books
    for (const book of newBooks) {
      // Check if it already exists by title
      const existing = await booksCollection.findOne({ title: book.title });
      if (!existing) {
        await booksCollection.insertOne(book);
        console.log(`Inserted book: ${book.title}`);
      } else {
        console.log(`Book already exists: ${book.title}, updating...`);
        await booksCollection.updateOne({ title: book.title }, { $set: book });
      }
    }

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding books:", error);
  } finally {
    await client.close();
  }
}

seedBooks();
