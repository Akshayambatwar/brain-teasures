import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Please add MONGODB_URI to .env.local");
  process.exit(1);
}

const coupons = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrderAmount: 200,
    active: true,
    expiryDate: new Date("2026-12-31"),
    description: "10% off on orders above ₹200"
  },
  {
    code: "FLAT50",
    type: "fixed",
    value: 50,
    minOrderAmount: 500,
    active: true,
    expiryDate: new Date("2026-12-31"),
    description: "Flat ₹50 off on orders above ₹500"
  },
  {
    code: "BRAIN20",
    type: "percentage",
    value: 20,
    minOrderAmount: 1000,
    active: true,
    expiryDate: new Date("2026-12-31"),
    description: "20% off on orders above ₹1000"
  },
  {
    code: "FREESHIP",
    type: "shipping",
    value: 0,
    minOrderAmount: 499,
    active: true,
    expiryDate: new Date("2026-12-31"),
    description: "Free shipping on orders above ₹499"
  }
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("bookstore");
    const collection = db.collection("coupons");

    // Clear existing coupons if any
    // await collection.deleteMany({}); 

    for (const coupon of coupons) {
      await collection.updateOne(
        { code: coupon.code },
        { $set: coupon },
        { upsert: true }
      );
      console.log(`Seeded coupon: ${coupon.code}`);
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await client.close();
  }
}

seed();
