import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocialLinks from "@/components/ui/SocialLinks.jsx";

export default function MobileMenu({ isOpen }) {
    const menuVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.1,
                ease: [0.16, 1, 0.3, 1],
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            y: -80,
            scale: 0.95,
            transition: { duration: 0.4, ease: "easeInOut" },
        },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="mobileMenu"
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed top-0 left-0 w-full h-screen bg-[var(--clr-dark-space)] z-40 flex flex-col items-center justify-center overflow-hidden backdrop-blur-md"
                >
                    <motion.nav
                        variants={menuVariants}
                        className="flex flex-col items-center justify-center h-full gap-10 text-3xl font-semibold text-[var(--clr-text-secundary)]"
                    >
                        {["About", "Skills", "Projects", "Contact"].map((item) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                variants={linkVariants}
                                className="hover:text-[var(--clr-accent)] transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item}
                            </motion.a>
                        ))}

                        <motion.div
                            id="social-links-mobile"
                            variants={linkVariants}
                            className="mt-12"
                        >
                            <SocialLinks client:idle />
                        </motion.div>
                    </motion.nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
