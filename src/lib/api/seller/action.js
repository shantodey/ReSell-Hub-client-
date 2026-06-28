"use server";

import { serverMutation } from "../server";

export const addProdectItems = async (data) => {
    const resData = await serverMutation('app/product', 'POST', data);
    return resData;
}

export const getProductDetails = async (id) => {
    const response = await fetch(`${process.env.SERVER_URL}/app/product/${id}`);
    
    if (!response.ok) {
        throw new Error("Failed to load product from backend");
    }
    
    const data = await response.json();
    return data;
};

export const deleteProduct = async (id) => {
    const req = await fetch(`${process.env.SERVER_URL}/app/product/${id}`, {
        method: 'DELETE',
    });
    const result = await req.json();
    return result
}


export const updateProduct = async (id, cleanData) => {
    const response = await fetch(`${process.env.SERVER_URL}/app/product/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanData),
    });

    if (!response.ok) {
        throw new Error("Failed to update on backend");
    }

    const result = await response.json();
    return result;
};



// ১. সেলারের ইমেইল দিয়ে অ্যাক্টিভ অর্ডারগুলো ফেচ করার ফাংশন (GET)
export const fetchSellerOrders = async (sellerEmail) => {
    try {
        // নতুন ডেডিকেটেড রাউট /app/seller/orders
        const res = await fetch(`${process.env.SERVER_URL}/app/seller/orders?email=${sellerEmail}`, { 
            cache: 'no-store' 
        });
        return res.ok ? await res.json() : [];
    } catch (error) {
        console.error("Fetch orders error:", error);
        return [];
    }
};

// ২. অর্ডারের স্ট্যাটাস পরিবর্তন করার ফাংশন (POST)
export const sellerOrderAction = async (id, actionType) => {
    try {
        // নতুন ডেডিকেটেড রাউট /app/seller/orders/${id}
        const response = await fetch(`${process.env.SERVER_URL}/app/seller/orders/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: actionType })
        });
        return { success: response.ok };
    } catch (error) {
        console.error("Seller order action error:", error);
        return { success: false };
    }
};