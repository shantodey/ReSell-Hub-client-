import React from "react";
import { FaShoppingBag, FaWallet, FaClock, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { authUserData } from "@/lib/api/forGettingUserData";
import { cheackOutProdectData } from "@/lib/api/prodectData";

export default async function BuyerDashboardPage() {
    const user = await authUserData();
    const res = await cheackOutProdectData({ user: { email: user.email } });
    const paidOrders = (res.orders || []).filter(order => order.paymentStatus === "paid");
    const totalOrders = paidOrders.length;
    const totalSpent = paidOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const recentPurchases = paidOrders.slice(0, 3);

    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 mt-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                        <FaShoppingBag />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Orders</p>
                        <h3 className="text-2xl font-black text-slate-800 mt-0.5">{totalOrders}</h3>
                    </div>
                </div>
                <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                        <FaWallet />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Spent</p>
                        <h3 className="text-2xl font-black text-slate-800 mt-0.5">৳{totalSpent.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center gap-4 sm:col-span-2 md:col-span-1">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                        <FaClock />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Latest Status</p>
                        <p className="text-sm font-bold text-slate-700 mt-1 capitalize truncate">
                            {recentPurchases[0] ? `Order #${recentPurchases[0].productId?.slice(-6)} (${recentPurchases[0].orderStatus || 'Processing'})` : "No recent activity"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">Recent Purchases</h2>
                        <p className="text-xs text-slate-400">Your last 3 successfully completed items</p>
                    </div>
                    <Link href="/dashboard/buyer/my-orders" className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        View All <FaArrowRight className="text-[10px]" />
                    </Link>
                </div>

                {recentPurchases.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-slate-400 text-xs">You havent bought anything yet.</p>
                        <Link href="/shop" className="inline-block mt-3 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                                    <th className="pb-3 font-medium">Product ID</th>
                                    <th className="pb-3 font-medium">Seller</th>
                                    <th className="pb-3 text-center font-medium">Status</th>
                                    <th className="pb-3 text-right font-medium">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-slate-700">
                                {recentPurchases.map((order, idx) => (
                                    <tr key={order._id || idx} className="hover:bg-slate-50/40 transition-colors">
                                        <td className="py-3 font-mono font-bold text-blue-600 text-xs">
                                            #{order.productId?.slice(-8) || order.productId}
                                        </td>
                                        <td className="py-3 font-medium capitalize text-slate-800">
                                            {order.sellerInfo?.name || "Unknown"}
                                        </td>
                                        <td className="py-3 text-center">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold capitalize border ${
                                                order.orderStatus === 'delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                                                order.orderStatus === 'processing' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-blue-50 text-blue-700 border-blue-100'
                                            }`}>
                                                {order.orderStatus || 'pending'}
                                            </span>
                                        </td>
                                        <td className="py-3 text-right font-bold text-slate-900">
                                            ৳{(order.totalPrice || 0).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}