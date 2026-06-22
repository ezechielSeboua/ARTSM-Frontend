import { create } from 'zustand';
import apiClient from '../api/client';

const useDomainStore = create((set) => ({
  domains: [],
  loading: false,
  error: null,

  fetchDomains: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/api/academic/domains/');
      set({ domains: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'Impossible de charger les filières', loading: false });
    }
  },

  createDomain: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/api/academic/domains/', payload);
      set(state => ({ domains: [...state.domains, data], loading: false }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la création';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  updateDomain: async (slug, payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.patch(`/api/academic/domains/${slug}/`, payload);
      set(state => ({
        domains: state.domains.map(d => d.slug === slug ? data : d),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la mise à jour';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  deleteDomain: async (slug) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/api/academic/domains/${slug}/`);
      set(state => ({
        domains: state.domains.filter(d => d.slug !== slug),
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

export default useDomainStore;
