import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("bookstore");

  const settings = await db.collection("settings").findOne({
    key: "store_config",
  });

  return NextResponse.json(settings);
}