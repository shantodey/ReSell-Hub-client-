import React from 'react';
import SellerChartsClient from './SellerChartsClient';


export default function SellerAnalyticsPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Sales Analytics</h1>
                <p className="text-sm text-gray-500">
                    Visual representation of your sales performance, trends, and top items.
                </p>
            </header>


            <SellerChartsClient />
        </div>
    );
}