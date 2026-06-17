'use client';

import React, { useState } from 'react';
import useFormations from '@/hooks/useFormations';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { mockEcoles, mockFormations } from '@/lib/api';
import Link from 'next/link';

export default function FormationsPage() {
  const {
    search,
    setSearch,
    selectedLevel,
    setSelectedLevel,
    selectedSchool,
    setSelectedSchool,
    formations,
  } = useFormations();

  const [activeSyllabus, setActiveSyllabus] = useState<typeof mockFormations[0] | null>(null);

  const getSchoolName = (schoolId: string) => {
    return mockEcoles.find((e) => e.id === schoolId)?.shortName || schoolId;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Catalogue des Formations
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Explorez nos diplômes reconnus par l\'État et choisissez le parcours adapté à vos ambitions.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 bg-slate-900/30 border border-slate-800 p-6 rounded-2xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par titre, compétences..."
            className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-500"
          />

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none"
          >
            <option value="all">Tous les Niveaux</option>
            <option value="Bachelor">Bachelor / Licence</option>
            <option value="Master">Master</option>
            <option value="Engineer">Diplôme d\'Ingénieur</option>
          </select>

          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none"
          >
            <option value="all">Toutes les Écoles</option>
            {mockEcoles.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.shortName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {formations.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          Aucune formation ne correspond à vos filtres.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {formations.map((f) => (
            <Card key={f.id} glass className="flex flex-col h-full justify-between border border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary">{f.level}</Badge>
                    <Badge variant="secondary">{f.duration}</Badge>
                  </div>
                  <Badge variant="info">{getSchoolName(f.ecoleId)}</Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 hover:text-teal-400 transition-colors font-semibold">
                  {f.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {f.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-505 uppercase tracking-wider mb-2">Débouchés professionnels :</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {f.careers.map((career, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-slate-900/60 border border-slate-800 rounded text-slate-400 font-medium">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 border-t border-slate-800 pt-4 mt-4">
                <Button variant="secondary" size="sm" onClick={() => setActiveSyllabus(f)} className="flex-1">
                  Voir le programme
                </Button>
                <Link href="/fr/inscription" className="flex-1">
                  <Button variant="primary" size="sm" className="w-full">
                    S\'inscrire
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Syllabus Modal */}
      <Modal isOpen={!!activeSyllabus} onClose={() => setActiveSyllabus(null)} title={`Programme : ${activeSyllabus?.title}`}>
        <div className="flex flex-col gap-6 py-4 text-left">
          <p className="text-sm text-slate-400 leading-relaxed">{activeSyllabus?.description}</p>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2 font-semibold">Détails des Semestres</h4>
            {activeSyllabus?.program.map((year, yIdx) => (
              <div key={yIdx} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                <h5 className="text-xs font-bold text-teal-450 uppercase tracking-wider">Année {year.year}</h5>
                {year.semesters.map((sem, sIdx) => (
                  <div key={sIdx} className="text-xs flex flex-col gap-1.5 pl-2">
                    <span className="font-semibold text-white">{sem.name}</span>
                    <ul className="list-disc pl-4 text-slate-400 flex flex-col gap-1">
                      {sem.modules.map((mod, mIdx) => (
                        <li key={mIdx}>{mod}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <Button variant="secondary" onClick={() => setActiveSyllabus(null)} className="w-full mt-4">
            Fermer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
