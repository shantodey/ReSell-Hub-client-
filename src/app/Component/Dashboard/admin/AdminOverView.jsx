import { getOverviewData } from '@/lib/api/admin/adminApi';
import { prodectData } from '@/lib/api/prodectData';
import React from 'react';


const AdminOverView = async() => {
      const totalProducts = await prodectData();
     const stats = await getOverviewData();
     
   return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500">ReSellHub platform realtime data overview.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Users</span>
                        <h3 className="text-4xl font-bold text-blue-600 mt-2">{stats.totalUsers}</h3>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">Total registered accounts</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Products</span>
                        <h3 className="text-4xl font-bold text-green-600 mt-2">{totalProducts.length}</h3>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">Items listed for sell</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Orders</span>
                        <h3 className="text-4xl font-bold text-purple-600 mt-2">{stats.totalOrders}</h3>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">Total successfully placed orders</div>
                </div>

            </div>
        </div>
    );
};

export default AdminOverView;