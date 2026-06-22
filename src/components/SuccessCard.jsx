const SuccessCard = ({ 
  title = "Demande enregistrée !", 
  message = "Votre dossier a été transmis avec succès aux services de l'ARSTM. Un e-mail de confirmation contenant vos accès temporaires vous a été envoyé.",
  email = "",
  primaryActionLabel = "Se connecter à mon espace",
  onPrimaryAction = () => window.location.href = "/login"
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Motifs décoratifs de fond légèrement plus amples */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-blue-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/60 shadow-xl text-center space-y-8 relative z-10 transition-all">
        
        {/* Icône de succès animée/stylisée (Agrandie à w-24 h-24) */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-emerald-50 border border-emerald-100 text-emerald-500 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2.5" 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          {/* Petit ping d'effet autour */}
          <span className="absolute inline-flex h-full w-full rounded-3xl bg-emerald-400 opacity-10 animate-ping pointer-events-none" />
        </div>

        {/* Textes principaux (Agrandis pour l'équilibre visuel) */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight px-2">
            {title}
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto">
            {message}
          </p>
        </div>

        {/* Encadré d'information sur l'email (Restylisé et plus lisible) */}
        {email && (
          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4.5 flex items-center justify-center gap-4 w-full max-w-md mx-auto shadow-sm">
            <div className="p-2.5 bg-white rounded-xl border border-slate-200/50 shadow-xs shrink-0 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left overflow-hidden flex-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">La Notification sera envoyée à</p>
              <p className="text-sm font-bold text-blue-950 truncate">{email}</p>
            </div>
          </div>
        )}

        {/* Note de rappel / Spam */}
        <p className="text-xs font-medium text-slate-400 max-w-sm mx-auto leading-relaxed">
          💡 Pensez à vérifier votre dossier <span className="font-semibold text-slate-500">Courriers indésirables (Spam)</span> si vous ne recevez rien d'ici quelques minutes.
        </p>

        {/* Actions (Bouton principal rehaussé) */}
        <div className="pt-2 max-w-md mx-auto">
          <button 
            onClick={onPrimaryAction}
            type="button"
            className="w-full py-4 px-8 bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer outline-none focus:ring-4 focus:ring-blue-900/20"
          >
            <span>{primaryActionLabel}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SuccessCard;