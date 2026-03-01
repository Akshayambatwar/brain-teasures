"use client";

import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/orders");

                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await res.json();

                const sorted = data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setOrders(sorted);
            } catch (err) {
                console.error(err);
                setError("Something went wrong while loading orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        const term = searchTerm.toLowerCase();

        return (
            order.customer?.name?.toLowerCase().includes(term) ||
            order.customer?.email?.toLowerCase().includes(term) ||
            order.customer?.phone?.toLowerCase().includes(term)
        );
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>
            <div className="mb-6 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Contact</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Order Details</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders?.map((order, index) => (
                            <tr
                                key={order._id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-4 py-3">{index + 1}</td>

                                <td className="px-4 py-3">{order.razorpayOrderId}</td>

                                <td className="px-4 py-3">{order.customer?.name}</td>

                                <td className="px-4 py-3">{order.customer?.email}</td>
                                <td className="px-4 py-3">{order.customer?.phone}</td>
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
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setShowModal(true);
                                        }}
                                        className="bg-indigo-600 text-white px-3 py-1 rounded text-xs hover:bg-indigo-700"
                                    >
                                        View
                                    </button>
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
                                                try {
                                                    setActionLoading(order._id);

                                                    const res = await fetch(
                                                        "/api/admin/mark-shipped",
                                                        {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                            body: JSON.stringify({
                                                                orderId: order._id,
                                                            }),
                                                        }
                                                    );

                                                    if (!res.ok) {
                                                        throw new Error("Failed to update");
                                                    }

                                                    setOrders((prev) =>
                                                        prev.map((o) =>
                                                            o._id === order._id
                                                                ? { ...o, shipped: true }
                                                                : o
                                                        )
                                                    );
                                                } catch (err) {
                                                    console.error(err);
                                                    alert("Failed to mark as shipped");
                                                } finally {
                                                    setActionLoading(null);
                                                }
                                            }}
                                            disabled={order.status !== "paid" || actionLoading === order._id}
                                            className={`px-3 py-1 rounded text-xs font-medium transition ${order.status === "paid"
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                                                }`}
                                        >
                                            {actionLoading === order._id
                                                ? "Updating..."
                                                : "Mark as Shipped"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan="10" className="text-center py-6 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">

                        <h2 className="text-xl font-bold mb-4">
                            Order Details
                        </h2>

                        <div className="space-y-3">
                            {selectedOrder.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between border-b pb-2"
                                >
                                    <span>{item.title}</span>
                                    <span className="font-semibold">
                                        Qty: {item.quantity}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}