import { useState } from 'react';
import useUserStore from '../../stores/useUserStore';
import EtudiantsTab from './utilisateurs/EtudiantsTab';
import ProfessionnelsTab from './utilisateurs/ProfessionnelsTab';
import RecruteursTab from './utilisateurs/RecruteursTab';
import ChercheursTabs from './utilisateurs/ChercheursTabs';
import BailleursTab from './utilisateurs/BailleursTab';
import AgentsTab from './utilisateurs/AgentsTab';

const ADMIN_ROLES = ['admin', 'moderator'];

const ROLE_LABELS = {
  student: 'Étudiant',
  professional: 'Professionnel Maritime',
  recruiter: 'Recruteur / RH',
  researcher: 'Chercheur',
  donor: 'Bailleur / Institution',
  moderator: 'Modérateur ARSTM',
  admin: 'Agent ARSTM',
};

const ROLE_TABS = [
  { key: 'student',      label: 'Étudiants',      component: EtudiantsTab,      adminOnly: false },
  { key: 'professional', label: 'Professionnels',  component: ProfessionnelsTab, adminOnly: false },
  { key: 'recruiter',    label: 'Recruteurs',      component: RecruteursTab,     adminOnly: false },
  { key: 'researcher',   label: 'Chercheurs',      component: ChercheursTabs,    adminOnly: false },
  { key: 'donor',        label: 'Bailleurs',       component: BailleursTab,      adminOnly: false },
  { key: 'agents',       label: 'Agents ARSTM',    component: AgentsTab,         adminOnly: false },
];

// ─── Vue propre à l'utilisateur connecté ─────────────────────────────────────

const SelfView = ({ user }) => {
  const isStudent = user?.role === 'student';
  const profile = isStudent ? user?.student_profile : null;

  return (
    <div className="max-w-lg space-y-4">
      <div className={`p-4 rounded-2xl border ${user?.is_active ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
        <p className={`text-sm font-bold ${user?.is_active ? 'text-emerald-700' : 'text-amber-700'}`}>
          {user?.is_active
            ? 'Votre compte est actif.'
            : 'Votre dossier est en cours de validation par un administrateur. Vous recevrez un email dès approbation.'}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mon profil</p>
        <Row label="Nom complet" value={`${user?.last_name || ''} ${user?.first_name || ''}`} />
        <Row label="Email" value={user?.email} />
        <Row label="Rôle" value={ROLE_LABELS[user?.role] || user?.role} />
        {isStudent && profile && (
          <>
            <Row label="École"       value={profile.school_name || '—'} />
            <Row label="Niveau"      value={profile.current_year || '—'} />
            <Row label="Nationalité" value={profile.nationality || '—'} />
            <Row label="Matricule"   value={profile.matricule || 'Non assigné'} />
          </>
        )}
      </div>
    </div>
  );
};

// ─── Page principale ──────────────────────────────────────────────────────────

const UtilisateursPage = () => {
  const { user } = useUserStore();
  const isAdmin = ADMIN_ROLES.includes(user?.role);
  const isSuperAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState('student');

  const visibleTabs = ROLE_TABS.filter(t => !t.adminOnly);
  const ActiveComponent = visibleTabs.find(t => t.key === activeTab)?.component;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-950">
          {isAdmin ? 'Utilisateurs' : 'Mon profil'}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isAdmin
            ? 'Gestion de tous les comptes enregistrés sur la plateforme.'
            : 'Informations de votre compte.'}
        </p>
      </div>

      {isAdmin ? (
        <>
          {/* Onglets rôles */}
          <div className="flex flex-wrap gap-2">
            {visibleTabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors
                  ${activeTab === key
                    ? 'bg-blue-950 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contenu du tab actif */}
          {ActiveComponent && <ActiveComponent canEdit={isSuperAdmin} />}
        </>
      ) : (
        <SelfView user={user} />
      )}
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-xs text-slate-400 font-semibold shrink-0">{label}</span>
    <span className="text-sm font-semibold text-slate-800 text-right">{value}</span>
  </div>
);

export default UtilisateursPage;
