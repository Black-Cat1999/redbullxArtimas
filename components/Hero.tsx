"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-rb-blue">
            {/* Background Parallax */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <div className="relative w-full h-full bg-black/40">
                    {/* Placeholder for video/image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#001e3c] via-[#0f2847] to-[#db0a40] opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        {/* Abstract shape or placeholder text */}
                        <span className="text-9xl font-heading font-black text-white uppercase tracking-tighter">
                            ENERGY
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Content layer */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white uppercase italic tracking-tighter leading-none"
                >
                    Vitalizes Body <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rb-yellow to-rb-red">
                        And Mind
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-6 text-xl md:text-2xl text-rb-silver font-medium max-w-lg"
                >
                    Placeholder text for copyrighted content. Represents the brand slogan.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-10 px-8 py-4 bg-rb-red text-white font-heading font-bold text-xl uppercase tracking-wider rounded-md hover:bg-white hover:text-rb-blue transition-colors shadow-lg"
                >
                    Explore Range
                </motion.button>
            </div>
        </section>
    );
}
