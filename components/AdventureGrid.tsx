"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const stories = [
    {
        id: 1,
        category: "Formula 1",
        title: "The Champion's Mindset: Behind the Wheel",
        imageColor: "bg-blue-800",
        size: "large", // spans 2 cols
    },
    {
        id: 2,
        category: "Surfing",
        title: "Chasing the Big Wave in Nazare",
        imageColor: "bg-teal-600",
        size: "normal",
    },
    {
        id: 3,
        category: "Music",
        title: "Red Bull Batalla: The Final Showdown",
        imageColor: "bg-purple-700",
        size: "normal",
    },
    {
        id: 4,
        category: "Gaming",
        title: "Esports: The New Era of Competition",
        imageColor: "bg-indigo-900",
        size: "normal",
    },
    {
        id: 5,
        category: "Adventure",
        title: "Skydiving over the Alps",
        imageColor: "bg-sky-500",
        size: "normal",
    },
];

export default function AdventureGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-heading font-black text-rb-blue uppercase mb-12 text-center">
                    World of Red Bull
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[400px]">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${story.size === "large" ? "md:col-span-2 md:row-span-1" : "col-span-1"
                                }`}
                        >
                            {/* Image Placeholder */}
                            <div
                                className={`absolute inset-0 ${story.imageColor} transition-transform duration-700 group-hover:scale-105`}
                            >
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-rb-yellow uppercase tracking-widest bg-rb-blue/20 backdrop-blur-sm px-2 py-1 rounded">
                                        {story.category}
                                    </span>
                                </div>

                                <h3 className={`font-heading font-black text-white uppercase leading-tight mb-4 ${story.size === "large" ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                                    {story.title}
                                </h3>

                                <div className="flex items-center gap-2 text-white font-bold opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    <span>Read Story</span>
                                    <ArrowRight size={18} />
                                </div>
                            </div>

                            {/* Play Button Icon for video feeling */}
                            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play size={16} fill="currentColor" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-3 border-2 border-rb-blue/30 text-rb-blue font-heading font-bold uppercase hover:border-rb-blue transition-colors rounded">
                        Load More Stories
                    </button>
                </div>
            </div>
        </section>
    );
}
