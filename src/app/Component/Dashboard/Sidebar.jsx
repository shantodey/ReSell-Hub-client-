    "use client";

    import React, { useState } from 'react';
    import { Avatar, Chip } from '@heroui/react';
    import { motion } from "motion/react"
    import { FiGrid, FiShoppingBag, FiHeart, FiCreditCard, FiUser, FiLogOut, FiChevronRight, FiPlusCircle, FiLayers, FiCheckSquare, FiPieChart, FiUsers, FiAlertTriangle } from 'react-icons/fi';
    import { authClient } from '@/lib/auth-client';
    import Link from 'next/link';
    const Sidebar = () => {
        const [activeItem, setActiveItem] = useState('Overview');
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
            { id: 'Manage Orders', label: 'Manage Orders', icon: <FiShoppingBag className="text-lg" />, path: '/dashboard/admin/manage-orders' },
            { id: 'Platform Analytics', label: 'Platform Analytics', icon: <FiPieChart className="text-lg" />, path: '/dashboard/admin/analytics' },
            { id: 'Reported Products', label: 'Reported Products', icon: <FiAlertTriangle className="text-lg" />, path: '/dashboard/admin/reports' },
        ];
        const { data: session, isPending } = authClient.useSession();
        const { name, role, image } = session?.user || {};
        const menuItems = (role === "seller" ? sellerMenuItems :  role === "buyer" ? buyerMenuItems :   role === "admin" ? adminMenuItems : []) || [];
        const logOut = async () => {
            await authClient.signOut();
        }
        return (
            <aside className="w-64 h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between shadow-sm select-none">
                <div>
                    <div className="h-20 flex items-center px-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-200"> R</div>
                            <span className="text-xl font-black tracking-tight text-slate-900">
                                ReSell<span className="text-blue-600">Hub</span>
                            </span>
                        </div>
                    </div>
                    <div className="px-4 py-6 border-b border-slate-100 flex items-center gap-3.5 bg-slate-50/50">
                        <Avatar size="xxl">
                            <Avatar.Image alt={name} src={image} />
                            <Avatar.Fallback>fallback={name?.charAt(0)}</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-slate-800 uppercase leading-tight">{name}</span>
                            <Chip size="sm" className="bg-blue-50 text-blue-600 capitalize font-semibold text-[11px] px-2 h-5 border border-blue-100" >
                                {role}
                            </Chip>
                        </div>
                    </div>

                    {/* Navigation Menu Items */}
                    <nav className="px-3 py-6 space-y-1.5">
                        {menuItems.map((item) => {
                            const isActive = activeItem === item.id;
                            return (
                                <Link key={item.id} href={item.path} onClick={() => setActiveItem(item.id)}
                                    className="w-full relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group outline-none"
                                >
                                    {isActive && (
                                        <motion.div layoutId="activeSideNav" className="absolute inset-0 bg-blue-50/80 border border-blue-100/50 rounded-xl -z-10"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}

                                    <div className={`flex items-center gap-3 transition-colors ${isActive ? 'text-blue-600 font-bold'
                                        : 'text-slate-500 group-hover:text-slate-800'}`}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>

                                    {isActive && (
                                        <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.2 }} >
                                            <FiChevronRight className="text-blue-600 text-base" />
                                        </motion.div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-4 border-t border-slate-100">
                    <motion.button whileHover={{ scale: 1.01, backgroundColor: '#fff5f5' }} whileTap={{ scale: 0.99 }}
                        onClick={logOut}
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

