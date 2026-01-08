"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    CreditCard,
    Smartphone,
    Home,
    ChevronRight,
    ShieldCheck,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RazorpayModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: string;
}

export function RazorpayModal({ isOpen, onClose, onSuccess, amount }: RazorpayModalProps) {
    const [status, setStatus] = useState<'selecting' | 'processing' | 'success'>('selecting');

    const handlePayment = () => {
        setStatus('processing');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onSuccess();
            }, 2000);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-[420px] bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[600px] text-zinc-900"
                    >
                        {/* Razorpay Header */}
                        <div className="bg-[#1D1F23] p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-xl italic">R</div>
                                <div>
                                    <div className="text-xs font-bold opacity-60 uppercase tracking-widest">Paying OpSkl Platform</div>
                                    <div className="text-xl font-black">₹{parseInt(amount || "0").toLocaleString()}</div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {status === 'selecting' && (
                            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Preferred Payment Methods</div>

                                <div className="space-y-4">
                                    <button
                                        onClick={handlePayment}
                                        className="w-full flex items-center justify-between p-5 rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-zinc-200">
                                                <Smartphone className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-sm">UPI (Google Pay, PhonePe)</div>
                                                <div className="text-[10px] text-zinc-500 font-bold">Fastest & Highly Reliable</div>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-zinc-300 group-hover:text-blue-600 transition-colors" />
                                    </button>

                                    <button
                                        onClick={handlePayment}
                                        className="w-full flex items-center justify-between p-5 rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-zinc-200">
                                                <CreditCard className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-sm">Cards (Credit / Debit)</div>
                                                <div className="text-[10px] text-zinc-500 font-bold">Visa, Mastercard, RuPay</div>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-zinc-300 group-hover:text-purple-600 transition-colors" />
                                    </button>

                                    <button
                                        onClick={handlePayment}
                                        className="w-full flex items-center justify-between p-5 rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-zinc-200">
                                                <Home className="h-6 w-6 text-emerald-600" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-sm">Netbanking</div>
                                                <div className="text-[10px] text-zinc-500 font-bold">ICICI, HDFC, SBI + more</div>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-zinc-300 group-hover:text-emerald-600 transition-colors" />
                                    </button>
                                </div>

                                <div className="mt-auto pt-8 flex items-center justify-center gap-2 opacity-40 grayscale pointer-events-none">
                                    <div className="flex items-center gap-1">
                                        <ShieldCheck className="h-4 w-4" />
                                        <span className="text-[10px] font-black uppercase">PCI DSS Compliant</span>
                                    </div>
                                    <div className="h-1 w-1 bg-zinc-900 rounded-full" />
                                    <span className="text-[10px] font-black uppercase italic">Secured by Razorpay</span>
                                </div>
                            </div>
                        )}

                        {status === 'processing' && (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                                <div className="relative mb-8">
                                    <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                                    <div className="absolute inset-0 bg-blue-600/10 blur-xl rounded-full" />
                                </div>
                                <h3 className="text-xl font-black mb-2">Syncing Gateway</h3>
                                <p className="text-zinc-500 text-sm">Establishing secure handshake with your selected bank...</p>
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-emerald-50">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="h-20 w-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20"
                                >
                                    <ShieldCheck className="h-10 w-10" />
                                </motion.div>
                                <h3 className="text-2xl font-black text-emerald-900 mb-2">Payment Verified</h3>
                                <p className="text-emerald-700/60 text-sm mb-6 font-medium">Auto-confirming your wallet top-up on OpSkl networks...</p>
                                <div className="text-4xl font-black text-emerald-800">₹{parseInt(amount).toLocaleString()}</div>
                            </div>
                        )}

                        {/* Razorpay Footer Branding */}
                        <div className="bg-[#F8F9FB] px-8 py-4 border-t border-zinc-100 flex items-center justify-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Powered by</span>
                            <div className="text-lg font-black italic text-zinc-800">Razorpay</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
