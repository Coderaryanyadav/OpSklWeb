"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Search
} from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative isolate">
      {/* Background Blobs */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8"
            >
              <Zap className="h-4 w-4" />
              <span>India&apos;s #1 Secure Gig Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            >
              Building the Future of <br className="hidden sm:block" />
              <span className="text-primary italic">Trusted</span> Gig Work.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              OpSkl bridges the gap between premium clients and verified India-based talent.
              Integrated Aadhaar verification and secure Escrow payments for total peace of mind.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" variant="premium" className="h-14 px-8 text-base gap-2 group">
                Explore Gigs
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/10 hover:bg-white/5">
                Join as Freelancer
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 w-full max-w-4xl"
            >
              {[
                { label: "Verified Users", value: "2.5K+" },
                { label: "Total Transactions", value: "₹25L+" },
                { label: "Successful Gigs", value: "1.2K+" },
                { label: "Trust Score", value: "99.8%" },
              ].map((stat, idx) => (
                <motion.div key={idx} variants={item} className="p-4">
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Businesses Trust OpSkl</h2>
            <p className="text-muted-foreground">The most secure way to hire and get paid in the Indian market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Aadhaar Verification",
                icon: ShieldCheck,
                desc: "Every service provider is KYC-verified using Aadhaar, ensuring you work with real, accountable professionals."
              },
              {
                title: "Smart Escrow",
                icon: Lock,
                desc: "Funds are held securely in escrow and only released when the work meets your satisfaction."
              },
              {
                title: "Skill Certification",
                icon: CheckCircle2,
                desc: "Our AI-driven skill tests ensure talent quality before they can apply for premium gigs."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Top Categories</h2>
              <p className="text-muted-foreground">Find the best talent across leading industries.</p>
            </div>
            <Link href="/browse" className="text-primary font-medium inline-flex items-center gap-2 hover:underline">
              View all categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Digital Marketing", "Web Development", "UI/UX Design", "Content Writing",
              "App Development", "Graphic Design", "Data Analysis", "Video Editing"
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer p-6 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] flex items-center justify-between"
              >
                <span className="font-medium">{cat}</span>
                <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Prompt */}
      <section className="py-24 mb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-white/10 p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 blur-[120px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-accent/20 blur-[120px]" />

            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your business?</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join thousands of businesses getting work done securely and efficiently on OpSkl.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-10">Hire Talent</Button>
              <Button size="lg" variant="outline" className="h-14 px-10 border-white/10">How it works</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
