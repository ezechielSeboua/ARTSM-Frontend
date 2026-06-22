import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { SCHOOLS_DATA } from '../../data/schools';

const SchoolsPage = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [openId, setOpenId] = useState(null);

  const filteredSchools = activeFilter === 'ALL' ? SCHOOLS_DATA : SCHOOLS_DATA.filter(s => s.category === activeFilter);

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
            <div key={s.slug} className="bg-white border rounded-2xl overflow-hidden">
              <button onClick={() => setOpenId(openId === s.slug ? null : s.id)} className="w-full p-4 flex justify-between items-center font-bold text-slate-800 text-sm">
                {s.abbreviation} <span>{openId === s.slug ? '−' : '+'}</span>
              </button>
              {openId === s.slug && (
                <div className="p-4 border-t text-sm text-slate-600 bg-slate-50">
                  <p className="font-bold text-blue-950 mb-2">{s.title}</p>
                  {s.description}
                  <a href={`/ecoles/${s.slug}`} className="block mt-4 text-center py-2 bg-blue-900 text-white rounded-xl font-bold">Accéder</a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* VERSION DESKTOP : Grille Complète avec Features */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {filteredSchools.map((s) => (
            <article key={s.slug} className="bg-white rounded-3xl border shadow-sm flex flex-col overflow-hidden">
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
                <a href={`/ecoles/${s.slug}`} className="block text-center py-3 bg-slate-100 hover:bg-amber-500 font-bold rounded-xl transition-all">Accéder</a>
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