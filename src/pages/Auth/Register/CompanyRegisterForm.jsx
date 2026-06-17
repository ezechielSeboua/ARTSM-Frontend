import { useState } from 'react';
import SuccessCard from '../../../components/SuccessCard';
import Logo from '../../../components/Logo';

const CompanyRegisterForm = ({ onBack = () => window.history.back() }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessSector: '',
    contactName: '',
    companyEmail: '',
    needsDescription: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entreprise enregistrée :", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessCard 
        email={formData.companyEmail}
        title="Demande B2B Transmise"
        message="Merci pour l'intérêt porté à l'ARSTM. Notre Direction des Relations Extérieures et de la Formation Continue étudie vos besoins spécifiques et reviendra vers vous sous 48 heures ouvrées."
        primaryActionLabel="Retourner au portail"
        onPrimaryAction={onBack}
      />
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-0 sm:py-10 px-0 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-x-hidden">
      
      {/* ========== BARRE DE NAVIGATION DESKTOP UNIQUEMENT ========== */}
      <nav className="hidden sm:flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 items-center justify-between relative z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center bg-white w-14 h-14 rounded-2xl shadow-sm border border-slate-100">
            <a href="/acceuil">
              <Logo size={100} />
            </a>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <span className="font-black text-blue-950 tracking-tight text-sm uppercase">
            Portail ARSTM
          </span>
        </div>
      </nav>

      {/* Décoration de fond (inchangée) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-40 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* ========== CONTENEUR PRINCIPAL ========== */}
      <div className="w-full sm:max-w-2xl bg-white sm:rounded-3xl border-0 sm:border border-slate-200/60 shadow-2xl shadow-slate-200/50 overflow-hidden relative z-10 mt-0 sm:mt-16 rounded-none">
        
        {/* EN-TÊTE – logo intégré sur mobile */}
        <div className="bg-blue-950 text-white p-4 sm:p-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Logo mobile uniquement */}
              <div className="sm:hidden flex-shrink-0 bg-white rounded-xl p-1.5">
                <Logo size={48} />
              </div>
              <div>
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] bg-white/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full inline-block mb-1.5 sm:mb-3">
                  Espace Corporate / B2B
                </span>
                <h1 className="text-lg sm:text-3xl font-black tracking-tight">Partenariat Entreprise</h1>
              </div>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 hover:text-white flex-shrink-0"
              aria-label="Retour"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* CORPS DU FORMULAIRE */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-10 space-y-4 sm:space-y-8">
          
          {/* Étape 1 */}
          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">1</span>
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Informations Structure</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Raison Sociale *</label>
                <input required type="text" name="companyName" onChange={handleChange} 
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none" 
                  placeholder="Ex: Port Autonome..." />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Secteur d'Activité *</label>
                <select required name="businessSector" onChange={handleChange} 
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none cursor-pointer">
                  <option value="">Sélectionnez...</option>
                  <option value="ARMEMENT">Armement Maritime</option>
                  <option value="LOGISTIQUE">Logistique & Transit</option>
                  <option value="OFFSHORE">Industrie Offshore</option>
                </select>
              </div>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">2</span>
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Point de Contact & Besoins</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Responsable RH/Formation *</label>
                <input required type="text" name="contactName" onChange={handleChange} 
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none" 
                  placeholder="Nom et prénom" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Email Entreprise *</label>
                <input required type="email" name="companyEmail" onChange={handleChange} 
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none" 
                  placeholder="contact@entreprise.com" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Besoin de formation *</label>
              <textarea required name="needsDescription" rows="4" onChange={handleChange} 
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none resize-none" 
                placeholder="Décrivez succinctement vos besoins sur-mesure..."></textarea>
            </div>
          </div>

          {/* Bouton de soumission */}
          <button type="submit" 
            className="w-full py-3 sm:py-4 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-2xl shadow-xl shadow-blue-950/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base mt-2">
            <span>Envoyer la demande B2B</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegisterForm;