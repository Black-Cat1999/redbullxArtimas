"use client";
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-rb-blue text-white py-16">
            <div className="container mx-auto px-4">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">

                    <div className="col-span-1 md:col-span-1">
                        <h4 className="text-2xl font-heading font-bold italic tracking-tighter mb-6">RED BULL</h4>
                        <p className="text-rb-silver text-sm leading-relaxed">
                            Inspired by functional drinks from the Far East, Dietrich Mateschitz founded Red Bull in the mid-1980s. He developed not only a new product but also a unique marketing concept.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Products</h5>
                        <ul className="space-y-3 text-rb-silver text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Energy Drink</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sugarfree</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Zero Calories</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Organics</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Company</h5>
                        <ul className="space-y-3 text-rb-silver text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Athletes</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Media House</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Brand Protection</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Connect</h5>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="hover:text-rb-yellow transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-rb-yellow transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-rb-yellow transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-rb-yellow transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-sans">
                    <div className="flex gap-6 mb-4 md:mb-0">
                        <a href="#" className="hover:text-white">Imprint</a>
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Use</a>
                        <a href="#" className="hover:text-white">Products & Company</a>
                    </div>
                    <div>
                        © 2024 Red Bull
                    </div>
                </div>

            </div>
        </footer>
    );
}
