import React, { useEffect, useRef } from 'react';
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
  Target
} from 'lucide-react';

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

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Layers size={24} color="#58c4dc" />
        <span>Mon Portfolio</span>
      </div>
      <div className="nav-links">
        <a href="#profil" className="nav-link"><User size={18} /> Profil</a>
        <a href="#projets" className="nav-link"><Target size={18} /> Projets</a>
        <a href="#competences" className="nav-link"><BarChart size={18} /> Compétences</a>
        <a href="#experience" className="nav-link"><Briefcase size={18} /> Expérience</a>
        <a href="#formation" className="nav-link"><GraduationCap size={18} /> Formation</a>
        <a href="#contact" className="nav-link"><Mail size={18} /> Contact</a>
      </div>
    </nav>
  );
};

function App() {
  return (
    <div className="App">
      <BackgroundNetwork />
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero" id="profil">
        <p className="hero-subtitle">Bonjour, je suis</p>
        <h1>Zoé <span className="accent">Perriard</span></h1>
        
        <div className="description-container">
          <p className="main-desc">
            Data Analyst, passionnée par les nouvelles technologies, l'innovation et la transformation digitale
          </p>
          <p className="secondary-desc">
            Passionnée par la data analysis, l'optimisation des processus métier et la transformation digitale, 
            je suis en dernière année de bachelor en économie d'entreprise en emploi à l'HEIG-VD avec 
            spécialisation en digitalisation e-business ainsi que analyse et visualisation de donnée.
          </p>
        </div>

        <div className="hero-buttons">
          <a href="#" className="btn btn-primary">
            <Download size={20} /> Télécharger CV
          </a>
          <a href="https://www.linkedin.com/in/zoe-perriard/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <Linkedin size={20} /> LinkedIn
          </a>
          <a href="https://github.com/zoeperriard" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <Github size={20} /> GitHub
          </a>
          <a href="mailto:zoe.perriard@gmail.com" className="btn btn-outline">
            <Mail size={20} /> Contact
          </a>
        </div>
      </section>

      {/* Projets Section */}
      <section id="projets">
        <h2><Target size={32} /> Projets</h2>
        
        {/* Travail de Bachelor */}
        <div className="card project-featured" style={{marginBottom: '30px'}}>
          <div className="card-header">
            <div className="icon-wrapper"><GraduationCap size={24} /></div>
            <div>
              <h3>Travail de Bachelor : Planification de voyage & IA</h3>
            </div>
          </div>
          
          <div className="project-content-grid">
            <div className="project-info">
              <p className="project-tagline">Étude d’opportunité et de faisabilité économique d’une application de planification de voyage assistée par l’IA.</p>
              
              <div className="project-section">
                <h4><Search size={16} /> Contexte & Problématique</h4>
                <p>Analyse de l’opportunité, de la désirabilité et de la viabilité économique d’une application de planification de voyage partiellement automatisée, destinée aux voyageurs seniors autonomes.</p>
              </div>

              <div className="project-section">
                <h4><Zap size={16} /> Approche & Réalisation</h4>
                <ul className="experience-list">
                  <li>Analyse du problème et du segment cible</li>
                  <li>Désirabilité · Faisabilité · Viabilité</li>
                  <li>Analyse de marché (TAM · SAM · SOM)</li>
                  <li>Proposition de valeur & modèle d’affaires</li>
                  <li>Conception d’un Proof of Concept (POC) et vision produit</li>
                </ul>
              </div>
            </div>
            
            <div className="project-tech">
              <div className="pills-container">
                <span className="pill">Désirabilité</span>
                <span className="pill">Faisabilité</span>
                <span className="pill">Viabilité</span>
                <span className="pill">Analyse de Marché</span>
                <span className="pill">Business Model</span>
                <span className="pill">IA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid">
          {/* Projet 2 - SIRH */}
          <div className="card">
            <div className="card-header">
              <div className="icon-wrapper"><BarChart size={24} /></div>
              <h3>Analyse de données SIRH</h3>
            </div>
            <div className="project-section">
              <p className="text-muted" style={{marginBottom: '15px'}}>
                Analyse de données et data visualisation sous Tableau pour comprendre les départs des collaborateurs (attrition) à partir de données RH.
              </p>
              <ul className="experience-list" style={{fontSize: '0.9rem', marginBottom: '20px'}}>
                <li>Nettoyage et structuration des données</li>
                <li>Modélisation et transformation des données</li>
                <li>Création de champs calculés et indicateurs</li>
                <li>Analyse exploratoire et KPIs d’attrition</li>
                <li>Dashboards interactifs sur Tableau</li>
              </ul>
            </div>
            <div className="pills-container">
              <span className="pill">Tableau</span>
              <span className="pill">Analyse exploratoire</span>
              <span className="pill">Corrélation</span>
            </div>
          </div>

          {/* Projet 3 - Rapport pratique pro */}
          <div className="card">
            <div className="card-header">
              <div className="icon-wrapper"><Zap size={24} /></div>
              <h3>Analyse et optimisation de processus opérationnel</h3>
            </div>
            <div className="project-section">
              <p className="text-muted" style={{marginBottom: '15px'}}>
                Projet d’analyse de données et de processus réalisé dans un environnement réglementé, visant à améliorer le suivi administratif et la performance opérationnelle.
              </p>
              <ul className="experience-list" style={{fontSize: '0.9rem', marginBottom: '20px'}}>
                <li>Cartographie du processus BPMN</li>
                <li>Analyse des données de suivi</li>
                <li>Analyse des KPIs (délais, charge, volumes)</li>
                <li>Structuration et fiabilisation des données</li>
                <li>Recommandations data-driven</li>
              </ul>
            </div>
            <div className="pills-container">
              <span className="pill">Excel</span>
              <span className="pill">BPMN</span>
              <span className="pill">Analyse de données</span>
              <span className="pill">KPIs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Techniques */}
      <section id="competences">
        <h2><BarChart size={32} /> Compétences techniques</h2>
        <div className="grid">
          <div className="card">
            <div className="card-header">
              <div className="icon-wrapper"><TrendingUp size={24} /></div>
              <h3>Analyse et modélisation</h3>
            </div>
            <div className="pills-container">
              <span className="pill"><Database size={16} /> SQL</span>
              <span className="pill"><Zap size={16} /> Python</span>
              <span className="pill"><BarChart size={16} /> Excel avancé (VBA, Power Query, TCD)</span>
              <span className="pill"><Layers size={16} /> Analyse exploratoire (EDA)</span>
              <span className="pill"><Search size={16} /> Analyse statistique</span>
              <span className="pill"><Search size={16} /> Préparation et nettoyage des données</span>
            </div>
            </div>

          <div className="card">
            <div className="card-header">
              <div className="icon-wrapper"><Search size={24} /></div>
              <h3>Business Intelligence</h3>
            </div>
            <div className="pills-container">
              <span className="pill"><Layers size={16} /> Tableau</span>
              <span className="pill"><Layers size={16} /> Data visualisation</span>
              <span className="pill"><BarChart size={16} /> Tableaux de bord</span>
              <span className="pill"><TrendingUp size={16} /> Reporting & KPIs</span>
              <span className="pill"><TrendingUp size={16} /> Aide à la décision</span>
              <span className="pill"><Search size={16} /> Google Analytics (certifié)</span>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="icon-wrapper"><Database size={24} /></div>
              <h3>Systèmes d'Information</h3>
            </div>
            <div className="pills-container">
              <span className="pill"><Database size={16} /> SAP FI/CO</span>
              <span className="pill"><Layers size={16} /> Odoo</span>
              <span className="pill"><TrendingUp size={16} /> BPMN</span>
              <span className="pill"><Zap size={16} /> Automatisation des processus</span>
              <span className="pill"><Database size={16} /> Gestion et structuration des données</span>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="icon-wrapper"><Zap size={24} /></div>
              <h3>Stratégie et performance</h3>
            </div>
            <div className="pills-container">
              <span className="pill"><BarChart size={16} /> Analyse de performance</span>
              <span className="pill"><Zap size={16} /> Optimisation des processus</span>
              <span className="pill"><TrendingUp size={16} /> Suivi budgétaire</span>
              <span className="pill"><Lightbulb size={16} /> Transformation digitale</span>
              <span className="pill"><Globe size={16} /> e-business</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Personnelles */}
      <section id="soft-skills">
        <h2><Brain size={32} /> Compétences personnelles</h2>
        <div className="pills-grid">
          <div className="pill-personal"><Brain size={24} /> Approche data-driven et esprit analytique</div>
          <div className="pill-personal"><Clock size={24} /> Gestion des priorités</div>
          <div className="pill-personal"><Lightbulb size={24} /> Esprit autodidacte</div>
          <div className="pill-personal"><Users size={24} /> Travail d’équipe</div>
          <div className="pill-personal"><Zap size={24} /> Proactive et persévérante</div>
          <div className="pill-personal"><MessageCircle size={24} /> Sens de l’écoute et de la communication</div>
        </div>
      </section>

      {/* Langues */}
      <section>
        <h2><Globe size={32} /> Langues</h2>
        <div className="card">
          <div className="languages-container">
            <div className="language-item">
              <div className="language-info">
                <span className="language-name">Français</span>
                <span className="language-level">Langue maternelle</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="language-item">
              <div className="language-info">
                <span className="language-name">Anglais</span>
                <span className="language-level">B2</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="language-item">
              <div className="language-info">
                <span className="language-name">Allemand</span>
                <span className="language-level">B1</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expériences */}
      <section id="experience">
        <h2><Briefcase size={32} /> Expériences professionnelles</h2>
        
        <div className="experience-timeline">
          <div className="card experience-card">
            <div className="date-badge-experience"><Calendar size={14} /> août 2023 – octobre 2025</div>
            <h3 className="job-title">Legal Operations Officer</h3>
            <p className="company-name">Swissquote Bank SA</p>
            <ul className="experience-list">
              <li>Mise à jour régulière des bases données et réalisation de statistiques mensuelles</li>
              <li>Préparation, nettoyage et analyse exploratoire de données</li>
              <li>Automatisation de processus via Excel VBA</li>
              <li>Gérer le courrier entrant quotidien en français, allemand, anglais et italien</li>
              <li>Traitement et suivi de la correspondance avec les autorités</li>
              <li>Coordination des procédures de blocage de comptes</li>
              <li>Gestion des délais de réponse aux autorités et notifications aux clients</li>
            </ul>
          </div>

          <div className="card experience-card" style={{marginTop: '40px'}}>
            <div className="date-badge-experience"><Calendar size={14} /> juillet 2022 – juillet 2023</div>
            <h3 className="job-title">Assistante en gestion comptable</h3>
            <p className="company-name">Ministère public central</p>
            <ul className="experience-list">
              <li>Etablir les paiements créanciers et gérer les liquidités</li>
              <li>Collaborer à l’établissement du suivi budgétaire et des statistiques internes</li>
              <li>Gestion et transferts de biens séquestrés en lien avec les forces de l’ordre</li>
            </ul>
          </div>

          <div className="card experience-card" style={{marginTop: '40px'}}>
            <div className="date-badge-experience"><Calendar size={14} /> 2018 – 2021</div>
            <h3 className="job-title">Apprentissage d'employée de commerce</h3>
            <p className="company-name">Commune de Crissier</p>
            <ul className="experience-list">
              <li>2020 – 2021 Service des Infrastructures</li>
              <li>2019 – 2020 Contrôle des habitants</li>
              <li>2018 – 2019 Services des finances</li>
              <li>2017 – 2018 Administration & RH</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formation */}
      <section id="formation">
        <h2><GraduationCap size={32} /> Formation</h2>
        <div className="card">
          <div className="formation-card">
            <div className="icon-wrapper"><GraduationCap size={24} /></div>
            <div className="formation-content">
              <div className="date-badge"><Calendar size={14} /> 2022 – 2026</div>
              <h3>Bachelor of Science HES-SO, économie d'entreprise</h3>
              <p className="school-name">HEIG-VD, Yverdon</p>
              <p className="text-muted" style={{fontSize: '0.9rem', marginTop: '5px'}}>Option+ Défis du management à l'ère de la digitalisation</p>
            </div>
          </div>
        </div>
        <div className="card" style={{marginTop: '20px'}}>
          <div className="formation-card">
            <div className="icon-wrapper"><GraduationCap size={24} /></div>
            <div className="formation-content">
              <div className="date-badge"><Calendar size={14} /> 2021 – 2022</div>
              <h3>Maturité post-CFC, économie et services</h3>
              <p className="school-name">EPCL, Lausanne</p>
            </div>
          </div>
        </div>
        <div className="card" style={{marginTop: '20px'}}>
          <div className="formation-card">
            <div className="icon-wrapper"><GraduationCap size={24} /></div>
            <div className="formation-content">
              <div className="date-badge"><Calendar size={14} /> 2017 – 2021</div>
              <h3>CFC d’employée de commerce, administration publique</h3>
              <p className="school-name">EPCL, Lausanne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <h2>Restons en contact</h2>
        <p className="main-desc" style={{marginBottom: '40px'}}>
          Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités.
        </p>
        <div className="grid-contact">
          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
              <User size={24} color="#58c4dc" />
              <h3 style={{margin: 0}}>À propos de moi</h3>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Camera size={20} color="#58c4dc" /> <span>Suissesse, 23 ans</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Car size={20} color="#58c4dc" /> <span>Permis de conduire catégorie B</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Heart size={20} color="#58c4dc" /> <span>Centres d'intérêt : Snowboard, Kitesurf, Fitness</span>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Contact</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Mail size={20} color="#58c4dc" /> zoe.perriard@gmail.com
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Phone size={20} color="#58c4dc" /> +41 76 748 62 82
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <MapPin size={20} color="#58c4dc" /> 1023 Crissier, Suisse
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Réseaux sociaux</h3>
            <div className="hero-buttons" style={{flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px'}}>
              <a href="https://www.linkedin.com/in/zoe-perriard/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{width: '100%', justifyContent: 'center'}}>
                <Linkedin size={20} /> LinkedIn
              </a>
              <a href="https://github.com/zoeperriard" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{width: '100%', justifyContent: 'center'}}>
                <Github size={20} /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2023 Zoé Perriard. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
