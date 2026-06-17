'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Sidebar from '@/components/dashboard/Sidebar';
import { useTranslation } from '@/components/layout/I18nContext';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useTranslation();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/auth/login`);
    }
  }, [user, loading, router, locale]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px] text-slate-400">
        Chargement de l\'espace étudiant...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  let activeTab: 'overview' | 'grades' | 'library' = 'overview';
  if (pathname.includes('/documents')) {
    activeTab = 'library';
  } else if (pathname.includes('/inscriptions')) {
    activeTab = 'grades';
  }

  const handleTabChange = (tab: 'overview' | 'grades' | 'library') => {
    if (tab === 'overview') {
      router.push(`/${locale}/espace-etudiant`);
    } else if (tab === 'grades') {
      router.push(`/${locale}/espace-etudiant/inscriptions`);
    } else if (tab === 'library') {
      router.push(`/${locale}/espace-etudiant/documents`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8 bg-slate-900/10 border border-slate-900 rounded-3xl overflow-hidden glass min-h-[600px]">
        <Sidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          onLogout={logout}
        />
        <div className="flex-1 p-6 md:p-8 flex flex-col items-start min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
