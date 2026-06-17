'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../layout/I18nContext';
import Button from '../ui/Button';

export function CTASection() {
  const { dict, locale } = useTranslation();

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 via-sky-950/20 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-40 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-900/30 border border-slate-805 rounded-3xl p-12 glass">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Prêt à façonner votre avenir ?
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Les inscriptions pour l\'année académique 2026-2027 sont ouvertes. Remplissez notre formulaire d\'admission en ligne et prenez en main votre avenir professionnel.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`/${locale}/inscription`}>
            <Button variant="primary" size="lg">
              {dict.hero.ctaRegister}
            </Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button variant="outline" size="lg">
              Contacter l\'académie
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
