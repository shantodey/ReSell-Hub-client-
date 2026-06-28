'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { adminUserDeleteBlock } from '@/lib/api/admin/adminApi';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function UserTableClient({ initialUsers }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const pathname = usePathname();
    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`${pathname}?search=${search.trim()}`);
        } else {
            router.push(pathname);
        }
    };

    const handleAction = async (id, actionType, payload = {}) => {
        if (!confirm(`Are you sure you want to perform this action?`)) return;
        try {
            const res = await adminUserDeleteBlock(payload, id, actionType);
            if (res.success) {
                toast.success('Successfully',res.success)
                router.refresh();
            }
        } catch (error) {
            console.error("Client interaction error:", error);
        }
    };

    return (
        <div>
            {/* Search Option */}
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input type="text" placeholder="Search by username..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-lg w-full max-w-sm text-sm"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Search</button>
            </form>

            {/* Table UI */}
            <div className="bg-white rounded-xl border overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b text-gray-600 font-medium">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {initialUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium flex items-center gap-3">
                                     <Image src={user.image} alt={''}  fill  sizes="40px"  className="rounded-full object-cover"/>
                                    {/* <Image src={user.image} alt="" className="w-8 h-8 rounded-full border object-cover" /> */}
                                    {user.name}
                                </td>
                                <td className="p-4 text-gray-500">{user.email}</td>
                                <td className="p-4 capitalize">{user.role}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${user.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {user.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    {user.role !== 'admin' && (
                                        <>
                                            <button
                                                onClick={() => handleAction(user._id, 'update', { isBlocked: !user.isBlocked })}
                                                className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                                                {user.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                            <button
                                                onClick={() => handleAction(user._id, 'delete')}
                                                className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100">
                                                Delete
                                            </button>
                                        </>
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