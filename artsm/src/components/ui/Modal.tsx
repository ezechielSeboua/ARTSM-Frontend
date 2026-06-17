'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative glass w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-800 flex flex-col max-h-[90vh] z-10 animate-[float_0.3s_ease-out]">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto flex-1 pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
