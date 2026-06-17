'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from './I18nContext';
import LocaleSwitcher from './LocaleSwitcher';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';

export function Header() {
  const { dict, locale } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: dict.nav.about, href: `/${locale}/a-propos` },
    { label: dict.nav.schools, href: `/${locale}/ecoles` },
    { label: dict.nav.courses, href: `/${locale}/formations` },
    { label: dict.nav.news, href: `/${locale}/actualites` },
    { label: dict.nav.library, href: `/${locale}/bibliotheque` },
    { label: dict.nav.partners, href: `/${locale}/partenaires` },
    { label: dict.nav.jobs, href: `/${locale}/emplois` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-30 w-full glass border-b border-slate-900 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-extrabold text-2xl text-gradient tracking-wider">ARTSM</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-teal-400 ${
                  isActive ? 'text-teal-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <LocaleSwitcher />
          
          <Link href={`/${locale}/espace-etudiant`}>
            <Button variant="outline" size="sm">
              {dict.nav.studentSpace}
            </Button>
          </Link>

          <Link href={`/${locale}/inscription`}>
            <Button variant="primary" size="sm">
              {dict.nav.register}
            </Button>
          </Link>
        </div>

        {/* Burger Button */}
        <div className="flex items-center lg:hidden gap-3">
          <LocaleSwitcher />
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-900 focus:outline-none cursor-pointer"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        menuItems={[
          { label: dict.nav.home, href: `/${locale}` },
          ...menuItems,
          { label: dict.nav.studentSpace, href: `/${locale}/espace-etudiant` },
          { label: dict.nav.register, href: `/${locale}/inscription` },
        ]}
      />
    </header>
  );
}

export default Header;
