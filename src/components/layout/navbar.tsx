"use client";

import React from "react";
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
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:rotate-6 transition-transform">
                                <ShieldCheck className="h-6 w-6" />
                                <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r from-primary to-accent opacity-0 blur group-hover:opacity-50 transition-opacity" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">OpSkl</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:ml-10 md:flex md:items-center md:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="ml-4 flex items-center gap-4">
                            <Button variant="ghost" className="text-sm">Sign In</Button>
                            <Button variant="premium" className="gap-2">
                                <Rocket className="h-4 w-4" />
                                Post a Gig
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden border-b border-white/10 bg-background/90 backdrop-blur-xl"
                    >
                        <div className="space-y-1 px-4 pb-6 pt-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "block rounded-md px-3 py-4 text-base font-medium",
                                        pathname === item.href ? "bg-accent/50 text-primary" : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="mt-4 flex flex-col gap-3">
                                <Button variant="outline" className="w-full">Sign In</Button>
                                <Button className="w-full gap-2" variant="premium">
                                    <Rocket className="h-4 w-4" />
                                    Post a Gig
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
