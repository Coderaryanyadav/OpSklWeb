"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/auth-store";
import {
    IndianRupee,
    Plus,
    History,
    ShieldCheck,
    Zap
} from "lucide-react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const RazorpayModal = dynamic(() => import("@/components/wallet/razorpay-modal").then((mod) => mod.RazorpayModal), {
    ssr: false,
    loading: () => null
});
import { supabase } from "@/lib/supabase/client";

export default function WalletPage() {
    const { profile, setProfile } = useAuthStore();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleAddMoney = () => {
        if (!amount || parseInt(amount) < 100) {
            toast.error("Minimum deposit is ₹100");
            return;
        }
        setIsPaymentModalOpen(true);
    };

    const handlePaymentSuccess = async () => {
        setIsPaymentModalOpen(false);
        setLoading(true);

        try {
            const numAmount = parseInt(amount);

            // 1. Create a real transaction record
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: profile?.id,
                    type: 'deposit',
                    amount: numAmount,
                    status: 'completed'
                });

            if (txError) throw txError;

            // 2. The database trigger handles the balance, but we update the UI optimistically
            if (profile) {
                setProfile({ ...profile, balance: (Number(profile.balance) || 0) + numAmount });
            }

            toast.success(`₹${amount} added successfully to your secure vault`);
            setAmount("");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Banking sync failed";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-[0.3em] mb-3">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Escrow Secured Wallet
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
                        Financial <span className="text-muted-foreground italic">Portal</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="p-12 rounded-[3.5rem] bg-gradient-to-br from-primary to-accent text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                                <IndianRupee className="h-64 w-64" />
                            </div>

                            <div className="relative z-10">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-80">Liquid Balance</div>
                                <div className="text-6xl md:text-7xl font-black font-heading tracking-tighter mb-12">
                                    ₹{profile?.balance?.toLocaleString() || "0"} <span className="text-2xl font-medium opacity-60">.00</span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest">
                                    <div className="h-14 px-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-yellow-400" /> {profile?.xp || 0} XP Gained
                                    </div>
                                    <div className="h-14 px-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-emerald-400" /> Verified Status
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.02]">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                    <History className="h-6 w-6 text-primary" />
                                    Transaction Log
                                </h3>
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Last 30 Days</div>
                            </div>

                            <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                                <p className="text-zinc-500 font-bold italic">No transactions yet. Start by adding funds or completing a gig.</p>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.03]">
                            <h3 className="text-xl font-black tracking-tight mb-8">Add Funds</h3>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Amount (INR)</label>
                                    <div className="relative group">
                                        <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="number"
                                            placeholder="5000"
                                            className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-2xl font-black outline-none focus:ring-2 focus:ring-primary/50 transition-all font-heading"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {["2000", "5000", "10000", "25000"].map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => setAmount(val)}
                                            className="h-12 rounded-xl border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                                        >
                                            +₹{parseInt(val).toLocaleString()}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleAddMoney}
                                    disabled={loading}
                                    className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    {loading ? "Processing..." : <>Deposit via Razorpay <Plus className="h-4 w-4" /></>}
                                </button>
                            </div>
                        </section>

                        <section className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10">
                            <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest mb-4">
                                <ShieldCheck className="h-4 w-4" />
                                Security First
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed italic">
                                All payments are held in OpSkl verified escrow nodes. Funds are only released when both parties confirm milestone completion.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <RazorpayModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSuccess={handlePaymentSuccess}
                amount={amount}
            />
        </div>
    );
}
