'use client';

import React from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

// --- সেলার মক ডেটা সেট ---
const salesOverviewData = [
    { name: 'Week 1', sales: 12 },
    { name: 'Week 2', sales: 19 },
    { name: 'Week 3', sales: 15 },
    { name: 'Week 4', sales: 28 },
];

const monthlyTrendData = [
    { name: 'Jan', revenue: 25000 },
    { name: 'Feb', revenue: 42000 },
    { name: 'Mar', revenue: 35000 },
    { name: 'Apr', revenue: 68000 },
    { name: 'May', revenue: 55000 },
    { name: 'Jun', revenue: 92000 },
];

const topProductsData = [
    { name: 'DDR4 8GB RAM', value: 40 },
    { name: 'Gaming Mouse', value: 30 },
    { name: 'RGB Keyboard', value: 20 },
    { name: '120mm Cooler', value: 10 },
];

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

export default function SellerChartsClient() {
    return (
        <div className="space-y-6">
            
            {/* উপরের সেকশনে ছোট ২টি চার্ট গ্রিড */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* ১. Sales Chart (Weekly Volume) */}
                <div className="bg-white p-5 rounded-xl border">
                    <h3 className="text-base font-semibold mb-4">Weekly Sales Volume (Current Month)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesOverviewData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                                <YAxis stroke="#9ca3af" fontSize={12} />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} name="Items Sold" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ২. Top Selling Products (Pie Chart) */}
                <div className="bg-white p-5 rounded-xl border flex flex-col justify-between">
                    <h3 className="text-base font-semibold mb-2">Top Selling Products</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={topProductsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={85}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {topProductsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Legends */}
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-600 mt-2">
                        {topProductsData.map((item, idx) => (
                            <div key={item.name} className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                                <span>{item.name} ({item.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* ৩. Monthly Sales Trend (Full Width Line Chart) */}
            <div className="bg-white p-5 rounded-xl border">
                <h3 className="text-base font-semibold mb-4">Monthly Revenue Trend (৳)</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyTrendData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip formatter={(value) => `৳${value}`} />
                            <Legend iconType="circle" />
                            <Line 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke="#3b82f6" 
                                strokeWidth={3} 
                                activeDot={{ r: 6 }}
                                name="Total Revenue" 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}