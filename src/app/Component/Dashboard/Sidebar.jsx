"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { FiGrid, FiShoppingBag, FiHeart, FiCreditCard, FiUser, FiPlusCircle, FiLayers, FiCheckSquare, FiPieChart, FiUsers, FiMenu, FiX } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client';
import { usePathname } from 'next/navigation';
import SidebarContent from './SidebarContent';

const Sidebar = () => {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const buyerMenuItems = [
        { id: 'Overview', label: 'Overview', icon: <FiGrid className="text-lg" />, path: '/dashboard/buyer' },
        { id: 'My Orders', label: 'My Orders', icon: <FiShoppingBag className="text-lg" />, path: '/dashboard/buyer/my-orders' },
        { id: 'Wishlist', label: 'Wishlist', icon: <FiHeart className="text-lg" />, path: '/dashboard/buyer/wishlist' },
        { id: 'Payment History', label: 'Payment History', icon: <FiCreditCard className="text-lg" />, path: '/dashboard/buyer/payments' },
        { id: 'Profile Management', label: 'Profile Settings', icon: <FiUser className="text-lg" />, path: '/dashboard/buyer/profile' },
    ];

    const sellerMenuItems = [
        { id: 'Overview', label: 'Overview', icon: <FiGrid className="text-lg" />, path: '/dashboard/seller' },
        { id: 'Add Product', label: 'Add Product', icon: <FiPlusCircle className="text-lg" />, path: '/dashboard/seller/addProduct' },
        { id: ' My Products', label: 'My Products', icon: <FiLayers className="text-lg" />, path: '/dashboard/seller/myProducts' },
        { id: 'Manage Orders', label: 'Manage Orders', icon: <FiCheckSquare className="text-lg" />, path: '/dashboard/seller/manageOrders' },
        { id: 'Sales Analytics', label: 'Sales Analytics', icon: <FiPieChart className="text-lg" />, path: '/dashboard/seller/analytics' },
        { id: 'Profile Management', label: 'Profile Settings', icon: <FiUser className="text-lg" />, path: '/dashboard/seller/profile' },
    ];

    const adminMenuItems = [
        { id: 'Overview', label: 'Overview', icon: <FiGrid className="text-lg" />, path: '/dashboard/admin' },
        { id: 'Manage Users', label: 'Manage Users', icon: <FiUsers className="text-lg" />, path: '/dashboard/admin/manage-users' },
        { id: 'Manage Products', label: 'Manage Products', icon: <FiLayers className="text-lg" />, path: '/dashboard/admin/manage-products' },
        { id: 'Platform Analytics', label: 'Platform Analytics', icon: <FiPieChart className="text-lg" />, path: '/dashboard/admin/analytics' },
    ];

    const { data: session, isPending } = authClient.useSession();
    const { name, role, image } = session?.user || {};
    const menuItems = (role === "seller" ? sellerMenuItems : role === "buyer" ? buyerMenuItems : role === "admin" ? adminMenuItems : []) || [];

    const logOut = async () => {
        await authClient.signOut();
    };

    const sharedData = { menuItems, pathname, isPending, image, name, role, logOut };

    return (
        <>
            <aside className="hidden md:flex w-64 h-screen bg-white border-r border-slate-200/80 flex-col justify-between shadow-sm select-none">
                <SidebarContent {...sharedData} />
            </aside>
            <button  type="button"  onClick={() => setIsMobileOpen(true)} aria-label="Open menu"
                className="md:hidden fixed top-4 left-4 z-40 flex items-center justify-center size-11 rounded-xl bg-white border border-slate-200/80 shadow-sm text-slate-700 active:scale-95 transition-transform"
            >
                <FiMenu className="text-xl" />
            </button>
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div key="sidebar-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}  transition={{ duration: 0.2 }}  onClick={() => setIsMobileOpen(false)}  className="md:hidden fixed inset-0 z-40 bg-slate-900/40" />
                        <motion.aside key="sidebar-drawer"  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="md:hidden fixed inset-y-0 left-0 z-50 w-64 h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between shadow-xl select-none">
                            <button type="button" onClick={() => setIsMobileOpen(false)} aria-label="Close menu"
                                className="absolute top-5 right-3 z-10 flex items-center justify-center size-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                <FiX className="text-lg" />
                            </button>
                            <SidebarContent {...sharedData} onNavigate={() => setIsMobileOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;