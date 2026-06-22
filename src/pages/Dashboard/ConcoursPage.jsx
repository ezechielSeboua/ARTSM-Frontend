import { useState, useEffect } from 'react';
import useCompetitionStore from '../../stores/useCompetitionStore';
import useUserStore from '../../stores/useUserStore';

const ADMIN_ROLES = ['admin', 'moderator'];

const EMPTY_FORM = {
  title: '',
  description: '',
  application_deadline: '',
  competition_date: '',
  is_active: false,
};

const fmtDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

// ─── Page principale ──────────────────────────────────────────────────────────

const ConcoursPage = () => {
  const { competitions, loading, fetchAll, deleteCompetition, publishCompetition } = useCompetitionStore();
  const { user } = useUserStore();
  const isAdmin = ADMIN_ROLES.includes(user?.role);

  const [modal, setModal] = useState(null);
  const [deletingSlug, setDeletingSlug] = useState(null);
  const [publishConfirm, setPublishConfirm] = useState(null);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleDelete = async (slug, title) => {
    if (!window.confirm(`Supprimer le concours "${title}" définitivement ?`)) return;
    setDeletingSlug(slug);
    await deleteCompetition(slug);
    setDeletingSlug(null);
  };

  const handlePublishConfirm = async () => {
    if (!publishConfirm) return;
    setPublishing(true);
    await publishCompetition(publishConfirm.slug);
    setPublishing(false);
    setPublishConfirm(null);
  };

  const active = competitions.filter(c => c.is_active);
  const drafts = competitions.filter(c => !c.is_active);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Concours</h1>
          <p className="text-sm text-slate-500 mt-1">
            {active.length} actif{active.length !== 1 ? 's' : ''} · {drafts.length} brouillon{drafts.length !== 1 ? 's' : ''}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setModal({ mode: 'create' })}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau concours
          </button>
        )}
      </div>

      {/* Alerte fonctionnelle */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
        <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>
          <span className="font-bold">Publication irréversible.</span> Activer un concours envoie automatiquement un email à tous les candidats inscrits et abonnés aux alertes. Cette notification n'est envoyée qu'une seule fois.
        </p>
      </div>

      {/* Table */}
      {loading && competitions.length === 0 ? (
        <div className="flex justify-center py-16">
          <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
        </div>
      ) : competitions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="text-slate-400 font-medium">Aucun concours enregistré.</p>
          {isAdmin && (
            <button
              onClick={() => setModal({ mode: 'create' })}
              className="mt-4 px-4 py-2 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors"
            >
              Créer le premier concours
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Concours</th>
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hidden md:table-cell">Dépôt dossiers</th>
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hidden lg:table-cell">Date concours</th>
                <th className="px-5 py-3 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</th>
                {isAdmin && <th className="px-5 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {competitions.map((c) => (
                <tr key={c.slug} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{c.title}</p>
                    {c.description && (
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{c.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-slate-600 font-medium">
                    {fmtDate(c.application_deadline)}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-slate-600 font-medium">
                    {fmtDate(c.competition_date)}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full
                      ${c.is_active
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${c.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {c.is_active ? 'Actif' : 'Brouillon'}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Publier (brouillon → actif) */}
                        {!c.is_active && (
                          <button
                            onClick={() => setPublishConfirm({ slug: c.slug, title: c.title })}
                            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                            title="Publier et notifier les candidats"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            Publier
                          </button>
                        )}
                        {/* Modifier */}
                        <button
                          onClick={() => setModal({ mode: 'edit', competition: c })}
                          className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        {/* Supprimer */}
                        <button
                          onClick={() => handleDelete(c.slug, c.title)}
                          disabled={deletingSlug === c.slug}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                          title="Supprimer"
                        >
                          {deletingSlug === c.slug
                            ? <span className="w-4 h-4 border border-slate-400 border-t-transparent rounded-full animate-spin block" />
                            : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                          }
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal création / édition */}
      {modal && (
        <CompetitionModal
          mode={modal.mode}
          initial={modal.mode === 'edit' ? modal.competition : null}
          onClose={() => setModal(null)}
        />
      )}

      {/* Dialogue de confirmation de publication */}
      {publishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-black text-blue-950">Confirmer la publication</h2>
                <p className="text-xs text-slate-500 mt-0.5">Action irréversible</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Publier <span className="font-bold text-slate-900">"{publishConfirm.title}"</span> enverra immédiatement un email de notification à <span className="font-bold">tous les candidats inscrits</span> et abonnés aux alertes concours.
            </p>
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 font-medium">
              Cette notification n'est envoyée qu'une seule fois. Elle ne peut pas être annulée.
            </p>
            <div className="flex gap-3 justify-end pt-1">
              <button
                onClick={() => setPublishConfirm(null)}
                disabled={publishing}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-60"
              >
                Annuler
              </button>
              <button
                onClick={handlePublishConfirm}
                disabled={publishing}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60"
              >
                {publishing && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Oui, publier et notifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Modal création / édition ─────────────────────────────────────────────────

const CompetitionModal = ({ mode, initial, onClose }) => {
  const { createCompetition, updateCompetition, loading } = useCompetitionStore();

  const [form, setForm] = useState(() =>
    initial
      ? {
          title: initial.title || '',
          description: initial.description || '',
          application_deadline: initial.application_deadline || '',
          competition_date: initial.competition_date || '',
          is_active: initial.is_active || false,
        }
      : { ...EMPTY_FORM }
  );
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined, api: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Le titre est requis.';
    if (form.application_deadline && form.competition_date) {
      if (form.competition_date < form.application_deadline) {
        e.competition_date = 'La date du concours doit être après la clôture des dépôts.';
      }
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      is_active: form.is_active,
    };
    if (form.application_deadline) payload.application_deadline = form.application_deadline;
    if (form.competition_date) payload.competition_date = form.competition_date;

    const result = mode === 'create'
      ? await createCompetition(payload)
      : await updateCompetition(initial.slug, payload);

    if (result.ok) {
      onClose();
    } else {
      const raw = result.error;
      setErrors({ api: typeof raw === 'string' ? raw : JSON.stringify(raw) });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-black text-blue-950">
              {mode === 'create' ? 'Nouveau concours' : `Modifier — ${initial?.title}`}
            </h2>
            {mode === 'edit' && initial?.slug && (
              <p className="text-xs font-mono text-slate-400 mt-0.5">{initial.slug}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errors.api && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700 font-medium">
              {errors.api}
            </div>
          )}

          <Field label="Titre *" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Concours d'entrée ARSTM 2027"
              className={inputCls(errors.title)}
            />
          </Field>

          <Field label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Précisez les formations concernées, les conditions d'accès..."
              rows={3}
              className={inputCls(errors.description) + ' resize-none'}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Clôture des dépôts" error={errors.application_deadline}>
              <input
                type="date"
                value={form.application_deadline}
                onChange={e => set('application_deadline', e.target.value)}
                className={inputCls(errors.application_deadline)}
              />
            </Field>
            <Field label="Date du concours" error={errors.competition_date}>
              <input
                type="date"
                value={form.competition_date}
                onChange={e => set('competition_date', e.target.value)}
                className={inputCls(errors.competition_date)}
              />
            </Field>
          </div>

          {/* is_active — uniquement en édition et si déjà actif (pour ne pas bypasser le flow de publication) */}
          {mode === 'create' && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
              <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Le concours sera créé en <span className="font-bold text-slate-700 mx-1">brouillon</span>. Utilisez le bouton <span className="font-bold text-emerald-700 mx-1">Publier</span> dans la liste pour notifier les candidats.
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 disabled:opacity-60 transition-colors"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {mode === 'create' ? 'Créer en brouillon' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Utilitaires UI ───────────────────────────────────────────────────────────

const inputCls = (error) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors
  ${error
    ? 'border-red-300 focus:ring-red-200 bg-red-50'
    : 'border-slate-200 focus:ring-blue-900/20 focus:border-blue-900 bg-white'
  }`;

const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
    {children}
    {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
  </div>
);

export default ConcoursPage;
