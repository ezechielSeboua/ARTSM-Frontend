import { useState, useEffect, useRef } from "react";
import useSchoolStore from "../../stores/useSchoolStore";
import useUserStore from "../../stores/useUserStore";

const ADMIN_ROLES = ["admin", "moderator"];

const EMPTY_FORM = {
  name: "",
  description: "",
  director_name: "",
  founded_year: "",
  accreditation: "",
  address: "",
  city: "",
  country: "",
  phone: "",
  email: "",
  website_url: "",
  presentation_video_url: "",
};

// ─── Page principale ──────────────────────────────────────────────────────────

const EcolesPage = () => {
  const { schools, loading, fetchSchools, deleteSchool } = useSchoolStore();
  const { user } = useUserStore();
  const isAdmin = ADMIN_ROLES.includes(user?.role);

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [deletingSlug, setDeletingSlug] = useState(null);

  useEffect(() => { fetchSchools(); }, [fetchSchools]);

  const filtered = schools.filter(
    (s) => !search || s.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (slug) => {
    if (!window.confirm("Supprimer cette école définitivement ?")) return;
    setDeletingSlug(slug);
    await deleteSchool(slug);
    setDeletingSlug(null);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Écoles</h1>
          <p className="text-sm text-slate-500 mt-1">
            {schools.length} établissement{schools.length !== 1 ? "s" : ""} membre{schools.length !== 1 ? "s" : ""} de l'ARSTM.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-56 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
          />
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

      {/* Contenu */}
      {loading && schools.length === 0 ? (
        <div className="flex justify-center py-16">
          <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="text-slate-400 font-medium">
            {schools.length === 0 ? "Aucune école enregistrée." : "Aucun résultat pour cette recherche."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <SchoolCard
              key={s.slug}
              school={s}
              isAdmin={isAdmin}
              deleting={deletingSlug === s.slug}
              onEdit={() => setModal({ mode: "edit", school: s })}
              onDelete={() => handleDelete(s.slug)}
            />
          ))}
        </div>
      )}

      {modal && (
        <SchoolModal
          mode={modal.mode}
          initial={modal.mode === "edit" ? modal.school : null}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

// ─── Carte école ──────────────────────────────────────────────────────────────

const SchoolCard = ({ school: s, isAdmin, deleting, onEdit, onDelete }) => {
  const location = [s.city, s.country].filter(Boolean).join(", ");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      {/* Image */}
      <div className="h-32 bg-gradient-to-br from-blue-950 to-blue-800 flex items-center justify-center shrink-0 relative">
        {s.featured_image ? (
          <img src={s.featured_image} alt={s.name} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        )}
        {/* Badges sur l'image */}
        {s.accreditation && (
          <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-sm">
            {s.accreditation}
          </span>
        )}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button onClick={onEdit}
              className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg transition-colors backdrop-blur-sm" title="Modifier">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button onClick={onDelete} disabled={deleting}
              className="p-1.5 bg-white/20 hover:bg-red-500/70 text-white rounded-lg transition-colors backdrop-blur-sm disabled:opacity-40" title="Supprimer">
              {deleting
                ? <span className="w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin block" />
                : <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
              }
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow gap-2">
        <div>
          <h3 className="font-black text-slate-900 leading-snug">{s.name}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {location && (
              <span className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            )}
            {s.founded_year && (
              <span className="text-[11px] text-slate-400 font-semibold">· {s.founded_year}</span>
            )}
          </div>
          {s.director_name && (
            <p className="text-[11px] text-slate-500 mt-0.5">Dir. {s.director_name}</p>
          )}
        </div>

        {s.description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-grow">{s.description}</p>
        )}

        {/* Infos de contact */}
        {(s.phone || s.email) && (
          <div className="flex flex-wrap gap-3 pt-1 border-t border-slate-100">
            {s.phone && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {s.phone}
              </span>
            )}
            {s.email && (
              <a href={`mailto:${s.email}`} className="flex items-center gap-1 text-xs text-blue-700 hover:underline">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {s.email}
              </a>
            )}
          </div>
        )}

        {/* Liens */}
        {(s.website_url || s.presentation_video_url) && (
          <div className="flex flex-wrap gap-3 pt-1 border-t border-slate-100">
            {s.website_url && (
              <a href={s.website_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-700 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Site web
              </a>
            )}
            {s.presentation_video_url && (
              <a href={s.presentation_video_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Vidéo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Modal création / édition ─────────────────────────────────────────────────

const SchoolModal = ({ mode, initial, onClose }) => {
  const { createSchool, updateSchool, loading } = useSchoolStore();
  const imageInputRef = useRef(null);

  const [form, setForm] = useState(() =>
    initial
      ? {
          name: initial.name || "",
          description: initial.description || "",
          director_name: initial.director_name || "",
          founded_year: initial.founded_year ?? "",
          accreditation: initial.accreditation || "",
          address: initial.address || "",
          city: initial.city || "",
          country: initial.country || "",
          phone: initial.phone || "",
          email: initial.email || "",
          website_url: initial.website_url || "",
          presentation_video_url: initial.presentation_video_url || "",
        }
      : { ...EMPTY_FORM },
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initial?.featured_image || null);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, api: undefined }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Le nom est requis.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    let payload;
    if (imageFile) {
      const fd = new FormData();
      fd.append("featured_image", imageFile);
      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) {
          fd.append(k, k === "founded_year" ? Number(v) : v);
        }
      });
      payload = fd;
    } else {
      payload = { ...form };
      ["director_name", "accreditation", "address", "city", "country",
       "phone", "email", "website_url", "presentation_video_url"].forEach(k => {
        if (!payload[k]) delete payload[k];
      });
      if (!payload.founded_year) delete payload.founded_year;
      else payload.founded_year = Number(payload.founded_year);
    }

    const result = mode === "create"
      ? await createSchool(payload)
      : await updateSchool(initial.slug, payload);

    if (result.ok) {
      onClose();
    } else {
      const raw = result.error;
      setErrors({ api: typeof raw === "string" ? raw : JSON.stringify(raw) });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <h2 className="text-lg font-black text-blue-950">
            {mode === "create" ? "Ajouter une école" : `Modifier — ${initial?.name}`}
          </h2>
          <button onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errors.api && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700 font-medium">
              {errors.api}
            </div>
          )}

          {/* Identification */}
          <section className="space-y-4">
            <SectionTitle>Identification</SectionTitle>
            <Field label="Nom de l'établissement *" error={errors.name}>
              <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="École Supérieure de Navigation" className={inputCls(errors.name)} />
            </Field>
            <Field label="Description">
              <textarea rows={4} value={form.description} onChange={e => set("description", e.target.value)}
                placeholder="Présentation de l'établissement, filières proposées..."
                className={inputCls() + " resize-none"} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Directeur / Responsable">
                <input type="text" value={form.director_name} onChange={e => set("director_name", e.target.value)}
                  placeholder="Dr. Jean Dupont" className={inputCls()} />
              </Field>
              <Field label="Année de fondation">
                <input type="number" value={form.founded_year} onChange={e => set("founded_year", e.target.value)}
                  placeholder="1995" min="1900" max={new Date().getFullYear()} className={inputCls()} />
              </Field>
            </div>
            <Field label="Accréditation / Tutelle">
              <input type="text" value={form.accreditation} onChange={e => set("accreditation", e.target.value)}
                placeholder="ex: MINTTOUR, OMI, STCW…" className={inputCls()} />
            </Field>
          </section>

          {/* Localisation */}
          <section className="space-y-4">
            <SectionTitle>Localisation</SectionTitle>
            <Field label="Adresse">
              <input type="text" value={form.address} onChange={e => set("address", e.target.value)}
                placeholder="01 BP 1234, Zone Portuaire" className={inputCls()} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Ville">
                <input type="text" value={form.city} onChange={e => set("city", e.target.value)}
                  placeholder="Abidjan" className={inputCls()} />
              </Field>
              <Field label="Pays">
                <input type="text" value={form.country} onChange={e => set("country", e.target.value)}
                  placeholder="Côte d'Ivoire" className={inputCls()} />
              </Field>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <SectionTitle>Contact</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Téléphone">
                <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                  placeholder="+225 27 00 00 00 00" className={inputCls()} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                  placeholder="contact@ecole.ci" className={inputCls(errors.email)} />
              </Field>
            </div>
          </section>

          {/* Médias */}
          <section className="space-y-4">
            <SectionTitle>Médias & Liens</SectionTitle>

            {/* Image principale — upload fichier */}
            <Field label="Image principale">
              <div
                onClick={() => imageInputRef.current?.click()}
                className="relative cursor-pointer group rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-900/40 transition-colors overflow-hidden"
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="aperçu"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-lg">
                        Changer l'image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-semibold">Cliquer pour uploader une image</p>
                    <p className="text-xs">JPG, PNG, WEBP — max 5 Mo</p>
                  </div>
                )}
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Supprimer l'image
                </button>
              )}
            </Field>

            <Field label="Site web">
              <input type="url" value={form.website_url} onChange={e => set("website_url", e.target.value)}
                placeholder="https://ecole.arstm.ci" className={inputCls()} />
            </Field>
            <Field label="URL vidéo de présentation">
              <input type="url" value={form.presentation_video_url} onChange={e => set("presentation_video_url", e.target.value)}
                placeholder="https://youtube.com/watch?v=..." className={inputCls()} />
            </Field>
          </section>
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
            {mode === "create" ? "Créer l'école" : "Enregistrer les modifications"}
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

const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-3">
    <p className="text-[10px] font-black uppercase tracking-widest text-blue-950">{children}</p>
    <div className="flex-1 h-px bg-slate-100" />
  </div>
);

export default EcolesPage;
