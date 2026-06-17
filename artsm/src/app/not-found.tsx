'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-200">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md p-8 bg-slate-900/40 border border-slate-800 rounded-3xl glass flex flex-col items-center gap-5">
        <span className="text-8xl">⚓</span>
        <h1 className="text-6xl font-black text-white">404</h1>
        <h2 className="text-xl font-bold text-white font-semibold">Page Non Trouvée</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Désolé, la page que vous recherchez n\'existe pas ou a été déplacée.
        </p>
        <Link href="/fr" className="w-full">
          <Button variant="primary" className="w-full py-3 border-none">
            Retourner à l\'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
