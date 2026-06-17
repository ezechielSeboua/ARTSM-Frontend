import { useState } from 'react';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Liste des onglets mise à jour d'après le site de l'ARSTM
  const navItems = [
    { name: 'Accueil', href: '/acceuil', hasDropdown: false },
    { name: "L'Institution", href: '/institution', hasDropdown: true },
    { name: 'Écoles', href: '/ecoles', hasDropdown: true },
    { name: 'Formation Continue', href: '/formation-continue', hasDropdown: true },
    { name: 'Séminaires', href: '/seminaires', hasDropdown: false },
    { name: 'Actualités', href: '/actualites', hasDropdown: true },
    { name: 'Médiathèque', href: '/mediatheque', hasDropdown: true },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. LOGO & BRANDING */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/acceuil" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1" aria-label="ARSTM Accueil">
              <div className="transition-transform duration-300 ease-out group-hover:scale-105 transform-gpu">
                <Logo size={46} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-blue-950 leading-none">
                  ARSTM
                </span>
                <span className="text-[9px] text-amber-500 font-bold tracking-widest uppercase mt-1">
                  Excellence Maritime
                </span>
              </div>
            </a>
          </div>

          {/* 2. NAVIGATION DYNAMIQUE (DESKTOP - Visible sur écrans larges) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 h-full">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="relative group flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
              >
                <span>{item.name}</span>
                
                {/* Flèche icône si l'onglet contient un sous-menu comme sur l'image */}
                {item.hasDropdown && (
                  <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-900 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                )}

                {/* Animation du trait qui charge (Ligne magique de survol) */}
                <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-blue-900 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out-quint transform-gpu" />
              </a>
            ))}
          </nav>

          {/* 3. CALL TO ACTION (DESKTOP) */}
          <div className="hidden lg:flex items-center">
            <a 
              href="/choix-profil" 
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-blue-900 hover:bg-blue-950 active:scale-[0.98] shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              E-Learning / Inscription
            </a>
          </div>

          {/* BOUTON MENU HAMBURGER (MOBILE & TABLETTE) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-500 hover:text-blue-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <svg className="h-6 w-6 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENU DÉROULANT (MOBILE & TABLETTE) */}
      <div 
        id="mobile-menu"
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={item.href} 
              className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors"
            >
              <span>{item.name}</span>
              {item.hasDropdown && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </a>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-100">
            <a 
              href="/choix-profil" 
              className="w-full flex items-center justify-center px-4 py-3 text-base font-semibold rounded-xl text-white bg-blue-900 hover:bg-blue-950 shadow-sm active:scale-[0.99] transition-all"
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