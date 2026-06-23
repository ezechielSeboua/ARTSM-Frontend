import apiClient from './client';

export const getAlertStatus = () =>
  apiClient.get('/api/events/competitions/alert-status/').then((r) => r.data);

export const subscribeToAlerts = (email) =>
  apiClient.post('/api/events/subscribe-competition-alert/', { email }).then((r) => r.data);

export const unsubscribeFromAlerts = (email) =>
  apiClient.delete('/api/events/subscribe-competition-alert/', { data: { email } }).then((r) => r.data);
