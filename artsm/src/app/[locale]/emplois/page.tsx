'use client';

import React, { useState } from 'react';
import { mockJobs, JobOffer } from '@/lib/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function EmploisPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [applied, setApplied] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === 'all' || job.type === selectedType;

    return matchesSearch && matchesType;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

  const handleClose = () => {
    setSelectedJob(null);
    setApplied(false);
    setCvUploaded(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left animate-in fade-in duration-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Espace Recrutement & Carrières
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Rejoignez une équipe de passionnés engagés pour l\'avenir de l\'éducation en Afrique. Découvrez nos opportunités et postulez en ligne.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/30 border border-slate-800 p-4 rounded-2xl mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un poste, un département..."
          className="w-full md:max-w-xs px-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-500"
        />

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
          {['all', 'CDI', 'CDD', 'Stage'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedType === type
                  ? 'bg-teal-650 border-teal-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'Tous' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs list */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          Aucun poste ne correspond à votre recherche actuellement.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredJobs.map((job) => (
            <Card key={job.id} glass className="flex flex-col h-full justify-between border border-slate-800">
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-lg font-bold text-white hover:text-teal-400 transition-colors">
                    {job.title}
                  </h3>
                  <Badge variant={job.type === 'CDI' ? 'success' : job.type === 'CDD' ? 'warning' : 'info'}>
                    {job.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold mb-4">
                  <span>🏢 {job.department}</span>
                  <span>📍 {job.location}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {job.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-505 uppercase tracking-wider mb-2">Profil recherché :</h4>
                  <ul className="text-xs text-slate-400 flex flex-col gap-1.5">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-500 mt-0.5">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button variant="primary" size="sm" onClick={() => setSelectedJob(job)} className="w-full mt-4">
                Postuler en ligne
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Form modal */}
      <Modal isOpen={!!selectedJob} onClose={handleClose} title={`Postuler : ${selectedJob?.title}`}>
        {applied ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <span className="text-5xl text-emerald-500 animate-bounce">🎉</span>
            <h4 className="text-lg font-bold text-white">Candidature reçue !</h4>
            <p className="text-sm text-slate-400">
              Merci pour l\'intérêt porté à l\'ARTSM. Notre service des ressources humaines examinera votre profil.
            </p>
            <Button variant="secondary" onClick={handleClose} className="mt-4 w-full">
              Fermer
            </Button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex flex-col gap-4 py-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 font-medium">Nom Complet</label>
                <input
                  type="text"
                  required
                  placeholder="Seydou Keïta"
                  className="w-full px-4 py-2 mt-1 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 font-medium">Adresse Email</label>
                <input
                  type="email"
                  required
                  placeholder="seydou@gmail.com"
                  className="w-full px-4 py-2 mt-1 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 font-medium">Déposer votre CV (PDF)</span>
              <label className="flex items-center gap-3 bg-slate-900 border border-dashed border-slate-800 p-4 rounded-xl cursor-pointer hover:border-teal-500/50 mt-1">
                <span className="text-2xl">📄</span>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 font-semibold">{cvUploaded ? 'CV-Seydou-Keita.pdf' : 'Parcourir les fichiers...'}</div>
                  <div className="text-[10px] text-slate-500">Format PDF inférieur à 5 Mo</div>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={() => setCvUploaded(true)}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 font-medium">Lettre de motivation</label>
              <textarea
                rows={4}
                required
                placeholder="Expliquez brièvement pourquoi vous souhaitez rejoindre notre académie..."
                className="w-full px-4 py-2 mt-1 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white resize-none"
              />
            </div>

            <Button type="submit" variant="primary" className="py-2.5 w-full mt-2">
              Envoyer ma candidature
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
