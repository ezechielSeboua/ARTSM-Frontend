import React from 'react';
import Link from 'next/link';
import { mockEcoles, mockFormations } from '@/lib/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface PageParams {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function EcoleDetailPage({ params }: PageParams) {
  const { slug, locale } = await params;

  const ecole = mockEcoles.find((e) => e.id === slug) || mockEcoles[0];
  const courses = mockFormations.filter((f) => f.ecoleId === ecole.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <Link href={`/${locale}/ecoles`} className="text-xs font-bold text-teal-400 hover:underline mb-8 inline-block">
        &larr; Retour aux écoles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 bg-slate-900/30 border border-slate-800 p-6 rounded-3xl glass">
          <div className="text-7xl p-6 bg-slate-900/60 rounded-full w-28 h-28 flex items-center justify-center border border-slate-800 mx-auto">
            {ecole.logo}
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black text-white">{ecole.shortName}</h1>
            <p className="text-xs text-slate-500 font-bold uppercase mt-1">{ecole.name}</p>
            <Badge variant="primary" className="mt-3">{ecole.campus}</Badge>
          </div>
          <div className="border-t border-slate-800/80 pt-4 text-xs text-slate-400 flex flex-col gap-3">
            <div><span className="font-semibold text-slate-300">Effectif :</span> {ecole.studentsCount} Étudiants</div>
            <div><span className="font-semibold text-slate-300">Cursus :</span> {courses.length} Filières</div>
          </div>
          <Link href={`/${locale}/inscription`} className="mt-4">
            <Button variant="primary" className="w-full">S\'inscrire</Button>
          </Link>
        </div>

        {/* Info */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 font-semibold">Présentation générale</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {ecole.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-6 font-semibold">Programmes disponibles</h2>
            <div className="flex flex-col gap-6">
              {courses.map((f) => (
                <Card key={f.id} glass className="border border-slate-800 text-left p-6">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-bold text-white text-lg hover:text-teal-400 transition-colors font-semibold">
                      {f.title}
                    </h3>
                    <Badge variant="primary">{f.level}</Badge>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mb-4">Durée : {f.duration}</div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{f.description}</p>
                  <Link href={`/${locale}/formations`}>
                    <Button variant="secondary" size="sm">Consulter le syllabus &rarr;</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
