import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SectionTitle = ({ tag, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-12">
    {tag && <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">{tag}</span>}
    <h2 className="text-2xl sm:text-3xl font-black text-blue-950 mt-4">{title}</h2>
    {subtitle && <p className="text-slate-500 mt-3 text-sm leading-relaxed">{subtitle}</p>}
  </div>
);

const INSTITUTIONS = [
  { name: "Organisation Maritime de l'Afrique de l'Ouest et du Centre (OMAOC)", pays: "Afrique de l'Ouest", logo: null, type: "Organisation tutelle" },
  { name: "Organisation Maritime Internationale (OMI)", pays: "International", logo: null, type: "Organisation normative" },
  { name: "Ministère des Transports de Côte d'Ivoire", pays: "Côte d'Ivoire", logo: null, type: "Tutelle gouvernementale" },
  { name: "Port Autonome d'Abidjan (PAA)", pays: "Côte d'Ivoire", logo: null, type: "Partenaire opérationnel" },
  { name: "Union Africaine (UA) — Commission Afrique Maritime", pays: "Afrique", logo: null, type: "Institution continentale" },
  { name: "Commission Économique des Nations Unies pour l'Afrique (CEA)", pays: "International", logo: null, type: "Agence ONU" },
];

const PARTENAIRES = [
  { name: "CMA CGM", secteur: "Armement", pays: "France" },
  { name: "MSC Mediterranean Shipping", secteur: "Armement", pays: "Suisse" },
  { name: "BOLLORE Ports", secteur: "Ports & Logistique", pays: "France" },
  { name: "SIVOM — Société Ivoirienne de Manutention", secteur: "Manutention", pays: "Côte d'Ivoire" },
  { name: "TotalEnergies Marine", secteur: "Énergie maritime", pays: "France" },
  { name: "BIC-OABV — Bureau International du Commerce Ouest-Africain", secteur: "Commerce", pays: "Afrique de l'Ouest" },
  { name: "Dakar Dem Dikk — Sénégal", secteur: "Transport maritime", pays: "Sénégal" },
  { name: "WAFIMAR — West African Fisheries Maritime", secteur: "Pêche industrielle", pays: "Régional" },
];

const PRIX = [
  { annee: '2023', prix: "Prix d'Excellence Maritime OMAOC", desc: "Récompense la formation initiale la plus conforme aux standards STCW de l'OMI." },
  { annee: '2021', prix: "Lauréat — Africa Maritime Award", desc: "Institution de l'année pour son programme de formation des officiers de marine." },
  { annee: '2019', prix: "Certification ISO 9001:2015", desc: "Première école maritime d'Afrique subsaharienne certifiée ISO 9001 dans toutes ses filières." },
  { annee: '2017', prix: "Trophée Économie Bleue — COP Maritime Dakar", desc: "Contribution exceptionnelle au développement durable des ressources maritimes africaines." },
];

const CERTIFICATIONS = [
  { code: 'ISO 9001:2015', domaine: 'Management de la Qualité', validite: '2024 — 2027', organisme: 'Bureau Veritas' },
  { code: 'STCW 2010 Manila', domaine: 'Formation des gens de mer', validite: 'Accréditation permanente', organisme: 'OMI / Gouvernement CI' },
  { code: 'ISPS Code', domaine: 'Sûreté maritime', validite: 'Accréditation permanente', organisme: 'Autorité maritime nationale' },
  { code: 'CTG / COE maritime', domaine: 'Formation des officiers', validite: 'Révision 2025', organisme: 'OMAOC' },
];

const ReferencesPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-blue-950 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="text-amber-400 font-bold uppercase tracking-widest text-xs bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full inline-block mb-4">
            Notre réseau
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-3xl">
            Nos Références
          </h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
            L'ARSTM s'appuie sur un écosystème institutionnel, industriel et académique de premier plan pour garantir une formation d'excellence reconnue à l'échelle internationale.
          </p>
        </div>
      </section>

      {/* Chiffres clés */}
      <div className="bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '15', label: 'Pays membres OMAOC' },
              { value: '40+', label: 'Partenaires industriels' },
              { value: '4', label: 'Certifications majeures' },
              { value: '1987', label: "Année de fondation" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-amber-400">{s.value}</p>
                <p className="text-xs text-blue-200 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Institutions partenaires */}
      <section id="institutions" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Tutelle & coopération" title="Institutions partenaires" subtitle="L'ARSTM est une institution régionale sous l'autorité de l'OMAOC, reconnue par les plus hautes instances maritimes internationales." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INSTITUTIONS.map((inst) => (
              <div key={inst.name} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">{inst.type}</span>
                  <h3 className="font-black text-blue-950 text-sm mt-2 leading-snug">{inst.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{inst.pays}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires & Clients */}
      <section id="partenaires" className="bg-slate-50 py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Industrie & Commerce" title="Partenaires et clients" subtitle="Les plus grands opérateurs maritimes, portuaires et logistiques d'Afrique et du monde font confiance aux diplômés et aux programmes de l'ARSTM." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTENAIRES.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{p.secteur}</span>
                </div>
                <h3 className="font-black text-blue-950 text-sm leading-snug">{p.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{p.pays}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIDAMER */}
      <section id="ridamer" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-4">Réseau d'anciens</span>
              <h2 className="text-2xl sm:text-3xl font-black text-blue-950 mb-5">RIDAMER</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Le <strong>Réseau International des Diplômés de l'ARSTM et des Métiers de la Mer (RIDAMER)</strong> regroupe plus de 10 000 anciens étudiants actifs dans 15 pays d'Afrique, d'Europe et d'Amérique.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Ce réseau facilite les opportunités d'emploi, le mentorat des jeunes diplômés et le rayonnement de l'institution à travers le monde. Des rencontres annuelles sont organisées dans les capitales des pays membres.
              </p>
              <ul className="space-y-2">
                {[
                  'Plus de 10 000 membres actifs à l\'international',
                  'Rencontres régionales annuelles (Abidjan, Dakar, Douala)',
                  'Portail emploi dédié aux membres RIDAMER',
                  'Programme de mentorat institutionnalisé',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-950 rounded-3xl p-10 text-center text-white space-y-4">
              <div className="text-5xl font-black text-amber-400">10 000+</div>
              <p className="text-lg font-bold">Diplômés dans le réseau</p>
              <p className="text-blue-200 text-sm">Répartis dans 15 pays — Afrique, Europe & Amériques</p>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                {[
                  { v: '15', l: 'Pays' }, { v: '50+', l: 'Promo annuelle' }, { v: '95%', l: 'Insertion' },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-xl font-black text-amber-400">{s.v}</p>
                    <p className="text-xs text-blue-300 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club Marine Marchande */}
      <section id="club" className="bg-slate-50 py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Communauté professionnelle" title="Club Marine Marchande" subtitle="Un espace d'échanges et de networking dédié aux professionnels du secteur maritime opérant en Afrique de l'Ouest." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-4">
              <h3 className="font-black text-blue-950 text-lg">Le Club en quelques mots</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Fondé sous l'égide de l'ARSTM, le Club Marine Marchande est une association professionnelle réunissant armateurs, capitaines, officiers, ingénieurs maritimes et acteurs du commerce maritime d'Afrique de l'Ouest. Il organise des conférences thématiques, des dîners-débats et des ateliers techniques mensuels.
              </p>
              <div className="space-y-2 pt-2">
                {[
                  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', text: 'Networking mensuel à Abidjan et en ligne' },
                  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', text: 'Conférences thématiques trimestrielles' },
                  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', text: 'Publications spécialisées bi-annuelles' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-4">
              <h3 className="font-black text-blue-950 text-lg">Adhérer au Club</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                L'adhésion est ouverte à tous les professionnels du secteur maritime et portuaire, qu'ils soient diplômés de l'ARSTM ou non. Elle offre l'accès aux événements, à l'annuaire professionnel et aux publications exclusives.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { type: 'Membre individuel', tarif: '50 000 FCFA / an' },
                  { type: 'Membre entreprise', tarif: '250 000 FCFA / an' },
                ].map((m) => (
                  <div key={m.type} className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <p className="text-sm font-bold text-blue-950">{m.type}</p>
                    <p className="text-xs font-black text-amber-600 mt-1">{m.tarif}</p>
                  </div>
                ))}
              </div>
              <a href="mailto:club@arstm.net" className="block w-full text-center mt-4 px-5 py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition-colors text-sm">
                Nous contacter pour adhérer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Prix & Distinctions */}
      <section id="prix" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Reconnaissance internationale" title="Prix et distinctions" />
          <div className="space-y-4 max-w-3xl mx-auto">
            {PRIX.map((p) => (
              <div key={p.prix} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start gap-5 hover:shadow-md transition-shadow">
                <div className="shrink-0 w-14 h-14 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center">
                  <span className="text-xs font-black text-amber-700 text-center leading-tight">{p.annee}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <h3 className="font-black text-blue-950 text-sm">{p.prix}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="bg-slate-50 py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Conformité & Accréditations" title="Certifications (ISO, STCW)" subtitle="L'ARSTM est l'une des rares institutions maritimes africaines à détenir simultanément ces accréditations." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CERTIFICATIONS.map((c) => (
              <div key={c.code} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex gap-4 items-start hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-950 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-blue-950 text-sm">{c.code}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{c.domaine}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg font-bold">{c.organisme}</span>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-lg font-bold">{c.validite}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-950 rounded-3xl p-8 text-center text-white">
            <h3 className="text-xl font-black mb-2">Vous souhaitez collaborer avec l'ARSTM ?</h3>
            <p className="text-blue-200 text-sm mb-6">Partenariats académiques, industriels ou institutionnels — notre Direction des Relations Extérieures vous répond.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:dre@arstm.net" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl transition-colors text-sm">
                dre@arstm.net
              </a>
              <Link to="/institution#contacts" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-colors text-sm">
                Contacts ARSTM
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReferencesPage;
