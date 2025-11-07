import React, { useState, useEffect } from "react";
import SocialLinks from "@/components/ui/SocialLinks.jsx";
import MenuButton from "@/components/ui/MenuButton.jsx";
import MobileMenu from "@/components/ui/movil/MenuHamburgesa.jsx";

const sectionIds = ['inicio', 'projects', 'experience', 'skills', 'contact', 'aboutMe'];

export default function HeaderReact() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sections = sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean);

        if (sections.length === 0) return;

        const handleScrollSpy = () => {
            const scrollY = window.scrollY;
            const headerOffset = 150;
            let currentSection = 'inicio';

            for (const section of sections) {
                const sectionTop = section.offsetTop - headerOffset;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.id;
                    break;
                }
            }

            const bottomOfPage = (window.innerHeight + scrollY) >= document.body.offsetHeight - 50;
            if (bottomOfPage && sections.length > 0) {
                currentSection = sections[sections.length - 1].id;
            }

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScrollSpy, { passive: true });
        handleScrollSpy();
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, []);

    return (
        <header
            id="main-header"
            className={`font-bold text-lg fixed top-0 left-0 w-full z-10 backdrop-blur-md transition-colors ${scrolled
                    ? "border-b border-[var(--clr-accent-transparent)] bg-[rgba(var(--clr-dark-space),0.55)]"
                    : "border-b border-transparent bg-[rgba(var(--clr-dark-space),0.5)]"
                }`}
        >
            <div className="mx-auto flex justify-between items-center py-4 px-8 text-[var(--clr-text-secundary)]">
                <a href="/">
                    <span>
                        {"<"}
                        <span className="text-[var(--clr-accent)]">Guijosa</span>
                        {"/>"}
                    </span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {sectionIds.map(id => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`nav-link ${activeSection === id ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            {id === 'aboutMe' ? 'Sobre mí' :
                                id === 'projects' ? 'Proyectos' :
                                    id === 'experience' ? 'Experiencia' :
                                        id === 'skills' ? 'Habilidades' :
                                            id === 'contact' ? 'Contacto' :
                                                'Inicio'}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:block">
                    <SocialLinks />
                </div>

                <MenuButton isOpen={isOpen} onClick={toggleMenu} />
            </div>

            <MobileMenu isOpen={isOpen} onClose={closeMenu} />
        </header>
    );
}
