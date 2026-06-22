import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attache automatiquement le token JWT à chaque requête
// Supprime Content-Type pour FormData (le browser pose le bon boundary)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof FormData) delete config.headers['Content-Type'];
  return config;
});

// Tente un refresh si le token est expiré (401)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/token/refresh/`,
            { refresh }
          );
          localStorage.setItem('access_token', data.access);
          original.headers.Authorization = `Bearer ${data.access}`;
          return apiClient(original);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.dispatchEvent(new Event('auth:logout'));
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
