import { useState, useEffect, useRef } from "react";
import useUserStore from "../../../stores/useUserStore";
import useSchoolStore from "../../../stores/useSchoolStore";
import useProgramStore from "../../../stores/useProgramStore";
import {
  InfoRow,
  SaveBtn,
  CommonFields,
  SuccessBanner,
  ErrorBanner,
  SecuriteTab,
} from "./shared";

// ─── Onglets ──────────────────────────────────────────────────────────────────

const TABS = [
  {
    id: "profil",
    label: "Mon profil",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    id: "ecole",
    label: "Mon école",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    id: "formations",
    label: "Mes formations",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    id: "securite",
    label: "Sécurité",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
];

// ─── Onglet Profil ────────────────────────────────────────────────────────────

const ProfilTab = () => {
  const { user, updateProfile, loading, error, clearError } = useUserStore();
  const { schools } = useSchoolStore();
  const fileInputRef = useRef(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [base, setBase] = useState(() => ({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
  }));

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarLoading(true);
    const fd = new FormData();
    fd.append("avatar", file);
    await updateProfile(fd);
    setAvatarLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) clearError();
    setSuccess(false);
    const { ok } = await updateProfile({
      first_name: base.first_name,
      last_name: base.last_name,
      phone: base.phone,
    });
    if (ok) setSuccess(true);
  };

  if (!user) return null;

  const p = user.student_profile || {};
  const schoolName = schools.find((s) => s.id === p.school)?.name;
  const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Carte identité */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Identité</p>

        {/* Avatar + nom + statut */}
        <div className="flex items-center gap-5 mb-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center border-2 border-white shadow-md">
              {avatarLoading ? (
                <span className="w-6 h-6 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
              ) : user.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-black text-blue-700">{initials}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 p-1.5 bg-blue-950 hover:bg-blue-800 text-white rounded-full shadow-lg transition-colors"
              title="Changer la photo"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-lg font-black text-slate-900 truncate">{user.first_name} {user.last_name}</p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
            <div className="mt-1.5">
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full
                ${user.is_active ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? "bg-emerald-500" : "bg-amber-500"}`} />
                {user.is_active ? "Compte actif" : "En attente de validation"}
              </span>
            </div>
          </div>
        </div>

        {/* Matricule — mis en évidence */}
        {p.matricule && (
          <div className="bg-blue-950 rounded-2xl px-5 py-4 flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Matricule étudiant</p>
              <p className="text-2xl font-black font-mono tracking-widest text-white">{p.matricule}</p>
            </div>
            <svg className="w-9 h-9 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
        )}

        {/* Dossier académique — lecture seule */}
        <div className="border-t border-slate-100 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Dossier académique</p>
          <div className="bg-slate-50 rounded-xl px-4 py-1">
            <InfoRow label="École" value={schoolName} />
            <InfoRow label="Année / Niveau" value={p.current_year} />
            <InfoRow label="Nationalité" value={p.nationality} />
            <InfoRow label="Date de naissance" value={p.birth_date} />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 italic">Géré par l'administration ARSTM.</p>
        </div>
      </div>

      {/* Informations personnelles éditables */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Informations personnelles</p>

        {success && <div className="mb-4"><SuccessBanner /></div>}
        {error && <div className="mb-4"><ErrorBanner error={error} /></div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CommonFields base={base} setBase={(fn) => { clearError(); setSuccess(false); setBase(fn); }} />
          <div className="flex justify-end pt-2">
            <SaveBtn loading={loading && !avatarLoading} label="Enregistrer" />
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Onglet École ─────────────────────────────────────────────────────────────

const DetailRow = ({ icon, label, value, isUrl, href }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <span className="mt-0.5 shrink-0 text-slate-400">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-0.5">{label}</p>
        {isUrl ? (
          <a href={href || value} target="_blank" rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-700 hover:underline break-all">{value}</a>
        ) : (
          <p className="text-sm font-semibold text-slate-800">{value}</p>
        )}
      </div>
    </div>
  );
};

const EcoleTab = ({ schoolId, onGoToFormations }) => {
  const { schools, fetchSchools, loading } = useSchoolStore();
  const { programs, fetchPrograms } = useProgramStore();

  useEffect(() => {
    fetchSchools();
    fetchPrograms();
  }, [fetchSchools, fetchPrograms]);

  const school = schools.find((s) => s.id === schoolId);
  const formationCount = programs.filter((p) => p.school == schoolId && p.is_active !== false).length;

  if (loading && schools.length === 0)
    return (
      <div className="flex justify-center py-12">
        <span className="w-7 h-7 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
      </div>
    );

  if (!schoolId)
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
        <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
        <p className="text-sm font-semibold text-slate-400">Aucune école renseignée.</p>
        <p className="text-xs text-slate-400 mt-1">Contactez l'administration ARSTM pour associer une école à votre profil.</p>
      </div>
    );

  if (!school)
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
        École introuvable dans le système.
      </div>
    );

  const location = [school.address, school.city, school.country].filter(Boolean).join(', ');

  return (
    <div className="max-w-2xl space-y-4">

      {/* Bannière + identité */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-44 bg-blue-950 relative flex items-end">
          {school.featured_image && (
            <img src={school.featured_image} alt={school.name}
              className="absolute inset-0 w-full h-full object-cover" />
          )}
          {/* Overlay pour lisibilité du texte */}
          <div className="absolute inset-0 bg-blue-950/60" />
          <div className="relative z-10 px-6 pb-4 w-full">
            <h2 className="text-xl font-black text-white leading-tight">{school.name}</h2>
            {school.accreditation && (
              <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                {school.accreditation}
              </span>
            )}
          </div>
        </div>

        {/* Barre stats */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
          <div className="px-4 py-3 text-center">
            <p className="text-lg font-black text-blue-900">{formationCount}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Formation{formationCount !== 1 ? 's' : ''}</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-lg font-black text-blue-900">{school.founded_year || '—'}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fondée</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-lg font-black text-blue-900">{school.student_count ?? '—'}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Étudiants</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Description */}
          {school.description && (
            <p className="text-sm text-slate-600 leading-relaxed">{school.description}</p>
          )}

          {/* Informations de l'établissement */}
          {(school.director_name || school.accreditation || school.founded_year) && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Établissement</p>
              <div className="bg-slate-50 rounded-xl px-4 py-1">
                <DetailRow
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
                  label="Directeur / Responsable"
                  value={school.director_name}
                />
                <DetailRow
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
                  label="Accréditation / Tutelle"
                  value={school.accreditation}
                />
              </div>
            </div>
          )}

          {/* Coordonnées */}
          {(location || school.phone || school.email) && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Coordonnées</p>
              <div className="bg-slate-50 rounded-xl px-4 py-1">
                <DetailRow
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                  label="Adresse"
                  value={location}
                />
                <DetailRow
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
                  label="Téléphone"
                  value={school.phone}
                />
                <DetailRow
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
                  label="Email"
                  value={school.email}
                  isUrl
                  href={`mailto:${school.email}`}
                />
              </div>
            </div>
          )}

          {/* Liens */}
          {(school.website_url || school.presentation_video_url) && (
            <div className="flex flex-wrap gap-3 pt-1">
              {school.website_url && (
                <a href={school.website_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  Visiter le site
                </a>
              )}
              {school.presentation_video_url && (
                <a href={school.presentation_video_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Voir la présentation
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CTA formations */}
      {formationCount > 0 && onGoToFormations && (
        <button
          onClick={() => onGoToFormations('formations')}
          className="w-full flex items-center justify-between px-5 py-4 bg-blue-950 hover:bg-blue-900 text-white rounded-2xl transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-black">Voir les formations disponibles</p>
              <p className="text-xs text-blue-300">{formationCount} programme{formationCount !== 1 ? 's' : ''} actif{formationCount !== 1 ? 's' : ''} dans votre école</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      )}
    </div>
  );
};

// ─── Onglet Formations ────────────────────────────────────────────────────────

const PROGRAM_TYPES = {
  licence: "Licence",
  master: "Master",
  doctorat: "Doctorat",
  bts: "BTS",
  dut: "DUT",
  other: "Autre",
};

const REGIMES = {
  presentiel: "Présentiel",
  distanciel: "Distanciel",
  hybride: "Hybride",
};

const FormationCard = ({ program }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-2">
      <h3 className="font-black text-slate-900 leading-snug">
        {program.title}
      </h3>
      {program.is_active !== false && (
        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
          Actif
        </span>
      )}
    </div>

    <div className="flex flex-wrap gap-1.5">
      {program.program_type && (
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
          {PROGRAM_TYPES[program.program_type] || program.program_type}
        </span>
      )}
      {program.regime && (
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {REGIMES[program.regime] || program.regime}
        </span>
      )}
      {program.duration && (
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {program.duration}
        </span>
      )}
    </div>

    {program.description && (
      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
        {program.description}
      </p>
    )}

    {program.career_opportunities && (
      <div className="pt-2 border-t border-slate-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          Débouchés
        </p>
        <p className="text-xs text-slate-600 line-clamp-2">
          {program.career_opportunities}
        </p>
      </div>
    )}
  </div>
);

const FormationsTab = ({ schoolId }) => {
  const { programs, fetchPrograms, loading } = useProgramStore();
  const { schools } = useSchoolStore();

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const myPrograms = programs.filter(
    (p) => p.school == schoolId && p.is_active !== false,
  );

  if (loading && programs.length === 0)
    return (
      <div className="flex justify-center py-12">
        <span className="w-7 h-7 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
      </div>
    );

  const schoolName = schools.find((s) => s.id === schoolId)?.name;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-900">
            {schoolName
              ? `Formations — ${schoolName}`
              : "Formations disponibles"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {myPrograms.length} programme{myPrograms.length !== 1 ? "s" : ""}{" "}
            actif{myPrograms.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {myPrograms.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <svg
            className="w-10 h-10 text-slate-300 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-sm font-semibold text-slate-400">
            {!schoolId
              ? "Associez une école à votre profil pour voir les formations disponibles."
              : "Aucune formation active pour votre école."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {myPrograms.map((p) => (
            <FormationCard key={p.id} program={p} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Composant principal ──────────────────────────────────────────────────────

const EtudiantSpace = () => {
  const { user } = useUserStore();
  const { fetchSchools } = useSchoolStore();
  const [activeTab, setActiveTab] = useState("profil");

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  if (!user) return null;

  const schoolId = user.student_profile?.school || null;

  return (
    <div className="space-y-6">
      {/* Bandeau */}
      <div className="bg-blue-950 rounded-3xl px-6 pt-6 pb-0 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
            Espace Étudiant
          </span>
          <h1 className="text-2xl font-black tracking-tight mt-0.5">
            {user.first_name} {user.last_name}
          </h1>
        </div>

        {/* Onglets dans le bandeau */}
        <div className="relative z-10 flex gap-1 overflow-x-auto pb-0 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold whitespace-nowrap rounded-t-xl transition-colors
                ${
                  activeTab === tab.id
                    ? "bg-slate-50 text-blue-950"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
            >
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={tab.icon}
                />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu de l'onglet actif */}
      {activeTab === "profil" && <ProfilTab />}
      {activeTab === "ecole" && <EcoleTab schoolId={schoolId} onGoToFormations={setActiveTab} />}
      {activeTab === "formations" && <FormationsTab schoolId={schoolId} />}
      {activeTab === "securite" && <SecuriteTab />}
    </div>
  );
};

export default EtudiantSpace;
