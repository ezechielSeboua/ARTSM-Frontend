'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from './I18nContext';
import NewsletterForm from '../forms/NewsletterForm';

export function Footer() {
  const { dict, locale } = useTranslation();

  return (
    <footer className="bg-slate-950 border-t border-slate-900/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Info Column */}
        <div className="flex flex-col gap-4">
          <span className="font-extrabold text-2xl text-gradient tracking-wider">ARTSM</span>
          <p className="text-sm text-slate-400 leading-relaxed">
            {dict.footer.description}
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
            {dict.footer.quickLinks}
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href={`/${locale}/a-propos`} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/ecoles`} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                {dict.nav.schools}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/formations`} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                {dict.nav.courses}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/actualites`} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                {dict.nav.news}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/emplois`} className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                {dict.nav.jobs}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
            {dict.footer.contact}
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span>📍</span>
              <span>Campus Principal, Yopougon, Abidjan</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <span>contact@artsm-edu.net</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>+225 27 23 45 67 89</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <NewsletterForm />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <span>&copy; {new Date().getFullYear()} ARTSM. {dict.footer.rights}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Mentions Légales</a>
          <a href="#" className="hover:text-slate-300">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
