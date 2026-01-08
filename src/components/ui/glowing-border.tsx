"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingBorderProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export function GlowingBorder({ children, className, glowColor = "rgba(99, 102, 241, 0.5)" }: GlowingBorderProps) {
    return (
        <div className={cn("relative group p-[1px] overflow-hidden rounded-2xl", className)}>
            <motion.div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
                }}
                initial={false}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <div className="relative z-10 bg-background rounded-[15px] h-full w-full">
                {children}
            </div>
        </div>
    );
}
