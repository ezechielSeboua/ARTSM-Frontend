'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { mockEcoles, mockFormations } from '@/lib/api';
import StripeButton from '../payment/StripeButton';
import CinetPayButton from '../payment/CinetPayButton';

export function InscriptionForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    ecoleId: '',
    formationId: '',
    cvFile: null as string | null,
    notesFile: null as string | null,
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (name: 'cvFile' | 'notesFile', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, [name]: e.target.files![0].name }));
    }
  };

  const selectedEcole = mockEcoles.find((e) => e.id === formData.ecoleId);
  const selectedFormation = mockFormations.find((f) => f.id === formData.formationId);

  return (
    <Card glass className="w-full max-w-2xl mx-auto p-6 md:p-8">
      {/* Wizard Steps indicator */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step >= s ? 'bg-teal-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-800'
            }`}>
              {s}
            </span>
            <span className={`hidden sm:inline text-xs font-semibold ${
              step === s ? 'text-teal-400' : 'text-slate-505'
            }`}>
              {s === 1 ? 'Identité' : s === 2 ? 'Cursus' : s === 3 ? 'Dossier' : 'Paiement'}
            </span>
          </div>
        ))}
      </div>

      {paymentSuccess ? (
        <div className="flex flex-col items-center text-center py-10 gap-4">
          <span className="text-6xl">🎉</span>
          <h3 className="text-2xl font-bold text-white">Candidature Transmise !</h3>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed">
            Votre dossier d\'inscription pour le programme <span className="text-teal-400 font-semibold">{selectedFormation?.title}</span> a été validé et payé avec succès. Notre service pédagogique vous contactera sous peu.
          </p>
          <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 text-xs text-left text-slate-405 mt-2 flex flex-col gap-2">
            <div><span className="font-semibold text-slate-300">Candidat:</span> {formData.prenom} {formData.nom}</div>
            <div><span className="font-semibold text-slate-300">Email:</span> {formData.email}</div>
            <div><span className="font-semibold text-slate-300">École choisie:</span> {selectedEcole?.name}</div>
            <div><span className="font-semibold text-slate-300">Frais d\'inscription:</span> 25 000 FCFA</div>
            <div><span className="font-semibold text-slate-300">Numéro de reçu:</span> REC-{Math.floor(100000 + Math.random() * 900000)}</div>
          </div>
        </div>
      ) : (
        <div>
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white text-left">Informations Personnelles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-400">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Ex: Keïta"
                    className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-400">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    placeholder="Ex: Seydou"
                    className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-slate-400">Adresse Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ex: seydou@gmail.com"
                  className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-slate-400 font-medium">Numéro de Téléphone</label>
                <input
                  type="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleInputChange}
                  placeholder="Ex: +225 07 00 00 00"
                  className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>
          )}

          {/* Step 2: Cursus Selection */}
          {step === 2 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white text-left">Choix du Cursus</h3>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-slate-400 font-medium">Sélectionner une école du groupe ARTSM</label>
                <select
                  name="ecoleId"
                  value={formData.ecoleId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none"
                >
                  <option value="">Choisir...</option>
                  {mockEcoles.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.shortName})
                    </option>
                  ))}
                </select>
              </div>

              {formData.ecoleId && (
                <div className="flex flex-col gap-1.5 text-left animate-in fade-in duration-200">
                  <label className="text-xs font-semibold text-slate-400">Sélectionner votre formation</label>
                  <select
                    name="formationId"
                    value={formData.formationId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none"
                  >
                    <option value="">Choisir...</option>
                    {mockFormations
                      .filter((f) => f.ecoleId === formData.ecoleId)
                      .map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.title} ({f.level})
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Document Upload */}
          {step === 3 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white text-left">Téléversement de Documents</h3>
              <p className="text-xs text-slate-400 text-left mb-2">Veuillez joindre des fichiers PDF de taille inférieure à 5 Mo.</p>
              
              <div className="flex flex-col gap-2 text-left">
                <span className="text-xs font-semibold text-slate-400">Curriculum Vitae (CV)</span>
                <label className="flex items-center gap-3 bg-slate-900 border border-dashed border-slate-800 p-4 rounded-xl cursor-pointer hover:border-teal-500/50 transition-colors">
                  <span className="text-2xl">📄</span>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 font-semibold">{formData.cvFile || 'Parcourir les fichiers...'}</div>
                    <div className="text-[10px] text-slate-500">Format PDF uniquement</div>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload('cvFile', e)}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2 text-left mt-2">
                <span className="text-xs font-semibold text-slate-400">Bulletins de Notes / Diplôme</span>
                <label className="flex items-center gap-3 bg-slate-900 border border-dashed border-slate-800 p-4 rounded-xl cursor-pointer hover:border-teal-500/50 transition-colors">
                  <span className="text-2xl">🎓</span>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 font-semibold">{formData.notesFile || 'Parcourir les fichiers...'}</div>
                    <div className="text-[10px] text-slate-500">Format PDF uniquement</div>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload('notesFile', e)}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Overview & Payment */}
          {step === 4 && (
            <div className="flex flex-col gap-6 text-left animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white">Récapitulatif & Paiement</h3>
              
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex flex-col gap-2.5 text-xs text-slate-400">
                <div className="border-b border-slate-800 pb-2 mb-2 flex justify-between items-center text-sm">
                  <span className="font-bold text-white">Détails de l\'admission</span>
                  <Badge variant="primary">Frais d\'étude : 25 000 FCFA</Badge>
                </div>
                <div><span className="font-semibold text-slate-300">Candidat :</span> {formData.prenom} {formData.nom}</div>
                <div><span className="font-semibold text-slate-300">Contact :</span> {formData.email} | {formData.tel}</div>
                <div><span className="font-semibold text-slate-300">École :</span> {selectedEcole?.name}</div>
                <div><span className="font-semibold text-slate-300">Formation :</span> {selectedFormation?.title} ({selectedFormation?.duration})</div>
                <div><span className="font-semibold text-slate-300">Documents :</span> CV: {formData.cvFile ? '✓' : '✖'}, Diplômes: {formData.notesFile ? '✓' : '✖'}</div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-slate-400 text-center">Régler les frais de dossier pour finaliser</span>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <StripeButton
                    amount={25000}
                    currency="FCFA"
                    purpose={`Frais de dossier - ${formData.prenom} ${formData.nom}`}
                    onSuccess={() => setPaymentSuccess(true)}
                  />
                  <CinetPayButton
                    amount={25000}
                    currency="FCFA"
                    purpose={`Frais de dossier - ${formData.prenom} ${formData.nom}`}
                    onSuccess={() => setPaymentSuccess(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 border-t border-slate-900 pt-6">
            <Button
              variant="outline"
              disabled={step === 1}
              onClick={prevStep}
            >
              Précédent
            </Button>

            {step < 4 ? (
              <Button
                variant="primary"
                disabled={
                  (step === 1 && (!formData.nom || !formData.prenom || !formData.email || !formData.tel)) ||
                  (step === 2 && (!formData.ecoleId || !formData.formationId)) ||
                  (step === 3 && (!formData.cvFile || !formData.notesFile))
                }
                onClick={nextStep}
              >
                Suivant
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </Card>
  );
}

export default InscriptionForm;
