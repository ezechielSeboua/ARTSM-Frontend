import { useState } from 'react';
import { Link } from 'react-router-dom';
import SuccessCard from '../../../components/SuccessCard';
import Logo from '../../../components/Logo';
import useUserStore from '../../../stores/useUserStore';

const SECTORS = [
  { value: 'maritime', label: 'Armement Maritime' },
  { value: 'port', label: 'Portuaire & Logistique' },
  { value: 'offshore', label: 'Industrie Offshore' },
  { value: 'security', label: 'Sécurité Maritime' },
  { value: 'fishing', label: 'Pêche & Aquaculture' },
  { value: 'other', label: 'Autre' },
];

const inputCls = "w-full rounded-2xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none";

const ProfessionalRegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    company_name: '', job_title: '', sector: '', country: '', company_website: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { register, loading, error, clearError } = useUserStore();

  const handleChange = (e) => {
    if (error) clearError();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      role: 'professional',
      phone: formData.phone,
      profile: {
        company_name: formData.company_name,
        job_title: formData.job_title,
        sector: formData.sector,
        country: formData.country,
        ...(formData.company_website && { company_website: formData.company_website }),
      },
    };
    const ok = await register(payload);
    if (ok) setSubmitted(true);
  };

  const errorMsg = error
    ? typeof error === 'string' ? error : error.detail || error.email?.[0] || 'Une erreur est survenue'
    : null;

  if (submitted) {
    return (
      <SuccessCard
        email={formData.email}
        title="Compte créé avec succès !"
        message="Un mot de passe temporaire vous a été envoyé par email. Connectez-vous pour accéder à votre espace professionnel et le modifier."
        primaryActionLabel="Se connecter"
        onPrimaryAction={() => window.location.href = '/connexion'}
      />
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-0 sm:py-10 px-0 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-x-hidden">
      <nav className="hidden sm:flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 items-center justify-between relative z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center bg-white w-14 h-14 rounded-2xl shadow-sm border border-slate-100">
            <a href="/acceuil"><Logo size={100} /></a>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <span className="font-black text-blue-950 tracking-tight text-sm uppercase">Portail ARSTM</span>
        </div>
      </nav>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-40 top-0 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full sm:max-w-2xl bg-white sm:rounded-3xl border-0 sm:border border-slate-200/60 shadow-2xl shadow-slate-200/50 overflow-hidden relative z-10 mt-0 sm:mt-16 rounded-none">
        <div className="bg-blue-950 text-white p-4 sm:p-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="sm:hidden flex-shrink-0 bg-white rounded-xl p-1.5">
                <Logo size={48} />
              </div>
              <div>
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] bg-white/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full inline-block mb-1.5 sm:mb-3">
                  Gens de Mer & Maritime
                </span>
                <h1 className="text-lg sm:text-3xl font-black tracking-tight">Inscription Professionnel</h1>
              </div>
            </div>
            <Link to="/choix-profil" className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 hover:text-white flex-shrink-0" aria-label="Retour">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-10 space-y-4 sm:space-y-8">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">1</span>
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Identité & Contact</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Nom *</label>
                <input required type="text" name="last_name" onChange={handleChange} className={inputCls} placeholder="Ex : KOUADIO" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Prénom(s) *</label>
                <input required type="text" name="first_name" onChange={handleChange} className={inputCls} placeholder="Ex : Ahou Marie" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Email *</label>
                <input required type="email" name="email" onChange={handleChange} className={inputCls} placeholder="vous@compagnie.ci" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Téléphone *</label>
                <input required type="tel" name="phone" onChange={handleChange} className={inputCls} placeholder="+225 XX XX XX XX" />
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">2</span>
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Informations Professionnelles</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Entreprise / Armateur *</label>
                <input required type="text" name="company_name" onChange={handleChange} className={inputCls} placeholder="Ex : SIVOMAR" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Fonction / Titre *</label>
                <input required type="text" name="job_title" onChange={handleChange} className={inputCls} placeholder="Ex : Capitaine de navire" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Secteur d'activité *</label>
                <select required name="sector" onChange={handleChange} className={inputCls}>
                  <option value="">Sélectionnez...</option>
                  {SECTORS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Pays *</label>
                <input required type="text" name="country" onChange={handleChange} className={inputCls} placeholder="Ex : Côte d'Ivoire" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Site web (optionnel)</label>
                <input type="url" name="company_website" onChange={handleChange} className={inputCls} placeholder="https://..." />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 sm:py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-blue-950 font-bold rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base mt-2">
            {loading ? (
              <span className="w-5 h-5 border-2 border-blue-950/30 border-t-blue-950 rounded-full animate-spin" />
            ) : (
              <><span>Créer mon compte</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 pt-2">
            Déjà un compte ?{' '}
            <Link to="/connexion" className="font-bold text-blue-900 hover:underline">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ProfessionalRegisterForm;
