import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';

const Sidebar = ({ isOpen, toggle }) => {
  const { pathname } = useLocation();

  // Navigation unifiée : Mélange de navigation institutionnelle et de gestion de compte
  const navLinks = [
    { name: 'Vue d\'ensemble', href: '/tableau-de-bord/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Mes Candidatures', href: '/tableau-de-bord/candidatures', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Formations', href: '/tableau-de-bord/formations', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Medias', href: '/tableau-de-bord/medias', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Actualités', href: '/tableau-de-bord/actualites', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <motion.div 
      animate={{ width: isOpen ? 260 : 80 }}
      className="h-full flex flex-col bg-blue-950 text-white relative shadow-2xl transition-all duration-300"
    >
      {/* Bouton de bascule élégant */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-20 bg-amber-500 hover:bg-amber-400 text-blue-950 rounded-full p-1.5 shadow-lg z-50 transition-transform hover:scale-110"
      >
        <svg className={`w-4 h-4 transition-transform ${isOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header Sidebar (Rappel visuel du Header principal) */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg shrink-0"><Logo size={28} /></div>
          <AnimatePresence>
            {isOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
                <span className="font-black text-lg leading-none">ARSTM</span>
                <span className="text-[8px] text-amber-500 font-bold uppercase tracking-widest">Dashboard</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1.5">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive ? 'bg-amber-500 text-blue-950 shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className={`w-6 h-6 shrink-0 ${isActive ? 'text-blue-950' : 'text-amber-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d={item.icon} />
              </svg>
              <AnimatePresence>
                {isOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-semibold text-sm whitespace-nowrap">
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </nav>

      {/* Footer Sidebar (Action rapide) */}
      <div className="p-4 border-t border-white/10">
        <a href="/acceuil" className="flex items-center gap-4 px-3 py-2 text-slate-500 hover:text-white transition-colors">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          {isOpen && <span className="text-xs font-bold uppercase tracking-wider">Retour au site</span>}
        </a>
      </div>
    </motion.div>
  );
};

export default Sidebar;