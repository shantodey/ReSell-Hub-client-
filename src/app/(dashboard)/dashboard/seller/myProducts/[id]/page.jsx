"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { deleteProduct, getProductDetails, updateProduct } from "@/lib/api/seller/action";
import Image from "next/image";

const ProductDetailsPage = ({ params }) => {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!id) return;
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        reset({
          title: data.title,
          price: data.price,
          quantity: data.quantity,
          description: data.description
        });
      })
      .catch((err) => {
        toast.error("Error loading product data");
      });
  }, [id, reset]);


  // updating prodect
  const onSubmit = async (data) => {
    const cleanData = {
      title: data.title.trim(),
      price: Number(data.price),
      quantity: Number(data.quantity),
      description: data.description?.trim()
    };

    try {
      setLoading(true);
      const result = await updateProduct(id, cleanData);

      if (result && result.success) {
        toast.success("Updated successfully!");
        setIsModalOpen(false);
        // UI স্টেট সঙ্গে সঙ্গে আপডেট করা
        setProduct((prev) => ({ ...prev, ...cleanData }));
      } else {
        toast.error(result?.message || "Failed to update product");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("An error occurred during update");
    } finally {
      setLoading(false);
    }
  };

  // delete prodecu data
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProduct(id)
        if (response.success) {
          toast.success("Product deleted successfully");
          router.push("/dashboard/seller/myProducts");
        } else {
          toast.error(response.message || "Something went wrong");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete product");
      }
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen gap-2">
        <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-slate-600 font-medium">Loading details...</span>
      </div>
    );
  }

  return (
   <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
  {/* মেইন প্রোডাক্ট কার্ড ভিউ */}
  <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/50 overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8">
      
      {/* বাম পাশ: ইমেজ সেকশন */}
      <div className="md:col-span-5 flex flex-col gap-4">
        <div className="relative w-full aspect-square md:h-auto md:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group">
          <Image
            src={product.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      <div className="md:col-span-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-md text-xs font-semibold tracking-wide uppercase bg-slate-100 text-slate-700">
              {product.category || "General"}
            </span>
          </div>


          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
            {product.title}
          </h1>


          <div className="mt-4 border-t border-slate-50 pt-4">
            {!product.description || product.description.trim() === "" ? (
              <p className="text-slate-400 text-sm italic">No description available for this product.</p>
            ) : (
              <div className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {product.description.length > 300 && !showFullDesc ? (
                  <>
                    {product.description.slice(0, 300)}...
                    <button 
                      onClick={() => setShowFullDesc(true)}
                      className="text-blue-600 hover:text-blue-700 font-semibold inline-block ml-1 focus:outline-none"
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  <>
                    {product.description}
                    {product.description.length > 300 && (
                      <button 
                        onClick={() => setShowFullDesc(false)}
                        className="text-blue-600 hover:text-blue-700 font-semibold inline-block ml-1 focus:outline-none"
                      >
                        Show Less
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="grid grid-cols-2 gap-4 bg-slate-50/70 p-4 rounded-2xl mb-6">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Price</p>
              <p className="text-2xl font-extrabold text-blue-600 mt-0.5">৳{product.price?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Stock Status</p>
              {product.quantity > 0 ? (
                <p className="text-sm font-semibold text-slate-900 mt-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {product.quantity} <span className="text-slate-500 font-normal">items available</span>
                </p>
              ) : (
                <p className="text-sm font-semibold text-red-600 mt-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Out of Stock
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Edit Product
            </button>
            <button 
              onClick={handleDelete} 
              className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              Delete Product
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>


  {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl transition-all duration-200"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Edit Product Details</h2>
          <button 
            type="button" 
            onClick={() => setIsModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-lg focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Product Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none text-slate-900 transition-all text-sm"
            />
            {errors.title && <span className="text-red-500 text-xs mt-1 block">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Price (৳)</label>
              <input
                type="number"
                {...register("price", { required: "Price is required", min: { value: 1, message: "Min price 1" } })}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none text-slate-900 transition-all text-sm"
              />
              {errors.price && <span className="text-red-500 text-xs mt-1 block">{errors.price.message}</span>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Stock Quantity</label>
              <input
                type="number"
                {...register("quantity", { required: "Quantity is required", min: { value: 0, message: "Min quantity 0" } })}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none text-slate-900 transition-all text-sm"
              />
              {errors.quantity && <span className="text-red-500 text-xs mt-1 block">{errors.quantity.message}</span>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Description</label>
            <textarea
              {...register("description")}
              placeholder="Write something about your product..."
              className="w-full border border-slate-200 p-3 rounded-xl h-32 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none text-slate-900 transition-all text-sm resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 border-t border-slate-50 pt-4">
          <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors" disabled={loading} >
            Cancel
          </button>
          <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-blue-500/10"
            disabled={loading} >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )}
</div>
  );
};

export default ProductDetailsPage;