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
       <div className="min-h-screen bg-[#f8f7f5] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-stone-200 pb-7">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-stone-900 text-[#FAF8F4] rounded-xl flex items-center justify-center">
                            <FaShoppingBag className="text-lg" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">Checkout</h1>
                            <p className="text-sm text-stone-500 mt-0.5">Review your order before confirming</p>
                        </div>
                    </div>
                </div>
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl max-w-xl mx-auto px-6">
                        <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                            <FaBoxOpen className="text-emerald-600 text-2xl" />
                        </div>
                        <h3 className="text-lg font-semibold text-stone-900 mb-1.5">No pending orders</h3>
                        <p className="text-stone-500 text-sm mb-7 leading-relaxed">
                            All your active orders are successfully paid or your cart is currently empty.
                        </p>
                        <Link href="/">
                            <Button className="bg-stone-900 text-[#FAF8F4] font-semibold rounded-lg h-11 px-6 hover:bg-stone-800 transition-colors">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="hidden sm:block bg-white border border-stone-200 rounded-2xl overflow-hidden">
                                <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-stone-800">Items in checkout</span>
                                    <span className="text-xs font-medium text-stone-400 tabular-nums">{orders.length} {orders.length === 1 ? "item" : "items"}</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-stone-200 text-[11px] font-semibold uppercase text-stone-400 tracking-wider">
                                                <th className="p-4 pl-6">Product ID</th>
                                                <th className="p-4">Seller Name</th>
                                                <th className="p-4 text-center">Qty</th>
                                                <th className="p-4 text-right">Price</th>
                                                <th className="p-4 text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-stone-100 text-sm">
                                            {orders.map((order) => (
                                                <tr key={order._id} className="hover:bg-stone-50/70 transition-colors">
                                                    <td className="p-4 pl-6 font-mono font-medium text-stone-500 text-xs">
                                                        #{order.productId?.slice(-8) || order.productId}
                                                    </td>
                                                    <td className="p-4 text-stone-700 font-medium capitalize">
                                                        {order.sellerInfo?.name}
                                                    </td>
                                                    <td className="p-4 text-center text-stone-800 font-semibold tabular-nums">
                                                        {order.quantity || 1}
                                                    </td>
                                                    <td className="p-4 text-right font-mono font-semibold text-stone-900 tabular-nums">
                                                        ৳{(order.totalPrice || 0).toLocaleString()}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex justify-center">
                                                            {order.orderStatus === "processing" ? (
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                                                                    <FaClock className="text-[10px]" /> Processing
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
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
                            <div className="block sm:hidden space-y-3">
                                <p className="text-xs font-semibold uppercase text-stone-400 tracking-wider px-1">Items in checkout ({orders.length})</p>
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white p-4 border border-stone-200 rounded-xl space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-mono text-xs font-medium text-stone-500">
                                                #{order.productId?.slice(-8) || order.productId}
                                            </span>
                                            {order.orderStatus === "processing" ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                                                    <FaClock className="text-[9px]" /> Processing
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                                    <FaCheckCircle className="text-[9px]" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-stone-600">
                                            Seller: <span className="font-medium text-stone-800 capitalize">{order.sellerInfo?.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-stone-100 pt-2.5 text-sm">
                                            <span className="text-stone-500">Qty: <span className="font-semibold text-stone-800">{order.quantity || 1}</span></span>
                                            <span className="font-mono font-semibold text-stone-900">৳{(order.totalPrice || 0).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white border border-stone-200 rounded-2xl sticky top-6 overflow-hidden">
                                <div className="px-6 py-4 border-b border-stone-200 flex items-center gap-2.5">
                                    <FaReceipt className="text-stone-400 text-sm" />
                                    <h2 className="text-sm font-semibold text-stone-800 tracking-wide uppercase">Order Summary</h2>
                                </div>

                                <div className="px-6 pt-5 pb-4 space-y-3">
                                    <div className="flex items-center gap-2.5 text-stone-700">
                                        <FaUser className="text-stone-300 text-xs shrink-0" />
                                        <span className="text-sm font-medium truncate">{session?.user?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-stone-700">
                                        <FaEnvelope className="text-stone-300 text-xs shrink-0" />
                                        <span className="text-xs text-stone-500 truncate">{session?.user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-stone-700">
                                        <FaCreditCard className="text-stone-300 text-xs shrink-0" />
                                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                                            Prepaid / Gateway
                                        </span>
                                    </div>
                                </div>

                                {/* Signature element: perforated receipt-stub divider */}
                                <div className="relative h-4 my-1">
                                    <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-stone-200"></div>
                                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FAF8F4] rounded-full border border-stone-200"></div>
                                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FAF8F4] rounded-full border border-stone-200"></div>
                                </div>

                                <div className="px-6 pt-3 pb-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">Total base items</span>
                                        <span className="font-medium text-stone-700 tabular-nums">{orders.length} orders</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">Shipping charges</span>
                                        <span className="font-medium text-emerald-600">Free</span>
                                    </div>
                                    <div className="flex justify-between items-baseline pt-3 border-t border-stone-100">
                                        <span className="text-sm font-semibold text-stone-800">Grand total</span>
                                        <span className="text-2xl font-bold text-stone-900 font-mono tabular-nums">৳{grandTotal.toLocaleString()}</span>
                                    </div>

                                    <Button
                                        fullWidth
                                        onClick={handleConfirmOrder}
                                        disabled={isProcessing || loadingOrders}
                                        className="bg-stone-900 hover:bg-stone-800 text-[#FAF8F4] font-semibold h-12 rounded-xl transition-colors text-sm disabled:bg-stone-300 mt-2"
                                    >
                                        {isProcessing ? "Processing..." : "Confirm Order Details"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}