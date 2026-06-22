import { create } from 'zustand';
import apiClient from '../api/client';

const ROLES = ['student', 'professional', 'recruiter', 'researcher', 'donor', 'admin', 'moderator'];

const useUserManagementStore = create((set, get) => ({
  byRole: { student: [], professional: [], recruiter: [], researcher: [], donor: [], admin: [], moderator: [] },
  pending: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/api/users/');
      const byRole = Object.fromEntries(ROLES.map(r => [r, data.filter(u => u.role === r)]));
      set({ byRole, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'Erreur de chargement', loading: false });
    }
  },

  fetchPending: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/api/users/pending-students/');
      set({ pending: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'Erreur de chargement', loading: false });
    }
  },

  approveStudent: async (id) => {
    try {
      await apiClient.post(`/api/users/${id}/approve/`);
      await get().fetchPending();
      await get().fetchAll();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data || 'Approbation échouée' };
    }
  },

  createAgent: async (payload) => {
    try {
      await apiClient.post('/api/users/create/', payload);
      await get().fetchAll();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data || 'Création échouée' };
    }
  },

  deleteUser: async (id, role) => {
    try {
      await apiClient.delete(`/api/users/${id}/delete/`);
      set(state => ({
        byRole: {
          ...state.byRole,
          [role]: state.byRole[role].filter(u => u.id !== id),
        },
        pending: state.pending.filter(u => u.id !== id),
      }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data || 'Suppression échouée' };
    }
  },

  clearError: () => set({ error: null }),
}));

export default useUserManagementStore;
