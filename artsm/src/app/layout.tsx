import React from 'react';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
export const metadata = {
  title: 'ARTSM Academy',
  description: 'Académie Régionale des Sciences et Technologies',
};
