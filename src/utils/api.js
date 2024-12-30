import axios from 'axios';
import { apiUrl } from '../services/auth';

const api = axios.create({baseURL: apiUrl});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;