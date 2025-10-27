import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderSlot, n as renderComponent, r as renderTemplate, o as renderScript, m as maybeRenderHead } from '../chunks/astro/server_DG2Y2vJ7.mjs';
/* empty css                                 */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { Toaster } from 'sonner';
import { Github, Linkedin, Mail, Sparkles, Globe, Server, Database, Cloud, Smartphone, Terminal, Send } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Briefcase from 'lucide-react/dist/esm/icons/briefcase.js';
import Calendar from 'lucide-react/dist/esm/icons/calendar.js';
import MapPin from 'lucide-react/dist/esm/icons/map-pin.js';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up.js';
import Award from 'lucide-react/dist/esm/icons/award.js';
import Code2 from 'lucide-react/dist/esm/icons/code-2.js';
export { renderers } from '../renderers.mjs';

function SSonnerToaster() {
  return /* @__PURE__ */ jsx(Toaster, { position: "bottom-center", richColors: true });
}

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/logo/logo.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sora:wght@100..800&display=swap" rel="stylesheet"><title>Guijosa</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "SonnerToaster", SSonnerToaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/SonnerToaster.jsx", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/layouts/Layout.astro", void 0);

function SocialLinks() {
  return /* @__PURE__ */ jsxs("div", { className: "flex row gap-4", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://github.com/elpeakyblinder",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-2 hover:text-[var(--clr-accent)] transition-colors",
        children: /* @__PURE__ */ jsx(Github, { size: 20 })
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://linkedin.com/in/carlos-guijosa",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-2 hover:text-[var(--clr-accent)] transition-colors",
        children: /* @__PURE__ */ jsx(Linkedin, { size: 20 })
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "mailto:devcharlying@gmail.com",
        className: "flex items-center gap-2 hover:text-[var(--clr-accent)] transition-colors",
        children: /* @__PURE__ */ jsx(Mail, { size: 20 })
      }
    )
  ] });
}

function MenuButton({ onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      onClick: handleClick,
      className: "z-50 md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-[var(--clr-dark-space)] shadow-lg hover:scale-105 transition-transform duration-300",
      whileTap: { scale: 0.9 },
      "aria-label": "Menu",
      children: [
        /* @__PURE__ */ jsx(
          motion.span,
          {
            animate: isOpen ? "open" : "closed",
            variants: {
              closed: { rotate: 0, y: 0, opacity: 1 },
              open: { rotate: 45, y: 6 }
            },
            transition: { type: "spring", stiffness: 260, damping: 20 },
            className: "block w-6 h-[2px] bg-[var(--clr-accent)] mb-[6px] rounded origin-center"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.span,
          {
            animate: isOpen ? "open" : "closed",
            variants: {
              closed: { opacity: 1, scale: 1 },
              open: { opacity: 0, scale: 0 }
            },
            transition: { duration: 0.2 },
            className: "block w-6 h-[2px] bg-[var(--clr-accent)] mb-[6px] rounded origin-center"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.span,
          {
            animate: isOpen ? "open" : "closed",
            variants: {
              closed: { rotate: 0, y: 0, opacity: 1 },
              open: { rotate: -45, y: -6 }
            },
            transition: { type: "spring", stiffness: 260, damping: 20 },
            className: "block w-6 h-[2px] bg-[var(--clr-accent)] rounded origin-center"
          }
        )
      ]
    }
  );
}

function MobileMenu({ isOpen }) {
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
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -80,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };
  const linkVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      variants: menuVariants,
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      className: "fixed top-0 left-0 w-full h-screen bg-[var(--clr-dark-space)] z-40 flex flex-col items-center justify-center overflow-hidden backdrop-blur-md",
      children: /* @__PURE__ */ jsxs(
        motion.nav,
        {
          variants: menuVariants,
          className: "flex flex-col items-center justify-center h-full gap-10 text-3xl font-semibold text-[var(--clr-text-secundary)]",
          children: [
            ["About", "Skills", "Projects", "Contact"].map((item) => /* @__PURE__ */ jsx(
              motion.a,
              {
                href: `#${item.toLowerCase()}`,
                variants: linkVariants,
                className: "hover:text-[var(--clr-accent)] transition-colors",
                whileHover: { scale: 1.1 },
                whileTap: { scale: 0.95 },
                children: item
              },
              item
            )),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                id: "social-links-mobile",
                variants: linkVariants,
                className: "mt-12",
                children: /* @__PURE__ */ jsx(SocialLinks, { "client:idle": true })
              }
            )
          ]
        }
      )
    },
    "mobileMenu"
  ) });
}

function HeaderReact() {
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
  return /* @__PURE__ */ jsxs(
    "header",
    {
      id: "main-header",
      className: `font-bold text-lg fixed top-0 left-0 w-full z-10 backdrop-blur-md transition-colors ${scrolled ? "border-b border-[var(--clr-accent-transparent)] bg-[rgba(var(--clr-dark-space),0.55)]" : "border-b border-transparent bg-[rgba(var(--clr-dark-space),0.5)]"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex justify-between items-center py-4 px-4 text-[var(--clr-text-secundary)]", children: [
          /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsxs("span", { children: [
            "<",
            /* @__PURE__ */ jsx("span", { className: "text-[var(--clr-accent)]", children: "Guijosa" }),
            "/>"
          ] }) }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8", children: [
            /* @__PURE__ */ jsx("a", { href: "#about", className: "hover:text-[var(--clr-accent)] transition-colors", children: "About" }),
            /* @__PURE__ */ jsx("a", { href: "#skills", className: "hover:text-[var(--clr-accent)] transition-colors", children: "Skills" }),
            /* @__PURE__ */ jsx("a", { href: "#projects", className: "hover:text-[var(--clr-accent)] transition-colors", children: "Projects" }),
            /* @__PURE__ */ jsx("a", { href: "#contact", className: "hover:text-[var(--clr-accent)] transition-colors", children: "Contact" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(SocialLinks, {}) }),
          /* @__PURE__ */ jsx(MenuButton, { onClick: () => setIsOpen(!isOpen) })
        ] }),
        /* @__PURE__ */ jsx(MobileMenu, { isOpen })
      ]
    }
  );
}

const $$HeaderSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "HeaderReact", HeaderReact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/header/Header.jsx", "client:component-export": "default" })} ${renderScript($$result, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/header/HeaderSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/header/HeaderSection.astro", void 0);

const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="containerHero mt-5" data-astro-cid-cuvr4vzf> <div class="name" data-astro-cid-cuvr4vzf> <h1 data-astro-cid-cuvr4vzf> <div data-astro-cid-cuvr4vzf><span id="fullStack" data-astro-cid-cuvr4vzf>Full Stack</span></div> <div data-astro-cid-cuvr4vzf><span id="developer" data-astro-cid-cuvr4vzf>Developer</span></div> </h1> <h3 data-astro-cid-cuvr4vzf>Carlos Guijosa</h3> </div> <div class="presentation" data-astro-cid-cuvr4vzf> <p data-astro-cid-cuvr4vzf>
Hola!, soy estudiante de <span class="text-[var(--clr-accent)]" data-astro-cid-cuvr4vzf>Ingeniería en Gestión y Desarrollo de Software</span> proximamente graduado en 2026. Me especializo en <span class="text-[var(--clr-accent)]" data-astro-cid-cuvr4vzf>desarrollo full-stack</span> con tecnologías de vanguardia, procuro <span class="text-[var(--clr-light-text)]" data-astro-cid-cuvr4vzf>aplicar las mejores prácticas</span> para ofrecer productos de alta calidad. Actualmente embarcandome en el mundo de <span class="text-[var(--clr-accent)]" data-astro-cid-cuvr4vzf>blockchain development</span> y automatizaciones con <span class="text-[var(--clr-light-text)]" data-astro-cid-cuvr4vzf>n8n</span>, <span class="text-[var(--clr-light-text)]" data-astro-cid-cuvr4vzf>python</span> y <span class="text-[var(--clr-light-text)]" data-astro-cid-cuvr4vzf>solidity</span>.
</p> </div> <div class="buttonsHero" data-astro-cid-cuvr4vzf> <button id="viewProjects" class="px-5 py-3 bg-[var(--clr-accent)] text-[var(--clr-dark-space)]" data-astro-cid-cuvr4vzf>
View Projects
</button> <button id="contactMe" class="px-5 py-3 bg-[var(--clr-dark-space)]" data-astro-cid-cuvr4vzf>
Contact Me
</button> </div> <div data-astro-cid-cuvr4vzf> <span data-astro-cid-cuvr4vzf> ↓ </span> </div> </section> `;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/hero/HeroSection.astro", void 0);

function ProjectCard({ project, index }) {
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
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: cardRef,
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6, delay: index * 0.1 },
      style: { rotateX, rotateY, transformStyle: "preserve-3d" },
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: handleMouseLeave,
      className: "relative group h-full",
      children: /* @__PURE__ */ jsxs("div", { className: "bg-[var(--clr-dark-slate)] border border-[var(--clr-accent)]/20 rounded-2xl overflow-hidden h-full hover:border-[var(--clr-accent)]/70 transition-all duration-300 relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-72 md:h-72 overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: project.image,
              alt: project.title,
              className: "w-full h-full object-fill transition-transform duration-500 group-hover:scale-110"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--clr-dark-slate)] via-[var(--clr-dark-slate)]/50 to-transparent opacity-80" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm border border-[var(--clr-accent)]/10 rounded-full text-xs text-[var(--clr-accent)]", children: project.year })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500` }),
        /* @__PURE__ */ jsxs("div", { className: "relative p-6 flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsx(motion.div, { animate: isHovered ? { rotate: 360 } : { rotate: 0 }, transition: { duration: 0.6 }, children: /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-[var(--clr-accent)]" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl text-[var(--clr-light-text)]", children: project.title })
          ] }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-[var(--clr-text-secundary)] mb-6 leading-relaxed",
              dangerouslySetInnerHTML: { __html: project.description }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 text-[var(--clr-light-text)] text-xs rounded-full border border-[var(--clr-accent)]/40", children: tag }, tag)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 ml-auto", children: [
              /* @__PURE__ */ jsxs("a", { href: project.repoUrl, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 text-sm text-[var(--clr-text-secundary)] hover:text-[var(--clr-accent)] transition-colors", children: [
                /* @__PURE__ */ jsx(Github, { className: "w-4 h-4" }),
                " Code"
              ] }),
              project.detailsUrl && /* @__PURE__ */ jsx(
                motion.a,
                {
                  href: project.detailsUrl,
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  className: "flex items-center gap-2 px-4 py-2 bg-[var(--clr-accent)]/10 border border-[var(--clr-accent)]/30 rounded-lg text-sm text-[var(--clr-accent)] hover:bg-[var(--clr-accent)]/20 transition-colors",
                  children: "View Details"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-gradient-to-r from-transparent via-[var(--clr-accent)]/5 to-transparent",
            initial: { x: "-100%" },
            animate: isHovered ? { x: "100%" } : { x: "-100%" },
            transition: { duration: 0.8 }
          }
        )
      ] })
    }
  );
}

const projectImg1 = new Proxy({"src":"/_astro/administration.DyIGU903.png","width":1917,"height":1020,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Probook/Desktop/GuijosaPortafolio/src/assets/images/pos/administration.png";
							}
							
							return target[name];
						}
					});

const projectImg2 = new Proxy({"src":"/_astro/colecciones.BY8Ui7EC.png","width":1919,"height":909,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Probook/Desktop/GuijosaPortafolio/src/assets/images/nakawe/colecciones.png";
							}
							
							return target[name];
						}
					});

const projectImg3 = new Proxy({"src":"/_astro/escritorio.DNdY-Bt4.png","width":1040,"height":607,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Probook/Desktop/GuijosaPortafolio/src/assets/images/perfumes/escritorio.png";
							}
							
							return target[name];
						}
					});

const $$ProjectsSection = createComponent(($$result, $$props, $$slots) => {
  const projects = [
    {
      id: 1,
      title: "Punto de venta corporativo - Desktop Interfaz moderna",
      description: "Punto de Venta corporativo desarrollado con Python y PyQt6, dise\xF1ado para optimizar las operaciones comerciales con una interfaz intuitiva, moderna, funcionalidades robustas y librer\xEDa propia para lograr animaciones modernas. Conexi\xF3n con terminar MercadoPago. Enfocado para la mayoria de giros comerciales.",
      image: projectImg1.src,
      detailsUrl: "/projects/punto-de-venta",
      year: "2024 - En curso",
      tags: ["Python", "PyQt6", "MySQL"],
      gradient: "from-blue-500/10",
      repoUrl: "https://github.com/tu-usuario/tu-repo",
      liveUrl: "#"
    },
    {
      id: 2,
      title: "Nakaw\xE9 - Web full-stack e-commerce",
      description: 'Desarrollo de una plataforma web full-stack que integra funciones informativas, administrativas y de comercio electr\xF3nico, utilizando tecnolog\xEDas modernas para ofrecer soluciones eficientes y robustas. Consumiendo APis de PayPal y Stripe para la pasarela de pagos. Desarrollo colaborativo con <a href="https://github.com/DiegoPasaye" target="_blank" rel="noopener noreferrer" class="font-bold">DiegoPasaye</a>.',
      image: projectImg2.src,
      detailsUrl: "/projects/web-full-stack",
      year: "2025 - En curso",
      tags: ["NextJS", "Neon Serverless", "Postgres", "CSS", "Tailwind CSS", "TypeScript"],
      gradient: "from-green-500/10",
      repoUrl: "https://github.com/tu-usuario/tu-repo-2",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "Diario de perfumes - App M\xF3vil",
      description: "Proyecto universitario desarrollado con React y Ionic, app para registrar y guardar los perfumes favoritos de una personas o uno mismo. Utilizando LocalStorage para guardar los datos de los perfumes. La idea a futuro era que la app pudiera dar links de compra de los perfumes favoritos.",
      image: projectImg3.src,
      detailsUrl: "/projects/app-movil",
      year: "2025 - Finalizado",
      tags: ["React", "Ionic", "LocalStorage", "Tailwind CSS", "TypeScript"],
      gradient: "from-green-500/10",
      repoUrl: "https://github.com/tu-usuario/tu-repo-2",
      liveUrl: "#"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="containerProjects" data-astro-cid-sj22xp5p> <div class="titleSection" data-astro-cid-sj22xp5p> <h1 data-astro-cid-sj22xp5p>Proyectos <span data-astro-cid-sj22xp5p>Destacados</span></h1> <p data-astro-cid-sj22xp5p>
Algunos proyectos de mi autoría que demuestran mi experiencia en el desarrollo full-stack y mi capacidad para crear soluciones innovadoras.
</p> </div> <div class="cards" data-astro-cid-sj22xp5p> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10" data-astro-cid-sj22xp5p> ${projects.map((project, index) => renderTemplate`${renderComponent($$result, "ProjectsCard", ProjectCard, { "project": project, "index": index, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/projects/ProjectsCard.jsx", "client:component-export": "default", "data-astro-cid-sj22xp5p": true })}`)} </div> </div> </section> `;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/projects/ProjectsSection.astro", void 0);

const $$Astro = createAstro();
const $$SkillCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SkillCard;
  return renderTemplate`${maybeRenderHead()}<div class="skillCard" data-astro-cid-rwasicqo> <div class="skillHeader" data-astro-cid-rwasicqo> <div class="rounded-xl bg-[var(--clr-accent-transparent)]/20 icon p-2 transition-colors" data-astro-cid-rwasicqo> <span data-astro-cid-rwasicqo>${renderComponent($$result, "Globe", Globe, { "data-astro-cid-rwasicqo": true })} </span> </div> <div class="title" data-astro-cid-rwasicqo>
Frontend
</div> </div> <div data-astro-cid-rwasicqo> <ul data-astro-cid-rwasicqo> <li data-astro-cid-rwasicqo>HTML</li> <li data-astro-cid-rwasicqo>CSS</li> <li data-astro-cid-rwasicqo>JavaScript</li> <li data-astro-cid-rwasicqo>Tailwind CSS</li> <li data-astro-cid-rwasicqo>TypeScript</li> <li data-astro-cid-rwasicqo>Astro</li> <li data-astro-cid-rwasicqo>NextJS</li> <li data-astro-cid-rwasicqo>React</li> </ul> </div> </div> <div class="skillCard" data-astro-cid-rwasicqo> <div class="skillHeader" data-astro-cid-rwasicqo> <div class="rounded-xl bg-[var(--clr-accent-transparent)]/20 icon p-2 transition-colors" data-astro-cid-rwasicqo> <span data-astro-cid-rwasicqo>${renderComponent($$result, "Server", Server, { "data-astro-cid-rwasicqo": true })} </span> </div> <div class="title" data-astro-cid-rwasicqo>
Backend
</div> </div> <div data-astro-cid-rwasicqo> <ul data-astro-cid-rwasicqo> <li data-astro-cid-rwasicqo>Laravel</li> <li data-astro-cid-rwasicqo>Python</li> <li data-astro-cid-rwasicqo>NodeJS</li> </ul> </div> </div> <div class="skillCard" data-astro-cid-rwasicqo> <div class="skillHeader" data-astro-cid-rwasicqo> <div class="rounded-xl bg-[var(--clr-accent-transparent)]/20 icon p-2 transition-colors" data-astro-cid-rwasicqo> <span data-astro-cid-rwasicqo>${renderComponent($$result, "Database", Database, { "data-astro-cid-rwasicqo": true })} </span> </div> <div class="title" data-astro-cid-rwasicqo>
Database
</div> </div> <div data-astro-cid-rwasicqo> <ul data-astro-cid-rwasicqo> <li data-astro-cid-rwasicqo>Neon Serverless</li> <li data-astro-cid-rwasicqo>MariaDB</li> <li data-astro-cid-rwasicqo>MySQL</li> </ul> </div> </div> <div class="skillCard" data-astro-cid-rwasicqo> <div class="skillHeader" data-astro-cid-rwasicqo> <div class="rounded-xl bg-[var(--clr-accent-transparent)]/20 icon p-2 transition-colors" data-astro-cid-rwasicqo> <span data-astro-cid-rwasicqo>${renderComponent($$result, "Cloud", Cloud, { "data-astro-cid-rwasicqo": true })} </span> </div> <div class="title" data-astro-cid-rwasicqo>
DevOps
</div> </div> <div data-astro-cid-rwasicqo> <ul data-astro-cid-rwasicqo> <li data-astro-cid-rwasicqo>Vercel</li> <li data-astro-cid-rwasicqo>Cloudflare</li> </ul> </div> </div> <div class="skillCard" data-astro-cid-rwasicqo> <div class="skillHeader" data-astro-cid-rwasicqo> <div class="rounded-xl bg-[var(--clr-accent-transparent)]/20 icon p-2 transition-colors" data-astro-cid-rwasicqo> <span data-astro-cid-rwasicqo>${renderComponent($$result, "Smartphone", Smartphone, { "data-astro-cid-rwasicqo": true })} </span> </div> <div class="title" data-astro-cid-rwasicqo>
Mobile
</div> </div> <div data-astro-cid-rwasicqo> <ul data-astro-cid-rwasicqo> <li data-astro-cid-rwasicqo>Ionic</li> </ul> </div> </div> <div class="skillCard" data-astro-cid-rwasicqo> <div class="skillHeader" data-astro-cid-rwasicqo> <div class="rounded-xl bg-[var(--clr-accent-transparent)]/20 icon p-2 transition-colors" data-astro-cid-rwasicqo> <span data-astro-cid-rwasicqo>${renderComponent($$result, "Terminal", Terminal, { "data-astro-cid-rwasicqo": true })} </span> </div> <div class="title" data-astro-cid-rwasicqo>
Tools
</div> </div> <div data-astro-cid-rwasicqo> <ul data-astro-cid-rwasicqo> <li data-astro-cid-rwasicqo>Git</li> <li data-astro-cid-rwasicqo>Figma</li> <li data-astro-cid-rwasicqo>Bruno</li> <li data-astro-cid-rwasicqo>VS Code</li> <li data-astro-cid-rwasicqo>Windsurf</li> </ul> </div> </div> `;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/skills/SkillCard.astro", void 0);

const $$SkillsSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="containerSkills" data-astro-cid-5dr26myy> <div data-astro-cid-5dr26myy> <h1 data-astro-cid-5dr26myy>Habilidades <span data-astro-cid-5dr26myy>Tech</span></h1> <p data-astro-cid-5dr26myy>
Las tecnologias y herramientas con las que he trabajado a lo largo
            de mi carrera.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10" data-astro-cid-5dr26myy> ${renderComponent($$result, "SkillCard", $$SkillCard, { "data-astro-cid-5dr26myy": true })} </div> </section> `;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/skills/SkillsSection.astro", void 0);

const $$AboutMeSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="containerAboutMe" data-astro-cid-prpggrsw> <h1 data-astro-cid-prpggrsw>AboutMe</h1> <div class="content" data-astro-cid-prpggrsw> <div data-astro-cid-prpggrsw> <p data-astro-cid-prpggrsw>
I'm a passionate full-stack developer with a keen eye for creating
        elegant, efficient solutions. My journey in software development began
        with a curiosity for how things work and evolved into a career of
        building impactful digital experiences. I specialize in modern web
        technologies, from crafting pixel-perfect user interfaces to
        architecting scalable backend systems. I believe in writing clean,
        maintainable code and staying current with industry best practices. When
        I'm not coding, you'll find me exploring new technologies, contributing
        to open-source projects, or sharing knowledge with the developer
        community.
</p> </div> <div data-astro-cid-prpggrsw> <div data-astro-cid-prpggrsw>
Years experiences
</div> <div data-astro-cid-prpggrsw>
Years experiences
</div> <div data-astro-cid-prpggrsw>
Years experiences
</div> <div data-astro-cid-prpggrsw>
Years experiences
</div> </div> </div> </div> `;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/aboutMe/AboutMeSection.astro", void 0);

const experiences = [
    {
        id: 1,
        title: "Full Stack Developer y diseñador UI/UX",
        company: "Nakawé",
        location: "Chiapas, México (Remoto)",
        period: "2023 - Actualidad",
        duration: "1 año",
        description:
            "Desarrollo de una web full-stack para la fines informativos, administrativos y de comercio electrónico. Diseñé todo el UX/UI en Figma, diseñé la base de datos y trabajé indiviualmente el 90% del módulo de marketplace, incluyendo integración con pasarelas de pago y funcionalidades de administración.",
        achievements: [
            "Marketplace funcional bajo una base de datos SQL integrada con Paypal y Stripe.",
            "Arquitectura escalable para futuros módulos administrativos y de usuarios.",
            "Diseño responsivo y accesible para múltiples dispositivos.",
            "Implementación de mejores prácticas en seguridad y rendimiento web.",
        ],
        technologies: ["NextJS 15", "React", "CSS modules", "Figma", "NodeJS", "Express", "Neon Serverless", "PostgreSQL", "Vercel"],
        icon: "TrendingUp",
        color: "from-[var(--clr-accent)]/20 to-[var(--clr-accent)]/5", 
    },
    {
        id: 2,
        title: "Full Stack Developer",
        company: "DataPc",
        location: "Tijuana, Baja California",
        period: "2023-2024",
        duration: "1 año",
        description:
            "Desarrollo completo (frontend y backend) de un punto de venta corporativo para utilizarse en comercios minoritas y mayoristas en casi todos los giros. Implementación de funcionalidades clave como gestión de inventarios, checking, administración, gráficas de métricas y configuración de terminales.",
        achievements: [
            "Diseño moderno en UI/UX para un programa desktop creando mi propia libreria de animaciones.",
            "Optimizacion de procesos backend para manejo de grandes volúmenes de datos.",
            "Integración con terminales de pago y hardware POS.",
            "View Synchronization con signals y slots para evitar inconsistencias de datos desactualizados.",
        ],
        technologies: ["Python", "PyQt6", "MySQL"],
        icon: "Code2",
        color: "from-[var(--clr-accent)]/15 to-[var(--clr-accent)]/3",
    },
];

const iconMap = {
  TrendingUp,
  Award,
  Code2
};
function ExperienceCard({ experience, index }) {
  const Icon = iconMap[experience.icon];
  if (!Icon) {
    console.error(`Icono principal no encontrado: ${experience.icon}`);
  }
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -20 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.3, delay: index * 0.2 },
      className: "relative group",
      children: [
        index !== experience.totalItems - 1 && /* @__PURE__ */ jsx("div", { className: "absolute left-6 top-24 w-0.5 h-full bg-gradient-to-b from-[var(--clr-accent)]/40 to-transparent hidden md:block" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 md:gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { scale: 1.1, rotate: 5 },
                className: `w-12 h-12 rounded-xl bg-gradient-to-br ${experience.color} border border-[var(--clr-accent)]/20 flex items-center justify-center backdrop-blur-sm relative z-10`,
                children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-[var(--clr-accent)]" })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                whileInView: { opacity: 0.5, scale: 1 },
                className: "absolute inset-0 bg-[var(--clr-accent)]/20 rounded-xl blur-xl"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 pb-12", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "bg-[var(--clr-dark-slate)] border border-[var(--clr-accent)]/20 rounded-2xl p-6 hover:border-[var(--clr-accent)]/70 transition-all duration-300 relative overflow-hidden group",
              children: [
                /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500` }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-2xl mb-2 text-[var(--clr-light-text)]", children: experience.title }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[var(--clr-text-secundary)] mb-3", children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-[var(--clr-accent)]", children: [
                        /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4" }),
                        experience.company
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }),
                        experience.location
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 px-3 py-1 bg-[var(--clr-accent)]/10 border border-[var(--clr-accent)]/20 rounded-full text-[var(--clr-accent)]", children: [
                        /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5" }),
                        experience.period
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[var(--clr-text-secundary)]", children: experience.duration })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[var(--clr-text-secundary)] mb-4 leading-relaxed", children: experience.description }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-sm mb-2 text-[var(--clr-light-text)]", children: "Logros clave:" }),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: (experience.achievements || []).map((achievement, idx) => /* @__PURE__ */ jsxs(
                      motion.li,
                      {
                        initial: { opacity: 0, x: -10 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: true },
                        transition: { delay: index * 0.2 + idx * 0.1 },
                        className: "flex items-start gap-2 text-sm text-[var(--clr-text-secundary)]",
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-[var(--clr-accent)] mt-1.5 flex-shrink-0" }),
                          /* @__PURE__ */ jsx("span", { children: achievement })
                        ]
                      },
                      idx
                    )) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: (experience.technologies || []).map((tech, idx) => /* @__PURE__ */ jsx(
                    motion.span,
                    {
                      initial: { opacity: 0, scale: 0.9 },
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: { once: true },
                      transition: { delay: index * 0.01 + idx * 0.01 },
                      whileHover: {
                        scale: 1.05,
                        y: -2,
                        transition: {
                          type: "spring",
                          duration: 0.3,
                          stiffness: 100,
                          damping: 20
                        }
                      },
                      className: "px-3 py-1 bg-[var(--clr-dark-space)] text-[var(--clr-text-secundary)] text-xs rounded-lg border border-white/20 hover:border-[var(--clr-accent)]/30 transition-colors cursor-default",
                      children: tech
                    },
                    tech
                  )) })
                ] })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}

function ExperienceTitle() {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 },
      className: "text-center mb-16",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-3 mb-4", children: /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-bold", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[var(--clr-light-text)]", children: "Experiencia " }),
          /* @__PURE__ */ jsx("span", { className: "text-[var(--clr-accent)]", children: "Laboral" })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-[var(--clr-text-secundary)] max-w-2xl mx-auto", children: "Mi trayectoria profesional construyendo soluciones tecnológicas innovadoras y escalables" })
      ]
    }
  );
}

const $$ExperienceSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="experience" class="py-24 px-4 bg-[var(--clr-dark-space)]" data-astro-cid-e6lh6fe7> <div class="max-w-5xl mx-auto" data-astro-cid-e6lh6fe7> ${renderComponent($$result, "ExperienceTitle", ExperienceTitle, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/experience/ExperienceTitle.jsx", "client:component-export": "default", "data-astro-cid-e6lh6fe7": true })} <div class="space-y-2" data-astro-cid-e6lh6fe7> ${experiences.map((experience, index) => renderTemplate`${renderComponent($$result, "ExperienceCard", ExperienceCard, { "experience": {
    ...experience,
    totalItems: experiences.length
  }, "index": index, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/experience/ExperienceCard.jsx", "client:component-export": "default", "data-astro-cid-e6lh6fe7": true })}`)} </div> </div> </section> `;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/experience/ExperienceSection.astro", void 0);

const serviceOptions = [
    { value: "web-development", label: "Desarrollo Web" },
    { value: "backend-development", label: "Desarrollo Backend" },
    { value: "frontend-development", label: "Desarrollo Frontend" },
    { value: "fullstack-development", label: "Desarrollo Fullstack" },
    { value: "mobile-development", label: "Desarrollo Móvil" },
    { value: "ui-ux-design", label: "Diseño UI/UX" },
    { value: "consulting", label: "Consultoría Tecnológica" },
    { value: "automation", label: "Automatizaciones" },
    { value: "pos", label: "Punto de venta" },
    { value: "other", label: "Otro" },
];

const $$ContactMeSection = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-wlfy5lar> <div data-astro-cid-wlfy5lar> <h1 data-astro-cid-wlfy5lar>Trabajemos <span data-astro-cid-wlfy5lar>Juntos</span></h1> <p data-astro-cid-wlfy5lar>
¿Tienes una idea o proyecto en mente? Hablemos sobre cómo hacerlo
            realidad.
</p> </div> <div data-astro-cid-wlfy5lar></div> <div class="formContainer" data-astro-cid-wlfy5lar> <div data-astro-cid-wlfy5lar> <h2 data-astro-cid-wlfy5lar>Envíame un mensaje a mi Gmail</h2> <p data-astro-cid-wlfy5lar>
Completa el formulario y me pondré en contacto contigo lo antes
                posible.
</p> </div> <div class="form" data-astro-cid-wlfy5lar> <form id="contact-form" action="/api/send-email" method="POST" data-astro-cid-wlfy5lar> <div data-astro-cid-wlfy5lar> <label for="name" data-astro-cid-wlfy5lar>Nombre <span data-astro-cid-wlfy5lar>*</span></label> <input type="text" id="name" name="name" placeholder="Ej. Thomas Shelby" required data-astro-cid-wlfy5lar> </div> <div data-astro-cid-wlfy5lar> <label for="email" data-astro-cid-wlfy5lar>Correo Electrónico <span data-astro-cid-wlfy5lar>*</span></label> <input type="email" id="email" name="email" placeholder="thomas@ejemplo.com" required data-astro-cid-wlfy5lar> </div> <div data-astro-cid-wlfy5lar> <label for="number" data-astro-cid-wlfy5lar>Teléfono (opcional)</label> <input type="text" id="number" name="number" placeholder="Ej. +52 225 1254 2563" data-astro-cid-wlfy5lar> </div> <div data-astro-cid-wlfy5lar> <label for="service" data-astro-cid-wlfy5lar>Servicio de interés <span data-astro-cid-wlfy5lar>*</span></label> ${renderComponent($$result, "Select", null, { "options": serviceOptions, "placeholder": "Selecciona una opci\xF3n", "name": "service", "required": true, "onChange": ((option) => console.log(option?.value)), "client:only": "react", "client:component-hydration": "only", "data-astro-cid-wlfy5lar": true, "client:component-path": "@/components/ui/Select.jsx", "client:component-export": "default" })} <input type="hidden" id="service-hidden" name="service" required data-astro-cid-wlfy5lar> </div> <div class="message" data-astro-cid-wlfy5lar> <label for="message" data-astro-cid-wlfy5lar>Mensaje <span data-astro-cid-wlfy5lar>*</span></label> <textarea id="message" name="message" rows="5" placeholder="Cuéntame sobre tu proyecto, ideas o locuras..." class="field-sizing-content min-h-16 resize-none" required data-astro-cid-wlfy5lar></textarea> </div> <button id="submit-button" type="submit" data-astro-cid-wlfy5lar> ${renderComponent($$result, "Send", Send, { "height": 20, "width": 20, "data-astro-cid-wlfy5lar": true })} Enviar Mensaje
</button> </form> </div> </div> </section>  ${renderScript($$result, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/contact/ContactMeSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/components/contact/ContactMeSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeaderSection", $$HeaderSection, {})} ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} ${renderComponent($$result2, "ProjectsSection", $$ProjectsSection, {})} ${renderComponent($$result2, "Experience", $$ExperienceSection, {})} ${renderComponent($$result2, "Skills", $$SkillsSection, {})} ${renderComponent($$result2, "ContactMeSection", $$ContactMeSection, {})} ${renderComponent($$result2, "AboutMeSection", $$AboutMeSection, {})} ` })}`;
}, "C:/Users/Probook/Desktop/GuijosaPortafolio/src/pages/index.astro", void 0);

const $$file = "C:/Users/Probook/Desktop/GuijosaPortafolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
