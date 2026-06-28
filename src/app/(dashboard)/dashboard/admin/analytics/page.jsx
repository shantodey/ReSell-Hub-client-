import PlatformChartsClient from '@/app/Component/Dashboard/admin/PlatformChartsClient';
import React from 'react';


export default function PlatformAnalyticsPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Platform Analytics</h1>
                <p className="text-sm text-gray-500">
                    Overall business insights, user activity, product performance, and trends.
                </p>
            </header>

            <PlatformChartsClient />
        </div>
    );
}