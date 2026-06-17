'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../layout/I18nContext';
import { mockEcoles } from '@/lib/api';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export function EcolesGrid() {
  const { dict, locale } = useTranslation();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Découvrez nos Écoles Spécialisées
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            ARTSM rassemble des instituts d\'excellence pédagogique répondant aux exigences professionnelles du continent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockEcoles.map((ecole) => (
            <Card key={ecole.id} glass className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl p-3 bg-slate-900/60 rounded-2xl border border-slate-800">{ecole.logo}</span>
                  <Badge variant="primary">{ecole.campus}</Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {ecole.name} ({ecole.shortName})
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {ecole.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {ecole.specialties.map((spec, i) => (
                    <Badge key={i} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-4 mt-auto flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  👤 {ecole.studentsCount} étudiants actifs
                </span>
                <Link href={`/${locale}/ecoles`}>
                  <Button variant="ghost" size="sm" className="text-teal-400 font-semibold p-0 hover:bg-transparent hover:text-teal-300">
                    S'informer &rarr;
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

export default EcolesGrid;
