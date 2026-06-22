import { create } from 'zustand';
import apiClient from '../api/client';

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/api/users/login/', { email, password });
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      const { data: profile } = await apiClient.get('/api/users/profile/');
      set({ isAuthenticated: true, user: profile, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'Identifiants incorrects', loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false, error: null });
  },

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/api/users/profile/');
      set({ user: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data || 'Impossible de charger le profil', loading: false });
    }
  },

  updateProfile: async (payload) => {
    set({ loading: true, error: null });
    try {
      const isFormData = payload instanceof FormData;
      const { data } = await apiClient.patch('/api/users/profile/', payload, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });
      set({ user: data, loading: false });
      return { ok: true };
    } catch (err) {
      set({ error: err.response?.data || 'Mise à jour échouée', loading: false });
      return { ok: false };
    }
  },

  changePassword: async (current_password, new_password, confirm_password) => {
    set({ loading: true, error: null });
    try {
      await apiClient.post('/api/users/change-password/', {
        current_password,
        new_password,
        confirm_password,
      });
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data || 'Changement de mot de passe échoué', loading: false });
      return false;
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      await apiClient.post('/api/users/register/', payload);
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data || "Erreur lors de l'inscription", loading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useUserStore;
