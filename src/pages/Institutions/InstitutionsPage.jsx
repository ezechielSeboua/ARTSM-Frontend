import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const InstitutionsPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Les piliers stratégiques issus du menu déroulant
  const coreValues = [
    {
      title: "Politique Qualité",
      description:
        "Certifiée aux normes internationales, l’ARSTM place la rigueur opérationnelle et la satisfaction des exigences maritimes mondiales au cœur de sa gouvernance.",
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
    },
    {
      title: "Équipements de Pointe",
      description:
        "Simulateurs de navigation de dernière génération, laboratoires technologiques et ateliers industriels pour une immersion professionnelle totale.",
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: "Organigramme & Gouvernance",
      description:
        "Une structure administrative optimisée garantissant la fluidité académique et la conformité avec les directives des États membres de l'UMA.",
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* ================= HERO SECTION INDÉPENDANTE ================= */}
      <section className="relative bg-blue-950 py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1600')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/90 to-transparent z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs block mb-3">
            À propos de l'ARSTM
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            L'Institution
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed">
            Découvrez la structure, la vision stratégique et les infrastructures
            de l'institution de référence régionale pour la formation aux
            métiers de la mer et de l'industrie.
          </p>
        </div>
      </section>

      {/* ================= SECTION : MOT DU DG & PRÉSENTATION ================= */}
      <section id="mot-dg" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Bloc Mot du DG (À gauche) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-blue-50/80 to-white border border-blue-100 rounded-3xl p-8 lg:p-10 shadow-sm relative">
            <div className="absolute -top-5 right-10 text-7xl text-blue-200/50 font-serif select-none">
              “
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <div className="w-32 h-32 rounded-2xl bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                {/* Remplacer par la photo officielle du Directeur Général */}
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
                  alt="Directeur Général ARSTM"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-950">
                  Mot du Directeur Général
                </h3>
                <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mt-0.5">
                  Direction Générale ARSTM
                </p>
              </div>
              <blockquote className="text-gray-600 italic text-sm leading-relaxed">
                "Notre ambition est claire : positionner l'ARSTM comme le levier
                incontournable du développement de l'économie bleue en Afrique.
                À travers la rigueur de nos enseignements et la modernité de nos
                outils, nous forgeons l'élite maritime africaine."
              </blockquote>
            </div>
          </div>

          {/* Bloc Présentation Générale (À droite) */}
          <div id="presentation" className="lg:col-span-7 flex flex-col space-y-6">
            <h2 className="text-3xl font-black text-blue-950 tracking-tight">
              Présentation Institutionnelle
            </h2>
            <div className="h-1 w-20 bg-blue-900 rounded" />
            <p className="text-gray-600 leading-relaxed pt-2">
              Fondée pour répondre aux besoins critiques de l'industrie maritime
              ouest-africaine, l'Académie Régionale des Sciences et Techniques
              de la Mer (ARSTM) est un établissement à vocation régionale qui
              forme les cadres navigants et sédentaires de l'économie maritime,
              portuaire et industrielle.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Grâce à un encadrement d'excellence et une synergie unique entre
              formation théorique, militaire et pratique, l'académie assure un
              taux d'insertion professionnelle exceptionnel à ses diplômés au
              sein des plus grandes structures internationales.
            </p>

            <div className="pt-4">
              <a
                href="#organigramme"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-950 transition-colors"
              >
                <span>Consulter l'organigramme administratif</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION : FILM INSTITUTIONNEL & INFRASTRUCTURES ================= */}
      <section id="film" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Immersion Médias
            </span>
            <h2 className="text-3xl font-black text-blue-950 mt-2">
              Film Institutionnel & Valeurs
            </h2>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Visualisez notre environnement et découvrez les fondements
              logistiques et qualitatifs de notre académie.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Vidéo Player Placeholder / Film Institutionnel (6 colonnes) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl bg-blue-950 group border border-gray-100">
                {!isVideoPlaying ? (
                  <>
                    <img
                      src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800"
                      alt="Aperçu Film Institutionnel"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute inset-0 m-auto w-16 h-16 bg-amber-500 hover:bg-amber-400 text-blue-950 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 active:scale-95 transition-all focus:outline-none"
                      aria-label="Lire le film institutionnel"
                    >
                      <svg
                        className="w-6 h-6 ml-1 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-6 text-white font-bold text-sm bg-blue-950/60 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                      Film Institutionnel ARSTM
                    </div>
                  </>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" // Remplacer par l'URL de votre vidéo réelle
                    title="Film Institutionnel ARSTM"
                    allow="accelerplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Cartes Qualité / Équipements / Organigramme (6 colonnes) */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              {coreValues.map((value, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 p-3 bg-amber-50 rounded-xl h-12 w-12 flex items-center justify-center">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-blue-950">
                      {value.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ================= SECTION : FILM INSTITUTIONNEL & INFRASTRUCTURES ================= */}
      <section className="bg-gray-50 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Immersion Médias
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-blue-950 mt-2">
              Film Institutionnel & Valeurs
            </h2>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 1. Cartes Qualité (Passent au-dessus sur mobile pour la hiérarchie) */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              {coreValues.map((value, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 p-3 bg-amber-50 rounded-xl h-12 w-12 flex items-center justify-center">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-950">
                      {value.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Vidéo Player */}
            <div className="lg:col-span-6 w-full">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl bg-blue-950 border border-gray-100">
                {!isVideoPlaying ? (
                  <>
                    <img
                      src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800"
                      alt="Film"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute inset-0 m-auto w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg
                        className="w-6 h-6 ml-1 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION : SERVICES & SITUATION ================= */}
      <section id="localisation" className="py-12 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-3xl p-8 shadow-lg">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-2">
              Service Interne
            </span>
            <h3 className="text-xl font-bold">Le Centre de Santé</h3>
            <p className="text-blue-100 text-sm mt-3 leading-relaxed">
              Infrastructure médicale complète dédiée à la veille sanitaire des
              élèves-officiers, du personnel et ouverte aux résidents de la
              zone.
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center gap-1.5 text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Urgence 24h/24
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Localisation
              </span>
              <h3 className="text-xl font-bold text-blue-950">
                Situation Géographique
              </h3>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Située en bordure du canal de Vridi, l'ARSTM bénéficie d'un
                accès privilégié au Port Autonome d'Abidjan.
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 pt-6 border-t border-gray-100 text-xs font-bold text-blue-900 flex items-center justify-between"
            >
              Ouvrir dans Google Maps
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ================= SECTION : ORGANIGRAMME ================= */}
      <section id="organigramme" className="bg-slate-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Gouvernance</span>
            <h2 className="text-2xl font-black text-blue-950 mt-2">Organigramme</h2>
            <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto">La structure administrative garantissant la fluidité académique et la conformité avec les directives des États membres.</p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">L'organigramme officiel est disponible sur demande auprès de la Direction Générale.</p>
            <a href="mailto:dg@arstm.net" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:underline">
              Contacter la Direction Générale →
            </a>
          </div>
        </div>
      </section>

      {/* ================= SECTION : POLITIQUE QUALITÉ ================= */}
      <section id="qualite" className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-8 lg:p-12 text-white">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-white/10 rounded-2xl shrink-0">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-black mb-3">Politique Qualité</h2>
                <p className="text-blue-100 leading-relaxed max-w-2xl">L'ARSTM est certifiée ISO 9001 version 2015. Notre système de management de la qualité garantit l'excellence des formations dispensées, la satisfaction des parties prenantes et l'amélioration continue de nos processus pédagogiques et administratifs.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {['ISO 9001:2015', 'Certification STCW', 'Homologation MESRS', 'Accréditation OMI'].map(c => (
                    <span key={c} className="text-xs font-bold px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION : CONTACTS ================= */}
      <section id="contacts" className="bg-slate-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Nous contacter</span>
            <h2 className="text-2xl font-black text-blue-950 mt-2">Contacts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Direction Générale', email: 'dg@arstm.net', phone: '+225 27 21 35 42 00', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { label: 'Scolarité & Inscriptions', email: 'scolarite@arstm.net', phone: '+225 27 21 35 42 01', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { label: 'Communication', email: 'cocha@arstm.net', phone: '+225 01 02 02 59 05', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={c.icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-black text-blue-950 text-sm">{c.label}</p>
                  <a href={`mailto:${c.email}`} className="text-xs text-blue-700 font-medium hover:underline block mt-1">{c.email}</a>
                  <p className="text-xs text-slate-500 mt-0.5">{c.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InstitutionsPage;
