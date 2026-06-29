"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaQuoteLeft, FaHandshake, FaShoppingBag, FaStar } from "react-icons/fa";


const stories = [
    {
        id: 1,
        name: "Shanto Chandra",
        src: "https://i.ibb.co/TBdqWvdp/IMG-20260613-165118-715-1382000955.jpg",
        role: "seller",
        location: "Dhaka",
        item: "DJI Mini 5 Pro Fly More Combo",
        story: "I listed my high-end drone setup on ReSell Hub. The platform's seller verification made it incredibly safe to handle such an expensive gadget transaction without any risk.",
        rating: 5
    },
    {
        id: 2,
        name: "Manik dey",
        src: "https://i.ibb.co/9kf2nZz8/IDPhoto-20260331-201010.jpg",
        role: "buyer",
        location: "Chittagong",
        item: "PNY XLR8 Gaming 32GB DDR5 RAM",
        story: "I was looking for a high-performance desktop RAM upgrade within a budget. Found this excellent condition DDR5 6000MHz kit at a great price. ReSell Hub helped me complete my build seamlessly!",
        rating: 5
    },
    {
        id: 3,
        name: "MediMap",
        src: "https://lh3.googleusercontent.com/a/ACg8ocJY4OxvAfnQPxJuDTU4b7NzJ-cm44izHDgzmjPbbD10YIlKX1c=s96-c",
        role: "seller",
        location: "Sylhet",
        item: "Mechanical Keyboard & Mouse",
        story: "After upgrading my setup, my old tech was gathering dust. Selling them on ReSell Hub was incredibly smooth, and it's great to earn extra cash while promoting sustainability.",
        rating: 4
    },
    {
        id: 4,
        name: "Manik chandra Dey",
        src: "https://lh3.googleusercontent.com/a/ACg8ocJVbNPF15v8Pf3Ay-eEIoVDRSZ5aoaJ7tyZ2LD3nDGQwJ2rvWc=s96-c",
        role: "buyer",
        location: "Dhaka",
        item: "Canon EOS 80D Camera",
        story: "I was highly skeptical about buying gear online, but the verified listing details and secure payment status for my order gave me total confidence. Excellent platform for tech enthusiasts!",
        rating: 5
    }
];

export default function SuccessStories() {

    const [filter, setFilter] = useState("all");
    const filteredStories = stories.filter(story => {
        if (filter === "all") return true;
        return story.role === filter;
    });

    return (
        <div className="min-h-screen bg-white text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
                    Stories of Happy Buyers & Sellers
                </h1>
                <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                    See how thousands of users are safely trading pre-owned products, reducing waste, and making smart choices on ReSell Hub.
                </p>
            </div>

            <div className="flex justify-center gap-2 mb-12">
                <button type="button" className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 
                ${filter === "all" ? "bg-slate-950 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    onClick={() => setFilter("all")}>All Stories
                </button>
                <button type="button" className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 
                ${filter === "buyer" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} onClick={() => setFilter("buyer")}>
                    Buyers
                </button>
                <button type="button" className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 
                ${filter === "seller" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} onClick={() => setFilter("seller")}>
                    Sellers
                </button>
            </div>

            {/* Grid Layout for Stories */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.map((story) => (
                    <div key={story.id}
                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    >
                        {/* Top Section: Role Badge & Quote Icon */}
                        <div className="flex justify-between items-center mb-6">
                            {story.role === "seller" ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md">
                                    <FaHandshake /> Verified Seller
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-md">
                                    <FaShoppingBag /> Happy Buyer
                                </span>
                            )}
                            <FaQuoteLeft className="text-slate-200 text-xl" />
                        </div>

                        {/* Story Content */}
                        <div className="flex-grow mb-6">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Product: {story.item}
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {story.story}
                            </p>
                        </div>

                        {/* User Profile Footer */}
                        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Avatar Image Container */}
                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                    <Image src={story.src} alt={story.name}  fill  sizes="32px"  className="object-cover"/>
                                    
                                </div>

                                {/* User Details */}
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-800">{story.name}</span>
                                    <span className="text-[10px] text-slate-400">{story.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-400">
                                <FaStar className="w-3 h-3" />
                                <span className="text-xs font-bold text-slate-700 ml-0.5">{story.rating}.0</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

           
        </div>
    );
}