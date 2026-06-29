"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { FiArrowRight, FiTag, FiCheckCircle, FiUsers, FiBox, FiShoppingBag } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProductsHero } from '@/lib/api/prodectData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
};

const floatingAnimation = {
    animate: {
        y: [0, -12, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

const HeroSectionPage = () => {
    const [approvedCount, setApprovedCount] = useState(0);

    useEffect(() => {
        const fetchProductCount = async () => {
            const data = await getAllProductsHero();
            if (data && Array.isArray(data)) {
                const approvedProducts = data.filter(product =>
                    product.status && product.status.trim() === 'approved'
                );
                setApprovedCount(approvedProducts.length);
            }
        };

        fetchProductCount();
    }, []);

    const stats = [
        { id: 1, value: `${approvedCount.toLocaleString()}+`, label: 'Products Listed', icon: <FiBox className="text-blue-600 text-lg" />, bg: 'bg-blue-50' },
        { id: 2, value: '3,500+', label: 'Verified Sellers', icon: <FiCheckCircle className="text-pink-500 text-lg" />, bg: 'bg-pink-50' },
        { id: 3, value: '8,000+', label: 'Happy Buyers', icon: <FiUsers className="text-indigo-600 text-lg" />, bg: 'bg-indigo-50' },
        { id: 4, value: '15,000+', label: 'Orders Completed', icon: <FiShoppingBag className="text-emerald-600 text-lg" />, bg: 'bg-emerald-50' },
    ];
    return (
        <section className="relative w-full min-h-[650px] bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden py-12 lg:py-20 px-4 md:px-8 max-w-7xl mx-auto flex items-center">
            <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full" initial="hidden" animate="visible" variants={containerVariants} >
                <div className="lg:col-span-5 flex flex-col space-y-6 z-10">

                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]" >
                        Buy & Sell Quality <br />
                        Pre-Owned Products <br />
                        With <span className="text-emerald-600 relative inline-block">Confidence</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-slate-600 text-base md:text-lg max-w-md font-medium leading-relaxed">
                        Join thousands of smart buyers and trusted sellers in our community marketplace.
                    </motion.p>

                    {/* Call to Actions (Hero UI Components) */}
                    <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">

                        <Link href="/prodect" className="bg-blue-600 text-white font-bold flex items-center shadow-md hover:bg-blue-700 transition-all rounded-xl px-6 py-3.5">
                            Explore Products <FiArrowRight className="ml-1 text-lg" />
                        </Link>
                        <Link href="/dashboard/seller/addProduct" className="border-2 border-slate-200 text-blue-600 font-bold flex items-center hover:bg-slate-50 hover:border-slate-300 transition-all rounded-xl px-6 py-3.5 bg-white shadow-sm">
                            <FiTag className="mr-1 text-lg" /> Start Selling
                        </Link>

                    </motion.div>


                    <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3.5 pt-6 border-t border-slate-100" >
                        {stats.map((stat) => (
                            <div key={stat.id}
                                className="flex items-center gap-3 bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className={`p-2.5 rounded-xl ${stat.bg} flex items-center justify-center shrink-0 shadow-inner`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-lg font-black text-slate-900 leading-none mb-1">{stat.value}</div>
                                    <div className="text-xs font-semibold text-slate-400">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Side: Product & Avatar Composite Graphics */}
                <div className="lg:col-span-7 relative flex items-center justify-center min-h-[450px] lg:min-h-[580px]">
                    {/* Background Blurred Gradient Shape */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-transparent rounded-full filter blur-3xl scale-90 -z-10" />

                    {/* Floating Users/Avatars */}
                    <div className="absolute top-4 left-[15%] z-20">
                        <div className="relative w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="User" fill className="object-cover" sizes="48px" />
                        </div>
                    </div>

                    <div className="absolute top-12 right-[20%] z-20">
                        <div className="relative w-11 h-11 rounded-full border-2 border-emerald-400 shadow-lg overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="User" fill className="object-cover" sizes="44px" />
                        </div>
                    </div>

                    <div className="absolute top-[35%] right-2 z-20 flex items-center gap-1 bg-white p-1.5 rounded-full shadow-xl border border-slate-100 text-xs font-bold px-2.5">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="User" fill className="object-cover" sizes="20px" />
                        </div>
                        <span className="text-amber-500">⭐ 5.0</span>
                    </div>

                    {/* Smooth Floating Group for Products */}
                    <motion.div
                        className="relative w-full h-full flex items-center justify-center"
                        variants={floatingAnimation}
                        animate="animate"
                    >
                        {/* Armchair */}
                        <div className="absolute w-[260px] md:w-[340px] h-[260px] md:h-[340px] translate-x-12 -translate-y-8 opacity-95">
                            <Image src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500" alt="Armchair" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 260px, 340px" />
                        </div>

                        {/* Laptop */}
                        <div className="absolute w-[230px] md:w-[290px] h-[230px] md:h-[290px] -translate-x-24 translate-y-12 z-10">
                            <Image src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" alt="Laptop" fill className="object-contain drop-shadow-xl" sizes="(max-width: 768px) 230px, 290px" priority />
                        </div>

                        {/* iPhone */}
                        <div className="absolute w-[110px] md:w-[140px] h-[200px] md:h-[250px] translate-x-16 translate-y-4 z-10 rotate-6">
                            <Image src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300" alt="iPhone" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 110px, 140px" />
                        </div>

                        {/* DSLR Camera */}
                        <div className="absolute w-[130px] md:w-[170px] h-[130px] md:h-[170px] -translate-x-4 translate-y-28 z-20">
                            <Image src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300" alt="Camera" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 130px, 170px" />
                        </div>

                        {/* Smart Watch */}
                        <div className="absolute w-[85px] md:w-[105px] h-[85px] md:h-[105px] translate-x-28 translate-y-28 z-30 -rotate-12">
                            <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200" alt="Smartwatch" fill className="object-contain drop-shadow-xl" sizes="(max-width: 768px) 85px, 105px" />
                        </div>

                        {/* Controller */}
                        <div className="absolute w-[95px] md:w-[125px] h-[95px] md:h-[125px] translate-x-44 translate-y-16 z-20 rotate-12">
                            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjuGGHQF5hDRefuT_S33yTMWUJRLt2or9EsuEHSTL2vA&s=10" alt="Controller" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 95px, 125px" />
                        </div>

                        {/* Plant */}
                        <div className="absolute w-[90px] md:w-[120px] h-[90px] md:h-[120px] translate-x-56 translate-y-10 z-10">
                            <Image src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=200" alt="Plant" fill className="object-contain drop-shadow-lg" sizes="(max-width: 768px) 90px, 120px" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSectionPage;



