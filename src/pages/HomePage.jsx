import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EarthLoader from "../components/Loaders/EarthLoader";
import Carousel from "../components/Carrousel";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import QuickAccessCards from "../components/home/QuickAccessCards";
import ValueProposition from "../components/home/ValueProposition";
import NewsletterSection from "../components/NewsletterSection";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const listeImages = [
    // 1. Navire-école / formation maritime
    "https://images.unsplash.com/photo-1599058917216-4a7a0e1e0a2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",

    // 2. Officier sur la passerelle
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",

    // 3. Simulateur de navigation (formation)
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",

    // 4. Port de conteneurs (Abidjan-like)
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",

    // 5. Bateau de pêche traditionnel africain
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ];

  useEffect(() => {
    // Simule un chargement de données
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="flex flex-col items-center">
          <EarthLoader size={8} text="Chargement…" textColor="#1e293b" />
          <p className="mt-4 text-gray-500 text-sm">Veuillez patienter</p>
          <span className="sr-only" role="status" aria-live="polite">
            Chargement en cours
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero – pleine largeur, pas d’espace en haut (collé au header) */}
        <div className="mb-16 md:mb-20">
          <Hero images={listeImages} speed={2000} />
        </div>

        {/* Cartes d’accès rapide – remontent légèrement pour chevaucher le Hero */}
        <div className="mb-16 mt-36 md:mb-20">
          <QuickAccessCards />
        </div>

        {/* Proposition de valeur */}
        <div className="mb-16 md:mb-20">
          <ValueProposition />
        </div>

        {/* Carrousel */}
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20">
          <Carousel images={listeImages} speed={2000} />
        </div>

        {/* Newsletter */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-20">
          <NewsletterSection />
        </div>

        {/* Bannière finale */}
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20">
          <Banner />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;