"use client";

import React from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function RootLoading() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="relative"
            >
                <div className="h-24 w-24 rounded-[2rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-2xl shadow-primary/20">
                    <ShieldCheck className="h-12 w-12" />
                </div>
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 animate-pulse" />
            </motion.div>

            <div className="text-center space-y-2">
                <div className="flex items-center gap-3 justify-center">
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    <h3 className="text-xl font-black font-heading tracking-tight uppercase">Decrypting</h3>
                </div>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em] animate-pulse">Establishing Secure Uplink</p>
            </div>

            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full bg-primary"
                />
            </div>
        </div>
    );
}
