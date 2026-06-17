'use client';

import React from 'react';
import { useTranslation } from '../layout/I18nContext';
import Card from '../ui/Card';

export function StatsSection() {
  const { dict } = useTranslation();

  const stats = [
    { value: '1,500+', label: dict.stats.students, icon: '👨‍🎓' },
    { value: '94%', label: dict.stats.insertion, icon: '💼' },
    { value: '45+', label: dict.stats.partners, icon: '🌍' },
    { value: '25+', label: dict.stats.programs, icon: '📜' },
  ];

  return (
    <section className="py-12 bg-slate-950/20 border-y border-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} glass className="flex flex-col items-center text-center p-6 gap-1.5">
              <span className="text-3xl mb-1">{stat.icon}</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">
                {stat.label}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
