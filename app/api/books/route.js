import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("bookstore");

    const books = await db
      .collection("books")
      .find({ active: true })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(books);
  } catch (error) {
    console.error("Books fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}