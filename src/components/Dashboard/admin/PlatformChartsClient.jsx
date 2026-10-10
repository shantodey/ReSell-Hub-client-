'use client';

import React from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const userGrowthData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 800 },
    { name: 'Mar', users: 1500 },
    { name: 'Apr', users: 2200 },
    { name: 'May', users: 3400 },
    { name: 'Jun', users: 4800 },
];

const monthlyOrdersData = [
    { name: 'Jan', orders: 120, revenue: 45000 },
    { name: 'Feb', orders: 210, revenue: 89000 },
    { name: 'Mar', orders: 450, revenue: 190000 },
    { name: 'Apr', orders: 390, revenue: 165000 },
    { name: 'May', orders: 680, revenue: 290000 },
    { name: 'Jun', orders: 850, revenue: 380000 },
];

const categoryPerformanceData = [
    { name: 'Electronics', views: 4000, sales: 2400 },
    { name: 'Property', views: 3000, sales: 1398 },
    { name: 'Vehicles', views: 2000, sales: 9800 },
    { name: 'Home Living', views: 2780, sales: 3908 },
];

const topCategoriesData = [
    { name: 'Electronics', value: 45 },
    { name: 'Property', value: 25 },
    { name: 'Vehicles', value: 20 },
    { name: 'Others', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function PlatformChartsClient() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* ১. User Growth Chart (Area Chart) */}
            <div className="bg-white p-5 rounded-xl border">
                <h3 className="text-base font-semibold mb-4">User Growth Trend</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip />
                            <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#eff6ff" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ২. Monthly Orders & Revenue Chart (Line/Bar Hybrid Concept) */}
            <div className="bg-white p-5 rounded-xl border">
                <h3 className="text-base font-semibold mb-4">Monthly Orders & Volume</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyOrdersData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip />
                            <Legend iconType="circle" />
                            <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} name="Total Orders" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ৩. Category Performance Chart (Bar Chart) */}
            <div className="bg-white p-5 rounded-xl border">
                <h3 className="text-base font-semibold mb-4">Category Performance (Views vs Sales)</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip />
                            <Legend iconType="circle" />
                            <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Page Views" />
                            <Bar dataKey="sales" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Items Sold" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ৪. Top Categories Chart (Pie Chart) */}
            <div className="bg-white p-5 rounded-xl border flex flex-col justify-between">
                <h3 className="text-base font-semibold mb-2">Top Categories Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={topCategoriesData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {topCategoriesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {/* Custom Legends for Pie */}
                <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-600 mt-2">
                    {topCategoriesData.map((item, idx) => (
                        <div key={item.name} className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                            <span>{item.name} ({item.value}%)</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}