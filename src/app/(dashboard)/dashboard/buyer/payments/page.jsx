import { FaCheckCircle, FaCalendarAlt, FaCreditCard, FaReceipt, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { authUserData } from "@/lib/api/forGettingUserData";
import { cheackOutProdectData } from "@/lib/api/prodectData";

export default async function MyPaymentsPage() {
    const user = await authUserData();
    
    const res = await cheackOutProdectData({ user: { email: user?.email } });
    const paidPayments = (res.orders || []).filter(order => order.paymentStatus === "paid");

    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-3xl shadow-sm mt-6">

            <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                    <FaReceipt className="text-lg" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Payment History</h1>
                    <p className="text-xs text-slate-500">View and manage all your successful transactions</p>
                </div>
            </div>

            {paidPayments.length === 0 ? (
                <div className="text-center py-12 px-4">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaCreditCard className="text-slate-400 text-2xl" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No payments found</h3>
                    <p className="text-slate-500 text-xs mb-5">You havent made any successful payments yet.</p>
                    <Link href="/" className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline">
                        Continue Shopping &rarr;
                    </Link>
                </div>
            ) : (

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                <th className="p-4 text-center w-12">SL</th>
                                <th className="p-4">Transaction / Order ID</th>
                                <th className="p-4">Product Reference</th>
                                <th className="p-4">Payment Date</th>
                                <th className="p-4 text-right">Amount Paid</th>
                                <th className="p-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {paidPayments.map((payment, index) => (
                                <tr key={payment._id || index} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 text-center font-bold text-slate-500 bg-slate-50/30">
                                        {index + 1}
                                    </td>

                                    <td className="p-4 font-mono font-semibold text-slate-700 text-xs">
                                        {payment.transactionId || `#TRX-${(payment._id || '').slice(-8).toUpperCase()}`}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 font-mono">
                                            <FaShoppingBag className="text-slate-400 text-[10px]" />
                                            #{payment.productId?.slice(-8) || payment.productId}
                                        </div>
                                    </td>

                                    <td className="p-4 text-slate-600 text-xs">
                                        <span className="flex items-center gap-1.5">
                                            <FaCalendarAlt className="text-slate-400 text-[11px]" />
                                            {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'N/A'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-black text-green-600 text-base">
                                        ৳{(payment.totalPrice || 0).toLocaleString()}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm shadow-green-50">
                                                <FaCheckCircle className="text-[10px]" /> Success
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