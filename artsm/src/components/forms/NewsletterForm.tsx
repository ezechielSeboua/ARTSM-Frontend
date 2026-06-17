'use client';

import React, { useState } from 'react';
import { useTranslation } from '../layout/I18nContext';
import Button from '../ui/Button';

export function NewsletterForm() {
  const { dict } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
        {dict.newsletter.title}
      </h4>
      <p className="text-sm text-slate-400 mb-4 leading-relaxed">
        {dict.newsletter.subtitle}
      </p>

      {status === 'success' ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg text-sm">
          {dict.newsletter.success}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.newsletter.placeholder}
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={status === 'loading'}
            className="whitespace-nowrap"
          >
            {status === 'loading' ? dict.common.loading : dict.newsletter.button}
          </Button>
        </form>
      )}
    </div>
  );
}

export default NewsletterForm;
