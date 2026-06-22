import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SuccessCard from "../../../components/SuccessCard";
import Logo from "../../../components/Logo";
import useUserStore from "../../../stores/useUserStore";
import useSchoolStore from "../../../stores/useSchoolStore";

const inputCls =
  "w-full rounded-2xl bg-slate-50 border border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all outline-none";

const CandidateRegisterForm = () => {
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    birth_date: "",
    nationality: "",
    phone: "",
    school: "",
    current_year: "",
    email: "",
    matricule: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { register, loading: regLoading, error, clearError } = useUserStore();
  const { schools, loading: schoolsLoading, fetchSchools } = useSchoolStore();

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleChange = (e) => {
    if (error) clearError();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      role: "student",
      phone: formData.phone,
      profile: {
        school: Number(formData.school),
        current_year: formData.current_year,
        nationality: formData.nationality,
        birth_date: formData.birth_date,
        matricule: formData.matricule,
      },
    };
    const ok = await register(payload);
    if (ok) setSubmitted(true);
  };

  const errorMsg = error
    ? typeof error === "string"
      ? error
      : error.detail || error.email?.[0] || "Une erreur est survenue"
    : null;

  if (submitted) {
    return (
      <SuccessCard
        email={formData.email}
        title="Dossier reçu !"
        message="Votre dossier d'inscription a été transmis. Un administrateur vérifiera votre dossier et vous recevrez vos accès par email après validation."
        primaryActionLabel="Retourner à l'accueil"
        onPrimaryAction={() => (window.location.href = "/")}
      />
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-0 sm:py-10 px-0 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-x-hidden">
      <nav className="hidden sm:flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 items-center justify-between relative z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center bg-white w-14 h-14 rounded-2xl shadow-sm border border-slate-100">
            <a href="/acceuil">
              <Logo size={100} />
            </a>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <span className="font-black text-blue-950 tracking-tight text-sm uppercase">
            Portail ARSTM
          </span>
        </div>
      </nav>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-40 top-0 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full sm:max-w-2xl bg-white sm:rounded-3xl border-0 sm:border border-slate-200/60 shadow-2xl shadow-slate-200/50 overflow-hidden relative z-10 mt-0 sm:mt-16 rounded-none">
        <div className="bg-blue-950 text-white p-4 sm:p-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="sm:hidden flex-shrink-0 bg-white rounded-xl p-1.5">
                <Logo size={48} />
              </div>
              <div>
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] bg-white/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full inline-block mb-1.5 sm:mb-3">
                  Concours & Scolarité
                </span>
                <h1 className="text-lg sm:text-3xl font-black tracking-tight">
                  Inscription élève
                </h1>
              </div>
            </div>
            <Link
              to="/choix-profil"
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 hover:text-white flex-shrink-0"
              aria-label="Retour"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-10 space-y-4 sm:space-y-8"
        >
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Étape 1 — État civil */}
          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">
                1
              </span>
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                État Civil & Contact
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  Nom de famille *
                </label>
                <input
                  required
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Ex : KOUAME"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  Prénoms *
                </label>
                <input
                  required
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Ex : Jean Marc"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  Date de naissance *
                </label>
                <input
                  required
                  type="date"
                  name="birth_date"
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  Nationalité *
                </label>
                <input
                  required
                  type="text"
                  name="nationality"
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Ex : Ivoirienne"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="vous@exemple.com"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  Téléphone *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="+225 XX XX XX XX"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  Matricule *
                </label>
                <input
                  required
                  type="text"
                  name="matricule"
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="MR-10445-3009"
                />
              </div>
            </div>
          </div>

          {/* Étape 2 — Choix académique */}
          <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">
                2
              </span>
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                Choix Académique
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  École ciblée *
                </label>
                <select
                  required
                  name="school"
                  onChange={handleChange}
                  className={inputCls}
                  disabled={schoolsLoading}
                >
                  <option value="">
                    {schoolsLoading
                      ? "Chargement..."
                      : "Sélectionnez une école..."}
                  </option>
                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-1.5 uppercase tracking-wide">
                  Niveau actuel / visé *
                </label>
                <select
                  required
                  name="current_year"
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="">Sélectionnez...</option>
                  <option value="BAC">BAC</option>
                  <option value="BTS">BTS</option>
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={regLoading || schoolsLoading}
            className="w-full py-3 sm:py-4 bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white font-bold rounded-2xl shadow-xl shadow-blue-950/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
          >
            {regLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Soumettre le dossier</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateRegisterForm;
