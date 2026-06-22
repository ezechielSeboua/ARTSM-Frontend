import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const FAQ_ITEMS = [
  { q: "Quels sont les niveaux d'admission à l'ARSTM ?", a: "L'ARSTM accueille des candidats à partir du Baccalauréat pour les formations initiales (ESN, ESTM, CEAM). Les Masters sont accessibles aux titulaires d'une Licence. Les formations continues sont ouvertes aux professionnels en activité." },
  { q: "Peut-on intégrer l'ARSTM par voie de dossier ?", a: "Oui. Certaines formations acceptent les candidats sur analyse de dossier, notamment pour les Masters et les formations continues. Le dossier comprend les diplômes, les relevés de notes, une lettre de motivation et un CV." },
  { q: "L'ARSTM délivre-t-elle des bourses d'étude ?", a: "L'ARSTM dispose d'un programme de bourses partielles pour les étudiants méritants issus des pays membres. Des aides financières spécifiques sont également proposées par les États membres via leurs ministères de tutelle." },
  { q: "Les diplômes sont-ils reconnus à l'international ?", a: "Oui. Les diplômes de l'ARSTM sont homologués par le Ministère de l'Enseignement Supérieur et reconnus par l'OMI (Organisation Maritime Internationale). Ils permettent l'exercice dans tous les pays signataires des conventions STCW." },
  { q: "Existe-t-il un hébergement sur le campus ?", a: "L'ARSTM dispose d'une résidence universitaire sur le campus d'Abidjan. Les places sont attribuées en priorité aux étudiants venant de l'extérieur de la Côte d'Ivoire." },
  { q: "Comment se déroule le concours d'entrée ?", a: "Le concours comprend généralement des épreuves écrites (mathématiques, physique, français/anglais) et une épreuve orale. Le calendrier est publié chaque année sur le site et dans les journaux nationaux." },
];

const TARIFS = [
  { ecole: 'ESN — École Supérieure de Navigation', licence: '850 000', master: '1 100 000', note: 'Par an' },
  { ecole: 'ESTM — École Supérieure des Transports Maritimes', licence: '780 000', master: '980 000', note: 'Par an' },
  { ecole: 'CEAM — Centre d\'Enseignement Maritime', licence: '620 000', master: '—', note: 'Par an' },
  { ecole: 'FOAD — Formation à Distance', licence: '250 000', master: '380 000', note: 'Par module' },
];

const SectionTitle = ({ tag, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-12">
    {tag && <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">{tag}</span>}
    <h2 className="text-2xl sm:text-3xl font-black text-blue-950 mt-4">{title}</h2>
    {subtitle && <p className="text-slate-500 mt-3 text-sm leading-relaxed">{subtitle}</p>}
  </div>
);

const AdmissionsPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-blue-950 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="text-amber-400 font-bold uppercase tracking-widest text-xs bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full inline-block mb-4">
            Rejoindre l'ARSTM
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-3xl">
            Admissions
          </h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
            Tout ce que vous devez savoir pour intégrer l'Académie Régionale des Sciences et Techniques de la Mer.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#concours" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl transition-colors text-sm">
              Concours d'entrée
            </a>
            <a href="#inscription" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-colors text-sm">
              Inscription sur dossier
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '10 000+', label: 'Diplômés depuis 1987' },
              { value: '15', label: 'Pays couverts' },
              { value: '6', label: 'Écoles et centres' },
              { value: '95 %', label: "Taux d'insertion" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-amber-400">{s.value}</p>
                <p className="text-xs text-blue-200 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pourquoi intégrer l'ARSTM */}
      <section id="pourquoi" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Notre valeur ajoutée" title="Pourquoi intégrer l'ARSTM ?" subtitle="Une institution de référence formant l'élite maritime africaine depuis 1987." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Accréditation internationale', desc: 'Diplômes reconnus par l\'OMI et homologués par le Ministère de l\'Enseignement Supérieur.' },
              { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', title: 'Simulateurs de pointe', desc: 'Environnement pédagogique haute technologie avec simulateurs de navigation NTPRO dernière génération.' },
              { icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m0 18a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title: 'Rayonnement régional', desc: '15 pays d\'Afrique de l\'Ouest et du Centre. Réseau d\'anciens actifs dans les plus grandes compagnies mondiales.' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Encadrement d\'excellence', desc: 'Corps enseignant composé d\'officiers, d\'ingénieurs et de praticiens reconnus à l\'échelle internationale.' },
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Bourses disponibles', desc: 'Programme de bourses partielles et aides financières pour les étudiants méritants des pays membres.' },
              { icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Insertion professionnelle', desc: 'Taux d\'insertion de 95 % à 6 mois. Partenariats avec les plus grands opérateurs maritimes et portuaires.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-black text-blue-950 text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concours d'entrée */}
      <section id="concours" className="bg-slate-50 py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Voie principale" title="Concours d'entrée" subtitle="Les concours sont organisés chaque année pour les formations initiales de l'ESN, l'ESTM et le CEAM." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <h3 className="font-black text-blue-950 text-lg">Conditions d'accès</h3>
              <ul className="space-y-3">
                {[
                  'Être titulaire du Baccalauréat (séries scientifiques pour l\'ESN et CEAM)',
                  'Avoir moins de 25 ans au 1er janvier de l\'année du concours',
                  'Être ressortissant d\'un des pays membres de l\'OMAOC',
                  'Aptitude médicale requise — Certificat médical à fournir',
                  'Bonne condition physique (test d\'aptitude nautique pour l\'ESN)',
                ].map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <h3 className="font-black text-blue-950 text-lg">Épreuves</h3>
              <div className="space-y-3">
                {[
                  { matiere: 'Mathématiques', coeff: 4, type: 'Écrit' },
                  { matiere: 'Physique-Chimie', coeff: 3, type: 'Écrit' },
                  { matiere: 'Français', coeff: 2, type: 'Écrit' },
                  { matiere: 'Anglais maritime', coeff: 2, type: 'Écrit' },
                  { matiere: 'Entretien oral', coeff: 3, type: 'Oral' },
                ].map((e) => (
                  <div key={e.matiere} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{e.matiere}</p>
                      <p className="text-xs text-slate-400">{e.type}</p>
                    </div>
                    <span className="text-xs font-black text-blue-900 bg-blue-50 px-2 py-1 rounded-lg">Coeff. {e.coeff}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inscription sur dossier */}
      <section id="inscription" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Voie alternative" title="Inscription sur analyse de dossier" subtitle="Pour les Masters et certaines formations continues, l'admission se fait sur étude du dossier académique et professionnel." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Constitution du dossier', desc: 'Diplômes, relevés de notes des 3 dernières années, lettre de motivation, CV, pièce d\'identité.' },
              { step: '02', title: 'Dépôt en ligne', desc: 'Envoi du dossier complet par e-mail à scolarite@arstm.net ou dépôt physique à la scolarité.' },
              { step: '03', title: 'Étude du dossier', desc: 'La commission pédagogique étudie les candidatures sous 15 jours ouvrables après clôture.' },
              { step: '04', title: 'Notification', desc: 'Résultats communiqués par e-mail. Les candidats retenus reçoivent une convocation pour inscription.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <span className="text-3xl font-black text-blue-100">{s.step}</span>
                <h3 className="font-black text-blue-950 text-sm mt-3 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendrier */}
      <section id="calendrier" className="bg-slate-50 py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Agenda académique" title="Calendrier pédagogique 2026-2027" />
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-950 text-white">
                  <th className="px-6 py-4 text-left font-black text-xs uppercase tracking-widest">Événement</th>
                  <th className="px-6 py-4 text-left font-black text-xs uppercase tracking-widest hidden sm:table-cell">Période</th>
                  <th className="px-6 py-4 text-left font-black text-xs uppercase tracking-widest hidden md:table-cell">Concerne</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { event: 'Ouverture des inscriptions concours', periode: 'Juin — Août 2026', ecoles: 'ESN, ESTM, CEAM' },
                  { event: 'Épreuves du concours d\'entrée', periode: 'Septembre 2026', ecoles: 'ESN, ESTM, CEAM' },
                  { event: 'Publication des résultats', periode: 'Octobre 2026', ecoles: 'ESN, ESTM, CEAM' },
                  { event: 'Rentrée académique', periode: 'Novembre 2026', ecoles: 'Toutes les écoles' },
                  { event: 'Dépôt dossiers inscription sur dossier', periode: 'En continu', ecoles: 'Masters, Formations continues' },
                  { event: 'Sessions de formation continue STCW', periode: 'Mensuelles', ecoles: 'CEAM, ISMI' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.event}</td>
                    <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{row.periode}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">{row.ecoles}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Frais de scolarité" title="Tarifs" subtitle="Les frais indiqués sont exprimés en Francs CFA (FCFA) et sont susceptibles de révision annuelle." />
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">École / Centre</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:table-cell">Licence</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:table-cell">Master</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TARIFS.map((t) => (
                  <tr key={t.ecole} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{t.ecole}</td>
                    <td className="px-6 py-4 text-right font-bold text-blue-900 hidden sm:table-cell">{t.licence} FCFA</td>
                    <td className="px-6 py-4 text-right font-bold text-blue-900 hidden sm:table-cell">{t.master !== '—' ? `${t.master} FCFA` : <span className="text-slate-300">—</span>}</td>
                    <td className="px-6 py-4 text-right text-xs text-slate-400">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
              <p className="text-xs text-amber-800 font-medium">Les frais d'inscription, de dossier et de matériels pédagogiques sont facturés séparément. Contactez la scolarité pour un devis complet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bourses */}
      <section id="bourses" className="bg-slate-50 py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Aide financière" title="Bourses d'étude & aide financière" subtitle="L'ARSTM et ses partenaires proposent plusieurs dispositifs d'aide aux étudiants méritants." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'Bourse ARSTM', color: 'bg-blue-950', text: 'text-white', desc: 'Bourse partielle attribuée aux 10 premiers du concours d\'entrée. Couvre jusqu\'à 50% des frais de scolarité.', cond: 'Concours + classement' },
              { type: 'Bourses États membres', color: 'bg-amber-500', text: 'text-blue-950', desc: 'Les ministères de la Marine des 8 pays membres octroient des bourses à leurs ressortissants via leurs ambassades.', cond: 'Ressortissants OMAOC' },
              { type: 'Aide sociale', color: 'bg-white border border-slate-200', text: 'text-blue-950', desc: 'Facilités de paiement et échelonnement des frais de scolarité sous conditions de ressources. À demander à la scolarité.', cond: 'Sur dossier social' },
            ].map((b) => (
              <div key={b.type} className={`rounded-3xl p-8 ${b.color} shadow-sm`}>
                <h3 className={`font-black text-lg mb-3 ${b.text}`}>{b.type}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${b.text === 'text-white' ? 'text-blue-100' : 'text-slate-600'}`}>{b.desc}</p>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${b.text === 'text-white' ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-700'}`}>{b.cond}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Questions fréquentes" title="FAQ" />
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-bold text-blue-950 text-sm">{item.q}</span>
                  <svg className={`w-5 h-5 text-slate-400 shrink-0 mt-0.5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-950 rounded-3xl p-8 text-center text-white">
            <h3 className="text-xl font-black mb-2">Vous avez d'autres questions ?</h3>
            <p className="text-blue-200 text-sm mb-6">Notre équipe de scolarité vous répond du lundi au vendredi de 8h à 17h.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:scolarite@arstm.net" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl transition-colors text-sm">
                scolarite@arstm.net
              </a>
              <Link to="/institution#contacts" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-colors text-sm">
                Tous les contacts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdmissionsPage;
