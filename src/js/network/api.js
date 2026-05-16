import axios from 'axios';
import { Auth } from '../utils/auth';

const api = axios.create({
  baseURL: 'https://story-api.dicoding.dev/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor Request: Tambahkan Bearer Token otomatis jika ada
api.interceptors.request.use(
  (config) => {
    const token = Auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor Response: Handle error global
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Jika token kedaluwarsa atau tidak valid
    if (error.response && error.response.status === 401) {
      Auth.clearToken();
      window.location.replace('/login.html');
    }
    return Promise.reject(error);
  }
);

export default api;
