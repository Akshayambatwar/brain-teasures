"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Lottie from "lottie-react";
import successAnim from "@/public/Success.json";
import failureAnim from "@/public/Failed.json";
import BulkOrderModal from "../components/BulkOrderModal";
export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, MAX_ALLOWED, clearCart } = useCart();
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const SHIPPING = 99;

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const total = subtotal + (cart.length ? SHIPPING : 0);

    if (!cart.length && paymentStatus !== "success") {
        return (
            <div className="min-h-[300px] flex flex-col items-center justify-center px-4 text-center">
                <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
                <p className="text-zinc-500">Start adding books to continue</p>
            </div>
        );
    }

    const validateForm = () => {
        const newErrors = {};

        if (!customer.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!customer.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!customer.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(customer.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }

        if (!customer.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!customer.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!customer.state.trim()) {
            newErrors.state = "State is required";
        }

        if (!customer.pincode.trim()) {
            newErrors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(customer.pincode)) {
            newErrors.pincode = "Enter valid 6-digit pincode";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handlePayment = async () => {
        const isValid = validateForm();

        if (!isValid) {
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cart, customer }),
            });

            if (!res.ok) {
                setPaymentStatus("failure");
                return;
            }

            const order = await res.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                order_id: order.id,

                handler: async function (response) {
                    const verifyRes = await fetch("/api/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response),
                    });
                    console.log(verifyRes, "verifyRes")
                    if (verifyRes.ok) {

                        setPaymentStatus("success");
                        setLoading(false);
                        clearCart();
                    } else {
                        setPaymentStatus("failure");
                        setLoading(false);
                    }
                },

                modal: {
                    ondismiss: function () {
                        setPaymentStatus("failure");
                        setLoading(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            setPaymentStatus("failure");
            setLoading(false);
        }
    };


    return (
        <>
            <div className="min-h-screen bg-zinc-100 py-6 px-4">
                <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">

                    {/* CART ITEMS */}
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Shopping Cart
                        </h1>

                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
                            >
                                {/* Image */}
                                <div className="relative w-24 h-32 mx-auto sm:mx-0">
                                    <Image
                                        src={item.landingImage}
                                        alt={item.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="font-semibold text-lg">{item.title}</h2>
                                    <p className="text-zinc-500 mt-1">₹{item.price}</p>

                                    {/* Quantity */}
                                    <div className="flex items-center justify-center sm:justify-start mt-4 gap-3">
                                        <button
                                            onClick={() =>
                                                item.quantity > 1 &&
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                            className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-zinc-100"
                                        >
                                            −
                                        </button>

                                        <span className="font-medium text-lg">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => {
                                                const total = cart.reduce(
                                                    (acc, i) => acc + i.quantity,
                                                    0
                                                );

                                                if (total >= MAX_ALLOWED) {
                                                    setShowBulkModal(true);
                                                    return;
                                                }

                                                updateQuantity(item.id, item.quantity + 1);
                                            }}
                                            className={`w-8 h-8 flex items-center justify-center rounded-full border transition
    ${cart.reduce((acc, i) => acc + i.quantity, 0) >= MAX_ALLOWED
                                                    ? "bg-gray-200 cursor-not-allowed"
                                                    : "hover:bg-zinc-100"
                                                }`}
                                        >
                                            +
                                        </button>


                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-4 text-sm text-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Item total */}
                                <div className="font-semibold text-lg text-center sm:text-right">
                                    ₹{item.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="bg-white rounded-xl shadow-md p-6 h-fit lg:sticky lg:top-20">
                        <h2 className="text-xl font-bold mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-zinc-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>₹{SHIPPING}</span>
                            </div>

                            <div className="border-t pt-4 flex justify-between font-semibold text-lg text-zinc-900">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>
                        <div className="space-y-4 mt-8">
                            <h2 className="text-xl font-semibold">Shipping Details</h2>

                            {["name", "email", "phone", "address", "city", "state", "pincode"].map((field) => (
                                <div key={field}>
                                    <input
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        value={customer[field]}
                                        onChange={(e) => {
                                            setCustomer({ ...customer, [field]: e.target.value });
                                            setErrors({ ...errors, [field]: "" });
                                        }}
                                        className={`w-full border p-3 rounded-lg ${errors[field] ? "border-red-500" : "border-zinc-300"
                                            }`}
                                    />
                                    {errors[field] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors[field]}
                                        </p>
                                    )}
                                </div>
                            ))}

                        </div>
                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className={`w-full py-3 mt-3 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                                }`}
                        >
                            {loading ? "Processing..." : "Proceed to Payment"}
                        </button>

                    </div>
                </div>
            </div>
            {paymentStatus && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">

                        {paymentStatus === "success" ? (
                            <>
                                <div className="w-40 mx-auto">
                                    <Lottie animationData={successAnim} loop={false} />
                                </div>

                                <h2 className="text-2xl font-bold mt-4 text-green-600">
                                    Payment Successful 🎉
                                </h2>

                                <p className="mt-4 text-zinc-600">
                                    Thank you <strong>{customer.name}</strong> for your purchase.
                                </p>

                                <p className="mt-2 text-zinc-600">
                                    Your order will be delivered within <strong>5–7 business days</strong>.
                                </p>

                                <button
                                    onClick={() => setPaymentStatus(null)}
                                    className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                                >
                                    Continue Shopping
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="w-40 mx-auto">
                                    <Lottie animationData={failureAnim} loop={false} />
                                </div>

                                <h2 className="text-2xl font-bold mt-4 text-red-600">
                                    Payment Failed
                                </h2>

                                <p className="mt-4 text-zinc-600">
                                    Something went wrong or the payment was cancelled.
                                </p>

                                <p className="mt-2 text-zinc-500 text-sm">
                                    Don’t worry — your cart is still saved.
                                </p>

                                <div className="flex gap-4 mt-6 justify-center">
                                    <button
                                        onClick={() => {
                                            setPaymentStatus(null);
                                            handlePayment();
                                        }}
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                                    >
                                        Retry Payment
                                    </button>

                                    <button
                                        onClick={() => setPaymentStatus(null)}
                                        className="border px-6 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            <BulkOrderModal
                isOpen={showBulkModal}
                onClose={() => setShowBulkModal(false)}
            />
        </>

    );
}
