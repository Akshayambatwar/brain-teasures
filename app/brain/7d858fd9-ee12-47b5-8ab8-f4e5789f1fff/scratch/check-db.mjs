import { MongoClient } from "mongodb";

const uri = "mongodb+srv://bookstoreUser:Bookstore123@cluster0.zyu0hcy.mongodb.net/bookstore?retryWrites=true&w=majority";

async function checkDb() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("bookstore");
    
    const books = await db.collection("books").find({}).toArray();
    for (const book of books) {
        console.log(`BOOK: ${book.title}, PRICE: ${book.price}, SHIPPING: ${book.shipping}`);
    }
    process.exit(0);

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

checkDb();
