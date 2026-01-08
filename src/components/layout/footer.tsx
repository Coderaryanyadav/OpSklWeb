import React from "react";
import Link from "next/link";
import { ShieldCheck, Twitter, Github, Linkedin, ExternalLink } from "lucide-react";

const footerLinks = {
    platform: [
        { name: "Browse Gigs", href: "/browse" },
        { name: "Find Talent", href: "/talent" },
        { name: "How it Works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
    ],
    resources: [
        { name: "Help Center", href: "/help" },
        { name: "Trust & Safety", href: "/trust" },
        { name: "Dispute Resolution", href: "/dispute" },
        { name: "Success Stories", href: "/stories" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
    ],
};

const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/Coderaryanyadav/OpSklWeb" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/opskl" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/opskl" },
];

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#020617] pt-16 pb-8" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg w-fit">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-6">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter">OpSkl</span>
                        </Link>
                        <p className="mb-8 max-w-sm text-base text-muted-foreground leading-relaxed">
                            India&apos;s first trust-first gig economy platform. We bridge the gap between premium clients and verified talent through secure Aadhaar-linked verification and smart escrow payments.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all group"
                                    aria-label={`Follow OpSkl on ${social.name}`}
                                >
                                    <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <nav aria-label="Footer Platform Navigation">
                        <h3 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-foreground/50">Platform</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                                        {link.name}
                                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Footer Resources Navigation">
                        <h3 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-foreground/50">Resources</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Footer Legal Navigation">
                        <h3 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-foreground/50">Legal</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-muted-foreground font-medium">
                        © {new Date().getFullYear()} OpSkl. Built with ❤️ for the Indian Gig Economy.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Systems Operational
                        </span>
                        <span>Version 1.0.2-beta</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
