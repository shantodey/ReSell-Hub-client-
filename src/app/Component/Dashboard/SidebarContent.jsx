import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Chip, Avatar } from '@heroui/react';
import { motion } from "motion/react";
import { FiChevronRight, FiLogOut } from 'react-icons/fi';
import logo from '../../../assets/logo.png'; 

const SidebarContent = ({ onNavigate, menuItems, pathname, isPending, image, name, role, logOut }) => {
    return (
        <>
            <div className="flex flex-col flex-1 overflow-y-auto">
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-center px-6 border-b border-slate-100 shrink-0">
                    <Link href={'/'} className="flex items-center gap-3">
                        <Image src={logo} alt='logo' height={40} width={70} priority />
                    </Link>
                </div>

                {/* Profile Section */}
                <div className="px-4 py-6 border-b border-slate-100 flex items-center gap-3.5 bg-slate-50/50 shrink-0">
                    <Avatar size="xxl" className="relative overflow-hidden">
                        {isPending ? (
                            <div className="size-full animate-pulse bg-slate-200" />
                        ) : image ? (
                            <Image src={image} alt={name || "User Avatar"} fill sizes="80px" className="rounded-full object-cover" />
                        ) : (
                            <Avatar.Fallback>{name?.charAt(0).toUpperCase()}</Avatar.Fallback>
                        )}
                    </Avatar>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="text-sm font-bold text-slate-800 uppercase leading-tight truncate">{name}</span>
                        <Chip size="sm" className="bg-blue-50 text-blue-600 capitalize font-semibold text-[11px] px-2 h-5 border border-blue-100 w-fit" >
                            {role}
                        </Chip>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="px-3 py-6 space-y-1.5 flex-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.id}
                                href={item.path}
                                onClick={() => {
                                    onNavigate && onNavigate();
                                }}
                                className="w-full relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group outline-none"
                            >
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
                                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} >
                                        <FiChevronRight className="text-blue-600 text-base" />
                                    </motion.div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Sign Out Section */}
            <div className="p-4 border-t border-slate-100 shrink-0">
                <motion.button 
                    whileHover={{ scale: 1.01, backgroundColor: '#fff5f5' }} 
                    whileTap={{ scale: 0.99 }}
                    onClick={logOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors duration-200 outline-none"
                >
                    <FiLogOut className="text-lg rotate-180" />
                    <span>Sign Out</span>
                </motion.button>
            </div>
        </>
    );
};

export default SidebarContent;