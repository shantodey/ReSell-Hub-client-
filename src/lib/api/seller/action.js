"use server";

import { authClient } from "@/lib/auth-client";
import { serverMutation } from "../server";


export const addProdectItems = async (data) => {
    const {data:token}=await authClient.token()
    console.log(token);
    
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

// @/services/product.js

export const getMyProducts = async (email, options = {}) => {

  
  const res = await fetch(`${process.env.SERVER_URL}/app/my-products?email=${email}`, {
    method: 'GET',
    signal: options?.signal instanceof AbortSignal ? options.signal : undefined, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
export const getProductBySeller = async (sellerEmail) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/app/my-products?email=${encodeURIComponent(sellerEmail)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
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




export const fetchSellerOrders = async (sellerEmail) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/app/seller/orders?email=${sellerEmail}`, { 
            cache: 'no-store' 
        });
        return res.ok ? await res.json() : [];
    } catch (error) {
        console.error("Fetch orders error:", error);
        return [];
    }
};


export const sellerOrderAction = async (id, actionType) => {
    try {
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