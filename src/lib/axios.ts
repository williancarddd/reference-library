import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.100:3002',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI4MDQ5MDA0LCJleHAiOjE3MzA2NDEwMDR9.VZ12fltfjjNi4ORyH2g9UIBmdAv6ACtPlpzUvGeuzA4'
  },
});

export default api;
