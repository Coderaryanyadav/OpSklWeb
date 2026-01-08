"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ShieldCheck, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Browse Gigs", href: "/gigs" },
    { label: "Find Talent", href: "/talent" },
    { label: "How It Works", href: "/how-it-works" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
                scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tight font-heading">OpSkl</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-bold uppercase tracking-widest transition-all hover:text-primary relative",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
                            Log In
                        </Link>
                        <Link
                            href="/post-gig"
                            className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
                        >
                            Post a Gig <Rocket className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
                    >
                        <div className="px-4 py-8 flex flex-col gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 text-center font-black uppercase tracking-widest text-muted-foreground border border-white/10 rounded-2xl"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/post-gig"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 text-center font-black uppercase tracking-widest bg-primary text-white rounded-2xl"
                                >
                                    Post a Gig
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
