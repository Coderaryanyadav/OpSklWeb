"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Lock, User, Loader2, ArrowRight, CheckCircle2, Briefcase, Building } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        role: "provider" as "provider" | "client",
    });

    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                        role: formData.role,
                    },
                },
            });

            if (error) throw error;

            // Create a profile in the public profiles table
            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        name: formData.name,
                        title: formData.role === 'provider' ? 'Service Provider' : 'Professional Client',
                        skills: [],
                    });

                if (profileError) console.error("Profile creation error:", profileError);
            }

            toast.success("Account created! Please check your email for verification.");
            router.push("/login");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to create account";
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
                    <h1 className="text-4xl font-black font-heading tracking-tight mb-2">Join the Future</h1>
                    <p className="text-muted-foreground font-medium">Verify your identity, build your legacy.</p>
                </div>

                <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-8 md:p-12 shadow-2xl relative">
                    <form onSubmit={handleSignup} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 block">Choose Your Role</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, role: 'provider' })}
                                                className={cn(
                                                    "p-6 rounded-3xl border text-left transition-all group",
                                                    formData.role === 'provider'
                                                        ? "border-primary bg-primary/10"
                                                        : "border-white/5 bg-white/5 hover:border-white/20"
                                                )}
                                            >
                                                <Briefcase className={cn("h-6 w-6 mb-3 transition-colors", formData.role === 'provider' ? "text-primary" : "text-muted-foreground")} />
                                                <div className="font-black text-sm uppercase tracking-tight mb-1">Freelancer</div>
                                                <div className="text-[10px] text-muted-foreground font-medium leading-tight">Find premium gigs and grow your XP.</div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, role: 'client' })}
                                                className={cn(
                                                    "p-6 rounded-3xl border text-left transition-all group",
                                                    formData.role === 'client'
                                                        ? "border-accent bg-accent/10"
                                                        : "border-white/5 bg-white/5 hover:border-white/20"
                                                )}
                                            >
                                                <Building className={cn("h-6 w-6 mb-3 transition-colors", formData.role === 'client' ? "text-accent" : "text-muted-foreground")} />
                                                <div className="font-black text-sm uppercase tracking-tight mb-1">Business</div>
                                                <div className="text-[10px] text-muted-foreground font-medium leading-tight">Hire verified talent with secure escrow.</div>
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (formData.role) setStep(2);
                                        }}
                                        className="w-full h-14 rounded-2xl bg-white text-background font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        Continue <ArrowRight className="h-5 w-5" />
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="email"
                                                required
                                                placeholder="john@example.com"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="password"
                                                required
                                                placeholder="••••••••"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="h-14 w-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                                        >
                                            <ArrowRight className="h-5 w-5 rotate-180" />
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                        >
                                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                                <>Complete Signup <CheckCircle2 className="h-5 w-5" /></>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-sm text-muted-foreground font-medium">
                            Already a member?{" "}
                            <Link href="/login" className="text-white font-black hover:text-primary transition-colors">Log In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
