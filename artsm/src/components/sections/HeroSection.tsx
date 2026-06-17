'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../layout/I18nContext';
import Button from '../ui/Button';

export function HeroSection() {
  const { dict, locale } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
      {/* Background radial effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-xs font-semibold mb-6 animate-pulse">
            ✨ Académie de Prestige & d'Innovation
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {dict.hero.title}
          </h1>
          
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mb-8">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/inscription`}>
              <Button variant="primary" size="lg">
                {dict.hero.ctaRegister}
              </Button>
            </Link>
            <Link href={`/${locale}/formations`}>
              <Button variant="outline" size="lg">
                {dict.hero.ctaExplore}
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Widget */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-slate-950/40 border border-slate-800 shadow-2xl p-6 glass-light animate-float overflow-hidden flex flex-col justify-between">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />
            
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-bold text-slate-500 tracking-wider">ARTSM ACADEMY</span>
              <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
            </div>

            <div className="flex flex-col gap-3 my-auto z-10">
              <div className="flex items-center gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-[10px] text-slate-450 uppercase tracking-wider">Moyenne Générale</div>
                  <div className="text-sm font-semibold text-white">16.2 / 20</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-2xl">💻</span>
                <div>
                  <div className="text-[10px] text-slate-450 uppercase tracking-wider">Sujet Actuel</div>
                  <div className="text-sm font-semibold text-teal-400">Cybersecurity & AI Lab</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center z-10 text-xs text-slate-500">
              <span>Campus Yopougon</span>
              <span>Seydou Keïta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
