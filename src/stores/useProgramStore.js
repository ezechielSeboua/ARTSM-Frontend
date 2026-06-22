import { create } from 'zustand';
import apiClient from '../api/client';

const useProgramStore = create((set) => ({
  programs: [],
  loading: false,
  error: null,

  fetchPrograms: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/api/academic/programs/');
      set({ programs: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'Impossible de charger les formations', loading: false });
    }
  },

  createProgram: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/api/academic/programs/', payload);
      set(state => ({ programs: [...state.programs, data], loading: false }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la création';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  updateProgram: async (slug, payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.patch(`/api/academic/programs/${slug}/`, payload);
      set(state => ({
        programs: state.programs.map(p => p.slug === slug ? data : p),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la mise à jour';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  deleteProgram: async (slug) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/api/academic/programs/${slug}/`);
      set(state => ({
        programs: state.programs.filter(p => p.slug !== slug),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la suppression';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  toggleActive: async (slug, isActive) => {
    try {
      const { data } = await apiClient.patch(`/api/academic/programs/${slug}/`, { is_active: isActive });
      set(state => ({
        programs: state.programs.map(p => p.slug === slug ? data : p),
      }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data || 'Erreur' };
    }
  },

  clearError: () => set({ error: null }),
}));

export default useProgramStore;
