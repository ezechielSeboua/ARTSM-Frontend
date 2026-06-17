'use client';

import React from 'react';
import DocumentCard from '@/components/dashboard/DocumentCard';
import { mockLibrary } from '@/lib/api';

export default function StudentDocumentsPage() {
  return (
    <div className="flex flex-col gap-6 text-left w-full animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-white mb-1 font-semibold">Bibliothèque & Supports</h2>
        <p className="text-xs text-slate-400 font-medium">Téléchargez vos manuels scolaires et polycopiés de cours.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {mockLibrary.map((doc) => (
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
    </div>
  );
}
