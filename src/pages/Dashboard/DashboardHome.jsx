import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../../stores/useUserStore';
import useUserManagementStore from '../../stores/useUserManagementStore';
import useProgramStore from '../../stores/useProgramStore';
import useSchoolStore from '../../stores/useSchoolStore';

const ROLE_LABELS = {
  moderator: 'Modérateur ARSTM',
  admin: 'Agent ARSTM',
};

const quickLinks = [
  {
    title: 'Utilisateurs',
    description: 'Gérer les comptes et dossiers.',
    href: '/tableau-de-bord/utilisateurs',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Formations',
    description: 'Gérer les programmes académiques.',
    href: '/tableau-de-bord/formations',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    title: 'Écoles',
    description: 'Gérer les établissements membres.',
    href: '/tableau-de-bord/ecoles',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    title: 'Site public',
    description: 'Retourner sur le portail ARSTM.',
    href: '/',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

const DashboardHome = () => {
  const { user } = useUserStore();
  const { byRole, pending, fetchAll, fetchPending } = useUserManagementStore();
  const { programs, fetchPrograms } = useProgramStore();
  const { schools, fetchSchools } = useSchoolStore();

  useEffect(() => {
    fetchAll();
    fetchPending();
    fetchPrograms();
    fetchSchools();
  }, [fetchAll, fetchPending, fetchPrograms, fetchSchools]);

  const totalUsers = ['student', 'professional', 'recruiter', 'researcher', 'donor']
    .reduce((sum, r) => sum + (byRole[r]?.length ?? 0), 0);
  const activePrograms = programs.filter(p => p.is_active !== false).length;

  const stats = [
    {
      label: 'Dossiers en attente',
      value: pending.length,
      href: '/tableau-de-bord/utilisateurs',
      urgent: pending.length > 0,
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Utilisateurs inscrits',
      value: totalUsers,
      href: '/tableau-de-bord/utilisateurs',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      label: 'Étudiants',
      value: byRole.student?.length ?? 0,
      href: '/tableau-de-bord/utilisateurs',
      icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    },
    {
      label: 'Formations actives',
      value: activePrograms,
      href: '/tableau-de-bord/formations',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      label: 'Écoles membres',
      value: schools.length,
      href: '/tableau-de-bord/ecoles',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Bannière de bienvenue */}
      <div className="bg-blue-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 w-48 h-48 bg-amber-500/5 rounded-full translate-y-1/2 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Tableau de bord</p>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Bonjour, {user ? `${user.first_name} ${user.last_name}` : '—'}
          </h1>
          {user && (
            <span className={`inline-block mt-3 text-xs font-bold px-3 py-1 rounded-full
              ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
              {ROLE_LABELS[user.role] || user.role}
            </span>
          )}
          {user?.must_change_password && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold px-3 py-2 rounded-xl">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Vous devez changer votre mot de passe temporaire.
            </div>
          )}
        </div>
      </div>

      {/* Alerte dossiers en attente */}
      {pending.length > 0 && (
        <Link
          to="/tableau-de-bord/utilisateurs"
          className="flex items-center justify-between gap-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl hover:bg-amber-100 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-xl shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-black text-amber-900">
                {pending.length} dossier{pending.length > 1 ? 's' : ''} en attente d'approbation
              </p>
              <p className="text-xs text-amber-700">Cliquez pour traiter les inscriptions étudiantes.</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map(stat => (
          <Link key={stat.label} to={stat.href}
            className={`bg-white rounded-2xl border p-4 shadow-sm hover:shadow-md transition-all group flex flex-col gap-3
              ${stat.urgent ? 'border-amber-200 hover:border-amber-400' : 'border-slate-200 hover:border-blue-200'}`}
          >
            <div className={`p-2 rounded-xl w-fit transition-colors
              ${stat.urgent
                ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white'
                : 'bg-blue-50 text-blue-900 group-hover:bg-blue-950 group-hover:text-white'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
              </svg>
            </div>
            <div>
              <p className={`text-2xl font-black ${stat.urgent && stat.value > 0 ? 'text-amber-600' : 'text-blue-950'}`}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Répartition utilisateurs + accès rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Répartition par rôle */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Répartition des utilisateurs</p>
          <div className="space-y-2.5">
            {[
              { label: 'Étudiants',      key: 'student',      color: 'bg-blue-500' },
              { label: 'Professionnels', key: 'professional', color: 'bg-cyan-500' },
              { label: 'Recruteurs',     key: 'recruiter',    color: 'bg-slate-500' },
              { label: 'Chercheurs',     key: 'researcher',   color: 'bg-emerald-500' },
              { label: 'Bailleurs',      key: 'donor',        color: 'bg-purple-500' },
            ].map(({ label, key, color }) => {
              const count = byRole[key]?.length ?? 0;
              const pct = totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-600">{label}</span>
                    <span className="font-black text-slate-800">{count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accès rapides */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Accès rapide</p>
          <div className="space-y-1">
            {quickLinks.map(l => (
              <Link key={l.href} to={l.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-900 group-hover:bg-blue-950 group-hover:text-white transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={l.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{l.title}</p>
                  <p className="text-xs text-slate-400">{l.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
