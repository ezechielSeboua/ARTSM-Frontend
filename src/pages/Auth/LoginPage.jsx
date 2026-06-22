import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import useUserStore from '../../stores/useUserStore';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, loading, error, isAuthenticated, user, clearError } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const dest = ['admin', 'moderator'].includes(user.role) ? '/tableau-de-bord' : '/espace-utilisateur';
    navigate(dest, { replace: true });
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    if (error) clearError();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials.email, credentials.password);
  };

  const errorMsg = error
    ? typeof error === 'string'
      ? error
      : error.detail || error.non_field_errors?.[0] || 'Identifiants incorrects'
    : null;

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 relative">
      <div className="hidden sm:block absolute top-6 left-6 z-50">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <Logo size={40} />
        </div>
      </div>

      <div className="w-full max-w-md bg-white sm:rounded-3xl border-0 sm:border border-slate-200 shadow-xl sm:shadow-xl overflow-hidden">
        <div className="sm:hidden bg-blue-950 text-white p-4 flex items-center gap-3">
          <div className="bg-white rounded-xl p-1.5">
            <Logo size={36} />
          </div>
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Portail ARSTM</span>
            <h1 className="text-lg font-black tracking-tight">Connexion</h1>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="hidden sm:block mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">Connexion</h1>
            <p className="text-sm text-slate-500 mt-2">Accédez à votre espace sécurisé ARSTM.</p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-[11px] sm:text-[10px] font-bold text-slate-500 mb-1.5 sm:mb-2 uppercase tracking-widest">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none"
                  placeholder="votre.email@exemple.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                <label className="text-[11px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Mot de passe
                </label>
                <button type="button" className="text-[10px] sm:text-xs font-bold text-blue-900 hover:underline">
                  Oublié ?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  required
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Se connecter</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center space-y-2">
            <Link
              to="/choix-profil"
              className="block text-[10px] sm:text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors py-1"
            >
              ← Pas encore de compte ? S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
