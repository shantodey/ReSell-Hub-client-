"use client";

import React from "react";
import { Card, Button, Avatar } from "@heroui/react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
    const { title, category, condition, price, images, sellerInfo ,_id } = product;
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const { name, image } = session?.user || {};
    return (
        <Card className="w-full bg-white border border-slate-200 rounded-2xl p-0 shadow-none hover:shadow-lg transition-shadow">

            <div className="relative p-3 pb-0">
                <div className="absolute top-5 left-5 z-10 flex gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">{category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">{condition}</span>
                </div>
                <Image width={100} height={100} src={images[0]} alt={title} className="w-full h-48 object-cover rounded-xl" />
            </div>

            <div className="p-4 pt-3">
                <h3 className="font-bold text-slate-900 truncate">{title}</h3>
                <p className="text-blue-600 font-black text-lg my-1">৳{price.toLocaleString()}</p>

                <div className="flex items-center justify-between border-t pt-3 mt-2">
                    <div className="flex items-center gap-2">
                        <Avatar size="xxl" className="relative overflow-hidden">
                            {isPending ? (<div className="size-full animate-pulse bg-slate-200" />) : image ? (
                                <Image src={image} alt={name || "User Avatar"} fill sizes="80px" className="rounded-full object-cover" />
                            ) :
                                (<Avatar.Fallback>{name?.charAt(0).toUpperCase()}</Avatar.Fallback>)}
                        </Avatar>
                        <span className="text-xs font-bold text-slate-600 capitalize">{name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaStar className="text-amber-400 w-3 h-3" />
                        <span className="text-xs font-bold">4.8</span>
                    </div>
                </div>

                <Link color="primary" href={`/prodect/${_id}`}>
                    <Button fullWidth className="mt-4 bg-blue-50 text-blue-600 font-bold text-xs h-9">View Details</Button>
                </Link>
                
            </div>
        </Card>
    );
}