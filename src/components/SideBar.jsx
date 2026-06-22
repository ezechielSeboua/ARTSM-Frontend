import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import useUserStore from '../stores/useUserStore';

const ROLE_LABELS = {
  student: 'Étudiant',
  professional: 'Professionnel',
  recruiter: 'Recruteur / RH',
  researcher: 'Chercheur',
  donor: 'Bailleur',
  moderator: 'Modérateur',
  admin: 'Agent ARSTM',
};

const navLinks = [
  {
    name: 'Vue d\'ensemble',
    href: '/tableau-de-bord',
    exact: true,
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    name: 'Utilisateurs',
    href: '/tableau-de-bord/utilisateurs',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    name: 'Formations',
    href: '/tableau-de-bord/formations',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    name: 'Écoles',
    href: '/tableau-de-bord/ecoles',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    name: 'Filières',
    href: '/tableau-de-bord/filieres',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    name: 'Concours',
    href: '/tableau-de-bord/concours',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    name: 'Médias',
    href: '/tableau-de-bord/medias',
    disabled: true,
    icon: 'M15 10l4.553-2.069A1 1 0 0121 8.869v6.262a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
  {
    name: 'Actualités',
    href: '/tableau-de-bord/actualites',
    disabled: true,
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  },
];

const Sidebar = ({ isOpen, toggle }) => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/connexion', { replace: true });
  };

  return (
    <motion.div
      animate={{ width: isOpen ? 260 : 80 }}
      className="h-full flex flex-col bg-blue-950 text-white relative shadow-2xl"
    >
      {/* Bouton bascule */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-20 bg-amber-500 hover:bg-amber-400 text-blue-950 rounded-full p-1.5 shadow-lg z-50 transition-transform hover:scale-110"
      >
        <svg className={`w-4 h-4 transition-transform ${isOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header */}
      <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
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
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {navLinks.map((item) => {
          if (item.disabled) {
            return (
              <div
                key={item.name}
                className="flex items-center gap-4 px-3 py-3 rounded-xl opacity-30 cursor-not-allowed"
                title="Bientôt disponible"
              >
                <svg className="w-6 h-6 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d={item.icon} />
                </svg>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-semibold text-sm text-slate-400 whitespace-nowrap">
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-amber-500 text-blue-950 shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
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
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Lien Sécurité — modérateurs uniquement */}
      {user?.role === 'moderator' && (
        <div className="px-4 pb-2">
          <NavLink
            to="/tableau-de-bord/securite"
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive ? 'bg-amber-500 text-blue-950 shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <svg className={`w-6 h-6 shrink-0 ${isActive ? 'text-blue-950' : 'text-amber-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-semibold text-sm whitespace-nowrap">
                      Sécurité
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        </div>
      )}

      {/* Footer : infos utilisateur + déconnexion */}
      <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
        {/* Profil utilisateur */}
        <AnimatePresence>
          {isOpen && user && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs font-black text-white truncate">{user.first_name} {user.last_name}</p>
              <p className="text-[10px] text-amber-400 font-semibold truncate">{ROLE_LABELS[user.role] || user.role}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Retour au site */}
        <NavLink to="/" className="flex items-center gap-4 px-3 py-2 text-slate-500 hover:text-white transition-colors rounded-xl hover:bg-white/5">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {isOpen && <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Retour au site</span>}
        </NavLink>

        {/* Déconnexion */}
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors rounded-xl">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {isOpen && <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Déconnexion</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
