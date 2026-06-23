"use client";

import React, { useState } from 'react';
import { Avatar, Chip } from '@heroui/react';
import { motion } from "motion/react"
import { FiGrid, FiShoppingBag, FiHeart, FiCreditCard, FiUser, FiLogOut, FiChevronRight } from 'react-icons/fi';
const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Overview');

    const menuItems = [
        { id: 'Overview', label: 'Overview', icon: <FiGrid className="text-lg" /> },
        { id: 'My Orders', label: 'My Orders', icon: <FiShoppingBag className="text-lg" /> },
        { id: 'Wishlist', label: 'Wishlist', icon: <FiHeart className="text-lg" /> },
        { id: 'Payments', label: 'Payments', icon: <FiCreditCard className="text-lg" /> },
        { id: 'Profile', label: 'Profile', icon: <FiUser className="text-lg" /> },
    ];
    return (
        <aside className="w-64 h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between shadow-sm select-none">
            <div>
                <div className="h-20 flex items-center px-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        {/* Logo Icon Box */}
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-200">
                            R
                        </div>
                        {/* Logo Text */}
                        <span className="text-xl font-black tracking-tight text-slate-900">
                            ReSell<span className="text-blue-600">Hub</span>
                        </span>
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="px-4 py-6 border-b border-slate-100 flex items-center gap-3.5 bg-slate-50/50">
                    <Avatar
                        name="GU"
                        className="w-11 h-11 text-sm font-bold bg-indigo-600 text-white shadow-sm"
                    />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-slate-800 leading-tight">Google User</span>
                        <Chip
                            size="sm"
                            className="bg-blue-50 text-blue-600 font-semibold text-[11px] px-2 h-5 border border-blue-100"
                        >
                            Buyer
                        </Chip>
                    </div>
                </div>

                {/* Navigation Menu Items */}
                <nav className="px-3 py-6 space-y-1.5">
                    {menuItems.map((item) => {
                        const isActive = activeItem === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveItem(item.id)}
                                className="w-full relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group outline-none"
                            >
                                {/* Active Background Animation via Framer Motion */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSideNav"
                                        className="absolute inset-0 bg-blue-50/80 border border-blue-100/50 rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}

                                <div className={`flex items-center gap-3 transition-colors ${isActive ? 'text-blue-600 font-bold' : 'text-slate-500 group-hover:text-slate-800'}`}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>

                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FiChevronRight className="text-blue-600 text-base" />
                                    </motion.div>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section: Sign Out */}
            <div className="p-4 border-t border-slate-100">
                <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: '#fff5f5' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => console.log('Logging out...')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors duration-200 outline-none"
                >
                    <FiLogOut className="text-lg rotate-180" />
                    <span>Sign Out</span>
                </motion.button>
            </div>

        </aside>
    );
};

export default Sidebar;

