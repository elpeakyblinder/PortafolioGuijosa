export const experiences = [
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

export const stats = [
    { label: "Años de experiencia", value: "3+", icon: "TrendingUp" },
    { label: "Proyectos completados", value: "15+", icon: "Award" },  
    { label: "Tecnologías dominadas", value: "10+", icon: "Code2" },  
];