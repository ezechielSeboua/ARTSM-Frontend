import { useState, useEffect } from 'react';
import useUserManagementStore from '../../../stores/useUserManagementStore';
import useSchoolStore from '../../../stores/useSchoolStore';
import { Th, DeleteBtn, SubTabBtn, CountBadge, LoadingSpinner, EmptyState } from './shared';

const EtudiantsTab = ({ canEdit = false }) => {
  const [subTab, setSubTab] = useState('pending');
  const [approvingId, setApprovingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { byRole, pending, loading, fetchAll, fetchPending, approveStudent, deleteUser } = useUserManagementStore();
  const { schools, fetchSchools } = useSchoolStore();

  const students = byRole.student;
  const schoolName = (id) => schools.find(s => s.id === id)?.name || `#${id}`;

  useEffect(() => {
    fetchAll();
    fetchPending();
    if (schools.length === 0) fetchSchools();
  }, []);



  const handleApprove = async (id) => {
    setApprovingId(id);
    await approveStudent(id);
    setApprovingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression de cet étudiant ?')) return;
    setDeletingId(id);
    await deleteUser(id, 'student');
    setDeletingId(null);
  };

  const displayed = subTab === 'pending' ? pending : students;


  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <SubTabBtn active={subTab === 'pending'} onClick={() => setSubTab('pending')}>
          En attente <CountBadge n={pending.length} warn />
        </SubTabBtn>
        <SubTabBtn active={subTab === 'all'} onClick={() => setSubTab('all')}>
          Tous <CountBadge n={students.length} />
        </SubTabBtn>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : displayed.length === 0 ? (
        <EmptyState message={subTab === 'pending' ? 'Aucun dossier en attente.' : 'Aucun étudiant enregistré.'} />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <Th>Étudiant</Th>
                  <Th>Email</Th>
                  <Th>Matricule</Th>
                  <Th>École</Th>
                  <Th>Niveau</Th>
                  <Th>Nationalité</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {displayed.map(s => {
                  const matricule = subTab === 'pending' ? s.matricule        : s.student_profile?.matricule;
                  const school    = subTab === 'pending' ? s.school           : (s.student_profile?.school ? schoolName(s.student_profile.school) : null);
                  const level     = subTab === 'pending' ? s.current_year              : s.student_profile?.current_year;
                  const nat       = subTab === 'pending' ? s.nationality             : s.student_profile?.nationality;
                  return (
                    <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{s.last_name} {s.first_name}</td>
                      <td className="px-4 py-3 text-slate-500 truncate max-w-[180px]">{s.email}</td>
                      <td className="px-4 py-3 text-slate-500">{matricule || '—'}</td>
                      <td className="px-4 py-3 text-slate-500">{school || '—'}</td>
                      <td className="px-4 py-3 text-slate-500">{level || '—'}</td>
                      <td className="px-4 py-3 text-slate-500">{nat || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {subTab === 'pending' && (
                            <button
                              onClick={() => handleApprove(s.id)}
                              disabled={approvingId === s.id}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                            >
                              {approvingId === s.id ? '...' : 'Approuver'}
                            </button>
                          )}
                          {subTab === 'all' && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap
                              ${s.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                              {s.is_active ? 'Actif' : 'En attente'}
                            </span>
                          )}
                          {canEdit && <DeleteBtn id={s.id} deletingId={deletingId} onDelete={handleDelete} />}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EtudiantsTab;
