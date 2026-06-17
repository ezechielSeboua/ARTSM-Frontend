'use client';

import React from 'react';
import useActualites from '@/hooks/useActualites';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ActualitesPage() {
  const { search, setSearch, selectedCategory, setSelectedCategory, actualites } = useActualites();

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic': return 'Académique';
      case 'events': return 'Événement';
      case 'campus-life': return 'Vie Étudiante';
      default: return category;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Actualités & Publications
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Suivez la vie scientifique et étudiante de l\'ARTSM en consultant nos derniers articles, annonces et reportages.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/30 border border-slate-800 p-4 rounded-2xl mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un article..."
          className="w-full md:max-w-xs px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-500"
        />

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
          {['all', 'academic', 'events', 'campus-life'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-650 border-teal-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Tous' : getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {actualites.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          Aucun article ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actualites.map((item) => (
            <Card key={item.id} glass className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={item.category === 'academic' ? 'primary' : item.category === 'events' ? 'warning' : 'success'}>
                    {getCategoryLabel(item.category)}
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">🕒 {item.readTime}</span>
                </div>

                <div className="text-4xl mb-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-850 w-16 h-16 flex items-center justify-center">
                  {item.image}
                </div>

                <h3 className="text-lg font-bold text-white mb-3 hover:text-teal-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {item.content}
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-4 mt-auto flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-xs text-teal-400 font-semibold cursor-pointer hover:underline">Lire la suite &rarr;</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
