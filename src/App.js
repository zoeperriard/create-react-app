import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { 
  Download, 
  Linkedin, 
  Mail, 
  Database, 
  BarChart, 
  Cpu, 
  TrendingUp, 
  Github, 
  Phone, 
  MapPin, 
  Brain,
  Layers,
  Search,
  Zap,
  Calendar,
  User,
  GraduationCap,
  Briefcase, 
  Globe, 
  Lightbulb, 
  Clock, 
  BookOpen, 
  Users, 
  Award, 
  MessageCircle, 
  Camera, 
  Heart, 
  Car,
  Target,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const translations = {
  fr: {
    nav: {
      brand: "Mon Portfolio",
      profil: "Profil",
      projets: "Projets",
      competences: "Compétences",
      experience: "Expérience",
      formation: "Formation",
      contact: "Contact"
    },
    hero: {
      greeting: "Bonjour, je suis",
      name: "Zoé",
      surname: "Perriard",
      jobTitle: "Data Analyst, passionnée par les nouvelles technologies, l'innovation et la transformation digitale",
      description: "Passionnée par la data analysis, l'optimisation des processus métier et la transformation digitale, je suis en dernière année de bachelor en économie d'entreprise en emploi à l'HEIG-VD, avec spécialisation en digitalisation & e-business ainsi qu’en analyse et visualisation de données.",
      downloadCv: "CV",
      cvLink: "https://drive.google.com/file/d/1YUMHkd4dW1K0PrGQPaHNzdQ4GvPNNTlN/view?usp=drive_link",
      contact: "Contact"
    },
    projects: {
      title: "Projets",
      bachelor: {
        title: "Travail de Bachelor : Planification de voyage & IA",
        tagline: "Étude d’opportunité et de faisabilité économique d’une application de planification de voyage assistée par l’IA.",
        contextTitle: "Contexte & Problématique",
        context: "Analyse de l’opportunité, de la désirabilité et de la viabilité économique d’une application de planification de voyage partiellement automatisée, destinée aux voyageurs seniors autonomes.",
        approachTitle: "Approche & Réalisation",
        approach: [
          "Analyse du problème et du segment cible",
          "Désirabilité · Faisabilité · Viabilité",
          "Analyse de marché (TAM · SAM · SOM)",
          "Proposition de valeur & modèle d’affaires",
          "Conception d’un Proof of Concept (POC) et vision produit"
        ],
        pills: ["Désirabilité", "Faisabilité", "Viabilité", "Analyse de marché", "Business Model", "IA"]
      },
      sirh: {
        title: "Analyse de données SIRH",
        description: "Analyse de données et data visualisation sous Tableau pour comprendre les départs des collaborateurs (attrition) à partir de données RH.",
        tasks: [
          "Nettoyage et structuration des données",
          "Modélisation et transformation des données",
          "Création de champs calculés et indicateurs",
          "Analyse exploratoire et KPIs d’attrition",
          "Dashboards interactifs sur Tableau"
        ],
        pills: ["Tableau", "Analyse exploratoire", "Corrélation"]
      },
      process: {
        title: "Analyse et optimisation de processus opérationnel",
        description: "Projet d’analyse de données et de processus réalisé dans un environnement réglementé, visant à améliorer le suivi administratif et la performance opérationnelle.",
        tasks: [
          "Cartographie du processus BPMN",
          "Analyse des données de suivi",
          "Analyse des KPIs (délais, charge, volumes)",
          "Structuration et fiabilisation des données",
          "Recommandations data-driven"
        ],
        pills: ["Excel", "BPMN", "Analyse de données", "KPIs"]
      }
    },
    skills: {
      technical: "Compétences techniques",
      personal: "Compétences personnelles",
      modeling: {
        title: "Analyse et modélisation",
        pills: ["SQL", "Python", "Excel avancé (VBA, Power Query, TCD)", "Analyse exploratoire (EDA)", "Analyse statistique", "Préparation et nettoyage des données"]
      },
      bi: {
        title: "Business Intelligence",
        pills: ["Tableau", "Data visualisation", "Tableaux de bord", "Reporting & KPIs", "Aide à la décision", "Google Analytics (certifiée)"]
      },
      si: {
        title: "Systèmes d'Information",
        pills: ["SAP FI/CO", "Odoo", "CRM", "BPMN", "Automatisation des processus", "Gestion et structuration des données"]
      },
      strategy: {
        title: "Stratégie et performance",
        pills: ["Analyse SWOT & PESTEL", "Analyse de performance", "Optimisation des processus", "Suivi budgétaire", "Transformation digitale", "e-business"]
      },
      soft: [
        "Approche data-driven et esprit analytique",
        "Gestion des priorités",
        "Esprit autodidacte",
        "Travail d’équipe",
        "Proactive et persévérante",
        "Sens de l’écoute et de la communication"
      ]
    },
    languages: {
      title: "Langues",
      fr: { name: "Français", level: "Langue maternelle", flag: "🇫🇷" },
      en: { name: "Anglais", level: "B2", flag: "🇬🇧" },
      de: { name: "Allemand", level: "B1", flag: "🇩🇪" }
    },
    experience: {
      title: "Expériences professionnelles",
      sq: {
        title: "Legal Operations Officer",
        company: "Swissquote Bank SA",
        subtitle1: "Data & automatisation",
        list1: [
          "Mise à jour régulière des bases données et réalisation de statistiques mensuelles",
          "Préparation, nettoyage et analyse exploratoire de données",
          "Automatisation de processus via Excel (macro VBA, tableau croisé dynamique, Power Query)"
        ],
        subtitle2: "Opérations & coordination",
        list2: [
          "Gérer le courrier entrant quotidien en français, allemand, anglais et italien",
          "Traitement et suivi de la correspondance avec les autorités",
          "Coordination des procédures de blocage de comptes",
          "Gestion des délais de réponse aux autorités et notifications aux clients"
        ]
      },
      mp: {
        title: "Assistante en gestion comptable",
        company: "Ministère public central",
        list: [
          "Etablir les paiements créanciers et gérer les liquidités",
          "Collaborer à l’établissement du suivi budgétaire et des statistiques internes",
          "Gestion et transferts de biens séquestrés en lien avec les forces de l’ordre"
        ]
      },
      app: {
        title: "Apprentissage d'employée de commerce",
        company: "Commune de Crissier",
        list: [
          "2020 – 2021 Service des Infrastructures",
          "2019 – 2020 Contrôle des habitants",
          "2018 – 2019 Services des finances",
          "2017 – 2018 Administration & Ressources humaines"
        ]
      }
    },
    formation: {
      title: "Formation",
      bachelor: {
        title: "Bachelor HES-SO",
        subtitle: "Économie d'Entreprise",
        school: "HEIG-VD, Yverdon",
      },
      maturite: {
        title: "Maturité post-CFC",
        subtitle: "Économie et Services",
        school: "EPCL, Lausanne"
      },
      cfc: {
        title: "CFC d’employée de commerce",
        subtitle: "Administration Publique",
        school: "EPCL, Lausanne"
      }
    },
    contact: {
      title: "Restons en contact",
      subtitle: "Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités.",
      about: {
        title: "À propos de moi",
        age: "Suissesse",
        driving: "Permis de conduire : catégorie B",
        interests: "Intérêts : Snowboard, Kitesurf, Fitness"
      },
      info: {
        location: "Lausanne, Suisse",
        email: "zoe.perriard@gmail.com",
        social: "Réseaux sociaux"
      },
      footer: "©2026 Zoé Perriad. Tous droits réservés."
    }
  },
  en: {
    nav: {
      brand: "My Portfolio",
      profil: "Profile",
      projets: "Projects",
      competences: "Skills",
      experience: "Experience",
      formation: "Education",
      contact: "Contact"
    },
    hero: {
      name: "Zoé",
      surname: "Perriard",
      jobTitle: "Business Analyst",
      description: "Passionate about data analysis, business process optimization, and digital transformation, I am in my final year of a Bachelor's degree in Business Administration while working at HEIG-VD, specializing in digitalization & e-business as well as data analysis and visualization.",
      downloadCv: "CV",
      cvLink: "https://drive.google.com/file/d/1WA989e5CMMenyba5MDZ7Jf7p0u-MatFk/view?usp=drive_link",
      contact: "Contact"
    },
    projects: {
      title: "Projects",
      bachelor: {
        title: "Bachelor Thesis: Travel Planning & AI",
        tagline: "Economic opportunity and feasibility study for an AI-assisted travel planning application.",
        contextTitle: "Context & Problem",
        context: "Analysis of the opportunity, desirability, and economic viability of a partially automated travel planning application intended for autonomous senior travelers.",
        approachTitle: "Approach & Realization",
        approach: [
          "Problem and target segment analysis",
          "Desirability · Feasibility · Viability",
          "Market analysis (TAM · SAM · SOM)",
          "Value proposition & business model",
          "Proof of Concept (POC) design and product vision"
        ],
        pills: ["Desirability", "Feasibility", "Viability", "Market Analysis", "Business Model", "AI"]
      },
      sirh: {
        title: "HRIS Data Analysis",
        description: "Data analysis and visualization in Tableau to understand employee turnover (attrition) from HR data.",
        tasks: [
          "Data cleaning and structuring",
          "Data modeling and transformation",
          "Creation of calculated fields and indicators",
          "Exploratory analysis and attrition KPIs",
          "Interactive dashboards on Tableau"
        ],
        pills: ["Tableau", "Exploratory Analysis", "Correlation"]
      },
      process: {
        title: "Operational Process Analysis and Optimization",
        description: "Data and process analysis project carried out in a regulated environment, aiming to improve administrative monitoring and operational performance.",
        tasks: [
          "BPMN process mapping",
          "Monitoring data analysis",
          "KPI analysis (delays, load, volumes)",
          "Data structuring and reliability",
          "Data-driven recommendations"
        ],
        pills: ["Excel", "BPMN", "Data Analysis", "KPIs"]
      }
    },
    skills: {
      technical: "Technical Skills",
      personal: "Personal Skills",
      modeling: {
        title: "Analysis and Modeling",
        pills: ["SQL", "Python", "Advanced Excel (VBA, Power Query, TCD)", "Exploratory Analysis (EDA)", "Statistical Analysis", "Data Cleaning and Preparation"]
      },
      bi: {
        title: "Business Intelligence",
        pills: ["Tableau", "Data Visualization", "Dashboards", "Reporting & KPIs", "Decision Support", "Google Analytics (certified)"]
      },
      si: {
        title: "Information Systems",
        pills: ["SAP FI/CO", "Odoo", "CRM", "BPMN", "Process Automation", "Data Management and Structuring"]
      },
      strategy: {
        title: "Strategy and Performance",
        pills: ["SWOT & PESTEL Analysis", "Performance Analysis", "Process Optimization", "Budgetary Monitoring", "Digital Transformation", "e-business"]
      },
      soft: [
        "Data-driven approach and analytical mindset",
        "Priority management",
        "Self-taught spirit",
        "Teamwork",
        "Proactive and persevering",
        "Listening and communication skills"
      ]
    },
    languages: {
      title: "Languages",
      fr: { name: "French", level: "Native language", flag: "🇫🇷" },
      en: { name: "English", level: "B2", flag: "🇬🇧" },
      de: { name: "German", level: "B1", flag: "🇩🇪" }
    },
    experience: {
      title: "Professional Experience",
      sq: {
        title: "Legal Operations Officer",
        company: "Swissquote Bank SA",
        subtitle1: "What I worked on",
        list1: [
          "Maintain and update operational databases, producing monthly statistical reports for internal monitoring",
          "Prepare, clean, and analyze data through exploratory data analysis"
        ],
        subtitle2: "Automation & tools",
        list2: [
          "Automate reporting and administrative processes using Excel (VBA macros, Pivot Tables, Power Query), improving data reliability"
        ],
        subtitle3: "Context",
        list3: [
            "Manage multilingual correspondence (FR / DE / EN / IT) and official communications with authorities in a regulated environment"
        ]
      },
      mp: {
        title: "Accounting Management Assistant",
        list: [
          "Execute creditor payments and manage liquidity",
          "Collaborate on budgetary monitoring and internal statistics",
          "Management and transfer of seized assets in connection with law enforcement"
        ],
        company: "Canton of Vaud, Public Prosecutor’s Office"
      },
      app: {
        title: "Apprenticeship as a Commercial Employee",
        company: "Municipality of Crissier",
        list: [
          "2020 – 2021 Infrastructure Department",
          "2019 – 2020  Residents' Control",
          "2018 – 2019  Finance Department",
          "2017 – 2018  Administration & Human Resources"
        ]
      }
    },
    formation: {
      title: "Education",
      bachelor: {
        title: "Bachelor HES-SO",
        subtitle: "Économie d'Entreprise",
        schoolname: "HEIG-VD, Yverdon, Switzerland"
      },
      maturite: {
        title: "Post-CFC Maturity",
        subtitle: "Economy and Services",
        schoolname: "EPCL, Lausanne, Switzerland"
      },
      cfc: {
        title: "Federal VET Diploma (CFC), Commercial Employee",
        subtitle: "Public Administration",
        schoolname: "EPCL, Lausanne, Switzerland"
      }
    },
    contact: {
      title: "Let's stay in touch",
      subtitle: "Interested in my profile? Don't hesitate to contact me to discuss opportunities.",
      about: {
        title: "About Me",
        age: "Swiss, 23 years old",
        driving: "Driving license: category B",
        interests: "Interests: Snowboard, Kitesurf, Fitness"
      },
      info: {
        location: "Lausanne, Switzerland",
        email: "zoe.perriard@gmail.com",
        social: "Social media"
      },
      footer: "© Zoé Perriard · Data & Business Analytics"
    }
  }
};

const BackgroundNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    let mouse = { x: null, y: null };
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 25)); // Adaptatif à la taille d'écran
    const connectionDistance = 150;
    const mouseRadius = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    let lastTime = 0;
    const handleMouseMove = (event) => {
      const now = performance.now();
      if (now - lastTime < 16) return; // Limiter à ~60fps
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      lastTime = now;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    let isScrolling = false;
    let scrollTimeout;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5; // Vitesse augmentée
        this.vy = (Math.random() - 0.5) * 1.5; // Vitesse augmentée
        this.size = Math.random() * 2.5 + 1.5;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        // Mouvement de base
        this.x += this.vx;
        this.y += this.vy;

        // Rebond sur les bords
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Interaction avec la souris
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            // Effet de répulsion
            this.x -= directionX * force * 5;
            this.y -= directionY * force * 5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(88, 196, 220, 0.9)';
        ctx.fill();
        
        // Optimisation : réduire le shadowBlur qui est très gourmand
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#58c4dc';
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Si on scrolle, on saute une frame sur deux pour économiser du CPU/GPU
      // et on réduit la complexité des calculs
      if (isScrolling && Math.random() > 0.5) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Désactiver le shadow pour les lignes (très coûteux)
      ctx.shadowBlur = 0;
      
      const pCount = particles.length;
      for (let i = 0; i < pCount; i++) {
        const p = particles[i];
        p.update();
        p.draw();

        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(88, 196, 220, ${(1 - dist / connectionDistance) * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-network-container">
      <canvas ref={canvasRef} className="network-canvas" />
    </div>
  );
};

const Navbar = ({ lang, setLang, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Layers size={24} color="#58c4dc" />
          <span>{t.nav.brand}</span>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="#profil" className="nav-link" onClick={() => setIsOpen(false)}><User size={18} /> {t.nav.profil}</a>
          <a href="#projets" className="nav-link" onClick={() => setIsOpen(false)}><Target size={18} /> {t.nav.projets}</a>
          <a href="#competences" className="nav-link" onClick={() => setIsOpen(false)}><BarChart size={18} /> {t.nav.competences}</a>
          <a href="#experience" className="nav-link" onClick={() => setIsOpen(false)}><Briefcase size={18} /> {t.nav.experience}</a>
          <a href="#formation" className="nav-link" onClick={() => setIsOpen(false)}><GraduationCap size={18} /> {t.nav.formation}</a>
          <a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}><Mail size={18} /> {t.nav.contact}</a>
          
          <div className="lang-selector">
            <button 
              className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} 
              onClick={() => { setLang('fr'); setIsOpen(false); }}
            >
              FR
            </button>
            <span className="lang-divider">|</span>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => { setLang('en'); setIsOpen(false); }}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [lang, setLang] = useState('fr');
  const t = translations[lang];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <Navbar lang={lang} setLang={setLang} t={t} />
      
      {/* Hero Section */}
      <section className="hero" id="profil">
        <BackgroundNetwork />
        <p className="hero-subtitle reveal delay-1">{t.hero.greeting}</p>
        <h1 className="reveal delay-2">{t.hero.name} <span className="accent">{t.hero.surname}</span></h1>
        
        <div className="description-container reveal delay-3">
          <p className="main-desc">
            {t.hero.jobTitle}
          </p>
          <p className="secondary-desc">
            {t.hero.description}
          </p>
        </div>

        <div className="hero-buttons reveal delay-4">
          <a href={t.hero.cvLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <Download size={20} /> {t.hero.downloadCv}
          </a>
          <a href="https://www.linkedin.com/in/zoe-perriard/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/zoeperriard" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <Github size={20} />
          </a>
          <a href="#contact" className="btn btn-outline" title={t.hero.contact}>
            <Mail size={20} />
          </a>
        </div>

        <a href="#projets" className="scroll-indicator reveal delay-5">
          <ChevronDown size={32} />
        </a>
      </section>

      {/* Projets Section */}
      <section id="projets" className="reveal">
        <h2><Target size={32} /> {t.projects.title}</h2>
        
        {/* Travail de Bachelor */}
        <div className="card project-featured reveal" style={{marginBottom: '30px'}}>
          <div className="card-header">
            <div className="icon-wrapper"><GraduationCap size={24} /></div>
            <div>
              <h3>{t.projects.bachelor.title}</h3>
            </div>
          </div>
          
          <div className="project-content-grid">
            <div className="project-info">
              <p className="project-tagline">{t.projects.bachelor.tagline}</p>
              
              <div className="project-section">
                <h4><Search size={16} /> {t.projects.bachelor.contextTitle}</h4>
                <p>{t.projects.bachelor.context}</p>
              </div>

              <div className="project-section">
                <h4><Zap size={16} /> {t.projects.bachelor.approachTitle}</h4>
                <ul className="experience-list">
                  {t.projects.bachelor.approach.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="project-tech">
              <div className="pills-container">
                {t.projects.bachelor.pills.map((pill, i) => (
                  <span key={i} className="pill">{pill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid">
          {/* Projet 2 - SIRH */}
          <div className="card">
            <div className="card-header">
              <div className="icon-wrapper"><BarChart size={24} /></div>
              <h3>{t.projects.sirh.title}</h3>
            </div>
            <div className="project-section">
              <p className="text-muted" style={{marginBottom: '15px'}}>
                {t.projects.sirh.description}
              </p>
              <ul className="experience-list" style={{fontSize: '0.9rem', marginBottom: '20px'}}>
                {t.projects.sirh.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
            <div className="pills-container">
              {t.projects.sirh.pills.map((pill, i) => (
                <span key={i} className="pill">{pill}</span>
              ))}
            </div>
          </div>

          {/* Projet 3 - Rapport pratique pro */}
          <div className="card">
            <div className="card-header">
              <div className="icon-wrapper"><Zap size={24} /></div>
              <h3>{t.projects.process.title}</h3>
            </div>
            <div className="project-section">
              <p className="text-muted" style={{marginBottom: '15px'}}>
                {t.projects.process.description}
              </p>
              <ul className="experience-list" style={{fontSize: '0.9rem', marginBottom: '20px'}}>
                {t.projects.process.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
            <div className="pills-container">
              {t.projects.process.pills.map((pill, i) => (
                <span key={i} className="pill">{pill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Techniques */}
      <section id="competences" className="reveal">
        <h2><BarChart size={32} /> {t.skills.technical}</h2>
        <div className="grid">
          <div className="card reveal delay-1">
            <div className="card-header">
              <div className="icon-wrapper"><TrendingUp size={24} /></div>
              <h3>{t.skills.modeling.title}</h3>
            </div>
            <div className="pills-container">
              <span className="pill"><Database size={16} /> SQL</span>
              <span className="pill"><Zap size={16} /> Python</span>
              <span className="pill"><BarChart size={16} /> {t.skills.modeling.pills[2]}</span>
              <span className="pill"><Layers size={16} /> {t.skills.modeling.pills[3]}</span>
              <span className="pill"><Search size={16} /> {t.skills.modeling.pills[4]}</span>
              <span className="pill"><Search size={16} /> {t.skills.modeling.pills[5]}</span>
            </div>
          </div>

          <div className="card reveal delay-2">
            <div className="card-header">
              <div className="icon-wrapper"><Search size={24} /></div>
              <h3>{t.skills.bi.title}</h3>
            </div>
            <div className="pills-container">
              <span className="pill"><Layers size={16} /> {t.skills.bi.pills[0]}</span>
              <span className="pill"><Layers size={16} /> {t.skills.bi.pills[1]}</span>
              <span className="pill"><BarChart size={16} /> {t.skills.bi.pills[2]}</span>
              <span className="pill"><TrendingUp size={16} /> {t.skills.bi.pills[3]}</span>
              <span className="pill"><TrendingUp size={16} /> {t.skills.bi.pills[4]}</span>
              <span className="pill"><Search size={16} /> {t.skills.bi.pills[5]}</span>
            </div>
          </div>

          <div className="card reveal delay-3">
            <div className="card-header">
              <div className="icon-wrapper"><Database size={24} /></div>
              <h3>{t.skills.si.title}</h3>
            </div>
            <div className="pills-container">
              <span className="pill"><Database size={16} /> SAP FI/CO</span>
              <span className="pill"><Layers size={16} /> Odoo</span>
              <span className="pill"><Users size={16} /> CRM</span>
              <span className="pill"><TrendingUp size={16} /> BPMN</span>
              <span className="pill"><Zap size={16} /> {t.skills.si.pills[4]}</span>
              <span className="pill"><Database size={16} /> {t.skills.si.pills[5]}</span>
            </div>
          </div>

          <div className="card reveal delay-4">
            <div className="card-header">
              <div className="icon-wrapper"><Zap size={24} /></div>
              <h3>{t.skills.strategy.title}</h3>
            </div>
            <div className="pills-container">
              <span className="pill"><Target size={16} /> {t.skills.strategy.pills[0]}</span>
              <span className="pill"><BarChart size={16} /> {t.skills.strategy.pills[1]}</span>
              <span className="pill"><Zap size={16} /> {t.skills.strategy.pills[2]}</span>
              <span className="pill"><TrendingUp size={16} /> {t.skills.strategy.pills[3]}</span>
              <span className="pill"><Lightbulb size={16} /> {t.skills.strategy.pills[4]}</span>
              <span className="pill"><Globe size={16} /> {t.skills.strategy.pills[5]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Personnelles */}
      <section id="soft-skills" className="reveal">
        <h2><Brain size={32} /> {t.skills.personal}</h2>
        <div className="pills-grid">
          <div className="pill-personal reveal delay-1"><Brain size={24} /> {t.skills.soft[0]}</div>
          <div className="pill-personal reveal delay-2"><Clock size={24} /> {t.skills.soft[1]}</div>
          <div className="pill-personal reveal delay-3"><Lightbulb size={24} /> {t.skills.soft[2]}</div>
          <div className="pill-personal reveal delay-4"><Users size={24} /> {t.skills.soft[3]}</div>
          <div className="pill-personal reveal delay-5"><Zap size={24} /> {t.skills.soft[4]}</div>
          <div className="pill-personal reveal delay-5"><MessageCircle size={24} /> {t.skills.soft[5]}</div>
        </div>
      </section>

      {/* Langues et Formation side by side */}
      <section className="reveal section-flex-container">
        <div className="section-column" id="formation">
          <h2><GraduationCap size={32} /> {t.formation.title}</h2>
          <div className="experience-timeline">
            <div className="experience-card reveal delay-1">
              <div className="formation-card">
                <div className="formation-content">
                  <div className="date-badge">2022 – 2026</div>
                  <h3>
                    {t.formation.bachelor.title}
                    <br />
                    <span className="degree-subtitle">{t.formation.bachelor.subtitle}</span>
                  </h3>
                  <p className="school-name">{lang === 'en' ? t.formation.bachelor.schoolname : t.formation.bachelor.school}</p>
                </div>
              </div>
            </div>
            <div className="experience-card reveal delay-2" style={{marginTop: '20px'}}>
              <div className="formation-card">
                <div className="formation-content">
                  <div className="date-badge">2021 – 2022</div>
                  <h3>
                    {t.formation.maturite.title}
                    <br />
                    <span className="degree-subtitle">{t.formation.maturite.subtitle}</span>
                  </h3>
                  <p className="school-name">{lang === 'en' ? t.formation.maturite.schoolname : t.formation.maturite.school}</p>
                </div>
              </div>
            </div>
            <div className="experience-card reveal delay-3" style={{marginTop: '20px'}}>
              <div className="formation-card">
                <div className="formation-content">
                  <div className="date-badge">2017 – 2021</div>
                  <h3>
                    {t.formation.cfc.title}
                    <br />
                    <span className="degree-subtitle">{t.formation.cfc.subtitle}</span>
                  </h3>
                  <p className="school-name">{lang === 'en' ? t.formation.cfc.schoolname : t.formation.cfc.school}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-column">
          <div className="card">
            <h3 style={{ marginBottom: '25px' }}>{t.languages.title}</h3>
            <div className="languages-container">
              <div className="language-item reveal delay-1">
                <div className="language-info">
                  <span className="language-name">{t.languages.fr.flag} {t.languages.fr.name}</span>
                  <span className="language-level">{t.languages.fr.level}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="language-item reveal delay-2">
                <div className="language-info">
                  <span className="language-name">{t.languages.en.flag} {t.languages.en.name}</span>
                  <span className="language-level">{t.languages.en.level}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="language-item reveal delay-3">
                <div className="language-info">
                  <span className="language-name">{t.languages.de.flag} {t.languages.de.name}</span>
                  <span className="language-level">{t.languages.de.level}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expériences */}
      <section id="experience" className="reveal">
        <h2><Briefcase size={32} /> {t.experience.title}</h2>
        
        <div className="experience-timeline">
          <div className="experience-card reveal">
            <h3 className="job-title">{t.experience.sq.title}</h3>
            <p className="company-name">{t.experience.sq.company}</p>
            
            <h4 className="experience-subtitle">{t.experience.sq.subtitle1}</h4>
            <ul className="experience-list">
              {t.experience.sq.list1.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h4 className="experience-subtitle">{t.experience.sq.subtitle2}</h4>
            <ul className="experience-list">
              {t.experience.sq.list2.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {t.experience.sq.subtitle3 && (
              <>
                <h4 className="experience-subtitle">{t.experience.sq.subtitle3}</h4>
                <ul className="experience-list">
                  {t.experience.sq.list3.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="experience-card reveal" style={{marginTop: '40px'}}>
            <h3 className="job-title">{t.experience.mp.title}</h3>
            <p className="company-name">{t.experience.mp.company}</p>
            <ul className="experience-list">
              {t.experience.mp.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="experience-card reveal" style={{marginTop: '40px'}}>
            <h3 className="job-title">{t.experience.app.title}</h3>
            <p className="company-name">{t.experience.app.company}</p>
            <ul className="experience-list">
              {t.experience.app.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="reveal">
        <h2>{t.contact.title}</h2>
        <p className="main-desc reveal delay-1" style={{marginBottom: '40px'}}>
          {t.contact.subtitle}
        </p>
        <div className="grid-contact">
          <div className="card reveal delay-2">
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
              <h3 style={{margin: 0}}>{t.contact.about.title}</h3>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Camera size={20} color="#58c4dc" /> <span>{t.contact.about.age}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Car size={20} color="#58c4dc" /> <span>{t.contact.about.driving}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Heart size={20} color="#58c4dc" /> <span>{t.contact.about.interests}</span>
              </div>
            </div>
          </div>
          <div className="card reveal delay-3">
            <h3 style={{marginBottom: '10px'}}>Contact</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Mail size={20} color="#58c4dc" /> {t.contact.info.email}
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Phone size={20} color="#58c4dc" /> +41 76 748 62 82
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <MapPin size={20} color="#58c4dc" /> {t.contact.info.location}
              </div>
            </div>
          </div>
          <div className="card reveal delay-4">
            <h3 style={{marginBottom: '10px'}}>{t.contact.info.social}</h3>
            <div className="hero-buttons" style={{flexDirection: 'column', alignItems: 'flex-start', marginTop: '10px'}}>
              <a href="https://www.linkedin.com/in/zoe-perriard/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{width: '100%', justifyContent: 'center'}}>
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/zoeperriard" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{width: '100%', justifyContent: 'center'}}>
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>{t.contact.footer}</p>
      </footer>
    </div>
  );
}

export default App;
