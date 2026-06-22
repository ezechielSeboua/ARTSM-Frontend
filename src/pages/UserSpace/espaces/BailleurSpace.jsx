import { useState } from 'react';
import useUserStore from '../../../stores/useUserStore';
import {
  ORG_TYPES, ORG_TYPES_MAP, inputCls, selectCls,
  Field, SaveBtn, CommonFields, SuccessBanner, ErrorBanner,
  AvatarEditor, SecuriteTab,
} from './shared';

const TABS = [
  {
    id: 'profil',
    label: 'Mon profil',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  {
    id: 'securite',
    label: 'Sécurité',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
];

const ProfilTab = () => {
  const { user, updateProfile, loading, error, clearError } = useUserStore();
  const [success, setSuccess] = useState(false);

  const p = user?.institutional_profile || {};

  const [base, setBase] = useState(() => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
  }));

  const [profile, setProfile] = useState(() => ({
    organization_name: p.organization_name || '',
    position: p.position || '',
    organization_type: p.organization_type || '',
    country: p.country || '',
  }));

  if (!user) return null;

  const setP = (k, v) => { if (error) clearError(); setSuccess(false); setProfile(prev => ({ ...prev, [k]: v })); };

  const handleAvatarUpload = async (file) => {
    const fd = new FormData();
    fd.append('avatar', file);
    await updateProfile(fd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) clearError();
    setSuccess(false);
    const { ok } = await updateProfile({
      first_name: base.first_name,
      last_name: base.last_name,
      phone: base.phone,
      profile: {
        organization_name: profile.organization_name || undefined,
        position: profile.position || undefined,
        organization_type: profile.organization_type || undefined,
        country: profile.country || undefined,
      },
    });
    if (ok) setSuccess(true);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Identité</p>

        <div className="flex items-center gap-5 mb-6">
          <AvatarEditor
            user={user}
            onUpload={handleAvatarUpload}
            bgCls="bg-purple-100"
            spinnerCls="border-purple-900/20 border-t-purple-700"
            textCls="text-purple-700"
            btnCls="bg-purple-800 hover:bg-purple-700"
          />
          <div className="flex-1 min-w-0">
            <p className="text-lg font-black text-slate-900 truncate">{user.first_name} {user.last_name}</p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
            {(p.position || p.organization_name) && (
              <p className="text-sm font-semibold text-purple-700 mt-0.5 truncate">
                {p.position}{p.position && p.organization_name ? ' · ' : ''}{p.organization_name}
              </p>
            )}
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full
                ${user.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {user.is_active ? 'Compte actif' : 'En attente de validation'}
              </span>
              {p.organization_type && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  {ORG_TYPES_MAP[p.organization_type] || p.organization_type}
                </span>
              )}
            </div>
          </div>
        </div>

        {success && <div className="mb-4"><SuccessBanner /></div>}
        {error && <div className="mb-4"><ErrorBanner error={error} /></div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-t border-slate-100 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Informations personnelles</p>
            <CommonFields base={base} setBase={fn => { clearError(); setSuccess(false); setBase(fn); }} />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Informations de l'organisation</p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Organisation">
                  <input type="text" value={profile.organization_name} onChange={e => setP('organization_name', e.target.value)}
                    className={inputCls} placeholder="Nom de l'organisation" />
                </Field>
                <Field label="Position">
                  <input type="text" value={profile.position} onChange={e => setP('position', e.target.value)}
                    className={inputCls} placeholder="Directeur, Chargé de programme..." />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Type d'organisation">
                  <select value={profile.organization_type} onChange={e => setP('organization_type', e.target.value)} className={selectCls}>
                    <option value="">— Sélectionnez —</option>
                    {ORG_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </Field>
                <Field label="Pays">
                  <input type="text" value={profile.country} onChange={e => setP('country', e.target.value)}
                    className={inputCls} placeholder="ex: France" />
                </Field>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <SaveBtn loading={loading} label="Enregistrer les modifications" />
          </div>
        </form>
      </div>
    </div>
  );
};

const BailleurSpace = () => {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState('profil');

  if (!user) return null;

  const p = user.institutional_profile || {};

  return (
    <div className="space-y-6">
      <div className="bg-blue-950 rounded-3xl px-6 pt-6 pb-0 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">Espace Bailleur</span>
          <h1 className="text-2xl font-black tracking-tight mt-0.5">{user.first_name} {user.last_name}</h1>
          {(p.position || p.organization_name) && (
            <p className="text-purple-200 text-sm font-semibold mt-1">
              {p.position}{p.position && p.organization_name ? ' · ' : ''}{p.organization_name}
            </p>
          )}
        </div>

        <div className="relative z-10 flex gap-1 overflow-x-auto pb-0 no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold whitespace-nowrap rounded-t-xl transition-colors
                ${activeTab === tab.id ? 'bg-slate-50 text-purple-950' : 'text-purple-200 hover:text-white hover:bg-white/10'}`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'profil'   && <ProfilTab />}
      {activeTab === 'securite' && <SecuriteTab />}
    </div>
  );
};

export default BailleurSpace;
