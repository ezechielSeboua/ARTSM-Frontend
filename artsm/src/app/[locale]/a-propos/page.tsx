'use client';

import React from 'react';
import Card from '@/components/ui/Card';

export default function AProposPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          À Propos de l\'ARTSM Academy
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Découvrez notre histoire, notre vision stratégique et les valeurs qui guident notre action pédagogique au quotidien.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Le mot du Directeur Général</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            "Depuis sa fondation, l\'ARTSM s\'est donné pour mission de former des cadres hautement qualifiés capables de propulser le développement industriel, maritime et technologique de notre continent. Nous croyons fermement que l\'Afrique a besoin de leaders formés aux standards internationaux les plus rigoureux."
          </p>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            "En s\'appuyant sur des infrastructures de pointe et un réseau d\'universités et d\'entreprises partenaires de premier plan, nous garantissons à nos diplômés un taux d\'insertion professionnelle exceptionnel."
          </p>
          <div className="text-sm">
            <div className="font-bold text-teal-400">Dr. Amadou Diallo</div>
            <div className="text-slate-500 font-semibold">Directeur Général, ARTSM Academy</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-80 h-80 rounded-3xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-center items-center relative overflow-hidden glass animate-float">
            <span className="text-8xl mb-4">⚓</span>
            <span className="text-lg font-bold text-white">ARTSM Excellence</span>
            <span className="text-xs text-slate-500 mt-2">Fondé en 1987</span>
          </div>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl font-bold text-center text-white mb-10">Nos Valeurs Fondamentales</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Rigueur', desc: 'Une exigence académique constante pour garantir le meilleur niveau de compétence.', icon: '⚖️' },
            { title: 'Innovation', desc: 'L\'adaptation continue de nos programmes aux technologies de pointe.', icon: '💡' },
            { title: 'Excellence', desc: 'La recherche permanente de la qualité dans l\'enseignement et l\'apprentissage.', icon: '🏆' },
            { title: 'Diversité', desc: 'L\'accueil d\'étudiants venus de tout le continent dans un esprit d\'unité.', icon: '🌍' },
          ].map((val, i) => (
            <Card key={i} glass className="flex flex-col items-start p-6 gap-3 border border-slate-800">
              <span className="text-3xl">{val.icon}</span>
              <h3 className="text-lg font-bold text-white">{val.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
