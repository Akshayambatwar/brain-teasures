import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";


export async function POST(req) {
  const body = await req.json();
  const { items, customer } = body;

  if (!items.length) {
    return NextResponse.json({ error: "Cart empty" }, { status: 400 });
  }

  const SHIPPING = 99;

  let subtotal = 0;
  items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  const total = subtotal + SHIPPING;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: total * 100,
    currency: "INR",
  });

  const client = await clientPromise;
  const db = client.db("bookstore");

  await db.collection("orders").insertOne({
    razorpayOrderId: order.id,
    status: "pending",
    items,
    customer,
    subtotal,
    shipping: SHIPPING,
    total,
    createdAt: new Date(),
  });

  return NextResponse.json(order);
}
