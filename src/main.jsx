import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, NavLink, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bolt,
  Building2,
  CheckCircle2,
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
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.5!2d5.987!3d49.498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47eadb123456789a%3A0x123456789abcdef0!2s14%20Op%20Den%20Drieschen%2C%20L-4149%20Esch-sur-Alzette%2C%20Luxembourg!5e0!3m2!1sfr!2sus!4v1698518282731!5m2!1sfr!2sus'
};

const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '');
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const serviceMeta = {
  installation: { icon: Bolt, image: asset('/images/services/renov.jpeg') },
  maintenance: { icon: Wrench, image: asset('/images/services/maint.jpeg') },
  automation: { icon: Smartphone, image: asset('/images/projects/domotik.jpeg') },
  renewable: {
    icon: Sun,
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
};

const projectImages = [
  asset('/images/projects/pexels-max-rahubovskiy-6489127 copy.jpg'),
  asset('/images/projects/pexels-max-rahubovskiy-7534545.jpg'),
  asset('/images/projects/20220716_163120.jpg'),
  'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  asset('/images/projects/appart_algrange_copy.jpg'),
  asset('/images/projects/borne_de_recharge_rr.jpg'),
  asset('/images/projects/bn2-1.jpg')
];

const content = {
  fr: {
    langLabel: 'FR',
    nav: [
      ['Accueil', '/'],
      ['Services', '/services'],
      ['À propos', '/about'],
      ['Projets', '/projects'],
      ['Contact', '/contact']
    ],
    hours: ['Lundi - Vendredi : 8h00 - 18h00', 'Samedi : 9h00 - 12h00', 'Dimanche : Fermé'],
    footerDescription: 'Solutions électriques professionnelles pour particuliers et entreprises au Luxembourg.',
    quickLinks: 'Liens Rapides',
    ourServices: 'Nos Services',
    rights: '© 2026 Electralux. Tous droits réservés',
    privacy: 'Politique de confidentialité',
    terms: "Conditions d'utilisation",
    learnMore: 'En savoir plus',
    contactUs: 'Contactez-nous',
    quote: 'Demander un devis',
    allProjects: 'Tous les projets',
    noProjects: 'Aucun projet ne correspond à votre recherche.',
    hero: {
      eyebrow: 'Expert en installations électriques',
      title: 'Votre électricien de confiance au Luxembourg',
      subtitle: 'Solutions électriques professionnelles pour particuliers et entreprises.',
      metrics: [
        ['10+', "années d'expérience"],
        ['7j/7', 'dépannage rapide'],
        ['LU', 'normes luxembourgeoises']
      ]
    },
    sections: {
      servicesTitle: 'Nos Services',
      servicesSubtitle: 'Solutions électriques complètes pour tous vos besoins',
      aboutTitle: "À Propos d'Electralux",
      aboutSubtitle: 'Votre partenaire de confiance en électricité au Luxembourg depuis plus de 5 ans',
      projectsTitle: 'Nos Projets Récents',
      projectsSubtitle: 'Découvrez quelques-unes de nos réalisations récentes',
      testimonialsTitle: 'Ce que disent nos clients',
      testimonialsSubtitle: 'La satisfaction de nos clients est notre priorité',
      ctaTitle: 'Prêt à commencer votre projet ?',
      ctaSubtitle: "Contactez-nous dès aujourd'hui pour un devis gratuit"
    },
    services: [
      {
        id: 'installation',
        title: 'Installation Électrique',
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
        description: "Installation de panneaux solaires et systèmes d'énergie renouvelable",
        features: [
          'Installation de panneaux photovoltaïques',
          "Systèmes de stockage d'énergie",
          'Bornes de recharge pour véhicules électriques',
          'Pompes à chaleur',
          "Audit énergétique et conseils d'optimisation"
        ]
      }
    ],
    values: [
      ['Qualité', 'Nous nous engageons à fournir des installations électriques de la plus haute qualité, respectant les normes de sécurité les plus strictes.', CheckCircle2],
      ['Fiabilité', 'Notre équipe respecte les délais et assure un service fiable sur lequel nos clients peuvent compter en toute circonstance.', ShieldCheck],
      ['Innovation', 'Nous adoptons les dernières technologies pour offrir des solutions électriques modernes et efficaces.', Zap],
      ['Durabilité', "Nous promouvons des solutions énergétiques durables qui respectent l'environnement tout en réduisant les coûts.", Sparkles]
    ],
    projects: [
      {
        id: 1,
        categoryKey: 'residential',
        title: 'Rénovation Électrique Résidentielle',
        description: "Rénovation complète de la cuisine à Capellen, comprenant la mise aux normes de l'installation électrique, le déplacement et le raccordement des prises et éclairages, ainsi que l'intégration de circuits dédiés pour les équipements électroménagers."
      },
      {
        id: 2,
        categoryKey: 'automation',
        title: 'Installation Domotique Maison Intelligente',
        description: "Mise en place d'un système domotique complet dans une villa moderne à Strassen, permettant le contrôle de l'éclairage, du chauffage, des volets et de la sécurité depuis un smartphone."
      },
      {
        id: 3,
        categoryKey: 'commercial',
        title: 'Système Électrique Commercial',
        description: "Installation électrique complète pour le magasin QUBE - Groupe à Foetz. Pose de chemins de câbles, tableau électrique, éclairage intérieur et extérieur, câblage informatique VDI et raccordements pour équipements professionnels."
      },
      {
        id: 4,
        categoryKey: 'renewable',
        title: 'Installation Panneaux Solaires',
        description: "Installation de panneaux solaires sur le toit d'une maison familiale à Dudelange, permettant une réduction significative de la consommation d'énergie."
      },
      {
        id: 5,
        categoryKey: 'residential',
        title: 'Rénovation Électrique Résidentielle',
        description: "Rénovation complète du système électrique d'une maison à Luxembourg-Ville, incluant la mise aux normes, le remplacement du tableau électrique et l'installation de nouveaux points d'éclairage."
      },
      {
        id: 6,
        categoryKey: 'renewable',
        title: 'Bornes de Recharge Véhicules Électriques',
        description: 'Installation de bornes de recharge pour véhicules électriques dans un immeuble résidentiel à Luxembourg-Ville, permettant aux résidents de recharger facilement leurs véhicules.'
      },
      {
        id: 7,
        categoryKey: 'commercial',
        title: "Installation électrique neuve - Parking Cloche d'Or",
        description: "Réalisation complète de l'installation électrique pour le parking de la Cloche d'Or, en collaboration avec la société Paul Wagner et Fils: alimentation principale, circuits secondaires, éclairage LED, contrôle d'accès, détection incendie et tableau électrique."
      }
    ],
    categories: {
      all: 'Tous les projets',
      residential: 'Résidentiel',
      commercial: 'Commercial',
      automation: 'Domotique',
      renewable: 'Énergie Renouvelable'
    },
    testimonials: [
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
    ],
    about: {
      eyebrow: 'À propos',
      history: 'Notre Histoire',
      title: 'Une entreprise locale, précise et engagée',
      paragraphs: [
        "Fondée en 2020 par Madjbour Salah, un électricien passionné avec plus de 15 ans d'expérience, Electralux est née d'une vision simple : offrir des services électriques de qualité supérieure aux résidents et entreprises du Luxembourg.",
        "Ce qui a commencé comme une petite entreprise avec seulement deux électriciens s'est développé au fil des ans pour devenir l'un des fournisseurs de services électriques les plus respectés du Luxembourg, employant aujourd'hui une équipe de 10 professionnels qualifiés.",
        'Notre croissance constante est le résultat de notre engagement inébranlable envers la qualité, la sécurité et la satisfaction client.'
      ],
      preview:
        "Fondée en 2020, Electralux s'est établie comme l'un des fournisseurs de services électriques les plus fiables au Luxembourg. Notre équipe d'électriciens qualifiés s'engage à offrir des solutions électriques de haute qualité, adaptées aux besoins spécifiques de chaque client.",
      valuesTitle: 'Nos Valeurs',
      valuesSubtitle: 'Les principes qui guident chacune de nos interventions',
      teamTitle: 'Notre Équipe',
      teamSubtitle: 'Des professionnels qualifiés, proches de vos besoins',
      team: [
        ['Sarah M', 'Service Client', "Le sourire d'Electralux, Sarah assure un service client exceptionnel et veille à ce que chaque client reçoive une attention personnalisée."],
        ['Salah Madjbour', 'Fondateur & Directeur', "Avec plus de 15 ans d'expérience dans le domaine de l'électricité, Salah a fondé Electralux en 2020 avec une vision claire : devenir le partenaire électrique de référence au Luxembourg."]
      ]
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Notre équipe est prête à répondre à toutes vos questions',
      formTitle: 'Demander un devis',
      labels: ['Nom', 'Email', 'Téléphone', 'Sujet', 'Message'],
      submit: 'Envoyer',
      success: 'Merci. Votre demande est prête, vous pouvez aussi nous contacter directement par téléphone ou email.',
      address: 'Adresse',
      phone: 'Téléphone',
      hours: "Heures d'ouverture",
      mapTitle: 'Carte Electralux'
    },
    projectsSearch: 'Rechercher un projet...',
    legal: {
      privacyEyebrow: 'Confidentialité',
      termsEyebrow: 'Conditions',
      privacyTitle: 'Politique de confidentialité',
      termsTitle: "Conditions d'utilisation",
      privacySubtitle: 'Transparence sur la gestion de vos informations.',
      termsSubtitle: "Les règles applicables à l'utilisation du site Electralux.",
      privacySections: [
        ['Collecte des informations', "Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande de devis ou d'information."],
        ['Utilisation', 'Electralux utilise vos coordonnées pour vous contacter au sujet de vos projets électriques, interventions, dépannages, installations photovoltaïques ou bornes de recharge.'],
        ['Protection', 'Nous ne vendons pas vos données personnelles. Les informations sont conservées uniquement pendant la durée nécessaire au traitement de votre demande.'],
        ['Contact', 'Pour toute question, contactez-nous à']
      ],
      termsSections: [
        ['Utilisation du site', "Ce site présente les services, projets et coordonnées d'Electralux au Luxembourg. Les informations sont fournies à titre informatif."],
        ['Devis et interventions', "Les demandes envoyées depuis le site ne constituent pas une acceptation automatique de prestation. Chaque projet fait l'objet d'une analyse et d'un devis adapté."],
        ['Propriété', 'Les textes, photographies, visuels et éléments de marque du site Electralux sont protégés et ne peuvent être réutilisés sans autorisation.'],
        ['Contact', "Pour toute question relative aux conditions d'utilisation, contactez"]
      ]
    }
  },
  de: {
    langLabel: 'DE',
    nav: [
      ['Startseite', '/'],
      ['Dienstleistungen', '/services'],
      ['Über uns', '/about'],
      ['Projekte', '/projects'],
      ['Kontakt', '/contact']
    ],
    hours: ['Montag - Freitag: 8:00 - 18:00 Uhr', 'Samstag: 9:00 - 12:00 Uhr', 'Sonntag: geschlossen'],
    footerDescription: 'Professionelle Elektrolösungen für Privat- und Geschäftskunden in Luxemburg.',
    quickLinks: 'Schnellzugriff',
    ourServices: 'Unsere Dienstleistungen',
    rights: '© 2026 Electralux. Alle Rechte vorbehalten',
    privacy: 'Datenschutzerklärung',
    terms: 'Nutzungsbedingungen',
    learnMore: 'Mehr erfahren',
    contactUs: 'Kontaktieren Sie uns',
    quote: 'Angebot anfordern',
    allProjects: 'Alle Projekte',
    noProjects: 'Kein Projekt entspricht Ihrer Suche.',
    hero: {
      eyebrow: 'Experte für Elektroinstallationen',
      title: 'Ihr zuverlässiger Elektriker in Luxemburg',
      subtitle: 'Professionelle Elektrolösungen für Privat- und Geschäftskunden.',
      metrics: [
        ['10+', 'Jahre Erfahrung'],
        ['7/7', 'schnelle Störungsbehebung'],
        ['LU', 'luxemburgische Normen']
      ]
    },
    sections: {
      servicesTitle: 'Unsere Dienstleistungen',
      servicesSubtitle: 'Komplette Elektrolösungen für all Ihre Anforderungen',
      aboutTitle: 'Über Electralux',
      aboutSubtitle: 'Ihr vertrauenswürdiger Partner für Elektrotechnik in Luxemburg seit über 5 Jahren',
      projectsTitle: 'Unsere aktuellen Projekte',
      projectsSubtitle: 'Entdecken Sie einige unserer jüngsten Realisierungen',
      testimonialsTitle: 'Das sagen unsere Kunden',
      testimonialsSubtitle: 'Die Zufriedenheit unserer Kunden steht im Mittelpunkt',
      ctaTitle: 'Bereit, Ihr Projekt zu starten?',
      ctaSubtitle: 'Kontaktieren Sie uns noch heute für ein kostenloses Angebot'
    },
    services: [
      {
        id: 'installation',
        title: 'Elektroinstallation',
        description: 'Komplette Installation für Neubauten und Renovierungen nach luxemburgischen Normen',
        features: [
          'Komplette Installation für Häuser und Wohnungen',
          'Normgerechte Modernisierung bestehender Anlagen',
          'Schaltschränke und Stromverteilung',
          'Innen- und Außenbeleuchtung',
          'Steckdosen und Schalter'
        ]
      },
      {
        id: 'maintenance',
        title: 'Wartung & Störungsbehebung',
        description: 'Schneller und zuverlässiger Service für alle elektrischen Probleme, 7 Tage die Woche verfügbar',
        features: [
          'Notdienst 7 Tage die Woche',
          'Fehlersuche und Reparatur',
          'Vorbeugende Wartung',
          'Konformitätsprüfung',
          'Austausch defekter Komponenten'
        ]
      },
      {
        id: 'automation',
        title: 'Hausautomation',
        description: 'Intelligente Lösungen für mehr Komfort und Energieeffizienz in Haus oder Büro',
        features: [
          'Intelligente Lichtsteuerung',
          'Vernetzte Thermostate und Heizsysteme',
          'Sicherheits- und Alarmsysteme',
          'Automatisierte Rollläden und Jalousien',
          'Multiroom-Audio/Video-Integration'
        ]
      },
      {
        id: 'renewable',
        title: 'Erneuerbare Energien',
        description: 'Installation von Solarmodulen und Systemen für erneuerbare Energie',
        features: [
          'Installation von Photovoltaikanlagen',
          'Energiespeichersysteme',
          'Ladestationen für Elektrofahrzeuge',
          'Wärmepumpen',
          'Energieaudit und Optimierungsberatung'
        ]
      }
    ],
    values: [
      ['Qualität', 'Wir liefern Elektroinstallationen auf höchstem Niveau und halten strengste Sicherheitsnormen ein.', CheckCircle2],
      ['Zuverlässigkeit', 'Unser Team hält Termine ein und bietet einen verlässlichen Service, auf den sich Kunden jederzeit verlassen können.', ShieldCheck],
      ['Innovation', 'Wir nutzen moderne Technologien, um effiziente und zukunftsfähige Elektrolösungen anzubieten.', Zap],
      ['Nachhaltigkeit', 'Wir fördern nachhaltige Energielösungen, die die Umwelt schonen und Kosten senken.', Sparkles]
    ],
    projects: [
      {
        id: 1,
        categoryKey: 'residential',
        title: 'Elektrische Renovierung im Wohnbereich',
        description: 'Komplette Küchenrenovierung in Capellen mit normgerechter Elektroinstallation, Versetzung und Anschluss von Steckdosen und Beleuchtung sowie eigenen Stromkreisen für Haushaltsgeräte.'
      },
      {
        id: 2,
        categoryKey: 'automation',
        title: 'Smart-Home-Installation in einem modernen Haus',
        description: 'Einrichtung eines vollständigen Hausautomationssystems in einer modernen Villa in Strassen zur Steuerung von Beleuchtung, Heizung, Rollläden und Sicherheit per Smartphone.'
      },
      {
        id: 3,
        categoryKey: 'commercial',
        title: 'Gewerbliche Elektroanlage',
        description: 'Komplette Elektroinstallation für das Geschäft QUBE - Groupe in Foetz: Kabelwege, Schaltschrank, Innen- und Außenbeleuchtung, VDI-Netzwerkverkabelung und Anschlüsse für professionelle Geräte.'
      },
      {
        id: 4,
        categoryKey: 'renewable',
        title: 'Installation von Solarmodulen',
        description: 'Installation von Solarmodulen auf dem Dach eines Einfamilienhauses in Dudelange zur deutlichen Reduzierung des Energieverbrauchs.'
      },
      {
        id: 5,
        categoryKey: 'residential',
        title: 'Elektrische Renovierung im Wohnbereich',
        description: 'Komplette Renovierung der elektrischen Anlage eines Hauses in Luxemburg-Stadt, inklusive Normangleichung, Austausch des Schaltschranks und neuer Lichtpunkte.'
      },
      {
        id: 6,
        categoryKey: 'renewable',
        title: 'Ladestationen für Elektrofahrzeuge',
        description: 'Installation von Ladestationen für Elektrofahrzeuge in einem Wohngebäude in Luxemburg-Stadt, damit Bewohner ihre Fahrzeuge bequem laden können.'
      },
      {
        id: 7,
        categoryKey: 'commercial',
        title: "Neue Elektroinstallation - Parking Cloche d'Or",
        description: "Vollständige Elektroinstallation für das Parkhaus Cloche d'Or in Zusammenarbeit mit Paul Wagner et Fils: Hauptversorgung, Nebenstromkreise, LED-Beleuchtung, Zutrittskontrolle, Brandmeldeanlage und Schaltschrank."
      }
    ],
    categories: {
      all: 'Alle Projekte',
      residential: 'Wohnbereich',
      commercial: 'Gewerbe',
      automation: 'Hausautomation',
      renewable: 'Erneuerbare Energie'
    },
    testimonials: [
      {
        name: 'Jean D.',
        position: 'Hausbesitzer',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        text: 'Das Team von Electralux hat bei der vollständigen elektrischen Renovierung unseres Hauses hervorragende Arbeit geleistet. Professionell, pünktlich und mit sehr guter Beratung. Ich empfehle sie gerne weiter!'
      },
      {
        name: 'Marie L.',
        position: 'Restaurantleiterin',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
        text: 'Wir haben Electralux für die Elektroinstallation unseres neuen Restaurants beauftragt. Ihre Kompetenz und Reaktionsfähigkeit waren entscheidend, um unseren Eröffnungstermin einzuhalten.'
      },
      {
        name: 'Thomas S.',
        position: 'Architekt',
        image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
        text: 'Ich arbeite seit Jahren bei mehreren Projekten mit Electralux zusammen. Ihre Normenkenntnis und ihre Fähigkeit, innovative Lösungen vorzuschlagen, machen sie zu einem vertrauenswürdigen Partner.'
      }
    ],
    about: {
      eyebrow: 'Über uns',
      history: 'Unsere Geschichte',
      title: 'Ein lokales, präzises und engagiertes Unternehmen',
      paragraphs: [
        'Electralux wurde 2020 von Madjbour Salah gegründet, einem leidenschaftlichen Elektriker mit mehr als 15 Jahren Erfahrung. Die Idee war einfach: hochwertige Elektrodienstleistungen für Bewohner und Unternehmen in Luxemburg anzubieten.',
        'Was als kleines Unternehmen mit nur zwei Elektrikern begann, entwickelte sich über die Jahre zu einem der angesehensten Anbieter von Elektrodienstleistungen in Luxemburg und beschäftigt heute ein Team von 10 qualifizierten Fachkräften.',
        'Unser stetiges Wachstum ist das Ergebnis unseres konsequenten Engagements für Qualität, Sicherheit und Kundenzufriedenheit.'
      ],
      preview:
        'Electralux wurde 2020 gegründet und hat sich als einer der zuverlässigsten Anbieter von Elektrodienstleistungen in Luxemburg etabliert. Unser qualifiziertes Team bietet hochwertige Lösungen, die auf die Bedürfnisse jedes Kunden zugeschnitten sind.',
      valuesTitle: 'Unsere Werte',
      valuesSubtitle: 'Die Grundsätze, die jede unserer Arbeiten leiten',
      teamTitle: 'Unser Team',
      teamSubtitle: 'Qualifizierte Fachkräfte, nah an Ihren Anforderungen',
      team: [
        ['Sarah M', 'Kundenservice', 'Sarah ist das freundliche Gesicht von Electralux. Sie sorgt für einen außergewöhnlichen Kundenservice und eine persönliche Betreuung jedes Kunden.'],
        ['Salah Madjbour', 'Gründer & Geschäftsführer', 'Mit mehr als 15 Jahren Erfahrung in der Elektrotechnik gründete Salah Electralux 2020 mit einer klaren Vision: Referenzpartner für Elektrotechnik in Luxemburg zu werden.']
      ]
    },
    contact: {
      title: 'Kontaktieren Sie uns',
      subtitle: 'Unser Team beantwortet gerne all Ihre Fragen',
      formTitle: 'Angebot anfordern',
      labels: ['Name', 'E-Mail', 'Telefon', 'Betreff', 'Nachricht'],
      submit: 'Senden',
      success: 'Danke. Ihre Anfrage ist bereit, Sie können uns auch direkt telefonisch oder per E-Mail kontaktieren.',
      address: 'Adresse',
      phone: 'Telefon',
      hours: 'Öffnungszeiten',
      mapTitle: 'Karte Electralux'
    },
    projectsSearch: 'Projekt suchen...',
    legal: {
      privacyEyebrow: 'Datenschutz',
      termsEyebrow: 'Bedingungen',
      privacyTitle: 'Datenschutzerklärung',
      termsTitle: 'Nutzungsbedingungen',
      privacySubtitle: 'Transparenz über die Verwaltung Ihrer Informationen.',
      termsSubtitle: 'Die Regeln für die Nutzung der Electralux-Website.',
      privacySections: [
        ['Erhebung von Informationen', 'Die über das Kontaktformular übermittelten Informationen werden ausschließlich verwendet, um Ihre Angebots- oder Informationsanfrage zu beantworten.'],
        ['Verwendung', 'Electralux nutzt Ihre Kontaktdaten, um Sie zu Ihren Elektroprojekten, Einsätzen, Störungen, Photovoltaikanlagen oder Ladestationen zu kontaktieren.'],
        ['Schutz', 'Wir verkaufen Ihre personenbezogenen Daten nicht. Die Informationen werden nur so lange gespeichert, wie es für die Bearbeitung Ihrer Anfrage erforderlich ist.'],
        ['Kontakt', 'Bei Fragen kontaktieren Sie uns unter']
      ],
      termsSections: [
        ['Nutzung der Website', 'Diese Website präsentiert die Dienstleistungen, Projekte und Kontaktdaten von Electralux in Luxemburg. Die Informationen dienen rein informativen Zwecken.'],
        ['Angebote und Einsätze', 'Anfragen über die Website stellen keine automatische Annahme einer Leistung dar. Jedes Projekt wird analysiert und erhält ein passendes Angebot.'],
        ['Eigentum', 'Texte, Fotografien, visuelle Elemente und Markenelemente der Electralux-Website sind geschützt und dürfen ohne Genehmigung nicht wiederverwendet werden.'],
        ['Kontakt', 'Bei Fragen zu den Nutzungsbedingungen kontaktieren Sie']
      ]
    }
  }
};

function dataFor(lang) {
  const c = content[lang];
  return {
    c,
    services: c.services.map((service) => ({ ...service, ...serviceMeta[service.id] })),
    projects: c.projects.map((project, index) => ({
      ...project,
      image: projectImages[index],
      category: c.categories[project.categoryKey]
    }))
  };
}

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

function Header({ c, lang, setLang }) {
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
        <Link className="brand" to="/" onClick={() => setOpen(false)}>Electralux</Link>
        <nav className="desktop-nav">
          {c.nav.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <select className="language-select" value={lang} onChange={(event) => setLang(event.target.value)} aria-label="Language">
            <option value="fr">FR</option>
            <option value="de">DE</option>
          </select>
          <a className="phone-link" href={company.phoneLink}><Phone size={17} />{company.phoneDisplay}</a>
          <button className="icon-button mobile-menu" type="button" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-panel">
          {c.nav.map(([label, to]) => (
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

function Footer({ c, services }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">Electralux</Link>
          <p>{c.footerDescription}</p>
        </div>
        <div>
          <h3>{c.quickLinks}</h3>
          {c.nav.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </div>
        <div>
          <h3>{c.ourServices}</h3>
          {services.map((service) => <Link key={service.id} to={`/services#${service.id}`}>{service.title}</Link>)}
        </div>
        <div>
          <h3>{c.nav.find((item) => item[1] === '/contact')[0]}</h3>
          <p>{company.address.street}<br />{company.address.postalCode} {company.address.city}<br />{company.address.country}</p>
          <a href={company.phoneLink}>{company.phoneDisplay}</a>
          <a href={company.emailLink}>{company.email}</a>
          <p>{c.hours[0]}<br />{c.hours[1]}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{c.rights}</span>
        <span><Link to="/privacy">{c.privacy}</Link><Link to="/terms">{c.terms}</Link></span>
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

function Cta({ c }) {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <Reveal>
          <h2>{c.sections.ctaTitle}</h2>
          <p>{c.sections.ctaSubtitle}</p>
          <div className="button-row center">
            <Link className="btn light" to="/contact">{c.quote} <ArrowRight size={18} /></Link>
            <a className="btn ghost-light" href={company.phoneLink}><Phone size={18} />{company.phoneDisplay}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Home({ c, services, projects }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <span className="eyebrow"><Bolt size={16} />{c.hero.eyebrow}</span>
            <h1>{c.hero.title}</h1>
            <p>{c.hero.subtitle}</p>
            <div className="button-row">
              <Link className="btn primary" to="/contact">{c.quote} <ArrowRight size={18} /></Link>
              <Link className="btn secondary" to="/services">{c.sections.servicesTitle}</Link>
            </div>
          </Reveal>
          <Reveal className="hero-card" delay={0.12}>
            {c.hero.metrics.map(([value, label]) => (
              <div className="metric" key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </Reveal>
        </div>
      </section>
      <ServicePreview c={c} services={services} />
      <AboutPreview c={c} />
      <ProjectsPreview c={c} projects={projects} />
      <Testimonials c={c} />
      <Cta c={c} />
    </>
  );
}

function ServicePreview({ c, services }) {
  return (
    <section className="section soft">
      <div className="container">
        <SectionIntro title={c.sections.servicesTitle} subtitle={c.sections.servicesSubtitle} />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal className="service-card" key={service.id} delay={index * 0.05}>
                <span className="service-icon"><Icon size={28} /></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/services#${service.id}`}>{c.learnMore} <ArrowRight size={16} /></Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutPreview({ c }) {
  return (
    <section className="section">
      <div className="container split">
        <Reveal className="image-stack">
          <img src={asset('/images/hero/electra_x4zz.jpeg')} alt="Electralux" />
          <div className="floating-badge"><strong>10+</strong><span>{c.hero.metrics[0][1]}</span></div>
        </Reveal>
        <Reveal>
          <span className="eyebrow"><ShieldCheck size={16} />{c.about.eyebrow}</span>
          <h2>{c.sections.aboutTitle}</h2>
          <p className="lead">{c.sections.aboutSubtitle}</p>
          <p>{c.about.preview}</p>
          <div className="mini-values">
            {c.values.map(([title, , Icon]) => <span key={title}><Icon size={17} />{title}</span>)}
          </div>
          <Link className="btn primary" to="/about">{c.learnMore} <ArrowRight size={18} /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectsPreview({ c, projects }) {
  return (
    <section className="section">
      <div className="container">
        <SectionIntro title={c.sections.projectsTitle} subtitle={c.sections.projectsSubtitle} />
        <div className="project-grid three">
          {projects.slice(0, 3).map((project, index) => <ProjectCard project={project} key={project.id} delay={index * 0.06} />)}
        </div>
        <div className="center mt">
          <Link className="btn primary" to="/projects">{c.allProjects} <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ c }) {
  return (
    <section className="section soft">
      <div className="container">
        <SectionIntro title={c.sections.testimonialsTitle} subtitle={c.sections.testimonialsSubtitle} />
        <div className="testimonial-grid">
          {c.testimonials.map((item, index) => (
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

function ServicesPage({ c, services }) {
  return (
    <>
      <PageHero eyebrow={c.sections.servicesTitle} title={c.sections.servicesTitle} subtitle={c.sections.servicesSubtitle} icon={SlidersHorizontal} />
      <section className="section">
        <div className="container service-list">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal className={`service-row ${index % 2 ? 'reverse' : ''}`} key={service.id} delay={0.05}>
                <img src={service.image} alt={service.title} id={service.id} />
                <div>
                  <span className="service-icon"><Icon size={28} /></span>
                  <h2>{service.title}</h2>
                  <p className="lead">{service.description}</p>
                  <ul className="check-list">
                    {service.features.map((feature) => <li key={feature}><CheckCircle2 size={18} />{feature}</li>)}
                  </ul>
                  <Link className="btn primary" to="/contact">{c.contactUs} <ArrowRight size={18} /></Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
      <Cta c={c} />
    </>
  );
}

function AboutPage({ c }) {
  return (
    <>
      <PageHero eyebrow={c.about.eyebrow} title={c.sections.aboutTitle} subtitle={c.sections.aboutSubtitle} icon={Building2} />
      <section className="section">
        <div className="container split">
          <Reveal><img className="rounded-image" src={asset('/images/services/renov.jpeg')} alt="Electralux" /></Reveal>
          <Reveal>
            <span className="eyebrow"><HomeIcon size={16} />{c.about.history}</span>
            <h2>{c.about.title}</h2>
            {c.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </Reveal>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionIntro title={c.about.valuesTitle} subtitle={c.about.valuesSubtitle} />
          <div className="service-grid">
            {c.values.map(([title, description, Icon], index) => (
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
          <SectionIntro title={c.about.teamTitle} subtitle={c.about.teamSubtitle} />
          <div className="team-grid">
            <Reveal className="team-card">
              <img src={asset('/images/team/elec_repond_tel.jpeg')} alt={c.about.team[0][0]} />
              <h3>{c.about.team[0][0]}</h3>
              <span>{c.about.team[0][1]}</span>
              <p>{c.about.team[0][2]}</p>
            </Reveal>
            <Reveal className="team-card" delay={0.07}>
              <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" alt={c.about.team[1][0]} />
              <h3>{c.about.team[1][0]}</h3>
              <span>{c.about.team[1][1]}</span>
              <p>{c.about.team[1][2]}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <Cta c={c} />
    </>
  );
}

function ProjectsPage({ c, projects }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const categories = ['all', 'residential', 'commercial', 'automation', 'renewable'];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const searchable = `${project.title} ${project.category} ${project.description}`.toLowerCase();
      return (category === 'all' || project.categoryKey === category) && (!q || searchable.includes(q));
    });
  }, [category, query, projects]);

  return (
    <>
      <PageHero eyebrow={c.sections.projectsTitle} title={c.sections.projectsTitle} subtitle={c.sections.projectsSubtitle} icon={Building2} />
      <section className="filter-band">
        <div className="container filters">
          <label className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={c.projectsSearch} /></label>
          <div className="category-row">
            {categories.map((item) => (
              <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>
                {c.categories[item]}
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
          {filtered.length === 0 && <p className="empty">{c.noProjects}</p>}
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

function ContactPage({ c }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow={c.nav.find((item) => item[1] === '/contact')[0]} title={c.contact.title} subtitle={c.contact.subtitle} icon={Mail} />
      <section className="section contact-section">
        <div className="container contact-grid">
          <Reveal className="contact-card">
            <h2>{c.contact.formTitle}</h2>
            <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <label>{c.contact.labels[0]}<input required name="name" /></label>
              <label>{c.contact.labels[1]}<input required type="email" name="email" /></label>
              <label>{c.contact.labels[2]}<input name="phone" /></label>
              <label>{c.contact.labels[3]}<input required name="subject" /></label>
              <label>{c.contact.labels[4]}<textarea required name="message" rows="5" /></label>
              <button className="btn primary" type="submit">{c.contact.submit} <ArrowRight size={18} /></button>
              {sent && <p className="success">{c.contact.success}</p>}
            </form>
          </Reveal>
          <Reveal className="info-panel" delay={0.08}>
            <InfoRow icon={MapPin} title={c.contact.address}>{company.address.street}<br />{company.address.postalCode} {company.address.city}<br />{company.address.country}</InfoRow>
            <InfoRow icon={Phone} title={c.contact.phone}><a href={company.phoneLink}>{company.phoneDisplay}</a></InfoRow>
            <InfoRow icon={Mail} title="Email"><a href={company.emailLink}>{company.email}</a></InfoRow>
            <InfoRow icon={Clock} title={c.contact.hours}>{c.hours.map((hour) => <span key={hour}>{hour}<br /></span>)}</InfoRow>
            <iframe title={c.contact.mapTitle} src={company.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
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

function LegalPage({ c, type }) {
  const privacy = type === 'privacy';
  const sections = privacy ? c.legal.privacySections : c.legal.termsSections;
  return (
    <>
      <PageHero
        eyebrow={privacy ? c.legal.privacyEyebrow : c.legal.termsEyebrow}
        title={privacy ? c.legal.privacyTitle : c.legal.termsTitle}
        subtitle={privacy ? c.legal.privacySubtitle : c.legal.termsSubtitle}
        icon={ShieldCheck}
      />
      <section className="section legal">
        <div className="container narrow">
          {sections.map(([title, text], index) => (
            <React.Fragment key={title}>
              <h2>{title}</h2>
              <p>{index === sections.length - 1 ? <>{text} <a href={company.emailLink}>{company.email}</a>.</> : text}</p>
            </React.Fragment>
          ))}
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
  const [lang, setLang] = useState(() => localStorage.getItem('electralux-lang') || 'fr');
  const { c, services, projects } = useMemo(() => dataFor(lang), [lang]);

  useEffect(() => {
    localStorage.setItem('electralux-lang', lang);
    document.documentElement.lang = lang;
    document.title = lang === 'fr'
      ? 'Electralux - Expert en Installations Électriques au Luxembourg'
      : 'Electralux - Experte für Elektroinstallationen in Luxemburg';
  }, [lang]);

  return (
    <Router basename={routerBase}>
      <ScrollToTop />
      <Header c={c} lang={lang} setLang={setLang} />
      <main>
        <Routes>
          <Route path="/" element={<Home c={c} services={services} projects={projects} />} />
          <Route path="/services" element={<ServicesPage c={c} services={services} />} />
          <Route path="/about" element={<AboutPage c={c} />} />
          <Route path="/projects" element={<ProjectsPage c={c} projects={projects} />} />
          <Route path="/contact" element={<ContactPage c={c} />} />
          <Route path="/privacy" element={<LegalPage c={c} type="privacy" />} />
          <Route path="/terms" element={<LegalPage c={c} type="terms" />} />
        </Routes>
      </main>
      <Footer c={c} services={services} />
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);
