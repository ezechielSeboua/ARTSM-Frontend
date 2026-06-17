import { Ecole } from '@/types/ecole';
import { Formation } from '@/types/formation';
import { Actualite } from '@/types/actualite';

export const mockEcoles: Ecole[] = [
  {
    id: 'esn',
    name: 'École Supérieure du Numérique',
    shortName: 'ESN',
    description: 'Forme les futurs experts de l\'informatique, du développement logiciel, de la cybersécurité et de l\'intelligence artificielle.',
    specialties: ['Génie Logiciel', 'Cybersécurité', 'Data Science & IA', 'Réseaux & Télécoms'],
    campus: 'Abidjan - Plateau',
    logo: '💻',
    studentsCount: 450
  },
  {
    id: 'esg',
    name: 'École des Sciences de Gestion',
    shortName: 'ESG',
    description: 'Une grande école de management formant les cadres de demain en finance, marketing, logistique et entrepreneuriat.',
    specialties: ['Finance & Comptabilité', 'Marketing Digital', 'Management des Projets', 'Gestion Portuaire'],
    campus: 'Abidjan - Cocody',
    logo: '📈',
    studentsCount: 600
  },
  {
    id: 'est',
    name: 'École Supérieure des Technologies Industrielles',
    shortName: 'EST',
    description: 'Dédiée aux métiers de l\'industrie maritime, de la maintenance industrielle et de l\'électronique embarquée.',
    specialties: ['Génie Industriel', 'Maintenance Maritime', 'Électrotechnique', 'Automatisme'],
    campus: 'Abidjan - Vridi',
    logo: '⚓',
    studentsCount: 320
  }
];

export const mockFormations: Formation[] = [
  {
    id: 'bachelor-software-eng',
    title: 'Bachelor Génie Logiciel & Applications Web',
    level: 'Bachelor',
    duration: '3 ans',
    description: 'Un cursus axé sur la programmation avancée, l\'architecture logicielle moderne et le développement d\'applications web et mobiles de pointe.',
    ecoleId: 'esn',
    careers: ['Développeur Full-Stack', 'Architecte Logiciel', 'Chef de Projet Technique', 'Développeur Mobile'],
    program: [
      {
        year: 1,
        semesters: [
          { name: 'Semestre 1', modules: ['Algorithmique & Python', 'Bases du Web (HTML/CSS/JS)', 'Architecture des Ordinateurs', 'Mathématiques Appliquées'] },
          { name: 'Semestre 2', modules: ['Programmation Orientée Objet (Java)', 'Bases de Données Relationnelles', 'Réseaux Fondamentaux', 'Anglais Professionnel'] }
        ]
      },
      {
        year: 2,
        semesters: [
          { name: 'Semestre 3', modules: ['Développement Backend (Node.js/Express)', 'Développement Frontend (React)', 'Algorithmique Avancée', 'Systèmes Linux'] },
          { name: 'Semestre 4', modules: ['Bases de données NoSQL', 'Méthodologies Agiles', 'Sécurité des applications web', 'Stage pratique de 2 mois'] }
        ]
      },
      {
        year: 3,
        semesters: [
          { name: 'Semestre 5', modules: ['Architecture Microservices', 'Cloud & DevOps (Docker, AWS)', 'Intelligence Artificielle de base', 'Gestion de projet numérique'] },
          { name: 'Semestre 6', modules: ['Projet de Fin d\'Études', 'Préparation aux entretiens', 'Stage de fin de cycle (4 mois)'] }
        ]
      }
    ]
  },
  {
    id: 'master-cybersecurity',
    title: 'Master Expert en Cybersécurité & Réseaux',
    level: 'Master',
    duration: '2 ans',
    description: 'Une formation de haut niveau spécialisée dans l\'audit de sécurité, la cryptographie, le pentesting, et la gestion des incidents réseau.',
    ecoleId: 'esn',
    careers: ['Ingénieur Cybersécurité', 'Auditeur de Sécurité', 'Analyste SOC', 'Responsable de la Sécurité des SI (RSSI)'],
    program: [
      {
        year: 1,
        semesters: [
          { name: 'Semestre 1', modules: ['Cryptographie Moderne', 'Sécurité des Systèmes d\'Exploitation', 'Protocoles Réseau Sécurisés', 'Gouvernance de la sécurité'] },
          { name: 'Semestre 2', modules: ['Analyse de Malwares', 'Sécurité du Cloud', 'Droit du numérique & RGPD', 'Projet de recherche'] }
        ]
      },
      {
        year: 2,
        semesters: [
          { name: 'Semestre 3', modules: ['Hacking Éthique & Pentesting', 'Réponse aux incidents & Forensics', 'Sécurité IoT', 'Management des risques (EBIOS)'] },
          { name: 'Semestre 4', modules: ['Stage de fin d\'études (6 mois)', 'Mémoire de Master'] }
        ]
      }
    ]
  },
  {
    id: 'bachelor-marketing-digital',
    title: 'Bachelor Marketing Digital & Communication',
    level: 'Bachelor',
    duration: '3 ans',
    description: 'Développez les compétences clés pour concevoir et déployer des stratégies marketing digitales, gérer l\'image de marque en ligne et analyser les performances web.',
    ecoleId: 'esg',
    careers: ['Growth Hacker', 'Community Manager', 'Responsable SEO/SEA', 'Chef de Projet Marketing'],
    program: [
      {
        year: 1,
        semesters: [
          { name: 'Semestre 1', modules: ['Fondamentaux du Marketing', 'Communication Écrite & Visuelle', 'Économie Générale', 'Outils de bureautique'] },
          { name: 'Semestre 2', modules: ['Comportement du Consommateur', 'Création Graphique (Photoshop/Illustrator)', 'Introduction au SEO', 'Langues Vivantes'] }
        ]
      },
      {
        year: 2,
        semesters: [
          { name: 'Semestre 3', modules: ['Stratégie de contenu & Blogging', 'Publicité en ligne (Google Ads, Social Ads)', 'Analyse de données Web', 'Gestion de marque'] },
          { name: 'Semestre 4', modules: ['E-commerce & UX Design', 'Relations publiques digitales', 'Droit de la communication', 'Stage d\'application'] }
        ]
      },
      {
        year: 3,
        semesters: [
          { name: 'Semestre 5', modules: ['Growth Hacking & Automation', 'Stratégie CRM & Emailing', 'Management d\'équipe', 'Gestion de budget publicitaire'] },
          { name: 'Semestre 6', modules: ['Projet Professionnel', 'Soutenance de Stage'] }
        ]
      }
    ]
  },
  {
    id: 'ing-marine-eng',
    title: 'Diplôme d\'Ingénieur en Génie Maritime',
    level: 'Engineer',
    duration: '3 ans',
    description: 'Une formation d\'élite pour maîtriser les technologies des navires modernes, la propulsion maritime, la maintenance navale et la sécurité en mer.',
    ecoleId: 'est',
    careers: ['Ingénieur d\'Armement Navale', 'Directeur Technique Portuaire', 'Expert Maritime', 'Chef de Projet de Construction Navale'],
    program: [
      {
        year: 1,
        semesters: [
          { name: 'Semestre 1', modules: ['Hydrodynamique Navale', 'Résistance des Matériaux (RDM)', 'Thermodynamique appliquée', 'Mathématiques pour l\'ingénieur'] },
          { name: 'Semestre 2', modules: ['Architecture Navale', 'Électricité et Électronique Industrielles', 'Matériaux de construction navale', 'Dessin Assisté par Ordinateur (DAO)'] }
        ]
      },
      {
        year: 2,
        semesters: [
          { name: 'Semestre 3', modules: ['Systèmes de propulsion', 'Machines marines auxiliaires', 'Automatisme et régulation', 'Sécurité et prévention en mer'] },
          { name: 'Semestre 4', modules: ['Maintenance préventive navale', 'Gestion des risques portuaires', 'Anglais maritime (SMCP)', 'Stage embarqué de 3 mois'] }
        ]
      },
      {
        year: 3,
        semesters: [
          { name: 'Semestre 5', modules: ['Éco-navigation & Énergies Renouvelables', 'Management des opérations maritimes', 'Logistique portuaire', 'Gestion financière de projet'] },
          { name: 'Semestre 6', modules: ['Mémoire de fin d\'études (Projet d\'Ingénieur)', 'Soutenance finale'] }
        ]
      }
    ]
  }
];

export const mockActualites: Actualite[] = [
  {
    id: 'actu-1',
    title: 'Inauguration du nouveau Laboratoire d\'Intelligence Artificielle',
    excerpt: 'L\'ARTSM franchit un cap historique en ouvrant un centre de calcul IA équipé des dernières technologies de pointe au campus du Plateau.',
    content: 'Dans le cadre de son plan de développement stratégique, l\'ARTSM a inauguré cette semaine son nouveau laboratoire d\'Intelligence Artificielle et de Calcul Intensif. Ce centre, financé en partenariat avec des leaders mondiaux de la technologie, sera le pivot de nos futurs projets de recherche en Deep Learning appliqué à la santé et aux sciences maritimes. Les étudiants de niveau Master et Ingénieur y auront accès dès le semestre prochain pour leurs projets pratiques et de fin d\'études.',
    category: 'academic',
    date: '2026-06-01',
    image: '💻',
    readTime: '4 min'
  },
  {
    id: 'actu-2',
    title: 'Remise des diplômes Promotion 2025 : Une réussite exceptionnelle',
    excerpt: 'Revivez la prestigieuse cérémonie de remise des diplômes qui s\'est déroulée au Palais des Congrès, couronnant des années d\'efforts.',
    content: 'La cérémonie annuelle de remise des diplômes s\'est déroulée le week-end dernier en présence de personnalités du monde académique et industriel. Plus de 350 diplômés des écoles ESN, ESG et EST ont reçu leur parchemin sous les applaudissements de leurs familles et de leurs enseignants. Le parrain de cette promotion, un éminent dirigeant du secteur maritime, a encouragé les jeunes lauréats à être des ambassadeurs de l\'excellence et de l\'innovation partout en Afrique.',
    category: 'events',
    date: '2026-05-20',
    image: '🎓',
    readTime: '3 min'
  },
  {
    id: 'actu-3',
    title: 'Lancement du Hackathon Étudiant "Innovate For Green Oceans"',
    excerpt: 'Un grand hackathon de 48 heures ouvert à tous les étudiants de l\'académie pour imaginer des solutions technologiques écologiques.',
    content: 'En partenariat avec des ONG environnementales locales, l\'ARTSM organise le hackathon "Innovate For Green Oceans". L\'objectif de cette compétition est de concevoir des applications web, mobiles ou des prototypes industriels permettant de réduire la pollution plastique côtière et d\'optimiser la consommation énergétique des navires. Les inscriptions sont ouvertes par équipe de 3 à 5 étudiants jusqu\'au 15 juin prochain. De nombreux prix et opportunités d\'incubation sont à la clé.',
    category: 'campus-life',
    date: '2026-05-15',
    image: '🌱',
    readTime: '5 min'
  }
];

export interface LibraryResource {
  id: string;
  title: string;
  author: string;
  category: 'cours' | 'livre' | 'these';
  subject: string;
  downloadUrl: string;
  fileSize: string;
}

export const mockLibrary: LibraryResource[] = [
  { id: 'lib-1', title: 'Introduction aux Réseaux de Neurones et Deep Learning', author: 'Dr. Jean-Pierre Kouamé', category: 'cours', subject: 'Informatique / IA', downloadUrl: '#', fileSize: '4.2 MB' },
  { id: 'lib-2', title: 'Manuel de Maintenance des Moteurs Diesel Marins', author: 'Cmdt. Marc Laurent', category: 'livre', subject: 'Génie Maritime', downloadUrl: '#', fileSize: '12.8 MB' },
  { id: 'lib-3', title: 'Logistique Portuaire et Gestion des Terminaux à Conteneurs', author: 'Prof. Amadou Diallo', category: 'these', subject: 'Gestion', downloadUrl: '#', fileSize: '8.5 MB' },
  { id: 'lib-4', title: 'Sécurité et Audit Informatique : Guide Pratique', author: 'Mme. Sarah Koné', category: 'livre', subject: 'Cybersécurité', downloadUrl: '#', fileSize: '6.1 MB' },
  { id: 'lib-5', title: 'Cours de Résistance des Matériaux Appliquée aux Coques', author: 'Ing. Robert Dupuis', category: 'cours', subject: 'Génie Maritime', downloadUrl: '#', fileSize: '5.4 MB' }
];

export interface JobOffer {
  id: string;
  title: string;
  department: string;
  type: 'CDI' | 'CDD' | 'Stage';
  location: string;
  description: string;
  requirements: string[];
}

export const mockJobs: JobOffer[] = [
  {
    id: 'job-1',
    title: 'Enseignant-Chercheur en Génie Logiciel / Dev Web',
    department: 'ESN - Informatique',
    type: 'CDI',
    location: 'Abidjan - Plateau',
    description: 'Rattaché au département Informatique, vous dispenserez des cours magistraux et travaux pratiques en développement web moderne (Next.js, Node.js, React) et encadrerez les projets de fin d\'études.',
    requirements: ['Doctorat ou Master de recherche en Informatique', 'Expérience professionnelle significative de 3+ ans dans le développement web', 'Passion pour la transmission de connaissances']
  },
  {
    id: 'job-2',
    title: 'Administrateur Systèmes, Réseaux et Sécurité',
    department: 'Direction Informatique Centrale',
    type: 'CDI',
    location: 'Abidjan - Cocody',
    description: 'Vous serez en charge de l\'administration de l\'infrastructure serveur de l\'académie, de la supervision de la sécurité réseau, et de l\'assistance technique aux équipes pédagogiques.',
    requirements: ['Bac+3/5 en Administration Système & Réseaux', 'Solides compétences Linux, Active Directory, Pare-feu, Virtualisation VMware', 'Autonomie et rigueur professionnelle']
  },
  {
    id: 'job-3',
    title: 'Chargé de Relation Entreprises & Partenariats',
    department: 'Administration Générale',
    type: 'CDD',
    location: 'Abidjan - Cocody',
    description: 'Votre mission sera de renforcer et développer le réseau de partenaires industriels et académiques nationaux et internationaux pour faciliter l\'insertion professionnelle de nos diplômés.',
    requirements: ['Bac+5 en Commerce, Marketing ou Communication', 'Aisance relationnelle et excellentes capacités de négociation', 'Maîtrise courante de l\'anglais à l\'oral comme à l\'écrit']
  }
];

export interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'academic' | 'industrial' | 'maritime';
  country: string;
  description: string;
}

export const mockPartners: Partner[] = [
  { id: 'part-1', name: 'Université de Technologie de Compiègne', logo: '🇫🇷', type: 'academic', country: 'France', description: 'Coopération académique et échanges d\'étudiants en ingénierie.' },
  { id: 'part-2', name: 'CMA CGM', logo: '🚢', type: 'maritime', country: 'Global', description: 'Partenaire historique pour les stages et recrutements d\'officiers maritimes.' },
  { id: 'part-3', name: 'Microsoft Africa', logo: '💻', type: 'industrial', country: 'Global', description: 'Fourniture de ressources logicielles et certification pour notre labo IA.' },
  { id: 'part-4', name: 'Port Autonome d\'Abidjan', logo: '⚓', type: 'maritime', country: 'Côte d\'Ivoire', description: 'Terrain d\'apprentissage pratique pour les filières de gestion portuaire et maintenance.' }
];
