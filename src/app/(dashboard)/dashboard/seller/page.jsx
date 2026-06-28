import React from 'react';
import {  FiDollarSign,  FiBox,  FiShoppingBag,  FiClock,  FiArrowUpRight} from 'react-icons/fi';


import { getProductBySeller, fetchSellerOrders } from '@/lib/api/seller/action';
import { authUserData } from '@/lib/api/forGettingUserData';


const SellerDashboardPage = async () => {
    
    const user = await authUserData();
    const sellerEmail = user?.email;

    let myProducts = [];
    let allOrders = [];

    try {
        const [productsRes, ordersRes] = await Promise.all([
            getProductBySeller(sellerEmail),
            fetchSellerOrders(sellerEmail)
        ]);

        myProducts = productsRes || [];
        allOrders = ordersRes || [];
    } catch (error) {
        console.error("Dashboard Server Fetch Error:", error);
    }

    const totalProductsCount = myProducts.length;
    let completedSalesCount = 0;
    let revenueSum = 0;
    let pendingOrdersCount = 0;

    allOrders.forEach(order => {
        const paymentStatus = order.paymentStatus?.toLowerCase();
        const orderStatus = order.orderStatus?.toLowerCase();
        
        if (paymentStatus === 'paid') {
            completedSalesCount += (Number(order.quantity) || 1);
            revenueSum += (Number(order.totalPrice) || 0);
        }
        
        if (orderStatus === 'verified') {
            pendingOrdersCount++;
        }
    });

    const cardsStructure = [
        { id: 1, title: 'Total Products', value: totalProductsCount, unit: 'Items active', icon: <FiBox />, color: 'text-slate-900 bg-slate-100 border-slate-200' },
        { id: 2, title: 'Total Sales', value: completedSalesCount, unit: 'Units delivered', icon: <FiShoppingBag />, color: 'text-slate-900 bg-slate-100 border-slate-200' },
        { id: 3, title: 'Total Revenue', value: `৳${revenueSum.toLocaleString('bn-BD')}`, unit: 'Paid earnings', icon: <FiDollarSign />, color: 'text-emerald-700 bg-emerald-50 border-emerald-100/70' },
        { id: 4, title: 'Pending Orders', value: pendingOrdersCount, unit: 'Verified queue', icon: <FiClock />, color: 'text-amber-700 bg-amber-50 border-amber-100/70' },
    ];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 bg-white min-h-screen text-slate-900 font-sans antialiased selection:bg-slate-100">
            <div className="flex flex-col space-y-1 border-b border-slate-100 pb-6">
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">Dashboard Overview</h1>
                <p className="text-xs md:text-sm text-slate-400 font-normal">Secure server-side business intelligence pipeline.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cardsStructure.map((card) => (
                    <div key={card.id} className="p-6 border border-slate-100 bg-white rounded-2xl flex items-start justify-between shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_-3px_rgba(0,0,0,0.08)] transition-all duration-300">
                        <div className="space-y-3">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{card.title}</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">{card.value}</span>
                                <span className="text-xs text-slate-400 font-normal tracking-wide">{card.unit}</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-xl border text-lg ${card.color}`}>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-5">
                <div className="flex flex-col space-y-0.5">
                    <h2 className="text-base font-semibold text-slate-900 tracking-tight">Recent Order Realtime Pipeline</h2>
                    <p className="text-xs text-slate-400">Direct immutable ledger activity synchronization.</p>
                </div>

                <div className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)]">
                    <div className="overflow-x-auto">
                        {allOrders.length === 0 ? (
                            <div className="p-16 text-center text-xs text-slate-400 font-medium tracking-wide">
                                No operational data found in the orders pipeline ledger.
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse text-xs md:text-sm">
                                <thead>
                                    <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-widest text-[10px]">
                                        <th className="p-4 pl-6">Buyer Profile</th>
                                        <th className="p-4">Contact</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Quantity</th>
                                        <th className="p-4">Payment</th>
                                        <th className="p-4">Fulfillment</th>
                                        <th className="p-4 pr-6 text-right">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-normal text-slate-600">
                                    {allOrders.map((order) => {
                                        const paymentLower = order.paymentStatus?.toLowerCase();
                                        const statusLower = order.orderStatus?.toLowerCase();
                                        
                                        return (
                                            <tr key={order._id?.$oid || order.id || order._id} className="hover:bg-slate-50/40 transition-colors group">
                                                <td className="p-4 pl-6 font-medium text-slate-900 max-w-[160px] md:max-w-xs truncate">
                                                    {order.buyerInfo?.name || "Anonymous Guest"}
                                                </td>
                                                <td className="p-4 text-slate-400 tracking-tight font-mono text-[11px]">{order.buyerInfo?.email || "N/A"}</td>
                                                <td className="p-4 font-semibold text-slate-900">৳{(order.totalPrice || 0).toLocaleString('bn-BD')}</td>
                                                <td className="p-4 font-medium text-slate-500">{order.quantity || 1}x</td>
                                                
                                                {/* Payment Status Badge */}
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                                                        paymentLower === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100/70' : 'bg-red-50 text-red-700 border-red-100/70'
                                                    }`}>
                                                        {order.paymentStatus || "Unpaid"}
                                                    </span>
                                                </td>

                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                                                        statusLower === 'verified' ? 'bg-amber-50 text-amber-700 border-amber-100/70' :
                                                        statusLower === 'delivered' || statusLower === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-100/70' :
                                                        'bg-slate-50 text-slate-600 border-slate-100'
                                                    }`}>
                                                        {order.orderStatus || "Processing"}
                                                    </span>
                                                </td>

                                                <td className="p-4 pr-6 text-right">
                                                    <div className="flex items-center justify-end">
                                                        <span className="text-slate-300 group-hover:text-slate-900 transition-colors">
                                                            <FiArrowUpRight className="text-base opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SellerDashboardPage;