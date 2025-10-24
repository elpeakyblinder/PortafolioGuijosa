import React from 'react';
import { motion } from "framer-motion";
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Award from 'lucide-react/dist/esm/icons/award';
import Code2 from 'lucide-react/dist/esm/icons/code-2';

const iconMap = {
    TrendingUp,
    Award,
    Code2
};

export default function ExperienceStat({ stat }) {
    const IconComponent = iconMap[stat.icon];

    if (!IconComponent) {
        console.error(`Icono no encontrado: ${stat.icon}`);
        return null; 
    }

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-[var(--clr-dark-slate)] border border-white/10 rounded-xl p-6 text-center hover:border-[var(--clr-accent)]/40 transition-all duration-300 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--clr-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                <IconComponent className="w-6 h-6 text-[var(--clr-accent)] mx-auto mb-2" />
                <div className="text-3xl mb-1 text-[var(--clr-accent)]">{stat.value}</div>
                <div className="text-sm text-[var(--clr-text-secundary)]">{stat.label}</div>
            </div>
        </motion.div>
    );
}