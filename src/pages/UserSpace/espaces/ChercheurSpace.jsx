import useUserStore from '../../../stores/useUserStore';
import { ACADEMIC_TITLES_MAP } from './shared';

const ChercheurSpace = () => {
  const { user } = useUserStore();

  if (!user) return null;

  const p = user.researcher_profile || {};
  const displayTitle = ACADEMIC_TITLES_MAP[p.academic_title] || p.academic_title;

  return (
    <div className="bg-blue-950 rounded-3xl px-6 py-6 text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Espace Chercheur</span>
        <h1 className="text-2xl font-black tracking-tight mt-0.5">
          {displayTitle ? `${displayTitle} ` : ''}{user.first_name} {user.last_name}
        </h1>
        {p.institution && (
          <p className="text-emerald-200 text-sm font-semibold mt-1">{p.institution}</p>
        )}
        {displayTitle && (
          <span className="inline-block mt-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-200">
            {displayTitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChercheurSpace;
