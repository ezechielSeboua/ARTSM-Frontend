import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getSchoolBySlug } from '../../data/schools';

const COLOR_MAP = {
  blue:    { badge: 'bg-blue-100 text-blue-800',   btn: 'bg-blue-900 hover:bg-blue-950',   dot: 'bg-blue-500'   },
  indigo:  { badge: 'bg-indigo-100 text-indigo-800', btn: 'bg-indigo-900 hover:bg-indigo-950', dot: 'bg-indigo-500' },
  cyan:    { badge: 'bg-cyan-100 text-cyan-800',   btn: 'bg-cyan-800 hover:bg-cyan-900',   dot: 'bg-cyan-500'   },
  emerald: { badge: 'bg-emerald-100 text-emerald-800', btn: 'bg-emerald-800 hover:bg-emerald-900', dot: 'bg-emerald-500' },
  red:     { badge: 'bg-red-100 text-red-800',     btn: 'bg-red-800 hover:bg-red-900',     dot: 'bg-red-500'    },
  amber:   { badge: 'bg-amber-100 text-amber-800', btn: 'bg-amber-600 hover:bg-amber-700', dot: 'bg-amber-500'  },
};

const LEVEL_COLORS = {
  Licence:    'bg-blue-50 text-blue-700 border-blue-200',
  Master:     'bg-purple-50 text-purple-700 border-purple-200',
  Doctorat:   'bg-indigo-50 text-indigo-700 border-indigo-200',
  Certificat: 'bg-amber-50 text-amber-700 border-amber-200',
  Formation:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  Séminaire:  'bg-slate-50 text-slate-700 border-slate-200',
  Programme:  'bg-cyan-50 text-cyan-700 border-cyan-200',
  Module:     'bg-rose-50 text-rose-700 border-rose-200',
  'CAP/BEP':  'bg-orange-50 text-orange-700 border-orange-200',
  BT:         'bg-teal-50 text-teal-700 border-teal-200',
};

const SchoolDetailPage = () => {
  const { slug } = useParams();
  const school = getSchoolBySlug(slug);

  if (!school) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <p className="text-2xl font-black text-blue-950">École introuvable</p>
          <Link to="/ecoles" className="mt-6 inline-block text-blue-900 font-bold hover:underline">
            ← Retour aux écoles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const colors = COLOR_MAP[school.color] || COLOR_MAP.blue;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-blue-950 py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${school.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/90 to-transparent z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Link
            to="/ecoles"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Toutes les écoles
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
              {school.tag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-3xl">
            {school.title}
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl leading-relaxed">
            {school.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {school.features.map((f) => (
              <span key={f} className="text-xs font-bold px-3 py-1.5 bg-white/10 border border-white/20 text-white rounded-lg">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* Description complète */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 lg:p-10">
          <h2 className="text-xl font-black text-blue-950 mb-4">Présentation</h2>
          <div className="h-1 w-16 bg-amber-400 rounded mb-6" />
          <p className="text-slate-600 leading-relaxed text-base">{school.longDescription}</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Programmes */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-black text-blue-950 mb-6">Nos programmes</h2>
            <div className="space-y-4">
              {school.programs.map((prog, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border shrink-0 mt-0.5 ${LEVEL_COLORS[prog.level] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {prog.level}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{prog.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Durée : {prog.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Débouchés + Certifications */}
          <div className="space-y-8">
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-xl font-black text-blue-950 mb-6">Débouchés professionnels</h2>
              <ul className="space-y-3">
                {school.careers.map((c, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-xl font-black text-blue-950 mb-6">Accréditations & certifications</h2>
              <div className="flex flex-wrap gap-2">
                {school.certifications.map((cert, i) => (
                  <span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-lg ${colors.badge}`}>
                    {cert}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-blue-950 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Intégrer {school.abbreviation}</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Rejoignez l'une des meilleures institutions maritimes d'Afrique et donnez une nouvelle dimension à votre carrière.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/admissions"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl transition-colors"
            >
              Déposer ma candidature
            </Link>
            <Link
              to="/ecoles"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-colors"
            >
              Autres écoles
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SchoolDetailPage;
