import clientPromise from "@/app/lib/mongodb";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    // 🔹 Basic validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid payment data" },
        { status: 400 }
      );
    }

    // 🔹 Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Signature verification failed" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bookstore");

    const existingOrder = await db.collection("orders").findOne({
      razorpayOrderId: razorpay_order_id,
    });

    // 🔹 Order not found
    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // 🔹 Prevent double payment update
    if (existingOrder.status === "paid") {
      return NextResponse.json({
        success: true,
        message: "Order already marked as paid",
      });
    }

    // 🔹 Update order
    await db.collection("orders").updateOne(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          status: "paid",
          razorpayPaymentId: razorpay_payment_id,
          paidAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
