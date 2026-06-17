'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function StudentMediathequePage() {
  const videos = [
    { id: 1, title: 'Introduction à la Cybersécurité et Hacking Éthique', duration: '45 min', subject: 'Cybersécurité', instructor: 'Dr. Jean-Pierre Kouamé', icon: '🔒' },
    { id: 2, title: 'Développement d\'Applications Mobiles avec React Native', duration: '1h 15 min', subject: 'Génie Logiciel', instructor: 'Mme. Sarah Koné', icon: '📱' },
    { id: 3, title: 'Propulsion Navale et Maintenance des Machines Marines', duration: '58 min', subject: 'Génie Maritime', instructor: 'Cmdt. Marc Laurent', icon: '⚓' },
  ];

  return (
    <div className="flex flex-col gap-6 text-left w-full animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-white mb-1 font-semibold">Médiathèque & Cours Vidéo</h2>
        <p className="text-xs text-slate-400 font-medium">Visionnez les cours magistraux enregistrés et les webinaires de formation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {videos.map((vid) => (
          <Card key={vid.id} glass className="flex flex-col justify-between border border-slate-800 p-5 gap-4">
            <div className="flex items-start gap-4">
              <span className="text-4xl p-3 bg-slate-900/60 rounded-xl">{vid.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-white leading-snug font-semibold">{vid.title}</h4>
                <div className="text-[10px] text-slate-500 font-bold mt-1">Par : {vid.instructor}</div>
                <div className="flex gap-2 items-center mt-2">
                  <Badge variant="primary">{vid.subject}</Badge>
                  <span className="text-[10px] text-slate-400 font-semibold">⏱️ {vid.duration}</span>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => alert(`Lecture de la vidéo "${vid.title}"...`)}
              className="w-full mt-2"
            >
              Visionner la vidéo
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
