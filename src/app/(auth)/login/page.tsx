"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            setUser(data.user);
            toast.success("Welcome back to OpSkl!");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err.message || "Failed to log in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
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
                    <p className="text-muted-foreground font-medium">Continue your trusted gig journey.</p>
                </div>

                <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8 md:p-12 shadow-2xl relative">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Password</label>
                                <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                <>Sign In <ArrowRight className="h-5 w-5" /></>
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
