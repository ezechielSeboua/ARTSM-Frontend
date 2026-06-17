'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../layout/I18nContext';
import { mockActualites } from '@/lib/api';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export function ActualitesGrid() {
  const { dict, locale } = useTranslation();

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic': return 'Académique';
      case 'events': return 'Événement';
      case 'campus-life': return 'Vie Étudiante';
      default: return category;
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Dernières Actualités & Événements
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Suivez la vie de notre communauté universitaire et restez connecté avec l\'ARTSM.
            </p>
          </div>
          <Link href={`/${locale}/actualites`}>
            <Button variant="outline" size="md">
              Toutes les actualités
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockActualites.map((item) => (
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
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-4 mt-auto flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <Link href={`/${locale}/actualites`}>
                  <Button variant="ghost" size="sm" className="text-teal-400 font-semibold p-0 hover:bg-transparent hover:text-teal-300">
                    Lire l\'article &rarr;
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ActualitesGrid;
