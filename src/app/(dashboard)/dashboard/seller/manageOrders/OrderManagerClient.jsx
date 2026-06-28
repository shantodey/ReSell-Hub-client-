'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { sellerOrderAction } from '@/lib/api/seller/action';
import {   FiPackage,   FiUser,   FiDollarSign,   FiClock,   FiCheckCircle,  FiTruck,  FiLoader,  FiCalendar, FiShoppingBag,   } from 'react-icons/fi';

const STEPS = [
    { key: 'pending', label: 'Pending', icon: FiClock },
    { key: 'accepted', label: 'Accepted', icon: FiCheckCircle },
    { key: 'processing', label: 'Processing', icon: FiLoader },
    { key: 'shipped', label: 'Shipped', icon: FiTruck },
    { key: 'delivered', label: 'Delivered', icon: FiPackage }
];

export default function OrderManagerClient({ initialOrders }) {
    const [orders, setOrders] = useState(initialOrders || []);
    const [loadingId, setLoadingId] = useState(null);
    const getStepIndex = (status) => {
        const currentStatus = status?.trim();
        if (currentStatus === 'verified') return 1; 
        return STEPS.findIndex(step => step.key === currentStatus);
    };

    const handleAction = async (orderId, actionType) => {
        let confirmMsg = `Are you sure you want to change status to ${actionType}?`;
        if (actionType === 'deliver') {
            confirmMsg = "Mark this order as delivered? It will be completed and archived from your active panel.";
        }

        if (!confirm(confirmMsg)) return;

        setLoadingId(orderId);
        

        const loadingToast = toast.loading('Updating order status...');
        
        const res = await sellerOrderAction(orderId, actionType);

        if (res.success) {
            toast.success('Order status updated successfully!', { id: loadingToast });

            setOrders(prevOrders => 
                prevOrders.map(order => {
                    const id = order._id?.$oid || order._id;
                    if (id === orderId) {
                        let nextStatus = order.orderStatus;
                        if (actionType === 'process') nextStatus = 'processing';
                        if (actionType === 'ship') nextStatus = 'shipped';
                        if (actionType === 'deliver') nextStatus = 'delivered';
                        return { ...order, orderStatus: nextStatus };
                    }
                    return order;
                }).filter(order => order.orderStatus !== 'delivered')
            );
        } else {
            toast.error('Failed to update status. Please try again.', { id: loadingToast });
        }
        setLoadingId(null);
    };

    if (!orders || orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                    <FiPackage className="text-2xl" />
                </div>
                <p className="text-gray-500 font-medium">No active orders right now.</p>
                <p className="text-xs text-gray-400 mt-1">When buyers purchase your products, they will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* react-hot-toast কন্টেইনার গ্লোবাল কনফিগারেশন */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* হেডার পার্ট */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Manage Active Orders</h2>
                    <p className="text-xs text-gray-500">Track milestones, update status, and fulfill customer shipments</p>
                </div>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 text-xs font-semibold rounded-full border border-blue-100 flex items-center gap-1">
                    <FiShoppingBag /> {orders.length} Active
                </span>
            </div>

            <div className="space-y-4">
                {orders.map((order) => {
                    const rawId = order._id?.$oid || order._id;
                    const status = order.orderStatus;
                    const currentStepIndex = getStepIndex(status);

                    return (
                        <div key={rawId} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">

                            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-6 items-center border-b border-gray-50">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                            #{String(rawId).substring(0, 8).toUpperCase()}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                            <FiPackage /> ID: {String(order.productId).substring(0, 6)}...
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                        <FiCalendar /> Ordered: {order.createdAt?.$date ? new Date(order.createdAt.$date).toLocaleDateString() : new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-400 flex items-center gap-1 uppercase font-semibold tracking-wider"><FiUser /> Buyer</span>
                                    <span className="font-semibold text-gray-800 block text-sm mt-0.5">{order.buyerInfo?.name}</span>
                                    <span className="text-xs text-gray-500 font-mono block truncate max-w-[180px]">{order.buyerInfo?.email}</span>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-400 flex items-center gap-1 uppercase font-semibold tracking-wider"><FiDollarSign /> Pricing</span>
                                    <span className="text-base font-bold text-gray-900 block mt-0.5">৳{order.totalPrice?.toLocaleString()}</span>
                                    <span className="text-xs text-gray-500 font-medium block">Quantity: {order.quantity} pcs</span>
                                </div>

                                <div className="md:text-right flex items-center md:justify-end gap-2">
                                    {status === 'pending' && (
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                                            <span className="text-xs text-gray-500 italic font-medium flex items-center gap-1">
                                                <FiClock /> Waiting for Payment
                                            </span>
                                        </div>
                                    )}

                                    {(status === 'accepted' || status === 'verified') && (
                                        <button   disabled={loadingId === rawId} onClick={() => handleAction(rawId, 'process')}
                                            className="w-full md:w-auto px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5">
                                            {loadingId === rawId ? <FiLoader className="animate-spin" /> : <FiLoader />}
                                            Start Processing
                                        </button>
                                    )}

                                    {status === 'processing' && (
                                        <button  disabled={loadingId === rawId} onClick={() => handleAction(rawId, 'ship')}
                                            className="w-full md:w-auto px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5">
                                            {loadingId === rawId ? <FiLoader className="animate-spin" /> : <FiTruck />}
                                            Ship Product
                                        </button>
                                    )}

                                    {status === 'shipped' && (
                                        <button   disabled={loadingId === rawId} onClick={() => handleAction(rawId, 'deliver')}
                                            className="w-full md:w-auto px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5" >
                                            {loadingId === rawId ? <FiLoader className="animate-spin" /> : <FiCheckCircle />}
                                            Mark as Delivered
                                        </button>
                                    )}
                                </div>
                            </div>

                       
                            <div className="bg-gray-50/50 p-5 overflow-x-auto whitespace-nowrap">
                                <div className="min-w-[600px] flex items-center justify-between relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                                    <div  className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500" 
                                        style={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
                                    />

                                    {STEPS.map((step, index) => {
                                        const StepIcon = step.icon;
                                        const isCompleted = index < currentStepIndex;
                                        const isActive = index === currentStepIndex;

                                        return (
                                            <div key={step.key} className="flex flex-col items-center relative z-10 w-24">
                                                {/* সার্কেল পয়েন্টার */}
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm border transition-all duration-300 ${
                                                    isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                                                    isActive ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50' :
                                                    'bg-white border-gray-200 text-gray-400'
                                                }`}>
                                                    <StepIcon className={`text-sm ${isActive && step.key === 'processing' ? 'animate-spin' : ''}`} />
                                                </div>

                                                <span className={`text-xs mt-2 font-semibold tracking-wide transition-all ${  isActive ? 'text-blue-600 font-bold scale-105' : 
                                                    isCompleted ? 'text-emerald-600' : 'text-gray-400'
                                                }`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}