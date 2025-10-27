import React from 'react';
import { motion } from "framer-motion";
import {Briefcase, Calendar, MapPin, TrendingUp, Award, Code2} from 'lucide-react';

const iconMap = {
    Briefcase,
    Calendar,
    MapPin,
    TrendingUp,
    Award,
    Code2
};

export default function ExperienceCard({ experience, index }) {
    const Icon = iconMap[experience.icon];

    if (!Icon) {
        console.error(`Icono principal no encontrado: ${experience.icon}`);
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="relative group"
        >
            {index !== experience.totalItems - 1 && (
                <div className="absolute left-6 top-24 w-0.5 h-full bg-gradient-to-b from-[var(--clr-accent)]/40 to-transparent hidden md:block" />
            )}

            <div className="flex gap-6 md:gap-8">
                <div className="relative flex-shrink-0">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${experience.color} border border-[var(--clr-accent)]/20 flex items-center justify-center backdrop-blur-sm relative z-10`}
                    >
                        <Icon className="w-6 h-6 text-[var(--clr-accent)]" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 0.5, scale: 1 }}
                        className="absolute inset-0 bg-[var(--clr-accent)]/20 rounded-xl blur-xl"
                    />
                </div>

                <div className="flex-1 pb-12">
                    <div className="bg-[var(--clr-dark-slate)] border border-[var(--clr-accent)]/20 rounded-2xl p-6 hover:border-[var(--clr-accent)]/70 transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="relative z-10">
                            <div className="mb-4">
                                <h3 className="text-2xl mb-2 text-[var(--clr-light-text)]">
                                    {experience.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--clr-text-secundary)] mb-3">
                                    <span className="flex items-center gap-1.5 text-[var(--clr-accent)]">
                                        <Briefcase className="w-4 h-4" />
                                        {experience.company}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" />
                                        {experience.location}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--clr-accent)]/10 border border-[var(--clr-accent)]/20 rounded-full text-[var(--clr-accent)]">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {experience.period}
                                    </span>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[var(--clr-text-secundary)]">
                                        {experience.duration}
                                    </span>
                                </div>
                            </div>
                            <p className="text-[var(--clr-text-secundary)] mb-4 leading-relaxed">
                                {experience.description}
                            </p>
                            <div className="mb-4">
                                <h4 className="text-sm mb-2 text-[var(--clr-light-text)]">
                                    Logros clave:
                                </h4>
                                <ul className="space-y-2">
                                    {(experience.achievements || []).map((achievement, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.2 + idx * 0.1 }}
                                            className="flex items-start gap-2 text-sm text-[var(--clr-text-secundary)]"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--clr-accent)] mt-1.5 flex-shrink-0" />
                                            <span>{achievement}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(experience.technologies || []).map((tech, idx) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.01 + idx * 0.01 }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            transition: {
                                                type: "spring",
                                                duration: 0.3,
                                                stiffness: 100, 
                                                damping: 20     
                                            }
                                        }}
                                        className="px-3 py-1 bg-[var(--clr-dark-space)] text-[var(--clr-text-secundary)] text-xs rounded-lg border border-white/20 hover:border-[var(--clr-accent)]/30 transition-colors cursor-default"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}