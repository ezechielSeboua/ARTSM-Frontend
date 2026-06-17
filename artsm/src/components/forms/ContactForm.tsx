'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-2xl text-center flex flex-col gap-3">
          <span className="text-4xl">✉️</span>
          <h3 className="font-bold text-lg text-white font-semibold">Message envoyé avec succès !</h3>
          <p className="text-sm text-slate-400">
            Notre équipe vous recontactera sous 24 à 48 heures ouvrables.
          </p>
          <Button variant="secondary" size="sm" onClick={() => setStatus('idle')} className="mt-4 max-w-xs mx-auto">
            Envoyer un autre message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="name" className="text-xs font-semibold text-slate-450">Nom Complet</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={status === 'loading'}
                className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="email" className="text-xs font-semibold text-slate-455">Adresse Email</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={status === 'loading'}
                className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="subject" className="text-xs font-semibold text-slate-450">Sujet</label>
            <input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              disabled={status === 'loading'}
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="message" className="text-xs font-semibold text-slate-455">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={status === 'loading'}
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
            />
          </div>

          <Button type="submit" variant="primary" disabled={status === 'loading'} className="py-3 mt-2">
            {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
          </Button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
