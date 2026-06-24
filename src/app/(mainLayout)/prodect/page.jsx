"use client";

import ProductCard from "@/app/Component/ProductCard";
import React from "react";

// এই ডেমো ডেটা API থেকে আসবে
const mockProducts = [
  {
    _id: "p1",
    title: "Used Dell Inspiron 15 Laptop",
    category: "Electronics",
    condition: "Good",
    price: 35000,
    images: ["https://i.ibb.co/kgjzHgDG/449604490-1184540076081188-7130218558596987341-n.jpg"],
    sellerInfo: { name: "Nusrat Jahan" }
  }
];

export default function AllProductsPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-slate-900">Available Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}