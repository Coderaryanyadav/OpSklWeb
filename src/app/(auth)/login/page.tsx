"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { setCookie } from "cookies-next";


import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    });

    const handleLogin = async (data: LoginInput) => {
        setLoading(true);

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (signInError) throw signInError;

            // Fix Logic Error #2: Confirm session exists
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error("Session verification failed");

            // Fetch profile to get role for cookie
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();

            if (profile) {
                setCookie('user-role', profile.role, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
            }

            toast.success("Welcome back!");

            // Fix Logic Error #1: Redirect Loop Risk
            const params = new URLSearchParams(window.location.search);
            let redirectTo = params.get('redirect') || '/dashboard';

            // Normalize redirect path to prevent loop and external redirects
            if (redirectTo === window.location.pathname || !redirectTo.startsWith('/')) {
                redirectTo = '/dashboard';
            }

            // Small delay to ensure state and cookies are settled
            setTimeout(() => {
                window.location.href = redirectTo;
            }, 100);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to log in";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[150px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck className="h-7 w-7" />
                        </div>
                        <span className="text-3xl font-black tracking-tight font-heading">OpSkl</span>
                    </Link>
                    <h1 className="text-4xl font-black font-heading tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground font-medium">Access your secure workspace.</p>
                </div>

                <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8 md:p-12 shadow-2xl">
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="john@example.com"
                                    className={cn(
                                        "w-full h-14 bg-white/5 border rounded-2xl pl-14 pr-6 focus:ring-2 outline-none transition-all font-medium",
                                        errors.email ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:ring-primary/50"
                                    )}
                                />
                            </div>
                            {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    {...register("password")}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full h-14 bg-white/5 border rounded-2xl pl-14 pr-6 focus:ring-2 outline-none transition-all font-medium",
                                        errors.password ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:ring-primary/50"
                                    )}
                                />
                            </div>
                            {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                <>Log In <ArrowRight className="h-5 w-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-sm text-muted-foreground font-medium">
                            New to OpSkl?{" "}
                            <Link href="/signup" className="text-white font-black hover:text-primary transition-colors">Create Account</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
