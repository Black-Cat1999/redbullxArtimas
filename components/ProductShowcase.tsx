"use client";
import { motion } from "framer-motion";

export default function ProductShowcase() {
    return (
        <section className="relative min-h-screen py-24 bg-white overflow-hidden flex flex-col items-center justify-center">

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center z-10 mb-12"
            >
                <h2 className="text-5xl md:text-7xl font-heading font-black text-rb-blue uppercase tracking-tighter">
                    The Can
                </h2>
                <p className="max-w-xl mx-auto mt-4 text-xl text-gray-600 font-medium font-sans">
                    Red Bull Energy Drink is appreciated worldwide by top athletes, students, and in highly demanding professions as well as during long drives.
                </p>
            </motion.div>

            {/* Can Showcase */}
            <div className="relative flex items-center justify-center w-full max-w-4xl h-[600px]">
                {/* Background Elements */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute w-[500px] h-[500px] bg-rb-silver/20 rounded-full blur-3xl -z-10"
                />

                {/* The Can Placeholder */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative w-64 h-[400px] md:w-80 md:h-[500px] bg-gradient-to-br from-rb-blue to-rb-silver rounded-3xl shadow-2xl border-4 border-white flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Can Graphics Simulation */}
                    <div className="absolute top-0 w-full h-8 bg-gray-300 border-b border-gray-400" />

                    <div className="z-10 text-center transform -rotate-90">
                        <h3 className="text-4xl font-heading font-black text-white tracking-widest uppercase truncate">Red Bull</h3>
                        <span className="text-sm font-sans text-rb-yellow uppercase tracking-widest block mt-2">Energy Drink</span>
                    </div>

                    <div className="absolute bottom-10 flex gap-2">
                        <div className="w-12 h-12 rounded-full bg-rb-red opacity-80" />
                        <div className="w-12 h-12 rounded-full bg-rb-yellow opacity-80" />
                    </div>
                </motion.div>
            </div>

            <div className="mt-12 flex gap-4">
                <button className="px-8 py-3 border-2 border-rb-blue text-rb-blue font-heading font-bold uppercase hover:bg-rb-blue hover:text-white transition-colors rounded">
                    Nutrition Facts
                </button>
                <button className="px-8 py-3 bg-rb-blue text-white font-heading font-bold uppercase hover:bg-rb-blue/80 transition-colors rounded">
                    Buy Now
                </button>
            </div>

        </section>
    );
}
