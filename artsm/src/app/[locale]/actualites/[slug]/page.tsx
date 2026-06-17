import React from 'react';
import Link from 'next/link';
import { mockActualites } from '@/lib/api';
import Badge from '@/components/ui/Badge';

interface PageParams {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ActualiteDetailPage({ params }: PageParams) {
  const { slug, locale } = await params;

  const article = mockActualites.find((a) => a.id === slug) || mockActualites[0];

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic': return 'Académique';
      case 'events': return 'Événement';
      case 'campus-life': return 'Vie Étudiante';
      default: return category;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <Link href={`/${locale}/actualites`} className="text-xs font-bold text-teal-400 hover:underline mb-8 inline-block">
        &larr; Retour aux actualités
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <Badge variant={article.category === 'academic' ? 'primary' : article.category === 'events' ? 'warning' : 'success'}>
          {getCategoryLabel(article.category)}
        </Badge>
        <span className="text-xs text-slate-500 font-medium">🕒 {article.readTime} de lecture</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
        {article.title}
      </h1>

      <div className="text-sm text-slate-500 font-semibold mb-8 border-b border-slate-900 pb-4">
        Publié le {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>

      <div className="text-5xl p-6 bg-slate-900/60 rounded-3xl border border-slate-800 w-24 h-24 flex items-center justify-center mb-8">
        {article.image}
      </div>

      <div className="text-base text-slate-350 leading-relaxed space-y-6">
        <p className="font-semibold text-white text-lg">
          {article.excerpt}
        </p>
        <p>
          {article.content}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}
