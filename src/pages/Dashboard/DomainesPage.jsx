import { useState, useEffect } from "react";
import useDomainStore from "../../stores/useDomainStore";
import useSchoolStore from "../../stores/useSchoolStore";
import useUserStore from "../../stores/useUserStore";

const ADMIN_ROLES = ["admin", "moderator"];

const EMPTY_FORM = {
  name: "",
  code: "",
  description: "",
  school: "",
  is_active: true,
};

// ─── Page principale ──────────────────────────────────────────────────────────

const DomainesPage = () => {
  const { domains, loading, fetchDomains, deleteDomain } = useDomainStore();
  const { schools, fetchSchools } = useSchoolStore();
  const { user } = useUserStore();
  const isAdmin = ADMIN_ROLES.includes(user?.role);

  const [modal, setModal] = useState(null);
  const [deletingSlug, setDeletingSlug] = useState(null);

  useEffect(() => {
    fetchDomains();
    fetchSchools();
  }, [fetchDomains, fetchSchools]);

  const handleDelete = async (slug) => {
    if (!window.confirm("Supprimer cette filière définitivement ?")) return;
    setDeletingSlug(slug);
    await deleteDomain(slug);
    setDeletingSlug(null);
  };

  // const schoolName = (id) => schools.find((s) => s.id === id || String(s.id) === String(id))?.name;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Filières</h1>
          <p className="text-sm text-slate-500 mt-1">
            {domains.length} filière{domains.length !== 1 ? "s" : ""} académique{domains.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => setModal({ mode: "create" })}
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

      {/* Table */}
      {loading && domains.length === 0 ? (
        <div className="flex justify-center py-16">
          <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
        </div>
      ) : domains.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="text-slate-400 font-medium">Aucune filière enregistrée.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Filière</th>
                {/* <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hidden sm:table-cell">École</th> */}
                {/* <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hidden md:table-cell">Slug</th> */}
                {/* <th className="px-5 py-3 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</th> */}
                {isAdmin && <th className="px-5 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {domains.map((d) => (
                <tr key={d.slug} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{d.name}</p>
                      {d.code && (
                        <span className="inline-block mt-0.5 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                          {d.code}
                        </span>
                      )}
                    </div>
                  </td>
                  {/* <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-sm text-slate-600 font-medium">
                      {schoolName(d.school) || <span className="text-slate-300 italic">—</span>}
                    </span>
                  </td> */}
                  {/* <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs font-mono text-slate-400">{d.slug}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full
                      ${d.is_active !== false ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${d.is_active !== false ? "bg-emerald-500" : "bg-slate-400"}`} />
                      {d.is_active !== false ? "Active" : "Inactive"}
                    </span>
                  </td> */}
                  {isAdmin && (
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setModal({ mode: "edit", domain: d })}
                          className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(d.slug)}
                          disabled={deletingSlug === d.slug}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                          title="Supprimer"
                        >
                          {deletingSlug === d.slug
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

      {modal && (
        <DomainModal
          mode={modal.mode}
          initial={modal.mode === "edit" ? modal.domain : null}
          schools={schools}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

// ─── Modal création / édition ─────────────────────────────────────────────────

const DomainModal = ({ mode, initial, onClose }) => {
  const { createDomain, updateDomain, loading } = useDomainStore();

  const [form, setForm] = useState(() =>
    initial
      ? {
          name: initial.name || "",
          code: initial.code || "",
          description: initial.description || "",
          school: initial.school != null ? String(initial.school) : "",
          is_active: initial.is_active !== false,
        }
      : { ...EMPTY_FORM },
  );
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, api: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Le nom est requis.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = {
      name: form.name.trim(),
      is_active: form.is_active,
    };
    if (form.code.trim()) payload.code = form.code.trim();
    if (form.description.trim()) payload.description = form.description.trim();
    if (form.school) payload.school = Number(form.school);

    const result = mode === "create"
      ? await createDomain(payload)
      : await updateDomain(initial.slug, payload);

    if (result.ok) {
      onClose();
    } else {
      const raw = result.error;
      setErrors({ api: typeof raw === "string" ? raw : JSON.stringify(raw) });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-black text-blue-950">
              {mode === "create" ? "Nouvelle filière" : `Modifier — ${initial?.name}`}
            </h2>
            {mode === "edit" && initial?.slug && (
              <p className="text-xs font-mono text-slate-400 mt-0.5">{initial.slug}</p>
            )}
          </div>
          <button onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
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

          <Field label="Nom de la filière *" error={errors.name}>
            <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
              placeholder="Sciences Nautiques" className={inputCls(errors.name)} />
          </Field>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 shrink-0">
          <button type="button" onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            Annuler
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="px-5 py-2.5 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 disabled:opacity-60 transition-colors flex items-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {mode === "create" ? "Créer la filière" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Utilitaires UI ───────────────────────────────────────────────────────────

const inputCls = (error) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors
  ${error ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-slate-200 focus:ring-blue-900/20 focus:border-blue-900 bg-white"}`;

const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
    {children}
    {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
  </div>
);

export default DomainesPage;
