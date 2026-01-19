"use client";
import { motion } from "framer-motion";
import { Zap, Droplet, Candy, Leaf, FlaskConical } from "lucide-react";

const ingredients = [
    { name: "Caffeine", icon: Zap, desc: "Caffeine has already been known for its stimulating effects on the human body by ancient civilizations." },
    { name: "Taurine", icon: FlaskConical, desc: "Taurine is an amino acid, occurring naturally in the human body and present in the daily diet." },
    { name: "B-Group Vitamins", icon: Leaf, desc: "Vitamins are essential micronutrients that are required for maintaining normal body functions." },
    { name: "Sugars", icon: Candy, desc: "Red Bull Energy Drink is made with sugar sourced from sugar beets." },
    { name: "Alpine Water", icon: Droplet, desc: "Naturally, water is a key ingredient of Red Bull." },
];

export default function Ingredients() {
    return (
        <section className="py-24 bg-rb-grey">
            <div className="container mx-auto px-4">

                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-rb-blue uppercase">
                        Premium Ingredients
                    </h2>
                    <div className="w-24 h-2 bg-rb-red mt-4 ml-auto mr-auto md:ml-0" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ingredients.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                            <div className="w-16 h-16 mb-6 flex items-center justify-center bg-rb-blue/5 rounded-full text-rb-blue">
                                <item.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-rb-blue uppercase mb-3 text-left">
                                {item.name}
                            </h3>
                            <p className="text-gray-600 font-sans leading-relaxed text-left">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
