import { create } from 'zustand';
import apiClient from '../api/client';

const useProgramMetaStore = create((set) => ({
  programTypes: [],
  regimes: [],
  loading: false,
  error: null,

  fetchProgramTypes: async () => {
    try {
      const { data } = await apiClient.get('/api/academic/program-types/');
      set({ programTypes: data });
    } catch (_) {}
  },

  fetchRegimes: async () => {
    try {
      const { data } = await apiClient.get('/api/academic/regimes/');
      set({ regimes: data });
    } catch (_) {}
  },

  // ── Types de formation ────────────────────────────────────────────────────

  createProgramType: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/api/academic/program-types/', payload);
      set(state => ({ programTypes: [...state.programTypes, data], loading: false }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la création';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  updateProgramType: async (code, payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.patch(`/api/academic/program-types/${code}/`, payload);
      set(state => ({
        programTypes: state.programTypes.map(t => t.code === code ? data : t),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la mise à jour';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  deleteProgramType: async (code) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/api/academic/program-types/${code}/`);
      set(state => ({
        programTypes: state.programTypes.filter(t => t.code !== code),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la suppression';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  // ── Régimes ───────────────────────────────────────────────────────────────

  createRegime: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/api/academic/regimes/', payload);
      set(state => ({ regimes: [...state.regimes, data], loading: false }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la création';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  updateRegime: async (code, payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.patch(`/api/academic/regimes/${code}/`, payload);
      set(state => ({
        regimes: state.regimes.map(r => r.code === code ? data : r),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la mise à jour';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  deleteRegime: async (code) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/api/academic/regimes/${code}/`);
      set(state => ({
        regimes: state.regimes.filter(r => r.code !== code),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la suppression';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  clearError: () => set({ error: null }),
}));

export default useProgramMetaStore;
