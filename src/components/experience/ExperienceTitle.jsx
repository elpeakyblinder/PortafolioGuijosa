import React from 'react';
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function ExperienceTitle() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
            <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                    <Briefcase className="w-8 h-8 text-[var(--clr-accent)]" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold">
                    <span className="text-[var(--clr-light-text)]">Experiencia </span>
                    <span className="text-[var(--clr-accent)]">Laboral</span>
                </h2>
            </div>
            <p className="text-[var(--clr-text-secundary)] max-w-2xl mx-auto">
                Mi trayectoria profesional construyendo soluciones tecnológicas
                innovadoras y escalables
            </p>
        </motion.div>
    );
}