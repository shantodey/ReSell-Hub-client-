"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { FaShoppingBag, FaCheckCircle, FaClock, FaBoxOpen, FaUser, FaEnvelope, FaCreditCard, FaReceipt, FaSpinner } from "react-icons/fa";
import { cheackOutProdectData } from "@/lib/api/prodectData";
import Link from "next/link";

export default function CheckoutPage() {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!sessionPending && !session?.user?.email) {
            setLoadingOrders(false);
            return;
        }

        if (session?.user?.email) {
            const fetchOrders = async () => {
                try {
                    const data = await cheackOutProdectData(session);
                    const unpaidOrders = (data.orders || []).filter(
                        (order) => order.paymentStatus === "unpaid"
                    );
                    
                    setOrders(unpaidOrders);
                } catch (error) {
                    console.error("Error loading orders:", error);
                    toast.error("Network error! Couldn't reach server.");
                } finally {
                    setLoadingOrders(false);
                }
            };

            fetchOrders();
        }
    }, [session, sessionPending]);

    const grandTotal = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    const handleConfirmOrder = async () => {
        if (orders.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        setIsProcessing(true);
        const fetchToast = toast.loading("Preparing checkout...");

        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: grandTotal,
                    email: session?.user?.email,
                }),
            });

            const data = await response.json();

            if (data.url) {
                toast.success("Redirecting to secure gateway...", { id: fetchToast });
                window.location.href = data.url;
            } else {
                toast.error(data.error || "Something went wrong!", { id: fetchToast });
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Failed to initiate payment.", { id: fetchToast });
            setIsProcessing(false);
        }
    };
    if (sessionPending || loadingOrders) {
        return (
            <div className="min-h-screen bg-slate-50/60 flex flex-col items-center justify-center gap-3">
                <FaSpinner className="text-blue-600 text-4xl animate-spin" />
                <p className="text-slate-500 font-medium text-sm">Syncing checkout details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-200/60 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                            <FaShoppingBag className="text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Checkout Portal</h1>
                            <p className="text-xs sm:text-sm text-slate-500">Manage and finalize your verified secure orders</p>
                        </div>
                    </div>
                </div>
                {orders.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl shadow-sm max-w-xl mx-auto px-4">
                        <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaBoxOpen className="text-green-500 text-3xl" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">No pending orders</h3>
                        <p className="text-slate-500 text-sm mb-6">
                            All your active orders are successfully paid or your cart is currently empty.
                        </p>
                        <Link href="/">
                            <Button className="bg-blue-600 text-white font-bold rounded-xl h-11 px-6 hover:bg-blue-700 transition-colors">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="hidden sm:block bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm shadow-slate-100">
                                <div className="p-5 bg-slate-50/80 font-extrabold text-slate-700 border-b border-slate-200/60 text-sm tracking-wide uppercase">
                                    Items in Checkout ({orders.length})
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200 bg-slate-100/40 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                                <th className="p-4 pl-6">Product ID</th>
                                                <th className="p-4">Seller Name</th>
                                                <th className="p-4 text-center">Qty</th>
                                                <th className="p-4 text-right">Price</th>
                                                <th className="p-4 text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-sm">
                                            {orders.map((order) => (
                                                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="p-4 pl-6 font-mono font-semibold text-blue-600 text-xs">
                                                        #{order.productId?.slice(-8) || order.productId}
                                                    </td>
                                                    <td className="p-4 text-slate-700 font-medium capitalize">
                                                        {order.sellerInfo?.name}
                                                    </td>
                                                    <td className="p-4 text-center text-slate-800 font-bold bg-slate-50/30">
                                                        {order.quantity || 1}
                                                    </td>
                                                    <td className="p-4 text-right font-black text-slate-900">
                                                        ৳{(order.totalPrice || 0).toLocaleString()}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex justify-center">
                                                            {order.orderStatus === "processing" ? (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                                    <FaClock className="text-[10px]" /> Processing
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                                                    <FaCheckCircle className="text-[10px]" /> Verified
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="block sm:hidden space-y-4">
                                <p className="text-xs font-bold uppercase text-slate-400 px-1">Items in Checkout ({orders.length})</p>
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                                                #{order.productId?.slice(-8) || order.productId}
                                            </span>
                                            {order.orderStatus === "processing" ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                                                    <FaClock className="text-[9px]" /> Processing
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                                    <FaCheckCircle className="text-[9px]" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-slate-600">
                                            Seller: <span className="font-semibold text-slate-800 capitalize">{order.sellerInfo?.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-sm">
                                            <span className="text-slate-500">Qty: <span className="font-bold text-slate-800">{order.quantity || 1}</span></span>
                                            <span className="font-extrabold text-slate-900 text-base">৳{(order.totalPrice || 0).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm shadow-slate-100/60 sticky top-6">
                                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                                    <FaReceipt className="text-blue-600" />
                                    <h2 className="text-lg font-extrabold text-slate-900">Summary Sheet</h2>
                                </div>

                                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <FaUser className="text-slate-400 text-sm shrink-0" />
                                        <span className="text-sm font-semibold truncate">{session?.user?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <FaEnvelope className="text-slate-400 text-sm shrink-0" />
                                        <span className="text-xs font-medium truncate text-slate-500">{session?.user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 pt-1 border-t border-slate-200/60 text-slate-700">
                                        <FaCreditCard className="text-slate-400 text-sm shrink-0" />
                                        <span className="text-xs font-bold text-green-600 bg-green-50/80 px-2 py-0.5 rounded border border-green-100 uppercase tracking-wider">
                                            Prepaid / Gateway
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-slate-500 text-sm">
                                        <span>Total Base Items:</span>
                                        <span className="font-bold text-slate-700">{orders.length} orders</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 text-sm">
                                        <span>Shipping Charges:</span>
                                        <span className="font-bold text-green-600">FREE</span>
                                    </div>
                                    <div className="border-t border-dashed border-slate-200 my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-extrabold text-slate-800">Grand Total:</span>
                                        <span className="text-2xl font-black text-blue-600">৳{grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Button
                                    fullWidth
                                    onClick={handleConfirmOrder}
                                    disabled={isProcessing || loadingOrders}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm disabled:bg-slate-300"
                                >
                                    {isProcessing ? "Processing..." : "Confirm Order Details"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}