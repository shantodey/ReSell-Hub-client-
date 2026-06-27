"use client";

import React, { useEffect, useState } from "react";
import { FaStar, FaRegClock } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { getLatestProducts } from "@/lib/api/latestThreeProduct";


function ProductCard({ product }) {
    const { _id, title, category, condition, price, images, sellerInfo, createdAt } = product;
    const getPostedTime = (dateString) => {
        if (!dateString) return "Just now";
        const now = new Date();
        const postDate = new Date(dateString);
        const diffTime = Math.abs(now - postDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        return `${diffDays} days ago`;
    };

    return (
        <div className="group relative bg-white border border-gray-300 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between h-full">
      
            <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-slate-950 text-white rounded-md shadow-sm">
                        {category || "Electronics"}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-white text-blue-600 border border-slate-100 rounded-md shadow-sm">
                        {condition || "Used"}
                    </span>
                </div>

                <Image 
                    src={images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"} 
                    alt={title || "Product Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                />
            </div>


            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-base text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2 min-h-[3rem]">
                        {title}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-2xl font-black text-slate-950">৳{price?.toLocaleString()}</span>
                    </div>
                </div>

              
                <div className="border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            {sellerInfo?.sellerimg ? (
                                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-100">
                                    <Image 
                                        src={sellerInfo.sellerimg} 
                                        alt={sellerInfo.name || "Seller"} 
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center uppercase border border-slate-200">
                                    {sellerInfo?.name?.charAt(0) || "S"}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700 capitalize">{sellerInfo?.name || "Seller"}</span>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <FaRegClock className="text-[9px]" /> {getPostedTime(createdAt?.$date || createdAt)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-50/60 rounded-lg border border-amber-100/50">
                            <FaStar className="text-amber-400 text-xs" />
                            <span className="text-xs font-bold text-amber-800">4.8</span>
                        </div>
                    </div>
                </div>

          
                <Link href={`/prodect/${_id}`} className="block mt-5">
                    <button 
                        type="button"
                        className="w-full bg-slate-50 hover:bg-slate-950 text-slate-700 hover:text-white font-bold text-xs h-10 rounded-xl transition-all duration-200 border border-slate-200 hover:border-slate-950"
                    >
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
}


export default function LatestProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getLatestProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
            <div className="max-w-6xl mx-auto">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3"> Latest on the Market</h2>
                    </div>
                    <p className="text-sm text-slate-500 max-w-xs sm:text-right">
                        Explore the most recently added second-hand items from trusted sellers.
                    </p>
                </div>


                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="w-full h-80 bg-slate-50 border border-slate-200 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
                        <p className="text-slate-400 text-sm">No products available at the moment.</p>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}