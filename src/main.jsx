import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, NavLink, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BatteryCharging,
  Bolt,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Home as HomeIcon,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Wrench,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

const company = {
  name: 'Electralux',
  address: {
    street: '14 Op Den Drieschen',
    postalCode: 'L-4149',
    city: 'Esch-sur-Alzette',
    country: 'Luxembourg'
  },
  phoneDisplay: '+352 691 645 625',
  phoneLink: 'tel:+352691645625',
  email: 'contact@electralux.lu',
  emailLink: 'mailto:contact@electralux.lu',
  mapsLink: 'https://share.google/SimdHV8JpIw0A05QW',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.5!2d5.987!3d49.498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47eadb123456789a%3A0x123456789abcdef0!2s14%20Op%20Den%20Drieschen%2C%20L-4149%20Esch-sur-Alzette%2C%20Luxembourg!5e0!3m2!1sfr!2sus!4v1698518282731!5m2!1sfr!2sus',
  hours: ['Lundi - Vendredi : 8h00 - 18h00', 'Samedi : 9h00 - 12h00', 'Dimanche : Fermé']
};

const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '');
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const navItems = [
  ['Accueil', '/'],
  ['Services', '/services'],
  ['À propos', '/about'],
  ['Projets', '/projects'],
  ['Contact', '/contact']
];

const services = [
  {
    id: 'installation',
    title: 'Installation Électrique',
    icon: Bolt,
    image: asset('/images/services/renov.jpeg'),
    description: 'Installation complète pour bâtiments neufs et rénovation selon les normes luxembourgeoises',
    features: [
      'Installation complète pour maisons et appartements',
      "Mise aux normes d'installations existantes",
      'Tableaux électriques et distribution',
      'Éclairage intérieur et extérieur',
      'Prises et interrupteurs'
    ]
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Dépannage',
    icon: Wrench,
    image: asset('/images/services/maint.jpeg'),
    description: 'Service rapide et fiable pour tous problèmes électriques, disponible 7j/7',
    features: [
      "Dépannage d'urgence 7j/7",
      'Recherche et réparation de pannes',
      'Maintenance préventive',
      'Contrôle de conformité',
      'Remplacement de composants défectueux'
    ]
  },
  {
    id: 'automation',
    title: 'Domotique',
    icon: Smartphone,
    image: asset('/images/projects/domotik.jpeg'),
    description: 'Solutions intelligentes pour rendre votre maison ou bureau plus confortable et économe',
    features: [
      "Contrôle d'éclairage intelligent",
      'Thermostat et chauffage connectés',
      "Systèmes de sécurité et d'alarme",
      'Volets et stores automatisés',
      'Intégration audio/vidéo multiroom'
    ]
  },
  {
    id: 'renewable',
    title: 'Énergies Renouvelables',
    icon: Sun,
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: "Installation de panneaux solaires et systèmes d'énergie renouvelable",
    features: [
      'Installation de panneaux photovoltaïques',
      "Systèmes de stockage d'énergie",
      'Bornes de recharge pour véhicules électriques',
      'Pompes à chaleur',
      "Audit énergétique et conseils d'optimisation"
    ]
  }
];

const projects = [
  {
    id: 1,
    title: 'Rénovation Électrique Résidentielle',
    category: 'Résidentiel',
    image: asset('/images/projects/pexels-max-rahubovskiy-6489127 copy.jpg'),
    description:
      "Rénovation complète de la cuisine à Capellen, comprenant la mise aux normes de l'installation électrique, le déplacement et le raccordement des prises et éclairages, ainsi que l'intégration de circuits dédiés pour les équipements électroménagers."
  },
  {
    id: 2,
    title: 'Installation Domotique Maison Intelligente',
    category: 'Domotique',
    image: asset('/images/projects/pexels-max-rahubovskiy-7534545.jpg'),
    description:
      "Mise en place d'un système domotique complet dans une villa moderne à Strassen, permettant le contrôle de l'éclairage, du chauffage, des volets et de la sécurité depuis un smartphone."
  },
  {
    id: 3,
    title: 'Système Électrique Commercial',
    category: 'Commercial',
    image: asset('/images/projects/20220716_163120.jpg'),
    description:
      "Installation électrique complète pour le magasin QUBE - Groupe à Foetz. Pose de chemins de câbles, tableau électrique, éclairage intérieur et extérieur, câblage informatique VDI et raccordements pour équipements professionnels."
  },
  {
    id: 4,
    title: 'Installation Panneaux Solaires',
    category: 'Énergie Renouvelable',
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description:
      "Installation de panneaux solaires sur le toit d'une maison familiale à Dudelange, permettant une réduction significative de la consommation d'énergie."
  },
  {
    id: 5,
    title: 'Rénovation Électrique Résidentielle',
    category: 'Résidentiel',
    image: asset('/images/projects/appart_algrange_copy.jpg'),
    description:
      "Rénovation complète du système électrique d'une maison à Luxembourg-Ville, incluant la mise aux normes, le remplacement du tableau électrique et l'installation de nouveaux points d'éclairage."
  },
  {
    id: 6,
    title: 'Bornes de Recharge Véhicules Électriques',
    category: 'Énergie Renouvelable',
    image: asset('/images/projects/borne_de_recharge_rr.jpg'),
    description:
      'Installation de bornes de recharge pour véhicules électriques dans un immeuble résidentiel à Luxembourg-Ville, permettant aux résidents de recharger facilement leurs véhicules.'
  },
  {
    id: 7,
    title: "Installation électrique neuve - Parking Cloche d'Or",
    category: 'Commercial',
    image: asset('/images/projects/bn2-1.jpg'),
    description:
      "Réalisation complète de l'installation électrique pour le parking de la Cloche d'Or, en collaboration avec la société Paul Wagner et Fils: alimentation principale, circuits secondaires, éclairage LED, contrôle d'accès, détection incendie et tableau électrique."
  }
];

const values = [
  ['Qualité', 'Nous nous engageons à fournir des installations électriques de la plus haute qualité, respectant les normes de sécurité les plus strictes.', CheckCircle2],
  ['Fiabilité', 'Notre équipe respecte les délais et assure un service fiable sur lequel nos clients peuvent compter en toute circonstance.', ShieldCheck],
  ['Innovation', 'Nous adoptons les dernières technologies pour offrir des solutions électriques modernes et efficaces.', Zap],
  ['Durabilité', "Nous promouvons des solutions énergétiques durables qui respectent l'environnement tout en réduisant les coûts.", Sparkles]
];

const testimonials = [
  {
    name: 'Jean D.',
    position: 'Propriétaire de maison',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: "L'équipe d'Electralux a fait un travail exceptionnel pour la rénovation électrique complète de notre maison. Professionnels, ponctuels et d'excellents conseils. Je les recommande vivement!"
  },
  {
    name: 'Marie L.',
    position: 'Directrice de restaurant',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: "Nous avons fait appel à Electralux pour l'installation électrique de notre nouveau restaurant. Leur expertise et leur réactivité ont été essentielles pour respecter nos délais d'ouverture."
  },
  {
    name: 'Thomas S.',
    position: 'Architecte',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'Je collabore avec Electralux sur plusieurs projets depuis des années. Leur connaissance des normes et leur capacité à proposer des solutions innovantes en font un partenaire de confiance.'
  }
];

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 120);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-shell">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Zap size={22} /></span>
          <span>Electralux</span>
        </Link>
        <nav className="desktop-nav">
          {navItems.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <span className="lang-chip">FR <ChevronDown size={14} /></span>
          <a className="phone-link" href={company.phoneLink}><Phone size={17} />{company.phoneDisplay}</a>
          <button className="icon-button mobile-menu" type="button" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-panel">
          {navItems.map(([label, to]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <a href={company.phoneLink}><Phone size={16} />{company.phoneDisplay}</a>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark"><Zap size={22} /></span>
            <span>Electralux</span>
          </Link>
          <p>Solutions électriques professionnelles pour particuliers et entreprises au Luxembourg.</p>
        </div>
        <div>
          <h3>Liens Rapides</h3>
          {navItems.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </div>
        <div>
          <h3>Nos Services</h3>
          {services.map((service) => <Link key={service.id} to={`/services#${service.id}`}>{service.title}</Link>)}
        </div>
        <div>
          <h3>Contact</h3>
          <p>{company.address.street}<br />{company.address.postalCode} {company.address.city}<br />{company.address.country}</p>
          <a href={company.phoneLink}>{company.phoneDisplay}</a>
          <a href={company.emailLink}>{company.email}</a>
          <p>{company.hours[0]}<br />{company.hours[1]}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Electralux. Tous droits réservés</span>
        <span><Link to="/privacy">Politique de confidentialité</Link><Link to="/terms">Conditions d'utilisation</Link></span>
      </div>
    </footer>
  );
}

function PageHero({ eyebrow, title, subtitle, icon: Icon = Zap }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <Reveal>
          <span className="eyebrow"><Icon size={16} />{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <Reveal>
          <h2>Prêt à commencer votre projet ?</h2>
          <p>Contactez-nous dès aujourd'hui pour un devis gratuit</p>
          <div className="button-row center">
            <Link className="btn light" to="/contact">Demander un devis <ArrowRight size={18} /></Link>
            <a className="btn ghost-light" href={company.phoneLink}><Phone size={18} />{company.phoneDisplay}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <span className="eyebrow"><Bolt size={16} />Expert en installations électriques</span>
            <h1>Votre électricien de confiance au Luxembourg</h1>
            <p>Solutions électriques professionnelles pour particuliers et entreprises.</p>
            <div className="button-row">
              <Link className="btn primary" to="/contact">Demander un devis <ArrowRight size={18} /></Link>
              <Link className="btn secondary" to="/services">Services</Link>
            </div>
          </Reveal>
          <Reveal className="hero-card" delay={0.12}>
            <div className="metric"><strong>10+</strong><span>années d'expérience</span></div>
            <div className="metric"><strong>7j/7</strong><span>dépannage rapide</span></div>
            <div className="metric"><strong>LU</strong><span>normes luxembourgeoises</span></div>
          </Reveal>
        </div>
      </section>
      <ServicePreview />
      <AboutPreview />
      <ProjectsPreview />
      <Testimonials />
      <Cta />
    </>
  );
}

function ServicePreview() {
  return (
    <section className="section soft">
      <div className="container">
        <SectionIntro title="Nos Services" subtitle="Solutions électriques complètes pour tous vos besoins" />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal className="service-card" key={service.id} delay={index * 0.05}>
                <span className="service-icon"><Icon size={28} /></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/services#${service.id}`}>En savoir plus <ArrowRight size={16} /></Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="section">
      <div className="container split">
        <Reveal className="image-stack">
          <img src={asset('/images/hero/electra_x4zz.jpeg')} alt="Équipe Electralux au travail" />
          <div className="floating-badge"><strong>10+</strong><span>years_experience</span></div>
        </Reveal>
        <Reveal>
          <span className="eyebrow"><ShieldCheck size={16} />À propos</span>
          <h2>À Propos d'Electralux</h2>
          <p className="lead">Votre partenaire de confiance en électricité au Luxembourg depuis plus de 5 ans</p>
          <p>
            Fondée en 2020, Electralux s'est établie comme l'un des fournisseurs de services électriques les plus fiables au Luxembourg. Notre équipe d'électriciens qualifiés s'engage à offrir des solutions électriques de haute qualité, adaptées aux besoins spécifiques de chaque client.
          </p>
          <div className="mini-values">
            {values.map(([title, , Icon]) => <span key={title}><Icon size={17} />{title}</span>)}
          </div>
          <Link className="btn primary" to="/about">En savoir plus <ArrowRight size={18} /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  return (
    <section className="section">
      <div className="container">
        <SectionIntro title="Nos Projets Récents" subtitle="Découvrez quelques-unes de nos réalisations récentes" />
        <div className="project-grid three">
          {projects.slice(0, 3).map((project, index) => <ProjectCard project={project} key={project.id} delay={index * 0.06} />)}
        </div>
        <div className="center mt">
          <Link className="btn primary" to="/projects">Voir tous les projets <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section soft">
      <div className="container">
        <SectionIntro title="Ce que disent nos clients" subtitle="La satisfaction de nos clients est notre priorité" />
        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <Reveal className="testimonial" key={item.name} delay={index * 0.06}>
              <div className="person"><img src={item.image} alt={item.name} /><span><strong>{item.name}</strong><small>{item.position}</small></span></div>
              <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p>"{item.text}"</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Nos Services" subtitle="Solutions électriques complètes pour tous vos besoins" icon={SlidersHorizontal} />
      <section className="section">
        <div className="container service-list">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal className={`service-row ${index % 2 ? 'reverse' : ''}`} key={service.id} delay={0.05} >
                <img src={service.image} alt={service.title} id={service.id} />
                <div>
                  <span className="service-icon"><Icon size={28} /></span>
                  <h2>{service.title}</h2>
                  <p className="lead">{service.description}</p>
                  <ul className="check-list">
                    {service.features.map((feature) => <li key={feature}><CheckCircle2 size={18} />{feature}</li>)}
                  </ul>
                  <Link className="btn primary" to="/contact">Contactez-nous <ArrowRight size={18} /></Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
      <Cta />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="À propos" title="À Propos d'Electralux" subtitle="Votre partenaire de confiance en électricité au Luxembourg depuis plus de 5 ans" icon={Building2} />
      <section className="section">
        <div className="container split">
          <Reveal><img className="rounded-image" src={asset('/images/services/renov.jpeg')} alt="Équipe Electralux" /></Reveal>
          <Reveal>
            <span className="eyebrow"><HomeIcon size={16} />Notre Histoire</span>
            <h2>Une entreprise locale, précise et engagée</h2>
            <p>Fondée en 2020 par Madjbour Salah, un électricien passionné avec plus de 15 ans d'expérience, Electralux est née d'une vision simple : offrir des services électriques de qualité supérieure aux résidents et entreprises du Luxembourg.</p>
            <p>Ce qui a commencé comme une petite entreprise avec seulement deux électriciens s'est développé au fil des ans pour devenir l'un des fournisseurs de services électriques les plus respectés du Luxembourg, employant aujourd'hui une équipe de 10 professionnels qualifiés.</p>
            <p>Notre croissance constante est le résultat de notre engagement inébranlable envers la qualité, la sécurité et la satisfaction client.</p>
          </Reveal>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionIntro title="Nos Valeurs" subtitle="Les principes qui guident chacune de nos interventions" />
          <div className="service-grid">
            {values.map(([title, description, Icon], index) => (
              <Reveal className="service-card" key={title} delay={index * 0.05}>
                <span className="service-icon"><Icon size={27} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionIntro title="Notre Équipe" subtitle="Des professionnels qualifiés, proches de vos besoins" />
          <div className="team-grid">
            <Reveal className="team-card">
              <img src={asset('/images/team/elec_repond_tel.jpeg')} alt="Sarah M" />
              <h3>Sarah M</h3>
              <span>Service Client</span>
              <p>Le sourire d'Electralux, Sarah assure un service client exceptionnel et veille à ce que chaque client reçoive une attention personnalisée.</p>
            </Reveal>
            <Reveal className="team-card" delay={0.07}>
              <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Salah Madjbour" />
              <h3>Salah Madjbour</h3>
              <span>Fondateur & Directeur</span>
              <p>Avec plus de 15 ans d'expérience dans le domaine de l'électricité, Salah a fondé Electralux en 2020 avec une vision claire : devenir le partenaire électrique de référence au Luxembourg.</p>
            </Reveal>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}

function ProjectsPage() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const categories = ['all', 'Résidentiel', 'Commercial', 'Domotique', 'Énergie Renouvelable'];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchCategory = category === 'all' || project.category === category;
      const matchQuery = !q || `${project.title} ${project.category} ${project.description}`.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [category, query]);

  return (
    <>
      <PageHero eyebrow="Projets" title="Nos Projets Récents" subtitle="Découvrez quelques-unes de nos réalisations récentes" icon={Building2} />
      <section className="filter-band">
        <div className="container filters">
          <label className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un projet..." /></label>
          <div className="category-row">
            {categories.map((item) => (
              <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>
                {item === 'all' ? 'Tous les projets' : item}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="project-grid">
            {filtered.map((project, index) => <ProjectCard project={project} key={project.id} delay={index * 0.03} />)}
          </div>
          {filtered.length === 0 && <p className="empty">Aucun projet ne correspond à votre recherche.</p>}
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal className="project-card" delay={delay}>
      <img src={project.image} alt={project.title} />
      <div>
        <span>{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </Reveal>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Contactez-nous" subtitle="Notre équipe est prête à répondre à toutes vos questions" icon={Mail} />
      <section className="section contact-section">
        <div className="container contact-grid">
          <Reveal className="contact-card">
            <h2>Demander un devis</h2>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <label>Nom<input required name="name" /></label>
              <label>Email<input required type="email" name="email" /></label>
              <label>Téléphone<input name="phone" /></label>
              <label>Sujet<input required name="subject" /></label>
              <label>Message<textarea required name="message" rows="5" /></label>
              <button className="btn primary" type="submit">Envoyer <ArrowRight size={18} /></button>
              {sent && <p className="success">Merci. Votre demande est prête, vous pouvez aussi nous contacter directement par téléphone ou email.</p>}
            </form>
          </Reveal>
          <Reveal className="info-panel" delay={0.08}>
            <InfoRow icon={MapPin} title="Adresse">{company.address.street}<br />{company.address.postalCode} {company.address.city}<br />{company.address.country}</InfoRow>
            <InfoRow icon={Phone} title="Téléphone"><a href={company.phoneLink}>{company.phoneDisplay}</a></InfoRow>
            <InfoRow icon={Mail} title="Email"><a href={company.emailLink}>{company.email}</a></InfoRow>
            <InfoRow icon={Clock} title="Heures d'ouverture">{company.hours.map((hour) => <span key={hour}>{hour}<br /></span>)}</InfoRow>
            <iframe title="Carte Electralux" src={company.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, title, children }) {
  return (
    <div className="info-row">
      <span><Icon size={20} /></span>
      <div><h3>{title}</h3><p>{children}</p></div>
    </div>
  );
}

function LegalPage({ type }) {
  const privacy = type === 'privacy';
  return (
    <>
      <PageHero
        eyebrow={privacy ? 'Confidentialité' : 'Conditions'}
        title={privacy ? 'Politique de confidentialité' : "Conditions d'utilisation"}
        subtitle={privacy ? 'Transparence sur la gestion de vos informations.' : 'Les règles applicables à l’utilisation du site Electralux.'}
        icon={ShieldCheck}
      />
      <section className="section legal">
        <div className="container narrow">
          {privacy ? (
            <>
              <h2>Collecte des informations</h2>
              <p>Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande de devis ou d'information.</p>
              <h2>Utilisation</h2>
              <p>Electralux utilise vos coordonnées pour vous contacter au sujet de vos projets électriques, interventions, dépannages, installations photovoltaïques ou bornes de recharge.</p>
              <h2>Protection</h2>
              <p>Nous ne vendons pas vos données personnelles. Les informations sont conservées uniquement pendant la durée nécessaire au traitement de votre demande.</p>
              <h2>Contact</h2>
              <p>Pour toute question, contactez-nous à <a href={company.emailLink}>{company.email}</a>.</p>
            </>
          ) : (
            <>
              <h2>Utilisation du site</h2>
              <p>Ce site présente les services, projets et coordonnées d'Electralux au Luxembourg. Les informations sont fournies à titre informatif.</p>
              <h2>Devis et interventions</h2>
              <p>Les demandes envoyées depuis le site ne constituent pas une acceptation automatique de prestation. Chaque projet fait l'objet d'une analyse et d'un devis adapté.</p>
              <h2>Propriété</h2>
              <p>Les textes, photographies, visuels et éléments de marque du site Electralux sont protégés et ne peuvent être réutilisés sans autorisation.</p>
              <h2>Contact</h2>
              <p>Pour toute question relative aux conditions d'utilisation, contactez <a href={company.emailLink}>{company.email}</a>.</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function SectionIntro({ title, subtitle }) {
  return (
    <Reveal className="section-intro">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </Reveal>
  );
}

function App() {
  return (
    <Router basename={routerBase}>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);
