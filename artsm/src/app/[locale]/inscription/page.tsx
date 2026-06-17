'use client';

import React from 'react';
import InscriptionForm from '@/components/forms/InscriptionForm';

export default function InscriptionPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Candidature & Inscription en Ligne
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Suivez les étapes pour soumettre vos informations personnelles, choisir votre cursus de formation, déposer vos documents et régler vos frais d\'étude de dossier de candidature.
        </p>
      </div>

      <InscriptionForm />
    </div>
  );
}
