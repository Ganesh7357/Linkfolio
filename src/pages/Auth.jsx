import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "react-hot-toast";

export default function Auth() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, signup, loginWithGoogle, user, isLoadingAuth } = useAuth();

    const urlParams = new URLSearchParams(window.location.search);
    const [mode, setMode] = useState(urlParams.get("mode") === "signup" ? "signup" : "login");
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (user && !isLoadingAuth) {
            const from = location.state?.from?.pathname || createPageUrl("Dashboard");
            navigate(from, { replace: true });
        }
    }, [user, isLoadingAuth, navigate, location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            return toast.error("Please fill in all fields");
        }

        if (mode === "signup" && !form.name) {
            return toast.error("Please enter your name");
        }

        setIsLoading(true);
        try {
            if (mode === "login") {
                await login(form.email, form.password);
                toast.success("Welcome back!");
            } else {
                await signup(form.email, form.password);
                toast.success("Account created successfully!");
            }
            // Redirect happens in useEffect
        } catch (error) {
            console.error("Auth error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await loginWithGoogle();
            toast.success("Signed in with Google!");
        } catch (error) {
            console.error("Google auth error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Left - Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Link to={createPageUrl("Landing")} className="flex items-center gap-2 mb-10">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent">
                            Linkfolio
                        </span>
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900">
                        {mode === "login" ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {mode === "login"
                            ? "Sign in to manage your bio pages."
                            : "Start building your bio page in minutes."}
                    </p>

                    {/* Google */}
                    <Button
                        variant="outline"
                        className="w-full mt-8 h-12 rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-medium"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                        ) : (
                            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        Continue with Google
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-sm text-gray-400">or</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "signup" && (
                            <div>
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                                <div className="relative mt-1.5">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        placeholder="Sarah Chen"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        disabled={isLoading}
                                        className="h-12 pl-10 rounded-xl border-gray-200 focus:border-violet-400 focus:ring-violet-400"
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                            <div className="relative mt-1.5">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    disabled={isLoading}
                                    className="h-12 pl-10 rounded-xl border-gray-200 focus:border-violet-400 focus:ring-violet-400"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                            <div className="relative mt-1.5">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    disabled={isLoading}
                                    className="h-12 pl-10 pr-12 rounded-xl border-gray-200 focus:border-violet-400 focus:ring-violet-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white font-medium shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    {mode === "login" ? "Sign In" : "Create Account"}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setMode(mode === "login" ? "signup" : "login")}
                            className="text-violet-600 hover:text-violet-700 font-medium"
                        >
                            {mode === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </motion.div>
            </div>

            {/* Right - Visual */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white/10"
                            style={{
                                width: `${100 + i * 80}px`,
                                height: `${100 + i * 80}px`,
                                top: `${10 + i * 12}%`,
                                left: `${20 + (i % 3) * 20}%`,
                            }}
                        />
                    ))}
                </div>
                <div className="relative text-center text-white px-12 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                                alt="Profile"
                                className="h-16 w-16 rounded-full object-cover ring-4 ring-white/20 mx-auto"
                            />
                            <h3 className="font-bold text-lg mt-4">Sarah Chen</h3>
                            <p className="text-sm text-white/70 mt-1">Designer & Creator ✨</p>
                            <div className="mt-5 space-y-2.5">
                                {["My Portfolio", "YouTube", "Shop"].map((t, i) => (
                                    <div key={i} className="py-2.5 rounded-xl bg-white/15 text-sm font-medium">{t}</div>
                                ))}
                            </div>
                        </div>
                        <p className="mt-6 text-lg font-semibold">
                            Your entire world in one link
                        </p>
                        <p className="text-sm text-white/70 mt-2">
                            Join 50,000+ creators already using Linkfolio
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
