import { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Info from '../../components/info'; // Intégration du composant d'information

const NewsPage = () => {
  // Gestion de l'onglet actif : ALL (Tout), NEWS (Actualités), PRESS (Press Book)
  const [activeTab, setActiveTab] = useState('ALL');

  // Données fictives mais contextualisées (Actualités & Press Book)
  const newsItems = [
    {
      id: 1,
      category: "NEWS",
      tag: "Appel d'Offres",
      title: "Conception et Réalisation du Site Web de l'ARSTM",
      date: "01 Juin 2026",
      description: "L'Académie Régionale des Sciences et Techniques de la Mer lance un appel d'offres pour la refonte intégrale de sa vitrine numérique. Retrait des cahiers des charges disponible au secrétariat.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
      isUrgent: true,
      link: "#"
    },
    {
      id: 2,
      category: "NEWS",
      tag: "Institutionnel",
      title: "Coopération Régionale : Visite d'une délégation de l'UMA à l'Académie",
      date: "28 Mai 2026",
      description: "Renforcement des liens stratégiques et harmonisation des programmes de formation maritime pour les cadres supérieurs d'Afrique de l'Ouest.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      isUrgent: false,
      link: "#"
    },
    {
      id: 3,
      category: "PRESS",
      tag: "Press Book",
      title: "Reportage RTI : L'ARSTM, pilier de l'économie bleue africaine",
      date: "15 Mai 2026",
      description: "Le grand format du journal télévisé met en lumière nos simulateurs de navigation haute technologie et le taux d'insertion de nos élèves-officiers.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
      isUrgent: false,
      link: "#"
    },
    {
      id: 4,
      category: "NEWS",
      tag: "Académique",
      title: "Ouverture des inscriptions pour l'année académique 2026-2027",
      date: "02 Mai 2026",
      description: "Les vagues de concours d'entrée pour l'ESTM et l'ESN sont officiellement lancées. Modalités et dépôts des dossiers en ligne disponibles dès aujourd'hui.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
      isUrgent: false,
      link: "#"
    },
    {
      id: 5,
      category: "PRESS",
      tag: "Press Book",
      title: "Fraternité Matin : L'ISMI certifie 40 nouveaux experts en sûreté maritime",
      date: "18 Avril 2026",
      description: "Retour presse sur la cérémonie officielle de remise des diplômes de la session interrégionale de lutte contre la criminalité en mer.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      isUrgent: false,
      link: "#"
    }
  ];

  // Filtrage basé sur l'onglet sélectionné
  const filteredItems = activeTab === 'ALL' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeTab);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      {/* Bandeau d'information global sous le menu de navigation */}
      <Info type="ticker" />
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-blue-950 py-16 lg:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block mb-3">
            Espace Communication
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Actualités & Presse
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Suivez au quotidien la vie académique de l'ARSTM, nos communiqués officiels et nos apparitions dans les médias internationaux.
          </p>
        </div>
      </section>

      {/* ================= ZONE DE FILTRAGE (TABS) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-row items-center justify-start gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'ALL'
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tout le flux
          </button>
          <button
            onClick={() => setActiveTab('NEWS')}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'NEWS'
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Actualités & Avis
          </button>
          <button
            onClick={() => setActiveTab('PRESS')}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'PRESS'
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Press Book
          </button>
        </div>
      </div>

      {/* ================= GRILLE PRINCIPALE DE CONTENU ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* MISE EN AVANT VIA LE COMPOSANT INFO (BANNER) */}
        {(activeTab === 'ALL' || activeTab === 'NEWS') && (
          <div className="mb-12">
            <Info 
              type="banner"
              title="Appel d'Offres : Conception et Réalisation du Site Web de l'ARSTM"
              message="Dans le cadre de la modernisation de ses infrastructures numériques, l'ARSTM reçoit les dossiers de candidature pour la refonte complète de son écosystème web."
              badgeText="ALERTE COMMUNIQUE SPECIAL"
              footerText="DÉPÔT DES DOSSIERS : Du 01 au 12 Juin 2026"
              linkText="Consulter le cahier des charges"
              linkUrl="#"
            />
          </div>
        )}

        {/* GRILLE STANDARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article 
              key={item.id} 
              className="bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-blue-950 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                    {item.tag}
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <time className="text-xs font-bold text-slate-400 block mb-2 font-mono">
                    {item.date}
                  </time>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug group-hover:text-blue-900 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 lg:p-8 pt-0">
                <a 
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-950 group/btn transition-colors"
                >
                  <span>Lire l'article complet</span>
                  <svg className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;