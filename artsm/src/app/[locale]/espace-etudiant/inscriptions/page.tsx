'use client';

import React from 'react';
import useAuth from '@/hooks/useAuth';
import Badge from '@/components/ui/Badge';

export default function StudentGradesPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 text-left w-full animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-white mb-1 font-semibold">Notes & Bulletins</h2>
        <p className="text-xs text-slate-400 font-medium font-medium">Consultez vos relevés par matière pour le semestre en cours.</p>
      </div>

      <div className="bg-slate-950/20 border border-slate-900 rounded-2xl p-6 w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-900 text-slate-400 font-semibold">
                <th className="py-3 px-4">Matière</th>
                <th className="py-3 px-4">Semestre</th>
                <th className="py-3 px-4">Coefficient</th>
                <th className="py-3 px-4">Note obtenue</th>
                <th className="py-3 px-4">Mention</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {user.grades?.map((g, idx) => (
                <tr key={idx} className="border-b border-slate-900/60 hover:bg-slate-900/10 transition-colors">
                  <td className="py-3 px-4 text-white font-bold">{g.subject}</td>
                  <td className="py-3 px-4 text-slate-400">Semestre {g.semester}</td>
                  <td className="py-3 px-4">{g.coefficient}</td>
                  <td className={`py-3 px-4 font-black ${g.grade >= 14 ? 'text-emerald-400' : g.grade >= 10 ? 'text-teal-400' : 'text-rose-400'}`}>
                    {g.grade.toFixed(1)} / 20
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={g.grade >= 16 ? 'success' : g.grade >= 14 ? 'primary' : g.grade >= 10 ? 'info' : 'danger'}>
                      {g.grade >= 16 ? 'Très Bien' : g.grade >= 14 ? 'Bien' : g.grade >= 10 ? 'Assez Bien' : 'Insuffisant'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
