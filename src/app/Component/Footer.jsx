"use client";

import React from 'react';
import { Link } from '@heroui/react';
import { motion } from "motion/react"
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { LuStore } from 'react-icons/lu';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};


const Footer = () => {
    const quickLinks = ['Home', 'Products', 'Categories', 'Dashboard', 'About Us', 'Contact Us'];
    const buyerLinks = ['How to Buy', 'Payment & Refund', 'Buyer Protection', 'Help Center', 'Terms & Conditions', 'Privacy Policy'];
    const sellerLinks = ['How to Sell', 'Seller Guidelines', 'Manage Products', 'Seller Support', 'Fees & Charges'];
    return (
        <footer className="w-full bg-[#030f1e] text-slate-300 pt-16 pb-8 border-t border-slate-800/60 overflow-hidden">
            <motion.div
                className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={footerVariants}
            >
                {/* Column 1: Brand Info */}
                <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-md shadow-emerald-900/30">
                            <LuStore className="text-xl" />
                        </div>
                        <div>
                            <span className="text-xl font-black text-white tracking-wide">ReSell Hub</span>
                            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5 tracking-wider">Buy. Sell. Repeat. Sustain.</p>
                        </div>
                    </div>

                    <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-60">
                        A community marketplace for buying and selling quality pre-owned products.
                    </p>

                    {/* Social Icons with Smooth Hover Effect */}
                    <div className="flex items-center gap-3 pt-2">
                        {[
                            { icon: <FaFacebookF />, href: "#" },
                            { icon: <FaInstagram />, href: "#" },
                            { icon: <FaTwitter />, href: "#" },
                            { icon: <FaLinkedinIn />, href: "#" },
                            { icon: <FaGithub />, href: "#" }
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                whileHover={{ scale: 1.15, backgroundColor: '#059669', color: '#ffffff' }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 text-sm transition-colors duration-200 border border-slate-700/50"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Column 2: Quick Links */}
                <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col">
                    <h3 className="text-white font-bold text-base mb-4 tracking-wide">Quick Links</h3>
                    <ul className="space-y-2.5">
                        {quickLinks.map((link) => (
                            <li key={link}>
                                <Link
                                    href="#"
                                    className="text-slate-400 hover:text-white text-sm font-medium transition-all duration-200 block hover:translate-x-1"
                                >
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Column 3: For Buyers */}
                <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col">
                    <h3 className="text-white font-bold text-base mb-4 tracking-wide">For Buyers</h3>
                    <ul className="space-y-2.5">
                        {buyerLinks.map((link) => (
                            <li key={link}>
                                <Link
                                    href="#"
                                    className="text-slate-400 hover:text-white text-sm font-medium transition-all duration-200 block hover:translate-x-1"
                                >
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Column 4: For Sellers */}
                <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col">
                    <h3 className="text-white font-bold text-base mb-4 tracking-wide">For Sellers</h3>
                    <ul className="space-y-2.5">
                        {sellerLinks.map((link) => (
                            <li key={link}>
                                <Link
                                    href="#"
                                    className="text-slate-400 hover:text-white text-sm font-medium transition-all duration-200 block hover:translate-x-1"
                                >
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Column 5: Contact Us */}
                <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col">
                    <h3 className="text-white font-bold text-base mb-4 tracking-wide">Contact Us</h3>
                    <ul className="space-y-3.5">
                        <li className="flex items-start gap-3 group">
                            <FiMapPin className="text-emerald-500 mt-1 shrink-0 text-base transition-transform group-hover:scale-110" />
                            <span className="text-slate-400 text-sm font-medium leading-tight group-hover:text-slate-200 transition-colors">
                                Dhaka, Bangladesh
                            </span>
                        </li>
                        <li className="flex items-start gap-3 group">
                            <FiPhone className="text-emerald-500 mt-0.5 shrink-0 text-base transition-transform group-hover:scale-110" />
                            <Link
                                href="tel:+8801712345678"
                                className="text-slate-400 hover:text-slate-200 text-sm font-medium p-0 h-auto leading-tight"
                            >
                                +880 1712-345678
                            </Link>
                        </li>
                        <li className="flex items-start gap-3 group">
                            <FiMail className="text-emerald-500 mt-0.5 shrink-0 text-base transition-transform group-hover:scale-110" />
                            <Link
                                href="mailto:support@resellhub.com"
                                className="text-slate-400 hover:text-slate-200 text-sm font-medium p-0 h-auto leading-tight break-all"
                            >
                                support@resellhub.com
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            </motion.div>

            {/* Bottom Copyright Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                <p>&copy; {new Date().getFullYear()} ReSell Hub. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link href="#" className="text-xs text-slate-500 hover:text-slate-400">Terms</Link>
                    <Link href="#" className="text-xs text-slate-500 hover:text-slate-400">Privacy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

