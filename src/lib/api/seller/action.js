"use server";

import { serverMutation } from "../server";

export const addProdectItems=async(data)=>{
    const resData= await serverMutation('app/product','POST',data);
    return resData;
}



export const deleteProduct = async (id) => {
    const resData = await serverMutation(`/app/product/${id}`, 'DELETE', {});
    return resData;
}

export const updateProduct = async (id, data) => {
    // এখানে data অবজেক্টটি বডি হিসেবে পাঠাচ্ছি
    const resData = await serverMutation(`/app/product/${id}`, 'PUT', data);
    return resData;
}

