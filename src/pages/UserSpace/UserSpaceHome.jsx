import useUserStore from '../../stores/useUserStore';
import EtudiantSpace from './espaces/EtudiantSpace';
import ProfessionnelSpace from './espaces/ProfessionnelSpace';
import RecruteurSpace from './espaces/RecruteurSpace';
import ChercheurSpace from './espaces/ChercheurSpace';
import BailleurSpace from './espaces/BailleurSpace';

const SPACES = {
  student: EtudiantSpace,
  professional: ProfessionnelSpace,
  recruiter: RecruteurSpace,
  researcher: ChercheurSpace,
  donor: BailleurSpace,
};

const UserSpaceHome = () => {
  const { user } = useUserStore();

  if (!user) return (
    <div className="flex justify-center py-16">
      <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
    </div>
  );

  const SpaceComponent = SPACES[user.role];
  if (!SpaceComponent) return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 font-medium">
      Espace non disponible pour ce rôle.
    </div>
  );

  return <SpaceComponent />;
};

export default UserSpaceHome;
