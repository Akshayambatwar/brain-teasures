import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bookstore");

    const coupon = await db.collection("coupons").findOne({
      code: code.toUpperCase(),
      active: true,
    });

    if (!coupon) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
    }

    // Check expiry
    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return NextResponse.json({ error: "Coupon has expired" }, { status: 400 });
    }

    // Check minimum order amount
    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return NextResponse.json({ 
        error: `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}` 
      }, { status: 400 });
    }

    let discount = 0;
    if (coupon.type === "percentage") {
      discount = Math.round((subtotal * coupon.value) / 100);
    } else if (coupon.type === "fixed") {
      discount = coupon.value;
    } else if (coupon.type === "shipping") {
      const settings = await db.collection("settings").findOne({ key: "store_config" });
      discount = settings?.shipping || 0;
    }

    // Cap discount at subtotal
    discount = Math.min(discount, subtotal);

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discount,
      type: coupon.type,
      value: coupon.value
    });

  } catch (error) {
    console.error("Validate coupon error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
