import React, { useState } from "react";
import Logo from "../../components/Logo";

const ProfileSelectionPage = ({
  onProfileSelect,
  onBackToHome = () => (window.location.href = "/acceuil"),
}) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = [
    {
      id: "candidats",
      title: "Élève / Candidat",
      description: "Inscriptions aux concours d'entrée ESTM/ESN et suivi de dossier académique.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      targetUrl: "/register/candidats",
      badge: "Scolarité",
    },
    {
      id: "professionels",
      title: "Professionnel",
      description: "Formation continue, recyclage de certificats et modules STCW.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      targetUrl: "/register/professionels",
      badge: "Gens de mer",
    },
    {
      id: "compagnies",
      title: "Partenaire",
      description: "Gestion des compétences, formation sur-mesure et relations entreprises.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      targetUrl: "/register/compagnies",
      badge: "Espace B2B",
    },
  ];

  const handleNavigation = () => {
    if (!selectedProfile) return;
    if (onProfileSelect) return onProfileSelect(selectedProfile);
    const profile = profiles.find((p) => p.id === selectedProfile);
    if (profile) window.location.href = profile.targetUrl;
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Navigation – compacte sur mobile, inchangée sur desktop */}
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex items-center justify-between">
        <a href="/acceuil" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10">
            <Logo size={80} />
          </div>
          <span className="hidden sm:block font-black text-blue-950 uppercase text-xs">Portail ARSTM</span>
        </a>
        <button
          onClick={onBackToHome}
          className="text-[11px] sm:text-xs font-bold text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          Accueil
        </button>
      </nav>

      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-blue-950 mb-3 sm:mb-4">Bienvenue</h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md">
            Sélectionnez votre profil pour accéder au formulaire adapté à votre situation.
          </p>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelectedProfile(profile.id)}
              className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col gap-3 sm:gap-4 text-left relative ${
                selectedProfile === profile.id
                  ? "bg-white border-blue-900 shadow-xl ring-2 ring-blue-900/20"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {/* Indicateur de sélection */}
              {selectedProfile === profile.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="flex justify-between items-start">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    selectedProfile === profile.id ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {React.cloneElement(profile.icon, { className: "w-5 h-5" })}
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 mt-1">
                  {profile.badge}
                </span>
              </div>
              <div>
                <h3 className="font-black text-blue-950 text-base sm:text-lg">{profile.title}</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                  {profile.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="w-full max-w-lg mt-8 sm:mt-10 space-y-3 sm:space-y-4">
          <button
            onClick={handleNavigation}
            disabled={!selectedProfile}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
              selectedProfile
                ? "bg-amber-500 hover:bg-amber-400 text-blue-950 shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span>Continuer</span>
            {selectedProfile && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
          <a
            href="/connexion"
            className="block text-center text-xs sm:text-sm font-bold text-slate-400 hover:text-blue-900 transition-colors"
          >
            Déjà un compte ? Se connecter
          </a>
        </div>
      </main>

      <footer className="py-4 sm:py-6 text-center text-[9px] sm:text-[10px] text-slate-400">
        &copy; 2026 ARSTM. Tous droits réservés.
      </footer>
    </div>
  );
};

export default ProfileSelectionPage;