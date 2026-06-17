import React from 'react';
import { I18nProvider } from '@/components/layout/I18nContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <I18nProvider locale={locale}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-brand-primary">
          {children}
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
export const metadata = {
  title: 'ARTSM Academy',
  description: 'Académie Régionale des Sciences et Technologies',
};
