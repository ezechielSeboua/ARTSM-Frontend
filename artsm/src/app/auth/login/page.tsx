'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      router.push('/fr/espace-etudiant');
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Background radial effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <Card glass className="relative z-10 w-full max-w-md p-8 border border-slate-800">
        <div className="text-center mb-8">
          <span className="font-extrabold text-3xl text-gradient tracking-wider">ARTSM</span>
          <h2 className="text-xl font-bold text-white mt-4 font-semibold">Connexion Espace Étudiant</h2>
          <p className="text-xs text-slate-500 mt-1">Saisissez vos identifiants académiques pour continuer.</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs mb-4 text-left font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">Adresse Email</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: seydou.keita@artsm-edu.net"
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-455">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
            />
          </div>

          <Button type="submit" variant="primary" disabled={loading} className="py-3 mt-4 w-full border-none">
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-[10px] text-slate-500 leading-relaxed mt-4 flex flex-col gap-1.5">
            <span className="font-bold text-slate-400">💡 Astuces de démo :</span>
            <span>Entrez l\'adresse email <span className="font-bold text-teal-400 select-all">student</span> ou <span className="font-bold text-teal-400 select-all">keita</span> pour charger le dossier d\'étude de Seydou Keïta avec notes et emploi du temps.</span>
            <span>N\'importe quel mot de passe simulera la connexion.</span>
          </div>
        </form>
      </Card>
    </div>
  );
}
