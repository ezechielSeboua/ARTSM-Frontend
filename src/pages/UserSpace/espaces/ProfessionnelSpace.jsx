import useUserStore from "../../../stores/useUserStore";
import { SECTORS_MAP } from "./shared";

const ProfessionnelSpace = () => {
  const { user } = useUserStore();

  if (!user) return null;

  const p = user.professional_profile || {};

  return (
    <div className="bg-blue-950 rounded-3xl px-6 py-6 text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">Espace Professionnel</span>
        <h1 className="text-2xl font-black tracking-tight mt-0.5">{user.first_name} {user.last_name}</h1>
        {(p.job_title || p.company_name) && (
          <p className="text-cyan-200 text-sm font-semibold mt-1">
            {p.job_title}{p.job_title && p.company_name ? " · " : ""}{p.company_name}
          </p>
        )}
        {p.sector && (
          <span className="inline-block mt-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-cyan-200">
            {SECTORS_MAP[p.sector] || p.sector}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfessionnelSpace;
