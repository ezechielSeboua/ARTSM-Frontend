import { useState, useEffect, useCallback } from "react";

/**
 * Carousel Haute Performance – version améliorée
 * @param {Array} images - Tableau d'URLs d'images
 * @param {Number} speed - Vitesse de rotation en ms (défaut 3000)
 */
const Carousel = ({ images = [], speed = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Défilement automatique
  useEffect(() => {
    if (images.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, speed);

    return () => clearInterval(interval);
  }, [images.length, isPaused, speed]);

  // Navigation manuelle
  const goTo = useCallback((index) => setCurrentIndex(index), []);
  const prev = useCallback(
    () => setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1)),
    [images.length]
  );

  // Gestion des touches du clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (images.length === 0) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, images.length]);

  // Message si aucun image
  if (!images || images.length === 0) {
    return (
      <div
        className="w-full h-64 bg-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400"
        role="status"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 stroke-gray-300"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
        <span className="text-sm">Aucune image à afficher</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-xl group transform-gpu"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrousel d'images"
    >
      {/* Conteneur des slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        aria-live="polite"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full shrink-0 select-none aspect-[16/9] bg-gray-200"
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Bouton Précédent */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md text-white rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-white/40 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Image précédente"
        tabIndex={0}
      >
        <svg
          className="w-5 h-5 stroke-[2.5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Bouton Suivant */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md text-white rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-white/40 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Image suivante"
        tabIndex={0}
      >
        <svg
          className="w-5 h-5 stroke-[2.5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
              currentIndex === index
                ? "w-7 bg-white shadow-sm"
                : "w-2 bg-white/60 hover:bg-white/90"
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
            aria-current={currentIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;