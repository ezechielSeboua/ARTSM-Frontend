import { useState, useEffect } from 'react';
import useUserManagementStore from '../../../stores/useUserManagementStore';
import { Th, DeleteBtn, LoadingSpinner, EmptyState } from './shared';

const ChercheursTabs = () => {
  const [deletingId, setDeletingId] = useState(null);
  const { byRole, loading, fetchAll, deleteUser } = useUserManagementStore();
  const users = byRole.researcher;

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression de ce chercheur ?')) return;
    setDeletingId(id);
    await deleteUser(id, 'researcher');
    setDeletingId(null);
  };

  if (loading) return <LoadingSpinner />;
  if (users.length === 0) return <EmptyState message="Aucun chercheur enregistré." />;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <Th>Nom</Th>
              <Th>Email</Th>
              <Th>Titre</Th>
              <Th>Institution</Th>
              <Th>Pays</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
              const p = u.researcher_profile;
              return (
                <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{u.last_name} {u.first_name}</td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-[180px]">{u.email}</td>
                  <td className="px-4 py-3 text-slate-500">{p?.academic_title || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{p?.institution || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{p?.country || '—'}</td>
                  <td className="px-4 py-3">
                    <DeleteBtn id={u.id} deletingId={deletingId} onDelete={handleDelete} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChercheursTabs;
