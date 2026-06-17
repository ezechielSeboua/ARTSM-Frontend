import { useState } from 'react';
import Logo from '../../components/Logo';

const LoginPage = ({ onBack = () => window.history.back(), onLogin = () => {} }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 relative">
      
      {/* Logo desktop : fixe en haut à gauche (inchangé) */}
      <div className="hidden sm:block absolute top-6 left-6 z-50">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <Logo size={40} />
        </div>
      </div>

      {/* Carte de connexion */}
      <div className="w-full max-w-md bg-white sm:rounded-3xl border-0 sm:border border-slate-200 shadow-xl sm:shadow-xl overflow-hidden">
        
        {/* En-tête avec logo intégré (mobile uniquement) */}
        <div className="sm:hidden bg-blue-950 text-white p-4 flex items-center gap-3">
          <div className="bg-white rounded-xl p-1.5">
            <Logo size={36} />
          </div>
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Portail ARSTM</span>
            <h1 className="text-lg font-black tracking-tight">Connexion</h1>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-6 sm:p-10">
          {/* Titre desktop (caché sur mobile car déjà dans le header) */}
          <div className="hidden sm:block mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">Connexion</h1>
            <p className="text-sm text-slate-500 mt-2">Accédez à votre espace sécurisé ARSTM.</p>
          </div>

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
                  onChange={handleChange} 
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 sm:py-4 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
            >
              <span>Se connecter</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          <button 
            onClick={onBack}
            className="w-full mt-4 sm:mt-6 text-[10px] sm:text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors py-2"
          >
            ← Retour au choix du profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;