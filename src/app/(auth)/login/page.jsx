"use client";

import { useState } from "react";
import { Form, TextField, InputGroup, Label, FieldError, Button } from "@heroui/react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/client";

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
        <main className="flex min-h-screen items-center justify-center bg-background ">
            <div className="flex w-full max-w-md flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-light text-foreground">Welcome back</h1>
                    <p className="text-sm text-muted">Log in to your account to continue.</p>
                </div>

                <Form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
                    <TextField isRequired type="email" name="email" fullWidth>
                        <Label className="text-sm font-medium text-foreground">Email address</Label>
                        <InputGroup fullWidth className="mt-1.5">
                            <InputGroup.Prefix>
                                <FiMail className="size-4 text-muted" />
                            </InputGroup.Prefix>
                            <InputGroup.Input placeholder="you@example.com" />
                        </InputGroup>
                        <FieldError className="mt-1 text-xs text-danger">Enter a valid email address.</FieldError>
                    </TextField>

                    <TextField isRequired name="password" minLength={6} fullWidth>
                        <Label className="text-sm font-medium text-foreground">Password</Label>
                        <InputGroup fullWidth className="mt-1.5">
                            <InputGroup.Prefix>
                                <FiLock className="size-4 text-muted" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                            />
                            <InputGroup.Suffix>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="text-muted transition hover:text-foreground"
                                >
                                    {showPassword ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
                                </button>
                            </InputGroup.Suffix>
                        </InputGroup>
                        <FieldError className="mt-1 text-xs text-danger">Enter your password.</FieldError>
                    </TextField>

                    {formError ? (
                        <p className="rounded-xl bg-danger/10 px-4 py-2.5 text-sm text-danger">{formError}</p>
                    ) : null}

                    <Button type="submit" fullWidth isPending={isSubmitting} className="gap-2">
                        Log in
                        <FiArrowRight className="size-4" />
                    </Button>

                    <div className="flex items-center gap-3">
                        <span className="h-px flex-1 bg-border" />
                        <span className="text-xs uppercase tracking-wide text-muted">or</span>
                        <span className="h-px flex-1 bg-border" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        isPending={isGoogleLoading}
                        onClick={handleGoogleLogin}
                        className="gap-2"
                    >
                        <FcGoogle className="size-4" />
                        Continue with Google
                    </Button>

                    <p className="text-center text-sm text-muted">
                        Don&apos;t have an account?{" "}
                        <a href="/signup" className="font-medium text-accent hover:underline">
                            Sign up
                        </a>
                    </p>
                </Form>
            </div>
        </main>
    );
};

export default LoginPage;