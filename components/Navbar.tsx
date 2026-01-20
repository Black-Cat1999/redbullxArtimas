"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, User, ShoppingBag } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

interface NavbarProps {
    activeIndex?: number;
    onNavigate?: (index: number) => void;
}

export default function Navbar({ activeIndex = 0, onNavigate }: NavbarProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const links = [
        { name: "Red Bull", hasDropdown: false },
        { name: "Image Challenge", hasDropdown: false },
        { name: "AiMSA", hasDropdown: false },
    ];

    const currentActive = hoveredIndex !== null ? hoveredIndex : activeIndex;

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Left: Artimas Logo (Even Larger) */}
            <div className="flex-1 flex justify-start">
                <img src="/artimas.png" alt="Artimas" className="h-28 w-auto object-contain drop-shadow-lg" />
            </div>

            {/* Center: Pill Container with Sliding Line */}
            <div className="flex items-center">
                <div
                    className="relative flex items-center gap-8 bg-[#f1f5f9]/90 backdrop-blur-sm px-10 py-4 rounded-full shadow-lg border border-white/50"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {links.map((link, index) => (
                        <div
                            key={link.name}
                            className="relative group cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                        >
                            <Link
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onNavigate) onNavigate(index);
                                }}
                                className={`flex items-center gap-1 font-sans text-sm font-bold uppercase tracking-wider transition-colors z-10 relative ${currentActive === index ? 'text-rb-red' : 'text-rb-dark-blue'}`}
                            >
                                {link.name}
                                {link.hasDropdown && <span className="text-xs">▼</span>}
                            </Link>

                            {/* Sliding Red Line */}
                            {currentActive === index && (
                                <motion.div
                                    layoutId="navbar-underline"
                                    className="absolute -bottom-4 left-0 right-0 h-[3px] bg-[#d52048] rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Empty */}
            <div className="flex-1"></div>
        </motion.nav>
    );
}
