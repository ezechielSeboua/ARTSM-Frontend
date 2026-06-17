import { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const SchoolsPage = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [openId, setOpenId] = useState(null);

  const schoolsData = [
    { id: "ESTM", title: "Ecole Supérieure des Transports Maritimes", abbreviation: "ESTM", category: "ECOLE", tag: "Enseignement Supérieur", description: "Forme les cadres moyens et supérieurs sédentaires aux métiers de la logistique, de la gestion portuaire, du commerce international et du transport maritime.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800", features: ["Management Portuaire", "Logistique & Supply Chain", "Commerce International"] },
    { id: "ESN", title: "Ecole Supérieure de Navigation", abbreviation: "ESN", category: "ECOLE", tag: "Enseignement Supérieur", description: "Dédiée à la formation des personnels navigants (Officiers de la Marine Marchande). Elle couvre les compétences d'ingénierie en navigation et en mécanique navale.", image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800", features: ["Pont & Navigation", "Machine & Énergie Navale", "Sécurité à bord"] },
    { id: "ISMI", title: "Institut de Sécurité Maritime Interregional", abbreviation: "ISMI", category: "INSTITUT", tag: "Dimension Régionale", description: "Structure d'envergure interrégionale axée sur le renforcement des capacités de l'État en mer, la lutte contre la piraterie, la sûreté et la protection du milieu marin.", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800", features: ["Sûreté Maritime", "Gouvernance de l'Économie Bleue", "Droit de la Mer"] },
    { id: "CREMPOL", title: "Centre de Recherche Maritime Portuaire et Logistique", abbreviation: "CREMPOL", category: "CENTRE", tag: "Recherche & Innovation", description: "Pôle d'excellence scientifique chargé de mener des études stratégiques, des audits et des recherches appliquées pour moderniser les secteurs portuaires africains.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800", features: ["Études Stratégiques", "Audits Portuaires", "Publications Scientifiques"] },
    { id: "CEAM", title: "Centre d'Enseignement et d'Apprentissage Maritime", abbreviation: "CEAM", category: "CENTRE", tag: "Formation Métiers / Apprentissage", description: "Dédié aux formations techniques de courte et moyenne durée pour l'acquisition de compétences pratiques immédiates requises par les chantiers navals et les ports.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800", features: ["Métiers de l'Artisanat Marin", "Certifications Pratiques", "Techniciens de Surface Portuaire"] },
    { id: "FOAD", title: "Formation à Distance", abbreviation: "FOAD", category: "CENTRE", tag: "E-Learning", description: "Plateforme numérique moderne de l'ARSTM permettant aux professionnels en activité de monter en compétences à distance sur les modules maritimes et industriels.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800", features: ["Cours 100% en ligne", "Flexibilité Professionnelle", "Suivi Tutoré"] }
  ];

  const filteredSchools = activeFilter === 'ALL' ? schoolsData : schoolsData.filter(s => s.category === activeFilter);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Header />
      <section className="bg-blue-950 py-16 text-white text-center lg:text-left">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-black">Nos Écoles, Centres & Instituts</h1>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 my-10">
        <div className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start">
          {['ALL', 'ECOLE', 'INSTITUT', 'CENTRE'].map(f => (
            <button key={f} onClick={() => { setActiveFilter(f); setOpenId(null); }} className={`px-5 py-2.5 rounded-xl font-bold text-sm ${activeFilter === f ? 'bg-blue-900 text-white' : 'bg-white border'}`}>
              {f === 'ALL' ? 'Toutes' : f + 'S'}
            </button>
          ))}
        </div>

        {/* VERSION MOBILE : Accordéon */}
        <div className="lg:hidden space-y-3">
          {filteredSchools.map((s) => (
            <div key={s.id} className="bg-white border rounded-2xl overflow-hidden">
              <button onClick={() => setOpenId(openId === s.id ? null : s.id)} className="w-full p-4 flex justify-between items-center font-bold text-slate-800 text-sm">
                {s.abbreviation} <span>{openId === s.id ? '−' : '+'}</span>
              </button>
              {openId === s.id && (
                <div className="p-4 border-t text-sm text-slate-600 bg-slate-50">
                  <p className="font-bold text-blue-950 mb-2">{s.title}</p>
                  {s.description}
                  <a href={`/schools/${s.id.toLowerCase()}`} className="block mt-4 text-center py-2 bg-blue-900 text-white rounded-xl font-bold">Accéder</a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* VERSION DESKTOP : Grille Complète avec Features */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {filteredSchools.map((s) => (
            <article key={s.id} className="bg-white rounded-3xl border shadow-sm flex flex-col overflow-hidden">
              <img src={s.image} className="h-48 w-full object-cover" alt={s.title} />
              <div className="p-6 flex-grow">
                <span className="text-xs font-black uppercase text-blue-900">{s.tag}</span>
                <h3 className="font-black text-lg mt-2 text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{s.description}</p>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {s.features.map((f, i) => (
                      <span key={i} className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded-md">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a href={`/schools/${s.id.toLowerCase()}`} className="block text-center py-3 bg-slate-100 hover:bg-amber-500 font-bold rounded-xl transition-all">Accéder</a>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchoolsPage;