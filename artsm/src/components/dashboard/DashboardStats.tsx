'use client';

import React from 'react';
import { User } from '@/types/user';
import Card from '../ui/Card';

interface DashboardStatsProps {
  user: User;
}

export function DashboardStats({ user }: DashboardStatsProps) {
  const grades = user.grades || [];
  const gpa = grades.length > 0
    ? (grades.reduce((sum, g) => sum + g.grade * g.coefficient, 0) / 
       grades.reduce((sum, g) => sum + g.coefficient, 0)).toFixed(2)
    : 'N/A';

  return (
    <div className="flex flex-col gap-8 text-left w-full">
      {/* Welcome header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Ravi de vous revoir, {user.name.split(' ')[0]} 👋
        </h2>
        <p className="text-sm text-slate-400">
          Voici le récapitulatif de votre progression pour l\'année académique en cours.
        </p>
      </div>

      {/* Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card glass className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Moyenne Générale</span>
          <span className="text-3xl font-black text-teal-400 mt-1">{gpa} / 20</span>
          <span className="text-[10px] text-slate-400 mt-1">Excellent travail, maintenez vos efforts.</span>
        </Card>
        
        <Card glass className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filière & Promotion</span>
          <span className="text-sm font-bold text-white mt-2 leading-relaxed">{user.cohort}</span>
          <span className="text-[10px] text-slate-500 mt-1">Campus Principal</span>
        </Card>

        <Card glass className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assiduité</span>
          <span className="text-3xl font-black text-amber-500 mt-1">98.5%</span>
          <span className="text-[10px] text-slate-400 mt-1">2 heures d\'absence justifiées.</span>
        </Card>
      </div>

      {/* Schedule Table */}
      <div className="bg-slate-950/20 border border-slate-900 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>📅</span> Emploi du Temps de la Semaine
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-900 text-slate-400 font-semibold">
                <th className="py-3 px-4">Jour</th>
                <th className="py-3 px-4">Horaire</th>
                <th className="py-3 px-4">Matière</th>
                <th className="py-3 px-4">Salle</th>
                <th className="py-3 px-4">Enseignant</th>
              </tr>
            </thead>
            <tbody className="text-slate-350">
              {user.timetable?.map((item, index) => (
                <tr key={index} className="border-b border-slate-900/60 hover:bg-slate-900/10 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400">{item.day}</td>
                  <td className="py-3 px-4 font-medium text-slate-400">{item.time}</td>
                  <td className="py-3 px-4 text-white font-semibold">{item.subject}</td>
                  <td className="py-3 px-4 text-sm font-medium">{item.room}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{item.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
