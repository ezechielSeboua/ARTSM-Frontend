import React from 'react';
import Link from 'next/link';
import { mockFormations, mockEcoles } from '@/lib/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface PageParams {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function FormationDetailPage({ params }: PageParams) {
  const { slug, locale } = await params;

  const formation = mockFormations.find((f) => f.id === slug) || mockFormations[0];
  const ecole = mockEcoles.find((e) => e.id === formation.ecoleId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <Link href={`/${locale}/formations`} className="text-xs font-bold text-teal-400 hover:underline mb-8 inline-block">
        &larr; Retour au catalogue
      </Link>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="primary">{formation.level}</Badge>
        <Badge variant="secondary">{formation.duration}</Badge>
        <Badge variant="info">{ecole?.shortName}</Badge>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
        {formation.title}
      </h1>

      <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-10 border-b border-slate-900 pb-8">
        {formation.description}
      </p>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-bold text-white mb-4 font-semibold">Débouchés professionnels</h2>
          <ul className="space-y-2.5">
            {formation.careers.map((career, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-teal-500">✓</span>
                <span>{career}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-4 font-semibold">École de Rattachement</h2>
          <Card glass className="p-4 border border-slate-800 text-left">
            <h3 className="font-bold text-white">{ecole?.name}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">Campus : {ecole?.campus}</p>
            <Link href={`/${locale}/ecoles`}>
              <Button variant="ghost" size="sm" className="text-teal-400 p-0 hover:bg-transparent mt-3">
                Voir l\'école &rarr;
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Syllabus Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6 font-semibold">Syllabus & Cursus détaillé</h2>
        <div className="flex flex-col gap-6">
          {formation.program.map((year, yIdx) => (
            <div key={yIdx} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-teal-405 uppercase tracking-wider">Année {year.year}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {year.semesters.map((sem, sIdx) => (
                  <div key={sIdx} className="text-xs flex flex-col gap-2">
                    <span className="font-bold text-white text-sm border-b border-slate-800/80 pb-2">{sem.name}</span>
                    <ul className="list-disc pl-4 text-slate-400 flex flex-col gap-1.5 mt-1 leading-relaxed">
                      {sem.modules.map((mod, mIdx) => (
                        <li key={mIdx}>{mod}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href={`/${locale}/inscription`}>
        <Button variant="primary" size="lg" className="w-full border-none">
          S\'inscrire à cette formation
        </Button>
      </Link>
    </div>
  );
}
