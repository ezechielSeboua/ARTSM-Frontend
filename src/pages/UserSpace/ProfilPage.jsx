import { useState, useEffect } from 'react';
import useUserStore from '../../stores/useUserStore';
import useSchoolStore from '../../stores/useSchoolStore';

const SECTORS = [
  { value: 'maritime', label: 'Armement Maritime' },
  { value: 'port', label: 'Portuaire & Logistique' },
  { value: 'offshore', label: 'Industrie Offshore' },
  { value: 'security', label: 'Sécurité Maritime' },
  { value: 'fishing', label: 'Pêche & Aquaculture' },
  { value: 'other', label: 'Autre' },
];

const ORG_TYPES = [
  { value: 'ministry', label: 'Ministère / Institution Gouvernementale' },
  { value: 'multilateral', label: 'Organisation Multilatérale (ONU, OMI…)' },
  { value: 'ngo', label: 'ONG / Association' },
  { value: 'private', label: 'Fondation / Secteur Privé' },
  { value: 'other', label: 'Autre' },
];

const ACADEMIC_TITLES = [
  { value: 'dr', label: 'Docteur (Dr)' },
  { value: 'prof', label: 'Professeur (Pr)' },
  { value: 'eng', label: 'Ingénieur' },
  { value: 'mr', label: 'M.' },
  { value: 'ms', label: 'Mme' },
];

const YEARS = [
  { value: '1', label: '1ère année' },
  { value: '2', label: '2ème année' },
  { value: '3', label: '3ème année' },
  { value: '4', label: '4ème année' },
  { value: '5', label: '5ème année' },
];

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors';
const selectCls = inputCls + ' cursor-pointer';

const Field = ({ label, required, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
      {label}{required && ' *'}
    </label>
    {children}
  </div>
);

const getProfileData = (user) => {
  if (!user) return {};
  switch (user.role) {
    case 'student': return user.student_profile || {};
    case 'professional': return user.professional_profile || {};
    case 'recruiter': return user.institutional_profile || {};
    case 'researcher': return user.researcher_profile || {};
    case 'donor': return user.institutional_profile || {};
    default: return {};
  }
};

const ROLE_SECTION_TITLES = {
  student: 'Informations académiques',
  professional: 'Informations professionnelles',
  recruiter: 'Informations de l\'entreprise',
  researcher: 'Informations de recherche',
  donor: 'Informations de l\'organisation',
};

const ProfilPage = () => {
  const { user, updateProfile, loading, error, clearError } = useUserStore();
  const { schools, fetchSchools } = useSchoolStore();
  const [success, setSuccess] = useState(false);

  const [base, setBase] = useState({ first_name: '', last_name: '', phone: '' });
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (!user) return;
    setBase({ first_name: user.first_name || '', last_name: user.last_name || '', phone: user.phone || '' });
    setProfile(getProfileData(user));
    if (user.role === 'student') fetchSchools();
  }, [user, fetchSchools]);

  const setB = (k, v) => { if (error) clearError(); setSuccess(false); setBase(p => ({ ...p, [k]: v })); };
  const setP = (k, v) => { if (error) clearError(); setSuccess(false); setProfile(p => ({ ...p, [k]: v })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      first_name: base.first_name,
      last_name: base.last_name,
      phone: base.phone,
      profile: { ...profile },
    };
    if (user.role === 'student') {
      payload.profile.school = payload.profile.school ? Number(payload.profile.school) : undefined;
    }
    await updateProfile(payload);
    if (!error) setSuccess(true);
  };

  const errMsg = error
    ? typeof error === 'string' ? error : error.detail || JSON.stringify(error)
    : null;

  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-950">Mon profil</h1>
        <p className="text-sm text-slate-500 mt-1">Mettez à jour vos informations personnelles et professionnelles.</p>
      </div>

      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold">
          <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          Profil mis à jour avec succès.
        </div>
      )}

      {errMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">{errMsg}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section : Informations générales */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Informations générales</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Prénom" required>
              <input type="text" value={base.first_name} onChange={e => setB('first_name', e.target.value)}
                className={inputCls} placeholder="Kofi" required />
            </Field>
            <Field label="Nom" required>
              <input type="text" value={base.last_name} onChange={e => setB('last_name', e.target.value)}
                className={inputCls} placeholder="Asante" required />
            </Field>
          </div>

          <Field label="Email">
            <input type="email" value={user.email} disabled
              className={inputCls + ' opacity-50 cursor-not-allowed bg-slate-50'} />
          </Field>

          <Field label="Téléphone">
            <input type="tel" value={base.phone} onChange={e => setB('phone', e.target.value)}
              className={inputCls} placeholder="+2250700000000" />
          </Field>
        </div>

        {/* Section : Profil spécifique au rôle */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {ROLE_SECTION_TITLES[user.role] || 'Profil'}
          </p>

          {user.role === 'student' && (
            <>
              <Field label="Matricule">
                <input type="text" value={profile.matricule || ''} disabled
                  className={inputCls + ' opacity-50 cursor-not-allowed bg-slate-50'}
                  placeholder="Matricule (non modifiable)" />
              </Field>
              <Field label="École">
                <select value={profile.school || ''} onChange={e => setP('school', e.target.value)} className={selectCls}>
                  <option value="">— Sélectionnez une école —</option>
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Année en cours">
                  <select value={profile.current_year || ''} onChange={e => setP('current_year', e.target.value)} className={selectCls}>
                    <option value="">— Sélectionnez —</option>
                    {YEARS.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
                  </select>
                </Field>
                <Field label="Nationalité">
                  <input type="text" value={profile.nationality || ''} onChange={e => setP('nationality', e.target.value)}
                    className={inputCls} placeholder="ex: Ivoirienne" />
                </Field>
              </div>
              <Field label="Date de naissance">
                <input type="date" value={profile.birth_date || ''} onChange={e => setP('birth_date', e.target.value)}
                  className={inputCls} />
              </Field>
            </>
          )}

          {(user.role === 'professional' || user.role === 'recruiter') && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Entreprise">
                  <input type="text" value={profile.company_name || ''} onChange={e => setP('company_name', e.target.value)}
                    className={inputCls} placeholder="Nom de l'entreprise" />
                </Field>
                <Field label="Poste">
                  <input type="text" value={profile.job_title || ''} onChange={e => setP('job_title', e.target.value)}
                    className={inputCls} placeholder="Votre fonction" />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Secteur">
                  <select value={profile.sector || ''} onChange={e => setP('sector', e.target.value)} className={selectCls}>
                    <option value="">— Sélectionnez —</option>
                    {SECTORS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </Field>
                <Field label="Pays">
                  <input type="text" value={profile.country || ''} onChange={e => setP('country', e.target.value)}
                    className={inputCls} placeholder="ex: Côte d'Ivoire" />
                </Field>
              </div>
              {user.role === 'professional' && (
                <Field label="Site web de l'entreprise">
                  <input type="url" value={profile.company_website || ''} onChange={e => setP('company_website', e.target.value)}
                    className={inputCls} placeholder="https://monentreprise.ci" />
                </Field>
              )}
            </>
          )}

          {user.role === 'researcher' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Titre académique">
                  <select value={profile.academic_title || ''} onChange={e => setP('academic_title', e.target.value)} className={selectCls}>
                    <option value="">— Sélectionnez —</option>
                    {ACADEMIC_TITLES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </Field>
                <Field label="Pays">
                  <input type="text" value={profile.country || ''} onChange={e => setP('country', e.target.value)}
                    className={inputCls} placeholder="ex: Sénégal" />
                </Field>
              </div>
              <Field label="Institution">
                <input type="text" value={profile.institution || ''} onChange={e => setP('institution', e.target.value)}
                  className={inputCls} placeholder="Université ou établissement" />
              </Field>
              <Field label="URL du profil de recherche">
                <input type="url" value={profile.research_profile_url || ''} onChange={e => setP('research_profile_url', e.target.value)}
                  className={inputCls} placeholder="https://researchgate.net/..." />
              </Field>
            </>
          )}

          {user.role === 'donor' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Organisation">
                  <input type="text" value={profile.organization_name || ''} onChange={e => setP('organization_name', e.target.value)}
                    className={inputCls} placeholder="Nom de l'organisation" />
                </Field>
                <Field label="Position">
                  <input type="text" value={profile.position || ''} onChange={e => setP('position', e.target.value)}
                    className={inputCls} placeholder="Votre rôle" />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Type d'organisation">
                  <select value={profile.organization_type || ''} onChange={e => setP('organization_type', e.target.value)} className={selectCls}>
                    <option value="">— Sélectionnez —</option>
                    {ORG_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </Field>
                <Field label="Pays">
                  <input type="text" value={profile.country || ''} onChange={e => setP('country', e.target.value)}
                    className={inputCls} placeholder="ex: Maroc" />
                </Field>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white font-bold rounded-2xl transition-colors shadow-sm"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilPage;
