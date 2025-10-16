import React, { useState, useEffect } from "react";
import SocialLinks from "@/components/ui/SocialLinks.jsx";
import MenuButton from "@/components/ui/MenuButton.jsx";
import MobileMenu from "@/components/ui/movil/MenuHamburgesa.jsx";

export default function HeaderReact() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            id="main-header"
            className={`font-bold text-lg fixed top-0 left-0 w-full z-10 backdrop-blur-md transition-colors ${scrolled ? "border-b border-[var(--clr-accent-transparent)] bg-[rgba(var(--clr-dark-space),0.55)]" : "border-b border-transparent bg-[rgba(var(--clr-dark-space),0.5)]"
                }`}
        >
            <div className="container mx-auto flex justify-between items-center py-4 px-4 text-[var(--clr-text-secundary)]">
                <a href="/">
                    <span>
                        {"<"}
                        <span className="text-[var(--clr-accent)]">Guijosa</span>
                        {"/>"}
                    </span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#about" className="hover:text-[var(--clr-accent)] transition-colors">About</a>
                    <a href="#skills" className="hover:text-[var(--clr-accent)] transition-colors">Skills</a>
                    <a href="#projects" className="hover:text-[var(--clr-accent)] transition-colors">Projects</a>
                    <a href="#contact" className="hover:text-[var(--clr-accent)] transition-colors">Contact</a>
                </nav>

                <div className="hidden md:block">
                    <SocialLinks />
                </div>

                <MenuButton onClick={() => setIsOpen(!isOpen)} />
            </div>

            <MobileMenu isOpen={isOpen} />
        </header>
    );
}
