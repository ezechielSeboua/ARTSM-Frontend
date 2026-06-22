import { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import useUserStore from '../../stores/useUserStore';

const ROLE_LABELS = {
  student: 'Étudiant',
  candidate: 'Candidat',
  professional: 'Professionnel',
  recruiter: 'Recruteur / RH',
  researcher: 'Chercheur',
  donor: 'Bailleur de fonds',
};

const ROLE_COLORS = {
  student: 'bg-blue-100 text-blue-800',
  candidate: 'bg-amber-100 text-amber-800',
  professional: 'bg-cyan-100 text-cyan-800',
  recruiter: 'bg-slate-200 text-slate-700',
  researcher: 'bg-emerald-100 text-emerald-800',
  donor: 'bg-purple-100 text-purple-800',
};

const UserSpaceLayout = () => {
  const { user, logout, fetchProfile, isAuthenticated, loading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !user) fetchProfile();
  }, [isAuthenticated, user, fetchProfile]);

  useEffect(() => {
    if (user && ['admin', 'moderator'].includes(user.role)) {
      navigate('/tableau-de-bord', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleAuthLogout = () => {
      logout();
      navigate('/connexion', { replace: true });
    };
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/connexion', { replace: true });
  };

  if (!user && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
      </div>
    );
  }

  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-blue-950 p-1.5 rounded-lg">
              <Logo size={20} />
            </div>
            <span className="font-black text-blue-950 text-sm hidden sm:block tracking-tight">ARSTM</span>
          </Link>

          {/* Identité utilisateur */}
          {user && (
            <div className="flex items-center gap-2.5">
              {/* Avatar miniature */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center shrink-0 border border-slate-200">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[11px] font-black text-blue-700">{initials}</span>
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-none">{user.first_name} {user.last_name}</p>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${ROLE_COLORS[user.role] || 'bg-slate-100 text-slate-600'}`}>
                  {ROLE_LABELS[user.role] || user.role}
                </span>
              </div>
            </div>
          )}

          {/* Déconnexion */}
          <button
            onClick={handleLogout}
            title="Déconnexion"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserSpaceLayout;
