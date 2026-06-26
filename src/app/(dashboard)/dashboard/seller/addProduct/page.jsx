"use client";
import DashboardHeadding from '@/app/Component/Dashboard/DashboardHeadding';
import { useRef, useState } from "react";
import { Form, TextField, InputGroup, Label, FieldError, Button, Spinner } from "@heroui/react";
import { FiPlus, FiTrash2, FiTag, FiDollarSign, FiInfo, FiLayers, FiCamera } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { authClient } from '@/lib/auth-client';
import { addProdectItems } from '@/lib/api/seller/action';

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMG_UPLOAD_API;
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

const ADDProductPage = () => {
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // user data
    const { data: session } = authClient.useSession();
    const { name, email, _id } = session?.user || {};
    const sellerInfo = { userId: _id, name: name,  email: email, phone: "+8801812345678"};

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadError("");
        setIsUploading(true);

        try {
            if (!IMGBB_API_KEY) {
                throw new Error("Image upload API key is missing.");
            }

            // একসাথে মাল্টিপল ইমেজ আপলোড প্রসেস করার জন্য
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (!file.type.startsWith("image/")) {
                    setUploadError("Please upload valid image files only.");
                    continue;
                }

                const formData = new FormData();
                formData.append("image", file);

                const res = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();

                if (res.ok && data?.data?.url) {
                    setImages((prev) => [...prev, data.data.url]);
                } else {
                    setUploadError("Failed to upload one or more images.");
                }
            }
        } catch (err) {
            setUploadError(err.message || "Something went wrong during upload.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = ""; // ইনপুট রিসেট
        }
    };

    const removeImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    // ফর্ম সাবমিশন হ্যান্ডলার
    const onSubmit = async (data) => {
        if (images.length === 0) {
            setFormError("Please upload at least one image for your product.");
            return;
        }

        setIsSubmitting(true);
        setFormError("");

        const payload = {
            title: data.title,
            category: data.category,
            condition: data.condition,
            price: Number(data.price),
            quantity: Number(data.quantity),
            images: images,
            description: data.description,
            sellerInfo: sellerInfo,
            status: "pending"
        };

        try {
            
            const resData=await addProdectItems(payload)
            console.log("Submitting Product Payload:", resData);
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setIsSuccess(true);
            setImages([]);
            reset();
        } catch (err) {
            setFormError(err.message || "Failed to add product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-white px-6">
                <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-slate-100 p-8 text-center shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <FiPlus className="h-6 w-6 rotate-45" /> 
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Product Listed Successfully!</h2>
                    <p className="text-sm text-slate-500">Your product is now live and available for buyers.</p>
                    <Button onClick={() => setIsSuccess(false)} className="mt-2 bg-blue-600 text-white font-semibold rounded-xl">
                        List Another Product
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <section>
            <div className="container">
                <DashboardHeadding title=" Add your product" description=" Add product upload image description etc" />
                <main className="flex min-h-screen items-center justify-center bg-slate-50/50 px-6 py-12">
                    <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">

                        <div className="mb-8">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add New Product</h1>
                            <p className="text-sm text-slate-500 font-medium mt-1">Fill in the details to list your pre-owned item.</p>
                        </div>

                        <Form className="flex w-full flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

                            {/* Product Title */}
                            <TextField isRequired name="title" fullWidth>
                                <Label className="text-sm font-semibold text-slate-700">Product Title</Label>
                                <InputGroup fullWidth className="mt-1.5">
                                    <InputGroup.Prefix><FiTag className="h-4 w-4 text-slate-400" /></InputGroup.Prefix>
                                    <InputGroup.Input
                                        {...register("title", { required: "Product title is required" })}
                                        placeholder="e.g., Used Dell Inspiron 15 Laptop"
                                        className="text-slate-800"
                                    />
                                </InputGroup>
                                {errors.title && <FieldError className="mt-1 text-xs text-rose-600">{errors.title.message}</FieldError>}
                            </TextField>

                            {/* Category & Condition Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Category Dropdown */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                                        <FiLayers className="h-4 w-4 text-slate-400" /> Category
                                    </label>
                                    <select
                                        {...register("category", { required: "Category is required" })}
                                        className="w-full bg-white border border-slate-200 h-10 px-3 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-blue-600 transition-colors"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Vehicles">Vehicles</option>
                                        <option value="Property">Property</option>
                                        <option value="Home Appliances">Home Appliances</option>
                                    </select>
                                    {errors.category && <span className="text-xs text-rose-600 font-medium">{errors.category.message}</span>}
                                </div>

                                {/* Condition Dropdown */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                                        <FiInfo className="h-4 w-4 text-slate-400" /> Condition
                                    </label>
                                    <select
                                        {...register("condition", { required: "Condition is required" })}
                                        className="w-full bg-white border border-slate-200 h-10 px-3 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-blue-600 transition-colors"
                                    >
                                        <option value="">Select Condition</option>
                                        <option value="Excellent">Excellent (Like New)</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                    {errors.condition && <span className="text-xs text-rose-600 font-medium">{errors.condition.message}</span>}
                                </div>
                            </div>

                            {/* Price Input */}
                            <TextField isRequired type="number" name="price" fullWidth>
                                <Label className="text-sm font-semibold text-slate-700">Price (BDT )</Label>
                                <InputGroup fullWidth className="mt-1.5">
                                    <InputGroup.Prefix><FiDollarSign className="h-4 w-4 text-slate-400" /></InputGroup.Prefix>
                                    <InputGroup.Input
                                        {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })}
                                        placeholder="35000"
                                        className="text-slate-800"
                                    />
                                </InputGroup>
                                {errors.price && <FieldError className="mt-1 text-xs text-rose-600">{errors.price.message}</FieldError>}
                            </TextField>
                            {/* quantity input */}
                            <TextField isRequired type="number" name="quantity" fullWidth>
                                <Label className="text-sm font-semibold text-slate-700">Quantity</Label>
                                <InputGroup fullWidth className="mt-1.5">
                                    <InputGroup.Prefix><FiDollarSign className="h-4 w-4 text-slate-400" /></InputGroup.Prefix>
                                    <InputGroup.Input  placeholder="5" className="text-slate-800"
                                        {...register("quantity", { required: "quantity is required", min: { value: 1, message: "quantity must be greater than 0" } })}
                                    />
                                </InputGroup>
                                {errors.quantity && <FieldError className="mt-1 text-xs text-rose-600">{errors.quantity.message}</FieldError>}
                            </TextField>

                            {/* Multiple Image Upload Component */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                                    <FiCamera className="h-4 w-4 text-slate-400" /> Product Images
                                </label>

                                {/* Image Preview Grid */}
                                <div className="grid grid-cols-4 gap-3 mb-2">
                                    {images.map((url, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-50 group">
                                            <img src={url} alt="Product view" className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm"
                                            >
                                                <FiTrash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Upload Trigger Square */}
                                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}
                                        className="aspect-square border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 bg-slate-50/50 transition-colors"
                                    >
                                        {isUploading ? <Spinner size="sm" /> : <><FiPlus className="h-5 w-5" /><span className="text-[10px] font-bold mt-1">Upload</span></>}
                                    </button>
                                </div>

                                <input ref={fileInputRef}  type="file"  multiple  accept="image/*"  className="hidden"  onChange={handleImageUpload}/>
                                {uploadError && <span className="text-xs text-rose-600 font-medium">{uploadError}</span>}
                                <span className="text-xs text-slate-400 font-medium">You can upload multiple images. Click on an image to remove it.</span>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <textarea
                                    {...register("description", { required: "Description is required", minLength: { value: 10, message: "Provide a bit more detail" } })}
                                    rows={4}
                                    placeholder="Provide information about model, specifications, usage duration, and flaws..."
                                    className="w-full bg-white border border-slate-200 p-3 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-blue-600 transition-colors resize-none"
                                />
                                {errors.description && <span className="text-xs text-rose-600 font-medium">{errors.description.message}</span>}
                            </div>

                            {formError && (
                                <div className="text-sm bg-rose-50 text-rose-600 font-semibold p-3 rounded-xl border border-rose-100">
                                    {formError}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button  type="submit"  fullWidth  isLoading={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-11 mt-2 shadow-md shadow-blue-100 transition-all">
                                List Item to Marketplace
                            </Button>
                        </Form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default ADDProductPage;