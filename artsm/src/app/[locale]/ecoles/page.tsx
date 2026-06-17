'use client';

import React from 'react';
import Link from 'next/link';
import { mockEcoles } from '@/lib/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function EcolesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Nos Écoles de Spécialité
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          L\'ARTSM regroupe trois instituts thématiques de haut niveau, chacun expert dans son domaine d\'enseignement et de recherche.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {mockEcoles.map((ecole) => (
          <Card key={ecole.id} glass className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 items-center border border-slate-800">
            {/* Left Column Logo */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center bg-slate-950/40 border border-slate-850 rounded-2xl p-8 text-center h-full min-h-[200px]">
              <span className="text-6xl mb-4">{ecole.logo}</span>
              <span className="text-2xl font-black text-white">{ecole.shortName}</span>
              <span className="text-xs text-slate-500 font-semibold mt-1">{ecole.campus}</span>
            </div>

            {/* Right Column details */}
            <div className="lg:col-span-9 flex flex-col justify-between text-left h-full">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-extrabold text-white">{ecole.name}</h2>
                  <Badge variant="primary">{ecole.studentsCount} Étudiants actifs</Badge>
                </div>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {ecole.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-505 uppercase tracking-wider mb-2">Filières & Spécialités :</h4>
                  <div className="flex flex-wrap gap-2">
                    {ecole.specialties.map((spec, idx) => (
                      <Badge key={idx} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 border-t border-slate-800 pt-6 mt-4">
                <Link href={`/fr/formations`}>
                  <Button variant="outline" size="sm">
                    Consulter les formations
                  </Button>
                </Link>
                <Link href={`/fr/inscription`}>
                  <Button variant="primary" size="sm">
                    S\'inscrire à {ecole.shortName}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
