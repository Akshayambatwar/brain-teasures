import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("bookstore");

  const orders = await db
    .collection("orders")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(orders);
}