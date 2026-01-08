"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck, Briefcase, Users, MessageSquare, Wallet, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, profile, signOut } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    const navItems = user
        ? [
            { label: "Dashboard", href: "/dashboard", icon: Briefcase },
            { label: profile?.role === "client" ? "Post Project" : "Find Work", href: profile?.role === "client" ? "/post-gig" : "/gigs", icon: Briefcase },
            { label: "Talent", href: "/talent", icon: Users },
            { label: "Messages", href: "/messages", icon: MessageSquare },
            { label: "Wallet", href: "/wallet", icon: Wallet },
        ]
        : [];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tight font-heading">OpSkl</span>
                    </Link>

                    {/* Desktop Nav */}
                    {user && (
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2",
                                        pathname === item.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
                                >
                                    {profile?.avatar ? (
                                        <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-sm font-black">{profile?.name.charAt(0) || "U"}</span>
                                    )}
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-wider hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all flex items-center gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Exit
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white hover:bg-white/5 transition-all"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-8 py-3 rounded-xl bg-primary text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-white"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-6 space-y-2">
                        {user ? (
                            <>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all",
                                            pathname === item.href
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                ))}
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition-all"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Exit
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white hover:bg-white/5 transition-all"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-3 rounded-xl bg-primary text-white text-sm font-bold uppercase tracking-wider text-center"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
