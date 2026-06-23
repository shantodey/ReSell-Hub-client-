"use client";

import React from 'react';
import { Button } from '@heroui/react';
import { motion } from "motion/react"
import { FiArrowRight, FiTag, FiCheckCircle, FiUsers, FiBox, FiShoppingBag } from 'react-icons/fi';
import { IoLeafOutline } from 'react-icons/io5';
import Image from 'next/image';

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
    const stats = [
        { id: 1, value: '12,000+', label: 'Products Listed', icon: <FiBox className="text-blue-600 text-lg" />, bg: 'bg-blue-50' },
        { id: 2, value: '3,500+', label: 'Verified Sellers', icon: <FiCheckCircle className="text-pink-500 text-lg" />, bg: 'bg-pink-50' },
        { id: 3, value: '8,000+', label: 'Happy Buyers', icon: <FiUsers className="text-indigo-600 text-lg" />, bg: 'bg-indigo-50' },
        { id: 4, value: '15,000+', label: 'Orders Completed', icon: <FiShoppingBag className="text-emerald-600 text-lg" />, bg: 'bg-emerald-50' },
    ];
    return (
        <section className="relative w-full min-h-[650px] bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden py-12 lg:py-20 px-4 md:px-8 max-w-7xl mx-auto flex items-center">
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="lg:col-span-5 flex flex-col space-y-6 z-10">

                    {/* Sustainable Badge */}
                    <motion.div variants={fadeInUp} className="flex">
                        <div className="inline-flex items-center gap-2 bg-emerald-50/80 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200/60 shadow-sm">
                            <IoLeafOutline className="text-sm text-emerald-600 animate-pulse" />
                            <span>Sustainable Marketplace</span>
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]"
                    >
                        Buy & Sell Quality <br />
                        Pre-Owned Products <br />
                        With <span className="text-emerald-600 relative inline-block">Confidence</span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-slate-600 text-base md:text-lg max-w-md font-medium leading-relaxed"
                    >
                        Join thousands of smart buyers and trusted sellers in our community marketplace.
                    </motion.p>

                    {/* Call to Actions (Hero UI Components) */}
                    <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
                        <Button
                            variant="primary"
                            size="lg"
                            className="bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition-all rounded-xl px-6 py-3.5"
                            onPress={() => console.log('Navigate to Products')}
                        >
                            Explore Products <FiArrowRight className="ml-1 text-lg" />
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-slate-200 text-blue-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all rounded-xl px-6 py-3.5 bg-white shadow-sm"
                            onPress={() => console.log('Navigate to Selling Flow')}
                        >
                            <FiTag className="mr-1 text-lg" /> Start Selling
                        </Button>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-2 gap-3.5 pt-6 border-t border-slate-100"
                    >
                        {stats.map((stat) => (
                            <div
                                key={stat.id}
                                className="flex items-center gap-3 bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300"
                            >
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
                        <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="absolute top-12 right-[20%] z-20">
                        <div className="w-11 h-11 rounded-full border-2 border-emerald-400 shadow-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="absolute top-[35%] right-2 z-20 flex items-center gap-1 bg-white p-1.5 rounded-full shadow-xl border border-slate-100 text-xs font-bold px-2.5">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="User" className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-amber-500">⭐ 5.0</span>
                    </div>

                    {/* Smooth Floating Group for Products */}
                    <motion.div
                        className="relative w-full h-full flex items-center justify-center"
                        variants={floatingAnimation}
                        animate="animate"
                    >
                        
                        <img   src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80" alt="Armchair" className="absolute w-[260px] md:w-[340px] object-contain drop-shadow-2xl translate-x-12 -translate-y-8 opacity-95" />

                        {/* Laptop */}
                        <img
                            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80"
                            alt="Laptop"
                            className="absolute w-[230px] md:w-[290px] object-contain drop-shadow-xl -translate-x-24 translate-y-12 z-10"
                        />

                        {/* iPhone */}
                        <img
                            src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80"
                            alt="iPhone"
                            className="absolute w-[110px] md:w-[140px] object-contain drop-shadow-2xl translate-x-16 translate-y-4 z-10 rotate-6"
                        />

                        {/* DSLR Camera */}
                        <img
                            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80"
                            alt="Camera"
                            className="absolute w-[130px] md:w-[170px] object-contain drop-shadow-2xl -translate-x-4 translate-y-28 z-20"
                        />

                        {/* Smart Watch */}
                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80"
                            alt="Smartwatch"
                            className="absolute w-[85px] md:w-[105px] object-contain drop-shadow-xl translate-x-28 translate-y-28 z-30 -rotate-12"
                        />

                        {/* Controller */}
                        <img
                            src="https://images.unsplash.com/photo-1600080972464-8e5f3580211a?w=200&q=80"
                            alt="Controller"
                            className="absolute w-[95px] md:w-[125px] object-contain drop-shadow-2xl translate-x-44 translate-y-16 z-20 rotate-12"
                        />

                        {/* Plant */}
                        <img
                            src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=200&q=80"
                            alt="Plant"
                            className="absolute w-[90px] md:w-[120px] object-contain drop-shadow-lg translate-x-56 translate-y-10 z-10"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSectionPage;



