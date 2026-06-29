
import { FaBox, FaCheckCircle, FaCalendarAlt, FaEnvelope, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { authUserData } from "@/lib/api/forGettingUserData";
import { cheackOutProdectData } from "@/lib/api/prodectData";

export default async function MyOrdersPage() {
    const user = await authUserData();
    const res = await cheackOutProdectData({ user: { email: user.email } });
    const paidOrders = (res.orders || []).filter(order => order.paymentStatus === "paid");

    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-3xl shadow-sm mt-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shadow-sm">
                    <FaShoppingBag className="text-lg" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900">My Purchase History</h1>
                    <p className="text-xs text-slate-500">Track your successfully paid items</p>
                </div>
            </div>

            {paidOrders.length === 0 ? (
                <div className="text-center py-12 px-4">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaBox className="text-slate-400 text-2xl" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No orders found</h3>
                    <p className="text-slate-500 text-xs mb-5">You havent completed any payment transactions yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                <th className="p-4 text-center w-12">SL</th>
                                <th className="p-4">Product ID</th>
                                <th className="p-4">Seller Info</th>
                                <th className="p-4">Purchase Date</th>
                                <th className="p-4 text-center">Order Status</th>
                                <th className="p-4 text-right">Amount Paid</th>
                                <th className="p-4 text-center">Payment Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {paidOrders.map((order, index) => (
                                <tr key={order._id || index} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 text-center font-bold text-slate-500 bg-slate-50/30">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 font-mono font-semibold text-blue-600 text-xs">
                                        #{order.productId?.slice(-8) || order.productId}
                                    </td>
                                    <td className="p-4 space-y-0.5">
                                        <p className="text-slate-800 font-semibold capitalize text-sm">{order.sellerInfo?.name}</p>
                                        <p className="text-slate-400 text-xs flex items-center gap-1">
                                            <FaEnvelope className="text-[10px]" /> {order.sellerInfo?.email}
                                        </p>
                                    </td>
                                    <td className="p-4 text-slate-600 text-xs">
                                        <span className="flex items-center gap-1.5">
                                            <FaCalendarAlt className="text-slate-400 text-[11px]" />
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }) : 'N/A'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${order.orderStatus === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                                                order.orderStatus === 'processing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    'bg-blue-50 text-blue-700 border-blue-200'
                                            }`}>
                                            {order.orderStatus || 'pending'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-black text-slate-900">
                                        ৳{(order.totalPrice || 0).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm shadow-green-50">
                                                <FaCheckCircle className="text-[10px]" /> Paid
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}