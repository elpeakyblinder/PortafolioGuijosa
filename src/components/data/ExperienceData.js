export const experiences = [
    {
        id: 1,
        title: "Co-Founder & Full Stack Lead",
        company: "NoMaTech",
        location: "Morelia, Michoacán",
        period: "2026 - Actualidad",
        duration: "Actual",
        description:
            "Cofundador y líder técnico de NoMaTech, empresa especializada en automatización inteligente de procesos empresariales. Desde la orquestación de flujos documentales complejos (licitaciones gubernamentales con pipelines de IA) hasta soluciones de automatización a medida — tanto nativas como no-code — para la modernización digital de negocios. Desarrollo de plataformas con integración de tokenización, Web3 y arquitecturas serverless.",
        achievements: [
            "Diseño y desarrollo del sistema de automatización de licitaciones con pipelines de IA (Gemini + Azure Document Intelligence).",
            "Implementación de arquitectura WebSocket para procesamiento en tiempo real de documentación compleja.",
            "Desarrollo de soluciones de automatización empresarial end-to-end adaptadas a cada cliente.",
            "Integración de tecnologías Web3 y tokenización en flujos de negocio.",
        ],
        technologies: ["Next.js", "FastAPI", "Python", "TypeScript", "Solidity", "Gemini API", "Azure Document Intelligence", "WebSockets", "SQLAlchemy", "Supabase"],
        icon: "Rocket",
        color: "from-[var(--clr-accent)]/20 to-[var(--clr-accent)]/5",
    },
    {
        id: 2,
        title: "Full Stack Developer y diseñador UI/UX",
        company: "Nakawé",
        location: "Chiapas, México (Remoto)",
        period: "2025",
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
        id: 3,
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

export const stats = [
    { label: "Años de experiencia", value: "3+", icon: "TrendingUp" },
    { label: "Proyectos completados", value: "15+", icon: "Award" },  
    { label: "Tecnologías dominadas", value: "10+", icon: "Code2" },  
];