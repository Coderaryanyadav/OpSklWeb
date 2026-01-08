"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/auth-store";
import { supabase } from "@/lib/supabase/client";
import {
    ShieldCheck,
    Upload,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Lock,
    Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function VerificationPage() {
    const { profile, setProfile } = useAuthStore();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleVerify = async () => {
        if (aadhaarNumber.length !== 12) {
            toast.error("Please enter a valid 12-digit Aadhaar number");
            return;
        }
        if (!file) {
            toast.error("Please upload a front-copy of your Aadhaar card");
            return;
        }

        setLoading(true);

        // Mocking the verification delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ verified: true })
                .eq('id', profile?.id);

            if (error) throw error;

            toast.success("Identity verified successfully!");
            setStep(3);

            // Update local state
            if (profile) {
                setProfile({ ...profile, verified: true });
            }

            setTimeout(() => {
                router.push("/dashboard");
            }, 3000);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Verification failed";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (profile?.verified) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Navbar />
                <div className="text-center p-12 rounded-[3rem] border border-white/10 bg-white/[0.02] max-w-md">
                    <div className="h-20 w-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                        <ShieldCheck className="h-10 w-10" />
                    </div>
                    <h1 className="text-2xl font-black mb-2">Already Verified</h1>
                    <p className="text-muted-foreground mb-8">Your identity has been fully verified and you have access to all premium features.</p>
                    <button onClick={() => router.push("/dashboard")} className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 max-w-2xl">
                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4"
                    >
                        <ShieldCheck className="h-4 w-4" />
                        Trust & Security Hub
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-4"
                    >
                        Identity <span className="text-muted-foreground italic">Verification</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground font-medium"
                    >
                        Complete your Aadhaar KYC to unlock high-budget projects and verified status.
                    </motion.p>
                </header>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl"
                            >
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-widest">End-to-End Encrypted</h4>
                                            <p className="text-[10px] text-zinc-500 font-medium leading-none">Your data is masked and stored in secure vault nodes.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Aadhaar Card Number</label>
                                        <input
                                            type="text"
                                            maxLength={12}
                                            placeholder="XXXX XXXX XXXX"
                                            className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-2xl font-black tracking-widest outline-none focus:ring-2 focus:ring-primary/50 transition-all font-heading"
                                            value={aadhaarNumber}
                                            onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Front-Side Document</label>
                                        <div
                                            className={cn(
                                                "h-48 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all cursor-pointer overflow-hidden group relative",
                                                file ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/20 bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/50 hover:scale-[1.01]"
                                            )}
                                            onClick={() => document.getElementById('file-upload')?.click()}
                                        >
                                            {file ? (
                                                <>
                                                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                                                    <div className="text-center">
                                                        <div className="text-sm font-black text-white">{file.name}</div>
                                                        <div className="text-[10px] text-emerald-500 font-black uppercase">Ready for Sync</div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-10 w-10 text-zinc-500" />
                                                    <div className="text-center px-6">
                                                        <div className="text-sm font-black text-zinc-300">Select Document</div>
                                                        <div className="text-[10px] text-zinc-600 font-black uppercase">PDF, PNG or JPG max 5MB</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*,.pdf"
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        />
                                    </div>

                                    <button
                                        onClick={handleVerify}
                                        disabled={loading}
                                        className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Initiate Verification"}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center p-16 rounded-[4rem] bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-3xl"
                            >
                                <div className="h-24 w-24 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto mb-10">
                                    <CheckCircle2 className="h-12 w-12" />
                                </div>
                                <h2 className="text-3xl font-black mb-4">Verification Success</h2>
                                <p className="text-muted-foreground font-medium mb-8">
                                    Your profile has been upgraded to <span className="text-emerald-500 font-black italic">Verified Status</span>.
                                    Redirecting you back to the command center...
                                </p>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3 }}
                                        className="h-full bg-emerald-500"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-zinc-500" />
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Takes ~2 sec</div>
                    </div>
                    <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
                        <Eye className="h-5 w-5 text-zinc-500" />
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">AI Document Scan</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
