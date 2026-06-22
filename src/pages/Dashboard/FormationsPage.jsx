import { useState, useEffect } from 'react';
import useProgramStore from '../../stores/useProgramStore';
import useProgramMetaStore from '../../stores/useProgramMetaStore';
import useUserStore from '../../stores/useUserStore';
import useSchoolStore from '../../stores/useSchoolStore';
import useDomainStore from '../../stores/useDomainStore';

const ADMIN_ROLES = ['admin', 'moderator'];

const EMPTY_FORM = {
  title: '',
  program_type: '',
  regime: '',
  domain: '',
  duration: '',
  description: '',
  career_opportunities: '',
  school: '',
  is_active: true,
};

// ─── Page principale ──────────────────────────────────────────────────────────

const FormationsPage = () => {
  const { programs, loading, fetchPrograms, deleteProgram, toggleActive } = useProgramStore();
  const { programTypes, regimes, fetchProgramTypes, fetchRegimes } = useProgramMetaStore();
  const { user } = useUserStore();
  const isAdmin = ADMIN_ROLES.includes(user?.role);

  const [tab, setTab] = useState('programmes');
  const [filterType, setFilterType] = useState('all');
  const [filterRegime, setFilterRegime] = useState('');
  const [filterSchool, setFilterSchool] = useState('');
  const [filterDomain, setFilterDomain] = useState('');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [deletingSlug, setDeletingSlug] = useState(null);
  const [togglingSlug, setTogglingSlug] = useState(null);

  useEffect(() => {
    fetchPrograms();
    fetchProgramTypes();
    fetchRegimes();
  }, [fetchPrograms, fetchProgramTypes, fetchRegimes]);

  // Label maps dérivés dynamiquement depuis l'API
  const typeLabel = Object.fromEntries(programTypes.map(t => [t.code, t.label]));
  const regimeLabel = Object.fromEntries(regimes.map(r => [r.code, r.label]));

  // Listes pour les filtres
  const schoolNames = [...new Set(programs.map(p => p.school_name).filter(Boolean))].sort();
  const domainNames = [...new Set(programs.map(p => p.domain_name).filter(Boolean))].sort();

  // Stats
  const stats = {
    total: programs.length,
    actifs: programs.filter(p => p.is_active !== false).length,
    inactifs: programs.filter(p => p.is_active === false).length,
    initiale: programs.filter(p => p.program_type === 'initiale').length,
  };

  // Filtrage
  const filtered = programs.filter(p => {
    const matchType   = filterType   === 'all' || p.program_type === filterType;
    const matchRegime = !filterRegime || p.regime === filterRegime;
    const matchSchool = !filterSchool || p.school_name === filterSchool;
    const matchDomain = !filterDomain || p.domain_name === filterDomain;
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchRegime && matchSchool && matchDomain && matchSearch;
  });

  const hasFilters = filterType !== 'all' || filterRegime || filterSchool || filterDomain || search;
  const clearFilters = () => {
    setFilterType('all');
    setFilterRegime('');
    setFilterSchool('');
    setFilterDomain('');
    setSearch('');
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('Supprimer cette formation ?')) return;
    setDeletingSlug(slug);
    await deleteProgram(slug);
    setDeletingSlug(null);
  };

  const handleToggle = async (slug, currentActive) => {
    setTogglingSlug(slug);
    await toggleActive(slug, !currentActive);
    setTogglingSlug(null);
  };

  return (
    <div className="space-y-6">

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Formations</h1>
          <p className="text-sm text-slate-500 mt-1">Programmes académiques et formations continues de l'ARSTM.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-56 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
          />
          {isAdmin && tab === 'programmes' && (
            <button
              onClick={() => setModal({ mode: 'create' })}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </button>
          )}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'text-blue-950' },
          { label: 'Actifs', value: stats.actifs, color: 'text-emerald-600' },
          { label: 'Inactifs', value: stats.inactifs, color: 'text-slate-400' },
          { label: 'Formation initiale', value: stats.initiale, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs (admin seulement) ───────────────────────────────────────────── */}
      {isAdmin && (
        <div className="flex border-b border-slate-200 gap-1">
          {[
            { key: 'programmes', label: 'Programmes' },
            { key: 'referentiels', label: 'Types & Régimes' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 text-sm font-bold transition-colors border-b-2 -mb-px ${
                tab === t.key
                  ? 'border-blue-950 text-blue-950'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB — Programmes
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === 'programmes' && (
        <>
          {/* Filtres */}
          <div className="flex flex-col gap-3">
            {/* Pills — types dynamiques */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${filterType === 'all' ? 'bg-blue-950 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                Tous types
              </button>
              {programTypes.filter(t => t.is_active).map(t => (
                <button
                  key={t.code}
                  onClick={() => setFilterType(t.code)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${filterType === t.code ? 'bg-blue-950 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Selects */}
            <div className="flex flex-wrap gap-3 items-center">
              {regimes.filter(r => r.is_active).length > 0 && (
                <select
                  value={filterRegime}
                  onChange={e => setFilterRegime(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                >
                  <option value="">Tous régimes</option>
                  {regimes.filter(r => r.is_active).map(r => (
                    <option key={r.code} value={r.code}>{r.label}</option>
                  ))}
                </select>
              )}

              {schoolNames.length > 0 && (
                <select
                  value={filterSchool}
                  onChange={e => setFilterSchool(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 min-w-[200px]"
                >
                  <option value="">Toutes les écoles</option>
                  {schoolNames.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              )}

              {domainNames.length > 0 && (
                <select
                  value={filterDomain}
                  onChange={e => setFilterDomain(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 min-w-[180px]"
                >
                  <option value="">Toutes les filières</option>
                  {domainNames.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              )}

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Effacer
                </button>
              )}

              <span className="text-xs text-slate-400 ml-auto">
                {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Grille */}
          {loading && programs.length === 0 ? (
            <div className="flex justify-center py-16">
              <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <p className="text-slate-400 font-medium">
                {programs.length === 0
                  ? 'Aucune formation disponible pour le moment.'
                  : 'Aucune formation ne correspond à votre recherche.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(p => (
                <ProgramCard
                  key={p.slug || p.id}
                  program={p}
                  isAdmin={isAdmin}
                  deletingSlug={deletingSlug}
                  togglingSlug={togglingSlug}
                  typeLabel={typeLabel}
                  regimeLabel={regimeLabel}
                  onEdit={() => setModal({ mode: 'edit', program: p })}
                  onDelete={() => handleDelete(p.slug)}
                  onToggle={() => handleToggle(p.slug, p.is_active)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB — Référentiels (Types & Régimes)
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === 'referentiels' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReferentielSection type="types" />
          <ReferentielSection type="regimes" />
        </div>
      )}

      {/* Modal */}
      {modal && (
        <ProgramModal
          mode={modal.mode}
          initial={modal.mode === 'edit' ? modal.program : null}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

// ─── Carte programme ──────────────────────────────────────────────────────────

const ProgramCard = ({
  program: p,
  isAdmin,
  deletingSlug,
  togglingSlug,
  typeLabel,
  regimeLabel,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const isToggling = togglingSlug === p.slug;
  const isActive = p.is_active !== false;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden ${!isActive ? 'border-slate-200 opacity-60' : 'border-slate-200'}`}>
      <div className="p-5 flex-grow space-y-3">
        <div className="flex items-start justify-between gap-2">
          {/* Badges type / régime */}
          <div className="flex flex-wrap gap-1.5">
            {p.program_type && (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                {typeLabel[p.program_type] || p.program_type}
              </span>
            )}
            {p.regime && (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {regimeLabel[p.regime] || p.regime}
              </span>
            )}
          </div>

          {/* Actions admin */}
          {isAdmin && (
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Toggle actif/inactif */}
              <button
                onClick={onToggle}
                disabled={isToggling}
                title={isActive ? 'Désactiver' : 'Activer'}
                className={`relative w-9 h-5 rounded-full transition-colors ${isActive ? 'bg-emerald-500' : 'bg-slate-300'} ${isToggling ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
              <button
                onClick={onEdit}
                className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                title="Modifier"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={onDelete}
                disabled={deletingSlug === p.slug}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                title="Supprimer"
              >
                {deletingSlug === p.slug ? (
                  <span className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin block" />
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        <h3 className="font-black text-slate-900 leading-snug">{p.title || '—'}</h3>

        {p.description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{p.description}</p>
        )}

        <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-400">
          <div className="flex items-center justify-between gap-2">
            {p.duration && <span>Durée : <strong className="text-slate-600">{p.duration}</strong></span>}
            {p.domain_name && (
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 shrink-0">
                {p.domain_name}
              </span>
            )}
          </div>
          {p.school_name && <p className="truncate text-slate-500">{p.school_name}</p>}
        </div>
      </div>

      {p.career_opportunities && (
        <div className="px-5 pb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Débouchés</p>
          <div className="flex flex-wrap gap-1">
            {p.career_opportunities.split('\n').filter(Boolean).slice(0, 3).map((c, i) => (
              <span key={i} className="text-[10px] font-semibold bg-blue-950/5 text-blue-950 px-2 py-0.5 rounded-md">{c.trim()}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Section référentiel (Types OU Régimes) ───────────────────────────────────

const EMPTY_REF = { code: '', label: '', is_active: true, order: 0 };

const ReferentielSection = ({ type }) => {
  const {
    programTypes, regimes, loading,
    createProgramType, updateProgramType, deleteProgramType,
    createRegime, updateRegime, deleteRegime,
  } = useProgramMetaStore();

  const isTypes = type === 'types';
  const items   = isTypes ? programTypes : regimes;
  const title   = isTypes ? 'Types de formation' : 'Régimes';

  const [adding, setAdding]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [addForm, setAddForm] = useState({ ...EMPTY_REF });
  const [editForm, setEditForm] = useState({});
  const [err, setErr] = useState('');

  const errStr = e => (typeof e === 'object' ? JSON.stringify(e) : e);

  const handleAdd = async () => {
    if (!addForm.code.trim() || !addForm.label.trim()) { setErr('Code et libellé requis'); return; }
    const payload = { ...addForm, order: Number(addForm.order) };
    const result = isTypes ? await createProgramType(payload) : await createRegime(payload);
    if (result.ok) { setAdding(false); setAddForm({ ...EMPTY_REF }); setErr(''); }
    else setErr(errStr(result.error));
  };

  const startEdit = (item) => {
    setEditing(item.code);
    setEditForm({ label: item.label, is_active: item.is_active, order: item.order });
    setErr('');
  };

  const handleSave = async (code) => {
    const payload = { ...editForm, order: Number(editForm.order) };
    const result = isTypes ? await updateProgramType(code, payload) : await updateRegime(code, payload);
    if (result.ok) { setEditing(null); setErr(''); }
    else setErr(errStr(result.error));
  };

  const handleDelete = async (code) => {
    if (!window.confirm('Supprimer cet élément ? Les formations liées pourraient être affectées.')) return;
    const result = isTypes ? await deleteProgramType(code) : await deleteRegime(code);
    if (!result.ok) setErr(errStr(result.error));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="font-black text-blue-950 text-sm">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{items.length} entrée{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditing(null); setErr(''); }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-950 text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter
        </button>
      </div>

      {/* Erreur */}
      {err && (
        <div className="mx-4 mt-3 p-2.5 rounded-lg bg-red-50 border border-red-100 text-xs text-red-700">{err}</div>
      )}

      {/* Formulaire d'ajout inline */}
      {adding && (
        <div className="p-4 border-b border-amber-100 bg-amber-50 space-y-3">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Nouvel élément</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Code (ex: initiale)"
              value={addForm.code}
              onChange={e => setAddForm(f => ({ ...f, code: e.target.value }))}
              className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900/20 bg-white"
            />
            <input
              placeholder="Libellé (ex: Formation Initiale)"
              value={addForm.label}
              onChange={e => setAddForm(f => ({ ...f, label: e.target.value }))}
              className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900/20 bg-white"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Ordre"
              value={addForm.order}
              onChange={e => setAddForm(f => ({ ...f, order: e.target.value }))}
              className="w-20 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none bg-white"
            />
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={addForm.is_active}
                onChange={e => setAddForm(f => ({ ...f, is_active: e.target.checked }))}
                className="accent-blue-950"
              />
              Actif
            </label>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => { setAdding(false); setErr(''); }}
                className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAdd}
                disabled={loading}
                className="px-3 py-1.5 bg-blue-950 text-white text-xs font-bold rounded-lg hover:bg-blue-900 disabled:opacity-60 transition-colors"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste */}
      <div className="divide-y divide-slate-100">
        {items.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">Aucun élément. Cliquez sur Ajouter.</p>
        ) : (
          items.map(item => (
            <div key={item.code} className="px-5 py-3.5">
              {editing === item.code ? (
                /* Mode édition inline */
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 items-end">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Code (immuable)</p>
                      <p className="text-xs font-bold text-slate-600 font-mono bg-slate-100 px-2 py-1.5 rounded-lg">{item.code}</p>
                    </div>
                    <input
                      placeholder="Libellé"
                      value={editForm.label}
                      onChange={e => setEditForm(f => ({ ...f, label: e.target.value }))}
                      className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={editForm.order}
                      onChange={e => setEditForm(f => ({ ...f, order: e.target.value }))}
                      className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                    />
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.is_active}
                        onChange={e => setEditForm(f => ({ ...f, is_active: e.target.checked }))}
                        className="accent-blue-950"
                      />
                      Actif
                    </label>
                    <div className="ml-auto flex gap-2">
                      <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Annuler</button>
                      <button
                        onClick={() => handleSave(item.code)}
                        disabled={loading}
                        className="px-3 py-1.5 bg-blue-950 text-white text-xs font-bold rounded-lg hover:bg-blue-900 disabled:opacity-60 transition-colors"
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Mode lecture */
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${item.is_active ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{item.label}</p>
                    <p className="text-[10px] font-mono text-slate-400">{item.code} · ordre {item.order}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.code)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─── Modal création / édition ─────────────────────────────────────────────────

const ProgramModal = ({ mode, initial, onClose }) => {
  const { createProgram, updateProgram, loading } = useProgramStore();
  const { programTypes, regimes } = useProgramMetaStore();
  const { schools, fetchSchools } = useSchoolStore();
  const { domains, fetchDomains } = useDomainStore();

  const [form, setForm] = useState(
    initial
      ? {
          title:                initial.title || '',
          program_type:         initial.program_type || '',
          regime:               initial.regime || '',
          domain:               initial.domain || '',
          duration:             initial.duration || '',
          description:          initial.description || '',
          career_opportunities: initial.career_opportunities || '',
          school:               initial.school || '',
          is_active:            initial.is_active ?? true,
        }
      : { ...EMPTY_FORM }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (schools.length === 0) fetchSchools();
    if (domains.length === 0) fetchDomains();
  }, []);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Le titre est requis.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = {
      ...form,
      school: form.school ? Number(form.school) : undefined,
      domain: form.domain ? Number(form.domain) : undefined,
    };
    if (!payload.school) delete payload.school;
    if (!payload.domain) delete payload.domain;

    const result = mode === 'create'
      ? await createProgram(payload)
      : await updateProgram(initial.slug, payload);

    if (result.ok) onClose();
    else setErrors({ api: typeof result.error === 'string' ? result.error : JSON.stringify(result.error) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-lg font-black text-blue-950">
            {mode === 'create' ? 'Ajouter une formation' : 'Modifier la formation'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errors.api && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700 font-medium">{errors.api}</div>
          )}

          <Field label="Titre *" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Ex : Brevet de Capitaine 200"
              className={inputCls(errors.title)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Type de formation">
              <select value={form.program_type} onChange={e => set('program_type', e.target.value)} className={inputCls()}>
                <option value="">— Sélectionner —</option>
                {programTypes.filter(t => t.is_active).map(t => (
                  <option key={t.code} value={t.code}>{t.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Régime">
              <select value={form.regime} onChange={e => set('regime', e.target.value)} className={inputCls()}>
                <option value="">— Sélectionner —</option>
                {regimes.filter(r => r.is_active).map(r => (
                  <option key={r.code} value={r.code}>{r.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Filière (Domaine)">
              <select value={form.domain} onChange={e => set('domain', e.target.value)} className={inputCls()}>
                <option value="">— Sélectionner —</option>
                {domains.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </Field>
            <Field label="École">
              <select value={form.school} onChange={e => set('school', e.target.value)} className={inputCls()}>
                <option value="">— Aucune —</option>
                {schools.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Durée">
            <input
              type="text"
              value={form.duration}
              onChange={e => set('duration', e.target.value)}
              placeholder="Ex : 3 ans"
              className={inputCls()}
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={3}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Description du programme..."
              className={inputCls() + ' resize-none'}
            />
          </Field>

          <Field label="Débouchés" hint="Un débouché par ligne">
            <textarea
              rows={3}
              value={form.career_opportunities}
              onChange={e => set('career_opportunities', e.target.value)}
              placeholder={"Officier de pont\nCapitaine\nPilote maritime"}
              className={inputCls() + ' resize-none'}
            />
          </Field>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={e => set('is_active', e.target.checked)}
              className="w-4 h-4 accent-blue-950"
            />
            <span className="text-sm font-semibold text-slate-700">Formation active (visible sur le portail)</span>
          </label>
        </form>

        {/* Footer modal */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 shrink-0">
          <button type="button" onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2.5 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 disabled:opacity-60 transition-colors flex items-center gap-2"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {mode === 'create' ? 'Créer la formation' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Utilitaires UI ───────────────────────────────────────────────────────────

const inputCls = (error) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors
  ${error ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-blue-900/20 focus:border-blue-900 bg-white'}`;

const Field = ({ label, hint, error, children }) => (
  <div className="space-y-1.5">
    <div className="flex items-baseline justify-between">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
      {hint && <span className="text-[10px] text-slate-400">{hint}</span>}
    </div>
    {children}
    {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
  </div>
);

export default FormationsPage;
