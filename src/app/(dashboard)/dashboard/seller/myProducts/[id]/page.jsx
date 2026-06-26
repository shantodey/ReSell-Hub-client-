"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { updateProduct } from "@/lib/api/seller/action";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: "", price: 0, quantity: 0, description: "" });
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  useEffect(() => {
    fetch(`http://localhost:5000/app/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        reset({
          title: data.title,
          price: data.price,
          quantity: data.quantity,
          description: data.description
        });
      });
  }, [id, reset]);


const onSubmit = async (data) => {
  // ১. ম্যানুয়ালি একটি পরিষ্কার অবজেক্ট তৈরি করুন
  const cleanData = {
    title: data.title,
    price: Number(data.price),
    quantity: Number(data.quantity),
    description: data.description
  };

  // ২. এখন শুধু পরিষ্কার ডেটাটি পাঠান
  try {
    const result = await updateProduct(id, cleanData);
    
    if (result.success) {
      toast.success("Updated successfully!");
      setIsModalOpen(false);
      // প্রোডাক্ট আপডেট হলে লিস্ট রিফ্রেশ করার জন্য প্রোডাক্ট স্টেট আপডেট করুন
      setProduct((prev) => ({ ...prev, ...cleanData }));
    } else {
      toast.error(result.message || "Failed to update");
    }
  } catch (err) {
    console.error(err);
    toast.error("An error occurred during update");
  }
};
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5000/app/product/${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          toast.success("Product deleted successfully");
          router.push("/dashboard/seller/myProducts");
        } else {
          toast.error(result.message || "Something went wrong");
        }
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  if (!product) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* মেইন কার্ড */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-8">
        <div className="grid md:grid-cols-2 gap-10">
          <img src={product.images[0]} alt={product.title} className="w-full h-80 object-cover rounded-xl shadow-md" />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900">{product.title}</h1>
            <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
            <div className="mt-6 space-y-2">
              <p className="text-2xl font-bold text-blue-600">Price: ৳{product.price}</p>
              <p className="text-lg text-gray-700">Stock: <span className="font-semibold">{product.quantity}</span> items</p>
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all">
                Edit Product
              </button>
              <button onClick={handleDelete} className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-2.5 rounded-lg transition-all">
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind কাস্টম মডাল */}
      {isModalOpen && (
        <form onSubmit={handleSubmit(onSubmit)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input {...register("title", { required: "Title is required" })} className="w-full border p-2.5 rounded-lg" />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Price</label>
                  <input type="number" {...register("price", { required: "Required" })} className="w-full border p-2.5 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Quantity</label>
                  <input type="number" {...register("quantity", { required: "Required" })} className="w-full border p-2.5 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea {...register("description")} className="w-full border p-2.5 rounded-lg h-24" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg">Save Changes</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductDetailsPage;