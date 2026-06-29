'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { adminProductAction } from '@/lib/api/admin/adminApi';
import Image from 'next/image';


export default function ProductTableClient({ initialProducts }) {
    const router = useRouter();

    const handleAction = async (id, actionType) => {
        if (!confirm(`Are you sure you want to ${actionType} this product?`)) return;
        const res = await adminProductAction(id, actionType);
        if (res.success) {
            router.refresh(); 
        }
    };

    return (
        <div className="bg-white rounded-xl border overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b text-gray-600 font-medium">
                    <tr>
                        <th className="p-4">Product Info</th>
                        <th className="p-4">Seller</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {initialProducts.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-4 text-center text-gray-400">No products available.</td>
                        </tr>
                    ) : (
                        initialProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium flex items-center gap-3">
                                     <Image  src={product.images?.[0]}  width={80} height={80}  alt="Profile"   className="w-10 h-10 rounded border object-cover" />
                                    <div>
                                        <span className="block text-gray-900 truncate max-w-xs">{product.title}</span>
                                        <span className="text-xs text-gray-400">{product.category} • Qty: {product.quantity || 1}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 text-xs">
                                    <span className="block font-medium">{product.sellerInfo?.name}</span>
                                    <span className="text-gray-400">{product.sellerInfo?.email}</span>
                                </td>
                                <td className="p-4 font-semibold text-gray-900">{product.price}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                                        product.status?.trim() === 'approved' ? 'bg-green-100 text-green-700' :
                                        product.status?.trim() === 'rejected' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {product.status || 'pending'}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                    {product.status?.trim() !== 'approved' && (
                                        <button onClick={() => handleAction(product._id, 'approve')}
                                            className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100" >
                                            Approve
                                        </button>
                                    )}
                                    {product.status?.trim() !== 'rejected' && (
                                        <button onClick={() => handleAction(product._id, 'reject')}
                                            className="px-2 py-1 text-xs bg-amber-50 text-amber-600 rounded hover:bg-amber-100" >
                                            Reject
                                        </button>
                                    )}
                                    <button onClick={() => handleAction(product._id, 'delete')}
                                        className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100" > Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}