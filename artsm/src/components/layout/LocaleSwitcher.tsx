'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from './I18nContext';

export function LocaleSwitcher() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = (newLocale: string) => {
    if (newLocale === locale) return;
    
    const segments = pathname.split('/');
    // pathname starts with a slash, so segments[0] is empty, segments[1] is the locale
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 border border-slate-800/80 rounded-lg p-1 bg-slate-950/40 text-xs font-semibold">
      <button
        onClick={() => handleSwitch('fr')}
        className={`px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
          locale === 'fr' 
            ? 'bg-teal-600 text-white shadow-sm' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => handleSwitch('en')}
        className={`px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
          locale === 'en' 
            ? 'bg-teal-600 text-white shadow-sm' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        EN
      </button>
    </div>
  );
}

export default LocaleSwitcher;
