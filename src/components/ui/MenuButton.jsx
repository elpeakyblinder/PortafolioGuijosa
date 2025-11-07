import React from "react";
import { motion } from "framer-motion";

export default function MenuButton({ isOpen, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className="z-50 md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-[var(--clr-dark-space)] shadow-lg hover:scale-105 transition-transform duration-300"
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
        >
            <motion.span
                animate={isOpen ? "open" : "closed"}
                variants={{
                    closed: { rotate: 0, y: 0, opacity: 1 },
                    open: { rotate: 45, y: 6 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="block w-6 h-[2px] bg-[var(--clr-accent)] mb-[6px] rounded origin-center"
            />
            <motion.span
                animate={isOpen ? "open" : "closed"}
                variants={{
                    closed: { opacity: 1, scale: 1 },
                    open: { opacity: 0, scale: 0 },
                }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-[2px] bg-[var(--clr-accent)] mb-[6px] rounded origin-center"
            />
            <motion.span
                animate={isOpen ? "open" : "closed"}
                variants={{
                    closed: { rotate: 0, y: 0, opacity: 1 },
                    open: { rotate: -45, y: -6 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="block w-6 h-[2px] bg-[var(--clr-accent)] rounded origin-center"
            />
        </motion.button>
    );
}
