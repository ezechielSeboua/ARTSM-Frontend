'use client';

import React, { createContext, useContext } from 'react';
import { Dictionary, getDictionary } from '@/lib/i18n';

const I18nContext = createContext<{
  dict: Dictionary;
  locale: string;
} | null>(null);

export function I18nProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const dict = getDictionary(locale);
  return (
    <I18nContext.Provider value={{ dict, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
