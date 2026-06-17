'use client';

import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface DocumentCardProps {
  title: string;
  author: string;
  category: string;
  subject: string;
  fileSize: string;
}

export function DocumentCard({ title, author, category, subject, fileSize }: DocumentCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Téléchargement de "${title}" terminé (${fileSize}) !`);
    }, 1500);
  };

  return (
    <Card glass className="flex flex-col justify-between h-full border border-slate-800 p-5 gap-4">
      <div className="flex flex-col gap-1 text-left">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
            {category}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold">💾 {fileSize}</span>
        </div>
        <h4 className="text-sm font-bold text-white leading-snug hover:text-teal-400 transition-colors">
          {title}
        </h4>
        <div className="text-xs text-slate-400 mt-1">Auteur : {author}</div>
        <div className="text-[10px] text-teal-400 font-medium mt-2">Sujet : {subject}</div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        disabled={downloading}
        onClick={handleDownload}
        className="w-full mt-2"
      >
        {downloading ? 'Téléchargement...' : 'Télécharger'}
      </Button>
    </Card>
  );
}

export default DocumentCard;
