"use server";

import { serverMutation } from "../server";

export const addProdectItems=async(data)=>{
    const resData= await serverMutation('app/product','POST',data);
    return resData;
}