import clientPromise from "@/app/lib/mongodb";
import crypto from "crypto";
import { NextResponse } from "next/server";


export async function POST(req) {
  const body = await req.json();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSign !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("bookstore");

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
}
