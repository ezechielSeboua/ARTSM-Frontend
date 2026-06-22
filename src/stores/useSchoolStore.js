import { create } from 'zustand';
import apiClient from '../api/client';

const useSchoolStore = create((set, get) => ({
  schools: [],
  school: null,
  loading: false,
  error: null,

  fetchSchools: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/api/institution/schools/');
      set({ schools: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'Erreur lors du chargement des écoles', loading: false });
    }
  },

  fetchSchool: async (slug) => {
    set({ loading: true, error: null, school: null });
    try {
      const { data } = await apiClient.get(`/api/institution/schools/${slug}/`);
      set({ school: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'École introuvable', loading: false });
    }
  },

  createSchool: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/api/institution/schools/', payload);
      set(state => ({ schools: [...state.schools, data], loading: false }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la création';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  updateSchool: async (slug, payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.patch(`/api/institution/schools/${slug}/`, payload);
      set(state => ({
        schools: state.schools.map(s => s.slug === slug ? data : s),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la mise à jour';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  deleteSchool: async (slug) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/api/institution/schools/${slug}/`);
      set(state => ({
        schools: state.schools.filter(s => s.slug !== slug),
        loading: false,
      }));
      return { ok: true };
    } catch (err) {
      const error = err.response?.data || 'Erreur lors de la suppression';
      set({ error, loading: false });
      return { ok: false, error };
    }
  },

  clearSchool: () => set({ school: null, error: null }),
  clearError: () => set({ error: null }),
}));

export default useSchoolStore;
