import apiClient from './client';

export const fetchMyAdmissions = () =>
  apiClient.get('/api/interactions/admissions/me/').then((r) => r.data);

export const submitAdmission = (data) =>
  apiClient.post('/api/interactions/admission/', data).then((r) => r.data);
