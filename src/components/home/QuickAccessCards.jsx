import { useState } from "react";

const QuickAccessCards = () => {
  const cards = [
    {
      title: "Candidat",
      desc: "Inscription aux concours",
      href: "/register/candidats",
      bgImage: "/candidats.jpg",
      fallback:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Professionnel",
      desc: "Formation continue STCW",
      href: "/register/professionels",
      bgImage: "/professionnel.jpg",
      fallback:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Entreprise",
      desc: "Partenariat & B2B",
      href: "/register/compagnies",
      bgImage: "/images/entreprise.jpg",
      fallback:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <path d="M9 9v.01" />
          <path d="M9 12v.01" />
          <path d="M9 15v.01" />
          <path d="M9 18v.01" />
        </svg>
      ),
    },
  ];

  const CardItem = ({ card }) => {
    const [imgSrc, setImgSrc] = useState(card.bgImage);

    const handleError = () => {
      if (imgSrc !== card.fallback) {
        setImgSrc(card.fallback);
      }
    };

    return (
      <a
        href={card.href}
        className="relative flex flex-col h-56 sm:h-72 p-6 sm:p-8 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        {/* Dégradé adaptatif – plus foncé au survol */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-black/30 to-black/50 rounded-3xl group-hover:from-blue-900/70 group-hover:via-black/40 group-hover:to-black/60 transition-colors duration-300" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icône en haut à droite */}
          <div className="self-end mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
            {card.icon}
          </div>

          {/* Titre et description */}
          <h3 className="text-xl sm:text-2xl font-black mb-1 sm:mb-2">{card.title}</h3>
          <p className="text-blue-100 text-xs sm:text-sm font-medium mb-4">{card.desc}</p>

          {/* Bouton positionné en bas */}
          <div className="mt-auto">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest group-hover:bg-white group-hover:text-blue-900 transition-all duration-300">
              Accéder
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Image cachée pour détecter l’échec de chargement */}
        <img
          src={card.bgImage}
          onError={handleError}
          className="hidden"
          alt=""
        />
      </a>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, i) => (
          <CardItem key={i} card={card} />
        ))}
      </div>
    </section>
  );
};

export default QuickAccessCards;