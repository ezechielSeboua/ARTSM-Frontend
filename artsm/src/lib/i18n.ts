import fr from '@/i18n/fr.json';
import en from '@/i18n/en.json';

export type Locale = 'fr' | 'en';

export const dictionaries = {
  fr,
  en,
};

export type Dictionary = typeof fr;

export function getDictionary(locale: string): Dictionary {
  const activeLocale = locale === 'en' ? 'en' : 'fr';
  return dictionaries[activeLocale];
}
