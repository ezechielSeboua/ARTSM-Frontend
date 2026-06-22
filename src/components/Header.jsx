import { useState, useRef } from 'react';
import Logo from './Logo';

const NAV_ITEMS = [
  { name: 'Accueil', href: '/accueil' },
  {
    name: "L'Institution",
    href: '/institution',
    children: [
      { name: 'Mot du Directeur Général', href: '/institution#mot-dg' },
      { name: 'Présentation', href: '/institution#presentation' },
      { name: 'Politique qualité', href: '/institution#qualite' },
      { name: 'Film institutionnel', href: '/institution#film' },
      { name: 'Situation géographique', href: '/institution#localisation' },
      { name: 'Organigramme', href: '/institution#organigramme' },
      { name: 'Contacts', href: '/institution#contacts' },
    ],
  },
  {
    name: 'Formations initiales',
    href: '/ecoles',
    children: [
      { name: 'École Supérieure de Navigation (ESN)', href: '/ecoles/esn' },
      { name: 'École Supérieure des Transports Maritimes (ESTM)', href: '/ecoles/estm' },
      { name: "Collège d'Enseignement Maritime (CEAM)", href: '/ecoles/ceam' },
      { name: 'Formation à Distance (FOAD)', href: '/ecoles/foad' },
    ],
  },
  {
    name: 'Formation continue',
    href: '/formation-continue',
    children: [
      { name: 'Navigation et industries', href: '/formation-continue#navigation' },
      { name: 'Certificats STCW', href: '/formation-continue#stcw' },
      { name: 'Institut de Sécurité Maritime (ISMI)', href: '/ecoles/ismi' },
      { name: 'Centre de Recherche (CREMPOL)', href: '/ecoles/crempol' },
      { name: 'Télécharger le catalogue', href: '/formation-continue#catalogue' },
    ],
  },
  {
    name: 'Admissions',
    href: '/admissions',
    children: [
      { name: "Pourquoi intégrer l'ARSTM ?", href: '/admissions#pourquoi' },
      { name: "Concours d'entrée", href: '/admissions#concours' },
      { name: 'Inscription sur dossier', href: '/admissions#inscription' },
      { name: 'Calendrier pédagogique', href: '/admissions#calendrier' },
      { name: 'Tarifs', href: '/admissions#tarifs' },
      { name: "Bourses d'étude", href: '/admissions#bourses' },
      { name: 'FAQ', href: '/admissions#faq' },
    ],
  },
  {
    name: 'Nos références',
    href: '/references',
    children: [
      { name: 'Institutions partenaires', href: '/references#institutions' },
      { name: 'Partenaires et clients', href: '/references#partenaires' },
      { name: 'RIDAMER', href: '/references#ridamer' },
      { name: 'Club Marine Marchande', href: '/references#club' },
      { name: 'Prix et distinctions', href: '/references#prix' },
      { name: 'Certifications (ISO, STCW)', href: '/references#certifications' },
    ],
  },
  {
    name: 'Actualités',
    href: '/actualites',
    children: [
      { name: "Actualités de l'ARSTM", href: '/actualites#news' },
      { name: 'Événements à venir', href: '/actualites#evenements' },
      { name: 'Newsletter', href: '/actualites#newsletter' },
      { name: 'Revue de presse', href: '/actualites#revue' },
    ],
  },
  {
    name: 'Médiathèque',
    href: '/mediatheque',
    children: [
      { name: 'Photos', href: '/mediatheque#photos' },
      { name: 'Vidéos', href: '/mediatheque#videos' },
      { name: 'Publications', href: '/mediatheque#documents' },
      { name: 'Brochures et documents', href: '/mediatheque#documents' },
      { name: 'Communiqués de presse', href: '/mediatheque#documents' },
    ],
  },
];

const IconChevronDown = ({ open }) => (
  <svg
    className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
  </svg>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);

  const onMouseEnter = (name) => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };

  const onMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const toggleMobile = (name) =>
    setMobileExpanded((prev) => (prev === name ? null : name));

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <a href="/accueil" className="flex items-center gap-3 shrink-0 group" aria-label="ARSTM Accueil">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Logo size={46} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-blue-950 leading-none">ARSTM</span>
              <span className="text-[9px] text-amber-500 font-bold tracking-widest uppercase mt-1">Excellence Maritime</span>
            </div>
          </a>

          {/* Navigation desktop */}
          <nav className="hidden xl:flex items-center h-full">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => onMouseEnter(item.name)}
                  onMouseLeave={onMouseLeave}
                >
                  <a
                    href={item.href}
                    className="relative group flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-900 transition-colors rounded-lg"
                  >
                    {item.name}
                    <IconChevronDown open={openDropdown === item.name} />
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-blue-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  </a>

                  {/* Panneau dropdown */}
                  {openDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 pt-1 w-72 z-50"
                      onMouseEnter={() => onMouseEnter(item.name)}
                      onMouseLeave={onMouseLeave}
                    >
                      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 py-2">
                        {item.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            {child.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group flex items-center px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-900 transition-colors rounded-lg"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-blue-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                </a>
              )
            )}
          </nav>

          {/* CTA desktop */}
          <div className="hidden xl:flex items-center shrink-0">
            <a
              href="/choix-profil"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-blue-900 hover:bg-blue-950 shadow-sm hover:shadow-md transition-all"
            >
              E-Learning / Inscription
            </a>
          </div>

          {/* Bouton hamburger mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2.5 rounded-xl text-gray-500 hover:text-blue-900 hover:bg-gray-50 transition-colors"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`xl:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-4 pt-3 pb-6 space-y-1">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.name}>
                <button
                  onClick={() => toggleMobile(item.name)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors"
                >
                  <span>{item.name}</span>
                  <IconChevronDown open={mobileExpanded === item.name} />
                </button>

                <div className={`overflow-hidden transition-all duration-200 ${mobileExpanded === item.name ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="ml-4 mb-2 border-l-2 border-amber-400 pl-4 space-y-0.5">
                    {item.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        className="block py-2 text-sm text-slate-600 hover:text-blue-900 transition-colors"
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors"
              >
                {item.name}
              </a>
            )
          )}

          <div className="pt-4 mt-2 border-t border-gray-100">
            <a
              href="/choix-profil"
              className="w-full flex items-center justify-center px-4 py-3 text-base font-semibold rounded-xl text-white bg-blue-900 hover:bg-blue-950 shadow-sm transition-all"
            >
              E-Learning / Inscription
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
