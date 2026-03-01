import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop();

    console.log("Incoming slug:", slug);

    const client = await clientPromise;
    const db = client.db("bookstore");

    const book = await db.collection("books").findOne({
      slug: slug,
      active: true,
    });

    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("Single book fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}