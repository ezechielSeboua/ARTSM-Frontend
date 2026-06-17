'use client';

import React, { useState } from 'react';
import { mockLibrary } from '@/lib/api';
import DocumentCard from '@/components/dashboard/DocumentCard';

export default function BibliothequePage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredLibrary = mockLibrary.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === 'all' || item.category === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Bibliothèque Numérique
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Accédez aux manuels, mémoires de recherche, syllabus de cours et supports pédagogiques partagés par vos professeurs.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/30 border border-slate-800 p-4 rounded-2xl mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par titre, auteur, sujet..."
          className="w-full md:max-w-xs px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-500"
        />

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'cours', label: 'Supports de cours' },
            { id: 'livre', label: 'Livres & Manuels' },
            { id: 'these', label: 'Thèses & Mémoires' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedType === type.id
                  ? 'bg-teal-650 border-teal-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredLibrary.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          Aucun document disponible pour cette recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLibrary.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              author={doc.author}
              category={doc.category === 'cours' ? 'Cours' : doc.category === 'livre' ? 'Livre' : 'Thèse/Mémoire'}
              subject={doc.subject}
              fileSize={doc.fileSize}
            />
          ))}
        </div>
      )}
    </div>
  );
}
