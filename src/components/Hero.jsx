import { useState, useEffect } from 'react';

const Hero = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop"
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-8 pb-8 sm:pt-12 sm:pb-12 lg:pt-20 lg:pb-16 overflow-hidden bg-blue-950">
      
      {/* 1. ARRIÈRE-PLAN */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {heroImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out transform-gpu scale-105 ${
              index === currentBg ? 'opacity-40' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/70 to-blue-950/40 backdrop-blur-[3px]" />
      </div>

      {/* 2. CONTENU PRINCIPAL */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="max-w-3xl flex flex-col space-y-4 sm:space-y-6 text-left">
          
          {/* Badge */}
          <div className="inline-flex">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-sm animate-pulse">
              Inscriptions Ouvertes 2026-2027
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            Dominez les Sciences <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              Maritimes
            </span> & Portuaires.
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg text-gray-200 leading-relaxed max-w-2xl">
            Rejoignez l'institution de référence d'Afrique de l'Ouest. L'ARSTM forme les leaders, ingénieurs et cadres supérieurs de l'économie bleue et de la logistique industrielle de demain.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href="/choix-profil"
              className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-bold text-blue-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-lg hover:shadow-amber-500/20 active:scale-98 transition-all duration-200 group"
            >
              <span>S'inscrire en ligne</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="/ecoles"
              className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 backdrop-blur-sm transition-colors duration-200"
            >
              Découvrir nos écoles
            </a>
          </div>
        </div>
      </div>

      {/* 3. STATISTIQUES */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 mt-8 sm:mt-12 lg:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          
          <div className="text-center md:border-r border-white/10 last:border-0 p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">15+</div>
            <div className="text-[10px] sm:text-xs font-bold text-blue-200/70 mt-1 uppercase tracking-widest">
              Pays partenaires
            </div>
          </div>

          <div className="text-center md:border-r border-white/10 last:border-0 p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400">98%</div>
            <div className="text-[10px] sm:text-xs font-bold text-blue-200/70 mt-1 uppercase tracking-widest">
              Taux d'insertion
            </div>
          </div>

          <div className="text-center md:border-r border-white/10 last:border-0 p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">40+</div>
            <div className="text-[10px] sm:text-xs font-bold text-blue-200/70 mt-1 uppercase tracking-widest">
              Années d'excellence
            </div>
          </div>

          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">3 500+</div>
            <div className="text-[10px] sm:text-xs font-bold text-blue-200/70 mt-1 uppercase tracking-widest">
              Cadres diplômés
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;