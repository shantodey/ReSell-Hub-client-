"use client";

import { updateProfile } from "@/lib/api/userUpdateApi";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMG_UPLOAD_API;
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

export default function ProfileUpdatePage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user || {};

    const fileInputRef = useRef(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(user?.image || "");
    const [isUploading, setIsUploading] = useState(false);
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: user?.name || ""
        }
    });

    useEffect(() => {
    if (user) {
        setValue("name", user.name);
        setPhotoPreview(user.image);
    }
}, [user, setValue]);

    const handlePhotoChange = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        setPhotoError("");

        if (!file.type.startsWith("image/")) {
            setPhotoError("Please choose an image file.");
            return;
        }
        if (file.size > MAX_FILE_BYTES) {
            setPhotoError("That image is over 5MB. Choose a smaller one.");
            return;
        }

        setPhotoPreview(URL.createObjectURL(file));
        setIsUploading(true);

        try {
            if (!IMGBB_API_KEY) {
                throw new Error("Image upload isn't configured (missing NEXT_PUBLIC_IMGBB_API_KEY).");
            }

            const body = new FormData();
            body.append("image", file);

            const res = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body,
            });
            const data = await res.json();

            if (!res.ok || !data?.data?.url) {
                throw new Error(data?.error?.message || "Upload failed. Try again.");
            }

            setPhotoUrl(data.data.url);
        } catch (err) {
            setPhotoError(err.message || "Upload failed. Try again.");
            setPhotoPreview(user?.image || null); 
            setPhotoUrl(null);
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setFormError("");
        setSuccessMessage("");

        const payload = {
            email: user.email,
            name: data.name,
            image: photoUrl || user.image,
        };

        try {
            const result = await updateProfile(payload);
            setSuccessMessage(result.message);
        } catch (err) {
            setFormError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isPending) {
            toast.loading("Loading your profile...", { id: "profile-loading" });
        } else {
            toast.dismiss("profile-loading");
        }
    }, [isPending]);

    // Date ফরম্যাট করা
    const formattedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "N/A";

    return (
       <div className="max-w-md mx-auto p-8 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100 mt-10">
    <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Update Profile</h2>
        <p className="text-gray-500 mt-2 text-sm">Manage your account settings and preferences.</p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            {[
                { label: "Email", value: user?.email },
                { label: "Role", value: user?.role },
                { label: "Account Created", value: formattedDate }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.label}</span>
                    <span className="text-gray-700 font-medium capitalize mt-0.5">{item.value || "N/A"}</span>
                </div>
            ))}
        </div>

        {/* Profile Picture Section */}
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Profile Picture</label>
            <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-gray-100">
                        <Image  src={photoPreview || "/default-avatar.png"}  width={80} height={80}  alt="Profile"   className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex-1">
                    <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all inline-block shadow-sm">
                        Change Photo
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" />
                    </label>
                    <p className="text-[11px] text-gray-400 mt-1.5">JPG, PNG or GIF (max 5MB)</p>
                </div>
            </div>
        </div>

        {/* Username Section */}
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Display Name</label>
            <input {...register("name", { required: true })} type="text"
                className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
                placeholder="Enter your username"
            />
        </div>

        {/* Feedback Section */}
        {(formError || successMessage) && (
            <div className={`p-3 rounded-lg text-sm ${formError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {formError || successMessage}
            </div>
        )}

        <button type="submit" disabled={isSubmitting || isUploading}
            className="w-full bg-gray-900 text-white py-3.5 rounded-xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 font-semibold shadow-lg shadow-gray-200"
        >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
        </button>
    </form>
</div>
    );
}