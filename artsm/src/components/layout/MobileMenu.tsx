'use client';

import React from 'react';
import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Box */}
      <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-slate-950 border-l border-slate-900 p-6 flex flex-col shadow-2xl z-10">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
          <span className="font-extrabold text-xl text-gradient">ARTSM</span>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className="text-base font-medium text-slate-300 hover:text-teal-400 transition-colors py-2 border-b border-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-900 pt-6 mt-6 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-400">Langue</span>
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
