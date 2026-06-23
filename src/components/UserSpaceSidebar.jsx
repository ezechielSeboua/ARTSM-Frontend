import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import useUserStore from '../stores/useUserStore';

const ROLE_LABELS = {
  student:      'Étudiant',
  candidate:    'Candidat',
  professional: 'Professionnel',
  recruiter:    'Recruteur / RH',
  researcher:   'Chercheur',
  donor:        'Bailleur de fonds',
};

const ROLE_COLORS = {
  student:      'text-blue-300',
  candidate:    'text-amber-300',
  professional: 'text-cyan-300',
  recruiter:    'text-slate-300',
  researcher:   'text-emerald-300',
  donor:        'text-purple-300',
};

const navLinks = [
  {
    name: 'Tableau de bord',
    href: '/espace-utilisateur',
    exact: true,
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    name: 'Mon profil',
    href: '/espace-utilisateur/profil',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  {
    name: 'Sécurité',
    href: '/espace-utilisateur/securite',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
];

const UserSpaceSidebar = ({ isOpen, toggle }) => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase();

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
                <span className="text-[8px] text-amber-500 font-bold uppercase tracking-widest">Espace perso</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {navLinks.map((item) => (
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
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
        {/* Identité utilisateur */}
        <AnimatePresence>
          {isOpen && user && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-800 flex items-center justify-center shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[11px] font-black text-white">{initials}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-white truncate">{user.first_name} {user.last_name}</p>
                <p className={`text-[10px] font-semibold truncate ${ROLE_COLORS[user.role] || 'text-slate-400'}`}>
                  {ROLE_LABELS[user.role] || user.role}
                </p>
              </div>
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

export default UserSpaceSidebar;
