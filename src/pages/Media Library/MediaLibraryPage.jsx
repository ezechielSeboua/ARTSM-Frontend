import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const MediaLibraryPage = () => {
  const { hash } = useLocation();
  const HASH_TAB_MAP = { '#photos': 'PHOTOS', '#videos': 'VIDEOS', '#documents': 'DOCUMENTS' };
  const [activeTab, setActiveTab] = useState(() => HASH_TAB_MAP[hash] || 'PHOTOS');
  // Transition fluide entre les onglets
  const [fade, setFade] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setFade(true);
    setTimeout(() => {
      setActiveTab(tab);
      setFade(false);
    }, 150);
  };

  // Données (inchangées)
  const photoAlbums = [
    {
      id: 1,
      title: "Cérémonie de rentrée des Élèves-Officiers",
      count: "24 Photos",
      date: "Octobre 2025",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Travaux pratiques sur le simulateur de navigation",
      count: "18 Photos",
      date: "Janvier 2026",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Remise des diplômes des cadres de l'ESTM",
      count: "32 Photos",
      date: "Décembre 2025",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const videoItems = [
    {
      id: 1,
      title: "Immersion au cœur de l'Ecole Supérieure de Navigation",
      duration: "05:40",
      date: "Mars 2026",
      thumbnail: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Présentation des infrastructures du Pôle Industries",
      duration: "03:15",
      date: "Février 2026",
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const documentItems = [
    { id: 1, title: "Brochure officielle des formations ARSTM 2026", type: "PDF", size: "4.2 MB", category: "Général" },
    { id: 2, title: "Règlement intérieur et Code de conduite des élèves", type: "PDF", size: "1.8 MB", category: "Scolarité" },
    { id: 3, title: "Dossier d'inscription aux concours d'entrée 2026-2027", type: "ZIP", size: "12.5 MB", category: "Concours" },
    { id: 4, title: "Calendrier des sessions de formation continue STCW", type: "PDF", size: "850 KB", category: "Formations" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />

      {/* ================= HERO (responsive amélioré) ================= */}
      <section className="relative bg-blue-950 py-12 sm:py-16 lg:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block mb-3">
            Ressources Multimédias
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Médiathèque
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Explorez notre histoire en images, visionnez nos vidéos pédagogiques et téléchargez tous les documents administratifs officiels.
          </p>
        </div>
      </section>

      {/* ================= ONGLETS (responsive, avec scroll horizontal sur mobile si nécessaire) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        <div
          className="flex sm:grid sm:grid-cols-3 gap-2 sm:gap-3 border-b border-slate-200 pb-3 sm:pb-5 overflow-x-auto sm:overflow-visible scrollbar-hide"
          role="tablist"
          aria-label="Catégories de la médiathèque"
        >
          <button
            onClick={() => handleTabChange("PHOTOS")}
            role="tab"
            aria-selected={activeTab === "PHOTOS"}
            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm font-bold rounded-2xl transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === "PHOTOS"
                ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-[1.02]"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="hidden xs:inline">Photothèque</span>
            <span className="xs:hidden">Photos</span>
          </button>

          <button
            onClick={() => handleTabChange("VIDEOS")}
            role="tab"
            aria-selected={activeTab === "VIDEOS"}
            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm font-bold rounded-2xl transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === "VIDEOS"
                ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-[1.02]"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="hidden xs:inline">Vidéothèque</span>
            <span className="xs:hidden">Vidéos</span>
          </button>

          <button
            onClick={() => handleTabChange("DOCUMENTS")}
            role="tab"
            aria-selected={activeTab === "DOCUMENTS"}
            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm font-bold rounded-2xl transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === "DOCUMENTS"
                ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-[1.02]"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden xs:inline">Documents</span>
            <span className="xs:hidden">Docs</span>
          </button>
        </div>
      </div>

      {/* ================= CONTENU (avec transition d'opacité) ================= */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}>
        {/* PHOTOS */}
        {activeTab === "PHOTOS" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {photoAlbums.map((album) => (
              <article
                key={album.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="relative h-48 sm:h-56 bg-slate-200 overflow-hidden">
                  <img
                    src={album.image}
                    alt={album.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-950/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white text-[10px] sm:text-xs font-bold tracking-wide">
                    {album.count}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <time className="text-[10px] sm:text-xs font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                    {album.date}
                  </time>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-800 line-clamp-2 group-hover:text-blue-900 transition-colors">
                    {album.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* VIDEOS */}
        {activeTab === "VIDEOS" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {videoItems.map((video) => (
              <article
                key={video.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      aria-label={`Lire la vidéo ${video.title}`}
                      className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500 hover:bg-amber-400 text-blue-950 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-white text-[10px] sm:text-xs font-mono font-bold">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <time className="text-[10px] sm:text-xs font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                    {video.date}
                  </time>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-800 group-hover:text-blue-900 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* DOCUMENTS – version responsive : table sur desktop, liste de cartes sur mobile */}
        {activeTab === "DOCUMENTS" && (
          <>
            {/* Vue mobile (cachée sur md+) */}
            <div className="md:hidden space-y-3">
              {documentItems.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="text-sm font-extrabold text-slate-800 mb-2">{doc.title}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">{doc.category}</span>
                      <span className="font-mono text-slate-500">
                        <span className="font-bold text-blue-900">.{doc.type}</span> ({doc.size})
                      </span>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-blue-950 text-xs font-bold rounded-lg transition-colors active:scale-95">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Vue tablette et desktop (table) */}
            <div className="hidden md:block bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">Libellé du document</th>
                      <th className="py-4 px-6">Catégorie</th>
                      <th className="py-4 px-6">Format / Taille</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {documentItems.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="py-4 px-6 font-semibold text-slate-800">{doc.title}</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-500 font-mono text-xs">
                          <span className="font-bold text-blue-900 mr-1">.{doc.type}</span> ({doc.size})
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-amber-500 hover:text-blue-950 text-slate-700 text-xs font-bold rounded-lg transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Télécharger</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MediaLibraryPage;