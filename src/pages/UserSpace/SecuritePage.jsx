import { useState } from 'react';
import useUserStore from '../../stores/useUserStore';

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors';

const SecuritePage = () => {
  const { changePassword, loading, error, clearError } = useUserStore();
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const set = (k, v) => {
    if (error) clearError();
    setValidationError('');
    setSuccess(false);
    setForm(p => ({ ...p, [k]: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm_password) {
      setValidationError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (form.new_password.length < 8) {
      setValidationError('Le mot de passe doit comporter au moins 8 caractères.');
      return;
    }
    const ok = await changePassword(form.current_password, form.new_password, form.confirm_password);
    if (ok) {
      setSuccess(true);
      setForm({ current_password: '', new_password: '', confirm_password: '' });
    }
  };

  const errMsg = validationError || (error
    ? typeof error === 'string' ? error : error.detail || error.current_password?.[0] || error.new_password?.[0] || JSON.stringify(error)
    : null);

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-950">Sécurité</h1>
        <p className="text-sm text-slate-500 mt-1">Changez votre mot de passe pour sécuriser votre compte.</p>
      </div>

      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold">
          <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          Mot de passe changé avec succès.
        </div>
      )}

      {errMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">{errMsg}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Modifier le mot de passe</p>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Mot de passe actuel *</label>
          <input
            type="password"
            required
            value={form.current_password}
            onChange={e => set('current_password', e.target.value)}
            className={inputCls}
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Nouveau mot de passe *</label>
          <input
            type="password"
            required
            value={form.new_password}
            onChange={e => set('new_password', e.target.value)}
            className={inputCls}
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Confirmer le nouveau mot de passe *</label>
          <input
            type="password"
            required
            value={form.confirm_password}
            onChange={e => set('confirm_password', e.target.value)}
            className={inputCls}
            placeholder="••••••••"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white font-bold rounded-2xl transition-colors"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Changer le mot de passe
          </button>
        </div>
      </form>

      <div className="bg-slate-100 rounded-2xl p-4 text-xs text-slate-500 space-y-1">
        <p className="font-bold text-slate-600 text-xs uppercase tracking-wide mb-2">Conseils de sécurité</p>
        <p>• Utilisez au moins 8 caractères</p>
        <p>• Combinez lettres, chiffres et symboles</p>
        <p>• N'utilisez pas le même mot de passe sur d'autres sites</p>
      </div>
    </div>
  );
};

export default SecuritePage;
