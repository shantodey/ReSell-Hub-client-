"use client";

import { useState } from "react";
import { Form, TextField, InputGroup, Label, FieldError, Button } from "@heroui/react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/client";
import Link from "next/link";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        const formData = new FormData(e.currentTarget);
        setIsSubmitting(true);
        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.get("email")?.toString().trim(),
                password: formData.get("password")?.toString(),
                callbackURL: "/",
            });
            if (error) throw new Error(error.message || "Invalid email or password.");
            console.log("Login payload:", { email, password });
        } catch (err) {
            setFormError(err.message || "Invalid email or password.");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleGoogleLogin() {
        setFormError("");
        setIsGoogleLoading(true);
        const authClient = createAuthClient();
        try {
            const data = await authClient.signIn.social({
                provider: "google",
            });
            const signIn = async () => {
            };
            console.log("TODO: Google sign-in via Better Auth");
        } catch (err) {
            setFormError(err.message || "Google sign-in failed.");
        } finally {
            setIsGoogleLoading(false);
        }
    }
   return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
            <div className="rounded-3xl border border-border/60 bg-content1 shadow-xl backdrop-blur-sm p-6 sm:p-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground"> Welcome Back</h1>
                    <p className="mt-2 text-sm text-muted"> Sign in to continue to your account. </p>
                </div>

                <Form className="flex w-full flex-col gap-5"onSubmit={handleSubmit}>
                    {/* Email */}
                    <TextField  isRequired type="email" name="email" fullWidth >
                        <Label className="mb-2 text-sm font-medium">  Email Address </Label>

                        <InputGroup  fullWidth className="rounded-xl border border-border overflow-hidden">
                            <InputGroup.Prefix className="px-3">
                                <FiMail className="text-muted size-4" />
                            </InputGroup.Prefix>
                            <InputGroup.Input placeholder="you@example.com" className="py-3"/>
                        </InputGroup>

                        <FieldError className="mt-1 text-xs text-danger">
                            Enter a valid email address.
                        </FieldError>
                    </TextField>

                    {/* Password */}
                    <TextField isRequired name="password" minLength={6} fullWidth >
                        <Label className="mb-2 text-sm font-medium">  Password </Label>

                        <InputGroup fullWidth className="rounded-xl border border-border overflow-hidden">
                            <InputGroup.Prefix className="px-3">
                                <FiLock className="text-muted size-4" />
                            </InputGroup.Prefix>

                            <InputGroup.Input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="py-3"/>
                            <InputGroup.Suffix className="px-3">
                                <button type="button" onClick={() => setShowPassword((v) => !v) } aria-label={   showPassword ? "Hide password" : "Show password"}
                                    className="text-muted hover:text-foreground transition-colors">
                                    {showPassword ? ( <FiEyeOff className="size-4" />) : (  <FiEye className="size-4" /> )}
                                </button>
                            </InputGroup.Suffix>
                        </InputGroup>

                        <FieldError className="mt-1 text-xs text-danger">
                            Enter your password.
                        </FieldError>
                    </TextField>

                   
                    {formError && (
                        <div className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger"> {formError}</div>
                    )}
                   
                    <Button type="submit" fullWidth isPending={isSubmitting}className="h-12 rounded-xl font-medium gap-2" >
                        Log In
                        <FiArrowRight className="size-4" />
                    </Button>

                    <div className="flex items-center gap-4 py-1">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs uppercase tracking-[0.25em] text-muted">  OR</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    
                    <Button type="button" variant="outline" fullWidth isPending={isGoogleLoading} onClick={handleGoogleLogin}  className="h-12 rounded-xl gap-3 font-medium">
                        <FcGoogle className="size-5" />
                        Continue with Google
                    </Button>

                    <p className="pt-2 text-center text-sm text-muted">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-semibold text-accent transition hover:underline">
                            Sign up
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    </main>
);
};

export default LoginPage;