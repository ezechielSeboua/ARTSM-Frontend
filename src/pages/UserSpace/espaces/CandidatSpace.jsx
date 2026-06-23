import { useState, useEffect } from 'react';
import useUserStore from '../../../stores/useUserStore';
import { SuccessBanner, ErrorBanner, CommonFields, SaveBtn } from './shared';
import { fetchMyCompetitions } from '../../../api/competitions';
import { fetchMyAdmissions, submitAdmission } from '../../../api/admissions';
import { getAlertStatus, subscribeToAlerts, unsubscribeFromAlerts } from '../../../api/alerts';

// ─── Constantes ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'accueil',      label: 'Accueil',          icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'concours',     label: 'Concours ouverts', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { id: 'candidatures', label: 'Mes candidatures', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'alertes',      label: 'Alertes',           icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
];

const STATUS_CONFIG = {
  new:       { label: 'Reçue',            color: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-500' },
  contacted: { label: 'En cours',         color: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500' },
  converted: { label: 'Admis',            color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  closed:    { label: 'Clôturée',         color: 'bg-slate-100 text-slate-500',   dot: 'bg-slate-400' },
};

const fmtDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const daysUntil = (iso) => {
  if (!iso) return null;
  const diff = Math.ceil((new Date(iso) - new Date()) / (1000 * 60 * 60 * 24));
  return diff;
};

// ─── Onglet Accueil ───────────────────────────────────────────────────────────

const AccueilTab = ({ onNavigate, competitions, admissions, subscribed }) => {
  const nextCompetition = competitions[0] ?? null;
  const daysLeft = daysUntil(nextCompetition?.application_deadline);
  const lastCandidature = admissions[0] ?? null;
  const lastStatus = STATUS_CONFIG[lastCandidature?.status];

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Carte prochaine deadline */}
      {nextCompetition && (
        <div className="bg-blue-950 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-2">Concours en cours</p>
          <h2 className="text-base font-black leading-snug mb-1">{nextCompetition.title}</h2>
          <p className="text-xs text-blue-300 mb-4">Clôture des dépôts : {fmtDate(nextCompetition.application_deadline)}</p>

          {daysLeft !== null && daysLeft > 0 && (
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-amber-500 text-blue-950 font-black text-2xl rounded-xl px-4 py-2 tabular-nums">
                {daysLeft}
              </div>
              <p className="text-sm text-blue-200">jours restants pour déposer votre dossier</p>
            </div>
          )}

          <button
            onClick={() => onNavigate('concours')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-blue-950 text-sm font-black rounded-xl transition-colors"
          >
            Voir les détails
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Résumé KPIs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-black text-blue-950">{competitions.length}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Concours ouverts</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-black text-blue-950">{admissions.length}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Candidatures</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-black text-emerald-600">
            {subscribed ? '✓' : '—'}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Alertes actives</p>
        </div>
      </div>

      {/* Dernière candidature */}
      {lastCandidature && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Dernière candidature</p>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-sm truncate">{lastCandidature.competition_title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{lastCandidature.program_label}</p>
              <p className="text-xs text-slate-400">Soumise le {fmtDate(lastCandidature.submitted_at)}</p>
            </div>
            {lastStatus && (
              <span className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${lastStatus.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${lastStatus.dot}`} />
                {lastStatus.label}
              </span>
            )}
          </div>
          <button
            onClick={() => onNavigate('candidatures')}
            className="mt-4 text-xs font-bold text-blue-900 hover:text-blue-700 transition-colors"
          >
            Voir toutes mes candidatures →
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Modal candidature ────────────────────────────────────────────────────────

const ACADEMIC_LEVELS = [
  'Baccalauréat',
  'Bac +1',
  'Bac +2 / BTS / DUT',
  'Licence / Bac +3',
  'Master / Bac +5',
  'Doctorat',
  'Autre',
];

const CandidatureModal = ({ competition, user, onClose }) => {
  const [form, setForm] = useState({
    academic_level: '',
    birth_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submitAdmission({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone || '',
        academic_level: form.academic_level,
        birth_date: form.birth_date || undefined,
      });
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data;
      setError(typeof msg === 'string' ? msg : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* En-tête */}
        <div className="bg-blue-950 px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1">Candidature</p>
              <h3 className="font-black leading-snug">{competition.title}</h3>
              <p className="text-xs text-blue-300 mt-1">Clôture : {fmtDate(competition.application_deadline)}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 transition-colors shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-black text-slate-900">Candidature envoyée !</p>
              <p className="text-sm text-slate-500">Votre dossier a bien été transmis. Vous recevrez une réponse par email.</p>
              <button
                onClick={onClose}
                className="mt-2 w-full py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Infos pré-remplies */}
              <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Vos informations</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold">Prénom</p>
                    <p className="font-bold text-slate-800">{user.first_name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold">Nom</p>
                    <p className="font-bold text-slate-800">{user.last_name}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-slate-400 font-semibold">Email</p>
                    <p className="font-bold text-slate-800 truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Niveau académique */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Niveau académique actuel <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.academic_level}
                  onChange={(e) => setForm((f) => ({ ...f, academic_level: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                >
                  <option value="">Sélectionner...</option>
                  {ACADEMIC_LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Date de naissance */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Date de naissance</label>
                <input
                  type="date"
                  value={form.birth_date}
                  onChange={(e) => setForm((f) => ({ ...f, birth_date: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {loading ? 'Envoi...' : 'Envoyer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Onglet Concours ouverts ──────────────────────────────────────────────────

const ConcoursTab = ({ competitions, loading, error }) => {
  const { user } = useUserStore();
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h2 className="text-base font-black text-slate-900">Concours ouverts</h2>
        {!loading && !error && (
          <p className="text-xs text-slate-400 mt-0.5">{competitions.length} concours disponible{competitions.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Impossible de charger les concours. Veuillez réessayer.</p>
        </div>
      )}

      {!loading && !error && competitions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138z" />
          </svg>
          <p className="text-sm font-semibold text-slate-400">Aucun concours ouvert pour le moment.</p>
          <p className="text-xs text-slate-400 mt-1">Activez les alertes pour être notifié à l'ouverture du prochain concours.</p>
        </div>
      ) : !loading && !error && (
        <div className="space-y-3">
          {competitions.map((c) => {
            const daysLeft = daysUntil(c.application_deadline);
            const isUrgent = daysLeft !== null && daysLeft <= 14;

            return (
              <div key={c.slug} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-black text-slate-900 leading-snug">{c.title}</h3>
                  {daysLeft !== null && daysLeft > 0 && (
                    <span className={`shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full
                      ${isUrgent ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      J-{daysLeft}
                    </span>
                  )}
                </div>

                {c.description && (
                  <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                )}

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-50 rounded-xl px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Clôture dépôts</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{fmtDate(c.application_deadline)}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Date concours</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{fmtDate(c.competition_date)}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCompetition(c)}
                  className="w-full py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Soumettre ma candidature
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedCompetition && user && (
        <CandidatureModal
          competition={selectedCompetition}
          user={user}
          onClose={() => setSelectedCompetition(null)}
        />
      )}
    </div>
  );
};

// ─── Onglet Mes candidatures ──────────────────────────────────────────────────

const CandidaturesTab = ({ admissions, loading, error }) => {
  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h2 className="text-base font-black text-slate-900">Mes candidatures</h2>
        {!loading && !error && (
          <p className="text-xs text-slate-400 mt-0.5">{admissions.length} candidature{admissions.length !== 1 ? 's' : ''} au total</p>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Impossible de charger vos candidatures. Veuillez réessayer.</p>
        </div>
      )}

      {!loading && !error && admissions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm font-semibold text-slate-400">Vous n'avez pas encore soumis de candidature.</p>
        </div>
      ) : !loading && !error && (
        <div className="space-y-3">
          {admissions.map((c) => {
            const s = STATUS_CONFIG[c.status] || STATUS_CONFIG.new;
            return (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 leading-snug">{c.competition_title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.program_label}</p>
                  </div>
                  <span className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Niveau : <span className="font-semibold text-slate-700">{c.academic_level}</span></span>
                  <span>Soumise le <span className="font-semibold text-slate-700">{fmtDate(c.submitted_at)}</span></span>
                </div>

                {/* Barre de progression selon statut */}
                <div className="mt-4 flex items-center gap-1">
                  {['new', 'contacted', 'converted'].map((step, i) => {
                    const steps = ['new', 'contacted', 'converted'];
                    const currentIdx = steps.indexOf(c.status);
                    const isClosed = c.status === 'closed';
                    const isDone = !isClosed && i <= currentIdx;

                    return (
                      <div key={step} className="flex items-center gap-1 flex-1">
                        <div className={`h-1.5 flex-1 rounded-full transition-colors
                          ${isClosed ? 'bg-slate-200' : isDone ? 'bg-blue-900' : 'bg-slate-200'}`}
                        />
                        {i === 2 && (
                          <div className={`w-3 h-3 rounded-full border-2 shrink-0
                            ${isClosed ? 'border-slate-300 bg-white' : isDone ? 'border-blue-900 bg-blue-900' : 'border-slate-300 bg-white'}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mt-1">
                  <span className="text-slate-400">Reçue</span>
                  <span className="text-slate-400">En cours</span>
                  <span className="text-slate-400">Admis</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

// ─── Onglet Alertes ───────────────────────────────────────────────────────────

const AlertesTab = ({ subscribed, onSubscribe }) => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async () => {
    setLoading(true);
    setError(null);
    try {
      if (subscribed) {
        await unsubscribeFromAlerts(user.email);
        onSubscribe(false);
      } else {
        await subscribeToAlerts(user.email);
        onSubscribe(true);
      }
    } catch {
      setError(subscribed
        ? 'Le désabonnement a échoué. Veuillez réessayer.'
        : "L'abonnement a échoué. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h2 className="text-base font-black text-slate-900">Alertes concours</h2>
        <p className="text-xs text-slate-400 mt-0.5">Gérez vos notifications par email.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Notifications d'ouverture de concours</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Recevez un email dès qu'un nouveau concours est ouvert sur la plateforme ARSTM.
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={loading}
            className={`relative shrink-0 w-12 h-6 rounded-full transition-colors duration-200 disabled:opacity-60
              ${subscribed ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            {loading ? (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              </span>
            ) : (
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
                ${subscribed ? 'translate-x-6' : 'translate-x-0'}`}
              />
            )}
          </button>
        </div>

        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
          ${subscribed ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-500'}`}>
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {subscribed
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            }
          </svg>
          {subscribed
            ? `Alertes actives — notifications envoyées à ${user?.email}`
            : 'Alertes désactivées — vous ne serez pas notifié'
          }
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── Onglet Profil ────────────────────────────────────────────────────────────

const ProfilTab = () => {
  const { user, updateProfile, loading, error, clearError } = useUserStore();
  const [success, setSuccess] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [base, setBase] = useState(() => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
  }));

  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarLoading(true);
    const fd = new FormData();
    fd.append('avatar', file);
    await updateProfile(fd);
    setAvatarLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setSuccess(false);
    const { ok } = await updateProfile({
      first_name: base.first_name,
      last_name: base.last_name,
      phone: base.phone,
    });
    if (ok) setSuccess(true);
  };

  if (!user) return null;

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Identité</p>

        {/* Avatar + infos */}
        <div className="flex items-center gap-5 mb-5">
          <div className="relative shrink-0">
            <label className="cursor-pointer block">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center border-2 border-white shadow-md">
                {avatarLoading ? (
                  <span className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-600 rounded-full animate-spin" />
                ) : user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-black text-amber-700">{initials}</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-blue-950 hover:bg-blue-800 text-white rounded-full shadow-lg transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-lg font-black text-slate-900 truncate">{user.first_name} {user.last_name}</p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
            <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Candidat
            </span>
          </div>
        </div>

        {success && <div className="mb-4"><SuccessBanner /></div>}
        {error && <div className="mb-4"><ErrorBanner error={error} /></div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CommonFields base={base} setBase={(fn) => { clearError(); setSuccess(false); setBase(fn); }} />
          <div className="flex justify-end pt-2">
            <SaveBtn loading={loading && !avatarLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Composant principal ──────────────────────────────────────────────────────

const CandidatSpace = () => {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState('accueil');
  const [competitions, setCompetitions] = useState([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(true);
  const [competitionsError, setCompetitionsError] = useState(false);
  const [admissions, setAdmissions] = useState([]);
  const [admissionsLoading, setAdmissionsLoading] = useState(true);
  const [admissionsError, setAdmissionsError] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetchMyCompetitions()
      .then((data) => setCompetitions(data))
      .catch(() => setCompetitionsError(true))
      .finally(() => setCompetitionsLoading(false));

    fetchMyAdmissions()
      .then((data) => setAdmissions(data))
      .catch(() => setAdmissionsError(true))
      .finally(() => setAdmissionsLoading(false));

    getAlertStatus()
      .then((data) => setSubscribed(data.subscribed ?? false))
      .catch(() => {});
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Bandeau */}
      <div className="bg-blue-950 rounded-3xl px-6 pt-6 pb-0 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
            Espace Candidat
          </span>
          <h1 className="text-2xl font-black tracking-tight mt-0.5">
            {user.first_name} {user.last_name}
          </h1>
        </div>

        {/* Onglets */}
        <div className="relative z-10 flex gap-1 overflow-x-auto pb-0 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold whitespace-nowrap rounded-t-xl transition-colors
                ${activeTab === tab.id
                  ? 'bg-slate-50 text-blue-950'
                  : 'text-amber-200 hover:text-white hover:bg-white/10'
                }`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu */}
      {activeTab === 'accueil'      && <AccueilTab onNavigate={setActiveTab} competitions={competitions} admissions={admissions} subscribed={subscribed} />}
      {activeTab === 'concours'     && <ConcoursTab competitions={competitions} loading={competitionsLoading} error={competitionsError} />}
      {activeTab === 'candidatures' && <CandidaturesTab admissions={admissions} loading={admissionsLoading} error={admissionsError} />}
      {activeTab === 'alertes'      && (
        <AlertesTab
          subscribed={subscribed}
          onSubscribe={setSubscribed}
        />
      )}
    </div>
  );
};

export default CandidatSpace;
