import { fetchSellerOrders } from '@/lib/api/seller/action';
import React from 'react';
import OrderManagerClient from './OrderManagerClient';
import { authUserData } from '@/lib/api/forGettingUserData';



export default async function ManageOrdersPage() {

    const currentUser = await authUserData();
    const sessionEmail = currentUser?.email || ''; 
    const orders = await fetchSellerOrders(sessionEmail);




    return (
        <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
            

            <OrderManagerClient initialOrders={orders} />
        </div>
    );
}