'use client';

import React from 'react';
import { User } from '@/types/user';

interface SidebarProps {
  user: User;
  activeTab: 'overview' | 'grades' | 'library';
  setActiveTab: (tab: 'overview' | 'grades' | 'library') => void;
  onLogout: () => void;
}

export function Sidebar({ user, activeTab, setActiveTab, onLogout }: SidebarProps) {
  return (
    <div className="w-full lg:w-64 bg-slate-950 border-r border-slate-900/60 flex flex-col p-6 gap-6 h-full min-h-[500px]">
      {/* Profile summary */}
      <div className="flex items-center gap-3 border-b border-slate-900 pb-6">
        <span className="text-4xl p-2 bg-slate-900/60 rounded-full">{user.avatar || '👨‍🎓'}</span>
        <div className="text-left">
          <div className="text-sm font-bold text-white leading-tight">{user.name}</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{user.matricule}</div>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex flex-col gap-2 flex-1">
        {[
          { id: 'overview' as const, label: 'Tableau de bord', icon: '📊' },
          { id: 'grades' as const, label: 'Notes & Bulletins', icon: '📝' },
          { id: 'library' as const, label: 'Bibliothèque', icon: '📚' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
              activeTab === tab.id
                ? 'bg-teal-600 text-white shadow-md shadow-teal-900/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-450 hover:text-rose-400 hover:bg-rose-500/5 transition-all text-left mt-auto cursor-pointer"
      >
        <span>🚪</span>
        <span>Déconnexion</span>
      </button>
    </div>
  );
}

export default Sidebar;
