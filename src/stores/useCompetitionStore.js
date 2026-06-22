import { create } from 'zustand';
import apiClient from '../api/client';

const useCompetitionStore = create((set, get) => ({
  competitions: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/api/events/manage/competitions/');
      set({ competitions: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'Erreur de chargement', loading: false });
    }
  },

  createCompetition: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/api/events/manage/competitions/', payload);
      set(state => ({ competitions: [data, ...state.competitions], loading: false }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la création';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  updateCompetition: async (slug, payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.patch(`/api/events/manage/competitions/${slug}/`, payload);
      set(state => ({
        competitions: state.competitions.map(c => c.slug === slug ? data : c),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la mise à jour';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  // Cas particulier : passer is_active de false → true envoie des emails à tous les candidats.
  // Le store sépare ce cas pour que l'UI puisse afficher un avertissement avant d'appeler.
  publishCompetition: async (slug) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.patch(`/api/events/manage/competitions/${slug}/`, { is_active: true });
      set(state => ({
        competitions: state.competitions.map(c => c.slug === slug ? data : c),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la publication';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  deleteCompetition: async (slug) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/api/events/manage/competitions/${slug}/`);
      set(state => ({
        competitions: state.competitions.filter(c => c.slug !== slug),
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

export default useCompetitionStore;
