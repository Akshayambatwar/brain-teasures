import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendShippedEmail } from "@/app/lib/email";

export async function POST(req) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bookstore");

    // 🔐 Only update if not already shipped
    const updatedOrder = await db.collection("orders").findOneAndUpdate(
      {
        _id: new ObjectId(orderId),
        shipped: { $ne: true },
      },
      {
        $set: {
          shipped: true,
          status: "shipped",
          shippedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!updatedOrder.value) {
      return NextResponse.json(
        { error: "Order not found or already shipped" },
        { status: 400 }
      );
    }

    // 🚚 Send shipped email
    await sendShippedEmail(updatedOrder.value);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Ship order error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}