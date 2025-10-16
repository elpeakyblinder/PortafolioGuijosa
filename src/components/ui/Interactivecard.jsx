import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Github, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative group h-full"
        >
            <div className="bg-[var(--clr-dark-slate)] border border-white/10 rounded-2xl overflow-hidden h-full hover:border-[var(--clr-accent)]/50 transition-all duration-300 relative">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                    <img // Reemplazado por una etiqueta <img> estándar para el ejemplo
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-dark-slate)] via-[var(--clr-dark-slate)]/50 to-transparent opacity-80" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-xs text-[var(--clr-accent)]">
                        {project.year}
                    </div>
                </div>

                {/* Gradient background effect */}
                <div className={`absolute inset-0 ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                        <motion.div animate={isHovered ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.6 }}>
                            <Sparkles className="w-5 h-5 text-[var(--clr-accent)]" />
                        </motion.div>
                        <h3 className="text-2xl text-[var(--clr-light-text)]">{project.title}</h3>
                    </div>

                    <p className="text-[var(--clr-text-secundary)] mb-6 leading-relaxed flex-grow">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-white/5 text-xs rounded-full border border-white/10 group-hover:border-[var(--clr-accent)]/30 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--clr-accent)] hover:text-[var(--clr-accent)]/80 transition-colors">
                            <Github className="w-4 h-4" /> Code
                        </a>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--clr-accent)] hover:text-[var(--clr-accent)]/80 transition-colors">
                            <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                    </div>
                </div>

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--clr-accent)]/5 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                    transition={{ duration: 0.8 }}
                />
            </div>
        </motion.div>
    );
}