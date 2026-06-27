"use client";

import React, { useState } from "react";
import { FaQuoteLeft, FaHandshake, FaShoppingBag, FaStar } from "react-icons/fa";

// Sample success stories data in English
const stories = [
    {
        id: 1,
        name: "Arif Rahman",
        role: "seller",
        location: "Dhaka",
        item: "Asus ROG Gaming Laptop",
        story: "I listed my old gaming laptop on ReSell Hub and found a genuine buyer within just 3 days! The platform's security and seller guidelines made the transaction completely hassle-free.",
        rating: 5
    },
    {
        id: 2,
        name: "Farjana Akter",
        role: "buyer",
        location: "Chittagong",
        item: "Canon EOS 80D Camera",
        story: "I wanted a good camera to start my photography journey but had a tight budget. Found a mint condition DSLR here at an unbeatable price. ReSell Hub helped me achieve my dream!",
        rating: 5
    },
    {
        id: 3,
        name: "Tanvir Ahmed",
        role: "seller",
        location: "Sylhet",
        item: "Mechanical Keyboard & Mouse",
        story: "After upgrading my setup, my old tech was gathering dust. Selling them on ReSell Hub was incredibly smooth, and it's great to earn extra cash while promoting sustainability.",
        rating: 4
    },
    {
        id: 4,
        name: "Rahat Kabir",
        role: "buyer",
        location: "Dhaka",
        item: "iPhone 13 Pro Max",
        story: "I was highly skeptical about buying used phones online. However, the verified details and transparent communication with the seller gave me total confidence. Highly recommended!",
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
                <button 
                    type="button"
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                        filter === "all" 
                            ? "bg-slate-950 text-white shadow-sm" 
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    onClick={() => setFilter("all")}
                >
                    All Stories
                </button>
                <button 
                    type="button"
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                        filter === "buyer" 
                            ? "bg-blue-600 text-white shadow-sm" 
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    onClick={() => setFilter("buyer")}
                >
                    Buyers
                </button>
                <button 
                    type="button"
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                        filter === "seller" 
                            ? "bg-emerald-600 text-white shadow-sm" 
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    onClick={() => setFilter("seller")}
                >
                    Sellers
                </button>
            </div>

            {/* Grid Layout for Stories */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.map((story) => (
                    <div 
                        key={story.id} 
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
                                {/* Fallback Initial Avatar Container */}
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 uppercase">
                                    {story.name.charAt(0)}
                                </div>
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

            {/* White-Themed CTA Section */}
            <div className="max-w-4xl mx-auto text-center mt-24 border border-slate-200 rounded-3xl p-8 sm:p-12 bg-slate-50">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                    Have a story to share?
                </h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm">
                    Tell us about your experience buying or selling on ReSell Hub and inspire others in building a sustainable marketplace.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <button 
                        type="button" 
                        className="bg-slate-950 text-white font-bold text-xs h-10 px-6 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        Share Your Story
                    </button>
                    <button 
                        type="button" 
                        className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 font-bold text-xs h-10 px-6 rounded-xl transition-colors"
                    >
                        Start Trading
                    </button>
                </div>
            </div>
        </div>
    );
}