import { useState, useEffect } from "react";
import useUserManagementStore from "../../../stores/useUserManagementStore";
import { Th, DeleteBtn, LoadingSpinner, EmptyState } from "./shared";

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "moderator",
  profile: { department: "", employee_id: "" },
};

const ROLE_BADGE = {
  admin: "bg-red-50 text-red-700",
  moderator: "bg-amber-50 text-amber-700",
};

const AgentsTab = ({ canEdit = false }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { byRole, loading, fetchAll, deleteUser } = useUserManagementStore();
  const agents = [...(byRole.admin || []), ...(byRole.moderator || [])];

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id, role) => {
    if (!window.confirm("Confirmer la suppression de cet agent ?")) return;
    setDeletingId(id);
    await deleteUser(id, role);
    setDeletingId(null);
  };

  const myAgents = agents.filter((agent) => agent.email !== "aka.konin@gmail.com");

  return (
    <div className="space-y-4">
      {canEdit && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nouvel agent
          </button>
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : agents.length === 0 ? (
        <EmptyState message="Aucun agent enregistré." />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <Th>Nom</Th>
                  <Th>Email</Th>
                  <Th>Téléphone</Th>
                  <Th>ID Agent</Th>
                  <Th>Département</Th>
                  <Th>Rôle</Th>
                  <Th>Depuis</Th>
                  {canEdit && <Th>Action</Th>}
                </tr>
              </thead>
              <tbody>
                {myAgents.map((u) => {
                  const sp = u.staff_profile;
                  return (
                    <tr
                      key={u.id}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                        {u.last_name} {u.first_name}
                      </td>
                      <td className="px-4 py-3 text-slate-500 truncate max-w-[180px]">
                        {u.email}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                        {u.phone || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {sp?.employee_id ? (
                          <span className="font-mono text-xs font-bold text-blue-950 bg-blue-50 px-2 py-0.5 rounded-md">
                            {sp.employee_id}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-500 max-w-[200px] truncate">
                        {sp?.department || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${ROLE_BADGE[u.role]}`}
                        >
                          {u.role === "admin" ? "Admin" : "Modérateur"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                        {u.date_joined
                          ? new Date(u.date_joined).toLocaleDateString("fr-FR")
                          : "—"}
                      </td>
                      {canEdit && (
                        <td className="px-4 py-3">
                          <DeleteBtn
                            id={u.id}
                            deletingId={deletingId}
                            onDelete={() => handleDelete(u.id, u.role)}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {canEdit && showModal && <AgentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

// ─── Modal création ───────────────────────────────────────────────────────────

const AgentModal = ({ onClose }) => {
  const { createAgent, loading } = useUserManagementStore();
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    profile: { ...EMPTY_FORM.profile },
  });
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, api: undefined }));
  };

  const setProfile = (field, value) => {
    setForm((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = "Requis.";
    if (!form.last_name.trim()) e.last_name = "Requis.";
    if (!form.email.trim()) e.email = "Requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const payload = { ...form };
    if (!payload.phone) delete payload.phone;
    if (!payload.profile.department && !payload.profile.employee_id)
      delete payload.profile;

    const result = await createAgent(payload);
    if (result.ok) {
      onClose();
    } else {
      const raw = result.error;
      setErrors({ api: typeof raw === "string" ? raw : JSON.stringify(raw) });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-lg font-black text-blue-950">
            Nouvel agent ARSTM
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {errors.api && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700 font-medium">
              {errors.api}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom *" error={errors.first_name}>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => setField("first_name", e.target.value)}
                placeholder="Jean"
                className={inputCls(errors.first_name)}
              />
            </Field>
            <Field label="Nom *" error={errors.last_name}>
              <input
                type="text"
                value={form.last_name}
                onChange={(e) => setField("last_name", e.target.value)}
                placeholder="DUPONT"
                className={inputCls(errors.last_name)}
              />
            </Field>
          </div>

          <Field label="Email *" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="agent@arstm.ci"
              className={inputCls(errors.email)}
            />
          </Field>

          <Field label="Téléphone">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+225 07 00 00 00 00"
              className={inputCls()}
            />
          </Field>

          <Field label="Rôle">
            <select
              value={form.role}
              onChange={(e) => setField("role", e.target.value)}
              className={inputCls()}
            >
              <option value="moderator">Modérateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </Field>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Profil agent (optionnel)
            </p>
            <div className="space-y-3">
              <Field label="ID Agent">
                <input
                  type="text"
                  value={form.profile.employee_id}
                  onChange={(e) => setProfile("employee_id", e.target.value)}
                  placeholder="ARSTM-MOD-001"
                  className={inputCls()}
                />
              </Field>
              <Field label="Département">
                <input
                  type="text"
                  value={form.profile.department}
                  onChange={(e) => setProfile("department", e.target.value)}
                  placeholder="Direction des Études et de la Scolarité"
                  className={inputCls()}
                />
              </Field>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Un mot de passe temporaire sera envoyé par email à l'agent.
          </p>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 shrink-0">
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
            className="px-5 py-2.5 bg-blue-950 text-white text-sm font-bold rounded-xl hover:bg-blue-900 disabled:opacity-60 transition-colors flex items-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            Créer l'agent
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
    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
  </div>
);

export default AgentsTab;
