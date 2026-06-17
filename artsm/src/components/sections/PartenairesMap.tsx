'use client';

import React, { useState } from 'react';
import { mockPartners } from '@/lib/api';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export function PartenairesMap() {
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'industrial' | 'maritime'>('all');

  const filteredPartners = mockPartners.filter(
    (partner) => activeTab === 'all' || partner.type === activeTab
  );

  return (
    <section className="py-16 bg-slate-950/10 border-t border-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Notre Réseau Global de Partenaires
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            ARTSM collabore avec des universités prestigieuses et des leaders industriels mondiaux pour offrir des opportunités de stages et de double diplômes.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(['all', 'academic', 'industrial', 'maritime'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-900/20'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'all' ? 'Tous' : tab === 'academic' ? 'Universités' : tab === 'industrial' ? 'Industriels' : 'Maritimes'}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} glass className="flex flex-col items-center justify-between text-center p-6 gap-4 border border-slate-800">
              <div className="text-4xl p-4 bg-slate-900 rounded-full w-20 h-20 flex items-center justify-center border border-slate-800">
                {partner.logo}
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">{partner.name}</h4>
                <div className="text-xs text-teal-400 font-medium mb-3">{partner.country}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{partner.description}</p>
              </div>
              <Badge variant={partner.type === 'academic' ? 'primary' : partner.type === 'maritime' ? 'info' : 'success'}>
                {partner.type}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartenairesMap;
