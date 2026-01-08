import React from "react";
import Link from "next/link";
import { ShieldCheck, Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">OpSkl</span>
                        </Link>
                        <p className="mb-6 max-w-xs text-sm text-muted-foreground leading-relaxed">
                            India's first trust-first gig economy platform. Empowering verified talent and clients through secure escrow payments and Aadhaar verification.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">Platform</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/browse" className="hover:text-primary transition-colors">Browse Gigs</Link></li>
                            <li><Link href="/talent" className="hover:text-primary transition-colors">Find Talent</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Trust & Safety</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Dispute Resolution</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Success Stories</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/5 pt-8 text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} OpSkl. Built for the Indian Gig Economy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
