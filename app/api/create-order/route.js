import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, customer, couponCode } = body;

    if (!items.length) {
      return NextResponse.json({ error: "Cart empty" }, { status: 400 });
    }

    const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);
    if (totalQty > 5) {
      return NextResponse.json(
        { error: "Bulk order not allowed" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bookstore");

    const settings = await db.collection("settings").findOne({
      key: "store_config",
    });

    if (!settings) {
      throw new Error("Store config not found");
    }

    const SHIPPING = settings.shipping;
    let subtotal = 0;

    for (const item of items) {
      const product = await db.collection("books").findOne({
        _id: new ObjectId(item._id),
        active: true,
      });

      if (!product) {
        throw new Error("Invalid product");
      }

      subtotal += product.price * item.quantity;
    }

    // Handle Coupon
    let discount = 0;
    let appliedCoupon = null;
    if (couponCode) {
      const coupon = await db.collection("coupons").findOne({
        code: couponCode.toUpperCase(),
        active: true,
      });

      if (coupon) {
        const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
        const isBelowMin = coupon.minOrderAmount && subtotal < coupon.minOrderAmount;

        if (!isExpired && !isBelowMin) {
          if (coupon.type === "percentage") {
            discount = Math.round((subtotal * coupon.value) / 100);
          } else if (coupon.type === "fixed") {
            discount = coupon.value;
          } else if (coupon.type === "shipping") {
            discount = SHIPPING;
          }
          discount = Math.min(discount, subtotal + SHIPPING); // Ensure discount doesn't exceed total cost
          appliedCoupon = coupon.code;
        }
      }
    }

    const total = subtotal + SHIPPING - discount;

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
        coupon: appliedCoupon || "none",
      },
    });

    await db.collection("orders").insertOne({
      razorpayOrderId: order.id,
      status: "pending",
      items,
      customer,
      subtotal,
      shipping: SHIPPING,
      discount,
      couponCode: appliedCoupon,
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