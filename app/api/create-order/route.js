import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { books } from "@/app/data/books";

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, customer } = body;

    if (!items.length) {
      return NextResponse.json({ error: "Cart empty" }, { status: 400 });
    }

    const SHIPPING = 99;
    const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);

    if (totalQty > 5) {
      return NextResponse.json(
        { error: "Bulk order not allowed" },
        { status: 400 }
      );
    }

    // 🔒 Calculate price securely from server data
    let subtotal = 0;

    items.forEach((item) => {
      const product = books.find((b) => b.id === item.id);

      if (!product) {
        throw new Error("Invalid product");
      }

      subtotal += product.price * item.quantity;
    });

    const total = subtotal + SHIPPING;

    const client = await clientPromise;
    const db = client.db("bookstore");

    // 🔁 Prevent duplicate pending orders
    const existing = await db.collection("orders").findOne({
      "customer.email": customer.email,
      status: "pending",
    });

    if (existing) {
      return NextResponse.json({ id: existing.razorpayOrderId });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        email: customer.email,
        name: customer.name,
      },
    });

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

  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}