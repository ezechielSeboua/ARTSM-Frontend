'use client';

import React from 'react';
import useAuth from '@/hooks/useAuth';
import DashboardStats from '@/components/dashboard/DashboardStats';

export default function EspaceEtudiantOverviewPage() {
  const { user } = useAuth();

  if (!user) return null;

  return <DashboardStats user={user} />;
}
