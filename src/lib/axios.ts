import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.100:3002';

const api = axios.create({
  baseURL,
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI4MDQ5MDA0LCJleHAiOjE3MzA2NDEwMDR9.VZ12fltfjjNi4ORyH2g9UIBmdAv6ACtPlpzUvGeuzA4'
  },
});

api.interceptors.request.use(
  config => {
    console.log(`Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log(`Response: ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    console.error('Response error:', error.message);
    return Promise.reject(error);
  }
);

export default api;