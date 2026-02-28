"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("/api/admin/orders")
            .then((res) => res.json())
            .then((data) => {
                // Sort latest first (safety sort)
                const sorted = data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sorted);
            });
    }, []);

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={order._id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-4 py-3">{index + 1}</td>

                                <td className="px-4 py-3">{order.razorpayOrderId}</td>

                                <td className="px-4 py-3">{order.customer?.name}</td>

                                <td className="px-4 py-3">{order.customer?.email}</td>
                                <td className="px-4 py-3">{[
                                    order.customer?.address,
                                    order.customer?.city,
                                    order.customer?.state,
                                    order.customer?.pincode,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}</td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${order.status === "paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                                <td className="px-4 py-3 font-semibold">
                                    ₹{order.total}
                                </td>

                                <td className="px-4 py-3">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>

                                <td className="px-4 py-3">
                                    {order.shipped ? (
                                        <span className="text-green-600 font-semibold">
                                            Shipped ✓
                                        </span>
                                    ) : (
                                        <button
                                            onClick={async () => {
                                                await fetch("/api/admin/mark-shipped", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ orderId: order._id }),
                                                });

                                                // Update UI instantly
                                                setOrders((prev) =>
                                                    prev.map((o) =>
                                                        o._id === order._id
                                                            ? { ...o, shipped: true }
                                                            : o
                                                    )
                                                );
                                            }}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                                        >
                                            Mark as Shipped
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}