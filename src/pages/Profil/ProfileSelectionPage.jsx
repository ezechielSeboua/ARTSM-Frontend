import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

const profiles = [
  {
    id: "candidats",
    title: "Élève",
    description: "Inscriptions aux concours d'entrée ESTM/ESN. Aucun compte requis.",
    badge: "Concours",
    badgeColor: "text-amber-600 bg-amber-50",
    targetUrl: "/register/candidats",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: "professionels",
    title: "Professionnel",
    description: "Gens de mer, officiers, techniciens. Accès formations & certifications.",
    badge: "Maritime",
    badgeColor: "text-blue-700 bg-blue-50",
    targetUrl: "/register/professionels",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "recruteurs",
    title: "Recruteur / RH",
    description: "Entreprises portuaires, armateurs. Gestion des talents et offres d'emploi.",
    badge: "Entreprise",
    badgeColor: "text-slate-700 bg-slate-100",
    targetUrl: "/register/recruteurs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "chercheurs",
    title: "Chercheur / Expert",
    description: "Universitaires et experts maritimes. Accès à la médiathèque et publications.",
    badge: "Recherche",
    badgeColor: "text-emerald-700 bg-emerald-50",
    targetUrl: "/register/chercheurs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: "bailleurs",
    title: "Bailleur / Institution",
    description: "Organisations internationales, ministères et bailleurs de fonds partenaires.",
    badge: "Institutionnel",
    badgeColor: "text-purple-700 bg-purple-50",
    targetUrl: "/register/bailleurs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const ProfileSelectionPage = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedProfile) return;
    const profile = profiles.find(p => p.id === selectedProfile);
    if (profile) navigate(profile.targetUrl);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex items-center justify-between">
        <Link to="/acceuil" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10">
            <Logo size={80} />
          </div>
          <span className="hidden sm:block font-black text-blue-950 uppercase text-xs">Portail ARSTM</span>
        </Link>
        <Link to="/" className="text-[11px] sm:text-xs font-bold text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
          Accueil
        </Link>
      </nav>

      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-blue-950 mb-2 sm:mb-3">Créer un compte</h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md">
            Sélectionnez votre profil pour accéder au formulaire adapté.
          </p>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelectedProfile(profile.id)}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col gap-3 text-left relative ${
                selectedProfile === profile.id
                  ? "bg-white border-blue-900 shadow-xl ring-2 ring-blue-900/20"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {selectedProfile === profile.id && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="flex items-start justify-between gap-2">
                <div className={`p-2 rounded-lg transition-colors ${selectedProfile === profile.id ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {profile.icon}
                </div>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full mt-0.5 ${profile.badgeColor}`}>
                  {profile.badge}
                </span>
              </div>
              <div>
                <h3 className="font-black text-blue-950 text-sm sm:text-base">{profile.title}</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">{profile.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="w-full max-w-sm mt-6 sm:mt-8 space-y-3">
          <button
            onClick={handleContinue}
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
          <Link
            to="/connexion"
            className="block text-center text-xs sm:text-sm font-bold text-slate-400 hover:text-blue-900 transition-colors py-1"
          >
            Déjà un compte ? Se connecter →
          </Link>
        </div>
      </main>

      <footer className="py-4 sm:py-6 text-center text-[9px] sm:text-[10px] text-slate-400">
        &copy; 2026 ARSTM. Tous droits réservés.
      </footer>
    </div>
  );
};

export default ProfileSelectionPage;
