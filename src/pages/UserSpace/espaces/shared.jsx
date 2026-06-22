import { useState, useRef } from 'react';
import useUserStore from '../../../stores/useUserStore';

export const SECTORS = [
  { value: 'maritime', label: 'Armement Maritime' },
  { value: 'port', label: 'Portuaire & Logistique' },
  { value: 'offshore', label: 'Industrie Offshore' },
  { value: 'security', label: 'Sécurité Maritime' },
  { value: 'fishing', label: 'Pêche & Aquaculture' },
  { value: 'other', label: 'Autre' },
];

export const ORG_TYPES = [
  { value: 'ministry', label: 'Ministère / Institution Gouvernementale' },
  { value: 'multilateral', label: 'Organisation Multilatérale (ONU, OMI…)' },
  { value: 'ngo', label: 'ONG / Association' },
  { value: 'private', label: 'Fondation / Secteur Privé' },
  { value: 'other', label: 'Autre' },
];

export const ACADEMIC_TITLES = [
  { value: 'dr', label: 'Docteur (Dr)' },
  { value: 'prof', label: 'Professeur (Pr)' },
  { value: 'eng', label: 'Ingénieur' },
  { value: 'mr', label: 'M.' },
  { value: 'ms', label: 'Mme' },
];

export const YEARS = [
  { value: '1', label: '1ère année' },
  { value: '2', label: '2ème année' },
  { value: '3', label: '3ème année' },
  { value: '4', label: '4ème année' },
  { value: '5', label: '5ème année' },
];

export const SECTORS_MAP = Object.fromEntries(SECTORS.map(s => [s.value, s.label]));
export const ORG_TYPES_MAP = Object.fromEntries(ORG_TYPES.map(o => [o.value, o.label]));
export const ACADEMIC_TITLES_MAP = Object.fromEntries(ACADEMIC_TITLES.map(t => [t.value, t.label]));
export const YEARS_MAP = Object.fromEntries(YEARS.map(y => [y.value, y.label]));

export const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors';
export const selectCls = inputCls + ' cursor-pointer';

export const InfoRow = ({ label, value, isUrl }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest sm:w-36 shrink-0">{label}</span>
      {isUrl ? (
        <a href={value} target="_blank" rel="noopener noreferrer"
          className="text-sm font-semibold text-blue-700 hover:underline break-all">{value}</a>
      ) : (
        <span className="text-sm font-semibold text-slate-800">{value}</span>
      )}
    </div>
  );
};

export const Field = ({ label, required, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
      {label}{required && ' *'}
    </label>
    {children}
  </div>
);

export const SaveBtn = ({ loading, label = 'Enregistrer' }) => (
  <button type="submit" disabled={loading}
    className="flex items-center gap-2 px-5 py-2.5 bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-colors">
    {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
    {label}
  </button>
);

export const SuccessBanner = ({ message = 'Profil mis à jour avec succès.' }) => (
  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold">
    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
    {message}
  </div>
);

export const ErrorBanner = ({ error }) => {
  if (!error) return null;
  const msg = typeof error === 'string' ? error : error.detail || JSON.stringify(error);
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">{msg}</div>
  );
};

export const CommonFields = ({ base, setBase }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Prénom" required>
        <input type="text" required value={base.first_name}
          onChange={e => setBase(p => ({ ...p, first_name: e.target.value }))}
          className={inputCls} placeholder="Prénom" />
      </Field>
      <Field label="Nom" required>
        <input type="text" required value={base.last_name}
          onChange={e => setBase(p => ({ ...p, last_name: e.target.value }))}
          className={inputCls} placeholder="Nom de famille" />
      </Field>
    </div>
    <Field label="Téléphone">
      <input type="tel" value={base.phone}
        onChange={e => setBase(p => ({ ...p, phone: e.target.value }))}
        className={inputCls} placeholder="+2250700000000" />
    </Field>
  </>
);

// Avatar upload block — color props are full Tailwind class strings (no dynamic interpolation)
export const AvatarEditor = ({
  user,
  onUpload,
  bgCls = 'bg-blue-100',
  spinnerCls = 'border-blue-900/20 border-t-blue-700',
  textCls = 'text-blue-700',
  btnCls = 'bg-blue-800 hover:bg-blue-700',
}) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    await onUpload(file);
    setLoading(false);
    e.target.value = '';
  };

  return (
    <div className="relative shrink-0">
      <div className={`w-20 h-20 rounded-full overflow-hidden ${bgCls} flex items-center justify-center border-2 border-white shadow-md`}>
        {loading ? (
          <span className={`w-6 h-6 border-2 ${spinnerCls} rounded-full animate-spin`} />
        ) : user?.avatar ? (
          <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className={`text-xl font-black ${textCls}`}>{initials}</span>
        )}
      </div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`absolute -bottom-1 -right-1 p-1.5 ${btnCls} text-white rounded-full shadow-lg transition-colors`}
        title="Changer la photo"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
};

// Onglet sécurité partagé (même pour tous les rôles)
export const SecuriteTab = () => {
  const { changePassword, loading, error, clearError } = useUserStore();
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const setF = (k, v) => { clearError(); setValidationError(''); setSuccess(false); setForm(p => ({ ...p, [k]: v })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm_password) { setValidationError('Les mots de passe ne correspondent pas.'); return; }
    if (form.new_password.length < 8) { setValidationError('Le mot de passe doit comporter au moins 8 caractères.'); return; }
    const ok = await changePassword(form.current_password, form.new_password, form.confirm_password);
    if (ok) { setSuccess(true); setForm({ current_password: '', new_password: '', confirm_password: '' }); }
  };

  const errMsg = validationError || (error
    ? typeof error === 'string' ? error : error.detail || error.current_password?.[0] || error.new_password?.[0] || JSON.stringify(error)
    : null);

  return (
    <div className="max-w-md space-y-4">
      {success && <SuccessBanner message="Mot de passe changé avec succès." />}
      {errMsg && <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">{errMsg}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Modifier le mot de passe</p>
        {[
          { key: 'current_password', label: 'Mot de passe actuel' },
          { key: 'new_password', label: 'Nouveau mot de passe' },
          { key: 'confirm_password', label: 'Confirmer le nouveau mot de passe' },
        ].map(({ key, label }) => (
          <div key={key} className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label} *</label>
            <input type="password" required value={form[key]} onChange={e => setF(key, e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors"
              placeholder="••••••••" />
          </div>
        ))}
        <button type="submit" disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-colors mt-2">
          {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          Changer le mot de passe
        </button>
      </form>

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs text-slate-500 space-y-1">
        <p className="font-bold text-slate-600 text-xs uppercase tracking-wide mb-2">Conseils</p>
        <p>• Au moins 8 caractères</p>
        <p>• Combinez lettres, chiffres et symboles</p>
      </div>
    </div>
  );
};
