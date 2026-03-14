import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
    Mail,
    Phone,
    MapPin,
    Zap,
    Briefcase,
    GraduationCap,
    ChevronRight,
    ChevronLeft,
    ExternalLink,
    Linkedin,
    Github,
    User,
    Layout,
    Download,
    Settings,
    Database,
    Bot,
    Layers,
    Sun,
    Moon,
    Menu,
    ChevronDown,
    BarChart3,
    BarChart,
    LineChart,
    PieChart,
    Smartphone,
    TrendingUp
} from 'lucide-react';

const IconCloud = lazy(() => import("./components/ui/interactive-icon-cloud").then(m => ({ default: m.IconCloud })));
const SpinningGlobe = lazy(() => import('./Globe').then(m => ({ default: m.Globe })));

const ICON_CLOUD_SLUGS = [
    "claude",
    "copilot",
    "css3",
    "figma",
    "git",
    "github",
    "html5",
    "intellijidea",
    "javascript",
    "kaggle",
    "miro",
    "mysql",
    "odoo",
    "pandas",
    "python",
    "render",
    "sap",
    "slack",
    "googleanalytics",
    "tailwindcss"
];

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.05
        }
    }
};

const CardCarousel = React.memo(({ project, darkMode }) => {
    const images = project.images || [project.image];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const touchStartX = useRef(null);

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else prevImage();
        }
        touchStartX.current = null;
    };

    return (
        <div
            className="relative aspect-video overflow-hidden group/carousel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {images.map((img, idx) => {
                const imgUrl = typeof img === 'string' ? img : img.src;
                const imgScale = (typeof img === 'object' && img.scale) ? img.scale : (project.imageScale || '');

                return (
                    <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-300 ease-in-out"
                        style={{ opacity: idx === currentImageIndex ? 1 : 0, pointerEvents: idx === currentImageIndex ? 'auto' : 'none' }}
                    >
                        <img
                            src={imgUrl}
                            alt={`${project.title} - ${idx + 1}`}
                            loading="lazy"
                            className={`w-full h-full ${project.imageContain ? 'object-contain' : 'object-cover'} ${imgScale} transition-all duration-500`}
                        />
                    </div>
                );
            })}

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute inset-y-0 left-0 flex items-center px-3 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                    >
                        <ChevronLeft size={28} strokeWidth={3} className="text-black transition-colors" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute inset-y-0 right-0 flex items-center px-3 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                    >
                        <ChevronRight size={28} strokeWidth={3} className="text-black transition-colors" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-slate-800' : 'bg-slate-800/50 hover:bg-slate-800/80'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
});





const uiText = {
    en: {
        // Header
        nav: {
            projects: 'Projects',
            expertise: 'Expertise',
            skills: 'Skills',
            experience: 'Experience',
            education: 'Education',
            contact: 'Contact'
        },
        // Hero
        hero: {
            name: 'Zoé Perriard',
            tagline: 'Business Analyst',
            bio: 'Data Analysis | Process Optimization | Information Systems',
            downloadCV: 'CV',
            cvLink: 'https://drive.google.com/file/d/1WA989e5CMMenyba5MDZ7Jf7p0u-MatFk/view?usp=sharing',
            contact: 'Contact',
            linkedin: 'https://www.linkedin.com/in/zoe-perriard/',
            github: 'https://github.com/zoeperriard',
            seeMore: 'See more'
        },
        // Projects
        projects: {
            title: 'Projects',
            modal: {
                role: 'My Role',
                outcome: 'Outcome',
                skills: 'Skills',
            },
            categories: {
                all: 'All',
                academic: 'Academic',
                professional: 'Professional',
            },
            items: [
                {
                    title: "HEIG Bachelor Project",
                    role: "Entrepreneurial Project",
                    outcome: "Opportunity and economic feasibility study for an AI-powered travel planning application for independent senior travelers.",
                    skillsUsed: ["Market Fit", "Strategy", "Financial"],
                    projectLinks: [
                        { label: "Travelpop", url: "https://www.travelpop.app" }
                    ],
                    category: "academic",
                    imageContain: true,
                    image: "/assets/travelpop1.webp",
                    images: [
                        "/assets/travelpop1.webp",
                        "/assets/TAMSAMSOM 2.webp",
                    ]
                },
                {
                    title: "Process Optimization",
                    role: "Consultant",
                    outcome: "Applied project conducted at Swissquote legal department. Analyzed internal processes and performance indicators, mapped operational workflows, and identified opportunities for process optimization and automation.",
                    skillsUsed: ["BPMN", "KPI", "Analysis"],
                    projectLinks: [
                        { label: "Company: Swissquote Bank", url: "https://www.swissquote.com/fr-ch/private" },
                    ],
                    category: "professional",
                    imageContain: true,
                    image: "/assets/Swissquote Bank 1.webp",
                    images: [
                        { src: "/assets/Swissquote Bank 1.webp", scale: "scale-105" },
                        { src: "/assets/BPMN 2.webp"},
                        
                    ]
                },
                {
                    title: "HRIS Data – Employee Attrition",
                    role: "Data Analyst",
                    outcome: "Analysis of an HRIS dataset covering 1,470 employees. Developed analytical visualizations and an interactive Tableau dashboard to identify key factors associated with employee attrition.",
                    skillsUsed: ["Tableau", "Data Visualization", "HR Analytics"],
                    projectLinks: [
                        { label: "Tools: Tableau", url: "https://www.tableau.com/" }
                    ],
                    category: "academic",
                    imageContain: true,
                    image: "/assets/Tableau 1.webp",
                    images: [
                        "/assets/Tableau 1.webp",
                        "/assets/Intro 2.webp",
                        "/assets/Matrice 3.webp",
                        "/assets/Analyse variables 4.webp",
                        "/assets/Analyse KPI 5.webp",
                    ]
                },
                {
                    title: "Market Analysis",
                    role: "Consultant",
                    outcome: "Market research project assessing the attractiveness of Fussy deodorant among consumers aged 18–30 in Vaud, using desk research, interviews, and surveys to analyze consumer behavior and purchase drivers.",
                    skillsUsed: ["Interviews", "Teamwork", "Statistical Analysis"],
                    projectLinks: [
                        { label: "Company: Fussy", url: "https://www.getfussy.com/de?country=CH" },
                    ],
                    category: "academic",
                    image: "/assets/Fussy 1.webp",
                    images: [
                        "/assets/Fussy 1.webp",
                        "/assets/Analyse marche Fussy 2.webp",
                    ]
                }
            ]
        },
        // Expertise
        expertise: {
            title: 'My Expertise',
            items: [
                {
                    title: 'Data Analysis',
                    titleLine1: 'Data',
                    titleLine2: 'Analysis',
                    icon: Database,
                    desc: 'Data preparation, analysis, and exploration to identify actionable insights.'
                },
                {
                    title: 'Business Intelligence',
                    titleLine1: 'Business',
                    titleLine2: 'Intelligence',
                    icon: BarChart3,
                    desc: 'Data visualization and dashboard development to support decision-making.'
                },
                {
                    title: 'Information Systems',
                    titleLine1: 'Information',
                    titleLine2: 'Systems',
                    icon: Settings,
                    desc: 'Modeling and optimization of information systems and business processes.'
                },
                {
                    title: 'Strategic Analysis',
                    titleLine1: 'Strategic',
                    titleLine2: 'Analysis',
                    icon: TrendingUp,
                    desc: 'Analysis and optimization of organizational performance.'
                }
            ]
        },
        // Skills
        skills: {
            title: 'Skills',
            engineering: 'Data Analysis',
            platforms: 'Tools',
            interpersonal: 'Interpersonal',
            languages: 'Languages',
            engineeringSkills: [
                'SQL · Python · Excel',
                'BPMN',
                'HTML · CSS · JS',
            ],
            platformsSkills: [
                'Tableau · Google Analytics',
                'SAP · Odoo',
                'IntelliJ · GitHub',
            ],
            interpersonalSkills: [
                'Problem Solver',
                'Organized',
                'Resourceful',
            ],
            languagesSkills: [
                '🇫🇷 French: Native',
                '🇬🇧 English: Fluent (B2)',
                '🇩🇪 German: Intermediate (B2)',
            ]
        },
        // Experience
        experience: {
            title: 'Experience',
            items: [
                {
                    company: "Swissquote Bank SA",
                    location: "Gland",
                    role: "Legal Operations Officer",
                    period: "2023 - 2025",
                    description: ["Maintenance of operational datasets and production of monthly statistical reports.", "Data preparation, cleaning, and exploratory analysis.","Process automation using Excel (VBA, Pivot Tables, Power Query).", "Coordination of operational information flows in a multilingual environment."]
                },
                {
                    company: "Public Prosecutor’s Office",
                    location: "Renens",
                    role: "Accounting Management Assistant",
                    period: "2021 - 2023",
                    description: ["Processing of creditor payments and cash flow management.", "Contribution to budget monitoring and internal statistical reporting.","Management and transfer of seized assets in coordination with law enforcement."]
                },
                {
                    company: "Municipality of Crissier",
                    location: "Crissier",
                    role: "Commercial Employee Apprentice",
                    period: "2017 - 2021",
                    description: ["Infrastructures Services", "Population Office", "Finance Department", "Administration & Human Resources"]
                }
            ]
        },
        // Education
        education: {
            title: 'Education',
            items: [
                {
                    school: "HEIG-VD, Yverdon",
                    degree: "Bachelor HES-SO in Business Administration",
                    period: "2022 - 2026"
                },
                {
                    school: "EPCL, Lausanne",
                    degree: "Professional Baccalaureate in Post-CFC",
                    period: "2021 - 2022"
                },
                {
                    school: "EPCL, Lausanne",
                    degree: "CFC in Commercial Business",
                    period: "2017 - 2021"
                }
            ]
        },
        // Contact
        contact: {
            title: 'Contact',
            interested: 'Interested in improving your systems?',
            letsConnect: "Let's connect.",
            socials: 'Socials',
            phone: "+41 76 748 62 82",
            email: "zoe.perriard@gmail.com",
            location: "Switzerland",
            nationality: "Swiss"
        },
        // Footer
        footer: {
            extra: ["Fitness", "Kitesurf", "Snowboard"]
        }
    },
    fr: {
        // Header
        nav: {
            projects: 'Projets',
            expertise: 'Expertise',
            skills: 'Compétences',
            experience: 'Expérience',
            education: 'Formation',
            contact: 'Contact'
        },
        // Hero
        hero: {
            name: 'Zoé Perriard',
            tagline: 'Business Analyst',
            bio: "Analyse de données | Optimisation de processus | Systèmes d’information",
            downloadCV: 'CV',
            cvLink: 'https://drive.google.com/file/d/1YUMHkd4dW1K0PrGQPaHNzdQ4GvPNNTlN/view?usp=sharing',
            contact: 'Contact',
            linkedin: 'https://www.linkedin.com/in/zoe-perriard/',
            github: 'https://github.com/zoeperriard',
            seeMore: 'Voir plus'
        },
        // Projects
        projects: {
            title: 'Projets',
            modal: {
                role: 'Mon Rôle',
                outcome: 'Résultat',
                skills: 'Compétences',
            },
            categories: {
                all: 'Tous',
                academic: 'Académique',
                professional: 'Professionnel',
            },
            items: [
                {
                    title: "HEIG Travail Bachelor",
                    role: "Projet entrepreneurial",
                    outcome: "Étude d’opportunité et de faisabilité économique d’une application de planification de voyage automatisée par l’intelligence artificielle pour les voyageurs seniors autonomes.",
                    skillsUsed: ["Analyse de marché", "Stratégie", "Viabilité financière"],
                    projectLinks: [
                        { label: "Travelpop", url: "https://www.travelpop.app" },
                    ],
                    category: "academic",
                    imageContain: true,
                    image: "/assets/travelpop1.webp",
                    images: [
                        "/assets/travelpop1.webp",
                        "/assets/TAMSAMSOM 2.webp",
                    ]
                },
                {
                    title: "Optimisation Processus",
                    role: "Consultante",
                    outcome: "Projet appliqué au sein du département Legal de Swissquote portant sur l’analyse des processus, la cartographie des flux et l’identification d’opportunités d’optimisation et d’automatisation.",
                    skillsUsed: ["BPMN", "KPI", "Analyse"],
                    projectLinks: [
                        { label: "Entreprise : Swissquote Bank", url: "https://www.swissquote.com/fr-ch/private"},
                    ],
                    category: "professional",
                    image: "/assets/Swissquote Bank 1.webp",
                    images: [
                        "/assets/Swissquote Bank 1.webp",
                        "/assets/BPMN 2.webp",
                    ]
                },
                {
                    title: "SIRH Analyse",
                    role: "Analyste de données",
                    outcome: "Étude d’un jeu de données SIRH portant sur 1'470 collaborateurs. Réalisation de visualisations analytiques et d’un tableau de bord interactif sous Tableau afin d’identifier les facteurs associés aux départs des employés.",
                    skillsUsed: ["Tableau", "Visualisation", "Analyse RH"],
                    projectLinks: [
                        { label: "Outils : Tableau", url: "https://www.tableau.com/" }
                    ],
                    category: "academic",
                    imageContain: true,
                    image: "/assets/Tableau 1.webp",
                    imageScale: "scale-75",
                    images: [
                        { src: "/assets/Tableau 1.webp", scale: "scale-100" },
                        { src: "/assets/Intro 2.webp", scale: "scale-100" },
                        { src: "/assets/Matrice 3.webp", scale: "scale-100" },
                        { src: "/assets/Analyse variables 4.webp", scale: "scale-100" },
                        { src: "/assets/Analyse KPI 5.webp", scale: "scale-100" },
                    ]
                },
                {
                    title: "Analyse de Marché",
                    role: "Consultante",
                    outcome: "Étude de marché sur l’attractivité du déodorant Fussy auprès des consommateurs de 18–30 ans dans le canton de Vaud, basée sur une recherche documentaire, des entretiens qualitatifs et des enquêtes quantitatives.",
                    skillsUsed: ["Qualitatif", "Quantitatif", "Statistiques"],
                    projectLinks: [
                        { label: "Entreprise : Fussy", url: "https://www.getfussy.com/de?country=CH" }
                    ],
                    category: "academic",
                    image: "/assets/Fussy 1.webp",
                    images: [
                        "/assets/Fussy 1.webp",
                        "/assets/Analyse marche Fussy 2.webp",
                    ]
                }
            ]
        },
        // Expertise
        expertise: {
            title: 'Mon Expertise',
            items: [
                {
                    title: 'Analyse de Données',
                    titleLine1: 'Analyse de',
                    titleLine2: 'Données',
                    icon: Database,
                    desc: 'Analyse, préparation et exploration de données pour identifier des insights.'
                },
                {
                    title: 'Business Intelligence',
                    titleLine1: 'Business',
                    titleLine2: 'Intelligence',
                    icon: BarChart3,
                    desc: 'Visualisation et création de tableaux de bord pour la prise de décision.'
                },
                {
                    title: 'Systèmes d\'Information',
                    titleLine1: 'Systèmes',
                    titleLine2: 'd\'Information',
                    icon: Settings,
                    desc: 'Modélisation et optimisation des systèmes et processus métier.'
                },
                {
                    title: 'Analyse Stratégique',
                    titleLine1: 'Analyse',
                    titleLine2: 'Stratégique',
                    icon: TrendingUp,
                    desc: 'Analyse et optimisation de la performance organisationnelle.'
                }
            ]
        },
        // Skills
        skills: {
            title: 'Compétences',
            engineering: 'Analyse de données',
            platforms: 'Outils',
            interpersonal: 'Interpersonnel',
            languages: 'Langues',
            engineeringSkills: [
                'SQL · Python · Excel',
                'BPMN',
                'HTML · CSS · JS',
            ],
            platformsSkills: [
                'Tableau · Google Analytics',
                'SAP · Odoo',
                'IntelliJ · PyCharm · GitHub',
            ],
            interpersonalSkills: [
                'Résolution de problèmes',
                'Organisation',
                'Autonomie',
            ],
            languagesSkills: [
                '🇫🇷 Français : Langue maternelle',
                '🇬🇧 Anglais : Courant (B2)',
                '🇩🇪 Allemand : Intermédiaire (B2)'
            ]
        },
        // Experience
        experience: {
            title: 'Expérience',
            items: [
                {
                    company: "Swissquote Bank SA",
                    location: "Gland",
                    role: "Legal Operations Officer",
                    period: "2023 - 2025",
                    description: ["Mise à jour régulière des bases données et réalisation de statistiques mensuelles.", "Préparation, nettoyage et analyse exploratoire de données.", "Automatisation de processus via Excel (macros VBA, tableaux croisés dynamiques, Power Query).", "Gestion et traitement de la correspondance multilingue avec les autorités."]
                },
                {
                    company: "Ministère public cental",
                    location: "Renens",
                    role: "Assistante en gestion comptable",
                    period: "2022 - 2023",
                    description: ["Etablir les paiements créanciers et gérer les liquidités.", "Collaborer à l’établissement du suivi budgétaire et des statistiques internes.", "Gestion et transferts de biens séquestrés en lien avec les forces de l’ordre."]
                },
                {
                    company: "Commune de Crissier",
                    location: "Crissier",
                    role: "Apprentissage d'employée de commerce",
                    period: "2017 - 2021",
                    description: ["Administration & ressources humaines", "Services des finances", "Office de la population.", "Service Infrastructures"]
                }
            ]
        },
        // Education
        education: {
            title: 'Formation',
            items: [
                {
                    school: "HEIG-VD, Yverdon",
                    degree: "Bachelor HES-SO en Economie d'entreprise",
                    period: "2022 - 2026"
                },
                {
                    school: "EPCL, Lausanne",
                    degree: "Maturité professionnelle en Post-CFC",
                    period: "2021 - 2022"
                },
                {
                    school: "EPCL, Lausanne",
                    degree: "CFC en Employée de commerce",
                    period: "2017 - 2021"
                }
            ]
        },
        // Contact
        contact: {
            title: 'Contact',
            interested: 'Vous souhaitez optimiser vos systèmes ?',
            letsConnect: 'Prenons contact.',
            socials: 'Réseaux',
            phone: "+41 76 748 62 82",
            email: "zoe.perriard@gmail.com",
            location: "Suisse",
            nationality: "Suisse"
        },
        // Footer
        footer: {
            copyright: '© {year} Zoé Perriard. Tous droits réservés.',
            extra: ["Fitness", "Kitesurf", "Snowboard"]
        }
    }
};
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
};

const ProjectsSection = React.memo(({ t, darkMode, activeFilter, setActiveFilter }) => {
    return (
        <section id="projects" className={`pt-8 pb-8 scroll-mt-16 border-b ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
            <div className="container mx-auto px-6">
                <div className="mb-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`text-5xl font-bold mb-4 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                    >
                        {t.projects.title}
                    </motion.h2>
                </div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-4 mb-8 justify-center"
                >
                    {Object.entries(t.projects.categories).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveFilter(key)}
                            className={`px-6 py-2 rounded-full text-base font-medium transition-colors border ${
                                activeFilter === key
                                    ? darkMode ? 'bg-brand-blue text-slate-900 border-transparent' : 'bg-brand-blue text-white border-transparent'
                                    : darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-transparent' : 'bg-white text-[#1F2933] hover:bg-[#EDEFF2] border-[#D8DCE3]'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </motion.div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {t.projects.items
                        .filter(project => activeFilter === 'all' || project.category === activeFilter)
                        .map((project) => (
                            <motion.div
                                key={project.title}
                                variants={fadeIn}
                                className={`group rounded-2xl overflow-hidden transition-colors border ${darkMode ? 'bg-slate-900/50 border-slate-800 md:hover:border-slate-700' : 'bg-white border-[#D8DCE3] md:hover:border-brand-blue/40'}`}
                            >
                                <CardCarousel project={project} darkMode={darkMode} />

                                <div
                                    className={`p-8 border-t ${darkMode ? 'border-slate-800' : 'border-[#D8DCE3]'}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className={`text-2xl font-bold transition-colors ${darkMode ? 'md:group-hover:text-brand-blue' : 'md:group-hover:text-brand-blue'} ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-6">

                                        {project.role && (
                                            <div className={`relative pl-4 border-l-2 transition-colors ${darkMode ? 'border-slate-700 md:group-hover:border-brand-blue' : 'border-[#D8DCE3] md:group-hover:border-brand-blue'}`}>
                                                <p className={`text-base font-semibold leading-relaxed transition-colors ${darkMode ? 'text-slate-300 md:group-hover:text-brand-blue' : 'text-[#1F2933] md:group-hover:text-brand-blue'}`}>{project.role}</p>
                                            </div>
                                        )}

                                        {project.outcome && (
                                            <div>
                                                <p className={`text-base leading-relaxed whitespace-pre-line ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{project.outcome}</p>
                                            </div>
                                        )}

                                        {project.skillsUsed && project.skillsUsed.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.skillsUsed.map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className={`px-3 py-1 rounded-full text-sm font-medium border ${darkMode ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-[#F4F5F7] border-[#D8DCE3] text-[#1F2933]'}`}
                                                    >
                            {skill}
                          </span>
                                                ))}
                                            </div>
                                        )}

                                        {project.projectLinks && project.projectLinks.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                {project.projectLinks.map((item, i) => {
                                                    if (item.links) {
                                                        return (
                                                            <div key={i} className="flex flex-wrap items-center gap-x-1">
                                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                                  {item.groupLabel}
                                </span>
                                                                {item.links.map((link, linkIdx) => (
                                                                    <React.Fragment key={linkIdx}>
                                                                        <a
                                                                            href={link.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className={`inline-flex items-center gap-1.5 text-sm transition-colors w-fit ${darkMode ? 'text-slate-300 hover:text-brand-blue' : 'text-[#1F2933] hover:text-brand-blue'}`}
                                                                        >
                                                                            {link.label} <ExternalLink size={14} />
                                                                        </a>
                                                                        {linkIdx < item.links.length - 1 && (
                                                                            <span className={`text-sm mr-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>,</span>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <a
                                                            key={i}
                                                            href={item.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`inline-flex items-center gap-2 text-sm transition-colors w-fit ${darkMode ? 'text-slate-300 hover:text-brand-blue' : 'text-[#1F2933] hover:text-brand-blue'}`}
                                                        >
                                                            {item.label} <ExternalLink size={14} />
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>
        </section>
    );
});

const Portfolio = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const darkMode = (resolvedTheme || theme) === 'dark';
    const [showCloud, setShowCloud] = useState(false);
    const [showGlobe, setShowGlobe] = useState(false);
    const globeRef = useRef(null);

    useEffect(() => {
        if (!mounted) return;

        const cloudTimer = setTimeout(() => setShowCloud(true), 2000);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowGlobe(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (globeRef.current) {
            observer.observe(globeRef.current);
        }

        return () => {
            clearTimeout(cloudTimer);
            observer.disconnect();
        };
    }, [mounted]);

    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        return saved && uiText[saved] ? saved : 'fr';
    });
    const t = uiText[language];

    const switchLanguage = (newLang) => {
        if (newLang === language) return;

        const sectionIds = ['profil', 'projects', 'expertise', 'skills', 'experience', 'education', 'contact'];
        const scrollY = window.scrollY;
        const viewportTop = scrollY;

        // Find which section the TOP of the viewport is inside, and compute proportional progress
        let anchorId = null;
        let proportionalOffset = 0; // 0..1 how far through the section the viewport top is
        let pixelOffsetFromSectionTop = 0;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
                const elTop = el.getBoundingClientRect().top + scrollY;
                if (elTop <= viewportTop) {
                    anchorId = sectionIds[i];
                    const sectionHeight = el.offsetHeight;
                    pixelOffsetFromSectionTop = viewportTop - elTop;
                    proportionalOffset = sectionHeight > 0 ? pixelOffsetFromSectionTop / sectionHeight : 0;
                    break;
                }
            }
        }
        if (!anchorId) {
            anchorId = sectionIds[0];
            proportionalOffset = 0;
        }

        setLanguage(newLang);
        localStorage.setItem('language', newLang);

        setTimeout(() => {
            const el = document.getElementById(anchorId);
            if (el) {
                const newElTop = el.getBoundingClientRect().top + window.scrollY;
                const newSectionHeight = el.offsetHeight;
                const targetScrollY = newElTop + (proportionalOffset * newSectionHeight);
                window.scrollTo({ top: targetScrollY, behavior: 'instant' });
            }
        }, 0);
    };
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const langMenuRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
                setLangMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const [activeFilter, setActiveFilter] = useState('all');



    if (!mounted) {
        return null;
    }

    return (
        <div className={`min-h-screen selection:bg-brand-blue/30 ${darkMode ? 'bg-[#0b1220] text-slate-300' : 'bg-[#F4F5F7] text-[#1F2933]'}`}>
            <nav className={`fixed inset-x-0 top-0 z-50 border-b ${darkMode ? 'border-slate-800/80 bg-[#0b1220]/90' : 'border-[#D8DCE3] bg-[#F4F5F7]/95'}`}>
                <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-6">
                    <a href="#profil" className={`flex items-center gap-2 text-lg font-bold tracking-wide ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                        <Layers className={darkMode ? 'text-brand-blue' : 'text-brand-blue'} size={20} />
                        Portfolio
                    </a>

                    <div className={`hidden items-center gap-8 text-base lg:flex ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                        <a href="#projects" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-brand-blue' : 'hover:text-brand-blue'}`}>
                            <Layout size={16} /> {t.nav.projects}
                        </a>
                        <a href="#expertise" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-brand-blue' : 'hover:text-brand-blue'}`}>
                            <Settings size={16} /> {t.nav.expertise}
                        </a>
                        <a href="#skills" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-brand-blue' : 'hover:text-brand-blue'}`}>
                            <Zap size={16} /> {t.nav.skills}
                        </a>
                        <a href="#experience" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-brand-blue' : 'hover:text-brand-blue'}`}>
                            <Briefcase size={16} /> {t.nav.experience}
                        </a>
                        <a href="#education" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-brand-blue' : 'hover:text-brand-blue'}`}>
                            <GraduationCap size={16} /> {t.nav.education}
                        </a>
                        <a href="#contact" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-brand-blue' : 'hover:text-brand-blue'}`}>
                            <Mail size={16} /> {t.nav.contact}
                        </a>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${darkMode ? 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-700/60' : 'border-[#D8DCE3] bg-white text-[#1F2933] hover:bg-[#EDEFF2]'}`}
                            title="Menu"
                        >
                            <Menu size={20} />
                        </button>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${darkMode ? 'border-slate-700 bg-slate-800/40 text-yellow-400 hover:bg-slate-700/60' : 'border-[#D8DCE3] bg-white text-[#1F2933] hover:text-brand-blue'}`}
                            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <div className="relative" ref={langMenuRef}>
                            <button
                                onClick={() => setLangMenuOpen(!langMenuOpen)}
                                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300 cursor-pointer ${darkMode ? 'border-slate-700 bg-slate-800/40 text-brand-blue hover:bg-slate-700/60' : 'border-[#D8DCE3] bg-white text-[#1F2933] hover:text-brand-blue'}`}
                                title={language === 'en' ? 'Change language' : 'Changer de langue'}
                            >
                                {language === 'en' ? 'EN' : 'FR'}
                            </button>
                            <AnimatePresence>
                                {langMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.15 }}
                                        className={`absolute right-0 mt-2 w-36 rounded-lg border shadow-lg overflow-hidden ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-[#D8DCE3] bg-white'}`}
                                    >
                                        <button
                                            onClick={() => { switchLanguage('en'); setLangMenuOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${language === 'en' ? (darkMode ? 'text-brand-blue bg-slate-700/50' : 'text-brand-blue bg-[#EDEFF2]') : (darkMode ? 'text-slate-300 hover:bg-slate-700/50 hover:text-brand-blue' : 'text-[#1F2933] hover:bg-[#EDEFF2] hover:text-brand-blue')}`}
                                        >
                                            English
                                        </button>
                                        <button
                                            onClick={() => { switchLanguage('fr'); setLangMenuOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${language === 'fr' ? (darkMode ? 'text-brand-blue bg-slate-700/50' : 'text-brand-blue bg-[#EDEFF2]') : (darkMode ? 'text-slate-300 hover:bg-slate-700/50 hover:text-brand-blue' : 'text-[#1F2933] hover:bg-[#EDEFF2] hover:text-brand-blue')}`}
                                        >
                                            Français
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`lg:hidden border-t overflow-hidden ${darkMode ? 'border-slate-800 bg-[#0b1220]/95' : 'border-[#D8DCE3] bg-[#F4F5F7]/95'}`}
                        >
                            <div className={`flex flex-col gap-1 px-6 py-4 text-base ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                                {[
                                    { href: '#projects', icon: Layout, label: t.nav.projects },
                                    { href: '#expertise', icon: Settings, label: t.nav.expertise },
                                    { href: '#skills', icon: Zap, label: t.nav.skills },
                                    { href: '#experience', icon: Briefcase, label: t.nav.experience },
                                    { href: '#education', icon: GraduationCap, label: t.nav.education },
                                    { href: '#contact', icon: Mail, label: t.nav.contact },
                                ].map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800 hover:text-brand-blue' : 'hover:bg-[#EDEFF2] hover:text-brand-blue'}`}
                                    >
                                        <Icon size={16} /> {label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            {/* Hero Section */}
            <header id="profil" className="relative min-h-screen scroll-mt-16 flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[64px] ${darkMode ? 'bg-brand-blue/10' : 'bg-brand-blue/10'}`} />
                    <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[64px] ${darkMode ? 'bg-brand-blue/10' : 'bg-brand-blue/5'}`} />
                </div>

                <motion.div
                    className="container mx-auto px-6 z-10 flex flex-col lg:flex-row items-center justify-between gap-12"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.h1
                            variants={fadeIn}
                            className={`text-4xl md:text-8xl font-bold tracking-tight mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                        >
                            {t.hero.name}
                        </motion.h1>

                        <motion.p
                            variants={fadeIn}
                            className={`text-lg md:text-2xl font-bold mb-6 ${darkMode ? 'text-brand-blue' : 'text-brand-blue'}`}
                        >
                            {t.hero.tagline}
                        </motion.p>

                        <motion.p
                            variants={fadeIn}
                            className={`text-lg md:text-xl font-medium leading-relaxed mb-8 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                        >
                            {t.hero.bio}
                        </motion.p>

                        <motion.div
                            variants={fadeIn}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            {t.hero.cvLink ? (
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={t.hero.cvLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm md:text-base shadow-sm hover:shadow-md ${darkMode ? 'bg-brand-blue text-slate-900 hover:bg-brand-blue/80' : 'bg-brand-blue text-white hover:bg-brand-blue/90'}`}
                                >
                                    <Download size={20} /> {t.hero.downloadCV}
                                </motion.a>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm md:text-base shadow-sm hover:shadow-md ${darkMode ? 'bg-brand-blue text-slate-900 hover:bg-brand-blue/80' : 'bg-brand-blue text-white hover:bg-brand-blue/90'}`}
                                >
                                    <Download size={20} /> {t.hero.downloadCV}
                                </motion.button>
                            )}
                            <div className="flex flex-wrap gap-3">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#contact"
                                    className={`flex items-center gap-2 p-3 border rounded-lg transition-all font-medium shadow-sm hover:shadow-md ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-brand-blue' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#1F2933] hover:text-brand-blue'}`}
                                    title="Contact"
                                >
                                    <Mail size={20} />
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={t.hero.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 p-3 border rounded-lg transition-all font-medium shadow-sm hover:shadow-md ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-brand-blue' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#1F2933] hover:text-brand-blue'}`}
                                    title="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={t.hero.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 p-3 border rounded-lg transition-all font-medium shadow-sm hover:shadow-md ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-brand-blue' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#1F2933] hover:text-brand-blue'}`}
                                    title="GitHub"
                                >
                                    <Github size={20} />
                                </motion.a>
                            </div>
                        </motion.div>

                        <motion.a
                            variants={fadeIn}
                            href="#projects"
                            className={`inline-flex flex-col items-center gap-1 mt-8 transition-colors ${darkMode ? 'text-slate-300 hover:text-brand-blue' : 'text-[#1F2933] hover:text-brand-blue'}`}
                        >
                            <span className="text-sm md:text-base font-bold">{t.hero.seeMore}</span>
                            <ChevronDown size={24} className="animate-bounce" />
                        </motion.a>
                    </div>

                </motion.div>

            </header>

            {/* Projects Section */}
            <ProjectsSection t={t} darkMode={darkMode} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            {/* Expertise Section */}
            <section id="expertise" className={`pt-8 pb-0 scroll-mt-16 ${darkMode ? 'bg-[#0b1220]' : 'bg-[#F4F5F7]'}`}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                        >
                            Expertise
                        </motion.h2>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
                    >
                        {t.expertise.items.map((item, i) => {
                            const Icon = item.icon || Database;

                            // Responsive column helpers (0-based index):
                            const isLast = i === t.expertise.items.length - 1;
                            const isRightColMd = i % 2 === 1; // md:grid-cols-2 → right column items shouldn't draw a divider
                            const isLastColLg = i % 4 === 3;   // lg:grid-cols-4 → last column shouldn't draw a divider

                            // Classes to control the independent separator between items
                            const mobileAfterToggle = isLast ? 'after:hidden' : 'after:block';
                            const mdAfterToggle = isRightColMd ? 'md:after:hidden' : 'md:after:block';
                            const lgAfterToggle = isLastColLg ? 'lg:after:hidden' : 'lg:after:block';

                            return (
                                <div
                                    key={i}
                                    className={[
                                        "relative px-12 pt-5 pb-8 md:py-8",
                                        // Independent separator: horizontal on mobile, vertical on md+
                                        "after:absolute after:pointer-events-none",
                                        // Mobile: horizontal line at bottom
                                        "after:bottom-0 after:left-12 after:right-12 after:h-px after:w-auto",
                                        // md+: vertical line at right
                                        "md:after:top-8 md:after:bottom-8 md:after:right-0 md:after:left-auto md:after:w-px md:after:h-auto",
                                        darkMode ? "after:bg-slate-700" : "after:bg-[#D8DCE3]",
                                        mobileAfterToggle,
                                        mdAfterToggle,
                                        lgAfterToggle,
                                    ].join(" ")}
                                >
                                    <div className="relative h-full flex flex-col items-center">
                                        <div className="mb-2 p-3 w-fit mx-auto transition-colors">
                                            <Icon className={`${darkMode ? 'text-brand-blue' : 'text-brand-blue'}`} size={28} />
                                        </div>
                                        <h3 className={`text-xl font-bold mb-2 text-center ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                                            {item.titleLine1 ? (<>{item.titleLine1}<br />{item.titleLine2}</>) : item.title}
                                        </h3>
                                        <div className="flex justify-center flex-grow">
                                            <p className={`text-base leading-relaxed text-center max-w-xs ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className={`py-8 scroll-mt-16 border-b ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                        >
                            {t.skills.title}
                        </motion.h2>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left: 3 stacked cards */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-6">
                            {/* Technical Card */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Engineering Card */}
                                <div className="p-6">
                                    <div className="flex flex-col items-center">
                                        <h4 className={`text-lg font-bold mb-4 text-center w-full ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.skills.engineering}</h4>
                                        <div className="space-y-3 w-fit mx-auto">
                                            {t.skills.engineeringSkills.map((skill, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-brand-blue' : 'bg-brand-blue'}`} />
                                                    <span className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Platforms Card */}
                                <div className="p-6">
                                    <div className="flex flex-col items-center">
                                        <h4 className={`text-lg font-bold mb-4 text-center w-full ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.skills.platforms}</h4>
                                        <div className="space-y-3 w-fit mx-auto">
                                            {t.skills.platformsSkills.map((skill, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-brand-blue' : 'bg-brand-blue'}`} />
                                                    <span className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Interpersonal Card */}
                                <div className="p-6">
                                    <div className="flex flex-col items-center">
                                        <h4 className={`text-lg font-bold mb-4 text-center w-full ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.skills.interpersonal}</h4>
                                        <div className="space-y-3 w-fit mx-auto">
                                            {t.skills.interpersonalSkills.map((skill, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-brand-blue' : 'bg-brand-blue'}`} />
                                                    <span className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Languages Card */}
                                <div className="p-6">
                                    <div className="flex flex-col items-center">
                                        <h4 className={`text-lg font-bold mb-4 text-center w-full ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.skills.languages}</h4>
                                        <div className="space-y-3 w-fit mx-auto">
                                            {t.skills.languagesSkills.map((lang, i) => (
                                                <div key={i} className="flex items-center gap-3"><span className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{lang}</span></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Icon Cloud */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/2 relative flex items-center justify-center"
                        >
                            <div className="relative z-10 w-full max-w-md">
                                <Suspense fallback={<div className="w-full aspect-square" />}>
                                    {showCloud && <IconCloud iconSlugs={ICON_CLOUD_SLUGS} darkMode={darkMode} />}
                                </Suspense>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience section */}
            <section id="experience" className={`py-8 scroll-mt-16 border-b ${darkMode ? 'bg-[#0b1220] border-slate-800' : 'bg-[#F4F5F7] border-[#D8DCE3]'}`}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                        >
                            {t.experience.title}
                        </motion.h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className={`absolute left-0 top-[1rem] bottom-0 w-px ${darkMode ? 'bg-slate-700' : 'bg-[#D8DCE3]'}`} />
                            {t.experience.items.map((exp, index) => (
                                <div
                                    key={index}
                                    className="relative pl-8 pb-12 last:pb-0"
                                >
                                    <div className={`absolute -left-1.5 top-2.5 w-3 h-3 rounded-full z-10 ${darkMode ? 'bg-brand-blue' : 'bg-brand-blue'}`} />
                                    <div className="mb-4">
                                        <div className="flex items-baseline justify-between gap-4">
                                            <h3 className={`text-2xl font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{exp.role}</h3>
                                            <span className={`text-base whitespace-nowrap ${darkMode ? 'text-brand-blue' : 'text-brand-blue'}`}>{exp.period}</span>
                                        </div>
                                        {Array.isArray(exp.company) ? exp.company.map((c, i) => (
                                            <p
                                                key={i}
                                                className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                                            >
                                                {c}{Array.isArray(exp.location) && exp.location[i] ? `, ${exp.location[i]}` : exp.location ? `, ${exp.location}` : ''}
                                            </p>
                                        )) : (
                                            <p className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                                        )}
                                    </div>
                                    <ul className={`text-base leading-relaxed space-y-1 ml-[5px] ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                                        {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((d, i) => (
                                            <li key={i} className="flex gap-2"><span className="mt-[0.70em] min-w-[5px] w-[5px] h-[5px] rounded-full bg-current flex-shrink-0" /><span>{d}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Education section */}
            <section id="education" className={`py-8 scroll-mt-16 border-b ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                        >
                            {t.education.title}
                        </motion.h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className={`absolute left-0 top-[1rem] bottom-0 w-px ${darkMode ? 'bg-slate-700' : 'bg-[#D8DCE3]'}`} />
                            {t.education.items.map((edu, index) => (
                                <div
                                    key={index}
                                    className="relative pl-8 pb-12 last:pb-0"
                                >
                                    <div className={`absolute -left-1.5 top-2.5 w-3 h-3 rounded-full z-10 ${darkMode ? 'bg-brand-blue' : 'bg-brand-blue'}`} />
                                    <div className="mb-0">
                                        <div className="flex items-baseline justify-between gap-4">
                                            {(() => {
                                                const parts = edu.degree.split(language === 'fr' ? / en /i : / in /i);
                                                const diploma = parts[0];
                                                return <h3 className={`text-2xl font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{diploma}</h3>;
                                            })()}
                                            <span className={`text-base whitespace-nowrap ${darkMode ? 'text-brand-blue' : 'text-brand-blue'}`}>{edu.period}</span>
                                        </div>
                                        {(() => {
                                            const parts = edu.degree.split(language === 'fr' ? / en /i : / in /i);
                                            const field = parts.length > 1 ? parts.slice(1).join(language === 'fr' ? ' en ' : ' in ') : null;
                                            return (
                                                <>
                                                    {field && (
                                                        <p className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{field}</p>
                                                    )}
                                                    <p className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{edu.school}</p>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Contact */}
            <footer id="contact" className={`pt-8 pb-0 scroll-mt-16 ${darkMode ? 'bg-[#0b1220]' : 'bg-[#F4F5F7]'}`}>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                        >
                            {t.contact.title || 'Contact'}
                        </motion.h2>
                    </div>
                    <p className={`text-lg leading-relaxed mb-12 text-center ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                        {t.contact.interested || 'Interested in improving your systems?'}
                        <br />
                        {t.contact.letsConnect || "Let's connect."}
                    </p>

                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-10">
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-full border ${darkMode ? 'bg-slate-800 text-brand-blue border-transparent' : 'bg-white text-brand-blue border-[#D8DCE3]'}`}>
                                    <Mail size={24} />
                                </div>
                                <p className={`text-base font-semibold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.contact.email}</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-full border ${darkMode ? 'bg-slate-800 text-brand-blue border-transparent' : 'bg-white text-brand-blue border-[#D8DCE3]'}`}>
                                    <Phone size={24} />
                                </div>
                                <p className={`text-base font-semibold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.contact.phone}</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-full border ${darkMode ? 'bg-slate-800 text-brand-blue border-transparent' : 'bg-white text-brand-blue border-[#D8DCE3]'}`}>
                                    <MapPin size={24} />
                                </div>
                                <p className={`text-base font-semibold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.contact.location}</p>
                            </div>
                            <div>
                                <h4 className={`text-base font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.contact.socials || 'Socials'}</h4>
                                <div className="flex gap-4">
                                    <a href="https://www.linkedin.com/in/zoe-perriard/" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-colors border ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-brand-blue border-transparent' : 'bg-white text-[#1F2933] hover:bg-[#EDEFF2] hover:text-brand-blue border-[#D8DCE3]'}`}>
                                        <Linkedin size={24} />
                                    </a>
                                    <a href="https://github.com/zoeperriard" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-colors border ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-brand-blue border-transparent' : 'bg-white text-[#1F2933] hover:bg-[#EDEFF2] hover:text-brand-blue border-[#D8DCE3]'}`}>
                                        <Github size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[400px]"
                            ref={globeRef}
                        >
                            <div className="relative z-10 w-full max-w-sm lg:max-w-lg -mt-12">
                                <Suspense fallback={<div className="w-full aspect-square" />}>
                                    {showGlobe && <SpinningGlobe darkMode={darkMode} />}
                                </Suspense>
                            </div>
                        </motion.div>
                    </div>

                    <div className={`mt-8 pt-6 border-t text-center text-sm pb-6 ${darkMode ? 'border-slate-800 text-slate-300' : 'border-[#D8DCE3] text-[#1F2933]'}`}>
                        © {new Date().getFullYear()} Zoé Perriard. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Portfolio;
