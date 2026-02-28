import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendShippedEmail } from "@/app/lib/email";

export async function POST(req) {
  try {
    const { orderId } = await req.json();

    const client = await clientPromise;
    const db = client.db("bookstore");

    const order = await db.collection("orders").findOne({
      _id: new ObjectId(orderId),
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status === "shipped") {
      return NextResponse.json(
        { error: "Already shipped" },
        { status: 400 }
      );
    }

    await db.collection("orders").updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: "shipped",
          shipped: true,
          shippedAt: new Date(),
        },
      }
    );

    await sendShippedEmail(order);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Ship error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}