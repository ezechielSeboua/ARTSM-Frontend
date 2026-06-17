'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../layout/I18nContext';
import { mockFormations } from '@/lib/api';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export function FormationsGrid() {
  const { dict, locale } = useTranslation();

  // Show first 3 formations
  const featured = mockFormations.slice(0, 3);

  return (
    <section className="py-16 bg-slate-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Formations Phares & Cursus Certifiés
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Nos programmes sont élaborés en collaboration avec des professionnels pour garantir une excellente employabilité.
            </p>
          </div>
          <Link href={`/${locale}/formations`}>
            <Button variant="outline" size="md">
              Voir tout le catalogue
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((formation) => (
            <Card key={formation.id} glass className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="primary">{formation.level}</Badge>
                  <Badge variant="secondary">{formation.duration}</Badge>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 hover:text-teal-400 transition-colors">
                  {formation.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {formation.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Débouchés :</h4>
                  <ul className="text-xs text-slate-400 flex flex-col gap-1.5">
                    {formation.careers.slice(0, 3).map((career, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-teal-500">✓</span>
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href={`/${locale}/formations`}>
                <Button variant="secondary" size="sm" className="w-full">
                  Détails du Programme
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FormationsGrid;
