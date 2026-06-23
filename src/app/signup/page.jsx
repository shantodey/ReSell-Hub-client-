"use client";

import { useRef, useState } from "react";
import { Form, TextField, InputGroup, Label, Description, FieldError, RadioGroup, Radio, Button, Avatar, Spinner } from "@heroui/react";
import { FiUser, FiMail, FiPhone, FiCamera, FiShoppingBag, FiTag, FiCheck, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useForm, SubmitHandler, } from "react-hook-form"

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMG_UPLOAD_API;
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

const roleCardClass =
    "group relative flex w-full cursor-pointer items-start gap-3 rounded-2xl border border-border p-4 text-left transition hover:border-accent/60 data-[selected=true]:border-accent data-[selected=true]:bg-accent/5";

const roleControlClass =
    "mt-0.5 shrink-0 border-border group-hover:border-accent data-[selected=true]:border-accent data-[selected=true]:bg-accent";

export default function SignupPage() {


    const fileInputRef = useRef(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [photoError, setPhotoError] = useState("");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);

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
            setPhotoPreview(null);
            setPhotoUrl(null);
        } finally {
            setIsUploading(false);
        }
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setFormError(""); 
        const payload = {
            ...data,
            image: photoUrl,
            callbackURL: "/"
        };
        try {
            console.log("Submitting to Better Auth:", payload);
            const { data: singUpData, error } = await authClient.signUp.email(payload);
            if (error) {
                throw new Error(error.message || "Signup failed.");
            }
            console.log("Signup success:", singUpData);
            setIsDone(true); 

        } catch (err) {
            console.error("Signup error:", err.message);
            setFormError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isDone) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background px-6">
                <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-border px-8 py-12 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <FiCheck className="size-6" />
                    </span>
                    <h2 className="text-2xl font-light text-foreground">You&apos;re in.</h2>
                    <p className="max-w-xs text-sm text-muted">
                        Your account has been created. Check your email for next steps.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
            <div className="flex w-full max-w-md flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-light text-foreground">Create your account</h1>
                    <p className="text-sm text-muted">Join as a buyer or a seller — it takes less than a minute.</p>
                </div>

                <Form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Photo */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar size="lg" className="size-20 border border-border">
                                {photoPreview ? <Avatar.Image src={photoPreview} alt="Profile preview" /> : null}
                                <Avatar.Fallback>
                                    <FiUser className="size-7 text-muted" />
                                </Avatar.Fallback>
                            </Avatar>

                            {isUploading ? (
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                                    <Spinner size="sm" className="text-white" />
                                </div>
                            ) : null}

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                aria-label="Upload profile photo"
                                className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition hover:border-accent hover:bg-accent hover:text-accent-foreground"
                            >
                                <FiCamera className="size-3.5" />
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-foreground">Profile photo</p>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-left text-sm text-accent underline-offset-2 hover:underline"
                            >
                                {photoUrl ? "Change photo" : "Upload a photo"}
                            </button>
                            {photoError ? (
                                <span className="flex items-center gap-1 text-xs text-danger">
                                    <FiAlertCircle className="size-3.5" />
                                    {photoError}
                                </span>
                            ) : (
                                <span className="text-xs text-muted">PNG or JPG, up to 5MB.</span>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <TextField isRequired name="fullName" minLength={2} fullWidth>
                        <Label className="text-sm font-medium text-foreground">Full name</Label>
                        <InputGroup fullWidth className="mt-1.5">
                            <InputGroup.Prefix>
                                <FiUser className="size-4 text-muted" />
                            </InputGroup.Prefix>
                            <InputGroup.Input {...register("name", { required: " Your name is required" })} placeholder="Jordan Rivera" />
                        </InputGroup>
                        <FieldError className="mt-1 text-xs text-danger">Enter your full name.</FieldError>
                    </TextField>

                    {/* Email */}
                    <TextField isRequired type="email" name="email" fullWidth>
                        <Label className="text-sm font-medium text-foreground">Email address</Label>
                        <InputGroup fullWidth className="mt-1.5">
                            <InputGroup.Prefix>
                                <FiMail className="size-4 text-muted" />
                            </InputGroup.Prefix>
                            <InputGroup.Input {...register("email", { required: " Enter your email address" })} />
                        </InputGroup>
                        <FieldError className="mt-1 text-xs text-danger">Enter a valid email address.</FieldError>
                    </TextField>
                    {/* Passwrod */}
                    <TextField isRequired type="password" name="password" fullWidth>
                        <Label className="text-sm font-medium text-foreground">Password</Label>
                        <InputGroup fullWidth className="mt-1.5">
                            <InputGroup.Prefix>
                                <FiMail className="size-4 text-muted" />
                            </InputGroup.Prefix>
                            <InputGroup.Input {...register("password", { required: " password name is required", mixLength: 12, minLength: 6 })} />
                        </InputGroup>
                        <FieldError className="mt-1 text-xs text-danger">Enter a valid email address.</FieldError>
                    </TextField>

                    {/* Phone */}
                    <TextField isRequired type="tel" name="phone" fullWidth>
                        <Label className="text-sm font-medium text-foreground">Phone number</Label>
                        <InputGroup fullWidth className="mt-1.5">
                            <InputGroup.Prefix>
                                <FiPhone className="size-4 text-muted" />
                            </InputGroup.Prefix>
                            <InputGroup.Input {...register("phone", { required: " phone name is required" })} />
                        </InputGroup>
                        <FieldError className="mt-1 text-xs text-danger">Enter a valid phone number.</FieldError>
                    </TextField>


                    <select {...register("role", { required: "Role is required" })}>
                        <option value="">Select user type</option>
                        <option value="seller">Sell</option>
                        <option value="buyer">Buyer</option>
                    </select>
                    <Button type="submit" fullWidth isPending={isSubmitting} className="gap-2">
                        Create account
                        <FiArrowRight className="size-4" />
                    </Button>
                </Form>
            </div>
        </main>
    );
}
