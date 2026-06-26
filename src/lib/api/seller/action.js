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