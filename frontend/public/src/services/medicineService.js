import api from './api';

export const getMedicineCatalog = async () => {
  const response = await api.get('/medicines/catalog');
  return response.data;
};

export const searchMedicines = async (query) => {
  const response = await api.get(`/medicines/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

export const addMedicineEntry = async (entryData) => {
  const response = await api.post('/medicines/entry', entryData);
  return response.data;
};

export const getMedicineHistory = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/medicines/history?${params}`);
  return response.data;
};

