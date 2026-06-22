import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const TrainingPage = () => {
  // Liste des formations continues issues du menu déroulant
  const trainingTracks = [
    {
      id: "stcw",
      title: "Certifications STCW",
      subtitle: "Normes Internationales de Sécurité Maritime",
      badge: "Obligatoire / Réglementaire",
      description:
        "Formations certifiées conformes à la convention internationale STCW (Standards of Training, Certification and Watchkeeping). Essentielles pour valider les compétences de sécurité, de survie en mer, et de lutte contre les incendies à bord des navires commerciaux.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      modules: [
        "Sécurité de Base ( CGO / Certificat Général d'Opérateur )",
        "Maintien des compétences & Recyclage STCW",
        "Sensibilisation à la Sûreté (ISPS Code)",
        "Soins Médicaux d'urgence à bord",
      ],
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "navigation",
      title: "Navigation et Industries",
      subtitle: "Savoir-faire Maritime & Expertise Technique",
      badge: "Double Compétence",
      description:
        "Formations modulaires avancées destinées aux professionnels naviguant ou opérant à l'interface terre-mer. Ce programme couple la maîtrise de la passerelle et la gestion moderne des systèmes embarqués ou portuaires.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l92-7-9-7-9 7zm0 0l-9-7 9-7 9 7zm0 0v-8"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m0 18a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      modules: [
        "Pilotage et Manœuvre sur Simulateur NTPRO",
        "Gestion technique des flottes commerciales",
        "Maintenance des moteurs marins de forte puissance",
        "Automatisation et électricité de bord",
      ],
      image:
        "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "industries",
      title: "Pôle Industries",
      subtitle: "Génie Industriel & Logistique de Pointe",
      badge: "Technique & Usines",
      description:
        "Destiné aux cadres, techniciens et ingénieurs des secteurs industriels, pétroliers et logistiques terrestres. Ce pôle répond directement aux fortes demandes de mise à niveau technologique des industries d'Afrique de l'Ouest.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      modules: [
        "Habilitations Électriques (Haute et Basse Tension)",
        "Maintenance préventive et curative des installations industrielles",
        "Soudage industriel homologué & Chaudronnerie",
        "Santé, Sécurité et Environnement au Travail (HSE)",
      ],
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const { hash } = useLocation();
  const [selectedTrack, setSelectedTrack] = useState(() => {
    const h = hash.replace('#', '');
    return trainingTracks.find((t) => t.id === h) || trainingTracks[0];
  });

  useEffect(() => {
    const h = hash.replace('#', '');
    const found = trainingTracks.find((t) => t.id === h);
    if (found) setSelectedTrack(found);
  }, [hash]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      {/* ================= HERO BANNER ================= */}
      <section className="relative bg-blue-950 py-20 lg:py-28 text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-15 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-950/90 to-blue-950 z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="text-amber-400 font-bold uppercase tracking-widest text-xs bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm">
            Développement Professionnel Continu
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
            Formation Continue
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Valorisez vos compétences et sécurisez votre parcours professionnel
            grâce aux certifications et modules d'excellence de l'ARSTM.
          </p>
        </div>
      </section>

      {/* ================= SECTION STRATÉGIQUE MULTI-ONGLETS ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Sélecteurs horizontaux (Tabs) */}
<div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 mb-12 overflow-x-auto md:overflow-visible scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
  {trainingTracks.map((track) => (
    <button
      key={track.id}
      onClick={() => setSelectedTrack(track)}
      className={`flex-shrink-0 w-44 md:w-auto flex items-center gap-2 md:gap-4 p-3 md:p-5 rounded-2xl border transition-all text-left group transform active:scale-98 ${
        selectedTrack.id === track.id
          ? "bg-blue-900 border-blue-900 text-white shadow-xl"
          : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-100"
      }`}
    >
      <div
        className={`p-2 md:p-3 rounded-xl transition-colors ${
          selectedTrack.id === track.id
            ? "bg-white/10 text-white"
            : "bg-amber-50 text-amber-600 group-hover:bg-amber-100"
        }`}
      >
        <span className="w-5 h-5 md:w-6 md:h-6 block">{track.icon}</span>
      </div>
      <div className="min-w-0">
        <span
          className={`text-[9px] md:text-xs font-bold block uppercase tracking-wider ${
            selectedTrack.id === track.id ? "text-amber-400" : "text-slate-400"
          }`}
        >
          {track.badge}
        </span>
        <h3 className="font-extrabold text-xs md:text-base lg:text-md mt-0.5 tracking-tight truncate">
          {track.title}
        </h3>
      </div>
    </button>
  ))}
</div>

        {/* Panneau de focus dynamique sur la formation sélectionnée */}
        <section className="bg-white border border-slate-200/60 rounded-3xl p-6 lg:p-12 shadow-sm transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Colonne d'informations textuelles (7 colonnes) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-md border border-amber-200/40 inline-block mb-3">
                  {selectedTrack.subtitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
                  {selectedTrack.title}
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {selectedTrack.description}
              </p>

              {/* Liste à puces des sous-modules clés */}
              <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Exemples de modules & spécialisations disponibles :
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {selectedTrack.modules.map((module, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-700"
                    >
                      <svg
                        className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne Visuelle d'accompagnement (5 colonnes) */}
            <div className="lg:col-span-5 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900">
                <img
                  src={selectedTrack.image}
                  alt={selectedTrack.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= SECTION CORPORATE : FORMATION SUR-MESURE ================= */}
      <section className="bg-blue-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-20 -translate-y-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl text-center lg:text-left space-y-3">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
                Solutions Entreprises
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Formations Intra-Entreprise & Sur-Mesure
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Vous êtes un armateur, une entreprise portuaire ou une industrie
                ? Nos équipes pédagogiques conçoivent des modules exclusifs
                adaptés aux réalités de vos équipes et de vos équipements.
              </p>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#catalogue"
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-blue-950 rounded-xl text-sm font-bold text-center shadow-lg transition-all active:scale-98"
              >
                Demander le Catalogue 2026
              </a>
              <a
                href="/institution#contacts"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/10 text-white rounded-xl text-sm font-bold text-center border border-white/20 transition-all"
              >
                Contacter un conseiller
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION CATALOGUE ================= */}
      <section id="catalogue" className="py-16 lg:py-24 scroll-mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Catalogue 2026</span>
            <h2 className="text-2xl sm:text-3xl font-black text-blue-950 mt-4">Télécharger le catalogue de formation</h2>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed">Retrouvez l'ensemble des modules, certifications et formations continues proposés par l'ARSTM dans notre catalogue annuel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {[
              { title: 'Catalogue général', desc: 'Toutes les formations continues — STCW, Navigation, Industries.', pages: '48 pages', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { title: 'STCW & Sûreté maritime', desc: 'Certifications réglementaires OMI — calendriers et tarifs.', pages: '16 pages', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { title: 'Solutions entreprises', desc: 'Formations intra-entreprise — modalités et devis personnalisé.', pages: '12 pages', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            ].map((cat) => (
              <div key={cat.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cat.icon} />
                  </svg>
                </div>
                <h3 className="font-black text-blue-950 text-sm mb-2">{cat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{cat.desc}</p>
                <span className="text-xs font-bold text-slate-400">{cat.pages}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="mailto:formation-continue@arstm.net?subject=Demande de catalogue 2026"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition-colors text-sm shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Recevoir le catalogue par e-mail
            </a>
            <p className="text-xs text-slate-400 mt-3">Envoi gratuit sous 24h ouvrées</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainingPage;
