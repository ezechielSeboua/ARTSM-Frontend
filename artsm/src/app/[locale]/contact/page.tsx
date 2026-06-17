'use client';

import React from 'react';
import ContactForm from '@/components/forms/ContactForm';
import Card from '@/components/ui/Card';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Contactez l\'ARTSM Academy
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Des questions sur nos filières, nos conditions d\'admission ou nos partenariats ? Notre équipe administrative est à votre écoute.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact info list */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card glass className="flex items-start gap-4">
            <span className="text-3xl p-3 bg-slate-900/60 rounded-xl">📍</span>
            <div>
              <h3 className="font-bold text-white mb-1">Notre Campus Principal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yopougon, Boulevard Lokoa Niangon, Abidjan, Côte d\'Ivoire
              </p>
            </div>
          </Card>
          
          <Card glass className="flex items-start gap-4">
            <span className="text-3xl p-3 bg-slate-900/60 rounded-xl">📞</span>
            <div>
              <h3 className="font-bold text-white mb-1">Téléphone</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standard : +225 27 23 45 67 89
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scolarité : +225 07 12 34 56 78
              </p>
            </div>
          </Card>

          <Card glass className="flex items-start gap-4">
            <span className="text-3xl p-3 bg-slate-900/60 rounded-xl">✉️</span>
            <div>
              <h3 className="font-bold text-white mb-1">Email</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Information : info@artsm-edu.net
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Secrétariat : contact@artsm-edu.net
              </p>
            </div>
          </Card>

          <Card glass className="flex items-start gap-4">
            <span className="text-3xl p-3 bg-slate-900/60 rounded-xl">🕒</span>
            <div>
              <h3 className="font-bold text-white mb-1">Horaires d\'ouverture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lundi - Vendredi : 08h00 - 12h00 / 14h00 - 17h00
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Samedi (Secrétariat uniquement) : 08h00 - 12h00
              </p>
            </div>
          </Card>
        </div>

        {/* Message form */}
        <div className="lg:col-span-7 bg-slate-900/30 border border-slate-805 rounded-2xl p-6 md:p-8 glass">
          <h2 className="text-xl font-bold text-white mb-6">Formulaire de Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
