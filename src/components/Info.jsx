const Info = ({ 
  type = "ticker", // 'ticker' (bandeau haut) ou 'banner' (carte d'alerte)
  title = "INFORMATIONS",
  message = "Avec l'ARSTM, formez vous à distance aux métiers de la Mer et de l'Industrie",
  badgeText = "ALERTE COMMUNIQUE SPECIAL",
  linkText = "Consulter le cahier des charges",
  linkUrl = "#",
  footerText = "DÉPÔT DES DOSSIERS : Du 01 au 12 Juin 2026"
}) => {
  
  // ================= VARIANTE 1 : LE BANDEAU D'INFORMATION HAUT (TICKER) =================
  if (type === "ticker") {
    return (
      <div className="w-full bg-white border-b border-slate-200/80 shadow-sm py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
          {/* Label d'alerte avec l'éclair rouge classique */}
          <div className="flex items-center gap-1.5 font-black text-red-600 uppercase tracking-wider shrink-0 select-none">
            <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>{title} :</span>
          </div>
          
          {/* Contenu textuel du message */}
          <div className="text-slate-600 font-semibold overflow-hidden w-full">
            <p className="truncate transition-all">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= VARIANTE 2 : LE BLOC COMMUNIQUÉ MAJEUR (BANNER COMPLÈTE) =================
  if (type === "banner") {
    return (
      <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white rounded-3xl p-6 lg:p-10 shadow-xl relative overflow-hidden border border-white/10 group">
        {/* Effet visuel d'arrière-plan */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Corps de l'information */}
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-white/5 border border-amber-400/20">
              {badgeText}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {message}
            </p>
            
            {/* Pied d'information optionnel (Ex: Dates clés) */}
            {footerText && (
              <div className="pt-2">
                <span className="inline-block text-xs font-bold text-amber-500 bg-white/5 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-sm font-mono">
                  {footerText}
                </span>
              </div>
            )}
          </div>
          
          {/* Action Call-To-Action (Ex: Téléchargement ou lien) */}
          {linkText && (
            <div className="lg:col-span-4 w-full flex lg:justify-end">
              <a 
                href={linkUrl}
                className="w-full lg:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all transform active:scale-98 group/btn"
              >
                <span>{linkText}</span>
                <svg className="w-4 h-4 ml-2 transform transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Info;