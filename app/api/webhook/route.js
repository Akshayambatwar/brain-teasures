import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import crypto from "crypto";
import { sendOrderConfirmation } from "@/app/lib/email";

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req) {
  try {
    const rawBody = await req.text();

    const webhookSignature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (webhookSignature !== expectedSignature) {
      console.error("Signature mismatch");
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "payment.captured") {
      const orderId = event.payload.payment.entity.order_id;
      const paymentId = event.payload.payment.entity.id;

      const client = await clientPromise;
      const db = client.db("bookstore");

      const existingOrder = await db.collection("orders").findOne({
        razorpayOrderId: orderId,
      });

      if (!existingOrder) {
        console.error("Order not found");
        return NextResponse.json({ success: false });
      }

      // If already paid, don't send email again
      if (existingOrder.status === "paid") {
        console.log("Order already paid, skipping email");
        return NextResponse.json({ success: true });
      }

      // Update order
      await db.collection("orders").updateOne(
        { razorpayOrderId: orderId },
        {
          $set: {
            status: "paid",
            razorpayPaymentId: paymentId,
            paidAt: new Date(),
          },
        }
      );

      console.log("Sending email to:", existingOrder.customer.email);

      await sendOrderConfirmation({
        ...existingOrder,
        razorpayPaymentId: paymentId,
        paidAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}