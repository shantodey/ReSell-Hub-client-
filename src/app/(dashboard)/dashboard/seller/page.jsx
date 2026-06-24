'use client'
import { Button, Card, CardBody } from '@heroui/react';
import { FiDollarSign, FiBox, FiTrendingUp, FiShoppingBag, FiPlus } from 'react-icons/fi';

const SellerDashboardPage = () => {
    const stats = [
        { id: 1, title: 'Total Earnings', value: '$2,450.00', icon: <FiDollarSign className="text-xl" />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { id: 2, title: 'Active Listings', value: '18 Items', icon: <FiBox className="text-xl" />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
        { id: 3, title: 'Orders Filled', value: '42 Orders', icon: <FiShoppingBag className="text-xl" />, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
        { id: 4, title: 'Monthly Growth', value: '+12.5%', icon: <FiTrendingUp className="text-xl" />, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    ];

    // ডেমো প্রোডাক্ট লিস্ট ডাটা
    const recentProducts = [
        { id: '1', name: 'Sony WH-1000XM4 Headphones', category: 'Electronics', price: '$180', status: 'Active', sales: 3 },
        { id: '2', name: 'Nike Air Max 270', category: 'Footwear', price: '$95', status: 'Active', sales: 5 },
        { id: '3', name: 'Mechanical Gaming Keyboard', category: 'Accessories', price: '$65', status: 'Sold Out', sales: 8 },
        { id: '4', name: 'Fujifilm X-T30 Camera (Used)', category: 'Cameras', price: '$720', status: 'Pending', sales: 0 },
    ];
    return (
        <div className=" p-6 container mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Seller Overview</h1>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Welcome back! Here is whats happening with your shop today.</p>
                </div>
                <Button
                    variant="primary"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-200 px-4 py-2.5 self-start sm:self-auto flex items-center gap-1.5 transition-all"
                    onPress={() => console.log('Add product modal open')}
                >
                    <FiPlus className="text-lg" /> Add New Product
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat) => (
                    <Card key={stat.id}  className="border border-slate-100 bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5 flex items-center gap-4">
                            <div className={`p-3 rounded-xl border ${stat.color} flex items-center justify-center shrink-0`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">{stat.title}</p>
                                <p className="text-xl font-black text-slate-900 mt-0.5 leading-none">{stat.value}</p>
                            </div>
                        </div>
                    </Card>

                ))}
            </div>

            {/* Recent Active Listings Table Section */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Your Recent Listings</h3>
                    <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">View All</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
                                <th className="p-4 pl-6">Product Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Sales</th>
                                <th className="p-4 pr-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                            {recentProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-6 font-bold text-slate-900 max-w-[240px] truncate">{product.name}</td>
                                    <td className="p-4 text-slate-500">{product.category}</td>
                                    <td className="p-4 font-bold text-slate-900">{product.price}</td>
                                    <td className="p-4">{product.sales} sold</td>
                                    <td className="p-4 pr-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                product.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                    'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default SellerDashboardPage;