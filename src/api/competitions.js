import apiClient from './client';

export const fetchMyCompetitions = () =>
  apiClient.get('/api/events/competitions/mine/').then((r) => r.data);
