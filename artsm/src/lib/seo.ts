import { Metadata } from 'next';

export function getSEOMetadata(
  title: string,
  description: string,
  locale: string = 'fr'
): Metadata {
  return {
    title: `${title} | ARTSM Academy`,
    description,
    alternates: {
      languages: {
        fr: `/fr`,
        en: `/en`,
      },
    },
    openGraph: {
      title: `${title} | ARTSM Academy`,
      description,
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      type: 'website',
      siteName: 'ARTSM Academy'
    },
  };
}
