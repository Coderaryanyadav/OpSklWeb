"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Browse Gigs", href: "/browse" },
    { name: "Find Talent", href: "/talent" },
    { name: "How it Works", href: "/how-it-works" },
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

    // Close mobile menu on path change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 border-b",
                scrolled ? "bg-background/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-primary/5 py-2" : "bg-transparent border-transparent py-4"
            )}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1" aria-label="OpSkl Home">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:rotate-6 transition-transform shadow-lg shadow-primary/20">
                                <ShieldCheck className="h-6 w-6" />
                                <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r from-primary to-accent opacity-0 blur group-hover:opacity-50 transition-opacity" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">OpSkl</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:ml-10 md:flex md:items-center md:gap-10">
                        <div className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={pathname === item.href ? "page" : undefined}
                                    className={cn(
                                        "text-sm font-bold uppercase tracking-widest transition-all hover:text-primary relative py-1",
                                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                    {pathname === item.href && (
                                        <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="ml-6 flex items-center gap-4 border-l border-white/10 pl-6">
                            <Button variant="ghost" className="text-sm font-bold uppercase tracking-widest">Sign In</Button>
                            <Button variant="premium" className="gap-2 px-6 h-11" asChild>
                                <Link href="/post-gig">
                                    <Rocket className="h-4 w-4" />
                                    Post a Gig
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            className="inline-flex items-center justify-center rounded-xl p-2.5 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors border border-white/10"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-white/10 bg-background/95 backdrop-blur-2xl overflow-hidden"
                    >
                        <div className="space-y-2 px-4 pb-8 pt-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block rounded-2xl px-4 py-4 text-base font-bold uppercase tracking-widest transition-all",
                                        pathname === item.href ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="mt-6 flex flex-col gap-4 pt-6 border-t border-white/5">
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 text-lg">Sign In</Button>
                                <Button className="w-full h-14 rounded-2xl text-lg gap-3" variant="premium" asChild>
                                    <Link href="/post-gig">
                                        <Rocket className="h-5 w-5" />
                                        Post a Gig
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
