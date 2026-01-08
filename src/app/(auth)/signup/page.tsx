"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Lock, User, Loader2, ArrowRight, CheckCircle2, Briefcase, Building } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { setCookie } from "cookies-next";

import { signupSchema, type SignupInput } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            role: 'provider'
        }
    });

    const role = watch('role');
    const router = useRouter();

    const nextStep = async () => {
        // Only validate the fields relevant to the current step (none in step 1 yet, but role is pre-selected)
        setStep(2);
    };

    const handleSignup = async (data: SignupInput) => {
        setLoading(true);

        try {
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.name,
                        role: data.role,
                    },
                },
            });

            if (signUpError) throw signUpError;

            if (authData.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        name: data.name,
                        title: data.role === 'provider' ? 'Service Provider' : 'Professional Client',
                        role: data.role,
                        skills: [],
                        xp: 0,
                        rating: 0,
                        verified: false,
                        balance: 0,
                    });

                if (profileError) {
                    console.error("Profile creation error:", profileError);
                    // Even if profile fails, user is created in Auth. We should notify them.
                    toast.warning("Account created, but profile setup failed. Please contact support.");
                } else {
                    setCookie('user-role', data.role, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
                    toast.success("Account created! Please check your email for verification.");
                }
            }

            router.push("/login?signup_success=true");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to create account";
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

                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative border border-white/10">
                    <form onSubmit={handleSubmit(handleSignup)} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 block">Choose Your Role</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setValue('role', 'provider')}
                                                className={cn(
                                                    "p-6 rounded-3xl border text-left transition-all duration-300 group relative overflow-hidden",
                                                    role === 'provider'
                                                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 ring-1 ring-primary/50"
                                                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20"
                                                )}
                                            >
                                                {role === 'provider' && (
                                                    <motion.div layoutId="role-check" className="absolute top-4 right-4 text-primary">
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </motion.div>
                                                )}
                                                <Briefcase className={cn("h-8 w-8 mb-4 transition-colors duration-300", role === 'provider' ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300")} />
                                                <div className={cn("font-black text-sm uppercase tracking-tight mb-2 transition-colors", role === 'provider' ? "text-white" : "text-zinc-400 group-hover:text-white")}>Freelancer</div>
                                                <div className="text-[11px] text-zinc-500 font-medium leading-relaxed">Find premium gigs and grow your XP.</div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue('role', 'client')}
                                                className={cn(
                                                    "p-6 rounded-3xl border text-left transition-all duration-300 group relative overflow-hidden",
                                                    role === 'client'
                                                        ? "border-accent bg-accent/10 shadow-lg shadow-accent/10 ring-1 ring-accent/50"
                                                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20"
                                                )}
                                            >
                                                {role === 'client' && (
                                                    <motion.div layoutId="role-check" className="absolute top-4 right-4 text-accent">
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </motion.div>
                                                )}
                                                <Building className={cn("h-8 w-8 mb-4 transition-colors duration-300", role === 'client' ? "text-accent" : "text-zinc-500 group-hover:text-zinc-300")} />
                                                <div className={cn("font-black text-sm uppercase tracking-tight mb-2 transition-colors", role === 'client' ? "text-white" : "text-zinc-400 group-hover:text-white")}>Business</div>
                                                <div className="text-[11px] text-zinc-500 font-medium leading-relaxed">Hire verified talent with secure escrow.</div>
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full h-14 rounded-2xl bg-white text-background font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl hover:shadow-white/10"
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
                                                {...register("name")}
                                                placeholder="John Doe"
                                                className={cn(
                                                    "w-full h-14 bg-white/5 border rounded-2xl pl-14 pr-6 focus:ring-2 outline-none transition-all font-medium",
                                                    errors.name ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:ring-primary/50"
                                                )}
                                            />
                                        </div>
                                        {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name.message}</p>}
                                    </div>

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
