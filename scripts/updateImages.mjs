import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// Read .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const books = [
  {
    title: "Brain Teasers Volume 1",
    images: [
      "/books/Brain-Teasers-Volume-1-New-Img-1.png",
      "/books/Brain-Teasers-Volume-1-New-Img-2.jpg",
      "/books/Landing-Img-1.png",
    ],
    landingImage : "/books/Brain-Teasers-Volume-1-New-Img-1.png"
  },
  {
    title: "Brain Teasers for Juniors",
    images: [
      "/books/Brain-teasers-For-Juniors-1-New-Img-1.png",
      "/books/Brain-teasers-For-Juniors-1-New-Img-2.png",
      "/books/Landing-Img-2.png",
    ],
    landingImage : "/books/Brain-teasers-For-Juniors-1-New-Img-1.png"
  },
  {
    title: "The Write Direction",
    images: [
      "/books/The-Write-Direction-New-Img-1.png",
      "/books/The-Write-Direction-New-Img-2.png",
      "/books/The-Write-Direction-New-Img-3.png",
    ],
    landingImage : "/books/The-Write-Direction-New-Img-1.png"
  },
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("No MONGODB_URI found in environment");

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("bookstore");
    const collection = db.collection("books");

    const v = Date.now();

    for (const book of books) {
      const result = await collection.updateOne(
        { title: book.title },
        { 
          $set: { 
            images: book.images.map(img => img + '?v=' + v), 
            landingImage: book.landingImage + '?v=' + v 
          } 
        }
      );
      console.log(`Updated ${book.title}: matched ${result.matchedCount}, modified ${result.modifiedCount}`);
    }
    console.log("Success!");
  } finally {
    await client.close();
  }
}

run().catch(console.error);
