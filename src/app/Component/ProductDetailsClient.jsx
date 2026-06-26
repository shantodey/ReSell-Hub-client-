"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FaShoppingCart, FaUserLock } from "react-icons/fa";

export default function ProductDetailsClient({ product }) {
    const { title, category, condition, price, images, description, sellerInfo, quantity } = product;
    const { data: session, isPending } = authClient.useSession();
    const [mainImage, setMainImage] = useState(images[0]);
    const [orderQuantity, setOrderQuantity] = useState(1);

    const handleIncrement = () => {
        if (orderQuantity < quantity) {
            setOrderQuantity(prev => prev + 1);
        }
    };

    // কোয়ান্টিটি কমানোর হ্যান্ডলার
    const handleDecrement = () => {
        if (orderQuantity > 1) {
            setOrderQuantity(prev => prev - 1);
        }
    };
    const totalPrice = price * orderQuantity;

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* big img */}
            <div className="flex flex-col gap-4">
                <div className="relative w-full h-100 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                    <Image  src={mainImage}  alt={title}  fill  priority  className="object-contain p-4 transition-all duration-300" />
                </div>
                <div className="flex gap-3 overflow-x-auto py-2">
                    {images.map((img, index) => (
                        <button  key={index}  onClick={() => setMainImage(img)}
                            className={`relative w-20 h-20 border-2 rounded-xl overflow-hidden bg-white flex-shrink-0 transition-all ${
                                mainImage === img ? "border-blue-600 shadow-md" : "border-slate-200 opacity-70 hover:opacity-100"
                            }`}
                        >
                            <Image src={img} alt={`thumb-${index}`} fill className="object-cover p-1" />
                        </button>
                    ))}
                </div>
            </div>

            
            <div className="flex flex-col justify-between">
                <div>
                    <div className="flex gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{category}</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Condition: {condition}</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug mb-2">{title}</h1>
                    <p className="text-sm text-slate-500 mb-4">Stock Available: <span className="font-bold text-slate-800">{quantity} units</span></p>  
                    <hr className="my-4 border-slate-100" />
                    <div className="bg-slate-50 p-4 rounded-xl mb-6">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-500">Unit Price:</span>
                            <span className="text-lg font-medium text-slate-700">৳{price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-md font-bold text-slate-800">Total Price:</span>
                            <span className="text-2xl font-black text-blue-600">৳{totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-sm font-bold text-slate-700">Quantity:</span>
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                            <button   onClick={handleDecrement}  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors" >
                                -
                            </button>
                            <span className="px-6 py-2 text-slate-800 font-bold min-w-[50px] text-center">
                                {orderQuantity}
                            </span>
                            <button  onClick={handleIncrement} disabled={orderQuantity >= quantity}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>


                <div className="mt-auto">
                    <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mb-6 text-sm">
                        <p className="font-bold text-slate-700 mb-1">Seller Information:</p>
                        <p className="text-slate-600 capitalize">Name: {sellerInfo?.name}</p>
                        <p className="text-slate-600">Contact: {sellerInfo?.phone}</p>
                    </div>

                   
                    {isPending ? (
                        <Button fullWidth disabled className="bg-slate-200 h-12 font-bold text-slate-400">Loading Session...</Button>
                    ) : session?.user ? (
                        <Button   fullWidth   className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm h-12 rounded-xl shadow-md transition-transform active:scale-95"
                            startContent={<FaShoppingCart />}
                            onClick={() => alert(`Proceeding to buy ${orderQuantity} items for ৳${totalPrice}`)}
                        >
                            Buy Now
                        </Button>
                    ) : (
                        <div className="text-center p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center gap-2 text-rose-600 text-sm font-semibold">
                            <FaUserLock />
                            <span>Please login to purchase this product</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-span-full mt-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">Product Description</h2>
                <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{description}</p>
            </div>
        </div>
    );
}